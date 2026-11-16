import prisma from "@/lib/prisma";
import { Suspense } from "react";
import { createPost } from "@/lib/actions/post/create-post";
import Link from "next/link";

//creating a seperate async request in component to wrap in suspense bondary

async function AllPost(){
  const posts = await prisma.post.findMany();
  return (
    <div className="mt-1">
      {posts.map((p) => (
        <Link href={`/post/${p.id}`} key={p.id}>
          <p>{p.title}</p>
        </Link>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <div className="h-full w-full">
      <div className="px-4 py-2 mx-auto max-w-6xl h-full w-full">
        <div className="w-full flex items-center justify-between">
          <div className="text-2xl font-medium">
            Logo
          </div>
          <div>
            {/* The button to open modal */}
          <label htmlFor="my_modal_6" className="btn">New Post</label>

          {/* Put this part before </body> tag */}
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box">
          <div className="flex justify-between">
                <div>
                     <h3 className="text-lg font-bold">Logo</h3>
              <p className="">Where your free to share with your free to share...</p>
                </div>
                              <label htmlFor="my_modal_6" className="btn">Close!</label>
          </div>

              <div className="modal-action flex flex-col">
                <h1 className="text-center text-2xl font-bold">Title Your Post Here...</h1>
                <form
                action={createPost}
                className="flex flex-col w-full space-y-4">
                  <input
                  className="input w-full"
                  name="title"
                  id="title"
                  placeholder="Enter the title for your post here..."
                  />
                  <button className="btn btn-outline w-full">
                    Add Post
                  </button>
                </form>
              </div>
            </div>
          </div>
          </div>
        </div>
        <h1>All Post Listed Here</h1>
        <Suspense fallback={
          <main>
            <div>Loading Post....</div>
          </main>
        }>
          <AllPost />
        </Suspense>
      </div>
     </div>
  );
}
