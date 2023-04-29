import { Tutor } from "@prisma/client";
import { GraphQLContext } from "../context";
import { Context } from "vm";

export const typeDefs = /* GraphQL */ `
    type Tutor{
        id:ID!
        name:String
    }

    extend type Query{
        getAllTutors:[Tutor]
    }
    extend type Mutation{
        createTutor(name:String):Tutor
        deleteTutor(id:Int):Tutor
        updateTutor(id:Int, name:String):Tutor
    }
`;

export const resolvers = {
    Query: {
        getAllTutors: async (parent: Tutor, args: {}, context: GraphQLContext) => {
            return context.prisma.tutor.findMany();
        },
    },
    Mutation: {
        createTutor: async (parent: Tutor,
            args: { name: string },
            context: GraphQLContext) => {
            return context.prisma.tutor.create({
                data: {
                    name: args.name,
                }
            })
        },
        deleteTutor: async (parent: Tutor,
            args: { id: number },
            context: GraphQLContext) => {
            return context.prisma.tutor.delete({
                where: {
                    id: args.id,
                }
            })
        },
        updateTutor:async (parent:Tutor, 
            args:{id: number, name:string},
            context:GraphQLContext) => {
            return context.prisma.tutor.update({
                where:{
                    id:args.id,
                },
                data:{
                    name:args.name,
                }
            })
        }
    }
}