const config = {
    DB: process.env.TEST === true ? 'mongodb://localhost:27017/testetestejest' : 'mongodb://localhost:27017/testingJest'
}

module.exports = config