import { prisma } from "@/lib/db";

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
        user: true,
      }),
      { status: 200 }
    );
  }

  return new Response(
    JSON.stringify({
      user: false,
    }),
    { status: 200 }
  );
}
