"use client"

import { Button } from "@/components/ui/button"
import { switchBlock, switchFollow } from "@/lib/action"
import { useOptimistic, useState } from "react"

type UserInfoCardInteractionType = {
  userId: string
  isUserBlocked: boolean
  isFollowing: boolean
  isFollowingSent: boolean
}

export default function UserInfoCardInteraction(
  {
    userId,
    isUserBlocked,
    isFollowing,
    isFollowingSent,
  }: UserInfoCardInteractionType
) {
  const [userState, setUserState] = useState({
    blocked: isUserBlocked,
    following: isFollowing,
    followingRequestSent: isFollowingSent,
  })

  const [optimisticState, switchOptimisticState] = useOptimistic(userState, (state, value: 'follow' | 'block') => (
    value === 'follow' ?
      {
        ...state,
        following: state.following && false,
        followingRequestSent: !state.following && !state.followingRequestSent ? true : false
      } : {
        ...state,
        blocked: !state.blocked
      }
  ))

  async function follow() {
    switchOptimisticState('follow');
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingRequestSent:
          !prev.following && !prev.followingRequestSent ? true : false,
      }));
    } catch (error) {
      console.log(error)
    }
  }

  async function block() {
    switchOptimisticState('block');
    try {
      await switchBlock(userId);
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked
      }));
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="flex flex-col w-full gap-2">
        <form action={follow}>
          <Button className="w-full" size="sm">
            {
              optimisticState.following ? 'Following' : optimisticState.followingRequestSent ? 'Friend Request Sent' : 'Follow'
            }
          </Button>
        </form>
        <form action={block} className="self-end">
          <Button variant={'ghost'} className="text-red-500 text-sm">
            {optimisticState.blocked ? 'Unblock User' : 'Block User'}
          </Button>
        </form>
      </div></>
  )
}
