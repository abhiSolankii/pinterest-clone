This project is developed by Abhishek solanki

# Pinterest Clone - Express.js Project

Welcome to the Pinterest Clone project built with Express.js!

This project allows users to create posts with images, titles, descriptions, and associated websites. Users can register, log in, and view their profile with uploaded posts.

## Prerequisites

Before running this project, ensure you have the following installed on your system:

- Node.js (v14.x or higher)
- MongoDB Community Server

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/pinterest-clone.git
cd pinterest-clone
```

### 2. Install Dependencies

Install project dependencies using npm:

npm install

### 3. Start MongoDB Server

Ensure MongoDB is installed on your local machine. Start the MongoDB server:

mongod

### 4. Set Environment Variables

Create a `.env` file in the project root and define the following environment variables:

MONGODB_URI=mongodb://localhost:27017/pinterest-clone
SESSION_SECRET=your_session_secret_here

Replace `your_session_secret_here` with a secure secret key for session management.

### 5. Start the Server

Start the Express.js server:

npm start

The application should now be running locally at `http://localhost:3000`.

## Usage

- Visit `http://localhost:3000` in your web browser to access the home page.
- Register a new user account by navigating to `/register`.
- Log in using your registered credentials at `/login`.
- Explore your profile and add new posts at `/profile`.
- View all posts in the feed at `/feed`.
  And many more.

contact details: https://www.linkedin.com/in/abhishek-solanki-472bb5248/
