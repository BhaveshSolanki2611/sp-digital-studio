'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUSINESS_INFO, NAV_LINKS } from '@/lib/constants'
import { Button } from '@/components/ui'

const servicesDropdown = [
  { href: '/services#wedding', label: 'Wedding Photography' },
  { href: '/services#pre-wedding', label: 'Pre-Wedding Shoots' },
  { href: '/services#product', label: 'Product Photography' },
  { href: '/services#events', label: 'Events & Parties' },
  { href: '/equipment-rental', label: 'Equipment Rental' },
  { href: '/instant-services', label: 'Instant Prints' },
  { href: '/restoration', label: 'Photo Restoration' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      {/* Top bar with contact info */}
      <div className="hidden bg-primary text-white py-2 lg:block">
        <div className="container-custom flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a 
              href={`tel:${BUSINESS_INFO.phonesRaw[0]}`}
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4" />
              {BUSINESS_INFO.phones[0]}
            </a>
            <span className="text-white/40">|</span>
            <a 
              href={`tel:${BUSINESS_INFO.phonesRaw[1]}`}
              className="hover:text-accent transition-colors"
            >
              {BUSINESS_INFO.phones[1]}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/70">{BUSINESS_INFO.tagline}</span>
            <span className="text-white/40">|</span>
            <span className="text-accent font-medium">Est. {BUSINESS_INFO.foundedYear}</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2' 
            : 'bg-white py-4'
        )}
      >
        <div className="container-custom flex items-center justify-between">
{/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-12 w-auto relative">
              <Image
                src="https://res.cloudinary.com/dgqrgff7r/image/upload/v1770521630/new_tab_logo_sp_lagrhh.png"
                alt="SP Digital Studio Logo"
                width={48}
                height={48}
                className="object-contain h-12 w-auto"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-primary text-lg leading-tight group-hover:text-accent transition-colors">
                SP Digital Studio
              </h1>
              <p className="text-xs text-muted">&amp; Color Lab</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              link.label === 'Services' ? (
                <div 
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      pathname === link.href
                        ? 'text-accent bg-accent/10'
                        : 'text-foreground hover:text-accent hover:bg-gray-100'
                    )}
                  >
                    {link.label}
                    <ChevronDown className={cn(
                      'w-4 h-4 transition-transform duration-200',
                      isServicesOpen && 'rotate-180'
                    )} />
                  </Link>
                  
                  {/* Dropdown */}
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                      >
                        {servicesDropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-foreground hover:bg-accent/10 hover:text-accent transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    pathname === link.href
                      ? 'text-accent bg-accent/10'
                      : 'text-foreground hover:text-accent hover:bg-gray-100',
                    link.label === 'Book Now' && 'hidden'
                  )}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a 
              href={`tel:${BUSINESS_INFO.phonesRaw[0]}`}
              className="flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">Call Now</span>
            </a>
            <Button asChild>
              <Link href="/booking">Book a Shoot</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
{/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-auto">
                      <Image
                        src="https://res.cloudinary.com/dgqrgff7r/image/upload/v1770521630/new_tab_logo_sp_lagrhh.png"
                        alt="SP Digital Studio Logo"
                        width={40}
                        height={40}
                        className="object-contain h-10 w-auto"
                      />
                    </div>
                    <div>
                      <h2 className="font-bold text-primary">SP Digital Studio</h2>
                      <p className="text-xs text-muted">&amp; Color Lab</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="space-y-1 mb-8">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'block px-4 py-3 rounded-lg font-medium transition-colors',
                        pathname === link.href
                          ? 'text-accent bg-accent/10'
                          : 'text-foreground hover:bg-gray-100'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Quick Links */}
                <div className="border-t border-gray-100 pt-6 mb-6">
                  <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
                    Quick Services
                  </h3>
                  <div className="space-y-1">
                    {servicesDropdown.slice(0, 4).map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-muted hover:text-accent transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="border-t border-gray-100 pt-6 space-y-4">
                  <a
                    href={`tel:${BUSINESS_INFO.phonesRaw[0]}`}
                    className="flex items-center gap-3 p-4 rounded-lg bg-primary text-white"
                  >
                    <Phone className="w-5 h-5" />
                    <div>
                      <p className="text-xs text-white/70">Call us now</p>
                      <p className="font-semibold">{BUSINESS_INFO.phones[0]}</p>
                    </div>
                  </a>
                  <Button className="w-full" asChild>
                    <Link href="/booking">Book a Shoot</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
