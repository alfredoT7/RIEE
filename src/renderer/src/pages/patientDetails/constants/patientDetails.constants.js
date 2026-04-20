import {
  ClipboardList,
  Clock3,
  CreditCard,
  FileText,
  HeartPulse,
  Layers3,
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
  { label: 'Diagnóstico', status: 'Completado', tone: 'done' },
  { label: 'Saneamiento', status: 'En curso', tone: 'active' },
  { label: 'Restauración', status: 'Pendiente', tone: 'pending' },
  { label: 'Control final', status: 'Pendiente', tone: 'pending' }
]

export const treatmentPlanItems = [
  {
    title: 'Profilaxis y control periodontal',
    detail: 'Limpieza general, remoción de cálculo y control de inflamación gingival.',
    time: '45 min',
    priority: 'Alta'
  },
  {
    title: 'Restauración pieza 2.6',
    detail: 'Resina compuesta por lesión cariosa oclusal con aislamiento relativo.',
    time: '60 min',
    priority: 'Media'
  },
  {
    title: 'Evaluación de sensibilidad y ajuste oclusal',
    detail: 'Revisión funcional posterior al saneamiento y seguimiento de molestias.',
    time: '30 min',
    priority: 'Media'
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
