/*
  Warnings:

  - You are about to alter the column `visitcount` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tasks" (
    "taskid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "staffid" INTEGER NOT NULL,
    "clientname" TEXT NOT NULL,
    "categoryid" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "visitcount" INTEGER NOT NULL,
    "status" TEXT NOT NULL
);
INSERT INTO "new_tasks" ("categoryid", "clientname", "location", "staffid", "status", "taskid", "visitcount") SELECT "categoryid", "clientname", "location", "staffid", "status", "taskid", "visitcount" FROM "tasks";
DROP TABLE "tasks";
ALTER TABLE "new_tasks" RENAME TO "tasks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
