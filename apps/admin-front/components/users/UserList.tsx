"use client";

import React from 'react';
import { useUsers, useUpdateUserStatus } from '@/hooks/useUsers';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Loader2, Shield, User as UserIcon, GraduationCap } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function UserList() {
  const { data: users, isLoading, isError } = useUsers();
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateUserStatus();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-muted-foreground font-medium">Crunching user data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-20 text-center">
        <p className="text-red-500 font-bold">Failed to load platform users. Please check your connection.</p>
      </div>
    );
  }

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return <Shield className="w-3 h-3 text-red-500" />;
      case 'teacher': return <GraduationCap className="w-3 h-3 text-blue-500" />;
      default: return <UserIcon className="w-3 h-3 text-gray-500" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'border-red-200 text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      case 'teacher': return 'border-blue-200 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'border-gray-200 text-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="w-[300px]">User Account</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Account Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id} className="group hover:bg-muted/20 transition-colors">
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border border-border shadow-sm">
                    <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 font-black">
                      {user.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-sm">
                    <span className="font-bold text-foreground">User ID: #{user.id}</span>
                    <span className="text-muted-foreground font-medium truncate max-w-[200px]">{user.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={`gap-1 px-2 py-0.5 font-bold uppercase tracking-tight text-[10px] ${getRoleBadgeColor(user.role)}`}>
                  {getRoleIcon(user.role)}
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                {user.isActive ? (
                  <div className="flex items-center gap-1.5 text-green-600 dark:text-green-500 font-bold text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Active</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-amber-500 dark:text-amber-400 font-bold text-sm">
                    <XCircle className="w-4 h-4" />
                    <span>Deactivated</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateStatus({ id: user.id, isActive: !user.isActive })}
                  disabled={isUpdating || user.role === 'admin'} // Typically don't allow deactivating admins from here
                  className={`font-black rounded-lg transition-all ${user.isActive 
                    ? "text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" 
                    : "text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"}`}
                >
                  {user.isActive ? "Deactivate" : "Activate User"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {users?.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="h-32 text-center text-muted-foreground font-medium">
                No users were found in the system database.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
