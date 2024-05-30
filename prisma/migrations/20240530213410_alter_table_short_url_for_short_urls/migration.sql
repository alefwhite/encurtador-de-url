/*
  Warnings:

  - You are about to drop the `short_url` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "short_url";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "short_urls" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "original_url" TEXT NOT NULL,
    "short_code" TEXT NOT NULL,
    "click_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME,
    "user_id" TEXT,
    CONSTRAINT "short_urls_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "short_urls_short_code_key" ON "short_urls"("short_code");
