import { useQuery, useMutation } from '@apollo/client'
import { GetBooks, GetSingleBook, AddSingleBook }  from './bookQueries'
import { GetAuthors, AddAuthor } from './authorQueries'

const Query = {
    // Book
    GetBooks: () => useQuery(GetBooks),
    GetSingleBook: (params) => useQuery(GetSingleBook, params),
    // Author
    GetAuthors: () => useQuery(GetAuthors)
}

const Mutation = {
    // Book
    AddSingleBook: () => useMutation(AddSingleBook),

    // Author
    AddAuthor: () => useMutation(AddAuthor)
}

const QueryString = {
    GetBooks,
    GetAuthors
}

export { Query, Mutation, QueryString }