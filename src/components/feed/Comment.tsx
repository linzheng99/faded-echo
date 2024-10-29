import prisma from "@/lib/client"
import CommentList from "@/components/feed/CommentList"

export default async function Comment({ postId }: { postId: number }) {

  const comments = await prisma.comment.findMany({
    where: {
      postId
    },
    include: {
      user: true,
    },
  })

  return (
    <div>
      <CommentList postId={postId} comments={comments} />
    </div>
  )
}
