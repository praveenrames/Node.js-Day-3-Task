# WEB DEVELOPER TASK
 ## Mentor and Student Assigning with Database
 ### Task Description
 1. Write API to create Mentor
 2. Write API to create Student
 3. API to Assign a student to Mentor
 - Select one mentor and Add multiple Student
 - A student who has a mentor should not be shown in List
 4. Write API to Assign or Change Mentor for particular Student
 - Select One Student and Assign one Mentor
 5. Write API to show all students for a particular mentor
 6. Write an API to show the previously assigned mentor for a particular student.
### Base URl
 - https://node-js-day-3-task.onrender.com
### By using this API we can do the below
 - Can create a Mentor
 - Can get all Mentor
 - Can create a Student
 - Can get all Student
 - Can assign Student to Mentor
 - Can assign Mentor to Student
 - Can get all Mentors with Student
 - Can get Students for Mentor
 - Can change Mentors for particular Student
 - Can get previous Mentor
#### Create Mentor
 - /api/createMentor
#### Get All Mentors
 - api/mentors/get/allmentor
#### Create Student
 - api/students/create/student
#### Get All Students
 - api/students/get/student
#### Assign Mentor To Student
 - api/mentors/assignStudentToMentor/:id
#### Get All Mentors With Students
 - api/mentors/assignMentorToStudent/:id
#### Change Mentor for Particular Student
 - api/students/changeMentor/:id
#### Get Previous Mentor
 - api/students/changeMentor/:id
## API Documentation Link
 - https://documenter.getpostman.com/view/37097339/2sA3kUGhS3
## Packages Used
 - express
 - nodedmon
 - cors
 - mongoose
