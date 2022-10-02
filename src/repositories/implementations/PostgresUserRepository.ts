import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'

export class PostgresUserRepository implements IUsersRepository {
    async findByEmail (email: string): Promise<User> {
        this.registerUsersInLocalStorage()
        const users: User[] = JSON.parse(global.localStorage.getItem('users'))
        const user = (users ?? []).find((user: User) => user.email === email)
        return user
    }

    async save (user: User): Promise<void> {
        this.registerUsersInLocalStorage()
        const users: User[] = JSON.parse(global.localStorage.getItem('users')) as User[]
        users.push(user)
        global.localStorage.setItem('users', JSON.stringify(users))
    }

    private registerUsersInLocalStorage() {
        if (!global.localStorage.getItem('users')) {
            global.localStorage.setItem('users', JSON.stringify([]))
        }
    }
}
