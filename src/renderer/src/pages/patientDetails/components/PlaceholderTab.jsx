import { motion } from 'framer-motion'
import { ClipboardList } from 'lucide-react'
import { fadeInProps } from '../constants/patientDetails.constants'

const PlaceholderTab = ({ title, description }) => (
  <motion.section
    key={title}
    {...fadeInProps}
    className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none"
  >
    <div className="max-w-2xl">
      <div className="inline-flex items-center gap-2 rounded-full bg-[#00b09b]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
        <ClipboardList size={14} />
        Próximamente
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  </motion.section>
)

export default PlaceholderTab
