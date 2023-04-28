/*
  Warnings:

  - Added the required column `birthday` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_state` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tutor_id` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StudentState" AS ENUM ('ACTIVE', 'TEMP_LEAVE', 'OTHER');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "student_state" "StudentState" NOT NULL,
ADD COLUMN     "tutor_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Tutor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tutor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tutor_id_key" ON "Tutor"("id");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
