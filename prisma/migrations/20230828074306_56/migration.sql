-- CreateTable
CREATE TABLE "timealloc" (
    "timeallocid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "staffid" INTEGER NOT NULL,
    "projectid" INTEGER NOT NULL,
    "remark" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "timeallocdetails" (
    "timeallocdetailid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timeallocid" INTEGER NOT NULL,
    "taskid" INTEGER NOT NULL,
    "projecttaskassignid" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "remark" TEXT NOT NULL
);
