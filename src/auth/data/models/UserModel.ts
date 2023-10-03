import * as mongoose from 'mongoose'

export interface UserModel extends mongoose.Document {
    email: string,
    name: string,
    type: string,
    id: string,
    password?: string,
}

export const Userschema = new mongoose.Schema({
    email: {type: String, required: true},
    name: String,
    password: String,
    type: {type: String, required: true},
})