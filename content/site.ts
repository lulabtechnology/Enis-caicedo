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
        building: "PH (Edificio) — Avenida Balboa",
        title: "Apartamento 2 recámaras con vista",
        priceFrom: "Desde $325,000",
        location: "Avenida Balboa, Ciudad de Panamá",
        tags: ["Apartamento", "Vista"],
        image: "/images/properties/prop-01-cover.jpg",
        images: [
          "/images/properties/prop-01-cover.jpg",
          "/images/properties/prop-01-2.jpg",
          "/images/properties/prop-01-3.jpg",
          "/images/properties/prop-01-4.jpg"
        ],
        highlights: ["2 recámaras", "2 baños", "1 estacionamiento"]
      },
      {
        id: "prop-02",
        building: "PH (Edificio) — Avenida Balboa",
        title: "Apartamento tipo inversión",
        priceFrom: "Desde $210,000",
        location: "Avenida Balboa, Ciudad de Panamá",
        tags: ["Apartamento", "Inversión"],
        image: "/images/properties/prop-02-cover.jpg",
        images: [
          "/images/properties/prop-02-cover.jpg",
          "/images/properties/prop-02-2.jpg",
          "/images/properties/prop-02-3.jpg",
          "/images/properties/prop-02-4.jpg"
        ],
        highlights: ["1 recámara", "1 baño", "Amenidades"]
      },
      {
        id: "prop-03",
        building: "PH (Edificio) — Avenida Balboa",
        title: "Apartamento familiar amplio",
        priceFrom: "Desde $540,000",
        location: "Avenida Balboa, Ciudad de Panamá",
        tags: ["Apartamento", "Familia"],
        image: "/images/properties/prop-03-cover.jpg",
        images: [
          "/images/properties/prop-03-cover.jpg",
          "/images/properties/prop-03-2.jpg",
          "/images/properties/prop-03-3.jpg",
          "/images/properties/prop-03-4.jpg"
        ],
        highlights: ["3 recámaras", "3 baños", "Balcón"]
      },

      {
        id: "prop-04",
        building: "PH (Edificio) — Costa del Este",
        title: "Apartamento moderno",
        priceFrom: "Desde $295,000",
        location: "Costa del Este, Ciudad de Panamá",
        tags: ["Apartamento", "Moderno"],
        image: "/images/properties/prop-04-cover.jpg",
        images: [
          "/images/properties/prop-04-cover.jpg",
          "/images/properties/prop-04-2.jpg",
          "/images/properties/prop-04-3.jpg",
          "/images/properties/prop-04-4.jpg"
        ],
        highlights: ["2 recámaras", "2 baños", "Área social"]
      },
      {
        id: "prop-05",
        building: "PH (Edificio) — Costa del Este",
        title: "Apartamento con amenidades completas",
        priceFrom: "Desde $360,000",
        location: "Costa del Este, Ciudad de Panamá",
        tags: ["Apartamento", "Amenidades"],
        image: "/images/properties/prop-05-cover.jpg",
        images: [
          "/images/properties/prop-05-cover.jpg",
          "/images/properties/prop-05-2.jpg",
          "/images/properties/prop-05-3.jpg",
          "/images/properties/prop-05-4.jpg"
        ],
        highlights: ["2 recámaras", "2.5 baños", "Depósito"]
      },
      {
        id: "prop-06",
        building: "PH (Edificio) — Costa del Este",
        title: "Apartamento premium",
        priceFrom: "Desde $490,000",
        location: "Costa del Este, Ciudad de Panamá",
        tags: ["Apartamento", "Premium"],
        image: "/images/properties/prop-06-cover.jpg",
        images: [
          "/images/properties/prop-06-cover.jpg",
          "/images/properties/prop-06-2.jpg",
          "/images/properties/prop-06-3.jpg",
          "/images/properties/prop-06-4.jpg"
        ],
        highlights: ["3 recámaras", "3 baños", "Vista"]
      },

      {
        id: "prop-07",
        building: "PH (Edificio) — San Francisco",
        title: "Apartamento céntrico",
        priceFrom: "Desde $180,000",
        location: "San Francisco, Ciudad de Panamá",
        tags: ["Apartamento", "Céntrico"],
        image: "/images/properties/prop-07-cover.jpg",
        images: [
          "/images/properties/prop-07-cover.jpg",
          "/images/properties/prop-07-2.jpg",
          "/images/properties/prop-07-3.jpg",
          "/images/properties/prop-07-4.jpg"
        ],
        highlights: ["1 recámara", "1 baño", "Cerca de todo"]
      },
      {
        id: "prop-08",
        building: "PH (Edificio) — San Francisco",
        title: "Apartamento ideal para familia",
        priceFrom: "Desde $260,000",
        location: "San Francisco, Ciudad de Panamá",
        tags: ["Apartamento", "Familia"],
        image: "/images/properties/prop-08-cover.jpg",
        images: [
          "/images/properties/prop-08-cover.jpg",
          "/images/properties/prop-08-2.jpg",
          "/images/properties/prop-08-3.jpg",
          "/images/properties/prop-08-4.jpg"
        ],
        highlights: ["2 recámaras", "2 baños", "Balcón"]
      },

      {
        id: "prop-09",
        building: "PH (Edificio) — Punta Pacífica",
        title: "Apartamento con vista",
        priceFrom: "Desde $410,000",
        location: "Punta Pacífica, Ciudad de Panamá",
        tags: ["Apartamento", "Vista"],
        image: "/images/properties/prop-09-cover.jpg",
        images: [
          "/images/properties/prop-09-cover.jpg",
          "/images/properties/prop-09-2.jpg",
          "/images/properties/prop-09-3.jpg",
          "/images/properties/prop-09-4.jpg"
        ],
        highlights: ["2 recámaras", "2 baños", "Amenidades"]
      },
      {
        id: "prop-10",
        building: "PH (Edificio) — Punta Pacífica",
        title: "Apartamento tipo lujo",
        priceFrom: "Desde $650,000",
        location: "Punta Pacífica, Ciudad de Panamá",
        tags: ["Apartamento", "Lujo"],
        image: "/images/properties/prop-10-cover.jpg",
        images: [
          "/images/properties/prop-10-cover.jpg",
          "/images/properties/prop-10-2.jpg",
          "/images/properties/prop-10-3.jpg",
          "/images/properties/prop-10-4.jpg"
        ],
        highlights: ["3 recámaras", "3.5 baños", "Vista al mar"]
      },

      {
        id: "prop-11",
        building: "PH (Edificio) — Área Bancaria",
        title: "Oficina lista para operar",
        priceFrom: "Desde $210,000",
        location: "Área Bancaria, Ciudad de Panamá",
        tags: ["Comercial", "Oficina"],
        image: "/images/properties/prop-11-cover.jpg",
        images: [
          "/images/properties/prop-11-cover.jpg",
          "/images/properties/prop-11-2.jpg",
          "/images/properties/prop-11-3.jpg",
          "/images/properties/prop-11-4.jpg"
        ],
        highlights: ["Lista para operar", "Ubicación estratégica", "Seguridad"]
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
