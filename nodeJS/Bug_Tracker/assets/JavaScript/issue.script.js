document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search-query');
  const issueTableBody = document.getElementById('issue-table-body');
  const labelsFilter = document.getElementById('labels-filter');
  const authorFilter = document.getElementById('author-filter');

  let issues = []; // Store the issues data
  let uniqueLabels = []; // Store unique labels
  let uniqueAuthors = []; // Store unique authors

  // Function to update the table based on the search query and filters
  function updateTable(searchQuery, selectedLabels, selectedAuthors) {
      // Clear previous search results
      issueTableBody.innerHTML = '';

      // Filter issues based on the search query and filters
      const filteredIssues = issues.filter(issue => {
          const titleAndDescription = issue.issueTitle.toLowerCase() + ' ' + issue.description.toLowerCase();
          const matchesSearchQuery = titleAndDescription.includes(searchQuery.toLowerCase());
          const matchesLabels = selectedLabels.length === 0 || selectedLabels.every(label => issue.labels.includes(label));
          const matchesAuthors = selectedAuthors.length === 0 || selectedAuthors.includes(issue.Author);

          return matchesSearchQuery && matchesLabels && matchesAuthors;
      });

      // Update the table with filtered issues
      filteredIssues.forEach(issue => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td class="font-weight-bold text-primary">${issue.issueTitle}</td>
              <td>${issue.description}</td>
              <td>${issue.Author}</td>
              <td>${issue.labels.join(', ')}</td>
          `;
          issueTableBody.appendChild(row);
      });
  }

  // Event listener for input changes (live search)
  searchInput.addEventListener('input', () => {
      const searchQuery = searchInput.value.trim();
      const selectedLabels = getSelectedLabels();
      const selectedAuthors = getSelectedAuthors();
      updateTable(searchQuery, selectedLabels, selectedAuthors);
  });

  // Function to get selected labels
  function getSelectedLabels() {
      const labelCheckboxes = document.querySelectorAll('#labels-filter input[type="checkbox"]:checked');
      return Array.from(labelCheckboxes).map(checkbox => checkbox.value);
  }

  // Function to get selected authors
  function getSelectedAuthors() {
      const authorCheckboxes = document.querySelectorAll('#author-filter input[type="checkbox"]:checked');
      return Array.from(authorCheckboxes).map(checkbox => checkbox.value);
  }

  // Fetch issues data from the backend
  fetch('/api/issues') // Use the correct endpoint URL
      .then(response => response.json())
      .then(data => {
          issues = data; // Store the issues data
          // Calculate unique labels and authors
          uniqueLabels = [...new Set(issues.flatMap(issue => issue.labels))];
          uniqueAuthors = [...new Set(issues.map(issue => issue.Author))];
          populateLabelsAndAuthors();
      })
      .catch(error => {
          console.error('Error fetching issues data:', error);
      });

  // Function to populate labels and authors in the filters
  function populateLabelsAndAuthors() {
      // Create label checkboxes
      labelsFilter.innerHTML = '';
      uniqueLabels.forEach(label => {
          const labelCheckbox = document.createElement('input');
          labelCheckbox.type = 'checkbox';
          labelCheckbox.value = label;
          labelCheckbox.addEventListener('change', () => {
              // When label selection changes, update the table
              const searchQuery = searchInput.value.trim();
              const selectedLabels = getSelectedLabels();
              const selectedAuthors = getSelectedAuthors();
              updateTable(searchQuery, selectedLabels, selectedAuthors);
          });

          const labelLabel = document.createElement('label');
          labelLabel.textContent = label;

          const labelDiv = document.createElement('div');
          labelDiv.appendChild(labelCheckbox);
          labelDiv.appendChild(labelLabel);

          labelsFilter.appendChild(labelDiv);
      });

      // Create author checkboxes
      authorFilter.innerHTML = '';
      uniqueAuthors.forEach(author => {
          const authorCheckbox = document.createElement('input');
          authorCheckbox.type = 'checkbox';
          authorCheckbox.value = author;
          authorCheckbox.addEventListener('change', () => {
              // When author selection changes, update the table
              const searchQuery = searchInput.value.trim();
              const selectedLabels = getSelectedLabels();
              const selectedAuthors = getSelectedAuthors();
              updateTable(searchQuery, selectedLabels, selectedAuthors);
          });

          const authorLabel = document.createElement('label');
          authorLabel.textContent = author;

          const authorDiv = document.createElement('div');
          authorDiv.appendChild(authorCheckbox);
          authorDiv.appendChild(authorLabel);

          authorFilter.appendChild(authorDiv);
      });
  }
  // Toggle collapse for Labels and Authors when the filter button is clicked
  const filterButton = document.getElementById('filter-button');
  const filterContainer = document.getElementById('filter-container');

  filterButton.addEventListener('click', () => {
    filterContainer.classList.toggle('show');
  });

});
// Show/hide the "Back to Top" button based on scroll position
window.addEventListener('scroll', () => {
    const backToTopButton = document.querySelector('.back-to-top');
    if (window.scrollY > 100) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });