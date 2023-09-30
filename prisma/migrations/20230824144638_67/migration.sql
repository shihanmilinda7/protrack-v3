-- CreateTable
CREATE TABLE "projects" (
    "projectid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectname" TEXT NOT NULL,
    "projectdescription" TEXT NOT NULL,
    "startdate" TEXT NOT NULL,
    "enddate" TEXT NOT NULL,
    "projectstatus" TEXT NOT NULL
);
