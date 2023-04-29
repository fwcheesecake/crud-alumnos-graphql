import { Street } from "@prisma/client";
import { GraphQLContext } from "../context";

export const typeDefs = /* GraphQL */ `
  type Street {
    id: ID!
    name: String
  }

  extend type Query {
    getAllStreets: [Street]
  }

  extend type Mutation {
    createStreet(suburb_id: Int, name: String): Street
  }
`;

export const resolvers = {
  Query: {
    getAllStreets: async (
      parent: Street,
      args: {},
      context: GraphQLContext
    ) => {
      return context.prisma.street.findMany({
        include:{
          suburbs:true
        }
      });
    },
  },
  Mutation: {
    createStreet: async (
      parent: Street,
      args: { suburb_id: number; name: string },
      context: GraphQLContext
    ) => {
      return context.prisma.street.create({
        data: {
          name: args.name,
        },
      });
    },
  },
};
