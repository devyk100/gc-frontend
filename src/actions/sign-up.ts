'use server'

import { hashPassword } from "@/lib/hash-password"
import { prisma } from "@/lib/prisma"
import { randomUUID } from "crypto"

export async function signUpActionFromForm({email, username, password, name}: {
    email: string,
    username: string,
    password: string,
    name: string
}){
    if(!email || !name || !password || !username) {
        return {success: false}
    }
    console.log(email, name, password, username)
    try{
        const hashedPassword = await hashPassword(password);
        await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: hashedPassword,
                picture: "",
                username: username,
                authType: "Email"
            }
        })
        return {
            success: true
        }
    } catch{
        console.log("Error while creating a user")
        return {
            success: false
        }
    }
}

export async function signUpActionFromGoogleFlow({email, name, image}: {
    email: string,
    name: string,
    image: string
}): Promise<boolean> {
    try {
        // email is always unique, so it throws error only if it is not present
        await prisma.user.findUniqueOrThrow({
            where: {
                email: email,
                authType: "Google"
            }
        })
        return true;
    } catch {
        try {
            const user = await prisma.user.create({
                data: {
                    authType: "Google",
                    email: email,
                    name: name,
                    password: "",
                    picture: image,
                    username: randomUUID().toString()
                }
            })
            console.log("created", user)
            return true;
        } catch {
            return false
        }
    }
}

export async function isUsernameAvailable(){
    // implement this in golang lambda function
}

export async function isEmailTaken(){
    // implement this in golang lambda function
}