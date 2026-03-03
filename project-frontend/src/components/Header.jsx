import React from 'react'

const Header = () => {
  return (
    <header className='w-full bg-white shadow px-4 py-3 flex items-center justify-between'>
       <div className='flex items-center gap-3'>
        <img src="/vite.svg" alt="logo" className="h-8" />
        <span className='font-semibold'>Project Manager</span>
       </div>
       <div>
        <button className='px-3 py-1 bg-blue-600 text-white rounded'>New</button>
        
       </div>
    </header>
  )
}

export default Header