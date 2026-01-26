export const site = {
  brand: "Enis Caicedo",
  tagline: "Soluciones Legales e Inmobiliarias en Panamá",
  locationLine: "Avenida Balboa, edificio BOC, Balboa Office Center, piso 34, oficina 3422",

  // WhatsApp oficial (E.164)
  whatsapp: "+50763782755",

  // Reemplaza con email real si aplica
  email: "contacto@tudominio.com",

  // Teléfono visible (puede ser el mismo)
  phone: "+507 6378-2755",

  socials: {
    instagram: "https://www.instagram.com/eniscaicedorealestate/",
    youtube: "https://www.youtube.com/@abogadaeniscaicedo190",
    facebook: "https://www.facebook.com/ENISCAICEDOREALESTATE?locale=es_LA"
  }
};

export const copy = {
  hero: {
    name: "Enis Caicedo",
    role: "Abogada y corredora de bienes raíces",

    headline: "Seguridad y confianza para proteger su patrimonio y decidir con estrategia.",
    sub: "Asesoría legal y acompañamiento inmobiliario para clientes e inversionistas que buscan claridad, respaldo y ejecución paso a paso.",

    bullets: [
      "Asesoría legal con enfoque estratégico",
      "Acompañamiento en inversiones y compras con estrategia",
      "Asistencia internacional y representación confiable"
    ],

    primaryCta: "Escribir por WhatsApp",
    secondaryCta: "Ver servicios"
  },

  trust: {
    headline: "Respaldo profesional",
    items: [
      { title: "Experiencia", desc: "9 años de experiencia en derecho." },
      { title: "Enfoque", desc: "Defensa con estrategia y acompañamiento personalizado." },
      { title: "Confianza", desc: "Responsabilidad y criterio para tomar decisiones seguras." }
    ],
    credentials: [
      "Vicepresidenta de la Asociación Nacional de Abogados de Panamá (ANDAP)",
      "Miembro de ACOBIR y del comité legal de ACOBIR",
      "Comisiones de derecho marítimo y derecho migratorio (Colegio Nacional de Abogados)",
      "Gerente Internacional de ECREISAS (Enis Caicedo Real Estate International)"
    ]
  },

  howItWorks: {
    kicker: "Cómo funciona",
    steps: [
      { title: "Contáctenos", desc: "Escríbanos por WhatsApp o complete el formulario." },
      { title: "Describa su caso o necesidad", desc: "Comparta un resumen para orientar la asesoría." },
      { title: "Agenda y plan de acción", desc: "Le contactaremos para coordinar una cita; el costo depende de la rama." }
    ]
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
      "Asesoría a inversionistas"
    ],
    note: "No se atienden delitos de violación ni homicidios dolosos."
  },

  realestate: {
    headline: "Bienes raíces e inversiones",
    lead: "Acompañamiento en compra, venta e inversión inmobiliaria para reducir riesgos, anticipar objeciones y cerrar con criterio.",
    bullets: [
      "Acompañamiento en inversiones y compras con estrategia",
      "Validación de documentación y riesgos antes de firmar",
      "Negociación y acompañamiento en el proceso"
    ]
  },

  properties: {
    headline: "Edificios y propiedades",
    lead: "Seleccione una propiedad para ver su galería (4 imágenes) y solicitar información por WhatsApp.",
    cta: "Solicitar información por WhatsApp",

    // 11 propiedades (placeholders). Cada item:
    // - building: nombre del edificio (para segmentar)
    // - image: portada
    // - images: 4 imágenes (portada + 3)
    // - highlights: detalles clave (los reemplazas luego)
items: [
  {
    id: "prop-01",
    building: "Costa del Este",
    title: "Proyectos nuevos en Costa del Este",
    priceFrom: "Desde $255,000",
    location: "Costa del Este, Ciudad de Panamá",
    tags: ["Proyecto nuevo", "Costa del Este"],
    image: "/images/properties/prop-01-cover.jpg",
    images: [
      "/images/properties/prop-01-cover.jpg",
      "/images/properties/prop-01-2.jpg",
      "/images/properties/prop-01-3.jpg",
      "/images/properties/prop-01-4.jpg"
    ],
    highlights: ["Metraje desde 53 m²", "Proyectos nuevos", "Solicite disponibilidad"]
  },
  {
    id: "prop-02",
    building: "Playa",
    title: "Proyectos estilo Resort en playa (a 10 minutos de la ciudad)",
    priceFrom: "Desde $448,000",
    location: "Playa (a 10 minutos de la ciudad), Panamá",
    tags: ["Resort", "Vista al mar", "Playa"],
    image: "/images/properties/prop-02-cover.jpg",
    images: [
      "/images/properties/prop-02-cover.jpg",
      "/images/properties/prop-02-2.jpg",
      "/images/properties/prop-02-3.jpg",
      "/images/properties/prop-02-4.jpg"
    ],
    highlights: ["Vista al mar", "Metrajes: 80 m² y 128 m²", "Estilo resort"]
  },
  {
    id: "prop-03",
    building: "Costa del Este",
    title: "Apartamentos nuevos en Costa del Este (primera línea de mar)",
    priceFrom: "Desde $278,000",
    location: "Costa del Este, primera línea de mar",
    tags: ["Primera línea", "Costa del Este", "Nuevo"],
    image: "/images/properties/prop-03-cover.jpg",
    images: [
      "/images/properties/prop-03-cover.jpg",
      "/images/properties/prop-03-2.jpg",
      "/images/properties/prop-03-3.jpg",
      "/images/properties/prop-03-4.jpg"
    ],
    highlights: ["Metraje desde 72 m²", "Primera línea de mar", "Futura entrega"]
  },
  {
    id: "prop-04",
    building: "Bella Vista",
    title: "Apartamentos de rentas cortas con licencia hotelera en Bella Vista",
    priceFrom: "Desde $200,000",
    location: "Bella Vista, Ciudad de Panamá",
    tags: ["Rentas cortas", "Licencia hotelera", "Inversión"],
    image: "/images/properties/prop-04-cover.jpg",
    images: [
      "/images/properties/prop-04-cover.jpg",
      "/images/properties/prop-04-2.jpg",
      "/images/properties/prop-04-3.jpg",
      "/images/properties/prop-04-4.jpg"
    ],
    highlights: ["Metraje desde 40 m²", "Futura entrega", "Solo quedan 10 unidades"]
  },
  {
    id: "prop-05",
    building: "Avenida Balboa",
    title: "Apartamentos de lujo en Avenida Balboa",
    priceFrom: "Desde $316,000",
    location: "Avenida Balboa, Ciudad de Panamá",
    tags: ["Lujo", "Avenida Balboa"],
    image: "/images/properties/prop-05-cover.jpg",
    images: [
      "/images/properties/prop-05-cover.jpg",
      "/images/properties/prop-05-2.jpg",
      "/images/properties/prop-05-3.jpg",
      "/images/properties/prop-05-4.jpg"
    ],
    highlights: ["Proyecto de lujo", "Ubicación premium", "Futura entrega"]
  },
  {
    id: "prop-06",
    building: "Costa del Este",
    title: "Apartamentos luxury de lujo en Costa del Este",
    priceFrom: "Desde $650,000",
    location: "Costa del Este, Ciudad de Panamá",
    tags: ["Luxury", "Costa del Este", "Lujo"],
    image: "/images/properties/prop-06-cover.jpg",
    images: [
      "/images/properties/prop-06-cover.jpg",
      "/images/properties/prop-06-2.jpg",
      "/images/properties/prop-06-3.jpg",
      "/images/properties/prop-06-4.jpg"
    ],
    highlights: ["Amenidades de lujo", "Proyecto premium", "Solicite disponibilidad"]
  },
  {
    id: "prop-07",
    building: "Playa",
    title: "Apartamentos de playa",
    priceFrom: "Desde $1,267,000",
    location: "Playa, Panamá",
    tags: ["Playa", "Lujo", "Amplio"],
    image: "/images/properties/prop-07-cover.jpg",
    images: [
      "/images/properties/prop-07-cover.jpg",
      "/images/properties/prop-07-2.jpg",
      "/images/properties/prop-07-3.jpg",
      "/images/properties/prop-07-4.jpg"
    ],
    highlights: ["Metraje desde 304 m²", "Proyecto de playa", "Solicite disponibilidad"]
  },
  {
    id: "prop-08",
    building: "Playa Venao",
    title: "Apartamentos de lujo en Playa Venao",
    priceFrom: "Desde $525,000",
    location: "Playa Venao, Panamá",
    tags: ["Playa Venao", "Lujo"],
    image: "/images/properties/prop-08-cover.jpg",
    images: [
      "/images/properties/prop-08-cover.jpg",
      "/images/properties/prop-08-2.jpg",
      "/images/properties/prop-08-3.jpg",
      "/images/properties/prop-08-4.jpg"
    ],
    highlights: ["Metraje desde 101 m²", "Proyecto de lujo", "Solicite disponibilidad"]
  },
  {
    id: "prop-09",
    building: "Amador",
    title: "Apartamentos de rentas cortas en Amador (primera línea de mar)",
    priceFrom: "Desde $140,000",
    location: "Amador, primera línea de mar",
    tags: ["Rentas cortas", "Inversión", "Primera línea"],
    image: "/images/properties/prop-09-cover.jpg",
    images: [
      "/images/properties/prop-09-cover.jpg",
      "/images/properties/prop-09-2.jpg",
      "/images/properties/prop-09-3.jpg",
      "/images/properties/prop-09-4.jpg"
    ],
    highlights: ["Retorno ~9% (aprox.)", "Amenidades de lujo", "Primera línea de mar"]
  },
  {
    id: "prop-10",
    building: "Centro de Panamá",
    title: "Apartamentos de rentas cortas en el centro de Panamá",
    priceFrom: "Desde $165,000",
    location: "Centro de Panamá, Ciudad de Panamá",
    tags: ["Rentas cortas", "Facilidades de pago", "Inversión"],
    image: "/images/properties/prop-10-cover.jpg",
    images: [
      "/images/properties/prop-10-cover.jpg",
      "/images/properties/prop-10-2.jpg",
      "/images/properties/prop-10-3.jpg",
      "/images/properties/prop-10-4.jpg"
    ],
    highlights: ["Facilidades de pago", "Amenidades de lujo", "Rentas cortas"]
  },
  {
    id: "prop-11",
    building: "Avenida Balboa",
    title: "Apartamentos de rentas cortas en Avenida Balboa",
    priceFrom: "Desde $186,000",
    location: "Avenida Balboa, Ciudad de Panamá",
    tags: ["Rentas cortas", "Avenida Balboa"],
    image: "/images/properties/prop-11-cover.jpg",
    images: [
      "/images/properties/prop-11-cover.jpg",
      "/images/properties/prop-11-2.jpg",
      "/images/properties/prop-11-3.jpg",
      "/images/properties/prop-11-4.jpg"
    ],
    highlights: ["Metraje desde 45 m²", "A pasos de Avenida Balboa", "Rentas cortas"]
  }
]

  },

  contact: {
    headline: "Contacto",
    lead: "Gracias por su interés. Será atendido lo más pronto posible.",
    consent: "Al enviar, acepta ser contactado para coordinar su asesoría. No compartimos su información.",
    submit: "Enviar a WhatsApp"
  },

  footer: {
    close: "Gracias por preferirnos. Sus derechos y su patrimonio estarán protegidos."
  }
};
