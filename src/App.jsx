import { useState } from 'react'
import './App.css'
import Pokedex from './components/Pokedex/Pokedex';
import Search from './components/search/Search.jsx';
// import Search from './components/search/Search';
import { Link } from 'react-router-dom';
import CustomRoutes from './routes/CustomRoutes';



function App() {
  
  return (
    <div className='outer-pokedex'>

       <h1 id="Pokedex-heading">
        <Link to="/">Pokedex</Link>
        </h1>
      <CustomRoutes/>
      
    </div>
  )
}

export default App
