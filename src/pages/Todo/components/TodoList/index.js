import React from 'react'
import { CheckCircleIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

const TaskList = ({ todos, setEditTodo, handleDelete, handleDone }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`flex mt-8 border-dashed border-2 border-gray-800 rounded-lg h-16 ${
            todo.completed ? "line-through text-gray-400" : ""
          }`}
        >
          <span className="w-80 pl-5 text-xl text-gray-700">{todo.title}</span>

          <div className="flex">
            <button
              className="mr-3"
              // onClick={() => handleDone(todo)}
              title="Mark as Done"
            >
              <CheckCircleIcon className="h-10 w-10 text-red-500" />
            </button>
            <button
              className="mr-3"
              onClick={() => setEditTodo(todo)}
              title="Edit Todo"
            >
              <PencilSquareIcon className="h-10 w-10 text-yellow-500" />
            </button>
            <button
              className="mr-3"
              onClick={() => handleDelete(todo.id)}
              title="Delete Todo"
            >
              <TrashIcon className="h-10 w-10 text-blue-500" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
