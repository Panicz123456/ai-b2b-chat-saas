"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { CreateChannelForm, CreateChannelFormType, transformChannelName } from "@/modules/dashboard/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

export const CreateNewChannel = () => {
  const [open, onOpenChange] = useState(false)
  const form = useForm<CreateChannelFormType>({ 
    resolver: zodResolver(CreateChannelForm),
    defaultValues: { 
      name: ""
    }
  })

  const onSubmit = (values: CreateChannelFormType) => { 
    console.log(values)
  }

  const watchedName = form.watch("name");
  const transformedName = watchedName ? transformChannelName(watchedName) : ""

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant='outline' className="w-full">
          <PlusIcon className="size-4" />
          Add channel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Create new channel
          </DialogTitle>
          <DialogDescription>
            Create a new channel to get started
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => ( 
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Channel" {...field} />
                  </FormControl>
                  {transformedName && transformedName !== watchedName && ( 
                    <p className="text-sm text-muted-foreground">
                      Will be created as: <code className="bg-muted px-1 py-0.5 rounded text-sm">{transformedName}</code>
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">
              Create new Channel
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}