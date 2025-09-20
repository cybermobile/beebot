-- AlterTable
ALTER TABLE "File"
  ALTER COLUMN "data" TYPE BYTEA USING decode("data", 'base64');
