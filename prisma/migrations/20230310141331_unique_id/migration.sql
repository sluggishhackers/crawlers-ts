/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `LcCommittee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LcCommittee_code_key" ON "LcCommittee"("code");
