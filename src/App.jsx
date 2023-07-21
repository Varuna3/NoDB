import './index.css'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'

const App = () => {
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
        <Route
          path='/'
          element={
            <>
              <h1>Utah Plants</h1>
              <p>
                Click 'Plants' to be taken to the plants page, containing all of
                the plants people have found in Utah!
              </p>
              <p>Click 'NewPlant' to add a new plant to the plants page.</p>
            </>
          }
        />
        <Route path='/plants' element={<Plants />} />
        <Route path='/newplant' element={<NewPlant />} />
      </Routes>
    </BrowserRouter>
  )
}

const Plants = () => {
  const [plants, setPlants] = useState([])
  useEffect(() => {
    axios.get('/api/plants').then(({ data }) => {
      setPlants([...data])
    })
  }, [])
  //----------- helper functions ------------

  const deleteCard = id => {
    axios.post(`/api/trash/${id}`)
  }

  const incrementCount = id => {}

  //----------- helper functions ------------
  const arr = plants.map(e => {
    return (
      <div key={e.id}>
        <h1>{e.name}</h1>
        <img src={e.img}></img>
        <div className='card-foot'>
          <button
            className='card-foot-button'
            onClick={() => {
              axios.post(`/api/trash/${e.id}`)
              axios.get('/api/plants').then(({ data }) => {
                setPlants([...data])
              })
            }}
          >
            🗑️
          </button>
          <p>{e.count}</p>
          <button
            className='card-foot-button'
            onClick={() => {
              axios.post(`/api/increment/${e.id}`)
              axios.get('/api/plants').then(({ data }) => {
                setPlants([...data])
              })
            }}
          >
            ➕
          </button>
        </div>
      </div>
    )
  })

  return <>{arr}</>
}

const NewPlant = () => {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [count, setCount] = useState('')

  return (
    <>
      <form action='/'>
        <label htmlFor='name'>Name: </label>
        <input
          id='name'
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor='img'>Img URL: </label>
        <input
          id='img'
          type='text'
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <label htmlFor='count'>Count: </label>
        <input
          id='count'
          type='text'
          value={count}
          onChange={e => setCount(e.target.value)}
        />
        <button
          onClick={() => {
            axios.post('/api/newplant', {
              name: name,
              url: url,
              count: count,
            })
          }}
        >
          Submit
        </button>
      </form>
    </>
  )
}

const Card = () => {}

export { Plants, NewPlant }

export default App
