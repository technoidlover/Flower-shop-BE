const { User, Service, Cart } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find().populate('services');
        },

        services: async () => {
            return await Service.find({}).populate('users');
        },

        reserves: async () => {
            return await Reserve.find({}).populate('users');
        },

    },

    Mutation: {
        addUser: async (parent, { username, email, password, fullName, phoneNumber, address, service, description, price, eventStartDate, serviceStartDate, favoriteStyle, budget, contactPerson, contactMethod }) => {
            const reserve = await Reserve.create({
               service, description, price, eventStartDate, serviceStartDate, favoriteStyle, budget, contactPerson, contactMethod
            })
            const user = await User.create({
                username, email,
                password, fullName, phoneNumber, address
            });
            await User.findOneAndUpdate({ _id: user._id }, { $push: { reserves: reserve._id } })

            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            console.log(user)
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },

        addReserve: async (parent, { name, service, description, price }) => {
            const newReserve = await Reserve.create({ name, service, description, price });
            return newReserve;
        },

        removeReserve: async (parent, { reserveId }) => {
            return await Reserve.findOneAndDelete({ _id: reserveId });
        },
    },
};



module.exports = resolvers;