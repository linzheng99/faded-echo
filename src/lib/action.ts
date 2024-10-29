"use server"

import { auth } from "@clerk/nextjs/server"
import prisma from "./client"
import { z } from "zod";
import { formSchema } from "@/components/rightMenu/UpdateUser";
import { revalidatePath } from "next/cache";


export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = await auth()
  if (!currentUserId) throw new Error('User is not authenticated')
  try {
    // 当前用户已经关注了指定的用户
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: userId,
        followingId: currentUserId
      }
    })
    // 已经关系 -> 取消关注
    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        }
      })
      return
    }
    // 当前用户已经发送 Follow
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: userId
      }
    })
    // 已经发送 —> 取消发送
    // 没有发送 —> 创建发送
    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id
        }
      })
    } else {
      await prisma.followRequest.create({
        data: {
          senderId: currentUserId,
          receiverId: userId
        }
      })
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = await auth()

  if (!currentUserId) throw new Error('User is not authenticated')

  try {
    // 查找当前用户是否 block 指定的用户
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId
      }
    })

    // 存在 -> 删除
    // 不存在 -> 创建
    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id
        }
      })
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId
        }
      })
    }

  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }

}

export const acceptFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = await auth()

  if (!currentUserId) throw new Error('User is not authenticated')

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId
      }
    })

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id
        }
      })

      await prisma.follower.create({
        data: {
          followerId: currentUserId,
          followingId: userId
        }
      })
    }

  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }

}

export const rejectFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = await auth()

  if (!currentUserId) throw new Error('User is not authenticated')

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId
      }
    })

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id
        }
      })
    }

  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }

}

export const updateProfile = async (values: z.infer<typeof formSchema>) => {
  const { userId: currentUserId } = await auth()
  if (!currentUserId) throw new Error('User is not authenticated')
  try {
    await prisma.user.update({
      where: {
        id: currentUserId
      },
      data: values
    })
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}

export const switchLike = async (postId: number) => {
  const { userId: currentUserId } = await auth()

  if (!currentUserId) throw new Error('User is not authenticated')

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: currentUserId,
        postId: postId
      }
    })

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id
        }
      })
    } else {
      await prisma.like.create({
        data: {
          userId: currentUserId,
          postId: postId
        }
      })
    }

  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}

export const addComment = async (postId: number, desc: string) => {
  const { userId: currentUserId } = await auth()

  if (!currentUserId) throw new Error('User is not authenticated')

  try {
    const createdComment = await prisma.comment.create({
      data: {
        desc,
        userId: currentUserId,
        postId,
      },
      include: {
        user: true,
      },
    });

    return createdComment;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }

}

export const addPost = async (formData: FormData, img: string) => {
  const { userId: currentUserId } = await auth()

  if (!currentUserId) throw new Error('User is not authenticated')
  const desc = formData.get('desc') as string
  if (!desc) return

  try {
    await prisma.post.create({
      data: {
        userId: currentUserId,
        desc,
        img
      }
    })
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}

export const deletePost = async (id: number) => {
  const { userId: currentUserId } = await auth()

  if (!currentUserId) throw new Error('User is not authenticated')

  try {
    await prisma.post.delete({
      where: {
        id,
        userId: currentUserId
      }
    })
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}

