/*
  Warnings:

  - You are about to drop the column `views` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the `about` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contacts` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "views";

-- DropTable
DROP TABLE "public"."about";

-- DropTable
DROP TABLE "public"."contacts";
