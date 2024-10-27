import { Ellipsis, Heart, MessageCircleMore, SquareArrowOutUpRight } from "lucide-react";
import Image from 'next/image';
import Comment from '@/components/feed/Comment';

export default function Post() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-2 justify-center items-center">
          <Image src="https://images.pexels.com/photos/593655/pexels-photo-593655.jpeg?auto=compress&cs=tinysrgb&w=800" alt="post image" width={40} height={40} className="rounded-full w-10 h-10" />
          <span className="font-semibold">Faded echo user</span>
        </div>
        <Ellipsis className="cursor-pointer" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="w-full min-h-96 relative">
          <Image src="https://images.pexels.com/photos/593655/pexels-photo-593655.jpeg?auto=compress&cs=tinysrgb&w=800" alt="post image" fill className="object-cover rounded-md" />
        </div>
        <p>“成功的秘诀在于始终坚持自己的信念，即使面对困难和挑战，也不轻言放弃。” —— 温斯顿·丘吉尔</p>
      </div>
      <div className="flex justify-between items-center text-sm">
        <div className="flex gap-4">
          <div className="flex gap-2 items-center justify-center bg-slate-100 rounded-xl py-1 px-2 text-gray-400">
            <Heart className="w-4 h-4 text-violet-600" />
            <span className="flex gap-2 justify-center items-center">
              <span className="text-gray-300">|</span>
              <span>123</span>
              <span className="hidden md:flex gap-2">
                <span>Likes</span>
              </span>
            </span>
          </div>
          <div className="flex gap-2 items-center justify-center bg-slate-100 rounded-xl py-1 px-2 text-gray-400">
            <MessageCircleMore className="w-4 h-4 text-violet-600" />
            <span className="flex gap-2 justify-center items-center">
              <span className="text-gray-300">|</span>
              <span>123</span>
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
            <span>123</span>
            <span className="hidden md:flex gap-2">
              <span>Shared</span>
            </span>
          </span>
        </div>
      </div>
      <Comment />
    </div>
  )
}
