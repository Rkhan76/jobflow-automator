export const globalErrorHandler = (err, req, res, next) => {
  console.error('❌ Global Error:', err)

  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'
  let errors = null

  // ✅ Zod validation error
  if (err.name === 'ZodError') {
    statusCode = 400
    message = 'Validation failed'
    errors = err.flatten().fieldErrors
  }

  // ✅ Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400
    message = 'Database validation error'
    errors = Object.values(err.errors).map((e) => e.message)
  }

  // ✅ Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400
    message = `Invalid ${err.path}: ${err.value}`
  }

  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  })
}
