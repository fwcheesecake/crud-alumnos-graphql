import { State } from "@prisma/client";
import { GraphQLContext } from "../context";

export const typeDefs = /* GraphQL */ `
    type State {
        id:     ID!
        name:   String
    }

    extend type Query {
        getAllStates: [State]
    }

    extend type Mutation {
        createState(name: String): State
    }
`;

export const resolvers = {
  Query: {
    getAllStates: async (parent: State, args: {}, context: GraphQLContext) => {
      return context.prisma.state.findMany();
    },
  },
  Mutation: {
    createState: async (parent: State, args: {name: string}, context: GraphQLContext) => {
        return context.prisma.state.create({
            data: {
                name: args.name
            }
        })
    }
  },
};
