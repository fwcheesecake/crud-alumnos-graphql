/*
  Warnings:

  - You are about to drop the column `city_id` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `state_id` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `suburb_id` on the `Address` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_city_id_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_state_id_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_suburb_id_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "city_id",
DROP COLUMN "state_id",
DROP COLUMN "suburb_id";
