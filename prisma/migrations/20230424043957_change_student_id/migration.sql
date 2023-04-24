/*
  Warnings:

  - The primary key for the `Alumno` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Alumno" DROP CONSTRAINT "Alumno_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "apellido2" DROP NOT NULL,
ALTER COLUMN "genero" SET DATA TYPE TEXT,
ADD CONSTRAINT "Alumno_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Alumno_id_seq";

-- AlterTable
ALTER TABLE "Domicilio" ALTER COLUMN "n_interior" DROP NOT NULL;
