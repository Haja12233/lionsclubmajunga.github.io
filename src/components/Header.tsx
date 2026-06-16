import React, { useState, useEffect } from "react";
import { Menu, X, Heart, Globe, Moon, Sun, Sparkles } from "lucide-react";

interface HeaderProps {
  onOpenDonate: () => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Header({ onOpenDonate, darkMode, setDarkMode }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<"fr" | "mg" | "en">("fr");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "Accueil", href: "#accueil" },
    { name: "Qui sommes-nous", href: "#qui-sommes-nous" },
    { name: "Nos Actions", href: "#nos-actions" },
    { name: "Actualités", href: "#actualites" },
    { name: "Galerie", href: "#galerie" },
    { name: "Partenaires", href: "#partenaires" },
    { name: "Rejoindre", href: "#rejoindre" },
    { name: "Contact", href: "#contact" }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-45 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? "bg-slate-950/95 border-b border-white/5 shadow-lg backdrop-blur-md"
            : "bg-white/95 border-b border-slate-100 shadow-lg backdrop-blur-md"
          : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Brand Layout */}
          <a
            href="#accueil"
            onClick={(e) => handleNavClick(e, "#accueil")}
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md p-1 border border-lions-blue/10">
              {/* Emblem Lions Logo */}
              <div className="w-full h-full bg-lions-blue rounded-full flex items-center justify-center text-lions-gold font-display font-extrabold text-[24px] select-none tracking-tighter">
                L
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lions-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-lions-gold"></span>
              </span>
            </div>
            <div>
              <span
                className={`font-display font-black leading-none block text-sm tracking-wide ${
                  scrolled
                    ? darkMode
                      ? "text-white"
                      : "text-lions-blue"
                    : "text-white"
                }`}
              >
                LIONS CLUB
              </span>
              <span className="font-display font-bold text-xs tracking-widest text-lions-gold uppercase block mt-0.5">
                MAJUNGA
              </span>
            </div>
          </a>

          {/* Desktop Navigation Link Cluster */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  scrolled
                    ? darkMode
                      ? "text-slate-350 hover:text-lions-gold hover:bg-white/5"
                      : "text-slate-700 hover:text-lions-blue hover:bg-slate-50"
                    : "text-slate-100 hover:text-lions-gold hover:bg-white/10"
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Utility Box (Lang, Toggle, Donate) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Lang Dropdown Select indicator */}
            <div className="relative flex items-center gap-1 group cursor-pointer">
              <Globe className={`w-3.5 h-3.5 ${scrolled ? (darkMode ? "text-slate-400" : "text-slate-500") : "text-slate-200"}`} />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as any)}
                className={`bg-transparent text-[11px] font-bold outline-none cursor-pointer border-none uppercase ${
                  scrolled
                    ? darkMode
                      ? "text-slate-300"
                      : "text-slate-700"
                    : "text-slate-100"
                }`}
              >
                <option value="fr" className="text-slate-800">FR</option>
                <option value="mg" className="text-slate-800">MG</option>
                <option value="en" className="text-slate-800">EN</option>
              </select>
            </div>

            {/* Dark Mode Theme toggle button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg hover:bg-white/10 transition-colors ${
                scrolled
                  ? darkMode
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  : "text-slate-200 hover:text-white"
              }`}
              title="Changer de thème"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Make a donation CTA button */}
            <button
              id="header-donate-btn"
              onClick={onOpenDonate}
              className="px-6 py-2 bg-lions-gold hover:bg-lions-gold-hover text-lions-blue font-display font-black uppercase text-xs tracking-wider rounded-full transition-all duration-200 cursor-pointer"
            >
              Faire un Don
            </button>
          </div>

          {/* Hamburguer Toggle for smaller screens */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${scrolled ? (darkMode ? "text-slate-400" : "text-slate-600") : "text-slate-200"}`}
            >
              {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors ${
                scrolled
                  ? darkMode
                    ? "text-slate-305 hover:bg-white/5"
                    : "text-slate-700 hover:bg-slate-100"
                  : "text-slate-200 hover:bg-white/10"
              }`}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation layout */}
      {isOpen && (
        <div
          className={`lg:hidden animate-fade-in border-t ${
            darkMode
              ? "bg-slate-950 border-white/5 text-white"
              : "bg-white border-slate-100 text-slate-800"
          }`}
        >
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider ${
                  darkMode ? "hover:bg-white/5" : "hover:bg-slate-100"
                }`}
              >
                {item.name}
              </a>
            ))}

            <div className="pt-4 border-t border-slate-100/10 flex flex-col gap-3">
              <div className="flex justify-between items-center px-4 py-1">
                <span className="text-xs font-bold text-slate-400">Langue</span>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value as any)}
                  className={`bg-slate-100/5 px-2 py-1 rounded text-xs select-none ${darkMode ? "text-white" : "text-slate-800"}`}
                >
                  <option value="fr" className="text-slate-800">Français</option>
                  <option value="mg" className="text-slate-800">Malgache</option>
                  <option value="en" className="text-slate-800">English</option>
                </select>
              </div>

              <button
                id="header-mobile-donate-btn"
                onClick={() => {
                  setIsOpen(false);
                  onOpenDonate();
                }}
                className="w-full py-2.5 bg-lions-gold text-lions-blue font-display font-black uppercase text-xs tracking-wider rounded-full text-center flex items-center justify-center cursor-pointer"
              >
                Faire un Don
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
