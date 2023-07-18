import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  const { eventId } = await request.json();

  const response = await prisma.event.findUnique({
    where: {
      id: +eventId,
    },
    include: {
      foods: {
        include: {
          commitments: {
            include: {
              user: true
            }
          }
        }
      }
    }
  });

  return new Response(JSON.stringify({ foods: [...response.foods] }), {
    status: 200,
  });
}
