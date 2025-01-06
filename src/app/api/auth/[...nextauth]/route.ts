import NextAuth from "next-auth"

import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
          return true
        },
        async redirect({ url, baseUrl }) {
          return baseUrl
        },
        async session({ session, token, user }) {
          return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            console.log(user, token, account, isNewUser)
          return token
        }
      }
})

export {handler as GET, handler as POST}