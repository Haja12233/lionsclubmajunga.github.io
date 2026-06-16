import React, { useState } from "react";
import { Send, CheckCircle, FileText, Share2, Clipboard, Sparkles, User, Mail, Phone, Briefcase, Heart, Award } from "lucide-react";
import { motion } from "motion/react";

export default function JoinForm() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    phone: "",
    profession: "",
    motivation: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [candidateId, setCandidateId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nom || !formData.prenom || !formData.email || !formData.phone || !formData.motivation) {
      setError("Veuillez remplir tous les champs obligatoires (*).");
      return;
    }

    // Generate a unique application reference
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const code = `LCM-2026-${formData.nom.substring(0, 3).toUpperCase()}-${randomNum}`;
    setCandidateId(code);
    setError(null);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      phone: "",
      profession: "",
      motivation: "",
    });
    setError(null);
    setSubmitted(false);
  };

  const advantages = [
    {
      title: "Épanouissement par le Service",
      desc: "Mettre concrètement vos compétences et votre énergie au service des plus humbles du Boeny."
    },
    {
      title: "Réseau Local & International",
      desc: "Faire partie du 1er réseau de clubs services mondial (1,4M de membres) pour collaborer intelligemment."
    },
    {
      title: "Corde Éthique & Amitié chaleureuse",
      desc: "Forger des liens fraternels solides à travers des partages enthousiastes et des aventures vécues."
    },
    {
      title: "Développement du Leadership",
      desc: "Prendre la tête d'opérations caritatives d'envergure, de la logistique scolaire aux galas d'élite."
    }
  ];

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 grid md:grid-cols-5">
      {/* Advantages view (left side) */}
      <div className="md:col-span-2 bg-gradient-to-br from-lions-blue to-lions-dark text-white p-8 md:p-10 flex flex-col justify-between">
        <div className="space-y-6">
          <span className="inline-block px-3 py-1 bg-white/10 text-lions-gold text-xs font-bold uppercase tracking-widest rounded-full">
            Être Graine d'Impact
          </span>
          <h3 className="font-display font-extrabold text-2xl md:text-3xl leading-tight text-white">
            Pourquoi intégrer le Lions Club Majunga ?
          </h3>
          <p className="text-sm text-slate-200 font-sans leading-relaxed">
            Nous sommes des hommes et des femmes déterminés à agir là où le besoin se fait sentir. Rejoindre notre club, c'est participer à des chantiers d'entraide historiques.
          </p>

          <div className="space-y-5 pt-4">
            {advantages.map((adv, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <span className="w-6 h-6 bg-lions-gold/20 text-lions-gold rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </span>
                <div>
                  <h4 className="font-bold text-slate-100 text-sm font-sans">{adv.title}</h4>
                  <p className="text-xs text-slate-300 font-sans mt-0.5">{adv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-xs text-slate-300 md:block hidden">
          🌟 Slogan mondial : <strong>“We Serve”</strong> (Nous Servons). Chaque adhésion qualifiée nous permet de démultiplier notre bras solidaire.
        </div>
      </div>

      {/* Form or Confirmation view (right side) */}
      <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center bg-slate-50/30">
        {!submitted ? (
          <div>
            <div className="mb-6">
              <h3 className="font-display font-bold text-xl md:text-2xl text-slate-800">Candidature Spontanée</h3>
              <p className="text-slate-500 text-xs font-sans mt-1">
                Remplissez vos coordonnées pour postuler. Votre dossier sera analysé par la commission des effectifs sous 48h.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 border border-red-100 text-xs font-bold flex justify-between items-center animate-pulse">
                <span>{error}</span>
                <button type="button" onClick={() => setError(null)} className="font-mono text-[9px] hover:underline uppercase">Fermer</button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <label className="block text-slate-600 text-[10px] uppercase font-bold tracking-wider mb-1">Nom *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      name="nom"
                      required
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Ex: Raveloson"
                      className="w-full pl-9 pr-3 py-2 text-xs font-semibold bg-white rounded-xl border border-slate-200 outline-none focus:border-lions-blue focus:ring-1 focus:ring-lions-blue"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-600 text-[10px] uppercase font-bold tracking-wider mb-1">Prénom *</label>
                  <input
                    type="text"
                    name="prenom"
                    required
                    value={formData.prenom}
                    onChange={handleChange}
                    placeholder="Ex: Sitraka"
                    className="w-full px-3 py-2 text-xs font-semibold bg-white rounded-xl border border-slate-200 outline-none focus:border-lions-blue focus:ring-1 focus:ring-lions-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 text-[10px] uppercase font-bold tracking-wider mb-1">Email de contact *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="sitraka@mail.com"
                      className="w-full pl-9 pr-3 py-2 text-xs font-semibold bg-white rounded-xl border border-slate-200 outline-none focus:border-lions-blue focus:ring-1 focus:ring-lions-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 text-[10px] uppercase font-bold tracking-wider mb-1">Téléphone mobile *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="034 00 000 00"
                      className="w-full pl-9 pr-3 py-2 text-xs font-semibold bg-white rounded-xl border border-slate-200 outline-none focus:border-lions-blue focus:ring-1 focus:ring-lions-blue"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 text-[10px] uppercase font-bold tracking-wider mb-1">Profession actuelle</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    placeholder="Ex: Architecte, Médecin, Entrepreneur, Étudiant..."
                    className="w-full pl-9 pr-3 py-2 text-xs font-semibold bg-white rounded-xl border border-slate-200 outline-none focus:border-lions-blue focus:ring-1 focus:ring-lions-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 text-[10px] uppercase font-bold tracking-wider mb-1">Quelles sont vos motivations ? *</label>
                <textarea
                  name="motivation"
                  required
                  rows={3}
                  value={formData.motivation}
                  onChange={handleChange}
                  placeholder="Dites-nous pourquoi vous souhaitez intégrer le Lions Club de Majunga..."
                  className="w-full px-3 py-2 text-xs font-semibold bg-white rounded-xl border border-slate-200 outline-none focus:border-lions-blue focus:ring-1 focus:ring-lions-blue resize-none"
                />
              </div>

              <button
                type="submit"
                id="join-submit-button"
                className="w-full py-3 bg-lions-gold hover:bg-lions-gold-hover text-slate-900 font-display font-medium text-xs tracking-wider uppercase rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                Envoyer ma candidature <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 text-center"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-150/50 rounded-full flex items-center justify-center mb-3">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-display font-bold text-lg md:text-xl text-slate-800">Formulaire Transmis avec Succès !</h3>
              <p className="text-slate-500 text-xs font-sans max-w-sm mt-1">
                Merci, cher/chère {formData.prenom}. Votre intention de servir au sein de notre club de Majunga honore la communauté.
              </p>
            </div>

            {/* Provisional ID Badge view */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white/70 backdrop-blur font-mono text-left text-[11px] text-slate-600 space-y-2 relative overflow-hidden">
              <div className="absolute right-2 top-2 border border-green-500/30 text-green-600 font-sans font-bold py-0.5 px-1.5 rounded text-[8px] tracking-widest uppercase">
                DOSSIER REÇU
              </div>

              <div className="border-b border-slate-100 pb-2 mb-2">
                <span className="text-[9px] text-slate-400 block font-sans">RÉFÉRENCE UNIQUE DE DEMANDE :</span>
                <span className="font-extrabold text-slate-800 text-xs tracking-wider">{candidateId}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-sans">Candidat :</span>
                <strong className="text-slate-800 text-xs">{formData.nom.toUpperCase()} {formData.prenom}</strong>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 block font-sans">Profession :</span>
                  <span className="text-slate-800 font-sans">{formData.profession || "Non spécifié"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-sans">Téléphone :</span>
                  <span className="text-slate-800">{formData.phone}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-50 text-[10px] text-slate-400 font-sans italic leading-relaxed">
                "Un membre parrain de notre club prendra contact avec vous d'ici 48h pour un premier entretien de courtoisie."
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2 px-3 bg-slate-900 text-slate-200 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" /> imprimer fiche
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-2 px-3 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg"
              >
                Postuler à nouveau
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
