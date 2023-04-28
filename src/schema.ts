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

import {
  typeDefs as careerDefs,
  resolvers as careerResolver,
} from "./graphql/career";

import {
  typeDefs as majorDefs,
  resolvers as majorResolver,
} from "./graphql/major";

import {
  typeDefs as studyPlanDefs,
  resolvers as studyPlanResolver,
} from "./graphql/study_plan"

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
    careerResolver,
    majorResolver,
    studyPlanResolver,
  ],
  typeDefs: [typeDefs, stateDefs, cityDefs, suburbDefs, streetDefs, addresDefs, careerDefs, majorDefs, studyPlanDefs],
});
