import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(request) {
  const body = await request.json();
  const session = await getServerSession(authOptions);
  const { eventId, host } = body;

  console.log(eventId);

  const user = await prisma.user.findUnique({
    select: {
      id: true,
    },
    where: {
      email: session.user.email,
    },
  });

  await prisma.eventsOnUsers.create({
    data: {
      eventId: eventId,
      userId: user.id,
      host: host,
    },
  });

  return new Response(JSON.stringify({ message: "success" }), { status: 200 });
}
