import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Image, Smile, Video } from "lucide-react";

export default function AddPost() {
  return (
    <div className="border p-4 rounded-lg shadow-sm flex gap-4">
      <div className="">
        <Avatar className="w-12 h-12">
          <AvatarImage src="https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=800" alt="image" />
        </Avatar>
      </div>
      <div className="flex-1">
        <div className="flex gap-2">
          <Textarea placeholder="Type your message here." />
          <div className="flex items-end">
            <Smile className="text-violet-600" />
          </div>
        </div>
        <div className="flex gap-2 text-xs text-gray-400 mt-1 flex-wrap">
          <div className="flex gap-1 justify-center items-center cursor-pointer">
            <Image width={18} height={18} />
            <span>Photo</span>
          </div>
          <div className="flex gap-1 justify-center items-center cursor-pointer">
            <Video width={18} height={18} />
            <span>Video</span>
          </div>
          <div className="flex gap-1 justify-center items-center cursor-pointer">
            <Video width={18} height={18} />
            <span>Video</span>
          </div>
          <div className="flex gap-1 justify-center items-center cursor-pointer">
            <Video width={18} height={18} />
            <span>Video</span>
          </div>
        </div>
      </div>
    </div>
  )
}
