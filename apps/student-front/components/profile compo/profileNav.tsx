"use client"
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, BookOpen, Award, CreditCard } from 'lucide-react';

const sidebarItems = [
    { name: "Overview", href: "/profile/your-profile", icon: LayoutDashboard },
    { name: "My Courses", href: "/profile/my-courses", icon: BookOpen },
    // { name: "Certificates", href: "/profile/certificates", icon: Award },
    // { name: "Payment History", href: "/profile/payments", icon: CreditCard },
];

export function ProfileNav() {
    const pathname = usePathname();

    return (
        <div className="lg:col-span-1 flex flex-row lg:flex-col gap-2 lg:sticky lg:top-[150px] h-fit z-20 bg-transparent p-2 lg:p-0 overflow-x-auto lg:overflow-x-visible no-scrollbar border-b border-gray-200 dark:border-gray-800 lg:border-none">
            <h3 className="hidden lg:block font-bold text-gray-900 dark:text-white mb-2 ml-2 uppercase tracking-wider text-sm">
                Dashboard
            </h3>
            <div className="flex flex-row lg:flex-col gap-2 min-w-max lg:min-w-0">
                {sidebarItems.map((item, idx) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link key={item.name} href={item.href} className="flex-1 lg:flex-none">
                            <motion.div
                                initial={{ opacity: 0, y: 10, x: -15 }}
                                animate={{ opacity: 1, y: 0, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`flex items-center justify-center lg:justify-start gap-2 lg:gap-3 px-4 lg:px-5 py-2.5 lg:py-3 rounded-xl lg:rounded-2xl font-medium transition-all cursor-pointer whitespace-nowrap ${isActive
                                    ? 'bg-blue-600 text-white dark:bg-blue-600 dark:text-white font-bold shadow-lg shadow-blue-500/25'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 bg-white/50 dark:bg-gray-900/50'
                                    }`}
                            >
                                <Icon className="w-4 h-4 lg:w-5 lg:h-5 shrink-0" strokeWidth={isActive ? 2.5 : 1.5} />
                                <span className="text-sm lg:text-base">{item.name}</span>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
