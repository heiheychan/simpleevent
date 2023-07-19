import EventCard from "@/app/dashboard/components/eventCard";
import { PrismaClient } from "@prisma/client";
import EventFoodList from "./components/eventFoodList";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import HomeForm from "@/app/components/HomeForm";
import { BiSolidDrink } from "react-icons/bi";
import JoinEvent from "./components/joinEvent";

const prisma = new PrismaClient();

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
      users: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  const filteredUser = event.users.filter((ele) => {
    return ele.user.email === session?.user.email;
  });
  const joined = filteredUser.length > 0;

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
    <div className="min-h-[600px] py-4 flex flex-col justify-between items-center">
      <div className="w-full">
        <h1 className="mb-4 text-2xl">
          You're invited to{" "}
          <span className="font-serif font-light underline italic">
            {event.name}
          </span>
        </h1>
        <HomeForm />
      </div>
      <BiSolidDrink size={30} />
    </div>
  );

  return (
    <div className="w-full max-w-[400px] bg-gray-50 p-6 rounded-lg min-h-[600px] border border-gray-500 ">
      {session?.user ? eventDetails : homeForm}
    </div>
  );
}
