import IAuthRepository from "../../../src/auth/domain/IAuthRepository";
import User from "../../../src/auth/domain/User";

export default class Fake implements IAuthRepository {

    public user = [
        {
            email: 'sdkubs@gg.com',
            id: '1234',
            name: 'ken',
            password: 'cndjbsdbc',
            type: 'email',
        },
        {
            email: 'mail@mail.com',
            id: '155',
            name: 'zen',
            password: 'password',
            type: 'google',
        },
    ]

    public async find(email: string): Promise<User> {
        const user = this.user.find((x) => x.email == email)

        if (!user) return Promise.reject('User not found')

        return new User(
            user?.id,
            user?.name,
            user?.email,
            user?.password,
            user?.type
        )
    }

    public async add(
        name: string,
        email: string,
        password: string,
        type: string,
    ): Promise<string> {
        const max = 9999
        const min = 1000
        const id = (Math.floor(Math.random() * (+max - +min)) + +min).toString()

        this.user.push({
            email: email,
            id: id,
            name: name,
            password: password,
            type: type,

        })
        return id
    }
}