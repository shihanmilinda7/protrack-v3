-- CreateTable
CREATE TABLE "projectassigns" (
    "projectassignid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectid" INTEGER NOT NULL,
    "staffid" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "projecttasksassigns" (
    "projecttaskassignid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectid" INTEGER NOT NULL,
    "staffid" INTEGER NOT NULL,
    "taskid" INTEGER NOT NULL
);
