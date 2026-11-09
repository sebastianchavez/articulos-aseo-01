/* =========================================================
   data.js — Datos mockeados de la tienda Aseo+
   ========================================================= */

window.AseoData = (function () {

  const categories = [
    { id: 'limpieza-hogar',  name: 'Limpieza del Hogar',  icon: '🧴', color: 'emerald', description: 'Productos multiusos, limpiavidrios y más.' },
    { id: 'lavanderia',      name: 'Lavandería',          icon: '👕', color: 'sky',     description: 'Detergentes, suavizantes y quitamanchas.' },
    { id: 'cocina',          name: 'Cocina',              icon: '🍽️', color: 'amber',   description: 'Lavalozas, desengrasantes y limpiadores.' },
    { id: 'bano',            name: 'Baño',                icon: '🛁', color: 'cyan',    description: 'Antihongos, limpiadores de WC y sanitario.' },
    { id: 'pisos',           name: 'Pisos',               icon: '🧹', color: 'lime',    description: 'Ceras, limpiadores y abrillantadores.' },
    { id: 'desinfectantes',  name: 'Desinfectantes',      icon: '🧪', color: 'rose',    description: 'Desinfectantes y sanitizantes.' },
    { id: 'escobas',         name: 'Escobas y Trapeadores', icon: '🧺', color: 'teal',  description: 'Escobas, mops, traperos y paños.' },
    { id: 'bolsas',          name: 'Bolsas y Desechables', icon: '🛍️', color: 'orange', description: 'Bolsas de basura y artículos desechables.' }
  ];

  const products = [
    // Limpieza del Hogar
    { id: 'p001', name: 'Limpiador Multiuso 1L', slug: 'limpiador-multiuso-1l', categoryId: 'limpieza-hogar',
      description: 'Limpiador multiuso concentrado que elimina grasa, polvo y manchas en todo tipo de superficies. Agradable aroma a lavanda.',
      descriptionCorta: 'Limpiador multiuso aroma lavanda, 1 litro.',
      precioDetalle: 3490, precioMayor: 2390, mayorMinimo: 6,
      imagen: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&q=80',
                'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
                'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80'],
      stock: 120, rating: 4.6, reviewsCount: 32, badge: 'Más vendido', featured: true },
    { id: 'p002', name: 'Limpiador de Vidrios 500ml', slug: 'limpiador-vidrios-500ml', categoryId: 'limpieza-hogar',
      description: 'Limpiador de vidrios y cristales que no deja rayas. Fórmula con amoníaco para un brillo perfecto.',
      descriptionCorta: 'Limpiador de vidrios sin rayas, 500ml.',
      precioDetalle: 2990, precioMayor: 1990, mayorMinimo: 12,
      imagen: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=80'],
      stock: 80, rating: 4.4, reviewsCount: 18, featured: false },
    { id: 'p003', name: 'Limpiador en Aerosol 400ml', slug: 'limpiador-aerosol-400ml', categoryId: 'limpieza-hogar',
      description: 'Aerosol multiusos para superficies difíciles. Práctico envase para zonas de difícil acceso.',
      descriptionCorta: 'Aerosol multiusos 400ml con gatillo.',
      precioDetalle: 4490, precioMayor: 3190, mayorMinimo: 6,
      imagen: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&q=80'],
      stock: 50, rating: 4.2, reviewsCount: 9, badge: 'Nuevo', featured: false },

    // Lavandería
    { id: 'p004', name: 'Detergente Líquido 3L', slug: 'detergente-liquido-3l', categoryId: 'lavanderia',
      description: 'Detergente líquido concentrado para todo tipo de ropa. Elimina manchas difíciles dejando un fresco aroma.',
      descriptionCorta: 'Detergente concentrado para ropa, 3 litros.',
      precioDetalle: 8990, precioMayor: 6990, mayorMinimo: 4,
      imagen: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=800&q=80',
                'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&q=80'],
      stock: 200, rating: 4.8, reviewsCount: 54, badge: 'Más vendido', featured: true },
    { id: 'p005', name: 'Detergente en Polvo 5kg', slug: 'detergente-polvo-5kg', categoryId: 'lavanderia',
      description: 'Detergente en polvo de alto rendimiento. Ideal para lavado a máquina y ropa muy sucia.',
      descriptionCorta: 'Detergente en polvo 5 kilos, alto rendimiento.',
      precioDetalle: 11990, precioMayor: 8990, mayorMinimo: 4,
      imagen: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800&q=80'],
      stock: 90, rating: 4.5, reviewsCount: 27, featured: true },
    { id: 'p006', name: 'Suavizante 1L', slug: 'suavizante-1l', categoryId: 'lavanderia',
      description: 'Suavizante concentrado que deja la ropa suave y con un aroma duradero. Rinde hasta 40 lavados.',
      descriptionCorta: 'Suavizante concentrado aroma floral, 1L.',
      precioDetalle: 4990, precioMayor: 3490, mayorMinimo: 6,
      imagen: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=800&q=80'],
      stock: 110, rating: 4.7, reviewsCount: 41, featured: false },
    { id: 'p007', name: 'Quitamanchas 500ml', slug: 'quitamanchas-500ml', categoryId: 'lavanderia',
      description: 'Quitamanchas en spray para tratar zonas difíciles antes del lavado. Eficaz contra grasa, vino y hierba.',
      descriptionCorta: 'Spray quitamanchas pre-lavado, 500ml.',
      precioDetalle: 3990, precioMayor: 2790, mayorMinimo: 6,
      imagen: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80'],
      stock: 75, rating: 4.3, reviewsCount: 15, featured: false },

    // Cocina
    { id: 'p008', name: 'Lavalozas Concentrado 750ml', slug: 'lavalozas-750ml', categoryId: 'cocina',
      description: 'Líquido concentrados para lavar platos. Corta la grasa con poca cantidad.',
      descriptionCorta: 'Lavalozas concentrado limón, 750ml.',
      precioDetalle: 2990, precioMayor: 1990, mayorMinimo: 12,
      imagen: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&q=80'],
      stock: 180, rating: 4.5, reviewsCount: 36, badge: 'Más vendido', featured: true },
    { id: 'p009', name: 'Desengrasante de Cocina 500ml', slug: 'desengrasante-cocina-500ml', categoryId: 'cocina',
      description: 'Desengrasante potente para campanas, hornos y superficies de cocina. Remueve grasa acumulada.',
      descriptionCorta: 'Desengrasante potente, 500ml con atomizador.',
      precioDetalle: 3490, precioMayor: 2390, mayorMinimo: 6,
      imagen: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80'],
      stock: 100, rating: 4.6, reviewsCount: 22, featured: false },
    { id: 'p010', name: 'Esponjas Multiuso x6', slug: 'esponjas-multiuso-x6', categoryId: 'cocina',
      description: 'Pack de 6 esponjas multiuso con fibra abrasiva. Ideales para vajilla y superficies de cocina.',
      descriptionCorta: 'Pack 6 esponjas con fibra verde.',
      precioDetalle: 1990, precioMayor: 1290, mayorMinimo: 24,
      imagen: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80'],
      stock: 300, rating: 4.4, reviewsCount: 19, featured: false },

    // Baño
    { id: 'p011', name: 'Limpiador de WC 750ml', slug: 'limpiador-wc-750ml', categoryId: 'bano',
      description: 'Limpiador para inodoros con acción profunda. Elimina gérmenes, sarro y deja fresco aroma.',
      descriptionCorta: 'Limpiador de WC con boquilla, 750ml.',
      precioDetalle: 3290, precioMayor: 2290, mayorMinimo: 6,
      imagen: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&q=80'],
      stock: 130, rating: 4.5, reviewsCount: 28, featured: false },
    { id: 'p012', name: 'Antihongos 500ml', slug: 'antihongos-500ml', categoryId: 'bano',
      description: 'Antihongos con cloro activo para juntas, azulejos y zonas húmedas.',
      descriptionCorta: 'Antihongos con cloro activo, 500ml.',
      precioDetalle: 3890, precioMayor: 2690, mayorMinimo: 6,
      imagen: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80'],
      stock: 85, rating: 4.3, reviewsCount: 14, featured: false },
    { id: 'p013', name: 'Pastillas WC x4', slug: 'pastillas-wc-x4', categoryId: 'bano',
      description: 'Pastillas limpiadoras para el estanque del inodoro. Acción continua con cada descarga.',
      descriptionCorta: 'Pack 4 pastillas WC aromatizantes.',
      precioDetalle: 2490, precioMayor: 1690, mayorMinimo: 12,
      imagen: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80'],
      stock: 200, rating: 4.2, reviewsCount: 11, featured: false },

    // Pisos
    { id: 'p014', name: 'Limpiador de Pisos 1L', slug: 'limpiador-pisos-1l', categoryId: 'pisos',
      description: 'Limpiador líquido para todo tipo de pisos. Aroma intenso y secado rápido.',
      descriptionCorta: 'Limpiador de pisos aroma pino, 1L.',
      precioDetalle: 3290, precioMayor: 2190, mayorMinimo: 6,
      imagen: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80'],
      stock: 150, rating: 4.5, reviewsCount: 24, featured: false },
    { id: 'p015', name: 'Cera Autobrillo 1L', slug: 'cera-autobrillo-1l', categoryId: 'pisos',
      description: 'Cera líquida autobrillo para pisos flotantes y madera. Brillo intenso sin necesidad de lustrar.',
      descriptionCorta: 'Cera autobrillo para madera, 1L.',
      precioDetalle: 5490, precioMayor: 3890, mayorMinimo: 4,
      imagen: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800&q=80'],
      stock: 70, rating: 4.7, reviewsCount: 33, badge: 'Oferta', featured: true },
    { id: 'p016', name: 'Abrillantador de Muebles 400ml', slug: 'abrillantador-muebles-400ml', categoryId: 'pisos',
      description: 'Aerosol abrillantador para muebles de madera. Protege y deja un aroma suave.',
      descriptionCorta: 'Abrillantador de muebles en aerosol, 400ml.',
      precioDetalle: 3990, precioMayor: 2790, mayorMinimo: 6,
      imagen: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&q=80'],
      stock: 95, rating: 4.4, reviewsCount: 17, featured: false },

    // Desinfectantes
    { id: 'p017', name: 'Desinfectante en Spray 1L', slug: 'desinfectante-spray-1l', categoryId: 'desinfectantes',
      description: 'Desinfectante multiusos que elimina el 99.9% de gérmenes. Ideal para superficies y objetos.',
      descriptionCorta: 'Desinfectante multiusos 1L.',
      precioDetalle: 5490, precioMayor: 3890, mayorMinimo: 4,
      imagen: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80'],
      stock: 160, rating: 4.8, reviewsCount: 47, badge: 'Más vendido', featured: true },
    { id: 'p018', name: 'Gel Antibacterial 500ml', slug: 'gel-antibacterial-500ml', categoryId: 'desinfectantes',
      description: 'Gel antibacterial para manos. Sin enjuague, con 70% de alcohol.',
      descriptionCorta: 'Gel antibacterial manos 500ml.',
      precioDetalle: 3290, precioMayor: 2190, mayorMinimo: 12,
      imagen: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&q=80'],
      stock: 220, rating: 4.6, reviewsCount: 38, featured: true },
    { id: 'p019', name: 'Toallas Desinfectantes x80', slug: 'toallas-desinfectantes-x80', categoryId: 'desinfectantes',
      description: 'Toallas húmedas desinfectantes para superficies. Prácticas y desechables.',
      descriptionCorta: 'Pack 80 toallas desinfectantes.',
      precioDetalle: 3990, precioMayor: 2790, mayorMinimo: 6,
      imagen: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80'],
      stock: 140, rating: 4.5, reviewsCount: 21, badge: 'Nuevo', featured: false },
    { id: 'p020', name: 'Cloro Concentrado 2L', slug: 'cloro-concentrado-2l', categoryId: 'desinfectantes',
      description: 'Cloro concentrado para desinfección profunda y blanqueo. Dilución rendidora.',
      descriptionCorta: 'Cloro concentrado 2 litros.',
      precioDetalle: 2990, precioMayor: 1990, mayorMinimo: 6,
      imagen: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80'],
      stock: 240, rating: 4.4, reviewsCount: 29, featured: false },

    // Escobas y Trapeadores
    { id: 'p021', name: 'Set Escoba + Pala', slug: 'set-escoba-pala', categoryId: 'escobas',
      description: 'Set de escoba y recogedor con mango largo. Cerdas resistentes para interiores y exteriores.',
      descriptionCorta: 'Set escoba + pala con mango.',
      precioDetalle: 5990, precioMayor: 4290, mayorMinimo: 6,
      imagen: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=800&q=80'],
      stock: 90, rating: 4.6, reviewsCount: 26, featured: true },
    { id: 'p022', name: 'Mopa Microfibra Giratoria', slug: 'mopa-microfibra-giratoria', categoryId: 'escobas',
      description: 'Mopa con mango giratorio 360° y repuesto de microfibra. Incluye balde exprimidor.',
      descriptionCorta: 'Mopa giratoria con balde.',
      precioDetalle: 14990, precioMayor: 11990, mayorMinimo: 4,
      imagen: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80'],
      stock: 35, rating: 4.7, reviewsCount: 18, badge: 'Oferta', featured: false },
    { id: 'p023', name: 'Paño Microfibra x5', slug: 'pano-microfibra-x5', categoryId: 'escobas',
      description: 'Pack de 5 paños de microfibra multiusos. Reutilizables y lavables.',
      descriptionCorta: 'Pack 5 paños microfibra.',
      precioDetalle: 3490, precioMayor: 2390, mayorMinimo: 12,
      imagen: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&q=80'],
      stock: 200, rating: 4.5, reviewsCount: 22, featured: false },
    { id: 'p024', name: 'Escobillón WC con Base', slug: 'escobillon-wc-con-base', categoryId: 'escobas',
      description: 'Escobilla para WC con cerdas firmes y base para escurrir.',
      descriptionCorta: 'Escobillón WC con base.',
      precioDetalle: 2490, precioMayor: 1690, mayorMinimo: 12,
      imagen: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&q=80'],
      stock: 180, rating: 4.3, reviewsCount: 13, featured: false },

    // Bolsas y Desechables
    { id: 'p025', name: 'Bolsas de Basura 50L x20', slug: 'bolsas-basura-50l-x20', categoryId: 'bolsas',
      description: 'Bolsas de basura 50 litros, pack de 20 unidades. Resistentes y con cierre.',
      descriptionCorta: 'Bolsas de basura 50L pack x20.',
      precioDetalle: 2990, precioMayor: 1990, mayorMinimo: 12,
      imagen: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80'],
      stock: 300, rating: 4.6, reviewsCount: 31, badge: 'Más vendido', featured: true },
    { id: 'p026', name: 'Bolsas de Basura 100L x10', slug: 'bolsas-basura-100l-x10', categoryId: 'bolsas',
      description: 'Bolsas de basura industriales 100 litros, pack de 10. Ideales para oficinas y locales.',
      descriptionCorta: 'Bolsas industriales 100L pack x10.',
      precioDetalle: 3490, precioMayor: 2390, mayorMinimo: 12,
      imagen: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800&q=80'],
      stock: 220, rating: 4.5, reviewsCount: 19, featured: false },
    { id: 'p027', name: 'Guantes de Latex x10', slug: 'guantes-latex-x10', categoryId: 'bolsas',
      description: 'Guantes de látex descartables, pack de 10 unidades. Talla M.',
      descriptionCorta: 'Guantes látex pack x10 talla M.',
      precioDetalle: 1990, precioMayor: 1290, mayorMinimo: 24,
      imagen: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&q=80'],
      stock: 280, rating: 4.2, reviewsCount: 14, featured: false },
    { id: 'p028', name: 'Papel Higiénico x4', slug: 'papel-higienico-x4', categoryId: 'bolsas',
      description: 'Pack de 4 rollos de papel higiénico doble hoja. Suave y resistente.',
      descriptionCorta: 'Pack 4 rollos papel higiénico.',
      precioDetalle: 2490, precioMayor: 1690, mayorMinimo: 24,
      imagen: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=600&q=80',
      galeria: ['https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=800&q=80'],
      stock: 350, rating: 4.4, reviewsCount: 16, featured: false }
  ];

  const team = [
    { id: 't1', name: 'Andrea Soto',     role: 'Fundadora & CEO',          bio: 'Emprendedora con 12 años de experiencia en el rubro de aseo profesional.', photo: 'https://i.pravatar.cc/300?img=47' },
    { id: 't2', name: 'Felipe Araya',    role: 'Gerente Comercial',        bio: 'Encargado de relaciones con empresas y grandes clientes mayoristas.',     photo: 'https://i.pravatar.cc/300?img=12' },
    { id: 't3', name: 'Camila Rivera',   role: 'Jefa de Logística',        bio: 'Coordina despachos a todo el país garantizando entregas a tiempo.',        photo: 'https://i.pravatar.cc/300?img=32' },
    { id: 't4', name: 'Rodrigo Pérez',   role: 'Atención al Cliente',      bio: 'Resolver tus dudas es su prioridad. Te acompaña por WhatsApp y email.',   photo: 'https://i.pravatar.cc/300?img=68' }
  ];

  // Reseñas pre-cargadas (sembradas en localStorage en primer uso)
  const seedReviews = [
    { id: 'r01', productId: 'p004', userName: 'María C.',  rating: 5, comment: 'Excelente detergente, deja la ropa muy limpia y con rico aroma. Lo compro siempre.', date: '2026-08-12' },
    { id: 'r02', productId: 'p004', userName: 'José R.',    rating: 5, comment: 'Para nuestro hotel es perfecto, gran rendimiento y precio mayorista.',   date: '2026-08-22' },
    { id: 'r03', productId: 'p004', userName: 'Carolina V.',rating: 4, comment: 'Buen producto, sólo que el envase es un poco incómodo.',                  date: '2026-09-01' },
    { id: 'r04', productId: 'p017', userName: 'Pedro M.',   rating: 5, comment: 'Desinfecta muy bien y deja un aroma fresco.',                            date: '2026-07-18' },
    { id: 'r05', productId: 'p017', userName: 'Ana L.',     rating: 5, comment: 'Lo uso para todo en casa, muy conforme.',                                  date: '2026-08-30' },
    { id: 'r06', productId: 'p017', userName: 'Luis O.',    rating: 4, comment: 'Cumple su función. Recomendado.',                                          date: '2026-09-10' },
    { id: 'r07', productId: 'p001', userName: 'Sofía H.',   rating: 5, comment: 'El mejor multiuso que he probado. Saca manchas increíbles.',              date: '2026-08-05' },
    { id: 'r08', productId: 'p001', userName: 'Diego F.',   rating: 4, comment: 'Buen aroma y rendimiento.',                                              date: '2026-09-02' },
    { id: 'r09', productId: 'p018', userName: 'Valentina Q.',rating: 5, comment: 'No reseca las manos. Ideal para tenerlo en la entrada de la casa.',        date: '2026-08-18' },
    { id: 'r10', productId: 'p008', userName: 'Jorge P.',   rating: 5, comment: 'Corta la grasa con poca cantidad. Muy buen producto.',                    date: '2026-08-09' },
    { id: 'r11', productId: 'p008', userName: 'Camila S.',  rating: 4, comment: 'Rinde mucho. Recomendado.',                                               date: '2026-09-04' },
    { id: 'r12', productId: 'p025', userName: 'Felipe N.',  rating: 5, comment: 'Resistentes y buen precio. No se rompen.',                                date: '2026-08-25' },
    { id: 'r13', productId: 'p006', userName: 'Macarena B.',rating: 5, comment: 'Aroma delicioso y la ropa queda súper suave.',                            date: '2026-08-14' },
    { id: 'r14', productId: 'p015', userName: 'Tomás D.',   rating: 5, comment: 'Deja los pisos brillantes sin esfuerzo.',                                  date: '2026-09-06' },
    { id: 'r15', productId: 'p021', userName: 'Isidora G.', rating: 5, comment: 'Escoba de buena calidad, las cerdas no se doblan.',                       date: '2026-08-28' },
    { id: 'r16', productId: 'p010', userName: 'Benjamín T.',rating: 4, comment: 'Cumplen su función. Buena relación precio/calidad.',                       date: '2026-09-08' },
    { id: 'r17', productId: 'p022', userName: 'Paula U.',   rating: 5, comment: 'La mopa giratoria cambió mi vida. Muy práctica.',                         date: '2026-08-19' },
    { id: 'r18', productId: 'p018', userName: 'Esteban W.', rating: 5, comment: 'Excelente gel antibacterial. Recomendado para la oficina.',                date: '2026-09-11' }
  ];

  // Pedidos pre-cargados del usuario demo
  const seedOrders = [
    {
      id: 'ASO-1001', userId: 'demo@aseo.cl',
      fecha: '2026-09-01',
      items: [
        { productId: 'p004', nombre: 'Detergente Líquido 3L', imagen: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=200&q=80', precioUnitario: 8990, cantidad: 2, tipoVenta: 'detalle' },
        { productId: 'p017', nombre: 'Desinfectante en Spray 1L', imagen: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&q=80', precioUnitario: 5490, cantidad: 1, tipoVenta: 'detalle' }
      ],
      subtotal: 23470, envio: 2990, total: 26460,
      direccion: { nombre: 'Cliente Demo', calle: 'Av. Principal 1234', ciudad: 'Santiago', region: 'RM', codigoPostal: '8320000', telefono: '+56 9 1234 5678', notas: '' },
      envioTipo: { id: 'estandar', nombre: 'Estándar (3-5 días)', precio: 2990 },
      pagoTipo:    { id: 'tarjeta',  nombre: 'Tarjeta de crédito',  detalle: 'Visa •••• 4242' },
      estado: 'Entregado'
    },
    {
      id: 'ASO-1002', userId: 'demo@aseo.cl',
      fecha: '2026-09-15',
      items: [
        { productId: 'p008', nombre: 'Lavalozas Concentrado 750ml', imagen: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=200&q=80', precioUnitario: 1990, cantidad: 12, tipoVenta: 'mayorista' },
        { productId: 'p001', nombre: 'Limpiador Multiuso 1L', imagen: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=200&q=80', precioUnitario: 2390, cantidad: 6, tipoVenta: 'mayorista' }
      ],
      subtotal: 38220, envio: 3990, total: 42210,
      direccion: { nombre: 'Cliente Demo', calle: 'Av. Principal 1234', ciudad: 'Santiago', region: 'RM', codigoPostal: '8320000', telefono: '+56 9 1234 5678', notas: 'Dejar en conserjería' },
      envioTipo: { id: 'express', nombre: 'Express (24-48h)', precio: 3990 },
      pagoTipo:    { id: 'transferencia', nombre: 'Transferencia bancaria', detalle: 'Banco Estado' },
      estado: 'En camino'
    },
    {
      id: 'ASO-1003', userId: 'demo@aseo.cl',
      fecha: '2026-09-20',
      items: [
        { productId: 'p018', nombre: 'Gel Antibacterial 500ml', imagen: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=200&q=80', precioUnitario: 3290, cantidad: 3, tipoVenta: 'detalle' }
      ],
      subtotal: 9870, envio: 2990, total: 12860,
      direccion: { nombre: 'Cliente Demo', calle: 'Av. Principal 1234', ciudad: 'Santiago', region: 'RM', codigoPostal: '8320000', telefono: '+56 9 1234 5678', notas: '' },
      envioTipo: { id: 'estandar', nombre: 'Estándar (3-5 días)', precio: 2990 },
      pagoTipo:    { id: 'tarjeta',  nombre: 'Tarjeta de débito',   detalle: 'Mastercard •••• 1111' },
      estado: 'Preparando'
    }
  ];

  const envios = [
    { id: 'estandar', nombre: 'Estándar',         descripcion: '3-5 días hábiles', precio: 2990 },
    { id: 'express',  nombre: 'Express',          descripcion: '24-48 horas',      precio: 4990 },
    { id: 'recogida', nombre: 'Recogida en tienda', descripcion: 'Sin costo, retira en local', precio: 0 }
  ];

  const pagos = [
    { id: 'tarjeta',       nombre: 'Tarjeta de crédito/débito', icono: '💳' },
    { id: 'paypal',        nombre: 'PayPal',                    icono: '🅿️' },
    { id: 'transferencia', nombre: 'Transferencia bancaria',    icono: '🏦' },
    { id: 'contraentrega', nombre: 'Contraentrega',             icono: '💵' }
  ];

  return {
    categories, products, team, seedReviews, seedOrders, envios, pagos,
    getCategoryById: (id) => categories.find(c => c.id === id),
    getProductById: (id) => products.find(p => p.id === id),
    getFeaturedProducts: () => products.filter(p => p.featured),
    getProductsByCategory: (catId) => products.filter(p => p.categoryId === catId),
    getRelatedProducts: (productId, limit = 4) => {
      const p = products.find(x => x.id === productId);
      if (!p) return [];
      return products.filter(x => x.categoryId === p.categoryId && x.id !== productId).slice(0, limit);
    }
  };
})();
