import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import ShortUniqueId from "short-unique-id";

export async function POST(request) {
  const body = await request.json();
  const session = await getServerSession(authOptions);
  const userEmail = session.user.email;

  const uid = new ShortUniqueId({ length: 6 });

  const createdEvent = await prisma.event.create({
    data: {
      name: body.name,
      datetime: new Date(body.eventdatetime),
      maxguests: +body.numguest,
      location: body.location,
      id: uid(),
      users: {
        create: [
          {
            host: true,
            user: {
              connect: {
                email: userEmail,
              },
            },
          },
        ],
      },
    },
  });

  const readyFoodList = body.foodlist.map((food) => {
    return { name: food.name, order: food.order, eventId: createdEvent.id };
  });

  await prisma.food.createMany({
    data: readyFoodList,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

// name            String
//   datetime        DateTime
//   location        String
