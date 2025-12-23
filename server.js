import express from 'express'
import routes from './routes/index.js'
import connectDB from './config/db.js'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { globalErrorHandler } from './middlewares/errorMiddleware.js'
import './modules/scraping/index.js'
import { initScrapingModule } from './modules/scraping/index.js'

const app = express()

const PORT = process.env.PORT || 5000
const BASE_URL = process.env.APP_BASE_URL || `http://localhost:${PORT}`

app.use(cors())
app.use(express.json())
app.use(cookieParser())

initScrapingModule()
app.use('/api', routes)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/', (req, res) => {
  res.send('JobFlow Automator API is running 🚀')
})

// ✅ GLOBAL ERROR HANDLER (ALWAYS LAST)
app.use(globalErrorHandler)

connectDB()

app.listen(PORT, () => {
  console.log(`🚀 Server running at ${BASE_URL}`)
})
