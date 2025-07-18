import TodoItem from './TodoItem';

export default function TodoList({
    todos,
    handleToggleComplete,
    handleEditTodo,
    handleRemoveTodo,
}) {
    return(
        <ul style={{ listStyleType: "none", padding: "0" }}>
            {todos.map((todo) => (
                <TodoItem
                key={todo.id}
                todo={todo}
                handleToggleComplete={handleToggleComplete}
                handleEditTodo={handleEditTodo}
                handleRemoveTodo={handleRemoveTodo}
                />
            ))}
            {todos.length === 0 && (
                <li style={{textAlign: "center", color:  "#888", fontStyle: "italic"}}>
                    No task to focus today, add one.
                </li>
            )}
        </ul>
    );
}