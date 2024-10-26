import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, GraduationCap, Link, MapPin } from "lucide-react";

export default function UserInformation({ userId }: { userId: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">User Information</CardTitle>
          <Button variant='link'>see all</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <h1 className="text-xl font-semibold">postgresql</h1>
            <span className="text-gray-300 text-sm">@mysql</span>
          </div>
          <p className="text-gray-300">
            In a world where artificial intelligence (AI) and machine learning are rapidly advancing, we are beginning.
          </p>
          <div className="flex flex-col gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <MapPin width={16} height={16} />
              <span>zhejiang</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap width={16} height={16} />
              <span>school</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase width={16} height={16} />
              <span>work</span>
            </div>
            <div className="flex items-center gap-2">
              <Link width={16} height={16} />
              <span>link</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col w-full gap-2">
          <Button className="w-full" size="sm">Follower</Button>
          <div className="text-red-500 text-sm self-end">Block User</div>
        </div>
      </CardFooter>
    </Card>
  )
}
