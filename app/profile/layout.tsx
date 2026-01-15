import { ReactNode } from 'react';
import Sidebar from '../Dashboard-user/components/Sidebar';

export default function ProfileLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-[#F9FAFB] text-[#111827]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-4 md:p-8 mt-12 md:mt-0">
                    {children}
                </div>
            </main>
        </div>
    );
}
