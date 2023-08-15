import { useQuery } from '@apollo/client'
import { GetBooks, GetSingleBook }  from './bookQueries'


const Query = {
    GetBooks: () => useQuery(GetBooks),
    GetSingleBook: (params) => useQuery(GetSingleBook, params)
}

export default Query