import mongoose from "mongoose";
import AuthRepository from "./data/repository/AuthRepository";
import JwtTokenService from "./data/Services/JwtTokenService";
import BcryptPasswordService from "./data/Services/BcryptPasswordSesrvice";
import AuthRouter from "./entrypoint/AuthRouter";
import TokenValidator from "./helpers/TokenValidator";
import InMemoryTokenStore from "./data/Services/InMemoryTokenStore";
import NodeCache from 'node-cache';





export default class CompositionRoot {
    private static client: mongoose.Mongoose
    private static InMemoeryClient : NodeCache

    public static configure() {
        this.InMemoeryClient = new NodeCache();
        this.client = new mongoose.Mongoose()
        const dbName = 'food-app';
        const connectionStr = encodeURI(process.env.TEST_DB as string)
        this.client.connect(connectionStr, { dbName })
    }

    public static authRouter() {
        const repository = new AuthRepository(this.client)
        const tokenService = new JwtTokenService(process.env.PRIVATE_KEY as string) 
        const passwordService = new BcryptPasswordService()
        const tokenStore = new InMemoryTokenStore(this.InMemoeryClient)
        const tokenValidator = new TokenValidator(tokenService, tokenStore)

        return AuthRouter.configure(repository, tokenService, tokenStore, passwordService,  tokenValidator)
    }
}