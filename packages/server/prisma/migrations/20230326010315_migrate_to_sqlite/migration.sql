-- CreateTable
CREATE TABLE "chicken" (
    "name" TEXT NOT NULL,
    "birthday" DATETIME NOT NULL,
    "weight" INTEGER NOT NULL,
    "steps" INTEGER NOT NULL DEFAULT 0,
    "isRunning" BOOLEAN NOT NULL DEFAULT false,
    "coopName" TEXT NOT NULL,
    CONSTRAINT "chicken_coopName_fkey" FOREIGN KEY ("coopName") REFERENCES "coop" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "coop" (
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "chicken_name_key" ON "chicken"("name");

-- CreateIndex
CREATE UNIQUE INDEX "coop_name_key" ON "coop"("name");
