import FriendRequest from '@/components/rightMenu/FriendRequest';
import FriendBirthday from '@/components/rightMenu/FriendBirthday';
import Ad from '@/components/Ad';
import UserInformation from '@/components/rightMenu/UserInformation';
import UserMedia from '@/components/rightMenu/UserMedia';
import { User } from '@prisma/client';
import { Suspense } from 'react';

export default function RightMenu({ user }: { user?: User }) {
  return (
    <div className="flex flex-col gap-6">
      {
        user && (
          <>
            <Suspense fallback="Loading">
              <UserInformation user={user} />
            </Suspense>
            <Suspense fallback="Loading">
              <UserMedia user={user} />
            </Suspense>
          </>
        )
      }
      <FriendRequest />
      <FriendBirthday />
      <Ad size='lg' />
    </div>
  )
}
