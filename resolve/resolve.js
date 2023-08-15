// This is mocking data
// const { books, authors } = require('../data')

const resolvers = {
    // Query
    Query: {
        books: async (parent, agrs, { getAllBooks }) => await getAllBooks(),
        book: (parent, agrs) => books.find(book => book.id == agrs.id),
        /*
            {
                id: 1,
                name: "Book 1",
                authorId: 1
            }
            => sau khi query lấy dk data book, thì có trường authorId là 1 => tiếp tục map với resolver author của Book để lấy được giá trị của 
        */
        authors: async (parent, agrs, { getAllAuthors }) => await getAllAuthors(),
        author: async (parent, agrs, { getAuthorById }) => await getAuthorById(agrs.id)
    },
    // Do Book có trường author là Type Author, nên add thêm query cho Book để xử lý trả ra đúng kiểu dữ liệu cho trường author
    Book: {
        author: async (parrent, agrs, context) => { 
            // Sử dụng parrent để lấy authorId từ book => lấy giá trị của author
            // => Thì ra đây là sức mạnh của Graphql :))))))))
            // return authors.find(author => author.id == parrent.authorId)
            return await context.getAuthorById(parrent.authorId);
         }
    },
    Author: {
        books: async (parrent, agrs, { getBookByAuthorId }) => await getBookByAuthorId(parrent._id)
    },

    // Mutation
    Mutation: {
        createAuthor: async (parent, agrs, { createAuthor }) => await createAuthor(agrs),
        createBook: async (parent, agrs, { createBook }) => await createBook(agrs)
    }
}

module.exports = resolvers;