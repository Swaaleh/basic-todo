export default function TodoItem({
    todo,
    handleToggleComplete,
    handleEditTodo,
    handleRemoveTodo,
}) {
    const textStyle = todo.completed
        ? { textDecoration: 'line-through', 
            color: "#888",
            flex: "1",
            marginRight: "10px" 
        }
        : {
            flex: "1",
            marginRight: "10px" 
        };
    return (
        <li style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #ccc",
        }}>
            <span style={textStyle}>{todo.text}</span>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button
                    style={{
                        // backgroundColor: todo.completed ? '#f0ad4e' : '#5cb85c', 
                        padding: "5px 10px",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                    onClick={() => handleToggleComplete(todo.id)}
                    >
                    {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button 
                    onClick={() => handleEditTodo(todo.id)}
                    style={{
                        padding: "5px 10px",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                    >Edit
                    </button>
                <button 
                    onClick={() => handleRemoveTodo(todo.id)}
                    style={{
                        padding: "5px 10px",
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                }}
            
                >
                    Remove
                    </button>
            </div>
        </li>
    );
}