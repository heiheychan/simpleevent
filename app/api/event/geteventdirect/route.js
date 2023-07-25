import { prisma } from "@/lib/db";

export async function POST(request) {
  const body = await request.json();

  const response = await prisma.event.findUnique({
    where: {
      id: body.eventId,
    },
    select: {
      name: true,
      datetime: true,
      location: true,
      covercolor: true,
      maxguests: true,
    },
  });

  return new Response(JSON.stringify({ response }), {
    status: 200,
  });
}