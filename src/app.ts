require('dotenv').config()

import express, { Request, Response } from 'express'
import { router } from './routes/routes'
import { LocalStorage } from 'node-localstorage'
import swaggerUI from 'swagger-ui-express'
const swaggerDocs = require('./routes/swagger.json')

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.get('/terms', (request: Request, response: Response) => {
    return response.json({
        message: 'Termos de Serviço'
    })
})


app.use("/v1", router)

global.localStorage = new LocalStorage('./scratch')

export { app }
