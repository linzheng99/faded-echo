import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { User } from "@prisma/client";
import prisma from "@/lib/client";

export default async function UserMedia({ user }: { user: User }) {

  const postWithMedia = await prisma.post.findMany({
    where: {
      userId: user.id,
      img: {
        not: null
      }
    },
    take: 8,
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">User Media</CardTitle>
          <Button variant='link'>see all</Button>
        </div>
      </CardHeader>
      <CardContent>
        {
          postWithMedia.length ? (
            <div className="grid grid-cols-4 gap-2">
              {
                postWithMedia.map(media => (
                  <div className="h-24 relative" key={media.id}>
                    <Image src={media.img!} alt="" fill className="object-cover rounded-md" />
                  </div>
                ))
              }
            </div>
          ) : 'Not media found...'
        }
      </CardContent>
    </Card>
  )
}
