import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  ClipboardList,
  Clock3,
  CreditCard,
  Edit3,
  FileText,
  HeartPulse,
  Layers3,
  PlusCircle,
  RefreshCw,
  ShieldCheck,
  ShieldPlus,
  Sparkles,
  Stethoscope
} from 'lucide-react'

export const sideMenuItems = [
  { label: 'Ficha', icon: ClipboardList, key: 'ficha' },
  { label: 'Planes de tratamiento', icon: HeartPulse, key: 'tratamientos' },
  { label: 'Documentos', icon: FileText, key: 'documentos' },
  { label: 'Presupuestos', icon: CreditCard, key: 'presupuestos' },
  { label: 'Tratamientos realizados', icon: Stethoscope, key: 'tratamientos-realizados' },
  { label: 'Odontograma', icon: ShieldPlus, key: 'odontograma' },
  { label: 'Recetas brindadas', icon: FileText, key: 'recetas-brindadas' }
]

export const treatmentPlanStages = [
  { label: 'Diagnóstico', status: 'Completado', tone: 'done', compliance: 100 },
  { label: 'Saneamiento', status: 'En curso', tone: 'active', compliance: 60 },
  { label: 'Restauración', status: 'Pendiente', tone: 'pending', compliance: 0 },
  { label: 'Control final', status: 'Pendiente', tone: 'pending', compliance: 0 }
]

export const treatmentPlanItems = [
  {
    title: 'Profilaxis y control periodontal',
    detail: 'Limpieza general, remoción de cálculo y control de inflamación gingival.',
    time: '45 min',
    priority: 'Alta',
    tooth: null
  },
  {
    title: 'Restauración pieza 2.6',
    detail: 'Resina compuesta por lesión cariosa oclusal con aislamiento relativo.',
    time: '60 min',
    priority: 'Media',
    tooth: '2.6'
  },
  {
    title: 'Evaluación de sensibilidad y ajuste oclusal',
    detail: 'Revisión funcional posterior al saneamiento y seguimiento de molestias.',
    time: '30 min',
    priority: 'Media',
    tooth: null
  }
]

export const treatmentPlanMetrics = [
  { label: 'Sesiones estimadas', value: '3', icon: Layers3 },
  { label: 'Tiempo total', value: '2h 15m', icon: Clock3 },
  { label: 'Cobertura clínica', value: '75%', icon: ShieldCheck }
]

export const planBadgeLabel = 'Plan activo'
export const planBadgeIcon = Sparkles

export const fadeInProps = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 }
}

export const clinicalSummary = {
  diagnosisCode: 'K02.1',
  diagnosisLabel: 'Caries dentinaria',
  riskLevel: 'Medio',
  priority: 'Electivo'
}

export const planTimeline = [
  {
    icon: PlusCircle,
    date: '02/04/2025',
    title: 'Plan creado',
    description: 'Plan integral iniciado por Dra. Valeria Rojas.',
    color: 'text-emerald-600 dark:text-emerald-400',
    dot: 'bg-emerald-500'
  },
  {
    icon: Edit3,
    date: '08/04/2025',
    title: 'Actualización de plan',
    description: 'Se añadió restauración de pieza 2.6 al plan.',
    color: 'text-sky-600 dark:text-sky-400',
    dot: 'bg-sky-500'
  },
  {
    icon: RefreshCw,
    date: '12/04/2025',
    title: 'Cambio de estado',
    description: 'Saneamiento → En curso.',
    color: 'text-violet-600 dark:text-violet-400',
    dot: 'bg-violet-500'
  },
  {
    icon: Stethoscope,
    date: '18/04/2025',
    title: 'Sesión registrada',
    description: 'Profilaxis completada. Dr. Marco Salinas.',
    color: 'text-[#0f766e] dark:text-[#34d399]',
    dot: 'bg-[#00b09b]'
  }
]

export const toothData = {
  '2.6': {
    number: '2.6',
    name: 'Primer molar superior izquierdo',
    zone: 'Cuadrante 2 – Superior izquierdo',
    status: 'Caries oclusal'
  },
  '1.1': {
    number: '1.1',
    name: 'Incisivo central superior derecho',
    zone: 'Cuadrante 1 – Superior derecho',
    status: 'Sano'
  }
}

export const clinicalAlerts = [
  {
    icon: AlertTriangle,
    label: 'Gingivitis activa detectada',
    level: 'warning'
  },
  {
    icon: Clock3,
    label: 'Tratamiento con retraso de 6 días',
    level: 'error'
  },
  {
    icon: Bell,
    label: 'Control periodontal pendiente',
    level: 'info'
  }
]

export const overallProgress = 38

export const paymentData = {
  total: 780,
  ejecutado: 180,
  status: 'Parcial',
  method: 'Efectivo',
  history: [
    { date: '02/04/2025', amount: 180, status: 'Pagado' },
    { date: '15/04/2025', amount: 0, status: 'Pendiente' },
    { date: '28/04/2025', amount: 0, status: 'Pendiente' }
  ]
}

export const clinicalDocs = [
  { icon: '🦷', label: 'Radiografías', status: 'Pendiente' },
  { icon: '📷', label: 'Fotos intraorales', status: 'Por subir' },
  { icon: '📄', label: 'PDFs clínicos', status: 'No adjuntado' }
]

export const nextStepData = {
  title: 'Agendar sesión de saneamiento',
  description: 'Recomendado dentro de los próximos 7 días para mantener la continuidad del plan.',
  availability: 'Disponible esta semana',
  reminderActive: true
}

export const mockTreatmentPlans = [
  {
    id: 1,
    name: 'Plan integral de saneamiento y restauración',
    status: 'En curso',
    tab: 'tratamientos'
  },
  {
    id: 2,
    name: 'Rehabilitación periodontal básica',
    status: 'Terminado',
    tab: 'tratamientos-realizados'
  },
  {
    id: 3,
    name: 'Ortodoncia preventiva',
    status: 'Pendiente',
    tab: 'tratamientos'
  }
]
