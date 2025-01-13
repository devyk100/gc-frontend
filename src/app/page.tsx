
import { Button } from "@/components/ui/button";
import { hashPassword } from "@/lib/hash-password";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt"
// IMPORTANT
export const dynamic = 'force-dynamic';

export default async function Home() {
  // const resp = await prisma.user.findMany({});
  // console.log(resp)
  const plainPassword = "mySecretPassword";
  const hashedPassword = await hashPassword(plainPassword);

  // const isMatch = await compare;
  // console.log(isMatch, "is the password matching");
  return (
    <main>
      <Button variant={"default"}>

        Hello from the GengouConnect app
      </Button>
    </main>
  );
}
