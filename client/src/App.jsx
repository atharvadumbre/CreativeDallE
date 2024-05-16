import React from 'react'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import {logo} from './assets';
import {Home, CreatePost} from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-[#000000] sm:p-8 px-4 py-4 border-2 border-b-black shadow-2xl">
        <Link to="/">
          <img src={logo} alt="logo" className='w-24 sm:w-56 object-contain'/>
        </Link>
        <div className='justify-self-end'>
        <Link to="/create-post" className='font-mono bg-[#FFFFFF] text-black px-4 sm:px-6 py-2 sm:py-4 mr-2 rounded-full font-bold'>
          Create Logo
        </Link>
        <Link to="/" className='font-mono bg-[#FFFFFF] text-black px-4 sm:px-6 py-2 sm:py-4 rounded-full font-bold'>
          Explore
        </Link>
        </div>
      </header>

      <main className='sm:p-8 px-4 py-8 w-full bg-[#FFFFFF] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </main>

    </BrowserRouter>
  )
}

export default App