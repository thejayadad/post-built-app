'use server'
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";

export async function createPost(formData: FormData){
    const title = formData.get('title') as string;
    await prisma.post.create({
        data: {
            title
        }
    })
    revalidatePath("/")
    redirect('/')
}