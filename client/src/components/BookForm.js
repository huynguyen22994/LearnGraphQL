import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Query, Mutation, QueryString } from '../graphql-client';

function BookForm({ onSubmitCB }) {
    const [newBook, setNewBook] = useState({
        name: '', authorId: ''
    })
    // GraphQl
    const { loading, error, data } = Query.GetAuthors();
    const [addBook, dataMutation] = Mutation.AddSingleBook();

    // Variables
    const authors = data ? data.authors : [];

    // Logic
    if(dataMutation.loading) { return <div>Is add data ...</div> }

    // functions
    const onInputChange = event => {
        setNewBook({
            ...newBook,
            [event.target.name]: event.target.value
        })
    }

    const onSubmitBookForm = event => {
        event.preventDefault();
        addBook({
            variables: {
                ...newBook
            },
            refetchQueries: [{ query: QueryString.GetBooks }]
        })
        setNewBook({  name: '', authorId: '' });
        onSubmitCB && onSubmitCB();
    }

    return ( 
        <>
             <Form onSubmit={onSubmitBookForm}>
                <Form.Group className="mb-3">
                    <Form.Label>Tên sách</Form.Label>
                    <Form.Control type="text" placeholder="Tên sách" name="name" value={newBook.name} onChange={onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Tác giả</Form.Label>
                    { loading ? <div>Loading author...</div> : null }
                    <Form.Select onChange={onInputChange} name='authorId' value={newBook.authorId}>
                        <option value="" disabled>Chọn tác giả</option>
                        {
                            authors.map((author) => {
                                return <option key={author._id} value={author._id}>{ author.name }</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>
                <hr></hr>
                <Button variant="primary" type="submit" onClick={onSubmitBookForm}>
                    Thêm
                </Button>
            </Form>
        </>
     );
}

export default BookForm;