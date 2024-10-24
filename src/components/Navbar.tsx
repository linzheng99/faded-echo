import Link from "next/link";
import { ModeToggle } from '@/components/ModeToggle';
import MobileMenu from "@/components/MobileMenu";
import { CirclePlus, Home, UsersRound } from "lucide-react";

export default function Header() {
  return (
    <div className="flex border-b h-full items-center justify-between gap-8">
      <div className="md:hidden lg:block">
        <Link href={'/'} className="font-bold text-xl">Faded Echo</Link>
      </div>
      <div className="hidden md:flex flex-1">
        <div className="flex text-sm gap-4">
          <Link href='/' className="flex gap-2 items-center">
            <Home className="w-4 g-4" />
            <span>Home</span>
          </Link>
          <Link href='/home' className="flex gap-2 items-center">
            <UsersRound className="w-4 g-4" />
            <span>Friends</span>
          </Link>
          <Link href='/home' className="flex gap-2 items-center">
            <CirclePlus className="w-4 g-4" />
            <span>Stories</span>
          </Link>
        </div>
      </div>
      <div className="flex w-[20%] justify-end">
        <ModeToggle />
        <MobileMenu />
      </div>
    </div>
  )
}
