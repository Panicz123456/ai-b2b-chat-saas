import { UserNavbar } from "@/modules/dashboard/ui/components/user-navbar"
import { WorkspaceCreate } from "@/modules/dashboard/ui/components/workspace-create"
import { WorkspaceList } from "@/modules/dashboard/ui/components/workspace-list"

const Layout = ({ children }: { children: React.ReactNode}) => { 
  return (
    <div className="flex w-full h-screen">
      <div className="flex h-full w-16 flex-col items-center bg-secondary py-3 px-2 border-r border-border">
        <WorkspaceList />

        <div className="mt-4">
          <WorkspaceCreate />
        </div>

        <div className="mt-auto">
          <UserNavbar />
        </div>
      </div>
      {children}
    </div>
  )
}

export default Layout