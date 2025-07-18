export default function TodoForm({
    todoInput,
    setTodoInput,
    handleAddTodo,
    editingId,
    editInput,
    setEditInput,
    handleUpdateTodo,
    handleCancelEdit
}) {
    return(
        <form
            onSubmit={editingId ? handleUpdateTodo : handleAddTodo}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
            }}>
            <input
                type="text "
                placeholder={editingId ? "Edit your task" : "Add your task here..."}
                value={editingId ? editInput : todoInput}
                onChange={(e) => 
                    editingId ? setEditInput(e.target.value) : setTodoInput(e.target.value)
                }
                style={{
                    flex: "1",
                    padding: "10px",
                    marginRight: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                }}
            />
            <button
            type="submit"
            style={{
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
            }}>
                {editingId ? "Update" : "Add"}
            </button>
            {editingId &&(
                <button
                    type="button"
                    onClick={handleCancelEdit}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginLeft: "10px",}}
                >
                    Cancel
                </button>
            )}
        </form>
    );
}