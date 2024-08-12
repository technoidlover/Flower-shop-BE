const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    carts: [Cart]
  }

  type Service {
    _id: ID
    name: String
    price: Int
    image: String
  }

  type Cart {
    _id: ID
    service: [Service]
  }

  type Reserve {
    _id: ID
    name: String
    service: String
    description: String
    price: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    services: [Service]
    service(name: String!): Service
    carts: [Cart]
    cart(_id: ID!): Cart
    reserves: [Reserve]
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      fullName: String!
      phoneNumber: String!
      address: String!
      service: String!
      description: String!
      price: Int!
      eventStartDate: String!
      serviceStartDate: String!
      favoriteStyle: String!
      budget: Int!
      contactPerson: String!
      contactMethod: String!
    ): Auth

    login(email: String!, password: String!): Auth

    addService(
      name: String!
      price: Int!
      image: String!
      cartId: ID!
    ): Service

    addCart(
      event: String!
      userId: ID!
    ): Cart

    addReserve(
      name: String!
      service: String!
      description: String!
      price: Int!
    ): Reserve

    removeReserve(
      reserveId: ID!
    ): Reserve
  }
`;

module.exports = typeDefs;