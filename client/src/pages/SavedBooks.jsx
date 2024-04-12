// 
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { USER_Q } from '../utils/queries';
import { remBkId } from '../utils/localStorage';
import { REM_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';


const SavedBooks = () => {
  const { loading, data } = useQuery(USER_Q);
  const [removeBook] = useMutation(REM_BOOK)

  const userData = data?.me || {};
  console.log(userData)

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const {data} = await removeBook({
        variables: {bookId},
      });

      // remove the desired book from local storage
      remBkId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div>
        <Container fluid className="text-light bg-dark p-5">
          <h1>Viewing {userData.username}'s books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks?.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'
            }:`
            : 'You have no saved books!'}
        </h2>
        <div>
          <Row>
            {userData.savedBooks?.map((book) => {
              return (
                <Col md="4">
                  <Card key={book.bookId} border="dark">
                    {book.image ? (
                      <Card.Img
                        src={book.image}
                        alt={`The cover for ${book.title}`}
                        variant="top"
                      />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <p className="small">Authors: {book.authors}</p>
                      <Card.Text>{book.description}</Card.Text>
                      <Button
                        className="btn-block btn-danger"
                        onClick={() => handleDeleteBook(book.bookId)}
                      >
                        Delete this Book!
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
    </>
  );
};


export default SavedBooks;