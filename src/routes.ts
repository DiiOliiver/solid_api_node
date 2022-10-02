import { Router } from 'express'
import { createUserController } from './useCases/CreateUser'
import { findByEmailController } from './useCases/FindByEmail'

const router = Router()

router.post('/users', (request, response) => {
    return createUserController.handle(request, response)
})

router.get('/users/:email', (request, response) => {
    return findByEmailController.handle(request, response)
})

export { router }
