/*
  Warnings:

  - You are about to drop the column `fullName` on the `Person` table. All the data in the column will be lost.
  - The `gender` column on the `Person` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[email]` on the table `Person` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Person` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstName` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventRegistration" ADD COLUMN     "additionalInfo" JSONB;

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "fullName",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "allergies" TEXT,
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "birthplace" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "documentNumber" TEXT,
ADD COLUMN     "documentType" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "middleName" TEXT,
ADD COLUMN     "nationality" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "specialNeeds" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT,
ALTER COLUMN "birthdate" DROP NOT NULL;

-- CreateTable
CREATE TABLE "EventRequiredField" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "fieldLabel" TEXT NOT NULL,
    "isCustom" BOOLEAN NOT NULL DEFAULT false,
    "fieldType" TEXT,
    "options" JSONB,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventRequiredField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventRequiredRelationship" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "requiredKindId" TEXT NOT NULL,
    "appliesToMinors" BOOLEAN NOT NULL DEFAULT true,
    "appliesToAll" BOOLEAN NOT NULL DEFAULT false,
    "requiredCount" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "EventRequiredRelationship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventPersonFieldRequirement" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,

    CONSTRAINT "EventPersonFieldRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventRequiredField_eventId_fieldName_key" ON "EventRequiredField"("eventId", "fieldName");

-- CreateIndex
CREATE UNIQUE INDEX "EventRequiredRelationship_eventId_requiredKindId_key" ON "EventRequiredRelationship"("eventId", "requiredKindId");

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Person_phone_key" ON "Person"("phone");

-- AddForeignKey
ALTER TABLE "EventRequiredField" ADD CONSTRAINT "EventRequiredField_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRequiredRelationship" ADD CONSTRAINT "EventRequiredRelationship_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRequiredRelationship" ADD CONSTRAINT "EventRequiredRelationship_requiredKindId_fkey" FOREIGN KEY ("requiredKindId") REFERENCES "RelationshipKind"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPersonFieldRequirement" ADD CONSTRAINT "EventPersonFieldRequirement_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
