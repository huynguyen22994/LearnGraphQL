import { gql } from '@apollo/client'

const GetBooks = gql`
    query getBooks {
        books {
            _id
            name,
            author {
                name,
                age
            }
        }
    }
`

const GetSingleBook = gql`
   query Book($id: ID!) {
    book(_id: $id) {
        _id
        name
        genre
        author {
                _id
                name
                age
                books {
                    _id
                    name
                }
            }  
        }
    }
`

export { 
    GetBooks,
    GetSingleBook
}