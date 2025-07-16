
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
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

    // Function to handle clearing all ToDos
    const handleClearTodos = () => {
        setTodos([]); // Clear all ToDos
        setFeedback({ message: "All ToDos cleared successfully!", type: "success" }); // Set feedback message
        setTimeout(() => {
            setFeedback({ message: "", type: "" }); // Clear feedback after 2 seconds
        }
        , 2000);
    }

    // Inline styles
    const styles = {
        container: {
            maxWidth: "600px",
            margin: "0 auto",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
        header: {
            textAlign: "center",
            color: "#5D5E61",
            fontSize: "24px", 
            fontWeight: "500", 
            marginBottom: "20px",
        },
        feedback: {
            textAlign: "center",
            fontSize: "14px",
            marginBottom: "10px",
        },
        feedbackSuccess: {
            color: "#28a745",
        },
        feedbackError: {
            color: "#dc3545", 
        },
        noTodos: {
            textAlign: "center",
            color: "#888", 
            fontSize: "16px", 
            fontStyle: "italic", 
            marginTop: "20px",
        },
        form: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
        },
        input: {
            flex: "1",
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
        },
        button: {
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
        },
        buttonDanger: {
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
        },
        todoList: {
            listStyle: "none",
            padding: "0",
        },
        todoItem: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            borderBottom: "1px solid #ccc",
        },
        todoText: {
            flex: "1",
            marginRight: "10px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
        buttonGroup: {
            display: "flex",
            gap: "10px",
        },
        editForm: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Daily Focus</h2>
            {/* Display feedback message */}
            {feedback && <p style={{
                ...styles.feedback,
                ...(feedback.type === "success" ? styles.feedbackSuccess : styles.feedbackError)
            }}>
                    {feedback.message}
                    </p>} 
                <form onSubmit={handleAddTodo} style={styles.form}>
                    <input
                        name="todoInput"
                        autoFocus   
                        type="text"
                        placeholder="Enter your task"
                        value={todoInput}
                        onChange={(e) => setTodoInput(e.target.value)}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Add</button>
                </form>
               {/* <h2>List of ToDos</h2> */}
                <ul style={styles.todoList}>
                    {todos.map((todo) => (
                        <li key={todo.id} style = {styles.todoItem}>
                            {editingId === todo.id ? (
                                 //Render edit input field and button if this todo is being edited
                                <form onSubmit={handleUpdateTodo} style={styles.editForm}>
                                    <input
                                        type="text"
                                        value={editInput}
                                        onChange={(e) => setEditInput(e.target.value)}
                                        style={styles.input}
                                    />
                                    <div style={styles.buttonGroup}>
                                    <button type="submit" style={styles.button}>Update</button>
                                    <button onClick={handleCancelEdit} style={styles.buttonDanger}>
                                        Cancel
                                    </button>
                                    </div>
                                </form>
                            ): (
                                 <>
                                    <span style={styles.todoText}> {todo.text}</span>
                                    <div style={styles.buttonGroup}>
                                    <button onClick={()=>handleEditTodo(todo.id)}style={styles.button}>Edit</button>
                                    <button onClick={() => handleRemoveTodo(todo.id)} style={styles.buttonDanger}>
                                        Remove
                                    </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                    {todos.length === 0 && (
                        <li style={styles.noTodos}>No task to focus today, add one.</li>
                    )}  
                </ul>
                {todos.length > 0 && (
                    <button onClick={handleClearTodos} style={styles.buttonDanger}>Clear All ToDos</button>
                )}
            </div>
        );
}