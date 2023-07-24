import EventCard from "@/app/dashboard/components/eventCard";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import HomeForm from "@/app/components/HomeForm";
import { LiaCocktailSolid, LiaCookieBiteSolid } from "react-icons/lia";
import JoinEvent from "./components/joinEvent";
import FoodList from "./components/foodList";

export default async function EventDetail({ params }) {
  const eventId = params.eventId;
  const session = await getServerSession(authOptions);

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    select: {
      id: true,
      datetime: true,
      name: true,
      location: true,
      maxguests: true,
      covercolor: true,
    },
  });

  if (event !== null) <div>Event not found</div>;

  const record = await prisma.EventsOnUsers.findMany({
    where: {
      eventId: eventId,
      user: {
        email: session?.user.email,
      },
    },
  });

  let joined;
  let host;

  if (record.length > 0) {
    joined = true;
    host = record[0].host;
  } else {
    joined = false;
    host = false;
  }

  const eventDetails = (
    <>
      <EventCard
        id={event.id}
        datetime={event.datetime.toISOString()}
        name={event.name}
        location={event.location}
        covercolor={event.covercolor}
        joined={joined}
        host={host}
      />
      <div className="w-full max-h-[500px] flex flex-col justify-center items-center p-4 pt-0">
        {joined && (
          <FoodList
            eventId={eventId}
            maxguests={event.maxguests}
            host={host}
          />
        )}
        {!joined && <JoinEvent eventId={eventId} />}
      </div>
    </>
  );

  const homeForm = (
    <div className="px-2 py-8 h-80 flex flex-col justify-between items-center">
      <h1 className="mb-4 text-2xl font-light ">
        You&apos;re invited to <span className="underline">{event.name}</span>
      </h1>
      <HomeForm />
      <div className="flex">
        <LiaCocktailSolid size={30} />
        <LiaCookieBiteSolid size={30} />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center pt-8">
      <div className="w-full sm:w-[400px] bg-white rounded-lg border border-gray-500">
        {session?.user ? eventDetails : homeForm}
      </div>
    </div>
  );
}
