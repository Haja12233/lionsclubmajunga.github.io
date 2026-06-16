import React from "react";
import { MapPin, Phone, Mail, Award, ArrowUp, Facebook, Eye, Shield, MessageSquare } from "lucide-react";

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  const [showLegal, setShowLegal] = React.useState(false);
  
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
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
    <footer
      className={`border-t ${
        darkMode
          ? "bg-slate-950 text-white border-white/5"
          : "bg-slate-900 text-slate-100 border-slate-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-slate-800">
          
          {/* Logo Brand columns */}
          <div className="md:col-span-4 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 font-display font-black text-xl border">
                L
              </div>
              <div>
                <span className="font-display font-black block tracking-wider text-sm text-white">LIONS CLUB</span>
                <span className="font-display font-bold text-xs tracking-widest text-lions-gold uppercase">MAJUNGA (D.417)</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Nous sommes les forces humanitaires bénévoles réunies pour subvenir aux besoins oculaires, scolaires et de nutrition des populations du Boeny à Madagascar.
            </p>

            <div className="flex gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-800 hover:bg-lions-gold hover:text-slate-900 rounded-lg text-slate-350 transition-colors"
                title="Suivez actualités Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <div className="p-2 bg-slate-800 rounded-lg text-slate-355 flex items-center gap-1.5 text-[10px] font-bold font-mono">
                <Award className="w-3.5 h-3.5 text-lions-gold" /> REG. 11
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3 text-left">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-lions-gold">Liens Utiles</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-sans">
              <li>
                <a href="#qui-sommes-nous" onClick={(e) => handleNavClick(e, "#qui-sommes-nous")} className="hover:text-lions-gold transition-colors block">
                  Qui sommes-nous ?
                </a>
              </li>
              <li>
                <a href="#nos-actions" onClick={(e) => handleNavClick(e, "#nos-actions")} className="hover:text-lions-gold transition-colors block">
                  Nos Actions de Secours
                </a>
              </li>
              <li>
                <a href="#actualites" onClick={(e) => handleNavClick(e, "#actualites")} className="hover:text-lions-gold transition-colors block">
                  Actualités et Bilans
                </a>
              </li>
              <li>
                <a href="#galerie" onClick={(e) => handleNavClick(e, "#galerie")} className="hover:text-lions-gold transition-colors block">
                  Galerie Médias
                </a>
              </li>
              <li>
                <a href="#rejoindre" onClick={(e) => handleNavClick(e, "#rejoindre")} className="hover:text-lions-gold transition-colors block">
                  Nous Rejoindre
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div id="contact" className="md:col-span-5 space-y-3 text-left">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-lions-gold">L'Hôtel du Club & Secrétariat</h4>
            <div className="space-y-3 text-xs text-slate-450 font-sans">
              
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-lions-gold shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Avenue de la République</strong>, face place du Baobab historique,<br />
                  Mahajanga (Majunga), Boeny 401, Madagascar
                </p>
              </div>

              <div className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-lions-gold shrink-0" />
                <p className="font-mono">
                  +261 (0) 34 11 456 78 (MVola) / +261 (0) 20 62 224 45
                </p>
              </div>

              <div className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-lions-gold shrink-0" />
                <p>
                  contact@lionsclubmajunga.org / sec.lionsclubmajunga@gmail.com
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Metadata copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 font-sans text-center">
          <div className="space-y-1">
            <p>© 2026 Lions Club Majunga - Tous droits réservés.</p>
            <p className="text-slate-600 text-[10px]">
              Distributeur officiel agréé de la bouillie Nutri'zaza pour les EPP de Mahajanga. Lions Club International Distr. 417.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setShowLegal(!showLegal);
              }}
              className="hover:text-lions-gold transition-colors font-semibold cursor-pointer"
            >
              Mentions Légales et RGPD
            </button>
            
            <button
              id="scroll-top-btn"
              onClick={handleScrollTop}
              className="p-2.5 bg-slate-800 hover:bg-lions-gold hover:text-slate-900 rounded-xl transition-all text-white hover:scale-[1.05]"
              title="Retourner en haut"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showLegal && (
          <div className="mt-6 p-4 rounded-xl border border-dashed border-slate-700 bg-slate-800/80 text-slate-300 text-left relative flex items-start justify-between gap-4 animate-fade-in">
            <div className="space-y-1 text-xs">
              <strong className="text-white block font-display">Protection des données & Charte Éthique :</strong>
              <p className="font-sans font-light leading-relaxed">
                Notre plateforme numérique respecte scrupuleusement les exigences de transparence WCAG AA. Les formulaires de candidature spontanée ainsi que les simulations de dons USSD et bancaires n'enregistrent aucun mot de passe ou secret bancaire réel — toutes les transmissions du simulateur s'effectuent de bout en bout de façon chiffrée, éthique et sécurisée pour garantir la confidentialité absolue.
              </p>
            </div>
            <button
              onClick={() => setShowLegal(false)}
              className="text-white hover:text-lions-gold font-bold px-2 py-1 rounded border border-white/20 hover:border-lions-gold text-[10px] uppercase tracking-wider shrink-0"
            >
              Fermer
            </button>
          </div>
        )}

      </div>
    </footer>
  );
}
