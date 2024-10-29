"use client"

import { switchLike } from "@/lib/action";
import { Heart, MessageCircleMore, SquareArrowOutUpRight } from "lucide-react";
import { useOptimistic, useState } from "react";
import { Button } from "@/components/ui/button";

export default function PostInteraction({
  postId,
  likes,
  commentNumber,
  currentUserId
}: {
  postId: number;
  likes: string[];
  commentNumber: number;
  currentUserId: string | null
}) {

  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: currentUserId ? likes.includes(currentUserId) : false
  })

  const [optimisticLike, switchOptimisticLike] = useOptimistic(likeState, (state) => ({
    likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
    isLiked: !state.isLiked
  }))

  async function likeAction() {
    switchOptimisticLike('')
    try {
      switchLike(postId)
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked
      }))
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="flex justify-between items-center text-sm">
      <div className="flex gap-4">
        <div className="flex gap-2 items-center justify-center bg-slate-100 rounded-xl py-1 px-2 text-gray-400">
          <form action={likeAction}>
            <Button variant={'ghost'} className="w-4 h-4 flex items-center p-0">
              <Heart className={` w-4 h-4 cursor-pointer ${optimisticLike.isLiked ? 'text-red-600' : 'text-violet-600'} `} />
            </Button>
          </form>
          <span className="flex gap-2 justify-center items-center">
            <span className="text-gray-300">|</span>
            <span>{optimisticLike.likeCount}</span>
            <span className="hidden md:flex gap-2">
              <span>Likes</span>
            </span>
          </span>
        </div>
        <div className="flex gap-2 items-center justify-center bg-slate-100 rounded-xl py-1 px-2 text-gray-400">
          <MessageCircleMore className="w-4 h-4 text-violet-600" />
          <span className="flex gap-2 justify-center items-center">
            <span className="text-gray-300">|</span>
            <span>{commentNumber}</span>
            <span className="hidden md:flex gap-2">
              <span>Comments</span>
            </span>
          </span>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-center bg-slate-100 rounded-xl py-1 px-2 text-gray-400">
        <SquareArrowOutUpRight className="w-4 h-4 text-violet-600" />
        <span className="flex gap-2 justify-center items-center">
          <span className="text-gray-300">|</span>
          <span className="hidden md:flex gap-2">
            <span>Shared</span>
          </span>
        </span>
      </div>
    </div>
  )
}
