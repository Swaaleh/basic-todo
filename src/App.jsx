
import { useState } from "react";
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
    const [todos, setTodos] = useState([]); // State for ToDos
    const [todoInput, setTodoInput] = useState(""); // State for input field
    const [editingId, setEditingId] = useState(null); // State for tracking the ToDo being edited
    const [editInput, setEditInput] = useState(""); // State for editing input field

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (todoInput.trim() === "") return; // Prevent empty ToDos
        const newTodo = {id: uuidv4(), text: todoInput}; // Create new ToDo with unique ID
        setTodos([...todos, newTodo]); // Add new ToDo
        setTodoInput(""); // Clear input field
    };

    const handleRemoveTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id)); // Remove ToDo
    };

    const handleEditTodo = (id) => {
        const todoToEdit = todos.find((todo) => todo.id === id); // Find ToDo to edit
        setEditingId(id); // Set editing ID
        setEditInput(todoToEdit.text); // Set editing input value
    }
    const handleUpdateTodo = (e) => {
        e.preventDefault();
        if (editInput.trim() === "") return; // Prevent empty ToDos
        setTodos(todos.map((todo) => 
            todo.id === editingId ? {...todo, text: editInput} : todo // Update ToDo text
        ));
        setEditingId(null); // Clear editing ID
        setEditInput(""); // Clear editing input field
    };
    const handleCancelEdit = () => {
        setEditingId(null); // Clear the editing state
        setEditInput(""); // Clear editing input field
    };

    return (
        <>
            <div>
                <h2>Add ToDo</h2>
                <form onSubmit={handleAddTodo}>
                    <input
                        type="text"
                        placeholder="Enter your ToDo"
                        value={todoInput}
                        onChange={(e) => setTodoInput(e.target.value)}
                    />
                    {" "}
                    <button type="submit">Add</button>
                </form>
            </div>
            <div>
                <h2>List of ToDos</h2>
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            {editingId === todo.id ? (
                                 //Render edit input field and button ifi this todo is being edited
                                <form onSubmit={handleUpdateTodo}>
                                    <input
                                        type="text"
                                        value={editInput}
                                        onChange={(e) => setEditInput(e.target.value)}
                                    />
                                    <button type="submit">Update</button>
                                    <button type="button" onClick={handleCancelEdit}>
                                        Cancel
                                    </button>
                                </form>
                            ): (
                                 <>
                                    {todo.text}{" "}
                                    <button onClick={()=>handleEditTodo(todo.id)}>Edit</button>
                                    <button onClick={() => handleRemoveTodo(todo.id)}>
                                        Remove
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                    {todos.length === 0 && (
                        <li>No ToDos added yet.</li>
                    )}  
                </ul>
            </div>
        </>
    );
}