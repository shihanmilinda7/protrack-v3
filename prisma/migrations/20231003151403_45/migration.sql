/*
  Warnings:

  - You are about to drop the column `enddate` on the `calanderdatasource` table. All the data in the column will be lost.
  - You are about to drop the column `startdate` on the `calanderdatasource` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `calanderdatasource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `calanderdatasource` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_calanderdatasource" (
    "calanderdatasourceid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "uniqueKey" TEXT NOT NULL
);
INSERT INTO "new_calanderdatasource" ("calanderdatasourceid", "color", "location", "name", "uniqueKey") SELECT "calanderdatasourceid", "color", "location", "name", "uniqueKey" FROM "calanderdatasource";
DROP TABLE "calanderdatasource";
ALTER TABLE "new_calanderdatasource" RENAME TO "calanderdatasource";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
