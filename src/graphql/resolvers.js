const User = require('../models/User')

const resolvers = {
    hello: 'hello world',

    createUser: async ({ name, email, password }) => {
        const verifyEmail = await User.findOne({ email })

        if (!!verifyEmail) {
            return { error: "Este email já existe" }
        }

        if (password.length < 5) {
            return { error: "A senha deve conter pelo menos 5 caracteres" }
        }

        const newUser = {
            name,
            email,
            password
        }

        await User.create(newUser)

        const token = '123456' 

        return token
    }
}

module.exports = resolvers