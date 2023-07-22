import EventCard from "@/app/dashboard/components/eventCard";
import { prisma } from "@/lib/db";
import EventFoodList from "./components/eventFoodList";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import HomeForm from "@/app/components/HomeForm";
import { LiaCocktailSolid, LiaCookieBiteSolid } from "react-icons/lia";
import JoinEvent from "./components/joinEvent";

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
    },
  });

  if (event !== null) <div>Event not found</div>;

  let joined;

  const record = await prisma.EventsOnUsers.findMany({
    where: {
      eventId: eventId,
      user: {
        email: session?.user.email,
      },
    },
  });

  record.length > 0 ? (joined = true) : (joined = false);

  const eventDetails = (
    <>
      <EventCard
        id={event.id}
        datetime={event.datetime.toISOString()}
        name={event.name}
        location={event.location}
        joined={joined}
      />
      <div className="w-full max-h-[400px] flex flex-col justify-center items-center p-4 pt-0">
        {joined ? (
          <EventFoodList eventId={eventId} maxguests={event.maxguests} />
        ) : (
          <JoinEvent eventId={eventId} />
        )}
      </div>
    </>
  );

  const homeForm = (
    <div className="min-h-[330px] p-4 flex flex-col justify-between items-center">
      <div className="w-full">
        <h1 className="mb-4 text-2xl font-light ">
          You&apos;re invited to{" "}
          <span className="underline">
            {event.name}
          </span>
        </h1>
        <HomeForm />
      </div>
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
