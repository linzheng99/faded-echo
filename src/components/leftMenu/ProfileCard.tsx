import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { generateName } from "@/lib/utils";
import Link from 'next/link';

export default async function ProfileCard() {
  const { userId } = await auth()

  if (!userId) return

  const user = await prisma.user.findFirst({
    where: {
      id: userId
    },
    include: {
      _count: {
        select: {
          followers: true
        }
      }
    }
  })

  if (!user) return

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="relative h-20 mt-6">
            <Image src={user.cover || '/noCover.png'} alt="" fill className="object-cover rounded-md" />
            <Image src={user.avater || '/noAvatar.png'} alt="" width={48} height={48} className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white" />
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <span className="font-semibold">{generateName(user)}</span>
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                <Image src="https://images.pexels.com/photos/668465/pexels-photo-668465.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" width={12} height={12} className="rounded-full object-cover w-3 h-3" />
                <Image src="https://images.pexels.com/photos/668465/pexels-photo-668465.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" width={12} height={12} className="rounded-full object-cover w-3 h-3" />
                <Image src="https://images.pexels.com/photos/668465/pexels-photo-668465.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" width={12} height={12} className="rounded-full object-cover w-3 h-3" />
              </div>
              <span>{user._count.followers} followers</span>
            </div>
            <Button size='sm'>
              <Link href={`/profile/${user.username}`}>
                My Profile
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
