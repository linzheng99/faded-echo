import Feed from "@/components/Feed";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import Image from 'next/image';

export default function Profile() {
  return (
    <div className="">
      <div className="flex gap-6">
        <div className="hidden xl:block xl:w-[20%]">
          <LeftMenu type="profile" />
        </div>
        <div className="w-full lg:w-[70%] xl:w-[50%]">
          <div className="flex flex-col gap-6">
            <div className="relative h-64">
              <Image src="https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" fill className="object-cover rounded-md" />
              <Image src="https://images.pexels.com/photos/668465/pexels-photo-668465.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" width={96} height={96} className="rounded-full object-cover w-24 h-24 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="my-2">
                <h1 className="font-bold text-2xl">Faded Echo</h1>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <span className="font-medium">142</span>
                  <span className="text-sm">Posts</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-medium">1.2K</span>
                  <span className="text-sm">Followers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-medium">1.4K</span>
                  <span className="text-sm">Followering</span>
                </div>
              </div>
            </div>
            <Feed />
          </div>
        </div>
        <div className="hidden lg:block w-[30%]">
          <RightMenu />
        </div>
      </div></div>
  )
}
