"use client";

import React from 'react';
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
import { CheckCircle, XCircle, Loader2, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function TeacherList() {
  const { data: teachers, isLoading, isError } = useTeachers();
  const { mutate: verifyTeacher, isPending: isUpdating } = useVerifyTeacher();

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
          {teachers?.map((teacher) => (
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
                <Button
                  variant={teacher.isActive ? "outline" : "default"}
                  size="sm"
                  onClick={() => verifyTeacher({ id: teacher.id, isActive: !teacher.isActive })}
                  disabled={isUpdating}
                  className={teacher.isActive ? "text-red-600 border-red-200 hover:bg-red-50" : "bg-primary hover:bg-primary/90"}
                >
                  {teacher.isActive ? "Restrict" : "Verify Teacher"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {teachers?.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                No teachers found in the system.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
