"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    BookOpen,
    Loader2,
    Users,
    Star,
    Search,
    ArrowLeft,
    LayoutGrid
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function ShowAllCoursesPage() {
    const router = useRouter();
    const [search, setSearch] = React.useState("");

    const { data: courses, isLoading } = useQuery({
        queryKey: ["all-courses"],
        queryFn: async () => {
            const response = await apiClient.get("/api/course");
            return response.data;
        },
    });

    const filteredCourses = React.useMemo(() => {
        if (!courses || !Array.isArray(courses)) return [];
        return courses.filter(c =>
            c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.teacher?.fullName?.toLowerCase().includes(search.toLowerCase())
        );
    }, [courses, search]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-muted-foreground font-bold">Loading system courses...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-6 space-y-8 max-w-7xl animate-in fade-in duration-500">
            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <Badge className="bg-primary/10 text-primary border-none font-bold uppercase tracking-widest text-[10px] px-3">
                            Platform Catalog
                        </Badge>
                    </div>
                    <h1 className="text-4xl font-black text-foreground flex items-center gap-3">
                        <LayoutGrid className="w-10 h-10 text-primary" />
                        System <span className="text-primary">Courses</span>
                    </h1>
                    <p className="text-muted-foreground font-medium mt-1">
                        Overview of all educational content published across Idensphere.
                    </p>
                </div>

                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by title or teacher..."
                        className="pl-10 h-12 rounded-2xl bg-muted/30 border-none shadow-sm focus-visible:ring-primary"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* ── Grid ── */}
            {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map((course) => (
                        <Card key={course.id} className="group overflow-hidden border-none shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all duration-500 rounded-[2rem] bg-card/50 backdrop-blur-sm">
                            <div className="h-48 overflow-hidden relative">
                                {course.thumbnail ? (
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                                        <BookOpen className="w-12 h-12 text-muted-foreground/20" />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <Badge className="bg-black/40 backdrop-blur-md text-white border-none font-bold">
                                        #{course.id}
                                    </Badge>
                                </div>
                            </div>

                            <CardHeader className="p-6 pb-2">
                                <CardTitle className="text-xl font-black line-clamp-1 group-hover:text-primary transition-colors">
                                    {course.title}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-2 font-bold text-primary mt-1">
                                    By {course.teacher?.fullName || "Unknown Instructor"}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="p-6 pt-2">
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-6 leading-relaxed">
                                    {course.description || "No description provided for this course catalog entry."}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                                            <Users className="w-4 h-4 text-primary/60" />
                                            {course.enrollmentCount || 0}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                                            <Star className="w-4 h-4 text-amber-500" />
                                            {course.rating || "0.0"}
                                        </div>
                                    </div>
                                    <Badge variant={course.isActive ? "default" : "outline"} className={`rounded-lg text-[10px] font-black uppercase ${course.isActive ? "bg-green-600" : ""}`}>
                                        {course.isActive ? "Published" : "Review"}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-32 text-center bg-muted/20 rounded-[3rem] border-2 border-dashed border-muted">
                    <BookOpen className="w-16 h-16 text-muted-foreground/30 mb-6" />
                    <h3 className="text-2xl font-black text-foreground">No matching courses</h3>
                    <p className="text-muted-foreground max-w-xs mt-2">
                        Try adjusting your search criteria or explore other categories.
                    </p>
                </div>
            )}
        </div>
    );
}
