-- CreateTable
CREATE TABLE "User" (
    "Name" TEXT,
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "L_name" TEXT NOT NULL,
    "PassWord" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Msg" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Text" TEXT NOT NULL,
    "UpdateAt" DATETIME NOT NULL,
    "AuthorId" INTEGER,
    CONSTRAINT "Msg_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User" ("Id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_L_name_key" ON "User"("L_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_PassWord_key" ON "User"("PassWord");
