const { GraphQLError } = require('graphql'); 
const jwt = require('jsonwebtoken'); 

//define both the secret token and exp date/time
const secret = 'SuperSecret'; 
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED', 
    },
  }),

  //this function is for auth. routes
  authMiddleware: function ({ req, res }) {
    let token = req.query.token || req.body.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return res.status(400).json({ message: 'You have no token!' });
    }

  //verify token is valid, if true retrieve user data
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      return res.status(400).json({ message: 'invalid token!' });
    }
    next();
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id }; 
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration }); 
  }, 
}; 
