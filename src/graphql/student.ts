import { Student, Gender, StudentState } from "@prisma/client";
import { GraphQLContext } from "../context";

export const typeDefs = /* GraphQL */ `
  scalar Date
  type Student {
    control: ID!
    name: String
    lastname1: String
    lastname2: String
    gender: Gender
    email: String
    address_id: Int
    major_id: Int
    study_plan_id: Int
    semester: Int
    birthday: String
    student_state: StudentState
    tutor_id: Int
  }
  enum Gender {
    MALE
    FEMALE
    OTHER
  }
  enum StudentState {
    ACTIVE
    TEMP_LEAVE
    OTHER
  }

  extend type Query {
    getAllStudent: [Student]
  }

  extend type Mutation {
    createStudent(
      control: String
      name: String
      lastname1: String
      lastname2: String
      gender: Gender
      email: String
      address_id: Int
      major_id: Int
      study_plan_id: Int
      semester: Int
      birthday: String
      student_state: StudentState
      tutor_id: Int
    ): Student
    deleteStudent(control: String): Student
    updateStudent(
      control: String
      name: String
      lastname1: String
      lastname2: String
      gender: Gender
      email: String
      address_id: Int
      major_id: Int
      study_plan_id: Int
      semester: Int
      birthday: String
      student_state: StudentState
      tutor_id: Int
    ): Student
  }
`;

export const resolvers = {
  Query: {
    getAllStudent: async (
      parent: Student,
      args: {},
      context: GraphQLContext
    ) => {
      return context.prisma.student.findMany();
    },
  },
  Mutation: {
    createStudent: async (
      parent: Student,
      args: {
        control: string;
        name: string;
        lastname1: string;
        lastname2: string;
        gender: Gender;
        email: string;
        address_id: number;
        major_id: number;
        study_plan_id: number;
        semester: number;
        birthday: string;
        student_state: StudentState;
        tutor_id: number;
      },
      context: GraphQLContext
    ) => {
      return context.prisma.student.create({
        data: {
          control: args.control,
          name: args.name,
          lastname1: args.lastname1,
          lastname2: args.lastname2,
          gender: args.gender,
          email: args.email,
          address_id: args.address_id,
          major_id: args.major_id,
          study_plan_id: args.study_plan_id,
          semester: args.semester,
          birthday: new Date(args.birthday),
          student_state: args.student_state,
          tutor_id: args.tutor_id,
        },
      });
    },
    deleteStudent: async (
      parent: Student,
      args: { control: string },
      context: GraphQLContext
    ) => {
      return context.prisma.student.delete({
        where: {
          control: args.control,
        },
      });
    },
    updateStudent: async (
      parent: Student,
      args: {
        control: string;
        name: string;
        lastname1: string;
        lastname2: string;
        gender: Gender;
        email: string;
        address_id: number;
        major_id: number;
        study_plan_id: number;
        semester: number;
        birthday: Date;
        student_state: StudentState;
        tutor_id: number;
      },
      context: GraphQLContext
    ) => {
      return context.prisma.student.update({
        where: {
          control: args.control,
        },
        data: {
          control: args.control,
          name: args.name,
          lastname1: args.lastname1,
          lastname2: args.lastname2,
          gender: args.gender,
          email: args.email,
          address_id: args.address_id,
          major_id: args.major_id,
          study_plan_id: args.study_plan_id,
          semester: args.semester,
          birthday: new Date(args.birthday),
          student_state: args.student_state,
          tutor_id: args.tutor_id,
        },
      });
    },
  },
};
