/*
  Warnings:

  - Added the required column `calanderid` to the `calanderdatasourcedata` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_calanderdatasourcedata" (
    "calanderdatasourceid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "calanderid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "uniqueKey" TEXT NOT NULL
);
INSERT INTO "new_calanderdatasourcedata" ("calanderdatasourceid", "color", "endDate", "location", "name", "startDate", "uniqueKey") SELECT "calanderdatasourceid", "color", "endDate", "location", "name", "startDate", "uniqueKey" FROM "calanderdatasourcedata";
DROP TABLE "calanderdatasourcedata";
ALTER TABLE "new_calanderdatasourcedata" RENAME TO "calanderdatasourcedata";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
