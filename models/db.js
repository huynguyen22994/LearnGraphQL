const Book = require('./Book')
const Author = require('./Author')

const mongoDBMethods = {
    getAllBooks: async () => await Book.find()
}

module.exports = mongoDBMethods