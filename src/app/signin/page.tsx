"use client"
import { Button } from "@/components/ui/button"
import { SigninForm } from "@/components/ui/sign-in-form"
import Image from "next/image"
import Link from "next/link"


export default function SignInPage() {
  return (
    <section className="h-screen w-full flex items-center justify-center overflow-hidden rounded-xl">
      <div className="dark:bg-zinc-900 md:block hidden bg-zinc-200 h-full w-full opacity-85">
        <Image src={"/sign-in-bg.svg"} alt="" height={100} width={100} className="w-full h-full object-cover"/>
      </div>
      <div className=" h-full w-full flex items-center justify-center relative">
        <div className="w-[90%] md:w-[70%] h-full flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Sign in to your account</h1>
          <h4 className="text-sm dark:text-zinc-400 text-zinc-600">Enter your credentials to sign in to your account</h4>
          <SigninForm />
          <Link href={"/signup"} className="absolute top-0 right-0 m-4">
            <Button variant={"outline"} className="dark:text-green-100 text-green-900" >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
