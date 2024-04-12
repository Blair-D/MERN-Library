const typeDefs = `
  type Query {
     me: User
    }

  type User {
    _id: ID!
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Book {
    bookId: ID!
    title: String
    authors: [String]
    description: String
    image: String
    link: String  
  }
    
  input BookInput {
    bookId: String!
    title: String
    authors: [String]
    description: String
    image: String
    link: String
  }
    
  type Mutation {
    addUser(email: String!, username: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeBook(bookId: ID!): User
    saveBook(bookData: BookInput!): User
  }
`;

module.exports = typeDefs;