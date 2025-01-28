"use client"
import { gsap } from "gsap";
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { prisma } from "@/lib/prisma"
import Image from "next/image"

type Card_t = {
    description: string,
    id: number,
    language: string,
    name: string,
    instructor: string
    image_url: string,
    instructor_img_url: string
}

const courses: Card_t[] = [
    {
        description: "Lorem agionioesngf aoviewnoigne awogeo ainion3 egionion  oinio ngeiongioneio nong4o3in ionio n3wio ",
        id: 2,
        instructor: "Hehe somethign",
        language: "fnaioengioewnfionafwoe",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ718nztPNJfCbDJjZG8fOkejBnBAeQw5eAUA&s",
        name: "fiowi awpoemf oifwnea oioaewn in 123 days",
        instructor_img_url: "https://cdn11.bigcommerce.com/s-yn8q9n4bvw/content/education/become-an-instructor/img-certification-rockstar@2x.jpg"
    },
    {
        description: "fveawpofn poewnf ioan ionio n3wio ",
        id: 3,
        instructor: "foiwaen ioan wionfw",
        language: "fmaewio o nawe",
        image_url: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        name: "fiowi awpoemf fwl mpo n days",
        instructor_img_url: "https://cdn11.bigcommerce.com/s-yn8q9n4bvw/content/education/become-an-instructor/img-certification-rockstar@2x.jpg"
    },
    {
        description: "fveawpofn poewnf ioan ionio n3wio ",
        id: 4,
        instructor: "foiwaen ioan wionfw",
        language: "fmaewio o nawe",
        image_url: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        name: "fiowi awpoemf fwl mpo n days",
        instructor_img_url: "https://cdn11.bigcommerce.com/s-yn8q9n4bvw/content/education/become-an-instructor/img-certification-rockstar@2x.jpg"
    },
    {
        description: "fveawpofn poewnf ioan ionio n3wio ",
        id: 5,
        instructor: "foiwaen ioan wionfw",
        language: "fmaewio o nawe",
        image_url: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        name: "fiowi awpoemf fwl mpo n days",
        instructor_img_url: "https://cdn11.bigcommerce.com/s-yn8q9n4bvw/content/education/become-an-instructor/img-certification-rockstar@2x.jpg"
    },
    {
        description: "fveawpofn poewnf ioan ionio n3wio ",
        id: 6,
        instructor: "foiwaen ioan wionfw",
        language: "fmaewio o nawe",
        image_url: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        name: "fiowi awpoemf fwl mpo n days",
        instructor_img_url: "https://cdn11.bigcommerce.com/s-yn8q9n4bvw/content/education/become-an-instructor/img-certification-rockstar@2x.jpg"
    },
    {
        description: "fveawpofn poewnf ioan ionio n3wio ",
        id: 7,
        instructor: "foiwaen ioan wionfw",
        language: "fmaewio o nawe",
        image_url: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        name: "fiowi awpoemf fwl mpo n days",
        instructor_img_url: "https://cdn11.bigcommerce.com/s-yn8q9n4bvw/content/education/become-an-instructor/img-certification-rockstar@2x.jpg"
    },
    {
        description: "fveawpofn poewnf ioan ionio n3wio ",
        id: 8,
        instructor: "foiwaen ioan wionfw",
        language: "fmaewio o nawe",
        image_url: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        name: "fiowi awpoemf fwl mpo n days",
        instructor_img_url: "https://cdn11.bigcommerce.com/s-yn8q9n4bvw/content/education/become-an-instructor/img-certification-rockstar@2x.jpg"
    }
]

export default function CardWithForm() {
    return (
        <>
        <div className="flex flex-col items-center justify-center">
            <AnimatedUnderline />
            
            <FilterCourse />
            <div className="flex items-center justify-center border-t-2 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map((val) => <CourseCard description={val.description} id={val.id} key={val.id} image_url={val.image_url} instructor={val.instructor} instructor_img_url={val.instructor_img_url} language={val.language} name={val.name} />)}
                </div>
            </div>
        </div>
        </>
    )
}

function FilterCourse() {
    return (<>
        <div className="flex gap-x-2 flex-wrap m-2">
            <span className="">
                <span className="text-sm">Language</span>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Language</SelectLabel>
                            <SelectItem value="Spanish">Spanish</SelectItem>
                            <SelectItem value="Japanese">Japanese</SelectItem>
                            <SelectItem value="Chinese">Chinese</SelectItem>
                            <SelectItem value="Hindi">Hindi</SelectItem>
                            <SelectItem value="French">French</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </span>

            
            <span className="">
                <span className="text-sm">Order</span>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Order</SelectLabel>
                            <SelectItem value="Newest">Newest</SelectItem>
                            <SelectItem value="Oldest">Oldest</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </span>
        </div>
    </>)
}


function CourseCard({
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



const AnimatedUnderline: React.FC = () => {
  const textRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Select the underline using the ref
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.querySelector(".underline"),
        { width: "0%" }, // Start at 0 width
        {
          width: "100%", // Animate to full width
          duration: 1, // Animation duration in seconds
          ease: "power2.out", // Smooth easing
        }
      );
    }
  }, []);

  return (
    <div className="relative text-4xl font-bold overflow-hidden mb-10 mt-10" ref={textRef}>
      <h1 className="relative">
      Enroll in courses to learn from the best instructors
        <span className="underline absolute left-0 bottom-[-10%] h-2 bg-black dark:bg-white rounded-md w-0"></span>
      </h1>
    </div>
  );
};