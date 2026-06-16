import React, { useState, useEffect } from "react";
import { KEY_ACTIONS, TESTIMONIALS, PARTNERS, GALLERY_ITEMS } from "../data";
import { ArrowRight, Heart, Users, Calendar, Award, Star, Quote, ChevronLeft, ChevronRight, Eye, Sparkles, MapPin, ZoomIn, X, Clock, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MainSectionsProps {
  onOpenDonate: () => void;
  onSelectAction: (id: string) => void;
  darkMode: boolean;
}

export default function MainSections({ onOpenDonate, onSelectAction, darkMode }: MainSectionsProps) {
  // Gallery states
  const [activeGalleryFilter, setActiveGalleryFilter] = useState<string>("Tous");
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

  // Testimonials Slider state
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Live ticking stats effect simulation
  const [stats, setStats] = useState({ members: 0, projects: 0, kids: 0, partners: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        members: 42,
        projects: 156,
        kids: 8500,
        partners: 14
      });
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const filteredGallery = GALLERY_ITEMS.filter((item) => {
    if (activeGalleryFilter === "Tous") return true;
    return item.category === activeGalleryFilter.toLowerCase();
  });

  const scrollSection = (id: string) => {
    const section = document.querySelector(id);
    if (section) {
      const headerOffset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-0">
      {/* SECTION HERO */}
      <section id="accueil" className="relative relative-h-screen min-h-[92vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Immersive background with original custom imagery */}
        <div className="absolute inset-x-0 inset-y-0 z-0">
          <img
            src="/src/assets/images/lions_club_hero_1781621140762.jpg"
            alt="Lions Club Majunga, Madagascar Hero Background"
            className="w-full h-full object-cover object-center transform scale-102 hover:scale-105 transition-transform duration-[12000ms] ease-out"
            referrerPolicy="no-referrer"
          />
          {/* Double-layer mask for high contrast text readability (WCAG Compliant) */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent z-10" />
          <div className="absolute inset-y-0 inset-x-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-left w-full">
          <div className="max-w-3xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-lions-gold/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-lions-gold/30 text-lions-gold"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-extrabold font-sans">Boeny - Madagascar</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-white leading-[1.08]"
            >
              Lions Club Majunga : <br />
              <span className="text-lions-gold">La Solidarité en Action</span> <br />
              dans le Boeny
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-200 font-sans leading-relaxed font-light"
            >
              <strong>"We Serve"</strong>. Plus qu'une simple devise internationale, un engagement de proximité quotidien au service de la santé, de l'éducation et de la nutrition à Mahajanga.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button
                onClick={onOpenDonate}
                className="px-8 py-4 bg-lions-gold hover:bg-lions-gold-hover text-slate-950 font-display font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl hover:shadow-lions-gold/25 hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-slate-950 stroke-none" />
                Faire un Don immédiat
              </button>
              <button
                onClick={() => scrollSection("#nos-actions")}
                className="px-8 py-4 border-2 border-white/80 hover:border-lions-gold text-white hover:text-lions-gold font-display font-bold text-xs uppercase tracking-widest rounded-xl transition-all backdrop-blur-xs flex items-center gap-2 cursor-pointer"
              >
                Découvrir nos Actions
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Floating background indicators for extra credit look without visual noise */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 animate-bounce md:block hidden">
          <span className="text-[10px] text-slate-400 font-display font-bold uppercase tracking-widest">Faire Défiler</span>
          <div className="w-5 h-8 border-2 border-slate-500 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-2 bg-lions-gold rounded-full" />
          </div>
        </div>
      </section>

      {/* SECTION MOT DU PRÉSIDENT */}
      <section id="qui-sommes-nous" className={`py-20 md:py-28 ${darkMode ? "bg-slate-900 border-y border-white/5" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Elegant President Image Layer */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden aspect-square md:aspect-[4/5] shadow-2xl group border-4 border-white dark:border-slate-800">
                <img
                  src="/src/assets/images/president_portrait_1781621158054.jpg"
                  alt="Eric Petitjean, Président du Lions Club Majunga"
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {/* Visual ornament stamp overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-6 text-white">
                  <span className="text-xs text-lions-gold font-display font-medium uppercase tracking-wider block">Bureau Exercice 2026 / 2027</span>
                  <strong className="text-xl font-display font-extrabold block">Eric Petitjean</strong>
                  <span className="text-xs text-slate-300">Président du Lions Club Majunga</span>
                </div>
              </div>

              {/* Decorative behind vector frame block */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-lions-gold rounded-tl-3xl -z-10" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-lions-blue rounded-br-3xl -z-10" />
            </div>

            {/* Statement detail content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs font-bold text-lions-blue dark:text-lions-gold uppercase tracking-widest block bg-lions-blue/5 dark:bg-white/5 px-3 py-1 rounded-full w-fit">
                Qui Sommes-Nous
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-slate-950 dark:text-white">
                Le mot du Président
              </h2>

              <div className="space-y-4 font-sans text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                <p className="text-lg text-slate-800 dark:text-slate-200 font-medium italic">
                  "Bienvenue au cœur de notre engagement."
                </p>
                <p>
                  Face aux défis de notre époque et à la précarité qui touche les plus démunis, l'impuissance n'est pas une fatalité. Au <strong>Lions Club Majunga</strong>, nous sommes animés par la conviction profonde que lorsque notre communauté de destin se rassemble, elle est capable de soulever des montagnes.
                </p>
                <p>
                  Que ce soit par des actions directes de santé pédiatrique d'urgence, de nutrition salvatrice au service de la petite enfance en bas âge, de distribution de fournitures scolaires pour encourager l'EPP ou d'écologie, notre club agit bénévolement au cœur du territoire du Boeny.
                </p>
                <p>
                  Chaque centime collecté lors de nos activités est entièrement reversé au profit de projets terrains d'envergure. Ensemble, écrivons les nouveaux chapitres du don d'espoir.
                </p>
              </div>

              {/* Signature block */}
              <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-black text-slate-800 dark:text-white uppercase leading-none">Eric Petitjean</h4>
                  <span className="text-xs text-slate-400 font-sans mt-0.5 block">Président, Lions Club Majunga (Distr. 417)</span>
                </div>
                {/* Quick contact / metadata badge */}
                <span className="px-3 py-1 border border-lions-gold/40 text-lions-gold rounded text-[10px] font-bold uppercase tracking-wider font-mono">
                  ★ Membre Lions Certifié
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION STATISTIQUES */}
      <section className={`py-16 border-y ${darkMode ? "bg-slate-950 border-white/5" : "bg-slate-50 border-slate-250/50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className={`p-6 border rounded-3xl flex flex-col items-center justify-center text-center transition-all ${
              darkMode ? "bg-slate-900 border-white/5" : "bg-white border-slate-200/80"
            }`}>
              <div className="w-10 h-10 rounded-lg bg-blue-105/50 font-black text-xl flex items-center justify-center text-lions-blue dark:text-lions-gold mb-3">
                <Users className="w-5 h-5 text-lions-blue dark:text-lions-gold" />
              </div>
              <strong className="block text-3xl sm:text-4xl font-display font-black text-lions-blue dark:text-lions-gold">{stats.members}+</strong>
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Membres Actifs</span>
            </div>

            <div className={`p-6 border rounded-3xl flex flex-col items-center justify-center text-center transition-all ${
              darkMode ? "bg-slate-900 border-white/5" : "bg-white border-slate-200/80"
            }`}>
              <div className="w-10 h-10 rounded-lg bg-yellow-105/50 font-black text-xl flex items-center justify-center text-lions-blue dark:text-lions-gold mb-3">
                <Calendar className="w-5 h-5 text-lions-blue dark:text-lions-gold" />
              </div>
              <strong className="block text-3xl sm:text-4xl font-display font-black text-lions-blue dark:text-lions-gold">{stats.projects}</strong>
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Projets Réalisés</span>
            </div>

            <div className={`p-6 border rounded-3xl flex flex-col items-center justify-center text-center transition-all ${
              darkMode ? "bg-slate-900 border-white/5" : "bg-white border-slate-200/80"
            }`}>
              <div className="w-10 h-10 rounded-lg bg-pink-105/50 font-black text-xl flex items-center justify-center text-lions-blue dark:text-lions-gold mb-3">
                <Heart className="w-5 h-5 text-lions-blue dark:text-lions-gold" />
              </div>
              <strong className="block text-3xl sm:text-4xl font-display font-black text-lions-blue dark:text-lions-gold">{stats.kids.toLocaleString("fr-FR")}+</strong>
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Enfants Aidés</span>
            </div>

            <div className={`p-6 border rounded-3xl flex flex-col items-center justify-center text-center transition-all ${
              darkMode ? "bg-slate-900 border-white/5" : "bg-white border-slate-200/80"
            }`}>
              <div className="w-10 h-10 rounded-lg bg-orange-105/50 font-black text-xl flex items-center justify-center text-lions-blue dark:text-lions-gold mb-3">
                <Award className="w-5 h-5 text-lions-blue dark:text-lions-gold" />
              </div>
              <strong className="block text-3xl sm:text-4xl font-display font-black text-lions-blue dark:text-lions-gold">{stats.partners}</strong>
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Partenaires Boeny</span>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION INTERACTIVE GALERIE */}
      <section id="galerie" className={`py-20 md:py-28 ${darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-800"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header elements */}
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold text-lions-blue dark:text-lions-gold uppercase tracking-widest bg-lions-blue/5 dark:bg-white/5 px-3 py-1 rounded-full">
              Galerie Photos
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white">
              Nos Actions En Images
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-sans">
              Plongez au cœur de nos déplacements humanitaires, galas de levée de fonds et ateliers d'éducation à travers le Boeny.
            </p>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-1.5 pt-4">
              {["Tous", "Santé", "Nutrition", "Éducation", "Événements", "Galas"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveGalleryFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeGalleryFilter === filter
                      ? "bg-lions-blue text-white shadow"
                      : darkMode
                        ? "bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredGallery.length > 0 ? (
              filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxImage({ url: item.image, title: item.title })}
                  className="group relative aspect-4/3 rounded-2xl overflow-hidden cursor-zoom-in bg-slate-900 shadow-md border border-slate-100 dark:border-white/5"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Hover dark overlay */}
                  <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white z-10 text-left">
                    <span className="text-[9px] text-lions-gold font-bold uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded w-fit mb-1.5">
                      {item.category}
                    </span>
                    <strong className="text-xs font-display font-medium leading-normal block">{item.title}</strong>
                    <span className="text-[10px] text-slate-300 mt-1 block font-mono">{item.date}</span>
                    <ZoomIn className="w-4 h-4 text-white/50 absolute right-4 top-4 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-slate-400 text-xs">
                Aucune image disponible pour cette catégorie dans le simulateur de galerie pour le moment.
              </div>
            )}
          </div>
        </div>

        {/* LIGHTBOX POPUP MODAL */}
        <AnimatePresence>
          {lightboxImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxImage(null)}
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-4xl w-full z-10 bg-slate-900 rounded-2xl overflow-hidden border border-white/15"
              >
                <div className="p-3 bg-slate-950/50 flex justify-between items-center text-white border-b border-white/5">
                  <span className="text-xs font-bold uppercase tracking-wider text-lions-gold">Aperçu Galerie Lions Club</span>
                  <button
                    onClick={() => setLightboxImage(null)}
                    className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="aspect-[4/3] bg-black max-h-[70vh] flex items-center justify-center">
                  <img
                    src={lightboxImage.url}
                    alt={lightboxImage.title}
                    className="max-w-full max-h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 bg-slate-950 text-white text-left">
                  <h4 className="font-display font-bold text-sm text-white">{lightboxImage.title}</h4>
                  <p className="text-xs text-slate-400 font-sans mt-1">Lions Club Majunga - Madagascar. Action Humanitaire terrain.</p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION TÉMOIGNAGES */}
      <section className={`py-20 overflow-hidden ${darkMode ? "bg-slate-900 border-t border-white/5" : "bg-white"}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-lions-blue dark:text-lions-gold uppercase tracking-widest bg-lions-blue/5 dark:bg-white/5 px-3 py-1 rounded-full">
              Témoignages
            </span>
            <h2 className="text-3xl font-display font-extrabold tracking-tight text-slate-905 dark:text-white">
              Ceux Que Nous Servons, Ceux Qui Servent
            </h2>
          </div>

          {/* Testimonial slider card */}
          <div className={`relative p-6 md:p-10 rounded-3xl ${darkMode ? "bg-slate-950 text-white border border-white/5" : "bg-slate-50 text-slate-800"} shadow-md`}>
            {/* Quote design anchor */}
            <Quote className="absolute right-8 top-8 w-16 h-16 text-lions-gold/10 pointer-events-none" />

            <div className="flex flex-col md:flex-row gap-8 items-center text-left">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden shrink-0 ring-4 ring-lions-gold/30">
                <img
                  src={TESTIMONIALS[activeTestimonial].avatar}
                  alt={TESTIMONIALS[activeTestimonial].name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm md:text-base font-sans italic leading-relaxed text-slate-600 dark:text-slate-350">
                  "{TESTIMONIALS[activeTestimonial].text}"
                </p>

                <div>
                  <strong className="block text-sm md:text-base font-display font-bold text-slate-800 dark:text-white">
                    {TESTIMONIALS[activeTestimonial].name}
                  </strong>
                  <span className="text-xs text-slate-400 font-sans">
                    {TESTIMONIALS[activeTestimonial].role}
                  </span>
                </div>
              </div>
            </div>

            {/* Slider arrows */}
            <div className="absolute bottom-4 right-4 flex gap-1 pt-4">
              <button
                onClick={handlePrevTestimonial}
                className="p-2 rounded-full border border-slate-200 hover:border-lions-blue hover:text-lions-blue dark:border-white/10 dark:hover:text-lions-gold dark:hover:border-lions-gold transition-colors block text-slate-400 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextTestimonial}
                className="p-2 rounded-full border border-slate-200 hover:border-lions-blue hover:text-lions-blue dark:border-white/10 dark:hover:text-lions-gold dark:hover:border-lions-gold transition-colors block text-slate-400 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION PARTENAIRES */}
      <section id="partenaires" className={`py-12 ${darkMode ? "bg-slate-950 border-t border-white/5" : "bg-slate-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center">
            <span className="text-[10px] text-slate-400 font-display font-semibold uppercase tracking-widest">
              Ils soutiennent nos actions citoyennes dans le Boeny
            </span>
          </div>

          <div className="relative overflow-hidden w-full py-4 bg-transparent max-w-5xl mx-auto">
            {/* Auto marquee container or flex strip layout with beautiful interactions */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 opacity-75">
              {PARTNERS.map((partner) => (
                <div
                  key={partner.id}
                  className="h-10 px-4 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-xl shadow-xs grayscale hover:grayscale-0 transition-all duration-300 group relative cursor-pointer"
                >
                  <span className="text-xs font-mono font-bold text-slate-450 group-hover:text-lions-blue dark:group-hover:text-lions-gold transition-colors">
                    {partner.name}
                  </span>
                  {/* Small tag under on hover */}
                  <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-slate-800 text-[8px] text-white py-0.5 px-1.5 rounded uppercase pointer-events-none">
                    {partner.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
