export const validate =
  (schema, property = 'body') =>
  (req, res, next) => {
    const result = schema.safeParse(req[property])

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.flatten().fieldErrors,
      })
    }

    // overwrite with validated & sanitized data
    req[property] = result.data
    next()
  }
