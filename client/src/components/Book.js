import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Modal, Button  } from 'react-bootstrap';
import Query from '../graphql-client';

import BookDetail from './BookDetail';
import BookForm from './BookForm';
import AuthorForm from './AuthorForm';

function Book() {
    const [showBookForm, setShowBookForm] = useState(false);
    const [showAuthorForm, setShowAuthorForm] = useState(false);
    const [bookSelected, setBookSelected] = useState(null);

    const { loading, error, data } = Query.GetBooks();
    

    const handleClose = () => {
        setShowBookForm(false)
    }

    const handleCloseAuthorForm = () => {
        setShowAuthorForm(false)
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
                                return <Col xs='3' key={book._id}>
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
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <BookForm></BookForm>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAuthorForm} onHide={handleCloseAuthorForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <BookForm></BookForm>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAuthorForm}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseAuthorForm}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Book;