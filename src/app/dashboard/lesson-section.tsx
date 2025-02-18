import { cn } from "@/lib/utils"

export default function LessonSection({className} :{ 
    className?: string
}) {
    return (<div className={cn("", className)}>
    <h1>📖 Lessons</h1>
    </div>)
}