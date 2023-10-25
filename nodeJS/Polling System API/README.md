# API-Polling_System

This is an API for a simple polling system, designed for creating and managing questions, options, and votes.

# Features

- Create questions and add options.
- Add votes to the options.
- Delete questions ( By deleting a question, we delete its options also).
- Delete options (if no votes are given, then we can delete option).
- View questions with their options and votes.
- Open api with no user authentication.



## Getting Started : #Installation

To run this project locally, follow these steps:

Clone the repository: git clone <https://github.com/Hemendra-DCVS/API-Polling_System.git>

Navigate to the project directory: cd API-Polling_System

Install the dependencies: npm install

Start the application: npm start

server starts on localhost:8000

## Testing

navigate to web.postman.co in browser (make sure you have postman desktop agent installed on your system) 
1. Please make sure Server is started and listens on port 8000 
2. enter the correct route url and select the request type (get/post/delete) 
3. select the "body" and choose "raw", after that select "JSON" format
4. To make the crud operations in our API, these are API endpoints listed below
# create : (POST)
http://localhost:8000/v1/question/create/
{
  "title": "Your question title"
}
http://localhost:8000/v1/question/:questionId/options/create/
{
  "text": "option"
}
# read : (GET)
http://localhost:8000/ 
# update : (POST)
http://localhost:8000/v1//question/:questionId/options/:optionid/vote
# delete : (DELETE)
http://localhost:8000/v1/question/:questionid
http://localhost:8000/v1/options/:optionid




# [Links]

-Demo Video: https://youtu.be/ODFcMTFdZZ4
-Git Repository: https://github.com/Hemendra-DCVS/API-Polling_System



# [Author]
-Name : Hemendra

-LinkedIn : https://www.linkedin.com/in/hemendra-dcvs/

-Github : https://github.com/Hemendra-DCVS

-Email : hemendrachanti@gmail.com

