import { Request, Response } from 'express'
import { ICreateUserRequestDTO } from './CreateUserDTO'
import { CreateUserUsecase } from './CreateUserUseCase'

export class CreateUserController {
    constructor(
        private createUserUseCase: CreateUserUsecase
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body

        try {
            const user: ICreateUserRequestDTO = {
                name,
                email,
                password
            }
            
            await this.createUserUseCase.execute(user)

            return response.status(201).send({
                message: `Registered user, an email will be sent to ${email}`
            })
        } catch(err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            })
        }
    }
}
