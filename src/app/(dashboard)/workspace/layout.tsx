import { orpc } from "@/lib/orpc"
import { getQueryClient, HydrateClient } from "@/lib/query/hydration"

import { UserNavbar } from "@/modules/dashboard/ui/components/user-navbar"
import { WorkspaceList } from "@/modules/dashboard/ui/components/workspace-list"
import { WorkspaceCreate } from "@/modules/dashboard/ui/components/workspace-create"

const Layout = async ({ children }: { children: React.ReactNode }) => { 
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(orpc.workspace.list.queryOptions())

  return (
    <div className="flex w-full h-screen">
      <div className="flex h-full w-16 flex-col items-center bg-secondary py-3 px-2 border-r border-border">
        <HydrateClient client={queryClient}>
          <WorkspaceList />
        </HydrateClient>
        <div className="mt-4">
          <WorkspaceCreate />
        </div>
        <div className="mt-auto">
          <HydrateClient client={queryClient}>
            <UserNavbar />
          </HydrateClient>
        </div>
      </div>
      {children}
    </div>
  )
}

export default Layout