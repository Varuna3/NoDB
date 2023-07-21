import { useState } from 'react'
import axios from 'axios'

const NewPlant = ({ plants, setPlants }) => {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [count, setCount] = useState('')

  return (
    <>
      <form action='/plants'>
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
        <input
          type='submit'
          onSubmit={() => {
            const res = axios.post('/api/newplant', {
              name: name,
              img: img,
              count: count,
            })
            setPlants([...plants, res.data])
          }}
        />
      </form>
      <p></p>
    </>
  )
}

export default NewPlant
