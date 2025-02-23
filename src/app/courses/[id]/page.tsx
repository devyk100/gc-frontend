import apiClient from "@/utility/api-adapter";
import { notFound } from "next/navigation";

interface CoursePageProps {
    params: { id: string };
  }

export default async function CourseVarPage({params}: CoursePageProps) {
    const {id} = await params
    if(isNaN(Number(id))) {
        notFound()
    } else {
        try {
            const res = await apiClient.post("/get-course", {
                id: Number(id)
            })
            return (<>{JSON.stringify(res.data)}</>)
        } catch(err) {
            notFound()
        }
    }
}