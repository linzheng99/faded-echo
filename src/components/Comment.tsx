import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Ellipsis, Smile, ThumbsUp } from 'lucide-react';

export default function Comment() {
  return (
    <div>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-2 items-center'>
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=800" alt="image" />
          </Avatar>
          <div className='bg-slate-200 rounded-xl w-full flex text-sm py-2 px-2'>
            <input type="text" placeholder='Type your message here.' className='outline-none bg-transparent flex-1 text-gray-500' />
            <div className="flex items-end">
              <Smile className="text-violet-600" />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-6'>
        <div className='flex gap-4 justify-between'>
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=800" alt="image" />
          </Avatar>
          <div className='flex flex-col gap-2 flex-1'>
            <span className='font-medium'>dsadasdas</span>
            <p>
              In a world where artificial intelligence (AI) and machine learning are rapidly advancing, we are beginning to see these technologies influence everything from healthcare to education, even decision-making in governance. AI can process vast amounts of data at speeds unimaginable for humans and make predictions that often seem accurate
            </p>
            <div className='text-gray-500 text-sm flex items-center gap-6'>
              <div className="flex gap-2 items-center">
                <ThumbsUp className="w-4 h-4 text-violet-600 cursor-pointer" />
                <span className="flex gap-2 justify-center items-center">
                  <span className="text-gray-300">|</span>
                  <span>123</span>
                  <span className="hidden md:flex gap-2">
                    <span>Likes</span>
                  </span>
                </span>
              </div>
              <div className='cursor-pointer'>
                Reply
              </div>
            </div>
          </div>
          <Ellipsis className='cursor-pointer' />
        </div>
      </div>
    </div>
  )
}
