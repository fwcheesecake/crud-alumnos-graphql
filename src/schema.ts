import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLContext } from "./context";
import { Alumno, Ciudad, Domicilio } from "@prisma/client";
import { notContains } from "class-validator";
import graphqlFields from "graphql-fields";

const typeDefinitions = /* GraphQL */ `
  scalar Date

  type Alumno {
    id: ID!
    nombre: String
    apellido1: String
    apellido2: String
    nacimiento: Date
    genero: Boolean
    domicilio: Domicilio
    plan_estudios: Int
  }

  type Domicilio {
    id: ID!
    calle: String
    n_interior: String
    n_exterior: String
    cp: String
    colonia: Colonia
    ciudad: Ciudad
    estado: Estado
  }

  type Colonia {
    id: ID!
    nombre: String
  }

  type Ciudad {
    id: ID!
    nombre: String
  }

  type Estado {
    id: ID!
    nombre: String
  }

  type Query {
    getAllStudents: [Alumno]
  }

  type Mutation {
    createCity(nombre: String): Ciudad
    createState(nombre: String): Estado
    createSuburb(nombre: String): Colonia
    createAddress(
      calle: String
      n_interior: String
      n_exterior: String
      cp: String
      colonia_id: Int
      estado_id: Int
      ciudad_id: Int
    ): Domicilio
    createStudent(
      nombre: String
      apellido1: String
      apellido2: String
      nacimiento: Date
      genero: Boolean
      domicilio_id: Int
      plan_estudios: Int
    ): Alumno
  }
`;

const resolvers = {
  Query: {
    getAllStudents: async (
      parent: unknown,
      args: {},
      context: GraphQLContext
    ) => {
      return context.prisma.alumno.findMany({});
    },
  },

  Mutation: {
    createCity: async (
      parent: unknown,
      args: { nombre: string },
      context: GraphQLContext
    ) => {
      return context.prisma.ciudad.create({
        data: {
          nombre: args.nombre,
        },
      });
    },
    createSuburb: async (
      parent: unknown,
      args: { nombre: string },
      context: GraphQLContext
    ) => {
      return context.prisma.colonia.create({
        data: {
          nombre: args.nombre,
        },
      });
    },
    createState: async (
      parent: unknown,
      args: { nombre: string },
      context: GraphQLContext
    ) => {
      return context.prisma.estado.create({
        data: {
          nombre: args.nombre,
        },
      });
    },
    createAddress: async (
        parent: unknown,
        args: {
            calle: string,
            n_interior: string,
            n_exterior: string
            cp: string
            colonia_id: number
            ciudad_id: number
            estado_id: number
        },
        context: GraphQLContext
    ) => {
        return context.prisma.domicilio.create({
            data: {
                calle: args.calle,
                n_exterior: args.n_exterior,
                n_interior: args.n_interior,
                cp: args.cp,
                colonia_id: args.colonia_id,
                ciudad_id: args.ciudad_id,
                estado_id: args.estado_id
            }
        })
    },
    createStudent: async (
      parent: unknown,
      args: {
        nombre: string;
        apellido1: string;
        apellido2: string;
        nacimiento: Date;
        genero: boolean;
        domicilio_id: number;
        plan_estudios: number;
      },
      context: GraphQLContext
    ) => {
      return context.prisma.alumno.create({
        data: {
          nombre: args.nombre,
          apellido1: args.apellido1,
          apellido2: args.apellido2,
          nacimiento: args.nacimiento,
          genero: args.genero,
          domicilio_id: args.domicilio_id,
          plan_estudios: args.plan_estudios,
        },
      });
    },
  },

  Alumno: {
    domicilio: async (parent: Alumno, args: {}, context: GraphQLContext) => {
      return context.prisma.domicilio.findUnique({
        where: {
          id: parent.id,
        },
      });
    },
  },
  Domicilio: {
    ciudad: async (parent: Domicilio, args: {}, context: GraphQLContext) => {
      return context.prisma.ciudad.findUnique({
        where: {
          id: parent.ciudad_id,
        },
      });
    },
    estado: async (parent: Domicilio, args: {}, context: GraphQLContext) => {
      return context.prisma.estado.findUnique({
        where: {
          id: parent.estado_id,
        },
      });
    },
    colonia: async (parent: Domicilio, args: {}, context: GraphQLContext) => {
      return context.prisma.estado.findUnique({
        where: {
          id: parent.colonia_id,
        },
      });
    },
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
