import { prisma } from "@/lib/db";

export async function POST(request) {
  const { eventId } = await request.json();

  const response = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    select: {
      foods: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  return new Response(JSON.stringify({ foods: [...response.foods] }), {
    status: 200,
  });
}
