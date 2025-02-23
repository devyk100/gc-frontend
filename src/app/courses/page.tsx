import apiClient from "@/utility/api-adapter"
import CourseList, { Card_t } from "./course-list"


export default async function CoursePage({searchParams }: {
    searchParams: { [key: string]: string } 
}) {
    const {size, page} = await searchParams
    const resp = await apiClient.post("/list-courses", {
        "limit" : Number(size) || 10,
        "offset": Number(page) || 0
    })
    const initialData: Card_t[] = resp.data.courses
    console.log(initialData)
    return (<>
        <CourseList initialData={initialData} initialPage={Number(page)}/>
    </>)
}