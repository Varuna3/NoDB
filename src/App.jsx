import './index.css'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import NewPlant from './Routes/NewPlant'
import Plants from './Routes/Plants'
import axios from 'axios'

const getPlants = async () => {
  const res = await axios.get('/api/plants')
  return res
}

function App() {
  const [plants, setPlants] = useState([])

  useEffect(() => {
    axios.get('/api/plants').then(res => {
      setPlants(res)
    })
  }, [])

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
        <Route
          path='/newplant'
          element={<NewPlant plants={plants} setPlants={setPlants} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
