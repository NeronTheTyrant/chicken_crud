-- CreateTable
CREATE TABLE "chicken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "birthday" DATETIME NOT NULL,
    "weight" INTEGER NOT NULL,
    "steps" INTEGER NOT NULL DEFAULT 0,
    "isRunning" BOOLEAN NOT NULL DEFAULT false,
    "coopId" INTEGER,
    CONSTRAINT "chicken_coopId_fkey" FOREIGN KEY ("coopId") REFERENCES "coop" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "coop" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
