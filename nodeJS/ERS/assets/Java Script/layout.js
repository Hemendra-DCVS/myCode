// Add an event listener for the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    // Show/hide the "Back to Top" button based on scroll position
    window.addEventListener('scroll', () => {
      const backToTopButton = document.querySelector('.back-to-top');
      if (window.scrollY > 100) {
        backToTopButton.style.display = 'block';
      } else {
        backToTopButton.style.display = 'none';
      }
    });
  });
  