import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(request) {
  const body = await request.json();
  const eventId = body.eventId;
  const session = await getServerSession(authOptions);

  console.log("eventId", eventId);
  console.log("session email", session.user.email);

  const user = await prisma.user.findUnique({
    select: {
      id: true
    },
    where: {
      email: session.user.email
    }
  });

  const event = await prisma.EventsOnUsers.findMany({where: {
    userId: user.id,
    eventId,
    host: true
  }})

  if (!event || event.length === 0) {
    return new Response(JSON.stringify({ delete: false }), {
      status: 200,
    });
  }

  await prisma.event.delete({
    where: {
      id: body.eventId,
    }
  });


  return new Response(JSON.stringify({ delete: true }), {
    status: 200,
  });
}
