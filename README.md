# Assessment Test

## 🚀 Express.js + TypeScript REST API

A simple and scalable REST API built with Express.js and TypeScript.

## 📌 Features
- ✅ Built with TypeScript for type safety
- ✅ Uses Express.js for routing
- ✅ Supports environment variables using .env
- ✅ Well-structured project architecture
- ✅ Includes basic CRUD operations

##  📦 Installation
- ### Clone the Repository
      ```bash
      git clone https://github.com/your-username/your-repo.git
      cd your-repo
      ```
- ### Install Dependencies
     ```bash
     npm install
     ```
- ### Create an .env File
   Rename .env-example file to .env in the root directory and adjust it to your local machine.


## 🚀 Running the Project
   ### Start the Development Server
      ```bash
      npm run dev
      ```
   ### Start the Development Server
      ```bash
      npm run build
      npm start
      ```
## 📌 API Endpoints
 - POST	 /api/user	Create a new User.
 - DELETE	/api/user/:id	Delete User by ID

## 📌 Project Structure
    📦 assessment_test
    ├── 📂 src
    │   ├── 📂 controllers   # API logic
    │   ├── 📂 routes        # Route definitions
    │   ├── 📂 repositories  # Data access layer
    │   ├── 📂 entities      # Map database table
    │   ├── 📂 migrations    # Migrations database table
    │   ├── cron.ts           # Scheduler
    |   ├── data-source.ts    # Configurations
    |   ├── server.ts         # Main entry point
    ├── .env                # Environment variables
    ├── .gitignore          # Ignored files
    ├── package.json        # Dependencies
    ├── tsconfig.json       # TypeScript config
    └── README.md           # Documentation

    
