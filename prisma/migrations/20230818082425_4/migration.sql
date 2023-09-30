/*
  Warnings:

  - You are about to drop the column `name` on the `staff` table. All the data in the column will be lost.
  - Added the required column `staffname` to the `staff` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_staff" (
    "staffid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "staffname" TEXT NOT NULL,
    "contracttype" TEXT NOT NULL,
    "contactno" TEXT NOT NULL,
    "nic" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_staff" ("contactno", "contracttype", "createdAt", "nic", "staffid") SELECT "contactno", "contracttype", "createdAt", "nic", "staffid" FROM "staff";
DROP TABLE "staff";
ALTER TABLE "new_staff" RENAME TO "staff";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
