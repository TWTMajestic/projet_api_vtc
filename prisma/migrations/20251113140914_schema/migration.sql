/*
  Warnings:

  - You are about to drop the column `registration` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `vin` on the `Vehicle` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Vehicle_vin_key";

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "registration",
DROP COLUMN "vin";
