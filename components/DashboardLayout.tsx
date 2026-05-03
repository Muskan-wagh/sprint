"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Lightbulb,
  GitBranch,
  MessageSquare,
  Plus,
  Settings,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/idea", label: "Ideas", icon: Lightbulb },
  { href: "/structure", label: "Structure", icon: GitBranch },
  { href: "/pitch", label: "Pitch", icon: MessageSquare },
];

const bottomItems = [
  { href: "#", label: "New Project", icon: Plus },
  { href: "#", label: "Settings", icon: Settings },
  { href: "#", label: "Help", icon: HelpCircle },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar - hidden on mobile */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 z-40 flex flex-col">
        {/* Logo */}
        <div className="h-20 px-6 flex items-center border-b border-gray-100">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
              <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">
              Structify
            </span>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">
            Main Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="px-4 py-4 border-t border-gray-100 space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all"
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm rotate-45" />
          </div>
          <span className="text-lg font-bold text-gray-900">Structify</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 -mr-2 text-gray-600"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="md:hidden fixed right-0 top-0 bottom-0 w-64 bg-white z-50 flex flex-col animate-fade-in">
            <div className="h-16 px-4 flex items-center justify-between border-b border-gray-100">
              <span className="text-lg font-bold text-gray-900">Menu</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 -mr-2 text-gray-600"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="px-4 py-4 border-t border-gray-100 space-y-1">
              {bottomItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all"
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </aside>
        </>
      )}

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 z-40 flex items-center justify-around px-2">
        {navItems.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isActive ? "text-primary" : "text-gray-500"
              }`}
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}
      </nav>

      {/* Main Content - with responsive margin */}
      <main className="md:ml-64 min-h-screen pt-12 md:pt-0 pb-20 md:pb-0">
        <div className="p-3 md:p-8">{children}</div>
      </main>
    </div>
  );
}
