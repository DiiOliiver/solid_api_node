import { User } from '../../entities/User';
import { IMailProvider, IMessage } from '../../providers/IMailProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO'

export class CreateUserUsecase {
    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider
    ) {}
    
    async execute (data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

        if (userAlreadyExists) {
            throw new Error('User already exists.')
        }

        const user = new User(data)

        await this.usersRepository.save(user)

        const sendMessage: IMessage = {
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: 'Teste',
                email: 'teste@app.com'
            },
            subject: 'Seja bem-vindo à plataforma',
            body: '<p>Você já pode fazer login em nossa plataforma.</p>'
        }

        await this.mailProvider.sendMail(sendMessage)
    }
}
