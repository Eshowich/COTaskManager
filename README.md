# Simple Task Manager

A minimal React Native task management app built with Expo.

## Features

✅ **Add Task**: Enter a task description and tap "Add" to create a new task  
✅ **Mark Complete**: Tap any task to toggle between complete/incomplete  
✅ **Delete Task**: Tap the red "Delete" button to remove a task  
✅ **Task List**: View all tasks in a clean list showing both complete and incomplete items  

## Visual Feedback

- **Completed tasks**: Show with strikethrough text and gray color
- **Active tasks**: Display in normal black text
- **Empty state**: Shows helpful message when no tasks exist

## Setup and Running

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the App**
   ```bash
   npm start
   ```

3. **Run on Device**
   - Scan the QR code with Expo Go app on your phone
   - Or press `i` for iOS simulator / `a` for Android emulator

## Technical Details

- **Framework**: React Native with Expo
- **State Management**: Local component state using React's `useState` hook
- **Components Used**: View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView
- **No external libraries**: Uses only React Native core components

## Code Structure

```
App.js (89 lines total)
├── State management (2 useState hooks)
├── Task operations (add, toggle, delete)
├── UI rendering (input, list, buttons)
└── Styles (clean, minimal design)
```

## How It Works

1. **State**: App stores tasks array and input text in local state
2. **Add**: Create task object with ID, text, and completed status
3. **Toggle**: Map through tasks and flip completed status for target task
4. **Delete**: Filter out task with matching ID
5. **Display**: FlatList renders each task with conditional styling

Built following React Native best practices with clean, commented code. 
