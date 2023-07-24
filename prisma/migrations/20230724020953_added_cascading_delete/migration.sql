-- DropForeignKey
ALTER TABLE "Commitment" DROP CONSTRAINT "Commitment_foodId_fkey";

-- DropForeignKey
ALTER TABLE "Commitment" DROP CONSTRAINT "Commitment_userId_fkey";

-- DropForeignKey
ALTER TABLE "EventsOnUsers" DROP CONSTRAINT "EventsOnUsers_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventsOnUsers" DROP CONSTRAINT "EventsOnUsers_userId_fkey";

-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_eventId_fkey";

-- AddForeignKey
ALTER TABLE "EventsOnUsers" ADD CONSTRAINT "EventsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventsOnUsers" ADD CONSTRAINT "EventsOnUsers_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commitment" ADD CONSTRAINT "Commitment_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commitment" ADD CONSTRAINT "Commitment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
