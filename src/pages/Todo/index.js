import React from 'react'
import Header from './components/Header'

const TodoApp = () => {
  return (
    <div className='flex relative'>
      <div className='bg-gradient-to-r from-cyan-500 to-blue-500 w-full min-h-screen flex justifiy-center items-center'>
        <div className='flex bg-white p-10 w-500 box-border rounded-lg shadow-lg mx-auto min-h-96 min-w-72'>
          <div className=''>
            <Header/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoApp