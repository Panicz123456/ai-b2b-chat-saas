import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChannelList } from "@/modules/dashboard/ui/components/channel-list"
import { ChannelMembersList } from "@/modules/dashboard/ui/components/channel-member-list"
import { CreateNewChannel } from "@/modules/dashboard/ui/components/create-new-channel"
import { WorkspaceHeader } from "@/modules/dashboard/ui/components/workspace-header"
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex h-full w-80 flex-col bg-secondary border-r border-border">
        {/* Header */}
        <div className="flex items-center px-4 h-14 border-b border-border">
          <WorkspaceHeader />
        </div>
        <div className="px-4 py-2">
          <CreateNewChannel />
        </div>

        {/* Channel List */}
        <div className="flex-1 overflow-y-auto px-4">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-1 text-sm font-medium text-muted-foreground hover:text-accent-foreground">
              Main
              <ChevronDownIcon className="size-4 transition-transform duration-200" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ChannelList />
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Member List */}
        <div className="px-4 py-2 border-t border-border">
          <Collapsible defaultOpen>
            <CollapsibleTrigger
              className="flex w-full items-center justify-between px-2 py-1 text-sm font-medium text-muted-foreground hover:text-accent-foreground [&[data-state=open]>svg]:rotate-180"
            >
              Members
              <ChevronUpIcon className="size-4 transition-transform duration-200" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ChannelMembersList />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
      {children}
    </>
  )
}

export default Layout