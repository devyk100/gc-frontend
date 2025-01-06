import { signUpActionFromGoogleFlow } from "@/actions/sign-up"
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
          if(account?.provider == "google"){
            const canProceed = await signUpActionFromGoogleFlow({
              email: user.email!,
              name: user.name!,
              image: user.image!
            })
            return canProceed;
          }
          // console.log("user", user)
          // console.log("account", account)
          // console.log("profile", profile)
          // console.log("email", email)
          // console.log("credentials", credentials)
          return true
        },
        async redirect({ url, baseUrl }) {
          return baseUrl
        },
        async session({ session, token, user }) {
          return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            // console.log(user, token, account, isNewUser)
          return token
        }
      },
      pages: {
        signIn: "/signin"
      }
})

export {handler as GET, handler as POST}