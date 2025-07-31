import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Modal,
  Platform,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App() {
  // State to store all tasks
  const [tasks, setTasks] = useState([]);
  
  // State to store the form data for new task
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    dueDate: null // Will store Date object or null
  });

  // State to control modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // State to control date picker visibility
  const [showDatePicker, setShowDatePicker] = useState(false);

  // State to control which tasks to show (all, active, completed)
  const [filter, setFilter] = useState('all');

  // Function to format date for display
  const formatDate = (date) => {
    if (!date) return '';
    
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Function to handle date selection
  const onDateChange = (event, selectedDate) => {
    // On Android, close picker immediately. On iOS, keep it open until user confirms
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (selectedDate) {
      setTaskForm(prev => ({ ...prev, dueDate: selectedDate }));
    }
  };

  // Function to confirm date selection (mainly for iOS)
  const confirmDateSelection = () => {
    setShowDatePicker(false);
  };

  // Function to add a new task
  const addTask = () => {
    // Don't add empty tasks (title is required)
    if (taskForm.title.trim() === '') {
      alert('Please enter a task title before adding!');
      return;
    }
    
    // Create new task object
    const newTask = {
      id: Date.now().toString(), // Simple unique ID using timestamp
      title: taskForm.title.trim(), // The task title
      description: taskForm.description.trim(), // The task description
      dueDate: taskForm.dueDate ? taskForm.dueDate.toISOString() : '', // Store as ISO string
      completed: false, // New tasks start as incomplete
    };
    
    // Add new task to the list
    setTasks([...tasks, newTask]);
    
    // Clear the form and close modal
    setTaskForm({ title: '', description: '', dueDate: null });
    setModalVisible(false);
  };

  // Function to toggle task completion (mark as complete/incomplete)
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed } // Toggle this task
        : task // Keep other tasks unchanged
    ));
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id)); // Remove task with this ID
  };

  // Function to get filtered and sorted tasks
  const getFilteredTasks = () => {
    let filteredTasks;
    
    if (filter === 'active') {
      filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
      filteredTasks = tasks.filter(task => task.completed);
    } else {
      filteredTasks = tasks; // 'all' - show everything
    }
    
    // Sort by due date (earliest first, tasks without dates at the end)
    return filteredTasks.sort((a, b) => {
      // If both have no due date, maintain original order
      if (!a.dueDate && !b.dueDate) return 0;
      
      // Tasks with no due date go to the end
      if (!a.dueDate || a.dueDate === '') return 1;
      if (!b.dueDate || b.dueDate === '') return -1;
      
      // Compare ISO date strings directly (they sort correctly lexicographically)
      return a.dueDate.localeCompare(b.dueDate);
    });
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
    setShowDatePicker(false); // Also hide date picker if open
    // Clear the form when closing
    setTaskForm({ title: '', description: '', dueDate: null });
  };

  // Function to render each task item
  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      {/* Task content */}
      <View style={styles.taskTextContainer}>
        {/* Task title */}
        <Text style={[
          styles.taskTitle,
          item.completed && styles.completedTask // Apply completed style if task is done
        ]}>
          {item.title}
        </Text>
        
        {/* Task description */}
        {item.description && (
          <Text style={[
            styles.taskDescription,
            item.completed && styles.completedTask
          ]}>
            {item.description}
          </Text>
        )}
        
        {/* Due date */}
        {item.dueDate && (
          <Text style={styles.taskDueDate}>
            📅 Due: {formatDate(new Date(item.dueDate))}
          </Text>
        )}
      </View>
      
      {/* Action buttons container */}
      <View style={styles.buttonContainer}>
        {/* Complete/Uncomplete button */}
        <TouchableOpacity
          style={[
            styles.actionButton,
            item.completed ? styles.uncompleteButton : styles.completeButton
          ]}
          onPress={() => toggleTask(item.id)}
        >
          <Text style={styles.actionButtonText}>
            {item.completed ? 'Undo' : 'Done'}
          </Text>
        </TouchableOpacity>
        
        {/* Delete button */}
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => deleteTask(item.id)}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* App title */}
      <Text style={styles.title}>Task Manager</Text>
      
      {/* Add Task Button */}
      <TouchableOpacity 
        style={styles.addTaskButton} 
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.addTaskButtonText}>+ Add New Task</Text>
      </TouchableOpacity>

      {/* Filter tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterTab, filter === 'all' && styles.activeTab]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.activeTabText]}>
            All
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterTab, filter === 'active' && styles.activeTab]}
          onPress={() => setFilter('active')}
        >
          <Text style={[styles.filterText, filter === 'active' && styles.activeTabText]}>
            Active
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterTab, filter === 'completed' && styles.activeTab]}
          onPress={() => setFilter('completed')}
        >
          <Text style={[styles.filterText, filter === 'completed' && styles.activeTabText]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Task list */}
      <FlatList
        data={getFilteredTasks()}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        style={styles.taskList}
        showsVerticalScrollIndicator={false}
      />
      
      {/* Show message if no tasks */}
      {getFilteredTasks().length === 0 && (
        <Text style={styles.emptyText}>
          {filter === 'active' ? 'No active tasks!' : 
           filter === 'completed' ? 'No completed tasks!' : 
           'No tasks yet. Tap "Add New Task" to get started!'}
        </Text>
      )}

      {/* Add Task Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Task</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Modal Form - Scrollable Content */}
            <View style={styles.formContainer}>
              <ScrollView 
                style={styles.modalScrollView} 
                contentContainerStyle={styles.modalScrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
              {/* Title input */}
              <TextInput
                style={styles.modalInput}
                placeholder="Task title (required)..."
                value={taskForm.title}
                onChangeText={(text) => setTaskForm(prev => ({ ...prev, title: text }))}
              />
              
              {/* Description input */}
              <TextInput
                style={[styles.modalInput, styles.modalDescriptionInput]}
                placeholder="Description (optional)..."
                value={taskForm.description}
                multiline={true}
                numberOfLines={3}
                onChangeText={(text) => setTaskForm(prev => ({ ...prev, description: text }))}
              />
              
              {/* Due date selector */}
              <TouchableOpacity
                style={styles.dateSelector}
                onPress={() => setShowDatePicker(true)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.dateSelectorText,
                  !taskForm.dueDate && styles.datePlaceholderText
                ]}>
                  {taskForm.dueDate ? formatDate(taskForm.dueDate) : 'Select due date (optional)'}
                </Text>
                <Text style={styles.dateIcon}>📅</Text>
              </TouchableOpacity>

              {/* Clear due date button */}
              {taskForm.dueDate && (
                <TouchableOpacity
                  style={styles.clearDateButton}
                  onPress={() => setTaskForm(prev => ({ ...prev, dueDate: null }))}
                  activeOpacity={0.7}
                >
                  <Text style={styles.clearDateText}>Clear Date</Text>
                </TouchableOpacity>
              )}

              {/* Date Picker - inside scrollable area */}
              {showDatePicker && (
                <View style={styles.datePickerContainer}>
                  <DateTimePicker
                    value={taskForm.dueDate || new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'compact' : 'default'}
                    onChange={onDateChange}
                    minimumDate={new Date()} // Prevent past dates
                  />
                  {Platform.OS === 'ios' && (
                    <TouchableOpacity 
                      style={styles.dateConfirmButton}
                      onPress={confirmDateSelection}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.dateConfirmText}>Done</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              </ScrollView>
            </View>

            {/* Modal Buttons - Fixed at bottom */}
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={closeModal}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.saveButton} 
                onPress={addTask}
                activeOpacity={0.7}
              >
                <Text style={styles.saveButtonText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  addTaskButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addTaskButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskList: {
    flex: 1,
  },
  taskContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  taskTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 18,
  },
  taskDueDate: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  completedTask: {
    textDecorationLine: 'line-through', // Strike through completed tasks
    color: '#888', // Gray color for completed tasks
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    borderRadius: 5,
    minWidth: 50,
    alignItems: 'center',
    marginLeft: 8,
  },
  completeButton: {
    backgroundColor: '#34C759',
  },
  uncompleteButton: {
    backgroundColor: '#FF9500',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 50,
  },
  // Filter tabs styles
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 20,
    padding: 4,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 20,
    width: '90%',
    maxHeight: '85%',
    minHeight: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    minHeight: 300,
  },
  modalScrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modalScrollContent: {
    paddingVertical: 15,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
    fontSize: 16,
  },
  modalDescriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  dateSelector: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateSelectorText: {
    fontSize: 16,
    color: '#333',
  },
  datePlaceholderText: {
    color: '#999',
  },
  dateIcon: {
    fontSize: 16,
  },
  clearDateButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  clearDateText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  datePickerContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  dateConfirmButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 10,
  },
  dateConfirmText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
