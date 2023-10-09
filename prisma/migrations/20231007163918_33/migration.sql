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
    "uniqueKey" TEXT NOT NULL,
    "dateType" TEXT NOT NULL DEFAULT 'Poya Day'
);
INSERT INTO "new_calanderdatasourcedata" ("calanderdatasourceid", "calanderid", "color", "endDate", "location", "name", "startDate", "uniqueKey") SELECT "calanderdatasourceid", "calanderid", "color", "endDate", "location", "name", "startDate", "uniqueKey" FROM "calanderdatasourcedata";
DROP TABLE "calanderdatasourcedata";
ALTER TABLE "new_calanderdatasourcedata" RENAME TO "calanderdatasourcedata";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
