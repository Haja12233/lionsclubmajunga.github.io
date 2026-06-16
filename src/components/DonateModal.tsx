import React, { useState } from "react";
import { X, CheckCircle, CreditCard, Heart, Calendar, ArrowRight, Printer, Share2, Award, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "amount" | "method" | "details" | "ussd-instruct" | "success";
type Method = "mvola" | "airtel" | "orange" | "card" | "paypal" | null;

export default function DonateModal({ isOpen, onClose }: DonateModalProps) {
  const [step, setStep] = useState<Step>("amount");
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(50000); // in Ariary / EUR equivalent
  const [customAmount, setCustomAmount] = useState<string>("");
  const [method, setMethod] = useState<Method>(null);
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [toastSuccess, setToastSuccess] = useState<boolean>(false);

  const presets = [15000, 30000, 50000, 100000, 250000];

  const getAmount = () => {
    if (selectedAmount === "custom") {
      return Number(customAmount) || 0;
    }
    return selectedAmount;
  };

  const handleNextAmount = () => {
    if (getAmount() <= 0) {
      setModalError("Veuillez entrer un montant valide.");
      return;
    }
    setModalError(null);
    setStep("method");
  };

  const handleMethodSelect = (m: Method) => {
    setMethod(m);
    setModalError(null);
    if (m === "mvola" || m === "airtel" || m === "orange") {
      setStep("ussd-instruct");
    } else {
      setStep("details");
    }
  };

  const handleNextDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setModalError("Veuillez renseigner votre nom et email.");
      return;
    }
    setModalError(null);
    setStep("success");
  };

  const handleSimulateMobilePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setModalError("Veuillez renseigner votre numéro de téléphone.");
      return;
    }
    setModalError(null);
    setStep("details");
  };

  const resetAll = () => {
    setStep("amount");
    setSelectedAmount(50000);
    setCustomAmount("");
    setMethod(null);
    setName("");
    setFirstName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setCopied(false);
    setModalError(null);
    setToastSuccess(false);
  };

  const ussdCodes = {
    mvola: { code: "*111*1*2#", number: "034 11 456 78", name: "Lions Club Majunga" },
    airtel: { code: "*99#", number: "033 11 456 78", name: "Lions Club Majunga" },
    orange: { code: "*144#", number: "032 11 456 78", name: "Lions Club Majunga" }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => { resetAll(); onClose(); }}
          className="absolute inset-0 bg-slate-900/65 backdrop-blur-sm"
        />

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-slate-100 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-lions-blue text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Heart className="w-5 h-5 text-lions-gold animate-pulse" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">Faire un Don</h3>
                <p className="text-xs text-slate-200">Soutenir les actions de secours dans le Boeny</p>
              </div>
            </div>
            <button
              id="close-donate-modal"
              onClick={() => { resetAll(); onClose(); }}
              className="p-1 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Indicator */}
          {step !== "success" && (
            <div className="bg-slate-50 border-b border-slate-100 px-6 py-2 flex justify-between text-xs font-medium text-slate-500">
              <span className={step === "amount" ? "text-lions-blue font-bold" : ""}>1. Montant</span>
              <span className="text-slate-300">/</span>
              <span className={step === "method" || step === "ussd-instruct" ? "text-lions-blue font-bold" : ""}>2. Paiement</span>
              <span className="text-slate-300">/</span>
              <span className={step === "details" ? "text-lions-blue font-bold" : ""}>3. Donateur</span>
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {modalError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 border border-red-100 text-xs font-bold flex justify-between items-center animate-pulse">
                <span>{modalError}</span>
                <button type="button" onClick={() => setModalError(null)} className="font-mono text-[9px] hover:underline uppercase">Fermer</button>
              </div>
            )}

            {/* STEP 1: AMOUNT SELECTION */}
            {step === "amount" && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Choisissez le montant de votre don (Ariary - MGA) :
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {presets.map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setSelectedAmount(val)}
                        className={`py-3 px-2 rounded-xl text-sm font-bold border transition-all ${
                          selectedAmount === val
                            ? "bg-lions-blue text-white border-lions-blue shadow-md"
                            : "bg-white text-slate-700 border-slate-200 hover:border-lions-blue/30"
                        }`}
                      >
                        {val.toLocaleString("fr-FR")} MGA
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setSelectedAmount("custom")}
                      className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all col-span-3 ${
                        selectedAmount === "custom"
                          ? "bg-lions-blue text-white border-lions-blue shadow-md"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:border-lions-blue/30"
                      }`}
                    >
                      Autre montant personnalisé
                    </button>
                  </div>
                </div>

                {selectedAmount === "custom" && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                  >
                    <input
                      type="number"
                      placeholder="Saisissez un montant (ex: 200000)"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono text-base focus:border-lions-blue focus:ring-1 focus:ring-lions-blue outline-none pr-12"
                    />
                    <span className="absolute right-4 top-3.5 text-xs text-slate-400 font-bold">MGA</span>
                  </motion.div>
                )}

                <div className="bg-slate-50 p-4 rounded-xl border border-dotted border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Équivalences concrètes de votre don :</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    🌟 <strong>{(getAmount()).toLocaleString("fr-FR")} MGA</strong> contribue directement à fournir environ{" "}
                    <span className="text-lions-blue font-bold">
                      {Math.max(2, Math.floor(getAmount() / 3000))} bouillies fortifiées Nutri'zaza
                    </span>{" "}
                    aux bébés au CDEF de Mahajanga.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleNextAmount}
                  className="w-full py-3.5 bg-lions-blue text-white font-display font-medium rounded-xl hover:bg-lions-dark transition-all flex items-center justify-center gap-2 group shadow-md"
                >
                  Continuer vers le paiement <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {/* STEP 2: PAYMENT METHOD */}
            {step === "method" && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-5"
              >
                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-xs text-slate-500 font-medium font-sans">Montant retenu</span>
                  <span className="font-mono font-bold text-slate-800 text-sm">{(getAmount()).toLocaleString("fr-FR")} MGA</span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest">Opérateurs Mobiles (Sécurisé Madagascar)</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleMethodSelect("mvola")}
                      className="p-3 border rounded-xl flex flex-col items-center justify-center gap-2 bg-yellow-50/20 hover:bg-yellow-50/50 border-amber-200 hover:border-amber-400 transition-all text-center"
                    >
                      <span className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-black text-slate-800">MVola</span>
                      <span className="text-[10px] font-bold text-slate-700">Mvola</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMethodSelect("airtel")}
                      className="p-3 border rounded-xl flex flex-col items-center justify-center gap-2 bg-red-50/20 hover:bg-red-50/50 border-red-200 hover:border-red-400 transition-all text-center"
                    >
                      <span className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-xs font-black text-white">airtel</span>
                      <span className="text-[10px] font-bold text-slate-700">Airtel Money</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMethodSelect("orange")}
                      className="p-3 border rounded-xl flex flex-col items-center justify-center gap-2 bg-orange-50/20 hover:bg-orange-50/50 border-orange-200 hover:border-orange-400 transition-all text-center"
                    >
                      <span className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-xs font-black text-white">orange</span>
                      <span className="text-[10px] font-bold text-slate-700">Orange Money</span>
                    </button>
                  </div>

                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest pt-3 border-t border-slate-100">Cartes Bancaires & International</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleMethodSelect("card")}
                      className="p-3 border rounded-xl flex items-center justify-center gap-3 bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-lions-blue transition-all"
                    >
                      <CreditCard className="w-5 h-5 text-lions-blue" />
                      <span className="text-xs font-bold text-slate-700">Visa / Mastercard</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMethodSelect("paypal")}
                      className="p-3 border rounded-xl flex items-center justify-center gap-3 bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-lions-blue transition-all"
                    >
                      <span className="font-display font-extrabold italic text-sky-800 text-sm">Pay<span className="text-sky-500">Pal</span></span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => setStep("amount")}
                    className="text-xs font-bold text-slate-500 hover:text-slate-700 underline"
                  >
                    Retour à l'étape précédente
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP: USSD INSTRUCTIONS FOR MOBILE MONEY */}
            {step === "ussd-instruct" && method && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-5 shadow-inner"
              >
                <div className="bg-slate-50 p-4 rounded-xl space-y-3 border border-slate-200 font-sans">
                  <h5 className="font-bold text-sm text-slate-700 flex items-center gap-2">
                    <span>Instructions de transfert {method.toUpperCase()} :</span>
                  </h5>
                  <p className="text-xs text-slate-600">
                    Pour finaliser votre don de <strong className="font-mono">{(getAmount()).toLocaleString("fr-FR")} MGA</strong>, veuillez exécuter la syntaxe USSD suivante sur votre appareil mobile ou transférer au numéro ci-dessous :
                  </p>

                  <div className="p-3 bg-white rounded-lg border border-slate-100 font-mono text-center relative group">
                    <span className="text-xs text-slate-400 block font-sans">Code à composer (USSD)</span>
                    <strong className="text-lg text-slate-800 tracking-wide select-all">{ussdCodes[method as keyof typeof ussdCodes]?.code || "*111#"}</strong>
                    <button
                      onClick={() => copyToClipboard(ussdCodes[method as keyof typeof ussdCodes]?.code || "")}
                      className="absolute right-2 top-2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-600 animate-scale" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-100 font-sans relative">
                    <span className="text-xs text-slate-400 block">Numéro Récepteur Mobile Client</span>
                    <strong className="font-mono text-slate-800">{ussdCodes[method as keyof typeof ussdCodes]?.number}</strong>
                    <span className="block text-[10px] text-lions-blue font-bold">Titulaire : {ussdCodes[method as keyof typeof ussdCodes]?.name}</span>
                  </div>
                </div>

                <form onSubmit={handleSimulateMobilePayment} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Entrez votre numéro {method.toUpperCase()} lié au paiement :
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex: 034 00 000 00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-lions-blue outline-none text-sm font-semibold"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep("method")}
                      className="flex-1 py-3 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold font-sans"
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-lions-blue text-white rounded-xl text-xs font-bold font-sans hover:bg-lions-dark"
                    >
                      Valider le transfert simulé
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 3: DONOR DETAILS FOR CREDIT CARDS or POST-USSD FOR ALL */}
            {step === "details" && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <form onSubmit={handleNextDetails} className="space-y-4 font-sans text-left">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex justify-between items-center">
                    <span className="text-xs text-slate-500">Source paiement choisie :</span>
                    <span className="text-xs font-bold text-slate-800 uppercase bg-lions-blue/10 text-lions-blue px-2 py-0.5 rounded">
                      {method}
                    </span>
                  </div>

                  {method === "card" && (
                    <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-dotted border-slate-200">
                      <h4 className="text-xs font-bold text-slate-700 uppercase">Coordonnées bancaires fictives (simulateur)</h4>
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Numéro de carte : 4000 1234 5678 9010"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs outline-none focus:border-lions-blue"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          placeholder="MM/AA"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs outline-none focus:border-lions-blue text-center"
                        />
                        <input
                          type="password"
                          maxLength={3}
                          required
                          placeholder="CVC"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs outline-none focus:border-lions-blue text-center"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Nom *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Raveloson"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs focus:border-lions-blue outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Prénom</label>
                      <input
                        type="text"
                        placeholder="Ex: Sitraka"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs focus:border-lions-blue outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="Ex: sitraka@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs focus:border-lions-blue outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Laissez un message d'encouragement (facultatif)</label>
                    <textarea
                      rows={2}
                      placeholder="Écrivez un mot doux pour nos bénéficiaires..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs focus:border-lions-blue outline-none resize-none"
                    />
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep("method")}
                      className="flex-1 py-3 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold"
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-lions-blue text-white rounded-xl text-xs font-bold hover:bg-lions-dark shadow-md"
                    >
                      Confirmer et Finaliser
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 4: SUCCESS & RECEIPT */}
            {step === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center font-sans"
              >
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-slate-900">Misaotra bets!</h4>
                  <p className="text-slate-500 text-xs max-w-sm mt-1">
                    Merci infiniment pour votre don généreux. Votre contribution fait battre le cœur de nos actions dans le Boeny.
                  </p>
                </div>

                {/* Printable receipt card */}
                <div id="solidary-receipt" className="border-2 border-slate-100 rounded-2xl p-5 bg-slate-50/50 relative overflow-hidden font-mono text-left text-xs text-slate-700 shadow-sm border-dashed">
                  {/* Decorative stamp decoration */}
                  <div className="absolute right-4 top-4 border border-lions-blue/30 text-lions-blue rounded px-2 py-1 rotate-12 text-[9px] font-black uppercase tracking-widest opacity-80 flex items-center gap-1">
                    <Award className="w-3 h-3 text-lions-gold" />
                    APPROUVÉ LIONS
                  </div>

                  <div className="text-center pb-3 border-b border-slate-200/60 mb-3 font-sans">
                    <span className="font-bold text-[10px] text-lions-blue tracking-widest uppercase">REÇU DE DON SOLIDAIRE</span>
                    <h5 className="font-bold font-display text-slate-800 text-sm">LIONS CLUB MAJUNGA</h5>
                    <span className="text-[9px] text-slate-400">Mahajanga, Madagascar - ID #LC-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>

                  <div className="space-y-2 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans">Donateur :</span>
                      <strong className="text-slate-800">{firstName || ""} {name?.toUpperCase()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans">Email :</span>
                      <span className="text-slate-800">{email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans">Date :</span>
                      <span className="text-slate-800">{new Date().toLocaleDateString("fr-FR")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans">Méthode :</span>
                      <span className="text-slate-850 font-bold uppercase">{method} simulator</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-dotted border-slate-200">
                      <span className="text-slate-800 font-sans font-bold">MONTANT TOTAL :</span>
                      <strong className="text-lions-blue text-sm">{(getAmount()).toLocaleString("fr-FR")} MGA</strong>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 text-center text-[9px] leading-relaxed text-slate-400 font-sans italic">
                    "Nous Servons. Chaque geste est un phare d'espoir pour la communauté Boeny."
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      window.print();
                    }}
                    className="flex-1 py-3 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" /> imprimer
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setToastSuccess(true);
                      setTimeout(() => setToastSuccess(false), 4000);
                    }}
                    className="py-3 px-4 border border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-600 text-xs font-medium cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {toastSuccess && (
                  <div className="p-2.5 rounded-lg bg-green-50 text-green-600 border border-green-100 text-[11px] font-bold text-center animate-fade-in">
                    Lien de partage du reçu copié ! Sentez-vous libre de propager l'espoir.
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      resetAll();
                      onClose();
                    }}
                    className="text-xs font-bold text-lions-blue hover:underline"
                  >
                    Fermer le guichet
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
