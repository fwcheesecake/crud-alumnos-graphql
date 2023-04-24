/*
  Warnings:

  - You are about to drop the column `colonia_id` on the `Domicilio` table. All the data in the column will be lost.
  - You are about to drop the `Colonia` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `colonia` to the `Domicilio` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Domicilio" DROP CONSTRAINT "Domicilio_colonia_id_fkey";

-- AlterTable
ALTER TABLE "Alumno" ALTER COLUMN "plan_estudios" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Domicilio" DROP COLUMN "colonia_id",
ADD COLUMN     "colonia" TEXT NOT NULL;

-- DropTable
DROP TABLE "Colonia";
