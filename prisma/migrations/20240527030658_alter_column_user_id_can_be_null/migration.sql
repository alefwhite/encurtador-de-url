-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_short_url" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "original_url" TEXT NOT NULL,
    "short_code" TEXT NOT NULL,
    "click_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME,
    "user_id" TEXT,
    CONSTRAINT "short_url_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_short_url" ("click_count", "created_at", "deleted_at", "id", "original_url", "short_code", "updated_at", "user_id") SELECT "click_count", "created_at", "deleted_at", "id", "original_url", "short_code", "updated_at", "user_id" FROM "short_url";
DROP TABLE "short_url";
ALTER TABLE "new_short_url" RENAME TO "short_url";
CREATE UNIQUE INDEX "short_url_short_code_key" ON "short_url"("short_code");
PRAGMA foreign_key_check("short_url");
PRAGMA foreign_keys=ON;
