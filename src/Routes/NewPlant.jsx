import { useState } from 'react'
import axios from 'axios'

const NewPlant = (/*{ pushNewPlant }*/) => {
  const [name, setName] = useState('')

  return (
    <form /*action={pushNewPlant({ name: name })}*/>
      <label htmlFor='name'>Name: </label>
      <input
        id='name'
        type='text'
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </form>
  )
}

export default NewPlant
