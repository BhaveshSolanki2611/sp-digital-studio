'use client'

import Link from 'next/link'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  Youtube,
  Clock,
  Heart,
  Github,
  Linkedin,
  Globe,
  Code2
} from 'lucide-react'
import { BUSINESS_INFO, FOOTER_LINKS, STATS } from '@/lib/constants'
import { Input } from '@/components/ui'
import { Button } from '@/components/ui'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-white font-bold text-lg">
                SP
              </div>
              <div>
                <h2 className="font-bold text-lg">SP Digital Studio</h2>
                <p className="text-sm text-white/60">& Color Lab</p>
              </div>
            </Link>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">
              {BUSINESS_INFO.tagline}. Professional photography and videography 
              services for weddings, events, products, and more.
            </p>
            <div className="flex items-center gap-4 text-accent font-semibold">
              <span className="text-3xl">{STATS.yearsInBusiness}+</span>
              <span className="text-sm text-white/60 leading-tight">
                Years of<br />Excellence
              </span>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-white/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-white/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/about"
                  className="text-white/70 hover:text-accent transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact"
                  className="text-white/70 hover:text-accent transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Us</h3>
            <div className="space-y-4 mb-6">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-white/70 text-sm leading-relaxed">
                  {BUSINESS_INFO.address.full}
                </p>
              </div>
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <div className="text-sm">
                  <a 
                    href={`tel:${BUSINESS_INFO.phonesRaw[0]}`}
                    className="text-white/70 hover:text-white transition-colors block"
                  >
                    {BUSINESS_INFO.phones[0]}
                  </a>
                  <a 
                    href={`tel:${BUSINESS_INFO.phonesRaw[1]}`}
                    className="text-white/70 hover:text-white transition-colors block"
                  >
                    {BUSINESS_INFO.phones[1]}
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a 
                  href={`mailto:${BUSINESS_INFO.emails[0]}`}
                  className="text-white/70 hover:text-white transition-colors text-sm break-all"
                >
                  {BUSINESS_INFO.emails[0]}
                </a>
              </div>
              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-accent shrink-0" />
                <div className="text-sm text-white/70">
                  <p>Mon - Sat: {BUSINESS_INFO.hours.weekdays}</p>
                  <p>Sunday: {BUSINESS_INFO.hours.sunday}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href={BUSINESS_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={BUSINESS_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={BUSINESS_INFO.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={BUSINESS_INFO.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-10 border-t border-white/10">
          <div className="max-w-xl">
            <h3 className="font-semibold text-lg mb-2">Stay Updated</h3>
            <p className="text-white/70 text-sm mb-4">
              Subscribe to receive updates on offers, tips, and photography inspiration.
            </p>
            <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent"
                />
              </div>
              <Button type="submit">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-white/50 mt-3">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p>© {currentYear} {BUSINESS_INFO.name}. All rights reserved.</p>
            <span className="hidden md:inline">|</span>
            <p className="flex items-center gap-1">
              Established {BUSINESS_INFO.foundedYear} by <span className="text-accent">{BUSINESS_INFO.founder}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Developer Credit - Highlighted */}
      <div className="border-t-2 border-accent/30 bg-gradient-to-r from-primary via-primary-dark to-primary">
        <div className="container-custom py-6">
          <div className="bg-gradient-to-r from-accent/10 via-secondary/10 to-accent/10 rounded-xl p-5 border border-accent/20 shadow-lg shadow-accent/5">
            <div className="flex flex-col md:flex-row items-center justify-center gap-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center shadow-lg">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <span className="text-white/80 text-sm">Website Developed by</span>
                  <a 
                    href="https://portfolio-website-qt9y.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-lg font-bold bg-gradient-to-r from-accent via-yellow-400 to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                  >
                    Bhavesh Solanki
                  </a>
                </div>
              </div>
              
              <div className="h-8 w-px bg-white/20 hidden md:block" />
              
              <div className="flex items-center gap-4">
                <a
                  href="https://portfolio-website-qt9y.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-accent transition-all duration-300 hover:scale-105"
                  title="View Portfolio"
                >
                  <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span className="text-sm font-medium">Portfolio</span>
                </a>
                <a
                  href="https://github.com/BhaveshSolanki2611"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#333] transition-all duration-300 hover:scale-110"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </a>
                <a
                  href="https://www.linkedin.com/in/bhavesh-solanki-475628248"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0077b5] transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </a>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10 text-center">
              <p className="text-sm text-white/70">
                Need a <span className="text-accent font-semibold">full-stack web application</span> for your business?
              </p>
              <a 
                href="https://portfolio-website-qt9y.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 px-6 py-2 bg-gradient-to-r from-accent to-secondary text-white font-semibold rounded-full hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 hover:scale-105"
              >
                <Mail className="w-4 h-4" />
                Hire Me / Collaborate
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
