import Post from "@/components/feed/Post";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";

export default async function Feed({ username }: { username?: string }) {

  const { userId: currentUserId } = await auth()

  if (!currentUserId) throw new Error('User is not authenticated')

  let posts: any[] = []

  // 访问其他用户的个人页面
  if (username) {
    posts = await prisma.post.findMany({
      where: {
        user: {
          username: username
        }
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true
          }
        },
        _count: {
          select: {
            comments: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  // 当前用户关注的人 & 自己
  if (!username && currentUserId) {
    const followings = await prisma.follower.findMany({
      where: {
        followerId: currentUserId
      },
      select: {
        followingId: true
      }
    })

    const followingIds = followings.map(follow => follow.followingId)
    const ids = [currentUserId, ...followingIds]
    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: ids
        }
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true
          }
        },
        _count: {
          select: {
            comments: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  return (
    <div className="border p-4 rounded-lg shadow-sm ">
      {posts.length ?
        (posts.map(post => <Post post={post} key={post.id} />)) : 'No posts found...'
      }
    </div>
  )
}
