-- CreateTable
CREATE TABLE "timelogs" (
    "timelogid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "staffid" INTEGER NOT NULL,
    "workingType" TEXT NOT NULL,
    "remark" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "timelogsdetails" (
    "timelogdetailid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timelogid" INTEGER NOT NULL,
    "taskid" INTEGER NOT NULL,
    "projecttaskassignid" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "remark" TEXT NOT NULL
);
