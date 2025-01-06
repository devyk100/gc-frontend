
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

// IMPORTANT
export const dynamic = 'force-dynamic'; 

export default async function Home() {
  const resp = await prisma.user.findMany({});
  console.log(resp)
  return (
    <main>
      <Button variant={"default"}>

        Hello from the GengouConnect app
      </Button>
    </main>
  );
}
