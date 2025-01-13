import { AWS_LAMBDA_URL } from "@/components/ui/editor"
import axios from "axios"
import { Session } from "next-auth"

export const getImageUrlFromUrl = async (url: string, userData: Session): Promise<string> => {
    const lambdaResponse = await axios.post(AWS_LAMBDA_URL + "/upload-image-from-url", {
        url: url,
        token: userData?.user.token
    })
    return lambdaResponse.data.url
}

export const getImageUrlFromFile = async (file: File, userData: Session): Promise<string> => {
    const lambdaResponse = await axios.post(AWS_LAMBDA_URL + "/get-put-image-url", {
        extension: "",
        token: userData?.user.token
    })

    const { url, filename } = lambdaResponse.data;
    await axios.put(url, file, {
        headers: {
            "Content-Type": file.type
        }
    })

    return "https://d1j4tyxkh4y7ex.cloudfront.net/" + filename
}
