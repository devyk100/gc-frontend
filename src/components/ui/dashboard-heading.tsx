import { cn } from "@/lib/utils";

export default function DashboardHeading({text, className}: {
    text: string;
    className?: string;
}) {
    return (
        <h1 className={cn("font-semibold text-2xl w-full border-b-2 p-1", className)}>{text}</h1>
    )
}