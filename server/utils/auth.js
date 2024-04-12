const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'supersecret';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Error could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),

  authMiddleware: function ({ req }) {
    let token = req.headers.authorization|| req.body.token || req.query.token;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(secret, token, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Error invalid token');
      return res.status(400).json({ message: 'invalid token!' });
    }
    return req;
  },

  Token: function ({username, email,  _id }) {
    const payload = {username, email,  _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
