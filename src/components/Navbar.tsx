import Link from "next/link";
import { ModeToggle } from '@/components/ModeToggle';
import MobileMenu from "@/components/rightMenu/MobileMenu";
import { Bell, CirclePlus, CircleUserRound, Home, LoaderCircle, MessageSquareText, Search, UsersRound } from "lucide-react";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <div className="flex border-b h-full items-center justify-between gap-8">
      <div className="md:hidden lg:block">
        <Link href={'/'} className="font-bold text-xl">Faded Echo</Link>
      </div>
      <div className="hidden md:flex flex-1 justify-between">
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
        <div className="hidden xl:flex items-center p-2 rounded-sm h-8 border shadow-sm">
          <input type='text' placeholder="search..." className="outline-none bg-transparent" />
          <Search className="cursor-pointer w-4 h-4" />
        </div>
      </div>
      <div className="flex w-[20%] justify-end gap-1">
        <ModeToggle />
        <div className="hidden md:flex items-center text-sm">
          <ClerkLoading>
            <LoaderCircle className="animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <div className="flex gap-2">
                <Button variant='ghost' size='icon'>
                  <CircleUserRound />
                </Button>
                <Button variant='ghost' size='icon'>
                  <MessageSquareText />
                </Button>
                <Button variant='ghost' size='icon'>
                  <Bell />
                </Button>
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <Link href={'/sign-in'}>Sign in / Sign up</Link>
            </SignedOut>
          </ClerkLoaded>
        </div>
        <MobileMenu />
      </div>
    </div>
  )
}
