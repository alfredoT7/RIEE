import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CardPaciente from '../../components/cardPaciente/CardPaciente'
import SearchBar from '../../components/searchBar/SearchBar'
import PacienteHeader from '../../components/pacienteHeader/PacienteHeader'
import Pagination from '../../components/pagination/Pagination'
import { getAllPatients } from '../../api/Api'
import PacienteCard from '../../components/pacientescard/PacienteCard'
import LoadingState from '../../components/loading/LoadingState'

const Patient = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [patients, setPatients] = useState([])
  const [filteredPatients, setFilteredPatients] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = 15
  const recentPatients = patients.slice(0, 6)

  useEffect(() => {
    const fetchAllPatients = async () => {
      setIsLoading(true)

      try {
        const response = await getAllPatients()
        const allPatients = Array.isArray(response.data?.data) ? response.data.data : []

        setPatients(allPatients)
        setFilteredPatients(allPatients)
      } catch (error) {
        console.error('Error fetching patients:', error)
        setPatients([])
        setFilteredPatients([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllPatients()
    window.scrollTo(0, 0)
  }, [])

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue)

    if (!Array.isArray(patients)) {
      return
    }

    const normalizedValue = searchValue.toLowerCase()
    const filtered = patients.filter((patient) => {
      const fullName = `${patient.nombre || ''} ${patient.apellido || ''}`.toLowerCase()
      const ci = patient.ciPaciente?.toString() || ''

      return fullName.includes(normalizedValue) || ci.includes(searchValue)
    })

    setFilteredPatients(filtered)
    setCurrentPage(1)
  }

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    window.scrollTo(0, 0)

    if (!Array.isArray(filteredPatients)) {
      return []
    }

    return filteredPatients.slice(startIndex, endIndex)
  }

  return (
    <section className="grid gap-y-6 px-2 pb-6 pt-4 lg:gap-y-7">
      <SearchBar onSearch={handleSearch} />

      {isLoading && (
        <LoadingState
          variant="cards"
          title="Cargando pacientes"
          description="Estamos trayendo la información más reciente del backend."
        />
      )}

      {!isLoading && !searchTerm && (
        <div className="rounded-[24px] border border-white/60 bg-gradient-to-br from-[#f9fffd] via-white to-[#eef8f6] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_55%,#0b2f2d_100%)] dark:shadow-none sm:p-6">
          <div className="mb-10 space-y-2">
            <h3 className="text-[1.15rem] font-semibold text-slate-800 dark:text-slate-100">Pacientes recientes</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Accesos rápidos a pacientes frecuentes y seguimiento reciente.
            </p>
          </div>

          <motion.div
            className="grid gap-4 pt-3 xl:grid-cols-2 2xl:gap-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {recentPatients.map((patient) => (
              <PacienteCard key={patient.id || patient.ciPaciente} patient={patient} />
            ))}
          </motion.div>

          {recentPatients.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
              No hay pacientes recientes para mostrar.
            </div>
          )}
        </div>
      )}

      {!isLoading && searchTerm && (
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none sm:p-6">
          <div className="mb-6">
            <h3 className="text-[1.15rem] font-semibold text-slate-800 dark:text-slate-100">Resultados de búsqueda</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {filteredPatients.length} paciente{filteredPatients.length === 1 ? '' : 's'} encontrado
              {filteredPatients.length === 1 ? '' : 's'} para "{searchTerm}".
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <PacienteHeader />

            <motion.div
              className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50/70 p-2 dark:border-slate-800 dark:bg-slate-900/60"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence>
                {getCurrentPageData().map((paciente) => (
                  <motion.div
                    key={paciente.ciPaciente}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardPaciente
                      ci={paciente.ciPaciente}
                      imagen={paciente.imagen}
                      nombre={`${paciente.nombre} ${paciente.apellido}`}
                      direccion={paciente.direccion}
                      fechaNacimiento={paciente.fechaNacimiento}
                      patient={paciente}
                      numeroTelefonico={
                        paciente.phonesNumbers && paciente.phonesNumbers.length > 0
                          ? paciente.phonesNumbers[0].numero
                          : 'N/A'
                      }
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredPatients.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                  No se encontraron pacientes con ese criterio.
                </div>
              )}
            </motion.div>

            <Pagination
              totalItems={filteredPatients.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default Patient
