import { StudyPlan } from "@prisma/client";
import { GraphQLContext } from "../context";

export const typeDefs = /* GraphQL */ `
    type StudyPlan{
        id:ID!
        name: String
        career: Career
    }

    extend type Query{
        getAllStudyPlan:[StudyPlan]
    }

    extend type Mutation{
        createStudyPlan(name:String, career_id:Int): StudyPlan
        deleteStudyPlan(id:Int):StudyPlan
        updateStudyPlan(id:Int, name:String):StudyPlan
    }
`;

export const resolvers = {
    Query: {
        getAllStudyPlan: async (parent: StudyPlan, args: {}, context: GraphQLContext) => {
            return context.prisma.studyPlan.findMany();
        }
    },
    StudyPlan: {
        career: async (parent: StudyPlan, args: {}, context: GraphQLContext) => {
            return context.prisma.career.findUnique({
                where: {
                    id: parent.career_id,
                }
            })
        }
    },
    Mutation: {
        createStudyPlan: async (parent: StudyPlan, args: { name: string, career_id: number }
            , context: GraphQLContext) => {
            return context.prisma.studyPlan.create({
                data: {
                    name: args.name,
                    career_id: args.career_id,
                }
            })
        },
        deleteStudyPlan:async (parent:StudyPlan,
            args:{id: number},
            context:GraphQLContext) => {
            return context.prisma.studyPlan.delete({
                where:{
                    id:args.id
                }
            })
        },
        updateStudyPlan:async (parent:StudyPlan,
            args:{id: number, name: string},
            context:GraphQLContext) => {
            return context.prisma.studyPlan.update({
                where:{
                    id: args.id,
                },
                data:{
                    name:args.name,
                }
            })
        }
    }
}
