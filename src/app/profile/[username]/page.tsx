import Feed from "@/components/feed/Feed";
import LeftMenu from "@/components/leftMenu/LeftMenu";
import RightMenu from "@/components/rightMenu/RightMenu";
import prisma from "@/lib/client";
import { generateName } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from 'next/image';
import { notFound } from "next/navigation";

export default async function Profile(props: { params: Promise<{ username: string }> }) {
  const { username } = await props.params;

  const user = await prisma.user.findFirst({
    where: {
      username
    },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true
        }
      }
    }
  })

  if (!user) return notFound()

  const { userId: currentUserId } = await auth()

  let isBlocked;
  if (currentUserId) {
    // 是不是被当前用户 blocked
    const blockUser = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId
      }
    })
    isBlocked = blockUser ? true : false
  }
  if (isBlocked) return notFound()

  return (
    <div className="">
      <div className="flex gap-6">
        <div className="hidden xl:block xl:w-[20%]">
          <LeftMenu type="profile" />
        </div>
        <div className="w-full lg:w-[70%] xl:w-[50%]">
          <div className="flex flex-col gap-6">
            <div className="relative h-64">
              <Image src={user.cover || '/noCover.png'} alt="" fill className="object-cover rounded-md" />
              <Image src={user.avater || '/noAvater.png'} alt="" width={96} height={96} className="rounded-full object-cover w-24 h-24 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="my-2">
                <h1 className="font-bold text-2xl">{generateName(user)}</h1>
              </div>
              <div className="flex gap-6 w-full justify-center">
                <div className="flex flex-col w-1/6 items-center">
                  <span className="font-semibold">{user._count.posts}</span>
                  <span className="text-sm">Posts</span>
                </div>
                <div className="flex flex-col w-1/6 items-center">
                  <span className="font-semibold">{user._count.followers}</span>
                  <span className="text-sm">Followers</span>
                </div>
                <div className="flex flex-col w-1/6 items-center">
                  <span className="font-semibold">{user._count.followings}</span>
                  <span className="text-sm">Following</span>
                </div>
              </div>
            </div>
            <Feed />
          </div>
        </div>
        <div className="hidden lg:block w-[30%]">
          <RightMenu user={user} />
        </div>
      </div></div>
  )
}
