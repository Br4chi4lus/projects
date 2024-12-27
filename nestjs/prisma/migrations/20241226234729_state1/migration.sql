/*
  Warnings:

  - You are about to drop the `StateOfProject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_stateId_fkey";

-- DropTable
DROP TABLE "StateOfProject";

-- CreateTable
CREATE TABLE "stateofproject" (
    "id" SERIAL NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "stateofproject_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "stateofproject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
