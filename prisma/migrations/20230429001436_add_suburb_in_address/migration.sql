/*
  Warnings:

  - Added the required column `suburb_id` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "suburb_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_suburb_id_fkey" FOREIGN KEY ("suburb_id") REFERENCES "Suburb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
