import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function ProfileCard() {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="relative h-20 mt-6">
            <Image src="https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" fill className="object-cover rounded-md" />
            <Image src="https://images.pexels.com/photos/668465/pexels-photo-668465.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" width={48} height={48} className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white" />
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <span className="font-semibold">Faded Echo</span>
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                <Image src="https://images.pexels.com/photos/668465/pexels-photo-668465.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" width={12} height={12} className="rounded-full object-cover w-3 h-3" />
                <Image src="https://images.pexels.com/photos/668465/pexels-photo-668465.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" width={12} height={12} className="rounded-full object-cover w-3 h-3" />
                <Image src="https://images.pexels.com/photos/668465/pexels-photo-668465.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" width={12} height={12} className="rounded-full object-cover w-3 h-3" />
              </div>
              <span>500 followers</span>
            </div>
            <Button size='sm'>My Profile</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
