/*
  Warnings:

  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Item";

-- CreateTable
CREATE TABLE "Itens" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "statusConservation" TEXT NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "size" TEXT NOT NULL,

    CONSTRAINT "Itens_pkey" PRIMARY KEY ("id")
);
