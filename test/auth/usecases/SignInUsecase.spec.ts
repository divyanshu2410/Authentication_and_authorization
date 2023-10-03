import 'chai'
import chai, { expect } from 'chai'
import SignInUseCase from '../../../src/auth/usecases/SigInUseCase'
import IPasswordService from '../../../src/auth/services/IPasswordService'
import FakeRepository from '../helpers/FakeRepository'
import FakePasswordService from '../helpers/FakePasswordService'
import chaiAsPromised from 'chai-as-promised'
import IAuthRepository from '../../../src/auth/domain/IAuthRepository'

chai.use(chaiAsPromised)

describe('SignInUseCase', () => {
    let sut: SignInUseCase
    let repository: IAuthRepository
    let passwordService: IPasswordService

    const user = {
        email: 'sdkubs@gg.com',
        id: '1234',
        name: 'ken',
        password: 'cndjbsdbc',
        type: 'email',
    }

    beforeEach(() => {
        repository = new FakeRepository()
        passwordService = new FakePasswordService()
        sut = new SignInUseCase(repository, passwordService)
    })

    it('Should thorw an error when user is not found', async () => {
        const user = { email: 'wrong@email', password: '1234', name: '', type: 'email'}

        //assert
        await expect(sut.execute(user.email, user.password, user.name, user.type )).to.be.rejectedWith(
            'User not found'
        )
    })

    it('Should return user id when email and password is correct', async () => {
        
        //act
        const id = await expect(sut.execute(user.email, user.password, user.name, user.type))

        //assert
        expect(id).to.be.equal(id)
        
    })

    // it('Should return user id when email is correct and type is not email', async () => {

    //     //act
    //     const id = await sut.execute(user.email, user.password, user.name, user.type)

    //     //assert
    //     expect(id).to.be.equal(user.id)
    // })

    
})