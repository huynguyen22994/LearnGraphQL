const { books, authors } = require('../data')
const { Book, Author } = require('../models')

const resolvers = {
    // Query
    Query: {
        books: async (parent, agrs, context) => { 
            const b = await context.getAllBooks();
            console.log(b)
           return b;
        },
        book: (parent, agrs) => books.find(book => book.id == agrs.id),
        /*
            {
                id: 1,
                name: "Book 1",
                authorId: 1
            }
            => sau khi query lấy dk data book, thì có trường authorId là 1 => tiếp tục map với resolver author của Book để lấy được giá trị của 
        */
        authors: () => authors,
        author: (parent, agrs) => authors.find(authors => authors.id == agrs.id)
    },
    // Do Book có trường author là Type Author, nên add thêm query cho Book để xử lý trả ra đúng kiểu dữ liệu cho trường author
    Book: {
        author: async (parrent, agrs) => { 
            // Sử dụng parrent để lấy authorId từ book => lấy giá trị của author
            // => Thì ra đây là sức mạnh của Graphql :))))))))
            return authors.find(author => author.id == parrent.authorId)
         }
    },
    Author: {
        books: (parrent, agrs) => {
            return books.filter(book => book.id == parrent.id)
        }
    },

    // Mutation
    Mutation: {
        createAuthor: async (parent, agrs) => {
            // Save record
            const newAuthor = new Author({
                name: agrs.name,
                age: agrs.age
            })
            return await newAuthor.save();
        },
        createBook: async (parent, agrs) => {
            console.log(agrs);
            const newBook = new Book({
                name: agrs.name,
                gener: agrs.gener,
                authorId: agrs.authorId
            })
            return await newBook.save();
        }
    }
}

module.exports = resolvers;