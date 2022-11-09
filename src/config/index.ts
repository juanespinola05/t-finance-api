import dotenv from 'dotenv'
dotenv.config()

export const PORT: string = process.env.APP_PORT ?? '3000'
export const ENV: string = process.env.NODE_ENV ?? 'development'
export const DB_URL: string = process.env.DB_URL ?? ''
