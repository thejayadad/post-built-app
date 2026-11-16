'use server'
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";


export default async function deletePost(formData: FormData){
    const id = formData.get('id') as string;
    if(!id){
        throw new Error("Invalid Post")
    }
    await prisma.post.delete({
        where: {id},
     
    })
    revalidatePath('/')
    redirect('/')
}