const mongoose = require('mongoose')
const resolvers = require('./graphql/resolvers')
const User = require('./models/User')

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testJest', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})

describe('Create user', () => {
    it('Deve criar um usuario no db e retornar um jwt', async () => {
        expect(await resolvers.createUser({ name: "Robert", email: "robert@gmail.com", password: "123456" })).toStrictEqual("123456")
    })

    it('Deve retornar um erro caso o email já exista',async() => {
        expect(await resolvers.createUser({ name: "Robert", email: "robert@gmail.com", password: "123456" })).toStrictEqual(Error('Este email já existe'))
    })

    it('Deve retornar um erro caso a senha tenha menos de 5 caracteres', async () => {
        expect(await resolvers.createUser({ name: "Robert", email: "robert1@gmail.com", password: "1234" })).toStrictEqual(Error("A senha deve conter pelo menos 5 caracteres"))
    })
})

describe('Login', () => {
    it('Deve retornar um JWT se o login estiver correto', async () => {
        expect(await resolvers.login({ email: "robert@gmail.com", password: "123456" })).toStrictEqual("123456")
    })
    it('Deve retornar um erro caso tenha algo errado com o login', async () => {
        expect(await resolvers.login({ email: "robert@gmail.com", password: '1234566' })).toStrictEqual(Error("As credenciais não batem com as do nosso sitema"))
    })
    it('Deve retornar um erro caso tenha algo errado com o login', async () => {
        expect(await resolvers.login({ email: "robaaaert@gmail.com", password: '1234566' })).toStrictEqual(Error("As credenciais não batem com as do nosso sitema"))
    })
})

afterAll(async () => {
    await User.deleteMany()
    mongoose.disconnect()
})