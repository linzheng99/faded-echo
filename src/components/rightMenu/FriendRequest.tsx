import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { CircleCheck, CircleX } from "lucide-react";

const requestList = [
  {
    id:1,
    name: 'Beauty images'
  },
  {
    id:2,
    name: 'Beauty images'
  },
  {
    id:3,
    name: 'Beauty images'
  },
]

export default function FriendRequest() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Friend Request</CardTitle>
          <Button variant='link'>see all</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {
            requestList.map(item => (
              <div className="flex justify-between items-center" key={item.id}>
                <div className="flex items-center gap-4 cursor-pointer">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=800" alt="image" />
                  </Avatar>
                  <span className="font-semibold">{item.name}</span>
                </div>
                <div className="flex gap-4">
                  <CircleCheck className="text-green-500" />
                  <CircleX className="text-red-500" />
                </div>
              </div>
            ))
          }
        </div>
      </CardContent>

    </Card>
  )
}
