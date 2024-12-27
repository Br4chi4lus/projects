/*
  Warnings:

  - Added the required column `stateId` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" ADD COLUMN     "dateOfCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateOfModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "stateId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "StateOfProject" (
    "id" SERIAL NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "StateOfProject_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "StateOfProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
