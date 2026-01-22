export const site = {
  brand: "Enis Caicedo",
  tagline: "Soluciones Legales e Inmobiliarias en Panamá",
  locationLine:
    "Avenida Balboa, edificio BOC, Balboa Office Center, piso 34, oficina 3422",
  whatsapp: "+50763782755",
  phone: "+507 6378-2755",
  email: "contacto@tudominio.com",
  socials: {
    instagram: "https://www.instagram.com/eniscaicedorealestate/",
    youtube: "https://www.youtube.com/@abogadaeniscaicedo190",
    facebook: "https://www.facebook.com/ENISCAICEDOREALESTATE?locale=es_LA",
  },
};

export type Building = {
  id: string;
  name: string;
  subtitle: string;
  desc: string;
  cover: string; // se ve siempre
  extra1: string; // aparece al presionar
  extra2: string; // aparece al presionar
};

export const copy = {
  hero: {
    name: "Enis Caicedo",
    role: "Abogada y corredora de bienes raíces",
    headline:
      "Seguridad y confianza para proteger su patrimonio y decidir con estrategia.",
    sub: "Asesoría legal y acompañamiento inmobiliario con enfoque claro, profesional y paso a paso.",
    bullets: [
      "Asesoría legal con enfoque estratégico",
      "Acompañamiento en inversiones y compras",
      "Representación confiable",
    ],
    primaryCta: "Escribir por WhatsApp",
    secondaryCta: "Ver servicios",
  },

  legal: {
    headline: "Servicios legales",
    lead: "Acompañamiento legal con claridad, orden y enfoque estratégico para reducir riesgos y tomar decisiones con respaldo.",
    areas: [
      "Contratos y acuerdos",
      "Constitución y formalización",
      "Trámites y gestión documental",
      "Asesoría preventiva y cumplimiento",
      "Revisión de documentos de compraventa",
      "Acompañamiento legal en cierres",
    ],
    note:
      "Cada caso se evalúa de forma personalizada. Se confirma alcance, tiempos y documentación necesaria antes de iniciar.",
  },


  realestate: {
    headline: "Bienes raíces",
    lead: "Acompañamiento completo para comprar, vender o invertir en Panamá con criterio legal y estrategia.",
    bullets: [
      "Búsqueda y selección de propiedades",
      "Análisis de riesgos y documentación",
      "Negociación y cierre seguro",
    ],
  },

  properties: {
    headline: "Propiedades",
    lead: "Explora propiedades y proyectos. Sección de edificios al inicio con galerías por proyecto.",
  },

  about: {
    headline: "Sobre Enis",
    lead: "Perfil profesional y enfoque de trabajo. Transparencia, criterio y acompañamiento de principio a fin.",
  },
  trust: {
    credentials: [
      "Abogada con enfoque práctico y preventivo",
      "Acompañamiento claro en cada paso",
      "Criterio legal aplicado a decisiones inmobiliarias",
      "Comunicación directa y seguimiento",
      "Revisión documental para minimizar riesgos",
      "Estrategia y orden en procesos"
    ],
    values: [
      { title: "Transparencia", desc: "Explicaciones claras, alcance definido y expectativas realistas." },
      { title: "Criterio", desc: "Decisiones con respaldo legal y enfoque en proteger tu patrimonio." },
      { title: "Confianza", desc: "Acompañamiento profesional, de principio a fin." }
    ]
  },

  contact: {
    headline: "Contacto",
    lead: "Conversemos por WhatsApp o agenda una cita. Respuesta rápida.",
  },

  whyPanama: {
    headline: "¿Por qué Panamá?",
    lead: "Beneficios clave para inversión, residencia y operaciones: conectividad, estabilidad y proyección.",
    items: [
      {
        title: "Conectividad",
        desc: "Hub de negocios y logística.",
        image: "/images/panama-1.jpg",
      },
      {
        title: "Estabilidad",
        desc: "Ecosistema atractivo para inversionistas.",
        image: "/images/panama-2.jpg",
      },
      {
        title: "Ubicación",
        desc: "Puente entre mercados.",
        image: "/images/panama-3.jpg",
      },
      {
        title: "Infraestructura",
        desc: "Proyectos premium y servicios.",
        image: "/images/panama-4.jpg",
      },
      {
        title: "Oportunidades",
        desc: "Crecimiento y diversidad.",
        image: "/images/panama-5.jpg",
      },
      {
        title: "Calidad de vida",
        desc: "Entorno moderno y tropical.",
        image: "/images/panama-6.jpg",
      },
    ],
  },

  buildings: {
    headline: "Edificios",
    lead: "11 proyectos (placeholders). Cada card muestra 1 foto y al presionar abre 2 adicionales.",
    items: [
      {
        id: "bld-01",
        name: "Edificio Placeholder 01",
        subtitle: "Costa del Este",
        desc: "Descripción breve del edificio (placeholder).",
        cover: "/images/buildings/bld-01-cover.jpg",
        extra1: "/images/buildings/bld-01-1.jpg",
        extra2: "/images/buildings/bld-01-2.jpg",
      },
      {
        id: "bld-02",
        name: "Edificio Placeholder 02",
        subtitle: "Avenida Balboa",
        desc: "Descripción breve del edificio (placeholder).",
        cover: "/images/buildings/bld-02-cover.jpg",
        extra1: "/images/buildings/bld-02-1.jpg",
        extra2: "/images/buildings/bld-02-2.jpg",
      },
      {
        id: "bld-03",
        name: "Edificio Placeholder 03",
        subtitle: "Punta Pacífica",
        desc: "Descripción breve del edificio (placeholder).",
        cover: "/images/buildings/bld-03-cover.jpg",
        extra1: "/images/buildings/bld-03-1.jpg",
        extra2: "/images/buildings/bld-03-2.jpg",
      },
      {
        id: "bld-04",
        name: "Edificio Placeholder 04",
        subtitle: "San Francisco",
        desc: "Descripción breve del edificio (placeholder).",
        cover: "/images/buildings/bld-04-cover.jpg",
        extra1: "/images/buildings/bld-04-1.jpg",
        extra2: "/images/buildings/bld-04-2.jpg",
      },
      {
        id: "bld-05",
        name: "Edificio Placeholder 05",
        subtitle: "Obarrio",
        desc: "Descripción breve del edificio (placeholder).",
        cover: "/images/buildings/bld-05-cover.jpg",
        extra1: "/images/buildings/bld-05-1.jpg",
        extra2: "/images/buildings/bld-05-2.jpg",
      },
      {
        id: "bld-06",
        name: "Edificio Placeholder 06",
        subtitle: "Bella Vista",
        desc: "Descripción breve del edificio (placeholder).",
        cover: "/images/buildings/bld-06-cover.jpg",
        extra1: "/images/buildings/bld-06-1.jpg",
        extra2: "/images/buildings/bld-06-2.jpg",
      },
      {
        id: "bld-07",
        name: "Edificio Placeholder 07",
        subtitle: "Clayton",
        desc: "Descripción breve del edificio (placeholder).",
        cover: "/images/buildings/bld-07-cover.jpg",
        extra1: "/images/buildings/bld-07-1.jpg",
        extra2: "/images/buildings/bld-07-2.jpg",
      },
      {
        id: "bld-08",
        name: "Edificio Placeholder 08",
        subtitle: "Albrook",
        desc: "Descripción breve del edificio (placeholder).",
        cover: "/images/buildings/bld-08-cover.jpg",
        extra1: "/images/buildings/bld-08-1.jpg",
        extra2: "/images/buildings/bld-08-2.jpg",
      },
      {
        id: "bld-09",
        name: "Edificio Placeholder 09",
        subtitle: "Santa María",
        desc: "Descripción breve del edificio (placeholder).",
        cover: "/images/buildings/bld-09-cover.jpg",
        extra1: "/images/buildings/bld-09-1.jpg",
        extra2: "/images/buildings/bld-09-2.jpg",
      },
      {
        id: "bld-10",
        name: "Edificio Placeholder 10",
        subtitle: "El Cangrejo",
        desc: "Descripción breve del edificio (placeholder).",
        cover: "/images/buildings/bld-10-cover.jpg",
        extra1: "/images/buildings/bld-10-1.jpg",
        extra2: "/images/buildings/bld-10-2.jpg",
      },
      {
        id: "bld-11",
        name: "Edificio Placeholder 11",
        subtitle: "Casco Viejo",
        desc: "Descripción breve del edificio (placeholder).",
        cover: "/images/buildings/bld-11-cover.jpg",
        extra1: "/images/buildings/bld-11-1.jpg",
        extra2: "/images/buildings/bld-11-2.jpg",
      },
    ] as Building[],
  },
} as const;
