-- CreateTable
CREATE TABLE "staff" (
    "staffid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "contracttype" TEXT NOT NULL,
    "contactno" TEXT NOT NULL,
    "nic" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "categories" (
    "categoryid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryname" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "categorydetails" (
    "categorydetailid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryid" INTEGER NOT NULL,
    "categorydetailname" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tasks" (
    "taskid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "staffid" INTEGER NOT NULL,
    "clientname" TEXT NOT NULL,
    "categoryid" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "visitcount" TEXT NOT NULL,
    "status" TEXT NOT NULL
);
