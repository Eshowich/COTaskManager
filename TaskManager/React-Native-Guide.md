# React Native Learning Guide

## What is React Native?

React Native is a framework that lets you build mobile apps using React and JavaScript. Instead of building separate apps for iOS and Android, you write one codebase that works on both platforms.

## Core Concepts You Need to Know

### 1. Components
Components are the building blocks of React Native apps. Think of them like LEGO blocks - you combine them to build your app.

```javascript
// A simple component
function WelcomeMessage() {
  return <Text>Hello World!</Text>;
}
```

### 2. JSX (JavaScript XML)
JSX lets you write HTML-like code inside JavaScript. It's how you describe what the UI should look like.

```javascript
// JSX example
const element = <Text>Hello World!</Text>;
```

### 3. Props
Props (properties) are how you pass data from one component to another, like parameters in a function.

```javascript
// Parent passes data to child
<TaskItem title="Buy groceries" completed={false} />

// Child receives data through props
function TaskItem({ title, completed }) {
  return <Text>{title}</Text>;
}
```

### 4. State
State is data that can change over time. When state changes, the component re-renders to show the new data.

```javascript
const [tasks, setTasks] = useState([]); // tasks is the current value, setTasks updates it
```

### 5. useState Hook
useState is how you add state to functional components.

```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // Start with 0
  
  return (
    <View>
      <Text>{count}</Text>
      <Button title="Add 1" onPress={() => setCount(count + 1)} />
    </View>
  );
}
```

### 6. Event Handling
Events are user interactions like button clicks or text input.

```javascript
// Handle button press
<Button title="Click me" onPress={() => alert('Button clicked!')} />

// Handle text input
<TextInput onChangeText={(text) => setText(text)} />
```

## React Native Basic Components

### View
Like a `<div>` in web development - a container that holds other components.

```javascript
<View style={{ padding: 20 }}>
  <Text>This text is inside a View</Text>
</View>
```

### Text
Displays text on screen. All text must be inside `<Text>` tags.

```javascript
<Text style={{ fontSize: 18, color: 'blue' }}>Hello World!</Text>
```

### TextInput
Allows users to type text.

```javascript
<TextInput
  placeholder="Enter task here..."
  value={inputText}
  onChangeText={setInputText}
/>
```

### TouchableOpacity
Makes any component clickable/touchable.

```javascript
<TouchableOpacity onPress={() => deleteTask(task.id)}>
  <Text>Delete</Text>
</TouchableOpacity>
```

### FlatList
Efficiently displays lists of data.

```javascript
<FlatList
  data={tasks}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <TaskItem task={item} />}
/>
```

### StyleSheet
Styles your components (like CSS for mobile).

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
});
```

## How Our Task Manager App Works

### 1. App Structure
```
App.js (Main component)
├── Task list (FlatList)
├── Add task input (TextInput)
└── Add button (TouchableOpacity)
```

### 2. Data Flow
1. **State**: App stores list of tasks in state
2. **Display**: FlatList shows all tasks
3. **Add**: User types in TextInput, clicks Add button
4. **Update**: App adds new task to state
5. **Re-render**: App automatically updates to show new task

### 3. Task Operations
- **Add**: Create new task object, add to tasks array
- **Complete**: Find task by ID, toggle its completed status
- **Delete**: Remove task from tasks array

### 4. Key Programming Concepts

#### Arrays and Objects
```javascript
// Task object
const task = {
  id: '1',
  text: 'Buy groceries',
  completed: false
};

// Array of tasks
const tasks = [task1, task2, task3];
```

#### Array Methods
```javascript
// Add item to array
setTasks([...tasks, newTask]);

// Remove item from array
setTasks(tasks.filter(task => task.id !== taskId));

// Update item in array
setTasks(tasks.map(task => 
  task.id === taskId 
    ? { ...task, completed: !task.completed }
    : task
));
```

#### Conditional Rendering
```javascript
// Show different text based on condition
<Text style={task.completed ? styles.completedText : styles.normalText}>
  {task.text}
</Text>
```

## Quick Start Checklist

1. ✅ Understand components (building blocks)
2. ✅ Learn JSX (HTML-like syntax)
3. ✅ Master useState (managing changing data)
4. ✅ Practice props (passing data between components)
5. ✅ Try basic components (View, Text, TextInput, etc.)
6. ✅ Learn array methods (.map, .filter, .find)
7. ✅ Understand event handling (onPress, onChangeText)

## Common Patterns in Our Code

### Adding an Item
```javascript
const addTask = () => {
  const newTask = {
    id: Date.now().toString(), // Simple unique ID
    text: inputText,
    completed: false
  };
  setTasks([...tasks, newTask]); // Add to existing tasks
  setInputText(''); // Clear input
};
```

### Updating an Item
```javascript
const toggleTask = (id) => {
  setTasks(tasks.map(task => 
    task.id === id 
      ? { ...task, completed: !task.completed } // Update this task
      : task // Keep other tasks unchanged
  ));
};
```

### Deleting an Item
```javascript
const deleteTask = (id) => {
  setTasks(tasks.filter(task => task.id !== id)); // Keep all except this one
};
```

This guide covers everything you need to understand our simple task manager app! 