/*
  Warnings:

  - The values [Eletronicos,Vestuário] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('Eletronico', 'Vestuario', 'Papelaria');
ALTER TABLE "Item_table" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;

-- CreateTable
CREATE TABLE "images_item" (
    "id" TEXT NOT NULL,
    "picture_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "images_item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "images_item" ADD CONSTRAINT "images_item_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item_table"("id") ON DELETE CASCADE ON UPDATE CASCADE;
