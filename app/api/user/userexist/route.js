import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (user) {
    return new Response(
      JSON.stringify({
        user: true
      }),
      { status: 200 }
    );
  }

  await prisma.$disconnect()

  return new Response(
    JSON.stringify({
      user: false
    }),
    { status: 200 }
  );
}
