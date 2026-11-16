'use server'
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";


export default async function updatePost(formData: FormData){
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    if(!id || !title){
        throw new Error("Invalid Post")
    }
    await prisma.post.update({
        where: {id},
        data:{
            title
        }
    })
    revalidatePath('/')
    redirect('/')
}