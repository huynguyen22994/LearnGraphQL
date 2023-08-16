import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Query, Mutation, QueryString } from '../graphql-client';

function AuthorForm({ onSubmitCB }) {
    const [newAuthor, setNewAuthor] = useState({
        name: '', age: ''
    })
    // GraphQl
    const [addAuthor, dataMutation] = Mutation.AddAuthor();

    // Variables

    // Logic
    if(dataMutation.loading) { return <div>Is add data ...</div> }

    // functions
    const onInputChange = event => {
        setNewAuthor({
            ...newAuthor,
            [event.target.name]: event.target.value
        })
    }

    const onSubmitAuthorForm = event => {
        event.preventDefault();
        addAuthor({
            variables: {
                name: newAuthor.name,
                age: parseInt(newAuthor.age)
            },
            refetchQueries: [{ query: QueryString.GetAuthors }]
        })
        setNewAuthor({  name: '', age: '' });
        onSubmitCB && onSubmitCB();
    }

    return ( 
        <>
            <Form onSubmit={onSubmitAuthorForm}>
                <Form.Group className="mb-3">
                    <Form.Label>Tên tách giả</Form.Label>
                    <Form.Control type="text" placeholder="Tên tác giả" name="name" value={newAuthor.name} onChange={onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Tuổi</Form.Label>
                    <Form.Control type="number" placeholder="Tuổi" name="age" value={newAuthor.age} onChange={onInputChange} />
                </Form.Group>

                <hr></hr>
                <Button variant="primary" type="submit" onClick={onSubmitAuthorForm}>
                    Thêm
                </Button>
            </Form>
        </>
     );
}

export default AuthorForm;