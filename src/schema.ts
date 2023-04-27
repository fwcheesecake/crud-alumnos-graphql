import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLContext } from "./context";

import {
  typeDefs as stateDefs,
  resolvers as stateResolvers,
} from "./graphql/state";

const typeDefs = /* GraphQL */ `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const resolvers = {
  Query: {
    _empty: () => {
      return "Empty query"
    }
  },
  Mutation: {
    _empty: () => {
      return "Empty mutation"
    }
  }
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers, stateResolvers],
  typeDefs: [typeDefs, stateDefs],
});
