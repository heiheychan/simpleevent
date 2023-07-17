import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(request) {
  const session = await getServerSession(authOptions);

  const response = await prisma.EventsOnUsers.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      event: true,
    },
    orderBy: {
      event: {
        datetime: "asc",
      },
    },
  });

  console.log(response)

  return new Response(JSON.stringify({events: [...response]}), {status: 200})
}