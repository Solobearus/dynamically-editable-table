# Project Overview

This project is a React application that manages a list of users and displays statistics about their countries. It demonstrates the implementation of a performant and user-friendly interface for handling large datasets.

## Key Features

- **User management** (add, edit, delete)
- **Real-time validation**
- **Statistics visualization**
- **Optimized performance** for large datasets

## Tech Stack and Design Choices

- **React**: Chosen for its component-based architecture and efficient rendering.
- **Zustand**: Used for state management. Zustand was selected over Redux for its simplicity and reduced boilerplate, making it ideal for this scale of application.
- **React Router**: Implemented for navigation between the Users and Statistics pages.
- **Material-UI (MUI)**: Utilized for consistent and customizable UI components.
- **react-window**: Employed for virtualized rendering of the user list, significantly improving performance when dealing with large datasets.
- **Chart.js and react-chartjs-2**: Used for creating the pie chart in the Statistics page.
- **react-hot-toast**: Implemented for user-friendly notifications.

## Users Data Structure

The users data is stored as an object with user IDs as keys, rather than an array. This decision was made for several reasons:

1. **Faster lookups**: O(1) time complexity for accessing a specific user by ID.
2. **Easier updates**: Simplifies the process of updating or deleting a specific user without needing to find their index in an array.
3. **Prevents duplication**: Ensures each user ID is unique.
4. **Performance**: Improves rendering performance, especially when used with `react-window` for virtualization.

## Quick Start Guide

1. **Clone the repository:**

```bash
git clone <repository-url>
```

2. **Navigate to the project directory:**

```bash
cd <project-directory>
```

3. **Install dependencies:**

```bash
npm install
```

4. **Start the development server:**

```bash
npm run dev
```

5. **Open your browser and visit http://localhost:5173 to view the application.**
