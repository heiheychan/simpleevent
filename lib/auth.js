import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const authOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
          select: {
            name: true,
            email: true,
            id: true
          }
        })

        console.log(user)
        
        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ]
}