//this whole page is new
import { gql } from '@apollo/client';

export const USER_Q = gql`
  {
    user {
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
