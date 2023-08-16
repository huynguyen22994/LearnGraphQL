import { gql } from '@apollo/client'

// Query
const GetAuthors = gql`
    query Authors {
        authors {
        _id
        name
        age  
        }
    }
`

// Mutation
const AddAuthor = gql`
    mutation CreateAuthor($name: String, $age: Int) {
        createAuthor(name: $name, age: $age) {
            _id
            name
            age
        }
    }
`

export {
    GetAuthors,
    AddAuthor
}