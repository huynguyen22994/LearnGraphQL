import React from 'react';
import { Card } from 'react-bootstrap';
import Query from '../graphql-client';

function BookDetail({ bookId }) {
    const { loading, error, data } = Query.GetSingleBook({
        variables: {
            id: bookId
        }
    });
    const book = data ? data.book : {};

    return ( 
    <>
        <Card>
            <Card.Header>Chi tiết sách</Card.Header>
            <Card.Body>
                <Card.Title>{ book.name }</Card.Title>
                <Card.Subtitle>tac gia: { book.author && book.author.name }</Card.Subtitle>
                <Card.Text>The loai: { book.genre }</Card.Text>
                <Card.Text>Các sách liên quan đến tác giả:</Card.Text>
                <ul>
                    {
                        book.author && book.author.books &&
                        book.author.books.map((book, index) => {
                            return <li key={ index }>{ book.name }</li>
                        })
                    }
                </ul>
            </Card.Body>
        </Card>
    </>);
}

export default BookDetail;