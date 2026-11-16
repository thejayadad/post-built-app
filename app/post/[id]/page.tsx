import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import Link from "next/link";
import { Suspense } from "react";
import updatePost from "@/lib/actions/post/update-post";
import deletePost from "@/lib/actions/post/delete-post";

 async function SinglePost({ params }: { params: Promise<{ id: string }> }){
    const {id} = await params;
    const post = await prisma.post.findUnique({
        where: {id},
    
    })
    if(!post){
        notFound()
    }
    return (
        <div className="flex w-full">
          <form action={updatePost} className="space-y-4 flex w-full">
            <input 
                defaultValue={post.id}
                id="id"
                name="id"
                hidden
            />
            <input
                defaultValue={post.title}
                id="title"
                name="title"
                className="input w-full outline-none"
            />
            <button className="btn btn-sm btn-neutral">Update</button>
        </form>
     
            <form action={deletePost}>
            <input 
                defaultValue={post.id}
                id="id"
                name="id"
                hidden
            />
                <button className="btn btn-sm btn-warning">Delete</button>
            </form>
        </div>
      
    )
}

export default function SinglePostPage({ params }: { params: Promise<{ id: string }> }){
    return (
        <div className="h-full w-full">
           <div className="px-4 py-2 mx-auto max-w-6xl h-full w-full">
               <div className="flex items-center w-full justify-between">
                      <Link href={'/'} className=" font-medium">
                        Back To Home
                    </Link>
                </div>
                <Suspense
                fallback={
                    <main>
                        <div>Loading Post...</div>
                    </main>
                }
                >
                    <SinglePost params={params} />
                </Suspense>
            </div>        
        
        </div>
    )
}