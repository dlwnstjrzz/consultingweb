"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Linkedin, Facebook, Youtube, Instagram, Twitter } from "lucide-react";

export default function MainLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Navbar styles based on route
  const headerClass = isHomePage 
    ? "fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent transition-all duration-300"
    : "sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100";
    
  // On homepage, we want white text. On others, dark text.
  const logoColorClass = isHomePage ? "text-white" : "text-primary";
  const mobileMenuBg = isHomePage ? "bg-black/90 backdrop-blur-xl" : "bg-white";

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className={headerClass}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2">
                 <img
                   src={isHomePage ? "/logo-light.png" : "http://fnsolution.co.kr/wp-content/uploads/2020/01/logo1.png"}
                   alt="FnSolution"
                   className="h-10 md:h-12 w-auto object-contain transition-all duration-300"
                 />
              </Link>
            </div>

            {/* Desktop Navigation - Duarte Style */}
            <nav className="hidden md:flex items-center space-x-12">
              <NavLink href="/company" label="About Us" title="COMPANY" isHomePage={isHomePage} />
              <div className={`h-10 w-px ${isHomePage ? 'bg-white/20' : 'bg-gray-200'}`}></div>
              
              {/* Consulting Dropdown */}
              <div 
                className="relative group h-full flex items-center"
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                <NavLink href="/service" label="Our Solutions" title="CONSULTING" isHomePage={isHomePage} />
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64 hidden group-hover:block">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2">
                    <Link href="/service?category=0" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                      <span className="block text-sm font-bold">SME Support</span>
                      <span className="block text-xs text-gray-500">Business Growth & Certs</span>
                    </Link>
                    <Link href="/service?category=1" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                      <span className="block text-sm font-bold">Corporate Finance</span>
                      <span className="block text-xs text-gray-500">Asset Management</span>
                    </Link>
                    <Link href="/service?category=2" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                      <span className="block text-sm font-bold">Private Wealth</span>
                      <span className="block text-xs text-gray-500">Personal Asset Management</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className={`h-10 w-px ${isHomePage ? 'bg-white/20' : 'bg-gray-200'}`}></div>
              <NavLink href="/news" label="Latest Updates" title="NEWS" isHomePage={isHomePage} />
              <div className={`h-10 w-px ${isHomePage ? 'bg-white/20' : 'bg-gray-200'}`}></div>
              <NavLink href="/contact" label="Get in Touch" title="CONTACT US" isHomePage={isHomePage} />
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className={`${isHomePage ? "text-white" : "text-gray-700"} hover:text-primary focus:outline-none`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden ${mobileMenuBg} border-b border-white/10 absolute w-full top-24 left-0`}>
            <div className="px-4 pt-4 pb-6 space-y-4">
              <MobileNavLink href="/company" onClick={toggleMenu} label="About Us">COMPANY</MobileNavLink>
              <div className="border-t border-gray-100/10 my-2"></div>
              <p className="text-xs text-gray-400 px-2 mb-2">CONSULTING</p>
              <div className="pl-4 space-y-2">
                <MobileNavLink href="/service?category=0" onClick={toggleMenu} label="SME Support">SME SUPPORT</MobileNavLink>
                <MobileNavLink href="/service?category=1" onClick={toggleMenu} label="Corporate Finance">CORPORATE FINANCE</MobileNavLink>
                <MobileNavLink href="/service?category=2" onClick={toggleMenu} label="Private Wealth">PRIVATE WEALTH</MobileNavLink>
              </div>
              <div className="border-t border-gray-100/10 my-2"></div>
              <MobileNavLink href="/news" onClick={toggleMenu} label="Latest Updates">NEWS</MobileNavLink>
              <MobileNavLink href="/contact" onClick={toggleMenu} label="Get in Touch">CONTACT US</MobileNavLink>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100 py-16 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Row: Brand & Socials */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-24 md:mb-32">
             {/* Logo */}
             <div>
               <h3 className="text-2xl font-bold tracking-tight uppercase">FnSolution</h3>
             </div>
             
             {/* Social & Util */}
             <div className="flex items-center gap-6 mt-6 md:mt-0 text-gray-900">
                <a href="#" className="hover:text-gray-500 transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="hover:text-gray-500 transition-colors"><Twitter size={20} /></a>
                <a href="#" className="hover:text-gray-500 transition-colors"><Facebook size={20} /></a>
                <a href="#" className="hover:text-gray-500 transition-colors"><Youtube size={20} /></a>
                <a href="#" className="hover:text-gray-500 transition-colors"><Instagram size={20} /></a>
             </div>
          </div>

          {/* Bottom Row: Navigation Links & Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pt-8">
             
             {/* Links */}
             <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-bold text-gray-900">
                <Link href="/contact" className="hover:text-gray-500 transition-colors">Contact us</Link>
                <Link href="#" className="hover:text-gray-500 transition-colors">Sustainability</Link>
                <Link href="#" className="hover:text-gray-500 transition-colors">Accessibility</Link>
                <Link href="#" className="hover:text-gray-500 transition-colors">Terms of use</Link>
                <Link href="#" className="hover:text-gray-500 transition-colors">Privacy</Link>
                <Link href="#" className="hover:text-gray-500 transition-colors">Modern Slavery Act Statement</Link>
                <Link href="#" className="hover:text-gray-500 transition-colors">Cookie Policy</Link>
                <Link href="#" className="hover:text-gray-500 transition-colors">Sitemap</Link>
                <Link href="#" className="hover:text-gray-500 transition-colors">Log In</Link>
             </div>

             {/* Copyright */}
             <div className="text-xs text-gray-500 font-medium">
                &copy; 1996-{new Date().getFullYear()} FnSolution Consulting, Inc.
             </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, label, title, isHomePage }) {
  // Determine colors based on homepage state
  const labelColor = isHomePage ? "text-gray-300" : "text-gray-500";
  const titleColor = isHomePage ? "text-white" : "text-gray-900";
  const hoverColor = isHomePage ? "group-hover:text-white" : "group-hover:text-accent";

  return (
    <Link 
      href={href} 
      className="group flex flex-col items-start"
    >
      <span className={`text-xs uppercase tracking-wide mb-0.5 font-medium ${labelColor} transition-colors`}>
        {label}
      </span>
      <span className={`text-xl font-bold tracking-tight ${titleColor} ${hoverColor} transition-colors`}>
        {title}
      </span>
    </Link>
  );
}

function MobileNavLink({ href, onClick, label, children }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="block py-2"
    >
      <span className="block text-xs text-gray-400 mb-1">{label}</span>
      <span className="block text-lg font-bold text-white hover:text-accent">
        {children}
      </span>
    </Link>
  );
}
