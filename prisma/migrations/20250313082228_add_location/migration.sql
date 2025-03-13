-- CreateEnum
CREATE TYPE "StatusConservation" AS ENUM ('novo', 'seminovo', 'usado');

-- CreateTable
CREATE TABLE "images_item" (
    "id" TEXT NOT NULL,
    "picture_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "images_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item_table" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "statusConservation" "StatusConservation" NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "size" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proposta_table" (
    "id" TEXT NOT NULL,
    "descricao" TEXT,
    "dataProposta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "proposta_table_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "images_item" ADD CONSTRAINT "images_item_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item_table"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposta_table" ADD CONSTRAINT "proposta_table_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item_table"("id") ON DELETE CASCADE ON UPDATE CASCADE;
