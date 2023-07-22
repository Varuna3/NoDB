import express from 'express'
import morgan from 'morgan'
import ViteExpress from 'vite-express'
// import NewPlant from './src/NewPlant/NewPlant'

// variables
const app = express()
let incrementalId = 9
const PLANTS = [
  {
    id: 0,
    name: 'Pine Tree',
    count: 75,
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
    id: 4,
    name: 'Yarrow',
    count: 315,
    img: 'https://media.sciencephoto.com/b6/40/01/54/b6400154-800px-wm.jpg',
  },
  {
    id: 5,
    name: 'Mugwort',
    count: 215,
    img: 'https://www.outsidepride.com/images/products/detail/herbseed/mugwort.jpg',
  },
  {
    id: 6,
    name: 'St. John Wort',
    count: 132,
    img: 'https://sowtrueseed.com/cdn/shop/products/Herb_St.JohnsWort_2_pixabay@2x.jpg?v=1595031555',
  },
  {
    id: 7,
    name: 'Nettle',
    count: 94,
    img: 'https://snakeriverseeds.com/cdn/shop/products/StingingNettle2_1200x1200.jpg?v=1621888649',
  },
  {
    id: 8,
    name: 'Juniper',
    count: 3,
    img: 'https://www.treehugger.com/thmb/1cVkYsAm_HaZpy7F5_GasOSheMc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-946028290-0a3e92ad30be42fc90c74d223f15267b.jpg',
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
      .sendStatus(404)
      .json({ error: `Item with ID ${id} doesn't exist you moron` })
  } else {
    PLANTS[index].count++
    res.sendStatus(200).send(PLANTS[index].count)
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
