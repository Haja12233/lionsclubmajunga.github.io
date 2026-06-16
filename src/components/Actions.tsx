import React, { useState } from "react";
import { KEY_ACTIONS } from "../data";
import { HeartPulse, Baby, GraduationCap, Coins, ArrowRight, X, Heart, Shield, Sparkles, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ActionsProps {
  onOpenDonate: () => void;
  selectedActionId: string | null;
  resetSelectedAction: () => void;
  onSelectAction: (id: string) => void;
  darkMode: boolean;
}

export default function Actions({ onOpenDonate, selectedActionId, resetSelectedAction, onSelectAction, darkMode }: ActionsProps) {
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);

  // Helper map for icons
  const iconMap = {
    HeartPulse: <HeartPulse className="w-6 h-6 text-red-500" />,
    Baby: <Baby className="w-6 h-6 text-amber-500" />,
    GraduationCap: <GraduationCap className="w-6 h-6 text-blue-500" />,
    Coins: <Coins className="w-6 h-6 text-yellow-500" />
  };

  const getIcon = (name: string) => {
    return iconMap[name as keyof typeof iconMap] || <Shield className="w-6 h-6 text-yellow-500" />;
  };

  const activeAction = KEY_ACTIONS.find((a) => a.id === (activeStoryId || selectedActionId));

  const handleOpenStory = (id: string) => {
    setActiveStoryId(id);
    onSelectAction(id);
  };

  const handleCloseStory = () => {
    setActiveStoryId(null);
    resetSelectedAction();
  };

  return (
    <section id="nos-actions" className={`py-20 md:py-28 ${darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-800"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-lions-blue dark:text-lions-gold uppercase tracking-widest bg-lions-blue/5 dark:bg-white/5 px-3 py-1 rounded-full">
            Nos Actions Phares
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-slate-905 dark:text-white">
            Rendre l'Espoir Possible
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">
            Grâce à nos bénévoles dévoués et au soutien inestimable de nos donateurs, le Lions Club Majunga déploie quatre pôles d'aide d'urgence prioritaires.
          </p>
        </div>

        {/* Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {KEY_ACTIONS.map((action) => (
            <div
              key={action.id}
              className={`rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border flex flex-col justify-between group h-full ${
                darkMode
                  ? "bg-slate-900 border-white/5 hover:border-lions-gold/30 text-white"
                  : "bg-white border-slate-100 hover:border-slate-200 text-slate-850"
              }`}
            >
              {/* Card Image Cover with zoom effect */}
              <div className="aspect-video relative overflow-hidden bg-slate-900">
                <img
                  src={action.image}
                  alt={action.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute left-3 top-3 px-2 py-0.5 bg-slate-900/80 backdrop-blur text-[10px] text-white rounded font-bold font-sans uppercase">
                  {action.tag}
                </span>
              </div>

              {/* Card body content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-left">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-white/5">
                      {getIcon(action.impactIcon)}
                    </div>
                    <span className="text-[10px] font-mono text-lions-blue dark:text-lions-gold font-bold">{action.stats}</span>
                  </div>
                  <h3 className="font-display font-extrabold text-base leading-tight group-hover:text-lions-blue dark:group-hover:text-lions-gold transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                    {action.description}
                  </p>
                </div>

                <button
                  type="button"
                  id={`btn-open-story-${action.id}`}
                  onClick={() => handleOpenStory(action.id)}
                  className="w-full py-2.5 border border-slate-200 dark:border-white/10 hover:bg-lions-blue hover:text-white dark:hover:bg-lions-gold dark:hover:text-slate-950 font-display font-bold text-[10px] tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  Découvrir l'Histoire <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA Trigger button below cards */}
        <div className="text-center pt-2">
          <button
            onClick={() => handleOpenStory("action-sante")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-lions-blue dark:hover:border-lions-gold text-slate-700 dark:text-slate-200 font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer hover:shadow-md"
          >
            Voir et soutenir l'Impact Humanitaire
            <ArrowRight className="w-4 h-4 text-lions-blue dark:text-lions-gold" />
          </button>
        </div>

        {/* STORY POPOVER MODAL DETAIL PANEL (e.g. story of little Soafaly) */}
        <AnimatePresence>
          {activeAction && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay background */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseStory}
                className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm"
              />

              {/* Story visual card panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100 dark:border-white/5 flex flex-col max-h-[85vh] text-left"
              >
                {/* Banner header image */}
                <div className="relative h-48 sm:h-64 overflow-hidden shrink-0">
                  <img
                    src={activeAction.image}
                    alt={activeAction.title}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Close modal cross */}
                  <button
                    onClick={handleCloseStory}
                    className="absolute right-4 top-4 p-1.5 rounded-full bg-slate-950/50 hover:bg-slate-950/80 text-white cursor-pointer transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-5 left-6 text-white max-w-lg space-y-1">
                    <span className="text-[10px] text-lions-gold uppercase tracking-widest font-bold">
                      Impact Réel Lions Club Majunga
                    </span>
                    <h3 className="font-display font-extrabold text-lg sm:text-xl text-white">
                      {activeAction.title}
                    </h3>
                  </div>
                </div>

                {/* scroll body content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-55 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 text-slate-800 dark:text-white">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-lions-blue/10 dark:bg-white/10 rounded-lg">
                        {getIcon(activeAction.impactIcon)}
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 dark:text-slate-350 block leading-none font-sans uppercase font-bold">Inscrit au Bilan Réalisé</span>
                        <strong className="text-xs sm:text-sm font-sans font-extrabold text-lions-blue dark:text-lions-gold">
                          {activeAction.stats}
                        </strong>
                      </div>
                    </div>

                    <div className="flex gap-1.5 items-center bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/40 px-3 py-1.5 rounded-lg">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                      <span className="text-[10px] font-bold text-green-700 dark:text-green-400 uppercase tracking-widest font-sans">Action Certifiée</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase font-display tracking-widest">Le Compte-Rendu :</h4>
                    <p className="text-slate-600 dark:text-slate-300 font-sans text-xs md:text-sm leading-relaxed whitespace-pre-line">
                      {activeAction.fullStory}
                    </p>
                  </div>

                  <div className="bg-amber-50 dark:bg-slate-950 p-4 rounded-xl border border-amber-100 dark:border-white/5 space-y-2">
                    <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1 text-amber-800 dark:text-lions-gold">
                      <Sparkles className="w-3.5 h-3.5" /> Devenez acteur de cette belle histoire !
                    </h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      100% de votre don à destination de cette catégorie finance de façon rigoureuse sans frais intermédiaires l'achat de bouillies Nutri'zaza, des soins chirurgicaux cliniques, ou des manuels scolaires à Majunga.
                    </p>
                  </div>
                </div>

                {/* Footer action */}
                <div className="p-5 border-t border-slate-100 dark:border-white/5 flex gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={handleCloseStory}
                    className="flex-1 py-3 border border-slate-200 dark:border-white/10 text-slate-650 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl text-xs font-bold transition-all text-center"
                  >
                    Fermer l'onglet
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleCloseStory();
                      onOpenDonate();
                    }}
                    className="flex-1 py-3 bg-lions-blue dark:bg-lions-gold text-white dark:text-slate-950 rounded-xl text-xs font-extrabold transition-all text-center shadow-md hover:opacity-90 flex items-center justify-center gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" /> Faire un Don ciblé
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
