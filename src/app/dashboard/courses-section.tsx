import { cn } from "@/lib/utils"

const courses = [
    {
        description: "Lorem agionioesngf aoviewnoigne awogeo ainion3 egionion  oinio ngeiongioneio nong4o3in ionio n3wio ",
        id: 2,
        instructor: "Hehe somethign",
        language: "fnaioengioewnfionafwoe",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ718nztPNJfCbDJjZG8fOkejBnBAeQw5eAUA&s",
        name: "fiowi awpoemf oifwnea oioaewn in 123 days",
        instructor_img_url: "https://cdn11.bigcommerce.com/s-yn8q9n4bvw/content/education/become-an-instructor/img-certification-rockstar@2x.jpg"
    }, {
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

export default function CourseSection({className} :{ 
    className?: string
}) {
    return (<div className={cn("", className)}>
        <h1>🎓 Enrolled Courses</h1>
    </div>)
}