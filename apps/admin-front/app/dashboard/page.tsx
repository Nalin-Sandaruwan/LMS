import { TeacherList } from "@/components/teachers/TeacherList"
import { Users, GraduationCap } from "lucide-react"

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-primary" />
          Educator Management
        </h2>
        <p className="text-muted-foreground font-medium">Verify and manage teacher access to the Idensphere platform.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Verification Desk</span>
          </div>
          <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
            Approve pending teachers to allow them to create and publish courses. Restricted accounts will lose access to their dashboard.
          </p>
        </div>
      </div>

      <TeacherList />
    </div>
  )
}
