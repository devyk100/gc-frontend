
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
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
