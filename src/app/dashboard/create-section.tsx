import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CreateSection({className} :{ 
    className?: string
}) {
    return (<div className={cn("", className)}>
    <h1>✨ Actions </h1>
    <span className="md:absolute right-0 top-0 m-3">
                <Button>Create</Button>
            </span>
    </div>)
}
