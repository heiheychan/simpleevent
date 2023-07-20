import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  const body = await request.json();
  // getUserId

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    },
    select: {
      id: true
    }
  })

  const response = await prisma.commitment.create({
    data: {
      userId: user.id,
      foodId: body.foodId,
      comment: body.comment,
    },
  });

  await prisma.$disconnect()

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
