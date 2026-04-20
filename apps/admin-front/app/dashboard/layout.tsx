"use client"

import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ShieldCheck } from "lucide-react"
import { AdminGuard } from "@/components/auth/AdminGuard"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Dynamic breadcrumb logic
  const isUsersPage = pathname.includes("/dashboard/users")
  const pageTitle = isUsersPage ? "User Management" : "Educator Verification"

  return (
    <AdminGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 transition-[width,height] ease-linear bg-background/95 backdrop-blur sticky top-0 z-50 font-bold">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block text-muted-foreground">
                    <BreadcrumbLink href="/dashboard" className="flex items-center gap-1 font-semibold">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      Admin Console
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-black text-foreground">{pageTitle}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          <main className="flex-1">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AdminGuard>
  )
}
