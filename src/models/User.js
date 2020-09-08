const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const schema = mongoose.Schema({
    name : {
        type : String, 
        required : true
    },
    email : {
        type : String,
        unique: true,
        required : true
    },
    password : {
        type : String, 
        required : true
    }
})

schema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

const User = mongoose.model('users', schema)

module.exports = User