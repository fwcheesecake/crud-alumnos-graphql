import { State } from "@prisma/client";
import { GraphQLContext } from "../context";

export const typeDefs = /* GraphQL */ `
  type State {
    id: ID!
    name: String
  }

  extend type Query {
    getAllStates: [State]
  }

  extend type Mutation {
    createState(name: String): State
    deleteState(id:Int):State
    updateState(id:Int, name:String):State
  }
`;

export const resolvers = {
  Query: {
    getAllStates: async (parent: State, args: {}, context: GraphQLContext) => {
      return context.prisma.state.findMany();
    },
  },
  Mutation: {
    createState: async (
      parent: State,
      args: { name: string },
      context: GraphQLContext
    ) => {
      return context.prisma.state.create({
        data: {
          name: args.name,
        },
      });
    },
    deleteState: async (parent: State,
      args: { id: number },
      context: GraphQLContext) => {
      return context.prisma.state.delete({
        where: {
          id: args.id,
        }
      });
    },
    updateState: async (parent: State,
      args: { id: number, name: string },
      context: GraphQLContext) => {
      return context.prisma.state.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
        }
      })

    }
  },
};
