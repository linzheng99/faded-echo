"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { addPost } from "@/lib/action";
import { useUser } from "@clerk/nextjs";
import { Image, Smile } from "lucide-react";
import { useState } from "react";
import AddPostButton from "./AddPostButton";
import { CldUploadWidget } from "next-cloudinary";

export default function AddPost() {
  const { user } = useUser()

  const [, setDesc] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [img, setImg] = useState<any>()

  return (
    <div className="border p-4 rounded-lg shadow-sm flex gap-4">
      <div className="">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user?.imageUrl || '/noAvatar.png'} alt="image" />
        </Avatar>
      </div>
      <div className="flex-1">
        <form action={(formData) => addPost(formData, img?.secure_url || '')}>
          <div className="flex gap-2">
            <Textarea placeholder="Type your message here." name="desc" onChange={(e) => setDesc(e.target.value)} className="grow-0" />
            <div className="flex flex-col justify-end gap-2 items-center">
              <Smile className="text-violet-600" />
              <AddPostButton />
            </div>
          </div>
        </form>
        <div className="flex gap-2 text-xs text-gray-400 mt-1 flex-wrap">
          <CldUploadWidget
            uploadPreset="fadedEcho"
            onSuccess={(result, { widget }) => {
              console.log(result)
              setImg(result.info);
              widget.close();
            }}
          >
            {
              ({ open }) => {
                return (<div className="flex gap-1 justify-center items-center cursor-pointer" onClick={() => open()}>
                  <Image width={18} height={18} />
                  <span>Photo</span>
                </div>)
              }
            }
          </CldUploadWidget>
        </div>
      </div>
    </div>
  )
}
