import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from 'next/image';
import { Ellipsis } from "lucide-react";

export default function Ad({ size }: { size: 'sm' | 'md' | 'lg' }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className={`text-${size}`}>Sponsored Ads</CardTitle>
          <Ellipsis className="cursor-pointer" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative min-h-48">
          <Image src="https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" fill className="object-cover rounded-lg" />
        </div>
        <div className="flex flex-col gap-6 mt-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=800" alt="image" />
            </Avatar>
            <div>Beauty images</div>
          </div>
          <p className={`text-${size}`}>
            In a world where artificial intelligence (AI) and machine learning are rapidly advancing </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="sm">Learn More</Button>
      </CardFooter>
    </Card>
  )
}
