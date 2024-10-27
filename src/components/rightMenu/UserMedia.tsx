import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { User } from "@prisma/client";

export default function UserMedia({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">User Media</CardTitle>
          <Button variant='link'>see all</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2">
          <div className="h-24 relative">
            <Image src="https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" fill className="object-cover rounded-md" />
          </div>
          <div className="h-24 relative">
            <Image src="https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" fill className="object-cover rounded-md" />
          </div>
          <div className="h-24 relative">
            <Image src="https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" fill className="object-cover rounded-md" />
          </div>
          <div className="h-24 relative">
            <Image src="https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" fill className="object-cover rounded-md" />
          </div>
          <div className="h-24 relative">
            <Image src="https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" fill className="object-cover rounded-md" />
          </div>
          <div className="h-24 relative">
            <Image src="https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" fill className="object-cover rounded-md" />
          </div>
          <div className="h-24 relative">
            <Image src="https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" fill className="object-cover rounded-md" />
          </div>
          <div className="h-24 relative">
            <Image src="https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" fill className="object-cover rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
