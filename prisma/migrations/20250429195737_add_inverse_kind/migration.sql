-- AlterTable
ALTER TABLE "RelationshipKind" ADD COLUMN     "inverseKindId" TEXT;

-- AddForeignKey
ALTER TABLE "RelationshipKind" ADD CONSTRAINT "RelationshipKind_inverseKindId_fkey" FOREIGN KEY ("inverseKindId") REFERENCES "RelationshipKind"("id") ON DELETE SET NULL ON UPDATE CASCADE;
