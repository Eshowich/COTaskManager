# Task Manager App

A React Native task manager I built using Expo for a tech screen. You can add tasks, mark them as complete, and delete them. I added several extra features to make it more useful.

# What it does

Core features:
- Add new tasks with title, description, and due date
- Mark tasks as complete or incomplete 
- Delete tasks you don't need anymore
- View all your tasks in an organized list
- Tasks automatically sort by due date (earliest first)

Enhanced features I added:
- Clean popup modal for adding tasks instead of inline forms
- Filter tabs to show all tasks, active ones, or completed ones
- Calendar date picker that prevents selecting past dates
- Tasks show with strikethrough when completed
- Clear action buttons for each task (Done/Undo and Delete)
- Smart date sorting - tasks with due dates appear first, sorted chronologically

# How to run it

You'll need Node.js and npm installed first.

1. Clone this repo and navigate to the TaskManager folder
2. Run `npm install` to install dependencies
3. Run `npm start` to start the Expo development server
4. You can then:
   - Scan the QR code with the Expo Go app on your phone
   - Press 'i' for iOS simulator
   - Press 'a' for Android emulator

# How to use it

Adding a task:
1. Tap the "Add New Task" button to open the form
2. Enter a title (required)
3. Optionally add a description and select a due date using the calendar
4. Tap "Add Task" to save

Managing tasks:
- Tap the green "Done" button to mark a task as complete
- Tap the orange "Undo" button to mark a completed task as active again  
- Tap the red "Delete" button to permanently remove a task

Organizing tasks:
- Use the filter tabs at the top: All, Active, or Completed
- Tasks with due dates automatically sort by date (earliest first)
- Tasks without due dates appear at the bottom

# Technical details

Built with:
- React Native and Expo
- Local state management using React's useState hooks
- One third-party library: @react-native-community/datetimepicker for the native calendar picker

The main file is App.js with about 650 lines of well-commented code. The app uses a clean component structure with separate functions for each operation.

Project structure:
```
TaskManager/
├── App.js           # Main application code
├── package.json     # Dependencies and scripts
├── app.json        # Expo configuration
├── assets/         # App icons and images
└── README.md       # This documentation
```

Key features implemented:
- Modal form with scrollable content for better UX
- Platform-specific date picker behavior (iOS vs Android)
- Date validation and sorting using ISO strings
- Responsive design that works on different screen sizes
- Clean, commented code following React Native best practices

This project demonstrates solid understanding of React Native fundamentals including state management, component lifecycle, user interactions, and UI design principles.