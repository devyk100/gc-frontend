import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const classes: Class_t[] = [
    {
        duration: 10,
        instructor: "me oaevnio",
        name: "oiagwneioaewnf awef w",
        instructor_img_url: "https://cdn11.bigcommerce.com/s-yn8q9n4bvw/content/education/become-an-instructor/img-certification-rockstar@2x.jpg",
        start_time: new Date(),
        id: 10
    },
    {
        duration: 10,
        instructor: "me oaevnio",
        name: "oiagwneioaewnf awef w",
        instructor_img_url: "https://cdn11.bigcommerce.com/s-yn8q9n4bvw/content/education/become-an-instructor/img-certification-rockstar@2x.jpg",
        start_time: new Date(),
        id: 12
    },
    {
        duration: 10,
        instructor: "me oaevnio",
        name: "oiagwneioaewnf awef w",
        instructor_img_url: "https://cdn11.bigcommerce.com/s-yn8q9n4bvw/content/education/become-an-instructor/img-certification-rockstar@2x.jpg",
        start_time: new Date(),
        id: 11
    }
]


export default function ClassSection({className} :{ 
    className?: string
}) {
    return <div className={cn("w-full", className)}>
        <h1 className="font-semibold text-2xl m-2 md:mt-10 w-full border-b-2 py-2">📅 Upcoming Live Classes</h1>
        <div className="flex flex-col">

            {classes.map((val) => <ClassCard duration={val.duration} id={val.id} key={val.id} instructor={val.instructor} instructor_img_url={val.instructor_img_url} name={val.name} start_time={val.start_time} />)}
            <Button>Load more</Button>
        </div>
    </div>
}






function ClassCard({
    duration,
    id,
    instructor,
    instructor_img_url,
    name,
    start_time
}: Class_t) {
    return <>
        <span className="border-[0.5px] relative dark:border-zinc-800 border-zinc-200 p-2 rounded-lg my-1">
            <h4 className="text-md font-semibold">{name}</h4>
            <p className="text-sm">From: {start_time.toString()}</p>
            <p className="text-sm">Duration: {duration}</p>
            <span className="p-2 flex items-center gap-x-2">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{instructor[0]}</AvatarFallback>
                </Avatar>
                {instructor}
            </span> 
            <Button className="absolute bottom-0 right-0 m-2 text-lg" variant={"link"}>Join</Button>
        </span>
    </>
}


export type Class_t = {
    name: string;
    start_time: Date;
    duration: number,
    instructor: string,
    instructor_img_url: string,
    id: number
}