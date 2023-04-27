import { City } from "@prisma/client";
import { GraphQLContext } from "../context";

export const typeDefs = /* GraphQL */ `
  type City {
    id: ID!
    name: String
    state: State
  }

  extend type Query {
    getAllCities: [City]
  }

  extend type Mutation {
    createCity(state_id: Int, name: String): City
  }
`;

export const resolvers = {
  City: {
    state: async (parent: City, args: {}, context: GraphQLContext) => {
      return context.prisma.state.findUnique({
        where: {
          id: parent.state_id,
        },
      });
    },
  },
  Query: {
    getAllCities: async (parent: City, args: {}, context: GraphQLContext) => {
      return context.prisma.city.findMany();
    },
  },
  Mutation: {
    createCity: async (
      parent: City,
      args: { state_id: number; name: string },
      context: GraphQLContext
    ) => {
      return context.prisma.city.create({
        data: {
          state_id: args.state_id,
          name: args.name,
        },
      });
    },
  },
};
