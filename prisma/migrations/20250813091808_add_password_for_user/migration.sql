/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Post" ALTER COLUMN "content" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "password" TEXT NOT NULL;
