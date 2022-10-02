import { MailtrapMailProvider } from '../../providers/implementations/MailtrapMailProvider';
import { PostgresUserRepository } from '../../repositories/implementations/PostgresUserRepository';
import { CreateUserController } from './CreateUserController';
import { CreateUserUsecase } from './CreateUserUseCase';

const postgresUserRepository = new PostgresUserRepository()
const mailtrapMailProvider = new MailtrapMailProvider()

const createUserUseCase = new CreateUserUsecase(
    postgresUserRepository,
    mailtrapMailProvider
)

const createUserController = new CreateUserController(
    createUserUseCase
)

export { createUserUseCase, createUserController }
