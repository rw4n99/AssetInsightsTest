
# Roleplay: Temp Admin Assistant at the School

Welcome to your role as a temporary admin assistant! You've been called in on short notice to help the school prepare for an Ofsted inspection. Your tasks are critical, and time is of the essence! Let's get started!

## Prerequisites
Before you begin the installation process, ensure you have the following installed on your machine:

Node.js

You need Node.js to run the backend server and manage package dependencies. Download it from nodejs.org and follow the installation instructions for your operating system.
Version: Make sure to use Node.js version 14 or higher.
npm (Node Package Manager)

npm is included with Node.js installations. It is used to install packages and manage dependencies.
You can check if npm is installed by running in the terminal: npm -v 

## Installation

1. type into the terminal:
npm install && node server.js

This will initialise the SQL database, currently hosted on Render, and make it ready to use.

2. You should get a success message! This means the database is now ready to interact with! Follow this link to access the site:
   https://student-management-center.onrender.com/

Optional if you have problems with step two:
cd frontend
npm install
npm run build
npm start

**Please note** that I have left the .env file accessible. While this should never normally be done for security reasons, I have done so for this demo version for ease of setup. 

## Tasks

### 1. Delete Students with Low Average Scores
The Ofsted inspectors have strict guidelines, and one of them is to ensure that only the best students are highlighted. Your first task is to **delete all students with an average score of less than 30**. This is important for showcasing the school's standards! There are a lot of students enrolled. 

- **Action:** Find and delete students with an average score below 30.
- **Tip:** To speed things up, You can click on each column heading to sort by ascending / descending. 

### 2. Add Students with Good Grades
Next, the school wants to make a positive impression by showcasing students who excel academically. You need to **add 2 new students who have good grades**.

- **Action:** Create entries for these students in the system.
- **Example Students:**
  - Name: Emily Johnson, Maths Score: 100, English Score: 90. Please make sure you say that they have a great attitude!
  - Name: Liam Smith, Maths Score: 76, English Score: 99. Please make sure you say that they have a great attitude!

### 3. Edit Names of Students Starting with 'T'
The inspectors have a preference for unique names, so you'll need to **edit the names of all students whose names begin with 'T'**. This is a fun task, so get creative!

- **Action:** Update the names of students starting with 'T'.
- **Examples of Name Changes:**
  - Transform "Tom" into "Timothy"
  - Change "Tina" into "Christina"
  - Revamp "Tony" into "Antonio"

### 4. Change Behaviour Status of Students
Ofsted is also strict on behavior! Your next task is to **find students with bad behavior and change it to good**. We want the inspectors to see that the school has great students in both academics and behavior.

- **Action:** Identify students with bad behavior and update their status to good behavior.

## Conclusion
Once you've completed these tasks, the school will be one step closer to impressing the Ofsted inspectors. Remember to have fun while you work, and good luck!

---

## Tech Stack and choices:

**Frontend:**

**Next.js:** A React framework used for building the frontend of your application, allowing for server-side rendering and easier routing.
**React:** The JavaScript library used within Next.js to create user interfaces.

**Backend:**

**Node.js:** A JavaScript runtime used for building the backend server.
**Express.js:** A web application framework for Node.js, used to build the RESTful API for the application.

**Database:**

**SQL Database:** Used for storing student information and other relevant data.

**Hosting:**

**Render:** The platform used for deployment, including the backend server and SQL database.

**Styling:** 

**Tailwind CSS:** A utility-first CSS framework used for styling the frontend.

## Reflections

### What I Learned:
In this project, I enhanced my skills in handling CRUD operations, specifically working with user data in a school management system. I focused on implementing functionality to manage students based on grades, behavior, and name conventions, providing both technical depth and an element of fun to the tasks.

It was really fun, as an ex-teacher, to make my own student management software after using various other pieces of software throughout my career. 

### The biggest struggle!

**Situation:**
I have made a full-stack application using Node.js for the backend and Next.js for the frontend, with a SQL database. My goal was to deploy the entire system, including the website and the database, on Render using one repository.

**Task:**
I wanted to successfully deploy the project to Render, making sure everything worked together seamlessly, including the Express server, database, and Next.js frontend. Since everything was working locally, my challenge was ensuring that the deployment on Render mirrored the local environment.

**Action:**
I followed Render’s deployment process by pushing my code to GitHub and linking it to Render. During deployment, I ran into issues with the Node.js backend not working as expected. I troubleshot the issue by checking the configuration settings, ensuring environment variables were set correctly, and reviewing deployment logs to pinpoint where the errors were happening. I also spent time reading Render’s documentation and looking at online resources to better understand the deployment process for full-stack applications.

**Result:**
Although I didn’t manage to get everything working perfectly on Render, I learned a lot about how Node.js applications work in a cloud environment. I now have a much better understanding of deployment configurations, environment variables, and how the backend and frontend interact in a deployed setting. This experience has boosted my confidence and will help me in future deployments.

However, I came up with a good compromise for this showcase: the front end site is deployed, and works with the server which is hosted by the user.  

### What I Would Hope to Add in the Future:
- **More Data Validation:** Ensure that the input data is consistently valid (e.g., preventing impossible grades or bad behavior not being updated).
- **User Interface Improvements:** Enhance the UI to make it more user-friendly for administrative tasks, perhaps with a dashboard that highlights important updates or tasks to complete before inspections.
- **Advanced Search & Filter Options:** Add a more powerful search and filter functionality, allowing users to easily manage students with specific criteria, such as score ranges or behavior patterns.

### What I’m Proud Of:
I'm particularly proud of how smoothly the **name-editing functionality** worked. It felt intuitive to update the names in bulk and create a cleaner, more polished dataset for the inspectors. This feature showcases my ability to manage complex data changes efficiently while ensuring the user experience remains seamless.

I'm also really proud of how I was able to make a full-stack application is such a short amount of time, by building on my my freshly gained knowledge made in only 12 weeks of being on my Bootcamp! I'm looking forward to seeing what else I can achieve moving forward in my new career.

