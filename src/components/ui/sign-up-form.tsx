"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "./separator"
import { signIn } from "next-auth/react"
import debounce from "lodash.debounce"
import { signUpActionFromForm } from "@/actions/sign-up"
import { toast } from "sonner"
import { redirect } from "next/navigation"


const formSchema = z.object({
    name: z.string().min(2, { message: "Must contain atleast 2 characters" }),
    email: z.string().min(5, { message: "Must contain atleast 5 characters" }).max(50).email({
        message: "It should be a valid email"
    })
        .refine(async (value) => !await debouncedEmailTakenCheck(value), 'This email id is already used.'),
    password: z.string().min(8, { message: "Must contain atleast 8 characters" }).max(20),
    confirmPassword: z.string().min(8, { message: "Must contain atleast 8 characters" }).max(20),
    username: z.string().min(5, { message: "Must contain atleast 5 characters" }).max(15)
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
        .refine(async (value) => await debouncedUsernameAvailableCheck(value), 'This username has been already taken.')

})
    .refine((data) => data.password == data.confirmPassword, {
        path: ["confirmPassword"],
        message: "The passwords do not match"
    })

const debouncedUsernameAvailableCheck = debounce(async (username: string) => {
    return true;
    if (!username) return true;
    const response = await fetch(`/api/check-username?username=${username}`);
    const data = await response.json();
    return data.available; // true if available
}, 500);

const debouncedEmailTakenCheck = debounce(async (email: string) => {
    return false;
    if (!email) return true;
    const response = await fetch(`/api/check-email?email=${email}`);
    const data = await response.json();
    return data.taken; // true if already taken
}, 500);


export function SignUpForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            username: ""
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Tried")
        const response = await signUpActionFromForm({
            email: values.email,
            name: values.name,
            password: values.password,
            username: values.username
        })
        if (response.success == false) {
            toast("User registration failed, try again later.")
        } else {
            redirect("/signin")
        }
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-[400px] min-w-[300px] flex flex-col gap-y-3 mt-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="opacity-80">Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                    <Input placeholder="your secret password" {...field} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="opacity-80">Confirm password</FormLabel>
                                <FormControl>
                                    <Input placeholder="confirm your secret password" {...field} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="opacity-80">Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="confirm your secret password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full dark:bg-gray-100 dark:hover:bg-gray-300">Sign Up</Button>
                </form>
            </Form>
        </>
    )
}
