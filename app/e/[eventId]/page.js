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
      <div className="mb-4">
        <EventCard
          id={event.id}
          datetime={event.datetime.toISOString()}
          name={event.name}
          location={event.location}
          joined={joined}
        />
      </div>
      {joined ? (
        <EventFoodList eventId={eventId} maxguests={event.maxguests} />
      ) : (
        <div className="w-full h-[500px] bg-white border border-gray-500 rounded-lg flex flex-col justify-center items-center p-4 overflow-scroll">
          <JoinEvent eventId={eventId} />
        </div>
      )}
    </>
  );

  const homeForm = (
    <div className="min-h-[330px] py-4 flex flex-col justify-between items-center">
      <div className="w-full">
        <h1 className="mb-4 text-2xl">
          You&apos;re invited to{" "}
          <span className="font-serif font-light underline italic">
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
    <div className="w-full max-w-[400px] bg-gray-50 p-6 rounded-lg max-h-[660px] border border-gray-500 ">
      {session?.user ? eventDetails : homeForm}
    </div>
  );
}
