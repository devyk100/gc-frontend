"use client"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import axios from "axios"
import { getSession, useSession } from "next-auth/react"
const AWS_LAMBDA_URL = "http://127.0.0.1:8081";

export default function ImageUploadTest (){
    const inputRef = useRef<HTMLInputElement>(null)
    // const user = useSession()
    return (<>
    Hello world
    <input type="file" ref={inputRef}></input>
    <Button onClick={async () => {
        console.log(inputRef.current?.files)
        const file = inputRef.current?.files![0]
        const u = await getSession()
        const token = u?.user!.token;
        console.log(AWS_LAMBDA_URL)
        const resp = await axios.post(AWS_LAMBDA_URL+"/get-put-image-url", {
            extension: "f",
            token: token 
        })
        console.log(resp)
        await axios.put(resp.data.url, file, {headers: {
            "Content-Type": file?.type
        }})
        console.log(u, "user")
    }}>Upload</Button>
    </>)
}