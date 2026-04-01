import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface SignupSuccessProps {
    fullName: string;
}

export function SignupSuccess({ fullName }: SignupSuccessProps) {
    const router = useRouter();

    return (
        <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-center space-y-6"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto w-20 h-20 rounded-3xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #074C00, #42A341)" }}
            >
                <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>

            <div className="space-y-2">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white">You're in! 🎉</h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
                    Welcome, <span className="font-bold text-gray-900 dark:text-white">{fullName}</span>!
                    Your instructor account has been created.
                </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4 text-left space-y-2">
                {["Account verified & ready to go", "Create your first course for free", "Students worldwide can enroll"].map((t) => (
                    <p key={t} className="text-sm text-green-700 dark:text-green-400 flex items-center gap-2 font-medium">
                        <CheckCircle2 className="w-4 h-4 shrink-0" /> {t}
                    </p>
                ))}
            </div>

            <div className="flex flex-col gap-3">
                <Button
                    className="w-full h-12 rounded-2xl font-bold"
                    style={{ background: "linear-gradient(135deg, #074C00, #42A341)" }}
                    onClick={() => router.push("/your-courses")}
                >
                    Go to My Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                    variant="outline"
                    className="w-full h-12 rounded-2xl font-bold"
                    onClick={() => router.push("/profile")}
                >
                    Complete My Profile
                </Button>
            </div>
        </motion.div>
    );
}
