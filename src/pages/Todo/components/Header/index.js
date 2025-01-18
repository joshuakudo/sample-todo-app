import { useState, useEffect } from 'react'
import TaskList from '../TodoList'
import axios from 'axios'

const API = axios.create({
  baseURL: "http://instalog.ph", // API URL for backend container
});

// API endpoints
export const getTodos = () => API.get("/todos");
export const createTodo = (todo) => API.post("/todos", todo);
export const updateTodo = (id, todo) => API.put(`/todos/${id}`, todo);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);

const Header = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  // Fetch Todos on Component Mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const { data } = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAddTodo = async () => {
    if (!input.trim()) return;
    try {
      const { data } = await createTodo({ title: input, description: "" });
      setTodos([...todos, data]);
      setInput("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleUpdateTodo = async (id, updatedTitle) => {
    try {
      const { data } = await updateTodo(id, { title: updatedTitle });
      setTodos(todos.map((todo) => (todo.id === id ? data : todo)));
      setEditTodo(null); // Clear edit state after update
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };


  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!editTodo) {
      await handleAddTodo();
    } else {
      await handleUpdateTodo(editTodo.id, input);
      setInput(""); // Clear input field after update
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-gray-900 font-bold text-3xl mt-7">Todo List</h1>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            placeholder="Add a todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
            className="text-xl w-96 border-2 rounded-lg mt-5 border-gray-800 mr-5 text-gray-700"
          />
          <button
            type="submit"
            className="text-xl w-20 border-2 rounded-lg mt-5 border-gray-800 text-gray-700"
          >
            {editTodo ? "Update" : "Add"}
          </button>
        </form>

        <TaskList
          todos={todos}
          setTodos={setTodos}
          setEditTodo={(todo) => {
            setEditTodo(todo);
            setInput(todo.title); // Populate input field with the selected todo title
          }}
          handleDelete={handleDeleteTodo}
          handleDone={(todo) =>
            handleUpdateTodo(todo.id, { ...todo, completed: !todo.completed })
          }
        />
      </div>
    </>
  );
};

export default Header;