"use client"

import { User } from "@prisma/client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import Image from 'next/image';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateProfile } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";


export const formSchema = z.object({
  surname: z.string({ required_error: "Please enter surname" }).min(1, { message: "Surname is required" }),
  name: z.string({ required_error: "Please enter name" }).min(1, { message: "Name is required" }),
  description: z.string({ required_error: "Please enter description" }).max(255, { message: "Description must not exceed 255 characters" }),
  city: z.string({ required_error: "Please enter city" }).max(255, { message: "City name must not exceed 255 characters" }),
  school: z.string({ required_error: "Please enter school" }).max(255, { message: "School name must not exceed 255 characters" }),
  work: z.string({ required_error: "Please enter work information" }).max(255, { message: "Work information must not exceed 255 characters" }),
  website: z.string({ required_error: "Please enter website" }).optional().refine((val) => {
    if (!val) return true;
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  }, { message: "Please enter a valid URL" })
})

export default function UpdateUser({ user }: { user: User }) {
  const [open, setOpen] = useState(false)
  const route = useRouter()
  const [pending, setPending] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      surname: user.surname || "",
      name: user.name || "",
      description: user.description || "",
      city: user.city || "",
      school: user.school || "",
      work: user.work || "",
      website: user.website || "",
    },
  })

  useEffect(() => {
    if (!open) {
      form.reset()
      route.refresh()
    }
  }, [open])

  async function handleUpdateProfile(values: z.infer<typeof formSchema>) {
    try {
      setPending(true)
      await updateProfile(values)
      setOpen(false)
      setPending(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <span
        className="text-xs cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Update
      </span>
      {
        open &&
        <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50 ">
          <div className="p-12 bg-background shadow-lg flex flex-col gap-2 w-full sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] relative rounded-lg">
            <h1 className="font-semibold text-2xl">User Information</h1>
            <div className="flex flex-col gap-4">
              <Label htmlFor="cover" className="text-xl font-semibold">User Cover</Label>
              <div className="w-full flex gap-4">
                <div className="w-2/3 relative h-52 cursor-pointer" role="button" >
                  <Image src={user.cover || '/noCover.png'} alt="" className="object-cover rounded-md" fill />
                </div>
              </div>
            </div>
            <Form {...form}>
              <form className="grid grid-cols-2 gap-4">
                {Object.keys(formSchema.shape).map((fieldName) => (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as keyof z.infer<typeof formSchema>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="capitalize">{fieldName}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={`Enter your ${fieldName}`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </form>
            </Form>
            <div className="self-end flex gap-4">
              <Button variant={'outline'} onClick={() => setOpen(false)}>cancel</Button>
              <Button type="submit" disabled={pending} onClick={form.handleSubmit(handleUpdateProfile)}>{pending ? "Updating..." : "Update"}</Button>
            </div>
            <div
              className="absolute text-xl right-2 top-3 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              X
            </div>
          </div>
        </div>
      }
    </div>
  )
}
