/*
  Warnings:

  - Added the required column `priority` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Task` ADD COLUMN `priority` VARCHAR(191) NOT NULL,
    ADD COLUMN `tag` VARCHAR(191) NOT NULL;
