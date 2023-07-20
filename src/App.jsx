import './index.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import NewPlant from './Routes/NewPlant'
import Plants from './Routes/Plants'
import axios from 'axios'

const getPlants = async () => {
  const res = await axios.get('/api/plants')
  return res.data
}

function App() {
  const plants = getPlants()

  return (
    <BrowserRouter>
      <div id='routes'>
        <button>
          <Link to='/plants'>Plants</Link>
        </button>
        <br></br>
        <button>
          <Link to='/newplant'>NewPlant</Link>
        </button>
      </div>
      <Routes>
        <Route path='/' element={<h1 />} />
        <Route path='/plants' element={<Plants Plants={plants} />} />
        <Route path='/newplant' element={<NewPlant />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
