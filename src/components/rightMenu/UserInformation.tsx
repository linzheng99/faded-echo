import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, GraduationCap, Link as LinkIcon, MapPin } from "lucide-react";
import { User } from "@prisma/client";
import { generateName } from "@/lib/utils";
import Link from "next/link";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import UserInfoCardInteraction from "./UserInfoCardInteraction";

export default async function UserInformation({ user }: { user: User }) {
  const { city, school, work, description, username, website, createdAt } = user

  const formattedDate = new Date(createdAt).toLocaleDateString('zh-CN', {
    timeZone: 'Asia/Shanghai'
  })

  let isUserBlocked = false
  let isFollowing = false
  let isFollowingSent = false

  const { userId: currentUserId } = await auth()

  if (!currentUserId) return

  const otherUser = currentUserId && currentUserId !== user.id ? true : false
  // 检查当前用户是否 blocked 了指定用户
  const blockRes = await prisma.block.findFirst({
    where: {
      blockerId: currentUserId,
      blockedId: user.id
    }
  })
  isUserBlocked = blockRes ? true : false
  // 检查当前用户是否 follow 了指定用户
  const followRes = await prisma.follower.findFirst({
    where: {
      followerId: currentUserId,
      followingId: user.id
    }
  })
  isFollowing = followRes ? true : false
  // 检查当前用户是否 follow 了指定用户
  const followReqRes = await prisma.followRequest.findFirst({
    where: {
      senderId: currentUserId,
      receiverId: user.id
    }
  })
  isFollowingSent = followReqRes ? true : false

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">User Information</CardTitle>
          {!otherUser && <Button variant='link'>UpdateUser</Button>}
        </div>
      </CardHeader>
      <CardContent className={`${!otherUser && 'pb-0'}`}>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <h1 className="text-xl font-semibold">{generateName(user)}</h1>
            <span className="text-gray-300 text-sm">@{username}</span>
          </div>
          {description && <p className="text-gray-300">{description}</p>}
          <div className="flex flex-col gap-4 text-sm text-gray-500">
            {
              city &&
              <div className="flex items-center gap-2">
                <MapPin width={16} height={16} />
                <span>Living in <b>{city}</b></span>
              </div>
            }
            {
              school &&
              <div className="flex items-center gap-2">
                <GraduationCap width={16} height={16} />
                <span>Went to <b>{user.school}</b></span>
              </div>
            }
            {
              work &&
              <div className="flex items-center gap-2">
                <Briefcase width={16} height={16} />
                <span>Works at <b>{work}</b></span>
              </div>
            }
            <div className="flex justify-between">
              {
                website &&
                <div className="flex items-center gap-2">
                  <LinkIcon width={16} height={16} />
                  <Link href={website}>
                    {website}
                  </Link>
                </div>
              }
              {
                createdAt &&
                <div className="flex gap-1 items-center">
                  <Calendar width={16} height={16} />
                  {formattedDate}
                </div>
              }
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {
          otherUser &&
          <UserInfoCardInteraction
            userId={user.id}
            isFollowing={isFollowing}
            isUserBlocked={isUserBlocked}
            isFollowingSent={isFollowingSent}
          />
        }
      </CardFooter>
    </Card>
  )
}
