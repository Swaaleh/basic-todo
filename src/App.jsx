
import { useState } from "react";

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

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (todoInput.trim() === "") return; // Prevent empty ToDos
        setTodos([...todos, todoInput]); // Add new ToDo
        setTodoInput(""); // Clear input field
    };

    const handleRemoveTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index)); // Remove ToDo
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
                    {todos.map((todo, index) => (
                        <li key={index}>
                            {todo}{" "}
                            <button onClick={() => handleRemoveTodo(index)}>
                                Remove
                            </button>
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