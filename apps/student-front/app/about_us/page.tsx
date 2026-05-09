"use client"
import * as React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: "Active Learners", value: "2.5M+" },
  { label: "Courses Published", value: "3,400+" },
  { label: "Expert Instructors", value: "850+" },
  { label: "Countries Reached", value: "190+" },
];

const team = [
  { name: "Sarah Connor", role: "CEO & Founder", image: "bg-blue-500", initials: "SC" },
  { name: "Michael Chang", role: "Head of Engineering", image: "bg-purple-500", initials: "MC" },
  { name: "Elena Rodriguez", role: "VP of Education", image: "bg-green-500", initials: "ER" },
  { name: "David Kim", role: "Lead Designer", image: "bg-pink-500", initials: "DK" },
];

export default function AboutUsPage() {
  return (
    <>
      <main className="grow pt-32 pb-24">
        {/* Glow Effects */}
        <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] -z-10" />
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] -z-10" />

        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-6 mb-24 lg:mb-32">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
            >
                <p className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-sm mb-4">Our Mission</p>
                <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
                    Empowering the world through <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">accessible education.</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                    We believe that everyone, everywhere, deserves access to world-class learning. TechLMS was founded to bridge the gap between ambitious individuals and the skills they need to succeed in the modern economy.
                </p>
            </motion.div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 md:px-6 mb-24 pt-12 pb-12 border-y border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map((stat, idx) => (
                    <motion.div 
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                    >
                        <h3 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2">{stat.value}</h3>
                        <p className="text-md font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* The Story Section */}
        <section className="container mx-auto px-4 md:px-6 mb-32">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:w-1/2 relative"
                >
                    {/* Placeholder for an office/story image */}
                    <div className="w-full aspect-square md:aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl relative flex items-center justify-center">
                        <svg className="w-24 h-24 text-blue-300 dark:text-blue-800/50" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
                        </svg>
                        {/* Decorative glass card */}
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-white/40 dark:bg-gray-950/40 backdrop-blur-xl border border-white/50 dark:border-gray-800 rounded-3xl shadow-2xl hidden md:block" />
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:w-1/2 space-y-8"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                        Our Story
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        What started in a small college dorm room in 2020 has quickly grown into a global movement. We realized that traditional education simply wasn't keeping up with the rapid pace of technological innovation. 
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        We decided to build a platform that strips away the fluff. A place where industry veterans can directly pass down their practical, battle-tested knowledge to the next generation of builders, designers, and creators without the massive overhead of a university degree.
                    </p>
                    <div className="pt-4">
                        <p className="font-semibold text-gray-900 dark:text-white text-lg border-l-4 border-blue-500 pl-4 py-1 italic">
                            "Education is the most powerful weapon which you can use to change the world."
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>

        {/* Meet the Team */}
        <section className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                    Meet the Team
                </motion.h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    The passionate educators and engineers dedicated to building the ultimate learning experience.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, idx) => (
                    <motion.div 
                        key={member.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15 }}
                        whileHover={{ y: -10 }}
                        className="bg-white dark:bg-gray-900 rounded-3xl p-8 text-center shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all"
                    >
                        {/* Placeholder Avatar */}
                        <div className={`w-32 h-32 mx-auto rounded-full bg-linear-to-tl shadow-inner mb-6 flex items-center justify-center ${member.image} text-white font-black text-3xl`}>
                            {member.initials}
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h4>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{member.role}</p>
                    </motion.div>
                ))}
            </div>
        </section>

      </main>
    </>
  );
}
