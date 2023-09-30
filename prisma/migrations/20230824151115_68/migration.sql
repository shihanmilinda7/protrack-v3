-- CreateTable
CREATE TABLE "projecttasks" (
    "taskid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectid" INTEGER NOT NULL,
    "taskname" TEXT NOT NULL,
    "taskdescription" TEXT NOT NULL,
    "startdate" TEXT NOT NULL,
    "enddate" TEXT NOT NULL
);
