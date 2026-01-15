import { ReactNode } from "react";
import UserSidebar from "./UserSidebar";


export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB] font-sans text-[#334155]">
            <UserSidebar ></UserSidebar> 
      <main className="flex-1 flex flex-col overflow-y-auto">{children}</main>
    </div>
  );
}
