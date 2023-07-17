import EventCard from "@/app/dashboard/components/eventCard";
import { PrismaClient } from "@prisma/client";
import EventFoodList from "./components/eventFoodList";

const prisma = new PrismaClient();

export default async function EventDetail({ params }) {
  const eventId = params.eventId;

  const event = await prisma.event.findUnique({
    where: {
      id: +eventId,
    },
  });

  return (
    <div className="w-full max-w-[400px] bg-gray-50 p-6 rounded-lg min-h-[600px] border border-500 ">
      {/* Head section */}
      <div className="mb-4">
        <EventCard
          id={event.id}
          datetime={event.datetime.toISOString()}
          name={event.name}
          location={event.location}
        />
      </div>
      {/* Food list */}
      <EventFoodList eventId={eventId} />
    </div>
  );
}
