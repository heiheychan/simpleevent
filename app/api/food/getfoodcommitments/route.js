import { prisma } from "@/lib/db";

export async function POST(request) {
  const { foodId } = await request.json();

  const response = await prisma.food.findUnique({
    where: {
      id: foodId,
    },
    select: {
     name: true,
     commitments: {
      select: {
        id: true,
        created_at: true,
        comment: true,
        user: {
          select: {
            name: true
          }
        }
      }
     }
    }
  });

  return new Response(JSON.stringify({ ...response }), {
    status: 200,
  });
}
