import React, { useState } from "react";
import { NEWS_ARTICLES } from "../data";
import { Search, Filter, Calendar, User, ArrowRight, X, Sparkles, Send, CheckCircle, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NewsProps {
  darkMode: boolean;
}

export default function News({ darkMode }: NewsProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const categories = ["Tous", "Événement", "Nutrition", "Santé", "Environnement", "Éducation"];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterEmail("");
    }, 4000);
  };

  const filteredArticles = NEWS_ARTICLES.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      art.content.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeArticle = NEWS_ARTICLES.find((a) => a.id === activeArticleId);

  return (
    <section id="actualites" className={`py-20 md:py-28 ${darkMode ? "bg-slate-900 border-t border-white/5" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-100 dark:border-white/5 text-left">
          <div className="space-y-2">
            <span className="text-xs font-bold text-lions-blue dark:text-lions-gold uppercase tracking-widest bg-lions-blue/5 dark:bg-white/5 px-3 py-1 rounded-full w-fit block">
              Actualités Recentes
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-slate-950 dark:text-white">
              Échos du Terrain dans le Boeny
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg font-sans">
              Découvrez la vie du club, nos comptes-rendus d'actions pérennes et suivez l'avancée de nos chantiers solidaires.
            </p>
          </div>

          {/* Search bar & Filter */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 text-xs font-medium outline-none focus:border-lions-blue dark:focus:border-lions-gold"
              />
            </div>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap gap-1.5 justify-start border-b border-slate-100 dark:border-white/5 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-lions-gold text-slate-950 font-black shadow-xs"
                  : darkMode
                    ? "bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid (6 cards) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <div
                key={article.id}
                className={`rounded-2xl overflow-hidden border border-slate-100 dark:border-white/5 flex flex-col justify-between hover:shadow-xl hover:scale-[1.01] transition-all duration-300 group text-left ${
                  darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-800"
                }`}
              >
                {/* Photo Header */}
                <div className="aspect-[3/2] overflow-hidden bg-slate-900 relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute left-3 top-3 py-0.5 px-2 bg-lions-blue text-white text-[9px] font-bold uppercase rounded tracking-wider">
                    {article.category}
                  </span>
                </div>

                {/* News card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                      <span className="flex items-center gap-1 font-sans">
                        <Calendar className="w-3.5 h-3.5 text-lions-gold" />
                        {article.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-sans">
                        <User className="w-3.5 h-3.5" />
                        {article.author}
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-sm sm:text-base leading-snug group-hover:text-lions-blue dark:group-hover:text-lions-gold transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveArticleId(article.id)}
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-lions-blue dark:text-lions-gold uppercase tracking-wider group-hover:translate-x-1.5 transition-transform cursor-pointer"
                  >
                    Lire plus de détails <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 text-slate-400 text-xs font-sans">
              Aucun article d'actualité ne correspond aux critères de recherche actuels.
            </div>
          )}
        </div>

        {/* Dynamic Newsletter Subscription box (Blog accessory) */}
        <div className="max-w-4xl mx-auto pt-8">
          <div className="bg-gradient-to-br from-lions-blue to-lions-dark rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 shadow-xl overflow-hidden relative text-left">
            <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full filter blur-3xl" />

            <div className="space-y-2 max-w-md relative z-10">
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-white">Abonnez-vous à la Gazette Lions</h3>
              <p className="text-xs text-slate-350 leading-relaxed font-sans">
                Recevez directement dans votre boîte mail le récapitulatif mensuel de nos actions, appels aux dons et invitations caritatives à Majunga.
              </p>
            </div>

            <div className="w-full md:w-auto shrink-0 relative z-10">
              {!newsletterSuccess ? (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-80">
                  <input
                    type="email"
                    required
                    placeholder="Votre adresse email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-4 py-3 text-xs rounded-xl bg-white text-slate-800 outline-none placeholder-slate-400 shrink-0 font-sans"
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 bg-lions-gold hover:bg-lions-gold-hover text-slate-900 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    S'abonner
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/10 border border-white/20 px-5 py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-lions-gold" />
                  <span className="text-xs font-bold text-white font-sans">Inscription enregistrée ! Merci.</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* DETAILED NEWS MODAL READOUT */}
        <AnimatePresence>
          {activeArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveArticleId(null)}
                className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100 dark:border-white/5 flex flex-col max-h-[85vh] text-left text-slate-800 dark:text-white"
              >
                {/* Banner Photo */}
                <div className="h-44 sm:h-56 overflow-hidden relative shrink-0">
                  <img
                    src={activeArticle.image}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Close button */}
                  <button
                    onClick={() => setActiveArticleId(null)}
                    className="absolute right-4 top-4 p-1.5 rounded-full bg-slate-950/50 hover:bg-slate-950/85 text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>

                  <span className="absolute bottom-4 left-6 py-0.5 px-2 bg-lions-gold text-slate-950 text-[9px] font-black uppercase rounded tracking-wider">
                    {activeArticle.category}
                  </span>
                </div>

                {/* Body scroll */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  <div className="flex items-center gap-3 text-[10px] text-slate-405 font-mono border-b border-slate-100 dark:border-white/5 pb-3">
                    <span className="flex items-center gap-1 font-sans">
                      <Calendar className="w-3.5 h-3.5 text-lions-gold" />
                      {activeArticle.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-sans">
                      <User className="w-3.5 h-3.5" />
                      {activeArticle.author}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-905 dark:text-white leading-normal">
                    {activeArticle.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed whitespace-pre-line font-light">
                    {activeArticle.content}
                  </p>
                </div>

                {/* Footer panel */}
                <div className="p-4 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-950/30 flex justify-between items-center shrink-0">
                  <span className="text-[10px] text-slate-400 font-sans italic">Gazette officielle Lions Club Majunga</span>
                  <button
                    onClick={() => setActiveArticleId(null)}
                    className="px-4 py-2 bg-lions-blue dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Fermer la Gazette
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
