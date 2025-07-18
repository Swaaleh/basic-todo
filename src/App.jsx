
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";
import Feedback from "./components/Feedback";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
    // This is a simple ToDo application component
    // It contains a form to add new ToDos and a section to list them
    // The form will have an input field and a button to submit the ToDo
    // The list will display all added ToDos
    // You can enhance this component by adding state management to handle the ToDos
    // For example, you can use useState to manage the list of ToDos
    // You can also add functionality to remove ToDos from the list
    // This is a functional component that returns JSX
    // You can also add styles to make it look better


export default function App() {
    const [todos, setTodos] = useState(()=>{
        // Initialize todos state from localStorage or an empty array
        const storedTodos = JSON.parse(localStorage.getItem("todos"));
        return storedTodos || [];
    }); 

    // State for ToDos
    const [todoInput, setTodoInput] = useState(""); // State for input field
    const [editingId, setEditingId] = useState(null); // State for tracking the ToDo being edited
    const [editInput, setEditInput] = useState(""); // State for editing input field
    const [feedback, setFeedback] = useState({message: "", type: ""}); // State for feedback messages

    // Save ToDos to localStorage whenever the todos state changes
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    , [todos]);

    // Functions to handle adding, removing, editing, and updating ToDos
    // Function to handle adding a new ToDo
    const handleAddTodo = (e) => {
        e.preventDefault();
        if (todoInput.trim() === "") {
            setFeedback({message: "Please enter a task.", type: "error"}); 
            return;
        } // Prevent empty ToDos
        const newTodo = {id: uuidv4(), text: todoInput}; // Create new ToDo with unique ID
        setTodos([...todos, newTodo]); // Add new ToDo
        setTodoInput(""); // Clear input field
        setFeedback({message:"Task added successfully!", type: "success"}); // Set feedback message
        setTimeout(() => {
            setFeedback({message: "", type: ""}); // Clear feedback after 2 seconds
        }
        , 2000);
    };

    // Function to handle removing a ToDo
    const handleRemoveTodo = (id) => {
        const todoExists = todos.some((todo) => todo.id === id);
        if (!todoExists) {
            setFeedback({message:"Task not found!", type: "error"});
            return; // Prevent removing non-existing ToDos
        }
        setTodos(todos.filter((todo) => todo.id !== id)); // Remove ToDo
        setFeedback({message:"Task removed successfully!", type: "success"}); // Set feedback message
        setTimeout(() => {
            setFeedback({message: "", type: ""}); // Clear feedback after 2 seconds
        }
        , 2000);    
    };

    // Function to handle editing a ToDo
    const handleEditTodo = (id) => {
        const todoToEdit = todos.find((todo) => todo.id === id); // Find ToDo to edit
        setEditingId(id); // Set editing ID
        setEditInput(todoToEdit.text); // Set editing input value
        setTimeout(() => {
            setFeedback({ message: "", type: "" }); // Clear feedback after 2 seconds
        }
        , 2000);
    };

    // Function to handle updating a ToDo
    const handleUpdateTodo = (e) => {
        e.preventDefault();
        if (editInput.trim() === "") {
            setFeedback({ message: "Please enter a task to update.", type: "error" });
            return; 
        } // Prevent empty ToDos
        setTodos(todos.map((todo) => 
            todo.id === editingId ? {...todo, text: editInput} : todo // Update ToDo text
        ));
        setEditingId(null); // Clear editing ID
        setEditInput(""); // Clear editing input field
        setFeedback({ message: "Task updated successfully!", type: "success" }); // Set feedback message
        setTimeout(() => {
            setFeedback({ message: "", type: "" }); // Clear feedback after 2 seconds
        }
        , 2000);
    };

    // Function to handle canceling the edit
    const handleCancelEdit = () => {
        setEditingId(null); // Clear the editing state
        setEditInput(""); // Clear editing input field
        setFeedback(""); // Clear feedback message
    };

    // Function to handle toggling the completion status of a ToDo
    const handleToggleComplete = (id) => {
        setTodos(
            todos.map((todo)=>
                todo.id === id ? {...todo, completed: !todo.completed} : todo
            )
        );
    }

    // Function to handle clearing all ToDos
    const handleClearTodos = () => {
        setTodos([]); // Clear all ToDos
        setFeedback({ message: "All ToDos cleared successfully!", type: "success" }); 
        setTimeout(() => {
            setFeedback({ message: "", type: "" }); // Clear feedback after 2 seconds
        }
        , 2000);
    }

    const styles = {
        container: {
            maxWidth: "600px",
            margin: "0 auto",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(231, 113, 113, 0.1)",
        },
        
    };

    return (
        <div style={styles.container}>
            <Header title="Daily Focus" />
            <Feedback feedback={feedback} />
            <TodoForm
                todoInput={todoInput}
                setTodoInput={setTodoInput}
                handleAddTodo={handleAddTodo}
                editingId={editingId}
                editInput={editInput}
                setEditInput={setEditInput}
                handleUpdateTodo={handleUpdateTodo}
                handleCancelEdit={handleCancelEdit}
            />
            <TodoList
                todos={todos}
                handleToggleComplete={handleToggleComplete}
                handleEditTodo={handleEditTodo}
                handleRemoveTodo={handleRemoveTodo}
                />
                {todos.length > 0 && (
                    <button 
                        onClick={handleClearTodos} 
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#dc3545",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            alignItems: "center",
                        }}>
                        Clear All Tasks
                    </button>
                )}
        </div>
        );
}