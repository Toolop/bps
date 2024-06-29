-- AlterTable
ALTER TABLE "schedule" ADD COLUMN     "typeScheduleId" INTEGER;

-- CreateTable
CREATE TABLE "typeSchedule" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "typeSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_typeScheduleId_fkey" FOREIGN KEY ("typeScheduleId") REFERENCES "typeSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
