"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  AlertTriangle,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { signOut } from "aws-amplify/auth";
import { cn } from "@/lib/utils";
import { FaEyeSlash } from "react-icons/fa";

const menuItems = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Volunteers", href: "/volunteers", icon: Users },
  { name: "Blind Users", href: "/blind-users", icon: FaEyeSlash },
  { name: "Reports", href: "/reports", icon: AlertTriangle },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0f172a] text-white flex flex-col h-screen sticky top-0 shadow-xl z-50">
      <div className="p-6 border-b border-gray-800 flex items-center gap-2">
        <ShieldCheck className="text-emerald-400" size={28} />
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            SeeForMe
          </h1>
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            Admin Panel
          </p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <Icon
                size={20}
                className={cn(
                  isActive
                    ? "text-white"
                    : "text-gray-500 group-hover:text-white"
                )}
              />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
