import { useEffect } from 'react'
import { X } from 'lucide-react'
import QuestionnaireValue from './QuestionnaireValue'

const QuestionnaireModal = ({ items, onClose }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.24)] dark:border-slate-800 dark:bg-slate-950"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Cuestionario médico completo</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Resumen completo de respuestas del paciente.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[calc(88vh-88px)] overflow-y-auto p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <article
                key={item.label}
                className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/60"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{item.label}</p>
                <div className="mt-4">
                  <QuestionnaireValue value={item.value} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionnaireModal
