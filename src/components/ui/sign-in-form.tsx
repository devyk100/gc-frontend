"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "./separator"
import { signIn } from "next-auth/react"

const formSchema = z.object({
    email: z.string().min(5).max(50).email({
        message: "Tt should be a valid email"
    }),
    password: z.string().min(8).max(20)
})

export function SigninForm(){
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>){
        console.log(values.email, values.password, "from the form submission");
    }
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-[400px] min-w-[300px] flex flex-col gap-y-3 mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="opacity-80">Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="opacity-80">Password</FormLabel>
                <FormControl>
                  <Input placeholder="your secret password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full dark:bg-gray-100 dark:hover:bg-gray-300">Sign in with Email</Button>
            <div className=" flex items-center justify-center overflow-hidden">
                <Separator className="flex-1"/>
                <span className="text-sm mx-2 text-zinc-500">OR CONTINUE WITH</span>
                <Separator className="flex-1"/>
            </div>
            <Button variant={"outline"} type="button" onClick={() => signIn("google")}>
                <Image src="/google.svg" alt="Logo" width={20} height={20} />Google
            </Button>
        </form>
      </Form>
    )
}