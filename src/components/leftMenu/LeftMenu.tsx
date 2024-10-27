import ProfileCard from '@/components/leftMenu/ProfileCard';
import Ad from '@/components/Ad';
import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';

export default function LeftMenu({ type }: { type: 'home' | 'profile' }) {
  return (
    <div className='flex flex-col gap-6'>
      {type === 'home' && <ProfileCard />}
      <div className='border rounded-lg p-6 flex flex-col gap-4'>
        <Button size="sm" variant='ghost' className='w-full'>
          <div className='flex flex-col gap-1 items-center'>
            <div className='flex gap-4'>
              <Link /><span>My Posts</span>
            </div>
            <hr className='border-t w-36 self-center' />
          </div>
        </Button>
        <Button size="sm" variant='ghost' className='w-full'>
          <div className='flex flex-col gap-1 items-center'>
            <div className='flex gap-4'>
              <Link /><span>My Posts</span>
            </div>
            <hr className='border-t w-36 self-center' />
          </div>
        </Button>
        <Button size="sm" variant='ghost' className='w-full'>
          <div className='flex flex-col gap-1 items-center'>
            <div className='flex gap-4'>
              <Link /><span>My Posts</span>
            </div>
            <hr className='border-t w-36 self-center' />
          </div>
        </Button>
        <Button size="sm" variant='ghost' className='w-full'>
          <div className='flex flex-col gap-1 items-center'>
            <div className='flex gap-4'>
              <Link /><span>My Posts</span>
            </div>
            <hr className='border-t w-36 self-center' />
          </div>
        </Button>
      </div>
      <Ad size='sm' />
    </div>
  )
}
