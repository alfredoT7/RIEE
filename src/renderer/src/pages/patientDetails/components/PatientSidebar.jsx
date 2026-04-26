import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import ImagesApp from '../../../assets/ImagesApp'
import { sideMenuItems } from '../constants/patientDetails.constants'

const PatientSidebar = ({ patient, fullName, profileSummary, activeTab, onTabChange }) => {
  const profileImage = patient?.imagen?.startsWith('http') ? patient.imagen : ImagesApp.defaultImage

  return (
    <motion.aside
      initial={{ opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className="sticky top-[76px] self-start max-h-[calc(100vh-76px)] overflow-y-auto overflow-hidden rounded-[28px] border border-[#6dd6c8]/35 bg-[linear-gradient(180deg,#18465b_0%,#176173_45%,#198878_78%,#1aa08d_100%)] text-white shadow-[0_24px_60px_rgba(26,160,141,0.28)]"
    >
      <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(125,233,222,0.34),transparent_58%)] px-6 pb-6 pt-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[30px] border border-white/25 bg-white/15 p-2 shadow-[0_12px_32px_rgba(0,0,0,0.16)] ring-4 ring-[#a6f3ea]/15">
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[24px] bg-slate-200/95">
              <img
                src={profileImage}
                alt={fullName}
                onError={(event) => {
                  event.target.onerror = null
                  event.target.src = ImagesApp.defaultImage
                }}
                className="block h-full w-full object-contain object-center"
              />
            </div>
          </div>
          <h2 className="mt-5 text-2xl font-semibold">{fullName}</h2>
          <p className="mt-2 text-sm text-white/75">{profileSummary || 'Perfil general del paciente'}</p>
          <div className="mt-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#7de9de]">
            Ficha nro. {patient?.id || patient?.ciPaciente || 'N/D'}
          </div>
        </div>
      </div>

      <nav className="space-y-2 p-4">
        {sideMenuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.key

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onTabChange(item.key)}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#00b09b] text-white shadow-[0_8px_20px_rgba(0,176,155,0.32)]'
                  : 'text-white/82 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="rounded-[22px] bg-white/6 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Contacto rápido</p>
          <div className="mt-4 space-y-3 text-sm text-white/80">
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-[#7de9de]" />
              <span>{patient?.telefono || patient?.phonesNumbers?.[0]?.numero || 'No registrado'}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-[#7de9de]" />
              <span className="truncate">{patient?.email || 'No registrado'}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-[#7de9de]" />
              <span>{patient?.direccion || 'No registrada'}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}

export default PatientSidebar
