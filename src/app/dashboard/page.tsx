import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Cactus_Classical_Serif } from "next/font/google"
import ClassSection from "./class-section"
import CourseSection from "./courses-section"
import CreateSection from "./create-section"
import LessonSection from "./lesson-section"

export default async function DashboardPage() {
    // fetch all the data, small sized. Use react query
    return (<section className="justify-center items-center grid md:grid-cols-2">
        <ClassSection className="w-[50vw] h-[40vh] overflow-hidden"/>
        <CreateSection className="w-[50vw] h-[40vh]"/>
        <CourseSection className="w-[50vw] h-[40vh]"/>
        <LessonSection className="w-[50vw] h-[40vh]"/>
    </section>)
}
