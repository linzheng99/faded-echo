import FriendRequest from '@/components/FriendRequest';
import FriendBirthday from '@/components/FriendBirthday';
import Ad from '@/components/Ad';

export default function RightMenu() {
  return (
    <div className="flex flex-col gap-6">
      <FriendRequest />
      <FriendBirthday />
      <Ad size='lg' />
    </div>
  )
}
