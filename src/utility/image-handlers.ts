import axios from "axios"
import { Session } from "next-auth"
import { AWS_CLOUDFRONT_URL, AWS_LAMBDA_URL } from "./urls"
import apiClient from "./api-adapter"

export const getImageUrlFromUrl = async (url: string): Promise<string> => {
    const lambdaResponse = await apiClient.post("/upload-image-from-url", { url: url })
    return lambdaResponse.data.url
}

export const getImageUrlFromFile = async (file: File, userData: Session): Promise<string> => {
    const lambdaResponse = await apiClient.post("/get-put-image-url", {
        extension: "",
    })

    const { url, filename } = lambdaResponse.data;
    await axios.put(url, file, {
        headers: {
            "Content-Type": file.type
        }
    })

    return AWS_CLOUDFRONT_URL + filename
}
