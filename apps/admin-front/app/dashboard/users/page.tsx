import { UserList } from "@/components/users/UserList"
import { Users, UserCog } from "lucide-react"

export default function UserManagementPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <UserCog className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tight text-foreground">
              User Accounts
            </h2>
            <p className="text-muted-foreground font-medium">Control platform access for all user roles across the ecosystem.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-6 shadow-sm flex items-start gap-4">
          <div className="p-2 bg-blue-500/10 rounded-xl">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">Access Control</span>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              Deactivating a user will immediately block their access to profile features across Idensphere.
            </p>
          </div>
        </div>
      </div>

      <UserList />
    </div>
  )
}
