import { Request, Response } from "express";
import { IFindByEmailRequestDTO } from "./FindByEmailDTO";
import { FindByEmailUseCase } from "./FindByEmailUseCase";

export class FindByEmailController {
    constructor(
        private findByEmailUseCase: FindByEmailUseCase
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.query

        try {
            const data: IFindByEmailRequestDTO = {
                email: String(email)
            }
            
            const user = await this.findByEmailUseCase.execute(data)

            return response.status(200).send(user)
        } catch(err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            })
        }
    }
}