import Link from 'next/link'
import Image from 'next/image'

import { ModeToggle } from '@/components/mode-toggle'

export const Navbar = () => {
  return (
    <nav className="w-full h-16 border-b hidden md:flex items-center justify-between px-4 z-50 dark:border-neutral-600 dark:bg-neutral-950">
      <Link href="/" className="flex items-center justify-center gap-x-2">
        <Image width={36} height={36} src="/logo.png" alt="Logo" />
        <p className="text-xl font-bold hidden sm:block">Translate</p>
      </Link>
      <ModeToggle />
    </nav>
  )
}
