"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SignedIn, UserButton, SignedOut} from '@clerk/nextjs'
import { navLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

export const MobileNav = () => {
  const pathname = usePathname();
  return (
    <header className='header'>
      <Link href='/' className='flex items-center gap-2 md:py-2'>
        <Image src={"public/assets/images/logo-text.svg"}
         alt='logo' 
         width={180}
         height={28}/>
      </Link>
      <nav className='flex gap-2'>
        <SignedIn>
          <UserButton afterSignOutUrl='/' />
          <Sheet>
            <SheetTrigger>
              <Image src={"public/assets/icons/menu.svg"}
              alt='logo'
              width={32}
              height={32}
              className='curor-pointer'/>
            </SheetTrigger>
            <SheetContent className='sheet-content sm:w-64'>
              <>
              <Image
              src={"public/assets/images/logo-text.svg"}
              alt='logo'
              width={152}
              height={23}/>
              </>
              <ul className='header-nav_elements'>
                {navLinks.map((link)=>
                {
                  const isActive = link.route === pathname
                  return(
                    <li key = {link.route} className={`${isActive && 'gradient-text'} p-18 flex whitespace-nowrap text-dark-700`}>
                      <Link  className="sidebar-link cursor-pointer" href={link.route}>
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </SheetContent>
          </Sheet>
        </SignedIn>
        <SignedOut>
            <Button asChild className='button bg-purple-gradient bg-cover'>
              <Link href={'/sign-in'}>Login</Link>
            </Button>
        </SignedOut>
      </nav>
    </header>
  )
}
