import { credentialsSignIn } from "@/actions/sign-in"
import { signUpActionFromGithubFlow, signUpActionFromGoogleFlow } from "@/actions/sign-up"
import { Console } from "console"
import { randomUUID } from "crypto"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import jwt from "jsonwebtoken"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
          // name: "Credentials",
          credentials: {
            email: {label: "Email", type: "email", placeholder: "johndoe@mail.com"},
            password: {label:"Password", type: "password"}
          },
          async authorize(credentials, req) {
            console.log("from inside of the credentials provider", credentials, req)
            const user = await credentialsSignIn({
              email: credentials?.email as string,
              password: credentials?.password as string
            })
            if(user.success) {
              console.log("Signi n success")
              return {
                id: user.id!,
                name: user.name!,
                email: user.email!,
                image: user.picture!
              }
            }
            return null;
          },
        }),
        GithubProvider({
          clientId: process.env.GITHUB_CLIENT_ID!,
          clientSecret: process.env.GITHUB_CLIENT_SECRET!,
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
          if(account?.provider == "github"){
            const canProceed = await signUpActionFromGithubFlow({
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
          const jwtToken = jwt.sign({
            email: session.user?.email
          }, process.env.NEXTAUTH_SECRET as string, {expiresIn: "1h"})
          session.user!.token = jwtToken
          return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
          // return {...token, ...user}
          return token
        }
      },
      pages: {
        signIn: "/signin"
      },
      session: {
        strategy: 'jwt',
      }
})

export {handler as GET, handler as POST}