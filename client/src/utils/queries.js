import { gql } from '@apollo/client';

export const USER_Q = gql`
  {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;
