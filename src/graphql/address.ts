import { Address } from "@prisma/client";
import { GraphQLContext } from "../context";

export const typeDefs = /* GraphQL */ `
  type Address {
    id: ID!
    zipcode: String
    exterior: String
    interior: String
    street: Street
    
  }

  extend type Query {
    getAllAddresses: [Address]
  }

  extend type Mutation {
    createAddress(
      zipcode: String
      exterior: String
      interior: String
      street_id: Int
      suburb_id:Int
    ): Address
  }
`;

export const resolvers = {
  Address: {
    street: async (parent: Address, args: {}, context: GraphQLContext) => {
      return context.prisma.street.findUnique({
        where: {
          id: parent.street_id,
        },
      });
    },
    /*
    students: async (parent: Address, args: {}, context: GraphQLContext) => {
      return context.prisma.student.findMany({
        where: {
          address_id: parent.id,
        },
      });
    },
    */
  },
  Query: {
    getAllAddresses: async (
      parent: Address,
      args: {},
      context: GraphQLContext
    ) => {
      return context.prisma.address.findMany();
    },
  },
  Mutation: {
    createAddress: async (
      parent: Address,
      args: {
        zipcode: string;
        exterior: string;
        interior: string;
        street_id: number;
        suburb_id:number
      },
      context: GraphQLContext
    ) => {
      return context.prisma.address.create({
        data: {
          zipcode: args.zipcode,
          exterior: args.exterior,
          interior: args.interior,
          street_id: args.street_id,
          suburb_id:args.suburb_id
        },
      });
    },
  },
};
