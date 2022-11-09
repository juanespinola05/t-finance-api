import { Request, Response, NextFunction } from 'express'

const handleError = (error: Error, _req: Request, res: Response, _next: NextFunction): void => {
  res.status(500).json({
    message: error.message
  })
}

export default handleError
