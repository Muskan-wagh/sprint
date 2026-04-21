'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/idea', label: 'Idea Generator' },
    { href: '/structure', label: 'Structure' },
    { href: '/pitch', label: 'Pitch' },
  ];

  return (
    <nav className="flex gap-2 p-4 border-b">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button variant={pathname === item.href ? 'default' : 'ghost'}>
            {item.label}
          </Button>
        </Link>
      ))}
    </nav>
  );
}