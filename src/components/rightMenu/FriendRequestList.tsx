"use client"

import { FollowRequest, User } from "@prisma/client"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { CircleCheck, CircleX } from "lucide-react"
import { generateName } from "@/lib/utils"
import { useOptimistic, useState } from "react"
import { acceptFollowRequest, rejectFollowRequest } from "@/lib/action"
import { Button } from "../ui/button"

type RequestWithSender = FollowRequest & {
  sender: User
}
export default function FriendRequestList({ requests }: { requests: RequestWithSender[] }) {
  const [requestState, setRequestState] = useState(requests)

  const [optimisticRequests, removeOptimisticRequests] = useOptimistic(
    requestState,
    (state, value: number) => state.filter((req) => req.id !== value)
  )

  async function accept(requestId: number, userId: string) {
    removeOptimisticRequests(requestId)
    try {
      await acceptFollowRequest(userId)
      setRequestState((prev) => prev.filter(p => p.id !== requestId))
    } catch (error) {
      console.log(error)
    }
  }

  async function reject(requestId: number, userId: string) {
    removeOptimisticRequests(requestId)
    try {
      await rejectFollowRequest(userId)
      setRequestState((prev) => prev.filter(p => p.id !== requestId))

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {
        optimisticRequests.map(request => (
          <div className="flex justify-between items-center" key={request.id}>
            <div className="flex items-center gap-4 cursor-pointer">
              <Avatar className="w-10 h-10">
                <AvatarImage src={request.sender.avater || '/noAvater.png'} alt="image" />
              </Avatar>
              <span className="font-semibold">{generateName(request.sender)}</span>
            </div>
            <div className="flex gap-4">
              <form action={() => accept(request.id, request.sender.id)}>
                <Button variant={'ghost'}>
                  <CircleCheck className="text-green-500 cursor-pointer" />
                </Button>
              </form>
              <form action={() => reject(request.id, request.sender.id)}>
                <Button variant={'ghost'}>
                  <CircleX className="text-red-500 cursor-pointer" />
                </Button>
              </form>
            </div>
          </div>
        ))
      }
    </div>
  )
}
