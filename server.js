import express from 'express'
import routes from './routes/index.js'
import connectDB from './config/db.js'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

const PORT = process.env.PORT || 5000
const BASE_URL = process.env.APP_BASE_URL || `http://localhost:${PORT}`

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api', routes)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.get('/', (req, res) => {
  res.send('JobFlow Automator API is running 🚀')
})

connectDB()

app.listen(PORT, () => {
  console.log(`🚀 Server running at ${BASE_URL}`)
})
