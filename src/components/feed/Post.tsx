import Image from 'next/image';
import Comment from '@/components/feed/Comment';
import { Post as PostType, User } from "@prisma/client";
import { generateName } from "@/lib/utils";
import PostInteraction from "@/components/feed/PostInteraction";
import { auth } from "@clerk/nextjs/server";
import PostMenu from "@/components/feed/PostMenu";

type FeedPostType = PostType & { user: User } & {
  likes: [{ userId: string }];
} & {
  _count: { comments: number };
};

export default async function Post({ post }: { post: FeedPostType }) {
  const { userId: currentUserId } = await auth()
  const { user, _count } = post
  return (
    <div className="flex flex-col gap-4 border p-4 rounded-lg shadow-sm">
      <div className="flex justify-between">
        <div className="flex gap-2 justify-center items-center">
          <Image src={user.avater || '/noAvater.png'} alt="post image" width={40} height={40} className="rounded-full w-10 h-10" />
          <span className="font-semibold">{generateName(user)}</span>
        </div>
        {
          post.userId === currentUserId &&
          <PostMenu postId={post.id} />
        }
      </div>
      <div className="flex flex-col gap-4">
        {
          post.img &&
          <div className="w-full min-h-96 relative">
            <Image src={post.img} alt="post image" fill className="object-cover rounded-md" />
          </div>
        }
        <p>{post.desc}</p>
      </div>
      <PostInteraction postId={post.id} likes={post.likes.map(like => like.userId)} commentNumber={_count.comments} currentUserId={currentUserId} />
      <Comment postId={post.id} />
    </div>
  )
}
