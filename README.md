# Fitness Tracker

## Overview

This is a two-tier web application built using Node.js, Express, MongoDB, and Bootstrap. The Fitness Tracker allows users to record and manage their training sessions, providing features for adding, editing, and deleting sessions.

## Application Overview

The Fitness Tracker is a web application designed to help users record and manage their training sessions. Whether you're into running, cycling, or any other form of exercise, this app allows you to keep a log of your training progress effortlessly.

### Features

#### 1. User Authentication

Before you start using the Fitness Tracker, you'll need to log in. The application offers two authentication options:

- **GitHub OAuth**: Click the "Login with GitHub" button to log in using your GitHub account. If you don't have one, you can create a new GitHub account. Once logged in, your training data will be associated with your GitHub identity.

- **Local Account**: If you prefer not to use GitHub, you can also create a local account. Just click the "Register" button and provide a unique username and password. This account will be used to store your training sessions.

Note that session persistence has not been implemented to its full extent, so you will need to log in each time the page is reloaded. Data, however, will persist across sessions. Interestingly, navigating to auth-success.html will load in the training sessions of whoever was last logged into a browser tab. This is not permanent, though the length of time for which that persists has not yet been determined.

#### 2. Managing Training Sessions

Once logged in, you can access the main features of the Fitness Tracker:

- **Add Session**: Click the "Add Session" button to record a new training session. Fill in the details such as the date, training type (e.g., running, cycling), distance (in miles), time (in minutes), and heart rate (beats per minute). Click "Add Session," and your training data will be saved.

- **Edit Session**: To make changes to an existing training session, navigate to the "Training Sessions" table. Click the "Edit" button next to the session you want to modify. The session details will populate the input fields, allowing you to update any information. After editing, click "Save" to update the session.

- **Delete Session**: If you wish to remove a training session from your records, simply click the "Delete" button next to the session in the "Training Sessions" table. Confirm the deletion, and the session will be permanently removed.

#### 3. Viewing Training History

- **Comprehensive Viewing**: The Fitness Tracker also provides a comprehensive view of your training history. All your recorded sessions are displayed in a table, showing key details such as date, training type, distance, time, and heart rate, alongside an additional extrapolated speed. This allows you to track your progress over time and make informed decisions about your fitness routine.

- **MongoDB Database**: Utilized MongoDB to persistently store training session data between server sessions.

## Navigating the Application

1. **Login/Registration**: When you first access the application, you'll be presented with a login screen. Choose your preferred authentication method (GitHub OAuth or local registration) to access the main features.

2. **Adding a Session**: To add a new training session, click the "Add Session" button. Fill in the session details and click "Add Session" to save.

3. **Editing a Session**: To modify an existing training session, go to the "Training Sessions" table. Click the "Edit" button next to the session you want to update. Make your changes and click "Save."

4. **Deleting a Session**: If you want to delete a training session, click the "Delete" button next to the session in the "Training Sessions" table. Confirm the deletion to remove the session.

5. **Viewing Training History**: You can review your entire training history in the "Training Sessions" table. This table displays all your recorded sessions with relevant details.

The Fitness Tracker is designed to be intuitive and user-friendly, helping you manage and monitor your fitness journey effectively.

## Technical Achievements

- **OAuth Authentication**: [10pts] Implemented GitHub OAuth authentication using the `passport-github` strategy, allowing users to log in with their GitHub accounts.

- **Lighthouse Audit**: [5pts] Achieved a perfect score of 100% in all four categories (Performance, Best Practices, Accessibility, and SEO) on the Google Lighthouse audit at `a3-michael-mcinerney.glitch.me`.
  <img src="https://cdn.glitch.global/daf8f679-ba70-4fad-b11d-79ef7fd13274/Screen%20Shot%202023-09-25%20at%2010.55.41%20AM.png?v=1695653764360">
## Dependencies

- **Express**: Used as the server framework to handle routes and requests.
- **MongoDB**: Employed for data storage and retrieval.
- **Bootstrap**: Utilized for CSS styling and layout.

## Getting Started

To run the Fitness Tracker locally, follow these steps:

1. Clone this repository.
2. Install the required dependencies using `npm install`.
3. Start the server with `npm start`.
4. Access the application in your web browser at `http://localhost:3000`.

## Author

Michael McInerney
