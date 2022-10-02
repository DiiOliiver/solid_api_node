require('dotenv').config()

import express from 'express'
import { router } from './routes'
import { LocalStorage } from 'node-localstorage'

const app = express()

app.use(express.json())
app.use(router)

global.localStorage = new LocalStorage('./scratch')

export { app }
