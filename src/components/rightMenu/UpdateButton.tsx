"use client"

import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export default function UpdateButton({...props}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus()
  console.log(pending)
  return (
    <Button {...props} disabled={pending}>
      {pending ? "Updating..." : "Update"}
    </Button>
  )
}
