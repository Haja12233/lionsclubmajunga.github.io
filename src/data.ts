import { EventAction, NewsArticle, Testimonial, Partner, GalleryItem } from "./types";

export const KEY_ACTIONS: EventAction[] = [
  {
    id: "action-sante",
    title: "Santé & Espoir : Soins et Chirurgies",
    category: "sante",
    tag: "Santé humanitaire",
    description: "Financement intégral de soins et d'interventions chirurgicales pédiatriques urgentes pour les enfants issus de familles démunies.",
    fullStory: "Grâce à notre fonds de solidarité d'urgence, nous avons pu prendre en charge l'évacuation sanitaire et la chirurgie reconstructrice cardiaque du petit Soafaly, âgé de 5 ans, originaire de Majunga. Aujourd'hui, Soafaly a retrouvé le sourire, court avec ses camarades et déborde d'énergie. Notre action ne s'arrête pas là : nous organisons régulièrement des cliniques mobiles de dépistage ophtalmologique gratuites à travers le Boeny.",
    image: "https://picsum.photos/seed/sante/800/600",
    stats: "45 Enfants opérés cette année",
    impactIcon: "HeartPulse"
  },
  {
    id: "action-nutrition",
    title: "Nutrition & Enfance : Programme Nutri'zaza",
    category: "nutrition",
    tag: "Sécurité Alimentaire",
    description: "Distribution hebdomadaire de bouillie fortifiée Nutri'zaza au Centre de l'Enfance (CDEF) de Mahajanga pour lutter contre la malnutrition.",
    fullStory: "Le Lions Club Majunga s'est engagé dans un partenariat pérenne avec le CDEF pour nourrir et accompagner la croissance des tout-petits. Chaque semaine, nos volontaires distribuent plus de 500 portions de bouillies thermisées Nutri'zaza, riches en vitamines et minéraux indispensables. Ce programme a permis de réduire de 80% le taux de malnutrition modérée constaté chez les nourrissons accueillis au centre.",
    image: "/src/assets/images/nutrition_enfance_1781621175502.jpg",
    stats: "20,000+ Portions de bouillie distribuées",
    impactIcon: "Baby"
  },
  {
    id: "action-education",
    title: "Éducation & Jeunesse : Kits Scolaires EPP",
    category: "education",
    tag: "Éducation Pour Tous",
    description: "Distribution de kits scolaires complets aux élèves défavorisés des Écoles Primaires Publiques (EPP) de la circonscription scolaire de Majunga.",
    fullStory: "Le taux de scolarisation dépend étroitement des moyens dont disposent les familles. Pour lutter contre l'abandon scolaire à la rentrée, le Lions Club Majunga distribue des sacs à dos robustes contenant des cahiers, stylos, ardoises, règles et fournitures de géométrie à des centaines de jeunes élèves des EPP. Cette année, l'EPP Mahabibo et l'EPP Sotema ont été les cibles privilégiées de nos actions volontaires.",
    image: "/src/assets/images/education_jeunesse_1781621194176.jpg",
    stats: "1,200 Kits scolaires distribués",
    impactIcon: "GraduationCap"
  },
  {
    id: "action-culture",
    title: "Levée de fonds : Gala de Solidarité du Boeny",
    category: "culture",
    tag: "Événement de Charité",
    description: "Organisation de grands galas et ventes de charité pour collecter les fonds essentiels qui financent nos actions sociales toute l'année.",
    fullStory: "Chaque année, notre Gala annuel réunit les forces vives de Mahajanga : entrepreneurs locaux, donateurs institutionnels, artistes et citoyens au grand cœur. Les ventes aux enchères d'œuvres d'art locales et d'artisanat d'exception permettent d'alimenter directement notre trésorerie sociale utile aux opérations d'urgence. C'est l'alliance parfaite de l'élégance, de la culture et de la pure solidarité humaine.",
    image: "https://picsum.photos/seed/gala/800/600",
    stats: "100% des fonds versés aux bénéficiaires",
    impactIcon: "Coins"
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "news-1",
    title: "Succès du Grand Gala Annuel 2026 à la Résidence de Majunga",
    excerpt: "Une soirée mémorable de générosité sous les étoiles de Mahajanga qui a permis de récolter des fonds vitaux pour nos actions pédiatriques.",
    content: "La soirée caritative annuelle des Lions s'est tenue avec panache le mois dernier, rassemblant plus de 200 convives. Grâce aux ventes aux enchères et à la tombola de solidarité, nous avons dépassé notre objectif de collecte de fonds. Ces ressources seront allouées en priorité au financement d'interventions chirurgicales pour les nourrissons atteints de pathologies cardiaques graves et à la réfection de salles de classe.",
    date: "14 Juin 2026",
    category: "Événement",
    image: "https://picsum.photos/seed/news1/600/400",
    author: "Secrétariat Lions Club"
  },
  {
    id: "news-2",
    title: "Distribution de bouillie fortifiée au CDEF Majunga",
    excerpt: "Notre équipe s'est mobilisée ce samedi pour apporter aide nutritionnelle et sourires aux enfants du centre d'accueil.",
    content: "Dans le cadre de notre combat régulier contre la malnutrition infantile, les membres du Lions Club Majunga ont procédé à la énième remise de paniers nutritionnels enrichis Nutri'zaza au Centre de l'Enfance et de la Famille. Une cinquantaine de mères de famille ont également été sensibilisées aux bonnes pratiques d'hygiène alimentaire et de sevrage nutritif.",
    date: "05 Juin 2026",
    category: "Nutrition",
    image: "https://picsum.photos/seed/news2/600/400",
    author: "Commission Nutrition"
  },
  {
    id: "news-3",
    title: "Campagne de Dépistage de la cataracte à Katsepy",
    excerpt: "Plus de 150 personnes ont pu bénéficier de consultations ophtalmologiques gratuites et de traitements adaptés grâce à nos ophtalmologues partenaires.",
    content: "Katsepy a accueilli nos équipes médicales mobiles pour deux journées d'intense dévouement. Notre club, fidèle au slogan international 'SightFirst', a financé le dépistage et la programmation opératoire gratuite pour 32 cas de cataractes sévères qui seront opérés au centre hospitalier de Majunga. Redonner la vue, c'est redonner de l'autonomie et de la dignité.",
    date: "28 Mai 2026",
    category: "Santé",
    image: "https://picsum.photos/seed/news3/600/400",
    author: "Dr. Rakoto, Lions Ophtalmologie"
  },
  {
    id: "news-4",
    title: "Reboisement citoyen : 500 jeunes plants d'arbres à Marohogo",
    excerpt: "Le Lions Club Majunga s'engage pleinement pour préserver la biodiversité unique de notre magnifique région Boeny.",
    content: "Volontaires, étudiants et ambassadeurs de l'environnement se sont associés à notre initiative verte. Sous un soleil radieux, nous avons planté des essences locales à croissance rapide et des arbres fruitiers pour reconstituer le couvert forestier dégradé. Cette action s'inscrit dans l'un des piliers mondiaux du Lions Club International : la protection active de l'environnement.",
    date: "18 Mai 2026",
    category: "Environnement",
    image: "https://picsum.photos/seed/forest/600/400",
    author: "Commission Environnement"
  },
  {
    id: "news-5",
    title: "Dotation spéciale pour l'EPP Mahabibo de Majunga",
    excerpt: "Rénovation de la toiture de la bibliothèque scolaire et fourniture de manuels éducatifs pour le plaisir de lire.",
    content: "L'enseignement de qualité exige des infrastructures protectrices et inspirantes. Alertés par l'état précaire du plafond de la bibliothèque de l'école publique EPP Mahabibo, nous avons engagé des artisans pour sceller la toiture avant la saison des pluies. Nous avons également enrichi la bibliothèque avec 200 nouveaux ouvrages d'apprentissage en langue française et malgache.",
    date: "10 Mai 2026",
    category: "Éducation",
    image: "https://picsum.photos/seed/news5/600/400",
    author: "Éric Petitjean"
  },
  {
    id: "news-6",
    title: "Sensibilisation et don de kits d'hygiène contre le Diabète",
    excerpt: "Séances de dépistage du taux de glycémie et distributions gratuites d'appareils d'auto-mesure aux résidents.",
    content: "Le diabète est un fléau silencieux. Pour notre journée de lutte, la place du Baobab de Majunga a accueilli notre tente de dépistage gratuit. En quelques heures, plus de 320 citoyens ont vérifié leur glycémie. Les personnes diagnostiquées à risque ont été immédiatement orientées vers des thérapeutes partenaires et ont reçu des kits de suivi offerts.",
    date: "02 Mai 2026",
    category: "Santé",
    image: "https://picsum.photos/seed/news6/600/400",
    author: "Lions Action Diabète"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Madame Chantal Razafindrakoto",
    role: "Mère du petit Soafaly (Bénéficiaire Santé & Espoir)",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
    text: "Je n'avais aucun moyen de payer l'opération de mon fils Soafaly. Les Lions ne se sont pas contentés de donner de l'argent, ils nous ont accompagnés pas à pas avec amour. Aujourd'hui, mon fils court et joue. Ils ont sauvé la vie de mon seul enfant.",
    rating: 5
  },
  {
    id: "t2",
    name: "Directeur Jean-Bosco Tokiniaina",
    role: "Directeur de l'EPP Mahabibo, Majunga",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
    text: "La distribution annuelle de kits scolaires par les Lions a un impact direct sur le taux d'assiduité dans notre établissement. Les élèves sont fiers d'avoir de belles fournitures, et soulagés de ne pas peser financièrement sur leurs parents dévoués.",
    rating: 5
  },
  {
    id: "t3",
    name: "Dr. Clara Andrianasolo",
    role: "Ophtalmologue bénévole, Membre active du Club",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
    text: "Faire partie du Lions Club Majunga me permet de mettre mes compétences médicales directement au service des populations oubliées des zones rurales. Servir à travers ce club est la plus belle aventure humaine de ma carrière.",
    rating: 5
  }
];

export const PARTNERS: Partner[] = [
  { id: "p1", name: "Telma Madagascar", logo: "https://picsum.photos/seed/telma/160/60", type: "sponsor" },
  { id: "p2", name: "Société Brasserie de Majunga", logo: "https://picsum.photos/seed/brew/160/60", type: "entreprise" },
  { id: "p3", name: "Banque BNI Madagascar", logo: "https://picsum.photos/seed/bni/160/60", type: "entreprise" },
  { id: "p4", name: "Mairie de Mahajanga", logo: "https://picsum.photos/seed/mairie/160/60", type: "institution" },
  { id: "p5", name: "Région Boeny", logo: "https://picsum.photos/seed/boeny/160/60", type: "institution" },
  { id: "p6", name: "Nutri'zaza S.A.", logo: "https://picsum.photos/seed/nutrizaza/160/60", type: "sponsor" },
  { id: "p7", name: "Etablissement Orange Boeny", logo: "https://picsum.photos/seed/orange/160/60", type: "entreprise" }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "g1", title: "Remise officielle de kits scolaires EPP", category: "education", image: "/src/assets/images/education_jeunesse_1781621194176.jpg", date: "Mai 2026" },
  { id: "g2", title: "Distribution souriante Nutri'zaza au CDEF", category: "nutrition", image: "/src/assets/images/nutrition_enfance_1781621175502.jpg", date: "Juin 2026" },
  { id: "g3", title: "Consultation et dépistage visuel gratuit", category: "sante", image: "https://picsum.photos/seed/eyeclinic/800/600", date: "Mai 2026" },
  { id: "g4", title: "Vente aux enchères d'art - Gala de Solidarité", category: "galas", image: "https://picsum.photos/seed/artauction/800/600", date: "Juin 2026" },
  { id: "g5", title: "Action nettoyage écologique à la Petite Plage", category: "evenements", image: "https://picsum.photos/seed/beachclean/800/600", date: "Avril 2026" },
  { id: "g6", title: "Inauguration de la bibliothèque scolaire Mahabibo", category: "education", image: "https://picsum.photos/seed/reading/800/600", date: "Mai 2026" },
  { id: "g7", title: "Dépistage du Diabète à la place du Baobab", category: "sante", image: "https://picsum.photos/seed/diabetesdepist/800/600", date: "Mai 2026" },
  { id: "g8", title: "Soirée cocktail et remise de fanion Lions", category: "galas", image: "https://picsum.photos/seed/cocktail/800/600", date: "Mars 2026" }
];
