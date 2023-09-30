/*
  Warnings:

  - You are about to alter the column `time` on the `timeallocdetails` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_timeallocdetails" (
    "timeallocdetailid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timeallocid" INTEGER NOT NULL,
    "taskid" INTEGER NOT NULL,
    "projecttaskassignid" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "remark" TEXT NOT NULL
);
INSERT INTO "new_timeallocdetails" ("projecttaskassignid", "remark", "taskid", "time", "timeallocdetailid", "timeallocid") SELECT "projecttaskassignid", "remark", "taskid", "time", "timeallocdetailid", "timeallocid" FROM "timeallocdetails";
DROP TABLE "timeallocdetails";
ALTER TABLE "new_timeallocdetails" RENAME TO "timeallocdetails";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
