/*
  Warnings:

  - You are about to drop the `Itens` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "StatusConservation" AS ENUM ('Novo', 'Usado');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Eletronicos', 'Vestuário', 'Papelaria');

-- DropTable
DROP TABLE "Itens";

-- CreateTable
CREATE TABLE "Item_table" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "statusConservation" "StatusConservation" NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "size" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_table_pkey" PRIMARY KEY ("id")
);
