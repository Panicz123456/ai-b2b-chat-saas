"use client"

import { useQuery } from "@tanstack/react-query"

import { orpc } from "@/lib/orpc"
import { MessageItem } from "@/modules/dashboard/ui/components/message/message-item"
import { useParams } from "next/navigation"

export const ChannelMessageList = () => { 
  const {channelId} = useParams<{ channelId: string}>()
  const { data } = useQuery(orpc.message.list.queryOptions({ 
    input: { channelId }
  }))
  return (
    <div className="relative h-full">
      <div className="h-full overflow-y-auto px-4">
        {data?.map((message) => ( 
          <MessageItem
            key={message.id}
            message={message}
          />
        ))}
      </div>
    </div>
  )
}