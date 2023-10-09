/*
  Warnings:

  - Added the required column `rowindex` to the `timelogsdetails` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_timelogsdetails" (
    "timelogdetailid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timelogid" INTEGER NOT NULL,
    "taskid" INTEGER NOT NULL,
    "projecttaskassignid" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "rowindex" INTEGER NOT NULL,
    "remark" TEXT NOT NULL
);
INSERT INTO "new_timelogsdetails" ("projecttaskassignid", "remark", "taskid", "time", "timelogdetailid", "timelogid") SELECT "projecttaskassignid", "remark", "taskid", "time", "timelogdetailid", "timelogid" FROM "timelogsdetails";
DROP TABLE "timelogsdetails";
ALTER TABLE "new_timelogsdetails" RENAME TO "timelogsdetails";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
