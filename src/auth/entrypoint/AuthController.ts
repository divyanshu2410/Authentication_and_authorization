import { Error } from "mongoose";
import ITokenService from "../services/ITokenService";
import SignInUseCase from "../usecases/SigInUseCase";
import express from "express";
import SignUpUseCase from "../usecases/SignUpUseCase";
import SignOutUseCase from "../usecases/SignOutUseCase";

export default class AuthController {
    private readonly signInUseCase: SignInUseCase
    private readonly signUpUsecase: SignUpUseCase
    private readonly signOutUseCase : SignOutUseCase
    private readonly tokenservice: ITokenService


    constructor(signInUseCase: SignInUseCase, signUpUseCase: SignUpUseCase, signOutUseCase: SignOutUseCase, tokenservice: ITokenService) {
        this.signInUseCase = signInUseCase
        this.tokenservice = tokenservice
        this.signUpUsecase = signUpUseCase
        this.signOutUseCase = signOutUseCase
    }

    public async signin(req: express.Request, res: express.Response) {
        try {
            let { email, password, name, auth_type } = req.body
            return this.signInUseCase.execute(email, password, name, auth_type)
                .then((id: string) => res.status(200).json({ auth_token: this.tokenservice.encode(id) })
                ).catch((err: Error) => res.status(404).json({ error: err.message }))
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    }

    public async signup(req: express.Request, res: express.Response) {
        try {
            const { name, email, password, auth_type } = req.body
            return this.signUpUsecase.execute(name, email, password, auth_type)
                .then((email: string) => res.status(200).json({ auth_token: this.tokenservice.encode(email) })
                ).catch((err: Error) => res.status(404).json({ error: err.message }))
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    }

    public async signout(req: express.Request, res: express.Response) {
        try {
            const token = req.headers.authorization!
            return this.signOutUseCase
                .execute(token)
                .then((result) => res.status(200).json({ message : result })
                ).catch((err: Error) => res.status(404).json({ error: err.message }))
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    }

} 