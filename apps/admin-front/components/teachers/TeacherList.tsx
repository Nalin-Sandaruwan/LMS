"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTeachers, useVerifyTeacher } from '@/hooks/useTeachers';
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
import { CheckCircle, XCircle, Loader2, User, Search, Filter } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

export function TeacherList() {
  const { data: teachers, isLoading, isError } = useTeachers();
  const { mutate: verifyTeacher, isPending: isUpdating } = useVerifyTeacher();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTeachers = useMemo(() => {
    if (!teachers) return [];
    return teachers.filter((teacher) => {
      const matchesSearch =
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.id.toString().includes(searchTerm);

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'verified' ? teacher.isActive : !teacher.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [teachers, searchTerm, statusFilter]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-muted-foreground font-medium">Fetching educators...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-20 text-center">
        <p className="text-red-500 font-bold">Failed to load teachers. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Filter Bar ── */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-2xl border shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by teacher email or ID..."
            className="pl-10 h-11 rounded-xl bg-muted/30 border-none focus-visible:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full md:w-auto">
          <TabsList className="grid grid-cols-3 w-full md:w-[300px] h-11">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[300px]">Teacher</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeachers.map((teacher) => (
              <TableRow key={teacher.id} className="group hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {teacher.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-sm">
                      <span className="font-bold text-foreground">Teacher ID: #{teacher.id}</span>
                      <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">{teacher.role}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{teacher.email}</TableCell>
                <TableCell>
                  {teacher.isActive ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800 gap-1 px-2 py-0.5">
                      <CheckCircle className="w-3.5 h-3.5" /> Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800 gap-1 px-2 py-0.5">
                      <XCircle className="w-3.5 h-3.5" /> Pending
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/dashboard/${teacher.id}`}>
                      <Button variant="ghost" size="sm" className="gap-1.5 font-bold">
                        View Profile
                      </Button>
                    </Link>
                    <Button
                      variant={teacher.isActive ? "outline" : "default"}
                      size="sm"
                      onClick={() => verifyTeacher({ id: teacher.id, isActive: !teacher.isActive })}
                      disabled={isUpdating}
                      className={teacher.isActive ? "text-red-600 border-red-200 hover:bg-red-50" : "bg-primary hover:bg-primary/90"}
                    >
                      {teacher.isActive ? "Restrict" : "Verify Teacher"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredTeachers.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                    <Filter className="w-8 h-8 opacity-20" />
                    <p className="font-bold">No teachers found</p>
                    <p className="text-xs">Try adjusting your verification filters or search criteria.</p>
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
