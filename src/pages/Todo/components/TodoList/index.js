import React from 'react'
import { CheckCircleIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

const TaskList = ({ todos, setTodos, setEditTodo }) => {

  const handleDone = (todo) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {...item, completed: !item.completed}
        }
        return item
      })
    )
  }

  const handleEdit = (todo) => {
    setEditTodo(todo);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }
  return (
    <>
      {todos.map((todo) => (
        <>
          <li className={`flex mt-8 border-dashed border-2 mr-10 border-gray-800 rounded-lg h-16 ${todo.completed ? "line-through text-gray-400" : ""}`} key={todo.id}>
            <input
              type='text'
              value={todo.title}
              className='w-80 border-none text-xl pl-5 text-gray-700'
              onChange={(event) => { event.preventDefault() }}
            />

            <div className='flex'>
              <button className='mr-3' onClick={() => {handleDone(todo)}}>
                <CheckCircleIcon className='h-10 w-10 text-red-500 font-bold' />
              </button>
              <button className='mr-3' onClick={() => {handleEdit(todo)}}>
                <PencilSquareIcon className='h-10 w-10 text-yellow-500 font-bold' />
              </button>
              <button className='mr-3' onClick={() => {handleDelete(todo.id)}}>
                <TrashIcon className='h-10 w-10 text-blue-500 font-bold' />
              </button>
            </div>
          </li>


        </>
      ))}
    </>
  );
};

export default TaskList;
