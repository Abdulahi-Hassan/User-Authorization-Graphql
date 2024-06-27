const { ApolloServer } = require("apollo-server");

const typeDefs = require("../Graphql/TypeDefs");
const resolvers = require("../Graphql/Resolvers");

const Server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

module.exports = Server;
