import { useState, useEffect } from 'react'
import {v4 as uuidv4} from 'uuid'
import TaskList from '../TodoList'

const Header = () => {
  const [input, setInput] = useState("")
  const [todos, setTodos] = useState([])
  const [editTodo, setEditTodo] = useState(null)

  const updateTodo = (title, id, completed) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title, completed } : todo
    );
    setTodos(newTodos);
    setEditTodo(null);
    setInput("");
  };

  useEffect(() => {
    if(editTodo){
      setInput(editTodo.title)
    } else {
      setInput("")
    }
  },[editTodo])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!editTodo) {
      setTodos([...todos, { id: uuidv4(), title: input, completed: false }]);
      setInput("");
    } else {
      updateTodo(input, editTodo.id, editTodo.completed);
    }
  };

  return (
    <>
      <div className='flex justify-center'>
        <h1 className='flex text-gray-900 font-bold text-3xl justify-center text-center mt-7'>Todo List</h1>
      </div>

      <div>
        <form onSubmit={handleSubmit} className='flex'>
          <input type='text'
            placeholder='Add a todo list...'
            value={input}
            onChange={(event) => { setInput(event.target.value) }}
            required
            className='text-xl w-96 border-2 rounded-lg mt-5 border-gray-800 mr-5 text-gray-700' />

          <button
            type='submit'
            className='text-xl w-20 border-2 rounded-lg mt-5 border-gray-800 mr-5  text-gray-700' >
            Add
          </button>
        </form>

        <div>
          <TaskList todos={todos} setTodos={setTodos} setEditTodo={setEditTodo}/>
        </div>
      </div>
    </>

  )
}

export default Header