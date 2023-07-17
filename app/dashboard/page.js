import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

import EventCard from "./components/eventCard";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const fetchEvents = async () => {
    const events = await prisma.EventsOnUsers.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        event: true,
      },
      orderBy: {
        event: {
          datetime: "desc",
        },
      },
    });

    return events;
  };

  const events = await fetchEvents();

  console.log(events[0].event.datetime);

  return (
    <div className="w-full max-w-[400px] flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Your events</h1>
        <p className="text-gray-500">Sorted bt date</p>
      </div>
      <div className="py-2">
        {events.map((ele) => (
          <Link
            href={`/e/${ele.event.id}`}
            className="h-36 w-full rounded-lg mb-2 px-6 flex flex-col justify-center border border-gray-500 cursor-pointer"
          >
            <EventCard
              key={ele.event.id}
              id={ele.event.id}
              name={ele.event.name}
              location={ele.event.location}
              datetime={ele.event.datetime.toISOString()}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
