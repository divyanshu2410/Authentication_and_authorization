import User from "./User";

export default interface IAuthRepository {
    find(email: string): Promise<User>
    add(
        email: string,  
        type: string, 
        name?: string,
        id?: string,
        passwordHash?: string,
        ): Promise<string>
}