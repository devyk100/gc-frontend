import DashboardHeading from "@/components/ui/dashboard-heading"
import { cn } from "@/lib/utils"

export default function LessonSection({className} :{ 
    className?: string
}) {
    return (<div className={cn("", className)}>
    <DashboardHeading text="📖 Lessons" />
    </div>)
}