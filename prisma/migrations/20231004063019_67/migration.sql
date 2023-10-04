/*
  Warnings:

  - You are about to drop the `calanderdatasource` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "calanderdatasource";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "calanderheaderdata" (
    "calanderid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" TEXT NOT NULL,
    "country" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "calanderdatasourcedata" (
    "calanderdatasourceid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "uniqueKey" TEXT NOT NULL
);
