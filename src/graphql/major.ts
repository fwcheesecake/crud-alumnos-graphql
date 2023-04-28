import { Career, Major } from "@prisma/client";
import { GraphQLContext } from "../context";

export const typeDefs = /* GraphQL */ `
    type Major{
        id:ID!
        name:String
        career:Career
    }

    extend type Query{
        getAllMajor:[Major]
    }

    extend type Mutation{
        createMajor(name:String, career_id:Int):Major
        deleteMajor(id:Int):Major
        updateMajor(id:Int, name:String):Major
    }
`;

export const resolvers = {
    Query: {
        getAllMajor: async (parent: Major, args: {}, context: GraphQLContext) => {
            return context.prisma.major.findMany();
        }
    },
    Major: {
        career: async (parent: Major, args: {}, context: GraphQLContext) => {
            return context.prisma.career.findUnique({
                where: {
                    id: parent.career_id,
                }
            })
        }
    },
    Mutation: {
        createMajor: async (parent: Major,
            args: { name: string, career_id: number }, context: GraphQLContext) => {
            return context.prisma.major.create({
                data: {
                    name: args.name,
                    career_id: args.career_id,
                }
            })
        },
        deleteMajor: async (parent: Major,
            args: { id: number },
            context: GraphQLContext) => {
            return context.prisma.major.delete({
                where: {
                    id: args.id
                }
            })
        },
        updateMajor: async (parent: Career,
            args: { id: number, name: string },
            context: GraphQLContext) => {
            return context.prisma.major.update({
                where: {
                    id: args.id,
                },
                data: {
                    name: args.name,
                }
            })

        }
    }
}