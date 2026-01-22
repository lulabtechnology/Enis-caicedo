// content/site.ts

export const site = {
  brand: "Enis Caicedo",
  tagline: "Soluciones Legales e Inmobiliarias en Panamá",
  locationLine:
    "Avenida Balboa, edificio BOC, Balboa Office Center, piso 34, oficina 3422",

  // WhatsApp oficial (E.164)
  whatsapp: "+50763782755",

  // Teléfono visible
  phone: "+507 6378-2755",

  // Reemplaza con el real si aplica
  email: "contacto@tudominio.com",

  socials: {
    instagram: "https://www.instagram.com/eniscaicedorealestate/",
    youtube: "https://www.youtube.com/@abogadaeniscaicedo190",
    facebook: "https://www.facebook.com/ENISCAICEDOREALESTATE?locale=es_LA",
  },
} as const;

export type Building = {
  id: string;
  name: string;
  subtitle: string;
  desc: string;
  cover: string; // se ve siempre
  extra1: string; // aparece al presionar
  extra2: string; // aparece al presionar
};

export type PropertyItem = {
  id: string;
  title: string;
  priceFrom: string;
  location: string;
  tags: string[];
  image: string;
};

export const copy = {
  hero: {
    name: "Enis Caicedo",
    role: "Abogada y corredora de bienes raíces",
    headline:
      "Seguridad y confianza para proteger su patrimonio y decidir con estrategia.",
    sub: "Asesoría legal y acompañamiento inmobiliario para clientes e inversionistas que buscan claridad, respaldo y ejecución paso a paso.",
    bullets: [
      "Asesoría legal con enfoque estratégico",
      "Acompañamiento en inversiones y compras con estrategia",
      "Asistencia internacional y representación confiable",
    ],
    primaryCta: "Escribir por WhatsApp",
    secondaryCta: "Ver servicios",
  },

  // ✅ Home / página usa trust.items y trust.values (para que NO vuelva a romper)
  trust: {
    headline: "Respaldo profesional",
    items: [
      { title: "Experiencia", desc: "9 años de experiencia en derecho." },
      {
        title: "Enfoque",
        desc: "Defensa con estrategia y acompañamiento personalizado.",
      },
      {
        title: "Confianza",
        desc: "Responsabilidad y criterio para tomar decisiones seguras.",
      },
    ],
    values: [
      { title: "Experiencia", desc: "9 años de experiencia en derecho." },
      {
        title: "Enfoque",
        desc: "Defensa con estrategia y acompañamiento personalizado.",
      },
      {
        title: "Confianza",
        desc: "Responsabilidad y criterio para tomar decisiones seguras.",
      },
    ],
    credentials: [
      "Vicepresidenta de la Asociación Nacional de Abogados de Panamá (ANDAP)",
      "Miembro de ACOBIR y del comité legal de ACOBIR",
      "Comisiones de derecho marítimo y derecho migratorio (Colegio Nacional de Abogados)",
      "Gerente Internacional de ECREISAS (Enis Caicedo Real Estate International)",
    ],
  },

  howItWorks: {
    kicker: "Cómo funciona",
    steps: [
      {
        title: "Contáctenos",
        desc: "Escríbanos por WhatsApp o complete el formulario.",
      },
      {
        title: "Describa su caso o necesidad",
        desc: "Comparta un resumen para orientar la asesoría.",
      },
      {
        title: "Agenda y plan de acción",
        desc: "Le contactaremos para coordinar una cita; el costo depende de la rama.",
      },
    ],
  },

  legal: {
    headline: "Servicios legales",
    lead: "Asesoría y representación legal con comunicación clara y estrategia paso a paso.",
    areas: [
      "Familia",
      "Penal",
      "Civil",
      "Corporativo",
      "Migración",
      "Marítimo",
      "Comercial",
      "Asesoría a inversionistas",
    ],
    note: "No se atienden delitos de violación ni homicidios dolosos.",
  },

  realestate: {
    headline: "Bienes raíces e inversiones",
    lead: "Acompañamiento en compra, venta e inversión inmobiliaria para reducir riesgos, anticipar objeciones y cerrar con criterio.",
    bullets: [
      "Acompañamiento en inversiones y compras con estrategia",
      "Validación de documentación y riesgos antes de firmar",
      "Negociación y acompañamiento en el proceso",
    ],
  },

  // ✅ lo usas en app/page.tsx (tu error anterior fue porque faltaba)
  about: {
    headline: "Sobre Enis",
    lead: "Perfil profesional y enfoque de trabajo. Transparencia, criterio y acompañamiento de principio a fin.",
  },

  whyPanama: {
    headline: "¿Por qué Panamá?",
    lead: "Beneficios clave para inversión, residencia y operaciones: conectividad, estabilidad y proyección.",
    items: [
      { title: "Conectividad", desc: "Hub de negocios y logística.", image: "/images/panama-1.jpg" },
      { title: "Estabilidad", desc: "Ecosistema atractivo para inversionistas.", image: "/images/panama-2.jpg" },
      { title: "Ubicación", desc: "Puente entre mercados.", image: "/images/panama-3.jpg" },
      { title: "Infraestructura", desc: "Proyectos premium y servicios.", image: "/images/panama-4.jpg" },
      { title: "Oportunidades", desc: "Crecimiento y diversidad.", image: "/images/panama-5.jpg" },
      { title: "Calidad de vida", desc: "Entorno moderno y tropical.", image: "/images/panama-6.jpg" },
    ],
  },

  properties: {
    headline: "Propiedades",
    lead: "Listado de ejemplo. Sustituye imágenes, precios y detalles por las propiedades reales.",
    cta: "Solicitar información por WhatsApp",
    items: [
      {
        id: "prop-01",
        title: "Apartamento premium con vista",
        priceFrom: "Desde $325,000",
        location: "Ciudad de Panamá",
        tags: ["Apartamento", "Inversión"],
        image: "/images/property-1.jpg",
      },
      {
        id: "prop-02",
        title: "Residencia familiar en zona exclusiva",
        priceFrom: "Desde $540,000",
        location: "Costa del Este / San Francisco",
        tags: ["Casa", "Familia"],
        image: "/images/property-2.jpg",
      },
      {
        id: "prop-03",
        title: "Oficina corporativa lista para operar",
        priceFrom: "Desde $210,000",
        location: "Avenida Balboa",
        tags: ["Comercial", "Oficina"],
        image: "/images/property-3.jpg",
      },
    ] as PropertyItem[],
  },

  buildings: {
    headline: "Edificios",
    lead: "11 proyectos (placeholders). Cada card muestra 1 foto y al presionar abre 2 adicionales.",
    items: [
      { id: "bld-01", name: "Edificio Placeholder 01", subtitle: "Costa del Este", desc: "Descripción breve (placeholder).", cover: "/images/buildings/bld-01-cover.jpg", extra1: "/images/buildings/bld-01-1.jpg", extra2: "/images/buildings/bld-01-2.jpg" },
      { id: "bld-02", name: "Edificio Placeholder 02", subtitle: "Avenida Balboa", desc: "Descripción breve (placeholder).", cover: "/images/buildings/bld-02-cover.jpg", extra1: "/images/buildings/bld-02-1.jpg", extra2: "/images/buildings/bld-02-2.jpg" },
      { id: "bld-03", name: "Edificio Placeholder 03", subtitle: "Punta Pacífica", desc: "Descripción breve (placeholder).", cover: "/images/buildings/bld-03-cover.jpg", extra1: "/images/buildings/bld-03-1.jpg", extra2: "/images/buildings/bld-03-2.jpg" },
      { id: "bld-04", name: "Edificio Placeholder 04", subtitle: "San Francisco", desc: "Descripción breve (placeholder).", cover: "/images/buildings/bld-04-cover.jpg", extra1: "/images/buildings/bld-04-1.jpg", extra2: "/images/buildings/bld-04-2.jpg" },
      { id: "bld-05", name: "Edificio Placeholder 05", subtitle: "Obarrio", desc: "Descripción breve (placeholder).", cover: "/images/buildings/bld-05-cover.jpg", extra1: "/images/buildings/bld-05-1.jpg", extra2: "/images/buildings/bld-05-2.jpg" },
      { id: "bld-06", name: "Edificio Placeholder 06", subtitle: "Bella Vista", desc: "Descripción breve (placeholder).", cover: "/images/buildings/bld-06-cover.jpg", extra1: "/images/buildings/bld-06-1.jpg", extra2: "/images/buildings/bld-06-2.jpg" },
      { id: "bld-07", name: "Edificio Placeholder 07", subtitle: "Clayton", desc: "Descripción breve (placeholder).", cover: "/images/buildings/bld-07-cover.jpg", extra1: "/images/buildings/bld-07-1.jpg", extra2: "/images/buildings/bld-07-2.jpg" },
      { id: "bld-08", name: "Edificio Placeholder 08", subtitle: "Albrook", desc: "Descripción breve (placeholder).", cover: "/images/buildings/bld-08-cover.jpg", extra1: "/images/buildings/bld-08-1.jpg", extra2: "/images/buildings/bld-08-2.jpg" },
      { id: "bld-09", name: "Edificio Placeholder 09", subtitle: "Santa María", desc: "Descripción breve (placeholder).", cover: "/images/buildings/bld-09-cover.jpg", extra1: "/images/buildings/bld-09-1.jpg", extra2: "/images/buildings/bld-09-2.jpg" },
      { id: "bld-10", name: "Edificio Placeholder 10", subtitle: "El Cangrejo", desc: "Descripción breve (placeholder).", cover: "/images/buildings/bld-10-cover.jpg", extra1: "/images/buildings/bld-10-1.jpg", extra2: "/images/buildings/bld-10-2.jpg" },
      { id: "bld-11", name: "Edificio Placeholder 11", subtitle: "Casco Viejo", desc: "Descripción breve (placeholder).", cover: "/images/buildings/bld-11-cover.jpg", extra1: "/images/buildings/bld-11-1.jpg", extra2: "/images/buildings/bld-11-2.jpg" },
    ] as Building[],
  },

  contact: {
    headline: "Contacto",
    lead: "Gracias por su interés. Será atendido lo más pronto posible.",
    consent:
      "Al enviar, acepta ser contactado para coordinar su asesoría. No compartimos su información.",
    submit: "Enviar a WhatsApp",
  },

  footer: {
    close: "Gracias por preferirnos. Sus derechos y su patrimonio estarán protegidos.",
  },
} as const;
