import { Suburb } from "@prisma/client";
import { GraphQLContext } from "../context";

export const typeDefs = /* GraphQL */ `
  type Suburb {
    id: ID!
    name: String
    city: City
  }

  extend type Query {
    getAllSuburbs: [Suburb]
  }

  extend type Mutation {
    createSuburb(city_id: Int, name: String): Suburb
  }
`;

export const resolvers = {
  Suburb: {
    city: async (parent: Suburb, args: {}, context: GraphQLContext) => {
      return context.prisma.city.findUnique({
        where: {
          id: parent.city_id,
        },
      });
    },
  },
  Query: {
    getAllSuburbs: async (
      parent: Suburb,
      args: {},
      context: GraphQLContext
    ) => {
      return context.prisma.suburb.findMany();
    },
  },
  Mutation: {
    createSuburb: async (
      parent: Suburb,
      args: { city_id: number; name: string },
      context: GraphQLContext
    ) => {
      return context.prisma.suburb.create({
        data: {
          city_id: args.city_id,
          name: args.name,
        },
      });
    },
  },
};
