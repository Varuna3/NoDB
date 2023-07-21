import express from 'express'
import morgan from 'morgan'
import ViteExpress from 'vite-express'
// import NewPlant from './src/NewPlant/NewPlant'

// variables
const app = express()
let incrementalId = 4
const PLANTS = [
  {
    id: 0,
    name: 'Pine Tree',
    count: 38,
    img: 'https://uploads-ssl.webflow.com/5f157d6a58b3e36315a5d5b5/63ecb87ffc76f0079b6d2027_2.png',
  },
  {
    id: 1,
    name: 'Rosemary',
    count: 68,
    img: 'https://www.thespicehouse.com/cdn/shop/articles/Rosemary_720x.jpg?v=1639676021',
  },
  {
    id: 2,
    name: 'Sunflower',
    count: 23,
    img: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
  },
  {
    id: 3,
    name: 'Dandelion',
    count: 512,
    img: 'https://images.squarespace-cdn.com/content/v1/54fbb611e4b0d7c1e151d22a/1653960196494-2YRSA0WT5Z4LS635NKFB/Dandelion+Seeds.jpg?format=1500w',
  },
  {
    id: 0,
    name: 'Pine Tree',
    count: 38,
    img: 'https://uploads-ssl.webflow.com/5f157d6a58b3e36315a5d5b5/63ecb87ffc76f0079b6d2027_2.png',
  },
  {
    id: 1,
    name: 'Rosemary',
    count: 68,
    img: 'https://www.thespicehouse.com/cdn/shop/articles/Rosemary_720x.jpg?v=1639676021',
  },
  {
    id: 2,
    name: 'Sunflower',
    count: 23,
    img: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
  },
  {
    id: 3,
    name: 'Dandelion',
    count: 512,
    img: 'https://images.squarespace-cdn.com/content/v1/54fbb611e4b0d7c1e151d22a/1653960196494-2YRSA0WT5Z4LS635NKFB/Dandelion+Seeds.jpg?format=1500w',
  },
  {
    id: 0,
    name: 'Pine Tree',
    count: 38,
    img: 'https://uploads-ssl.webflow.com/5f157d6a58b3e36315a5d5b5/63ecb87ffc76f0079b6d2027_2.png',
  },
  {
    id: 1,
    name: 'Rosemary',
    count: 68,
    img: 'https://www.thespicehouse.com/cdn/shop/articles/Rosemary_720x.jpg?v=1639676021',
  },
  {
    id: 2,
    name: 'Sunflower',
    count: 23,
    img: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
  },
  {
    id: 3,
    name: 'Dandelion',
    count: 512,
    img: 'https://images.squarespace-cdn.com/content/v1/54fbb611e4b0d7c1e151d22a/1653960196494-2YRSA0WT5Z4LS635NKFB/Dandelion+Seeds.jpg?format=1500w',
  },
]

// middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

ViteExpress.config({ printViteDevServerHost: true })

// routes
app.get('/api/plants', (req, res) => {
  res.json(PLANTS)
})

app.post('/api/increment/:id', (req, res) => {
  const { id } = req.params
  const index = PLANTS.findIndex(e => e.id === +id)
  if (index === -1) {
    res
      .status(404)
      .json({ error: `Item with ID ${id} doesn't exist you moron` })
  } else {
    PLANTS[index].count++
    res.status(200).send(PLANTS[index].count)
  }
})

app.post('/api/trash/:id', (req, res) => {
  const { id } = req.params
  const index = PLANTS.findIndex(e => e.id === +id)
  if (index === -1) {
    res
      .status(404)
      .json({ error: `Item with ID ${id} doesn't exist you moron` })
  } else {
    PLANTS.splice(index, 1)
    res.status(200).send(PLANTS)
  }
})

app.post('/api/newplant', (req, res) => {
  {
    const { name, url, count } = req.body

    PLANTS.push({
      id: incrementalId,
      name: name,
      img: url,
      count: +count,
    })
    incrementalId++
    res.send(PLANTS[PLANTS.length - 1])
  }
})

// open server
ViteExpress.listen(app, 8000, () => {
  console.log(`Hold ctrl and click this: http://localhost:8000/`)
})
