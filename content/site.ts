export const site = {
  brand: "Enis Caicedo",
  tagline: "Soluciones Legales e Inmobiliarias en Panamá",
  locationLine: "Avenida Balboa, edificio BOC, Balboa Office Center, piso 34, oficina 3422",

  // ✅ Logo (lo usaremos en Header cuando me pegues Header.tsx)
  logo: "/images/logo.png",

  // WhatsApp oficial (E.164)
  whatsapp: "+50763782755",

  email: "contacto@tudominio.com",
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

    // ✅ Hooks del PDF (Ganchos por rama del derecho)
    hooks: {
      "Familia": "Protegemos a tu familia y tus derechos cuando más lo necesitas.",
      "Penal": "Tu libertad merece una defensa penal seria, estratégica y profesional.",
      "Civil": "Evita conflictos legales y protege tu patrimonio con asesoría civil experta.",
      "Corporativo": "Estructuramos y protegemos legalmente tu empresa desde el primer paso.",
      "Migración": "Regulariza tu estatus migratorio en Panamá con respaldo legal confiable.",
      "Marítimo": "Soluciones legales especializadas para el sector marítimo y portuario.",
      "Comercial": "Protegemos tus relaciones comerciales y tus intereses económicos.",
      "Asesoría a inversionistas": "Invertir con respaldo legal es invertir con seguridad."
    },

    note: "No se atienden delitos de violación ni homicidios dolosos."
  },

  realestate: {
    headline: "Bienes raíces e inversiones",
    lead: "Acompañamiento en compra, venta e inversión inmobiliaria para reducir riesgos, anticipar objeciones y cerrar con criterio.",
    bullets: [
      "Acompañamiento en inversiones y compras con estrategia",
      "Validación de documentación y riesgos antes de firmar",
      "Negociación y acompañamiento en el proceso"
    ],

    // ✅ Hooks del PDF (Asesoría a Inversionistas)
    hooks: {
      "Acompañamiento en inversiones y compras con estrategia":
        "Tomar buenas decisiones hoy protege su capital a largo plazo.",
      "Validación de documentación y riesgos antes de firmar":
        "Revisamos cada detalle legal antes de que asuma un compromiso.",
      "Negociación y acompañamiento en el proceso":
        "Defendemos sus intereses durante cada etapa de la negociación."
    }
  },

  properties: {
    headline: "Apartamentos y Lotes",
    lead: "Seleccione una opción para ver su galería (4 imágenes) y solicitar información por WhatsApp.",
    cta: "Solicitar información por WhatsApp",

    items: [
      {
        id: "prop-01",
        building: "Costa del Este",
        title: "Apartamentos nuevos en Costa del Este",
        priceFrom: "Desde $255,000",
        location: "Costa del Este, Ciudad de Panamá",
        tags: ["Apartamento", "Costa del Este"],
        image: "/images/properties/prop-01-cover.jpg",
        images: [
          "/images/properties/prop-01-cover.jpg",
          "/images/properties/prop-01-2.jpg",
          "/images/properties/prop-01-3.jpg",
          "/images/properties/prop-01-4.jpg"
        ],
        highlights: ["Metraje desde 53 m²", "Proyecto nuevo", "Solicite disponibilidad"]
      },
      {
        id: "prop-02",
        building: "Playa",
        title: "Apartamentos estilo Resort en playa (a 10 minutos de la ciudad)",
        priceFrom: "Desde $448,000",
        location: "Playa (a 10 minutos de la ciudad), Panamá",
        tags: ["Apartamento", "Vista al mar", "Playa"],
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
        tags: ["Apartamento", "Primera línea", "Nuevo"],
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
        tags: ["Apartamento", "Rentas cortas", "Inversión"],
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
        tags: ["Apartamento", "Lujo", "Avenida Balboa"],
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
        tags: ["Apartamento", "Luxury", "Lujo"],
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
        tags: ["Apartamento", "Playa", "Lujo"],
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
        tags: ["Apartamento", "Playa Venao", "Lujo"],
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
        tags: ["Apartamento", "Rentas cortas", "Inversión"],
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
        tags: ["Apartamento", "Rentas cortas", "Inversión"],
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
        tags: ["Apartamento", "Rentas cortas", "Avenida Balboa"],
        image: "/images/properties/prop-11-cover.jpg",
        images: [
          "/images/properties/prop-11-cover.jpg",
          "/images/properties/prop-11-2.jpg",
          "/images/properties/prop-11-3.jpg",
          "/images/properties/prop-11-4.jpg"
        ],
        highlights: ["Metraje desde 45 m²", "A pasos de Avenida Balboa", "Rentas cortas"]
      }
    ],

    // ✅ NUEVO: LOTES (misma estructura para que reuse PropertyCard)
    lots: [
      {
        id: "lot-01",
        building: "Las Guías de Occidente",
        title: "Lote de 3,723 m² a orilla de calle (alto potencial)",
        priceFrom: "Consultar precio",
        location: "Las Guías de Occidente, Antón (Coclé)",
        tags: ["Lote", "Inversión", "Alto potencial"],
        image: "/images/lots/lot-01-cover.jpg",
        images: [
          "/images/lots/lot-01-cover.jpg",
          "/images/lots/lot-01-2.jpg",
          "/images/lots/lot-01-3.jpg",
          "/images/lots/lot-01-4.jpg"
        ],
        highlights: [
          "3,723 m² planos",
          "A orilla de calle y acceso inmediato a la vía principal",
          "Cerca de playas atractivas de la zona",
          "A minutos del Aeropuerto de Antón",
          "Área en crecimiento y desarrollo",
          "Ideal para proyecto comercial, turístico o residencial",
          "Ubicación premium, inversión segura"
        ]
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
