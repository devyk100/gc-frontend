"use client"
import { Button } from "@/components/ui/button";
import {signIn} from "next-auth/react"
import Link from "next/link";
export default function Home() {
  return (
    <main>
      <Button variant={"default"} onClick={() => signIn("google")}>

        Hello from the GengouConnect app
      </Button>
    </main>
  );
}
