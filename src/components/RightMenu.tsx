import FriendRequest from '@/components/FriendRequest';
import FriendBirthday from '@/components/FriendBirthday';
import Ad from '@/components/Ad';
import UserInformation from '@/components/UserInformation';
import UserMedia from '@/components/UserMedia';

export default function RightMenu({ userId }: { userId?: string }) {
  return (
    <div className="flex flex-col gap-6">
      {userId && <UserInformation userId={userId} />}
      {userId && <UserMedia userId={userId} />}
      <FriendRequest />
      <FriendBirthday />
      <Ad size='lg' />
    </div>
  )
}
