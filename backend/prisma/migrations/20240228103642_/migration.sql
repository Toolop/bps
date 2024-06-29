/*
  Warnings:

  - You are about to drop the `schduleTeam` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deadline` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "schduleTeam" DROP CONSTRAINT "schduleTeam_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "schduleTeam" DROP CONSTRAINT "schduleTeam_teamId_fkey";

-- AlterTable
ALTER TABLE "schedule" ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "schduleTeam";

-- CreateTable
CREATE TABLE "scheduleTeam" (
    "id" SERIAL NOT NULL,
    "teamId" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scheduleTeam_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "scheduleTeam" ADD CONSTRAINT "scheduleTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduleTeam" ADD CONSTRAINT "scheduleTeam_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
