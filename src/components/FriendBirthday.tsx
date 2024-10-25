import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Gift } from "lucide-react";

export default function FriendRequest() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Birthdays</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=800" alt="image" />
            </Avatar>
            <div className="font-semibold">Beauty images</div>
          </div>
          <Button size="sm">Celebrate</Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full bg-slate-300 rounded-md p-2 flex items-center">
          <div className="flex gap-2 items-center">
            <Gift className="w-8 h-8" />
            <div className="flex flex-col gap-1 text-sm">
              <span className="font-semibold">Upcoming Birthdays</span>
              <span>See other 16 have upcoming birthdays</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
