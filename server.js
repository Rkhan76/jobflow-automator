import express from 'express'
import routes from './routes/index.js'
import connectDB from './config/db.js'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger.js'

const app = express()

const PORT = process.env.PORT || 5000
const BASE_URL = process.env.APP_BASE_URL || `http://localhost:${PORT}`

app.use(express.json())
app.use('/api', routes)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

connectDB()

app.listen(PORT, () => {
  console.log(`🚀 Server running at ${BASE_URL}`)
})
