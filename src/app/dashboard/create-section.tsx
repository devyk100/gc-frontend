import { Button } from "@/components/ui/button";
import DashboardHeading from "@/components/ui/dashboard-heading";
import { cn } from "@/lib/utils";

export default function CreateSection({ className }: {
    className?: string
}) {
    return (<div className={cn("", className)}>
        <DashboardHeading text="✨ Actions" />
        <span className="right-0 top-0 m-3">
            <Button className="">Create lesson</Button>
            <Button>Create your own course</Button>
        </span>
        <div>
            Courses
        </div>
        <div>
            Lessons
        </div>
        <div>
            Profile settings
        </div>
    </div>)
}
