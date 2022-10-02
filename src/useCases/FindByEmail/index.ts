import { MailtrapMailProvider } from '../../providers/implementations/MailtrapMailProvider';
import { PostgresUserRepository } from '../../repositories/implementations/PostgresUserRepository';
import { FindByEmailController } from './FindByEmailController';
import { FindByEmailUseCase } from './FindByEmailUseCase';

const postgresUserRepository = new PostgresUserRepository()
const mailtrapMailProvider = new MailtrapMailProvider()

const findByEmailUseCase = new FindByEmailUseCase(
    postgresUserRepository
)

const findByEmailController = new FindByEmailController(
    findByEmailUseCase
)

export { findByEmailUseCase, findByEmailController }
