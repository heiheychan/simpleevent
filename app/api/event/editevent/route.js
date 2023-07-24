import { prisma } from "@/lib/db";

export async function POST(request) {
  const body = await request.json();

  const response = await prisma.event.update({
    where: {
      id: body.eventId,
    },
    data: {
      name: body.name,
      datetime: new Date(body.datetime),
      location: body.location,
      covercolor: body.covercolor,
      maxguests: +body.maxguests,
    },
  });

  return new Response(JSON.stringify({ message: "success" }), {
    status: 200,
  });
}