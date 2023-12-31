-- AlterTable
ALTER TABLE "User" ADD COLUMN     "providerIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "image" SET DEFAULT '';
