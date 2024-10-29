"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { addComment } from "@/lib/action";
import { generateName } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import { Ellipsis, ThumbsUp, Smile } from "lucide-react";
import { useOptimistic, useState } from "react";

type CommentWithUser = Comment & { user: User }

export default function CommentList({ postId, comments }: { postId: number, comments: CommentWithUser[] }) {
  const { user } = useUser()
  const [desc, setDesc] = useState('')
  const [commentState, setCommentState] = useState(comments)

  const [optimisticComments, addOptimisticComments] = useOptimistic(commentState, (state, value: CommentWithUser) => [value, ...state])

  async function add() {
    if (!user || !desc) return

    addOptimisticComments({
      id: Math.random(),
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
      user: {
        id: user.id,
        username: "Sending Please Wait...",
        avater: user.imageUrl || "/noAvatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    })

    try {
      const createdComment = await addComment(postId, desc)
      setCommentState((prev) => [createdComment as unknown as CommentWithUser, ...prev]);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='flex flex-col my-4'>
        <div className='flex gap-2 items-center'>
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.imageUrl || '/noAvatar.png'} alt="image" />
          </Avatar>
          <form action={add} className="flex-1">
            <div className='bg-slate-200 rounded-xl w-full flex text-sm py-2 px-2'>
              <input type="text" placeholder='Type your message here.' className='outline-none bg-transparent flex-1 text-gray-500' onChange={(e) => setDesc(e.target.value)} />
            </div>
          </form>
          <div className="flex items-end">
            <Smile className="text-violet-600" />
          </div>
        </div>
      </div>
      {
        optimisticComments.length ? (
          <div className='mt-8'>
            {
              optimisticComments.map(comment => (
                <div className='flex gap-4 justify-between' key={comment.id}>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={comment.user.avater || '/noAvatar.png'} alt="image" />
                  </Avatar>
                  <div className='flex flex-col gap-2 flex-1'>
                    <span className='font-medium'>{generateName(comment.user)}</span>
                    <p>{comment.desc}</p>
                    <div className='text-gray-500 text-sm flex items-center gap-6'>
                      <div className="flex gap-2 items-center">
                        <ThumbsUp className="w-4 h-4 text-violet-600 cursor-pointer" />
                        <span className="flex gap-2 justify-center items-center">
                          <span className="text-gray-300">|</span>
                          <span>0</span>
                          <span className="hidden md:flex gap-2">
                            <span>Likes</span>
                          </span>
                        </span>
                      </div>
                      <div className='cursor-pointer'>
                        Reply
                      </div>
                    </div>
                  </div>
                  <Ellipsis className='cursor-pointer' />
                </div>
              ))
            }
          </div>
        ) : ''
      }
    </>
  )
}
