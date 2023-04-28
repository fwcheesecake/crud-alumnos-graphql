import { Career } from "@prisma/client";
import { GraphQLContext } from "../context";


export const typeDefs = /* GraphQL */ `
    type Career{
        id:ID!
        name:String
    }

    extend type Query{
        getAllCareer: [Career]
    }
    extend type Mutation{
        createCareer(name:String): Career
        deleteCareer(id:Int):Career
        updateCareer(id:Int, name:String):Career
    }
`;

export const resolvers = {
    Query: {
        getAllCareer: async (parent: Career, args: {}, context: GraphQLContext) => {
            return context.prisma.career.findMany();
        },
    },
    Mutation: {
        createCareer: async (parent: Career,
            args: { name: string }, context: GraphQLContext) => {
            return context.prisma.career.create({
                data: {
                    name: args.name,
                },
            });
        },
        deleteCareer:async (parent:Career,
            args:{id:number},
            context: GraphQLContext) => {
            return context.prisma.career.delete({
                where:{
                    id:args.id,
                }
            })
        },
        updateCareer:async (parent:Career,
            args:{id:number, name:string},
            context: GraphQLContext) => {
            return context.prisma.career.update({
                where:{
                    id:args.id,
                },
                data:{
                    name:args.name,
                }
            })
        }
    }
};