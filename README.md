# **Easy Task** - Task Management Application

## 🚀 Live Demo
[https://easy-task-4f392.web.app/](#)

## 📖 Overview
Task Management Application is a real-time task management tool where users can add, edit, delete, and reorder tasks using a drag-and-drop interface. Tasks are categorized into **To-Do, In Progress, and Done** to enhance workflow efficiency.

## 🛠️ Technologies Used

### Frontend:
- **React (Vite.js)** – Fast and optimized frontend framework
- **Tailwind CSS** – Utility-first styling for a modern UI
- **Firebase Authentication** – Secure user authentication
- **Hello Pangea-DnD** – Drag-and-drop functionality for task management

### Backend:
- **Node.js** – Server-side runtime
- **Express.js** – Backend framework for API handling
- **MongoDB (Atlas)** – NoSQL database for task storage
- **MongoDB Real Time Update** – Real-time task updates

### Deployment:
- **Frontend:** Firebase
- **Backend:** Vercel
- **Database:** MongoDB Atlas

## 🔑 Features

- **🔐 Authentication:** Google Sign-in via Firebase
- **📝 Task Management:** Add, edit, delete, and reorder tasks
- **📂 Categories:** Tasks categorized into **To-Do, In Progress, and Done**
- **🔄 Drag & Drop:** Move tasks between categories
- **💾 Persistence:** Tasks remain in their last known order after page refresh
- **📡 Real-Time Sync:** Updates using **Change Streams / WebSockets / Optimistic UI**
- **🎨 Responsive UI:** Works seamlessly on both desktop and mobile
- **🌙 Dark Mode Toggle**
<!-- - **📜 Activity Log** to track changes (e.g., *"Task moved to Done"*) -->
<!-- - **⏳ Due Dates** with color indicators (overdue tasks appear in red) -->


## ⚡ API Endpoints

### 🔹 Tasks
- `POST /tasks` – Add a new task
- `GET /tasks` – Retrieve all tasks for the logged-in user
- `PUT /tasks/:id` – Update task details (title, description, category)
- `DELETE /tasks/:id` – Delete a task


## 🧰 Dependencies
###  This project requires the following dependencies:

-  **@dnd-kit/core:** 6.3.1 – A set of hooks for drag-and-drop functionality.
-  **@dnd-kit/sortable:** 10.0.0 – For sortable lists using the drag-and-drop interface.
-  **@dnd-kit/utilities:** 3.2.2 – Utilities to help manage drag-and-drop.
-  **@hello-pangea/dnd:** 18.0.1 – An alternative drag-and-drop library for React.
-  **@tailwindcss/vite:** 4.0.7 – Tailwind CSS plugin for Vite.
-  **@tanstack/react-query:** 5.66.8 – Data fetching and caching library for React.
-  **axios:** 1.7.9 – Promise-based HTTP client for the browser and Node.js.
-  **firebase:** 11.3.1 – Firebase SDK for integrating Firebase services.
-  **localforage:** 1.10.0 – A library for storing data in the browser's local storage.
-  **match-sorter:** 8.0.0 – A utility for sorting arrays based on string similarity.
-  **react:** 19.0.0 – React.js, a JavaScript library for building user interfaces.
-  **react-dom:** 19.0.0 – React's package for DOM rendering.
-  **react-icons:** 5.5.0 – Popular library for React icons.
-  **react-router-dom:** 7.2.0 – Declarative routing for React applications.
-  **sort-by:** 1.2.0 – Utility for sorting arrays of objects by properties.
-  **sweetalert2:** 11.17.2 – A beautiful, responsive, customizable, accessible replacement       forJavaScript's alert.
-  **tailwindcss:** 4.0.7 – A utility-first CSS framework.




<!-- ### Setup:

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/task-management-app.git
   cd task-management-app -->


## 📥 Installation 

### Prerequisites:
- Node.js installed
- MongoDB instance (local or Atlas)

### Steps to Install:
- Clone the repository:

- git clone https://github.com/your-username/task-management-app.git
- Navigate into the project directory:

- cd task-management-app
### Install the dependencies: Using npm

- npm install

### Or, if you're using Yarn:
- yarn install

### Set up environment variables:
- Create a .env file in the root directory of the project and add the necessary environment variables (e.g., Firebase API keys, MongoDB connection string, etc.).

- Run the development server: To run the application locally, use the following command:

### Using npm:

-npm run dev

### Or, if you're using Yarn:

- yarn dev

-This will start the server and you can view the application at http://localhost:3000.

### For Production Build: To create a production build of the application, run:
- npm run build

