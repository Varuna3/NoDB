import express from 'express'
import morgan from 'morgan'
import ViteExpress from 'vite-express'

const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

ViteExpress.config({ printViteDevServerHost: true })

//here be routes

ViteExpress.listen(app, 8000, () => {
  console.log(`My port 8000 is open just for you ;)`)
})
