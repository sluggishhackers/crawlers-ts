-- CreateTable
CREATE TABLE "Bill" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);
