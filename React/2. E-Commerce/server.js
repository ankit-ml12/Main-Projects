import express from 'express'
const app = express()
const PORT = 3000
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')))

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`server is listning on PORT ${PORT}`)
    })
  } catch (error) {}
}

start()
