import { CheckCircle2, Info, XCircle } from 'lucide-react'

const QuestionnaireValue = ({ value }) => {
  if (value === 'Sí') {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
        <CheckCircle2 size={16} />
        Sí
      </span>
    )
  }

  if (value === 'No') {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm font-semibold text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
        <XCircle size={16} />
        No
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
      <Info size={16} />
      {value}
    </span>
  )
}

export default QuestionnaireValue

