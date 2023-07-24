import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(request) {
  const body = await request.json();
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    select: {
      id: true,
    },
    where: {
      email: session.user.email,
    },
  });

  const response = await prisma.EventsOnUsers.findMany({
    where: {
      userId: user.id,
      eventId: body.eventId,
    },
    select: {
      host: true,
      event: true
    }
  });

  return new Response(JSON.stringify({ events: [...response] }), {
    status: 200,
  });
}
