import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { type NextAuthOptions } from "next-auth"
import { prisma } from "@/db";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { signIn } from 'next-auth/react';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            // async authorize(credentials) {
            async authorize(credentials: Record<string, string> | undefined): Promise<any | null> {

                try {
                    if (!credentials?.username || !credentials?.password) {
                        return null
                    }

                    const user = await prisma.users.findMany({
                        where: {
                            username: credentials?.username
                        },
                    })
                    // console.log("user", user,)  // ok no np
                    
                    if (user.length == 0) {
                        return null;
                    }

                    if (user.length > 0) {
                        const user1 = user[0];
                        const tmpPassword = credentials?.password;
                        const userPassword = user1?.password;
                        const passwordsMatch = await compare(tmpPassword, userPassword);
                        if (!passwordsMatch) {
                            return null;
                        }
                    }

                    return {
                        userid: user[0].userid,
                        staffid: user[0].staffid,
                        username: user[0].username,
                        role: user[0].role,
                        country: user[0].country,
                    }
                } catch (error) {
                    console.log("Error: ", error);
                }
                // console.log("credentials.username",credentials.username,)

            },
        })
    ],

    callbacks: {
        session: ({ session, token }) => {
            // console.log('Session Callback', { session, token })
            return {
                ...session,
                user: {
                    ...session.user,
                    userid: token.userid,
                    staffid: token.staffid,
                    username: token.username,
                    role: token.role,
                    country: token.country,
                    // randomKey: token.randomKey
                }
            }
        },
        jwt: ({ token, user }) => {
            // console.log('JWT Callback', { token, user })
            if (user) {
                const u = user as unknown as any
                return {
                    ...token,
                    userid: u.userid,
                    staffid: u.staffid,
                    username: u.username,
                    role: u.role,
                    country: u.country,
                }
            }
            return token
        }
    },
    // callbacks: {
    //     async jwt({ token, user }) {
    //         return { ...token, ...user };
    //     },

    //     async session({ session, token }) {
    //         session.user = token;
    //         session.accessToken = token.accessToken;
    //         return session;
    //     },
    // },
    // pages: {
    //     signIn: "/login",
    // },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };