import { redirect } from "next/navigation"

import { client } from "@/lib/orpc"
import { WorkspaceIdView } from "@/modules/dashboard/ui/views/workspace-id-view"

interface workspaceIdProps { 
  params: Promise<{ 
    workspaceId: string
  }>
}

const Page = async ({ params }: workspaceIdProps) => {
  const { workspaceId } = await params
  const { channels } = await client.channel.list()

  if (channels.length > 0) { 
    return redirect(`/workspace/${workspaceId}/channel/${channels[0].id}`)
  }
  
  return <WorkspaceIdView />
}

export default Page