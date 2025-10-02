/*
  Warnings:

  - A unique constraint covering the columns `[profile_url]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_profile_url_key" ON "users"("profile_url");
