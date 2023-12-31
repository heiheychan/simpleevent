import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request) {
  const body = await request.json();
  const { email, password, name } = body;

  const userWithEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithEmail) {
    return new Response(
      JSON.stringify({
        errorMessage: "Email is associated with another account",
      }),
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name
    },
  });

  return new Response(JSON.stringify({ email: user.email }), { status: 200 });
}