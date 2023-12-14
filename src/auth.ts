import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import prismadb from "@/lib/prismadb";

async function getUser(email: string) {
    const user = await prismadb.user.findUnique({
        where: {
            email: email
        }
    })
    return user
}
export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            // @ts-ignore
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordMatch = await bcrypt.compare(password, user.hashedPassword)
                    if (passwordMatch) return user
                }

                return null;
            },
        }),
    ],
});