const mongoose = require('mongoose');
const Evento = require('./models/Evento');
const Asistente = require('./models/Asistente');

mongoose.connect('mongodb://mongodb:27017/eventos_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch((err) => console.error('❌ Error:', err));

const eventosData = [
  {
    nombre: 'Tech Summit 2026',
    descripcion: 'La cumbre tecnológica más importante de Latinoamérica',
    fecha: new Date('2026-03-18'),
    lugar: 'Centro de Convenciones Ágora Bogotá',
    capacidad: 800,
    categoria: 'Conferencia',
    tickets: [
      { tipo: 'General', precio: 180000, cantidad: 400, vendidos: 0 },
      { tipo: 'VIP', precio: 350000, cantidad: 200, vendidos: 0 },
      { tipo: 'Estudiante', precio: 90000, cantidad: 200, vendidos: 0, caracteristicas: { descuentoEstudiante: true } }
    ],
    promociones: [
      { 
        codigo: 'TECH2026', 
        descuento: 25, 
        fechaInicio: new Date('2026-01-01'), 
        fechaFin: new Date('2026-02-28'),
        activa: true
      }
    ],
    organizador: {
      nombre: 'Innovation Labs',
      contacto: '6012345678',
      email: 'info@innovationlabs.co'
    },
    estado: 'Programado'
  },
  {
    nombre: 'Festival Internacional de Jazz 2026',
    descripcion: '3 días de jazz con artistas internacionales',
    fecha: new Date('2026-05-20'),
    lugar: 'Teatro Jorge Eliécer Gaitán',
    capacidad: 1200,
    categoria: 'Concierto',
    tickets: [
      { tipo: 'Platea Preferencial', precio: 200000, cantidad: 300, vendidos: 0 },
      { tipo: 'Balcón', precio: 120000, cantidad: 500, vendidos: 0 },
      { tipo: 'General', precio: 80000, cantidad: 400, vendidos: 0 }
    ],
    promociones: [
      { 
        codigo: 'JAZZ3DIAS', 
        descuento: 30, 
        fechaInicio: new Date('2026-01-15'), 
        fechaFin: new Date('2026-04-30'),
        activa: true
      }
    ],
    extras: {
      artistas: ['Wynton Marsalis', 'Esperanza Spalding', 'Roberto Fonseca'],
      duracionHoras: 12,
      tipoMusica: 'Jazz'
    },
    estado: 'Programado'
  },
  {
    nombre: 'Maratón Medellín 2026',
    descripcion: 'Carrera internacional por las montañas de Medellín',
    fecha: new Date('2026-07-12'),
    lugar: 'Parque de los Pies Descalzos',
    capacidad: 3000,
    categoria: 'Deportivo',
    tickets: [
      { tipo: '5K', precio: 60000, cantidad: 1000, vendidos: 0 },
      { tipo: '10K', precio: 80000, cantidad: 1200, vendidos: 0 },
      { tipo: 'Maratón Completo', precio: 120000, cantidad: 800, vendidos: 0 }
    ],
    promociones: [ // Agregamos promoción para evitar null
      { 
        codigo: 'RUN2026', 
        descuento: 15, 
        fechaInicio: new Date('2026-01-01'), 
        fechaFin: new Date('2026-05-31'),
        activa: true
      }
    ],
    extras: {
      incluye: ['Kit deportivo', 'Medalla conmemorativa', 'Hidratación', 'Seguro médico'],
      tipoTerreno: 'Montañoso',
      elevacionMaxima: 1800
    },
    estado: 'Programado'
  },
  {
    nombre: 'Congreso de Inteligencia Artificial 2026',
    descripcion: 'Explorando el futuro de la IA y machine learning',
    fecha: new Date('2026-09-08'),
    lugar: 'Centro de Innovación Digital',
    capacidad: 600,
    categoria: 'Conferencia',
    tickets: [
      { tipo: 'Profesional', precio: 250000, cantidad: 300, vendidos: 0 },
      { tipo: 'Académico', precio: 150000, cantidad: 200, vendidos: 0 },
      { tipo: 'Estudiante Postgrado', precio: 100000, cantidad: 100, vendidos: 0 }
    ],
    promociones: [
      { 
        codigo: 'AI2026', 
        descuento: 20, 
        fechaInicio: new Date('2026-03-01'), 
        fechaFin: new Date('2026-06-30'),
        activa: true
      }
    ],
    organizador: {
      nombre: 'AI Colombia Foundation',
      contacto: '6019876543',
      email: 'contact@aicolombia.org'
    },
    estado: 'Programado'
  },
  {
    nombre: 'Feria Cultural Internacional 2026',
    descripcion: 'Celebración de la diversidad cultural mundial',
    fecha: new Date('2026-11-25'),
    lugar: 'Corferias Bogotá',
    capacidad: 2000,
    categoria: 'Cultural',
    tickets: [
      { tipo: 'Acceso General', precio: 50000, cantidad: 1000, vendidos: 0 },
      { tipo: 'Experiencia Premium', precio: 150000, cantidad: 600, vendidos: 0 },
      { tipo: 'Pase 3 Días', precio: 120000, cantidad: 400, vendidos: 0 }
    ],
    promociones: [
      { 
        codigo: 'CULTURA2026', 
        descuento: 10, 
        fechaInicio: new Date('2026-06-01'), 
        fechaFin: new Date('2026-10-31'),
        activa: true
      }
    ],
    extras: {
      paisesParticipantes: 25,
      talleresCulturales: true,
      gastronomiaInternacional: true
    },
    estado: 'Programado'
  },
  {
    nombre: 'Convención Anual de Ventas 2026',
    descripcion: 'Estrategias y herramientas para equipos de ventas',
    fecha: new Date('2026-10-15'),
    lugar: 'Hotel Grand Hyatt Bogotá',
    capacidad: 500,
    categoria: 'Corporativo',
    tickets: [
      { tipo: 'Ejecutivo', precio: 300000, cantidad: 200, vendidos: 0 },
      { tipo: 'Gerencial', precio: 450000, cantidad: 150, vendidos: 0 },
      { tipo: 'Directivo', precio: 600000, cantidad: 150, vendidos: 0 }
    ],
    promociones: [
      { 
        codigo: 'TEAM2026', 
        descuento: 15, 
        fechaInicio: new Date('2026-05-01'), 
        fechaFin: new Date('2026-08-31'),
        activa: true,
        condiciones: { minPersonas: 3 }
      }
    ],
    organizador: {
      nombre: 'SalesPro Consulting',
      contacto: '6015566778',
      email: 'events@salespro.com'
    },
    extras: {
      incluye: ['Material de trabajo', 'Certificación', 'Networking lunch'],
      enfoque: 'Ventas B2B'
    },
    estado: 'Programado'
  },
  {
    nombre: 'Exposición de Arte Contemporáneo',
    descripcion: 'Obras de artistas emergentes colombianos',
    fecha: new Date('2026-08-22'),
    lugar: 'Museo de Arte Moderno',
    capacidad: 400,
    categoria: 'Cultural',
    tickets: [
      { tipo: 'Entrada General', precio: 25000, cantidad: 300, vendidos: 0 },
      { tipo: 'Visita Guiada', precio: 50000, cantidad: 80, vendidos: 0 },
      { tipo: 'Taller + Exposición', precio: 80000, cantidad: 20, vendidos: 0 }
    ],
    promociones: [
      { 
        codigo: 'ARTE2026', 
        descuento: 20, 
        fechaInicio: new Date('2026-06-15'), 
        fechaFin: new Date('2026-08-15'),
        activa: true
      }
    ],
    extras: {
      artistasExpositores: 15,
      tecnicas: ['Pintura', 'Escultura', 'Fotografía', 'Instalación'],
      duracionExposicion: '2 meses'
    },
    estado: 'Programado'
  }
];

const asistentesData = [
  {
    nombre: 'Laura Mendoza',
    email: 'laura.mendoza@techcorp.com',
    telefono: '3201122334',
    documento: '1122334455',
    preferencias: {
      dietarias: ['Vegetariano'],
      intereses: ['Inteligencia Artificial', 'Blockchain', 'Realidad Virtual'],
      accesibilidad: 'Silla de ruedas'
    },
    empresa: 'TechCorp Solutions',
    cargo: 'CTO',
    datosAdicionales: {
      nivelSeniority: 'Executive',
      añosExperiencia: 15,
      alergias: ['Mariscos']
    },
    estado: 'Activo'
  },
  {
    nombre: 'David Ramirez',
    email: 'david.ramirez@musiclover.co',
    telefono: '3104455667',
    documento: '2233445566',
    preferencias: {
      intereses: ['Jazz', 'Blues', 'Música en vivo'],
      musical: ['Saxofón', 'Piano']
    },
    datosAdicionales: {
      instrumento: 'Saxofón',
      nivelMusical: 'Avanzado'
    },
    estado: 'Activo'
  },
  {
    nombre: 'Sofia Castro',
    email: 'sofia.castro@runner.org',
    telefono: '3157788990',
    documento: '3344556677',
    preferencias: {
      dietarias: ['Vegano', 'Sin lactosa'],
      intereses: ['Running', 'Triatlón', 'Nutrición deportiva']
    },
    datosAdicionales: {
      mejorTiempoMaraton: '3:45:00',
      grupoSanguineo: 'A+',
      contactoEmergencia: '3189900112'
    },
    estado: 'Activo'
  },
  {
    nombre: 'Miguel Torres',
    email: 'miguel.torres@ai-research.edu',
    telefono: '3180011223',
    documento: '4455667788',
    preferencias: {
      intereses: ['Machine Learning', 'Deep Learning', 'Computer Vision'],
      academicas: ['PhD', 'Investigación']
    },
    empresa: 'Universidad Nacional',
    cargo: 'Investigador Principal',
    datosAdicionales: {
      publicaciones: 25,
      areaEspecializacion: 'Redes Neuronales'
    },
    estado: 'Activo'
  },
  {
    nombre: 'Catalina Rojas',
    email: 'catalina.rojas@chefmaster.com',
    telefono: '3173344556',
    documento: '5566778899',
    preferencias: {
      dietarias: ['Pescetariano'],
      intereses: ['Cocina molecular', 'Repostería', 'Vinos']
    },
    empresa: 'Escuela de Gastronomía',
    cargo: 'Chef Instructora',
    datosAdicionales: {
      especialidad: 'Cocina fusión',
      añosExperiencia: 12,
      restaurantePropio: true
    },
    estado: 'Activo'
  },
  {
    nombre: 'Andrés López',
    email: 'andres.lopez@startup.co',
    telefono: '3196677889',
    documento: '6677889900',
    preferencias: {
      intereses: ['Emprendimiento', 'Fintech', 'Innovación']
    },
    empresa: 'Startup Colombia',
    cargo: 'CEO',
    datosAdicionales: {
      startupsFundadas: 3,
      inversionista: true,
      mentor: true
    },
    estado: 'Activo'
  }
];

async function seedDatabase() {
  try {
    // Limpiar colecciones
    await Evento.deleteMany({});
    await Asistente.deleteMany({});
    console.log('🗑️  Base de datos limpiada');

    // Insertar eventos uno por uno para mejor manejo de errores
    const eventosInsertados = [];
    for (const eventoData of eventosData) {
      try {
        const evento = new Evento(eventoData);
        await evento.save();
        eventosInsertados.push(evento);
        console.log(`✅ Evento insertado: ${eventoData.nombre}`);
      } catch (error) {
        console.error(`❌ Error insertando evento ${eventoData.nombre}:`, error.message);
      }
    }

    console.log(`\n✅ ${eventosInsertados.length} eventos insertados exitosamente`);

    // Insertar asistentes
    const asistentesInsertados = await Asistente.insertMany(asistentesData);
    console.log(`✅ ${asistentesInsertados.length} asistentes insertados`);

    // Agregar asistencias de ejemplo
    const laura = asistentesInsertados.find(a => a.email === 'laura.mendoza@techcorp.com');
    const techSummit = eventosInsertados.find(e => e.nombre === 'Tech Summit 2026');
    
    if (laura && techSummit) {
      laura.asistencias.push({
        eventoId: techSummit._id,
        ticketId: techSummit.tickets[1]._id,
        fechaCompra: new Date('2025-12-01'),
        precioFinal: 262500,
        estado: 'Confirmado'
      });
      await laura.save();
      console.log('✅ Asistencia agregada para Laura Mendoza');
    }

    console.log('\n🎉 ¡Base de datos poblada exitosamente para 2026!');
    console.log('\n📊 Resumen:');
    console.log(`- Eventos creados: ${eventosInsertados.length}`);
    console.log(`- Asistentes registrados: ${asistentesInsertados.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error general:', error);
    process.exit(1);
  }
}

seedDatabase();