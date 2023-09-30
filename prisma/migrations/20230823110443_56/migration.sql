-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_taskphotos" (
    "taskphotoid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taskid" INTEGER NOT NULL,
    "categoryid" INTEGER NOT NULL,
    "categorydetailid" INTEGER NOT NULL,
    "photodataurl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_taskphotos" ("categorydetailid", "categoryid", "photodataurl", "taskid", "taskphotoid") SELECT "categorydetailid", "categoryid", "photodataurl", "taskid", "taskphotoid" FROM "taskphotos";
DROP TABLE "taskphotos";
ALTER TABLE "new_taskphotos" RENAME TO "taskphotos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
