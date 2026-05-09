"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Shield, Bell, Trash2, Save } from 'lucide-react';
import { useAuth, useStudentProfile, useUpdateStudentProfile } from '@/app/hooks/api hooks/useAuth';
import { ProfileLayout } from '@/app/profile/ProfileLayout';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

import { PersonalInfoForm } from '@/components/profile compo/edit-profile/PersonalInfoForm';
import { SecurityForm } from '@/components/profile compo/edit-profile/SecurityForm';
import { DangerZone } from '@/components/profile compo/edit-profile/DangerZone';

export default function EditProfilePage() {
    const { data: user } = useAuth();
    const { data: student } = useStudentProfile(user?.id);
    const updateProfile = useUpdateStudentProfile();

    // Form state
    const [fullName, setFullName] = React.useState('');
    const [mobileNumber, setMobileNumber] = React.useState('');

    // Sync form with data
    React.useEffect(() => {
        if (student) {
            setFullName(student.fullName || '');
            setMobileNumber(student.mobileNumber || '');
        } else if (user) {
            setFullName(user.fullName || '');
        }
    }, [student, user]);

    const handleSave = async () => {
        if (!user?.id) return;

        toast.promise(
            updateProfile.mutateAsync({
                id: user.id,
                data: { fullName, mobileNumber }
            }),
            {
                loading: 'Updating profile...',
                success: 'Profile updated successfully!',
                error: 'Failed to update profile. Please try again.',
            }
        );
    };

    return (
        <ProfileLayout>
            <div className="space-y-8">
                <PersonalInfoForm
                    fullName={fullName}
                    setFullName={setFullName}
                    mobileNumber={mobileNumber}
                    setMobileNumber={setMobileNumber}
                    email={user?.email || ''}
                    isPending={updateProfile.isPending}
                    onSave={handleSave}
                />

                {/* <SecurityForm />

                <DangerZone /> */}
            </div>
        </ProfileLayout>
    );
}


