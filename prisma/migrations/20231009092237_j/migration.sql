/*
  Warnings:

  - Added the required column `projectid` to the `timelogsdetails` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_timelogsdetails" (
    "timelogdetailid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timelogid" INTEGER NOT NULL,
    "projectid" INTEGER NOT NULL,
    "taskid" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "rowindex" INTEGER NOT NULL,
    "remark" TEXT NOT NULL
);
INSERT INTO "new_timelogsdetails" ("remark", "rowindex", "taskid", "time", "timelogdetailid", "timelogid") SELECT "remark", "rowindex", "taskid", "time", "timelogdetailid", "timelogid" FROM "timelogsdetails";
DROP TABLE "timelogsdetails";
ALTER TABLE "new_timelogsdetails" RENAME TO "timelogsdetails";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
