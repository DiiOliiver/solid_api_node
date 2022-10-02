import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IFindByEmailRequestDTO } from './FindByEmailDTO'

export class FindByEmailUseCase {
    constructor(
        private usersRepository: IUsersRepository
    ) {}

    async execute (data: IFindByEmailRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email)        

        if (!userAlreadyExists) {
            throw new Error('The user does not exist.')
        }

        return userAlreadyExists
    }
}