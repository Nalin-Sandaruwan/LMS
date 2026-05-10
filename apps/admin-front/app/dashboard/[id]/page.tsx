"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useTeacherProfile, useTeacherCourses } from "@/hooks/useTeachers";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  GraduationCap, 
  Mail, 
  BookOpen, 
  Loader2, 
  Users, 
  Star,
  Globe,
  Calendar,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";

interface Course {
  id: string | number;
  title: string;
  thumbnail?: string;
  description?: string;
  enrollmentCount?: number;
  rating?: number;
  isActive?: boolean;
}

export default function TeacherProfilePage() {
  const params = useParams();
  const router = useRouter();
  const teacherId = parseInt(params.id as string, 10);

  const { data: profile, isLoading: profileLoading, isError: profileError } = useTeacherProfile(teacherId);
  const { data: courses, isLoading: coursesLoading } = useTeacherCourses(teacherId);

  if (profileLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-muted-foreground font-bold animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (profileError || !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
        <div className="bg-red-50 p-6 rounded-full dark:bg-red-900/20">
          <XCircle className="w-16 h-16 text-red-500" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-foreground mb-2">Teacher Not Found</h2>
          <p className="text-muted-foreground max-w-md">We couldn&apos;t find the educator you&apos;re looking for. They may have been removed or the ID is incorrect.</p>
        </div>
        <Button onClick={() => router.back()} className="rounded-xl px-8 font-bold">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-10 py-6 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* ── Top Header ── */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={() => router.back()} 
          className="group hover:bg-muted/50 rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Button>
        <Badge variant={profile.isActive ? "default" : "outline"} className={`px-4 py-1.5 rounded-full font-black uppercase text-[10px] tracking-widest ${profile.isActive ? "bg-green-600 hover:bg-green-700" : "bg-amber-100 text-amber-800 border-amber-200"}`}>
          {profile.isActive ? "Active Account" : "Pending Verification"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* ── Left Column: Profile Card ── */}
        <aside className="lg:col-span-4 space-y-6">
          <Card className="overflow-hidden border-none shadow-2xl shadow-primary/5 bg-gradient-to-b from-card to-muted/10 rounded-3xl">
            <CardContent className="p-0">
              <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
              <div className="px-8 pb-10 -mt-16 text-center">
                <Avatar className="h-32 w-32 mx-auto border-8 border-background shadow-xl ring-2 ring-primary/20">
                  <AvatarFallback className="text-4xl font-black bg-primary/10 text-primary uppercase">
                    {profile.email.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <h1 className="mt-6 text-2xl font-black text-foreground">
                  {profile.fullName || "Unnamed Teacher"}
                </h1>
                <p className="text-primary font-bold flex items-center justify-center gap-1.5 mt-1">
                  <GraduationCap className="w-4 h-4" />
                  {profile.teachingExpert || "New Educator"}
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/40 hover:bg-muted/60 transition-colors">
                    <div className="p-2 bg-background rounded-xl shadow-sm">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Email Address</p>
                      <p className="text-sm font-bold truncate max-w-[180px]">{profile.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/40 hover:bg-muted/60 transition-colors">
                    <div className="p-2 bg-background rounded-xl shadow-sm">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Internal ID</p>
                      <p className="text-sm font-bold"># {profile.id}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-8 opacity-40" />

                <div className="text-left">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-3 px-1">Professional Bio</h3>
                  <div className="p-5 rounded-2xl bg-muted/30 border border-border/50">
                    <p className="text-sm leading-relaxed text-muted-foreground italic">
                      &quot;{profile.shortBio || "This teacher hasn&apos;t added a biography yet."}&quot;
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* ── Right Column: Content ── */}
        <main className="lg:col-span-8 space-y-8">
          
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatSmall icon={BookOpen} label="Courses" value={Array.isArray(courses) ? courses.length : 0} />
            <StatSmall icon={Users} label="Total Students" value="--" />
            <StatSmall icon={Star} label="Avg Rating" value="--" />
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-foreground flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" />
                Published Courses
              </h2>
              {Array.isArray(courses) && courses.length > 0 && (
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-bold">
                  {courses.length} items
                </Badge>
              )}
            </div>

            {coursesLoading ? (
              <div className="space-y-4">
                {[1, 2].map(i => <div key={i} className="h-32 bg-muted/40 rounded-3xl animate-pulse" />)}
              </div>
            ) : Array.isArray(courses) && courses.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {courses.map((course: Course) => (
                  <Card key={course.id} className="group overflow-hidden border-border/40 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 rounded-3xl">
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="w-full md:w-56 h-40 md:h-auto overflow-hidden relative">
                        {course.thumbnail ? (
                          <img 
                            src={course.thumbnail} 
                            alt={course.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <BookOpen className="w-10 h-10 text-muted-foreground/30" />
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-black/60 backdrop-blur-md text-white border-none font-bold">
                            #{course.id}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardHeader className="flex-1 p-6">
                        <div className="flex flex-col h-full justify-between gap-4">
                          <div>
                            <CardTitle className="text-xl font-black mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                              {course.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-2 leading-relaxed">
                              {course.description || "No description available for this course."}
                            </CardDescription>
                          </div>

                          <div className="flex items-center gap-6 mt-auto">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                              <Users className="w-4 h-4 text-primary/60" />
                              {course.enrollmentCount || 0} Enrolled
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                              <Star className="w-4 h-4 text-amber-500" />
                              {course.rating || "N/A"}
                            </div>
                            <Badge variant={course.isActive ? "outline" : "secondary"} className="ml-auto rounded-lg text-[10px] font-black uppercase tracking-tight">
                              {course.isActive ? "Published" : "Draft"}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed border-2 bg-muted/20 rounded-3xl py-20">
                <CardContent className="flex flex-col items-center justify-center text-center">
                  <div className="p-6 bg-muted rounded-full mb-6">
                    <BookOpen className="w-12 h-12 text-muted-foreground/40" />
                  </div>
                  <h3 className="text-xl font-black text-foreground mb-2">No Courses Yet</h3>
                  <p className="text-muted-foreground max-w-xs">
                    This educator hasn&apos;t published any courses to the platform at this time.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function StatSmall({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) {
  return (
    <Card className="border-none shadow-sm bg-card/50 rounded-2xl">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="p-2.5 bg-primary/10 rounded-xl">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">{label}</p>
          <p className="text-lg font-black">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
