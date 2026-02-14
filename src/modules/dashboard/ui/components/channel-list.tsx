"use client"

import Link from "next/link"
import { HashIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSuspenseQuery } from "@tanstack/react-query"
import { orpc } from "@/lib/orpc"
import { useParams } from "next/navigation"



export const ChannelList = () => {
  const { data: { channels } } = useSuspenseQuery(orpc.channel.list.queryOptions())

  const {
    workspaceId,
    channelId
  } = useParams<{
    workspaceId: string,
    channelId: string
  }>()
  return (
    <div className="space-y-0.5 py-1">
      {channels.map((channel) => {
        const isActive = channel.id === channelId

        return (
          <Button
            asChild
            key={channel.id}
            variant="ghost"
            className={cn(
              "w-full justify-start px-2 py-1 h-7 text-muted-foreground hover:text-accent-foreground hover:bg-accent",
              isActive && "text-accent-foreground bg-accent"
            )}
          >
            <Link href={`/workspace/${workspaceId}/channel/${channel.id}`}>
              <HashIcon className="size-4" />
              <span className="truncate">
                {channel.name}
              </span>
            </Link>
          </Button>
        )
      })}
    </div>
  )
}