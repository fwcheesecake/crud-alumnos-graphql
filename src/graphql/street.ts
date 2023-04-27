import { Street } from "@prisma/client";
import { GraphQLContext } from "../context";

export const typeDefs = /* GraphQL */ `
  type Street {
    id: ID!
    name: String
    suburb: Suburb
  }

  extend type Query {
    getAllStreets: [Street]
  }

  extend type Mutation {
    createStreet(suburb_id: Int, name: String): Street
  }
`;

export const resolvers = {
  Street: {
    suburb: async (parent: Street, args: {}, context: GraphQLContext) => {
      return context.prisma.suburb.findUnique({
        where: {
          id: parent.suburb_id,
        },
      });
    },
  },
  Query: {
    getAllStreets: async (
      parent: Street,
      args: {},
      context: GraphQLContext
    ) => {
      return context.prisma.street.findMany();
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
          suburb_id: args.suburb_id,
          name: args.name,
        },
      });
    },
  },
};
