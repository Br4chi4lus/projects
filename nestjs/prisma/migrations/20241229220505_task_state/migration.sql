-- AlterTable
ALTER TABLE "task" ADD COLUMN     "stateId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "stateofproject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
