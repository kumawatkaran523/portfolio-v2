/*
  Warnings:

  - You are about to drop the column `betond` on the `About` table. All the data in the column will be lost.
  - Added the required column `beyond` to the `About` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "About" DROP COLUMN "betond",
ADD COLUMN     "beyond" TEXT NOT NULL;
