const { Token, AuthenticationError } = require('../utils/auth');
const { User } = require('../models');
const resolvers = {
    Mutation: {
        addUser: async (args) => {
            const user = await User.create(args);
            const token = Token(user);
            return { token, user };
        },

        login: async ({ email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw AuthenticationError;
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw AuthenticationError;
            }
            const token = Token(user);
            return { token, user };
        },

        removeBook: async ({ bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw AuthenticationError;
        },

        saveBook: async ({ bookData }, context) => {
            if (context.user) {
                const savedBook = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookData } },
                    { new: true }
                );
                return savedBook;
            }
            throw AuthenticationError;
        },
    },

    Query: {
        me: async (context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                console.log(context.user)
                return userData;
            }
            throw AuthenticationError;
        },
    },

    
};

module.exports = resolvers;
