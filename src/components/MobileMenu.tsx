"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? <X /> : <Menu />}
      </Button>
      {
        isOpen && (
          <div className="absolute top-24 left-0 h-[calc(100vh-96px)] flex flex-col items-center justify-center w-full font-medium text-xl gap-4">
            <Link href='/'>Home</Link>
            <Link href='/'>Friends</Link>
            <Link href='/'>Groups</Link>
            <Link href='/'>Stories</Link>
          </div>
        )
      }
    </div>
  )
}
