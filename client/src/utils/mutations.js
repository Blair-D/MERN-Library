//this whole page of code is new
import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        savedBooks {
          bookId
           authors
           title
           description
           image
           link
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        savedBooks {
          bookId
           authors
           title
           description
           image
           link
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      _id
      username
      email
      savedBooks {
        bookId
         authors
         title
         description
         image
         link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation delterBook($bookId: ID!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
         bookId
         authors
         title
         description
         image
         link
      }
    }
  }
`;