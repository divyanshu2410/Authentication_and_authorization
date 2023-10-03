import { describe } from "mocha";
import express, { response, urlencoded } from "express";
import IAuthRepository from "../../../src/auth/domain/IAuthRepository";
import FakeRepository from "../helpers/FakeRepository";
import JwtTokenService from "../../../src/auth/data/Services/JwtTokenService";
import BcryptPasswordService from "../../../src/auth/data/Services/BcryptPasswordSesrvice";
import AuthRouter from "../../../src/auth/entrypoint/AuthRouter";
import request from "supertest";
import { expect } from "chai";

describe('AuthRouter', () => {
    let repository: IAuthRepository
    let app: express.Application

    const user = {
        email: 'sdkubs@gg.com',
        id: '1234',
        name: 'ken',
        password: 'cndjbsdbc',
        auth_type: 'email',
    }

    beforeEach(() => {
        repository = new FakeRepository()
        let tokenService = new JwtTokenService('privateKey')
        let passwordService = new BcryptPasswordService()


        app = express()
        app.use(express.json())
        app.use(urlencoded({ extended: true }))
        app.use('/auth/', AuthRouter.configure(repository, tokenService, passwordService))
    })

    it('Should return 404 when user is not found', async () => {
        await request(app)
        .post('/auth/signin')
        .send({})
        .expect(404)
    })
    it('should return 200 and token when user is found', async () => {
        await request(app)
            .post('/auth/signin')
            .send({ email: 'sdkubs@gmail.com'})
            .set('Accept', 'applictaion/json')
            .expect('Content-type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body.auth_token).to.not.be.empty
            })

    })
    
    it('should create user and return token', async () => {
        let email = 'sdkubs@gg.com'
        let name = 'ken'
        let password = 'cndjbsdbc'
        let type= 'email'

        await request(app)
            .post('/signup')
            .send({ email: email, name: name, password: password, auth_type: type})
            .set('Accept', 'applictaion/json')
            .expect('Content-type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body.auth_token).to.not.be.empty
            })

    })
})
