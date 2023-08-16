import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Modal, Button  } from 'react-bootstrap';
import { Query } from '../graphql-client';

import BookDetail from './BookDetail';
import BookForm from './BookForm';
import AuthorForm from './AuthorForm';

function Book() {
    const [showBookForm, setShowBookForm] = useState(false);
    const [showAuthorForm, setShowAuthorForm] = useState(false);
    const [bookSelected, setBookSelected] = useState(null);

    //Graphql
    const { loading, error, data } = Query.GetBooks();
    

    const handleClose = () => {
        setShowBookForm(false)
    }

    const handleCloseAuthorForm = () => {
        setShowAuthorForm(false)
    }

    const onSubmitCB = () => {
        handleClose();
        handleCloseAuthorForm();
    }

    return ( 
        <>
            <Button variant="primary" onClick={() => setShowBookForm(true) }>Thêm sách</Button> 
            <Button variant="primary" onClick={() => setShowAuthorForm(true) } style={{ marginLeft: 5 }}>Thêm tác giả</Button> 
            <hr></hr>
            <Row>
                <Col xs="9">
                    <Row>
                        {
                            data && data.books.map((book) => {
                                return <Col xs='3' key={book._id} className='mt-2 custom-card'>
                                    <Card border="primary" onClick={() => setBookSelected(book._id)}>
                                        <Card.Header>
                                            { book.name }
                                        </Card.Header>
                                        <Card.Body>
                                            Tác giả: { book.author.name }
                                        </Card.Body>
                                    </Card>
                                </Col>       
                            })
                        }
                    </Row>
                </Col>
                <Col xs="3">
                    <BookDetail bookId={ bookSelected }></BookDetail>
                </Col>
            </Row>

            <Modal show={showBookForm} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm sách</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <BookForm onSubmitCB={onSubmitCB}></BookForm>
                </Modal.Body>
            </Modal>

            <Modal show={showAuthorForm} onHide={handleCloseAuthorForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm tác giả</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <AuthorForm onSubmitCB={onSubmitCB}></AuthorForm>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Book;