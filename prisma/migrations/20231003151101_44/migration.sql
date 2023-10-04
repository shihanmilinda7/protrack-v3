-- CreateTable
CREATE TABLE "calanderdatasource" (
    "calanderdatasourceid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startdate" TEXT NOT NULL,
    "enddate" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "uniqueKey" TEXT NOT NULL
);
