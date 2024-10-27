import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import FriendRequestList from "./FriendRequestList";

export default async function FriendRequest() {
  const { userId: currentUserId } = await auth()

  if (!currentUserId) return null

  const requests = await prisma.followRequest.findMany({
    where: {
      receiverId: currentUserId
    },
    include: {
      sender: true
    }
  })

  if (!requests.length) return null

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Friend Request</CardTitle>
          <Button variant='link'>see all</Button>
        </div>
      </CardHeader>
      <CardContent>
        <FriendRequestList requests={requests} />
      </CardContent>
    </Card>
  )
}
