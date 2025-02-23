"use client"
import { gsap } from "gsap";
import * as React from "react"
import { useState } from "react";
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
import CourseCard from "@/components/ui/course-card";
import { CustomPagination } from "@/components/ui/custom-pagination";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/utility/api-adapter";

export type Card_t = {
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


async function fetchCourses(filter: string, page: number, order: number): Promise<Card_t[]> {
    const response = await apiClient.post("/list-courses", {
        "limit" : 12,
        "offset": Number(page) || 0,
        "filter": filter,
        "order": order
    })
    return response.data.courses
}


export default function CourseList({initialData, initialPage}: {
    initialData: Card_t[],
    initialPage: number
}) {
    const [filter, setFilter] = useState<string | null>(null);
    const [page, setPage] = useState<number>(initialPage);
    const [order, setOrder] = useState<number>(1);
    const { data, isLoading, isError } = useQuery({
        queryKey: ['courses', {filter, page, order}],
        queryFn: () => fetchCourses(filter!, page, order),
        initialData, 
      })
    if(isLoading) {
        return <>Loading....</>
    }
    if(isError) {
        return <>Error</>
    }
    return (
        <>
        <div className="flex flex-col items-center justify-center">
            <AnimatedUnderline />
            <FilterCourse setFilter={setFilter} setOrder={setOrder}/>
            <div className="flex items-center justify-center border-t-2 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {data?.map((val) => <CourseCard description={val.description} id={val.id} key={val.id} image_url={val.image_url} instructor={val.instructor} instructor_img_url={val.instructor_img_url} language={val.language} name={val.name} />)}
                </div>
            </div>
            <CustomPagination activeIndex={1} handlePageCall={(pageNo: number) => setPage(pageNo)} nextCall={() => setPage(no => no+1)} pageNumbers={[1,2,3,4,5]} prevCall={() => null}/>
        </div>
        </>
    )
}


function FilterCourse({setFilter, setOrder}: {
    setFilter: (val: string) => void,
    setOrder: (val: number) => void
}) {
    return (<>
        <div className="flex gap-x-2 flex-wrap items-center m-2">
        <span>
                <Button variant={"secondary"} onClick={() => {
                    setFilter("")
                    setOrder(1)
                }}>Clear</Button>
            </span>
            <span className="">
                <span className="text-sm">Language</span>
                <Select onValueChange={setFilter}>
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
                <Select onValueChange={(val) => {
                    if(val == "Oldest") {
                        setOrder(1)
                    } else {
                        setOrder(-1)
                    }
                }}>
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
  }, [])

  return (
    <div className="relative text-4xl font-bold overflow-hidden mb-10 mt-10" ref={textRef}>
      <h1 className="relative">
      Enroll in courses to learn from the best instructors
        <span className="underline absolute left-0 bottom-[-10%] h-2 bg-black dark:bg-white rounded-md w-0"></span>
      </h1>
    </div>
  );
};
