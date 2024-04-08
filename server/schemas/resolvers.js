//Query and mutation functionality is defined
const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parents, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                console.log(context.user)
                return userData;
            }
            throw AuthenticationError('Not logged in');
        },
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw AuthenticationError;
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw AuthenticationError;
            }
            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, { email, username, password }) => {
            const user = await User.create({email, username, password });
            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const savedBook = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookData } },
                    { new: true }
                );
                return savedBook;
            }
            throw AuthenticationError('You must be logged in to perform this action!');
        },
        
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw AuthenticationError('You must be logged in to perform this action!');
        },
    },
};

module.exports = resolvers;
