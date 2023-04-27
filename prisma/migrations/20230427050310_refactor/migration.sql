/*
  Warnings:

  - You are about to drop the `Alumno` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ciudad` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Domicilio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Entidades` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Estado` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- DropForeignKey
ALTER TABLE "Alumno" DROP CONSTRAINT "Alumno_domicilio_id_fkey";

-- DropForeignKey
ALTER TABLE "Domicilio" DROP CONSTRAINT "Domicilio_ciudad_id_fkey";

-- DropForeignKey
ALTER TABLE "Domicilio" DROP CONSTRAINT "Domicilio_estado_id_fkey";

-- DropTable
DROP TABLE "Alumno";

-- DropTable
DROP TABLE "Ciudad";

-- DropTable
DROP TABLE "Domicilio";

-- DropTable
DROP TABLE "Entidades";

-- DropTable
DROP TABLE "Estado";

-- CreateTable
CREATE TABLE "Student" (
    "control" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname1" TEXT NOT NULL,
    "lastname2" TEXT,
    "gender" "Gender",
    "email" TEXT NOT NULL,
    "address_id" INTEGER NOT NULL,
    "major_id" INTEGER NOT NULL,
    "study_plan_id" INTEGER NOT NULL,
    "semester" INTEGER,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("control")
);

-- CreateTable
CREATE TABLE "StudyPlan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "career_id" INTEGER NOT NULL,

    CONSTRAINT "StudyPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Major" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "career_id" INTEGER NOT NULL,

    CONSTRAINT "Major_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "zipcode" TEXT NOT NULL,
    "exterior" TEXT NOT NULL,
    "interior" TEXT,
    "street_id" INTEGER NOT NULL,
    "suburb_id" INTEGER NOT NULL,
    "city_id" INTEGER NOT NULL,
    "state_id" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "state_id" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suburb" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city_id" INTEGER NOT NULL,

    CONSTRAINT "Suburb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Street" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "suburb_id" INTEGER NOT NULL,

    CONSTRAINT "Street_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" SERIAL NOT NULL,
    "name" INTEGER NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_control_key" ON "Student"("control");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StudyPlan_id_key" ON "StudyPlan"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Major_id_key" ON "Major"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Address_id_key" ON "Address"("id");

-- CreateIndex
CREATE UNIQUE INDEX "State_id_key" ON "State"("id");

-- CreateIndex
CREATE UNIQUE INDEX "City_id_key" ON "City"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Suburb_id_key" ON "Suburb"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Street_id_key" ON "Street"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Career_id_key" ON "Career"("id");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_major_id_fkey" FOREIGN KEY ("major_id") REFERENCES "Major"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_study_plan_id_fkey" FOREIGN KEY ("study_plan_id") REFERENCES "StudyPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlan" ADD CONSTRAINT "StudyPlan_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Major" ADD CONSTRAINT "Major_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_street_id_fkey" FOREIGN KEY ("street_id") REFERENCES "Street"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_suburb_id_fkey" FOREIGN KEY ("suburb_id") REFERENCES "Suburb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suburb" ADD CONSTRAINT "Suburb_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Street" ADD CONSTRAINT "Street_suburb_id_fkey" FOREIGN KEY ("suburb_id") REFERENCES "Suburb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
