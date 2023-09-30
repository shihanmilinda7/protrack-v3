-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_staff" (
    "staffid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "staffname" TEXT NOT NULL,
    "contracttype" TEXT NOT NULL,
    "contactno" TEXT NOT NULL,
    "nic" TEXT NOT NULL,
    "designation" TEXT NOT NULL DEFAULT 'user',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_staff" ("contactno", "contracttype", "createdAt", "nic", "staffid", "staffname") SELECT "contactno", "contracttype", "createdAt", "nic", "staffid", "staffname" FROM "staff";
DROP TABLE "staff";
ALTER TABLE "new_staff" RENAME TO "staff";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
