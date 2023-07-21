import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request) {
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
    },
    select: {
      host: true,
      event: true,
    },
    orderBy: {
      event: {
        datetime: "asc",
      },
    },
  });

  return new Response(JSON.stringify({ events: [...response] }), {
    status: 200,
  });
}
