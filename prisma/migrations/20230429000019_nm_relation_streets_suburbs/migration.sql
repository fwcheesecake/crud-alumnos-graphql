/*
  Warnings:

  - You are about to drop the column `suburb_id` on the `Street` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Street" DROP CONSTRAINT "Street_suburb_id_fkey";

-- AlterTable
ALTER TABLE "Street" DROP COLUMN "suburb_id";

-- CreateTable
CREATE TABLE "StreetsOnSuburbs" (
    "street_id" INTEGER NOT NULL,
    "suburb_id" INTEGER NOT NULL,

    CONSTRAINT "StreetsOnSuburbs_pkey" PRIMARY KEY ("street_id","suburb_id")
);

-- AddForeignKey
ALTER TABLE "StreetsOnSuburbs" ADD CONSTRAINT "StreetsOnSuburbs_street_id_fkey" FOREIGN KEY ("street_id") REFERENCES "Street"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StreetsOnSuburbs" ADD CONSTRAINT "StreetsOnSuburbs_suburb_id_fkey" FOREIGN KEY ("suburb_id") REFERENCES "Suburb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
