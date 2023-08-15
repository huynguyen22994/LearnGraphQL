const Book = require('./Book')
const Author = require('./Author')

const mongoDBMethods = {
    getAllBooks: async () => await Book.find(),
    getBookByAuthorId: async authorId => await Book.find({ authorId: authorId }),
    createBook: async agrs => {
        const newBook = new Book({
            name: agrs.name,
            genre: agrs.genre,
            authorId: agrs.authorId
        })
        return await newBook.save();
    },
    getAllAuthors: async () => await Author.find(),
    getAuthorById: async (id) => await Author.findOne({ _id: id }),
    createAuthor: async agrs => {
        const newAuthor = new Author({
            name: agrs.name,
            age: agrs.age
        })
        return await newAuthor.save();
    }
}

module.exports = mongoDBMethods