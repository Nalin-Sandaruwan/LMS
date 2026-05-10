"use client";

import React, { useState, useMemo } from 'react';
import { useUsers, useUpdateUserStatus, useDeleteUser } from '@/hooks/useUsers';
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
import { 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Shield, 
  User as UserIcon, 
  GraduationCap, 
  Trash2, 
  Clock,
  Search,
  Filter
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function UserList() {
  const { data: users, isLoading, isError } = useUsers();
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateUserStatus();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter((user) => {
      const matchesSearch = 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toString().includes(searchTerm);
      
      const matchesRole = 
        roleFilter === 'all' || 
        user.role.toLowerCase() === roleFilter.toLowerCase();

      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

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

  const formatLastActive = (dateString?: string) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* ── Filters Bar ── */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-2xl border shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by email or ID..." 
            className="pl-10 h-11 rounded-xl bg-muted/30 border-none focus-visible:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs value={roleFilter} onValueChange={setRoleFilter} className="w-full md:w-auto">
          <TabsList className="grid grid-cols-3 w-full md:w-[300px] h-11">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="teacher">Teachers</TabsTrigger>
            <TabsTrigger value="user">Students</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-[300px]">User Account</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Account Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
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
                  <div className="flex items-center gap-1.5 text-muted-foreground font-medium text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatLastActive(user.lastLogin)}</span>
                  </div>
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
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateStatus({ id: user.id, isActive: !user.isActive })}
                      disabled={isUpdating || isDeleting || user.role === 'admin'}
                      className={`font-black rounded-lg transition-all ${user.isActive
                        ? "text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                        : "text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"}`}
                    >
                      {user.isActive ? "Deactivate" : "Activate User"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to permanently delete user #${user.id}? This will remove all their data from LMS and Auth services.`)) {
                          deleteUser(user.id);
                        }
                      }}
                      disabled={isUpdating || isDeleting || user.role === 'admin'}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg h-8 w-8"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                    <Filter className="w-8 h-8 opacity-20" />
                    <p className="font-bold">No matching users found</p>
                    <p className="text-xs">Try adjusting your search or filter criteria</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
