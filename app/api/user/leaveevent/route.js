import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(request) {
  console.log("inside leaveeventAPI ")
  const body = await request.json();
  const session = await getServerSession(authOptions);
  const { eventId } = body;

  const user = await prisma.user.findUnique({
    select: {
      id: true,
    },
    where: {
      email: session.user.email,
    },
  });

  await prisma.EventsOnUsers.deleteMany({
    where: {
      eventId: eventId,
      userId: user.id,
    },
  });

  console.log(user, eventId)
  await prisma.Commitment.deleteMany({
    where: {
      food: {
        eventId: eventId
      },
      userId: user.id,
    },
  });

  return new Response(JSON.stringify({ message: "success" }), { status: 200 });
}
