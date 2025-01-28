"use client"
import { Sheet, SheetTrigger, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SVGProps, useEffect, useState } from "react";
import { ModeToggle } from "./dark-mode-toggle";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { SessionProvider, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const NavItems = [
    { text: "Dashboard", href:"dashboard" },
    { text: "Live Class", href:"schedule" },
    { text: "Learn", href:"learn" },
    { text: "Courses", href:"courses" }
]

export default function Navbar() {


    return (
        <header className="flex h-16 border-b  w-full shrink-0 items-center px-4 md:px-6">
            <SessionProvider>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <MenuIcon className="h-6 w-6" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetDescription></SheetDescription>
                    <SheetTitle></SheetTitle>
                    <SheetContent side="left" title="J">
                        <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
                            <span className="sr-only">GengoConnect</span>
                        </Link>
                        <div className="grid gap-2 py-6">
                            <Logo />
                            <ModeToggle className="flex w-full items-center py-2 text-md font-medium gap-x-2 mt-4 border-t" />
                            {NavItems.map((val) =>
                                <Link key={val.text} href="#" className="flex w-full items-center py-2 text-md font-medium focus:text-zinc-600 hover:text-zinc-600 dark:focus:text-zinc-400 dark:hover:text-zinc-400" prefetch={false}>
                                    {val.text}
                                </Link>)}
                        </div>
                    </SheetContent>
                </Sheet>
                <Link href="#" className="mr-6 hidden lg:flex gap-x-2 items-center justify-center" prefetch={false}>
                    {/* <MountainIcon className="h-6 w-6" /> */}
                    <Logo />
                    <span className="sr-only">GengoConnect</span>
                    <ModeToggle className="" />
                </Link>
                <nav className="ml-auto hidden lg:flex gap-6">
                    {NavItems.map((val) =>
                        <Link
                            key={val.text}
                            href={val.href}
                            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                            prefetch={false}
                        >
                            {val.text}
                        </Link>)}
                    <UserProfile />

                </nav>
            </SessionProvider>
        </header>
    );
}

function UserProfile() {
    const { data: session, status } = useSession()
    return (
        <>
            {status === "authenticated" ?
                <Popover>
                    <PopoverTrigger>
                        <Avatar>
                            <AvatarImage src={session.user.image!} />
                            <AvatarFallback>{session.user.name![0]}</AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>
                        <PopoverContent className="p-3  flex flex-col min-w-[200px] max-w-[300px] gap-y-3">
                        <span>
                            {session.user.name}
                        </span>
                        <span className="text-sm">
                            {session.user.email}
                        </span>
                        <Button variant={"outline"} onClick={() => signOut()}>
                            Logout
                        </Button>
                    </PopoverContent>
                </Popover> : ""}
        </>
    )
}

function MenuIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    );
}



function Logo() {
    return (<>
        <h3 className="font-semibold text-xl bg-gradient-to-r from-blue-300 to-blue-500 text-transparent bg-clip-text">GengoConnect</h3>
    </>)
}