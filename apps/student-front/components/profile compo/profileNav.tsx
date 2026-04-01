"use client"
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, BookOpen, Award, CreditCard } from 'lucide-react';

const sidebarItems = [
    { name: "Overview", href: "/profile/your-profile", icon: LayoutDashboard },
    { name: "My Courses", href: "/profile/my-courses", icon: BookOpen },
    { name: "Certificates", href: "/profile/certificates", icon: Award },
    { name: "Payment History", href: "/profile/payments", icon: CreditCard },
];

export function ProfileNav() {
    const pathname = usePathname();

    return (
        <div className="lg:col-span-1 flex flex-col gap-2">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2 ml-2 uppercase tracking-wider text-sm">
                Dashboard
            </h3>
            {sidebarItems.map((item, idx) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                    <Link key={item.name} href={item.href}>
                        <motion.div
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`flex items-center gap-3 px-5 py-3 rounded-2xl font-medium transition-colors cursor-pointer ${
                                isActive
                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold border border-blue-100 dark:border-blue-900/50'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                        >
                            <Icon className="w-5 h-5 shrink-0" strokeWidth={isActive ? 2.5 : 1.5} />
                            {item.name}
                        </motion.div>
                    </Link>
                );
            })}
        </div>
    );
}