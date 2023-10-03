import { expect } from 'chai'
import dotenv from 'dotenv'
import { beforeEach } from 'mocha'
import mongoose from 'mongoose'
import AuthRepository from '../../../../src/auth/data/repository/AuthRepository'

dotenv.config()

describe('AuthRepository', () => {
  let client: mongoose.Mongoose
  let sut: AuthRepository

  beforeEach(() => {
    client = new mongoose.Mongoose()
    const dbName = 'food-app'
    const connectionStr = encodeURI(process.env.TEST_DB as string)
    client.connect(connectionStr, { dbName})

    sut = new AuthRepository(client)
  })

  afterEach(() => {
    client.disconnect()
  })

  it('should return user id when added to db', async () => {
    //arrange
    const user = {
      name: 'Gen',
      email: 'mail2@mail.com',
      password: 'pasnsdoibf2',
      type: 'email',
    }

    //act
    const result = await sut
      .add(user.name, user.email, user.type, user.password)
      .catch(() => null)
    //assert
    expect(result).to.not.be.empty
  })
})