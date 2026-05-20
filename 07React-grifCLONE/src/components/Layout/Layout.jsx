import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='bg-gray-950 text-white min-h-screen'>
      {/* header */}
      <main>
        <h1>Layout</h1>
        <Outlet/>
      </main>
    </div>
  )
}

export default Layout