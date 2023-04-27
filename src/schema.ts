import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLContext } from "./context";

import {
  typeDefs as stateDefs,
  resolvers as stateResolvers,
} from "./graphql/state";

import {
  typeDefs as cityDefs,
  resolvers as cityResolvers,
} from "./graphql/city";

import {
  typeDefs as suburbDefs,
  resolvers as suburbResolvers,
} from "./graphql/suburb";

import {
  typeDefs as streetDefs,
  resolvers as streetResolvers,
} from "./graphql/street";

import {
  typeDefs as addresDefs,
  resolvers as addressResolvers,
} from "./graphql/address";

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
      return "Empty query";
    },
  },
  Mutation: {
    _empty: () => {
      return "Empty mutation";
    },
  },
};

export const schema = makeExecutableSchema({
  resolvers: [
    resolvers,
    stateResolvers,
    cityResolvers,
    suburbResolvers,
    streetResolvers,
    addressResolvers,
  ],
  typeDefs: [typeDefs, stateDefs, cityDefs, suburbDefs, streetDefs, addresDefs],
});
