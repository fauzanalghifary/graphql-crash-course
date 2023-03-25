import { gql } from 'apollo-server'

const typeDefs = gql`
    type Query {
        greeting: String
    }
`;

const resolvers = {
    Query: {
        greeting: () => 'Hello World!'
    }
};

export { typeDefs, resolvers };