const User = require('../models/User')
const bcrypt = require('bcryptjs')

const resolvers = {
    login: async ({ email, password }) => {
        const user = await User.findOne({ email })

        const token = '123456'

        if (!!user && await bcrypt.compare(password, user.password)) {
            return token
        } return new Error("As credenciais não batem com as do nosso sitema")
    },

    createUser: async ({ name, email, password }) => {
        const verifyEmail = await User.findOne({ email })

        if (!!verifyEmail) {
            return new Error('Este email já existe')
        }

        if (password.length < 5) {
            return new Error("A senha deve conter pelo menos 5 caracteres")
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