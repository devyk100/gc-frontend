import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { Button } from "./button"
export default function CourseCard({
    description,
    id,
    image_url,
    instructor,
    language,
    name,
    instructor_img_url
}: {
    name: string,
    description: string,
    image_url: string,
    id: number,
    instructor: string,
    language: string,
    instructor_img_url: string,
}) {
    return <Card className="min-w-[320px] max-w-[400px] md:mx-2 my-2 min-h-[380px] max-h-[420px]">
        {image_url ? (
            <Image
                alt={`${name} image`}
                src={image_url}
                className="h-[200px] w-full object-cover"
                width={200}
                height={200}
            />
        ) : ""}

        <CardHeader>
            <CardTitle>{name.length > 120 ? name.slice(0, 120) + " ....." : name}</CardTitle>
            <CardDescription>{description.length > 120 ? description.slice(0, 120) + " ....." : description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
            <div className="flex gap-x-2 items-center ">
                {
                    instructor_img_url ?
                        <Image alt="instructor" src={instructor_img_url} width={100} height={100} className="w-[30px] h-[30px] rounded-full" /> :
                        <Image alt="instructor" src={instructor_img_url} width={100} height={100} className="w-[30px] h-[30px] rounded-full" />
                }
                <h4 className="text-sm">{instructor.length > 18 ? instructor.slice(0, 18) + "....." : instructor}</h4>
            </div>
            <Button variant={"outline"}>See Details</Button>
        </CardFooter>
    </Card>
}

