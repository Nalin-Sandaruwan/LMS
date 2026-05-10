"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  Mail, 
  Calendar, 
  Activity, 
  Lock, 
  Globe,
  Bell,
  Fingerprint
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function AdminProfilePage() {
  // Static admin data for now (could be fetched from an auth hook later)
  const adminInfo = {
    name: "Admin User",
    email: "admin@idensphere.com",
    role: "Super Admin",
    joined: "January 2026",
    status: "Active",
    permissions: ["Full Access", "User Management", "Content Moderation", "System Logs"]
  };

  return (
    <div className="container mx-auto py-10 space-y-8 max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-primary/10 via-transparent to-transparent p-10 rounded-[2.5rem] border border-primary/5 shadow-2xl shadow-primary/5">
        <Avatar className="h-40 w-40 border-8 border-background shadow-2xl ring-4 ring-primary/10">
          <AvatarFallback className="text-5xl font-black bg-primary text-primary-foreground">
            AD
          </AvatarFallback>
        </Avatar>

        <div className="space-y-4 text-center md:text-left flex-1">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <h1 className="text-4xl font-black tracking-tight text-foreground">{adminInfo.name}</h1>
              <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none font-black uppercase text-[10px] tracking-widest px-3 py-1">
                {adminInfo.role}
              </Badge>
            </div>
            <p className="text-muted-foreground font-medium flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-4 h-4" />
              {adminInfo.email}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {adminInfo.permissions.map((perm) => (
              <Badge key={perm} variant="outline" className="rounded-xl px-3 py-1 font-bold text-xs bg-card/50 backdrop-blur-sm border-primary/10">
                {perm}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-3xl border-none shadow-xl shadow-primary/5 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Member Since
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-black">{adminInfo.joined}</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none shadow-xl shadow-primary/5 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-500" />
              Current Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-black text-green-600">{adminInfo.status}</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none shadow-xl shadow-primary/5 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              Security Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-black">Level 10</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-[2rem] border-none shadow-2xl shadow-primary/5 overflow-hidden">
          <CardHeader className="bg-muted/30 p-8">
            <CardTitle className="flex items-center gap-3 text-xl font-black">
              <Lock className="w-6 h-6 text-primary" />
              Security Settings
            </CardTitle>
            <CardDescription className="font-medium">Manage your administrative security protocols.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <SecurityItem 
              icon={Fingerprint} 
              title="Two-Factor Authentication" 
              desc="Currently enabled via Authenticator App" 
              status="active" 
            />
            <Separator className="opacity-50" />
            <SecurityItem 
              icon={Globe} 
              title="IP Whitelisting" 
              desc="Restricted to office and VPN ranges" 
              status="active" 
            />
            <Separator className="opacity-50" />
            <SecurityItem 
              icon={Bell} 
              title="Login Notifications" 
              desc="Alerts sent for new device logins" 
              status="active" 
            />
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-none shadow-2xl shadow-primary/5 bg-gradient-to-br from-primary/5 to-transparent flex flex-col justify-center p-12 text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="relative z-10 space-y-6">
            <div className="w-20 h-20 bg-primary/20 rounded-[2rem] flex items-center justify-center mx-auto ring-8 ring-primary/5">
              <ShieldCheck className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-black mb-2">System Integrity</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Your account holds super-administrator privileges. Ensure you follow platform security guidelines when performing sensitive operations.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function SecurityItem({ icon: Icon, title, desc, status }: { icon: any, title: string, desc: string, status: 'active' | 'inactive' }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-muted rounded-2xl">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h4 className="font-black text-sm">{title}</h4>
          <p className="text-xs text-muted-foreground font-medium">{desc}</p>
        </div>
      </div>
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none rounded-lg px-2 font-black uppercase text-[9px]">
        {status}
      </Badge>
    </div>
  );
}
