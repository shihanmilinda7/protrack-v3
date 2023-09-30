-- CreateTable
CREATE TABLE "taskphotos" (
    "taskphotoid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taskid" INTEGER NOT NULL,
    "categoryid" INTEGER NOT NULL,
    "categorydetailid" INTEGER NOT NULL,
    "photodataurl" TEXT NOT NULL
);
