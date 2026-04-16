"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import { Award, Code, Palette, Globe, Layers } from 'lucide-react';

export function SkillMastery() {
    const skills = [
        { name: 'Web Development', level: 'Intermediate', mastery: 65, icon: <Code className="w-4 h-4" /> },
        { name: 'UI/UX Design', level: 'Expert', mastery: 90, icon: <Palette className="w-4 h-4" /> },
        { name: 'React Architecture', level: 'Advanced', mastery: 82, icon: <Layers className="w-4 h-4" /> },
        { name: 'Fullstack Systems', level: 'Novice', mastery: 30, icon: <Globe className="w-4 h-4" /> },
    ];

    return (
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-sm h-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-500" />
                        Skill Mastery
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Your expertise across domains</p>
                </div>
            </div>

            <div className="space-y-6">
                {skills.map((skill, idx) => (
                    <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center group">
                            <div className="flex items-center gap-2">
                                <span className="p-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-500 group-hover:text-purple-500 transition-colors">
                                    {skill.icon}
                                </span>
                                <span className="font-bold text-gray-800 dark:text-gray-200">{skill.name}</span>
                            </div>
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                                skill.level === 'Expert' 
                                ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400' 
                                : skill.level === 'Advanced' 
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
                                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                            }`}>
                                {skill.level}
                            </span>
                        </div>
                        <div className="relative w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.mastery}%` }}
                                transition={{ duration: 1.2, delay: idx * 0.15, ease: "easeOut" }}
                                className={`h-full rounded-full ${
                                    skill.mastery > 80 
                                    ? 'bg-purple-500' 
                                    : skill.mastery > 50 
                                    ? 'bg-blue-500' 
                                    : 'bg-gray-400 dark:bg-gray-600'
                                }`}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-8 py-3 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-purple-500 dark:text-gray-400 hover:dark:text-purple-400 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl transition-all hover:border-purple-500/50">
                View All Skills
            </button>
        </div>
    );
}
