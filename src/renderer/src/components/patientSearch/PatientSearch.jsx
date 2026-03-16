import React, { useState, useEffect, useRef } from 'react'
import { FaSearch, FaUser } from 'react-icons/fa'

const PatientSearch = ({
  patients,
  onPatientSelect,
  selectedPatientId,
  placeholder = 'Buscar paciente...'
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [filteredPatients, setFilteredPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const searchRef = useRef(null)

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = patients.filter((patient) => {
        const fullName = `${patient.nombre || ''} ${patient.apellido || ''}`.toLowerCase()
        const ci = `${patient.cedula || patient.ciPaciente || ''}`
        const phone = `${patient.telefono || patient.phonesNumbers?.[0]?.numero || ''}`

        return (
          fullName.includes(searchTerm.toLowerCase()) ||
          ci.includes(searchTerm) ||
          phone.includes(searchTerm)
        )
      })

      setFilteredPatients(filtered)
    } else {
      setFilteredPatients([])
    }
  }, [searchTerm, patients])

  useEffect(() => {
    if (selectedPatientId) {
      const patient = patients.find(
        (item) => `${item.id || item.ciPaciente}` === `${selectedPatientId}`
      )

      if (patient) {
        setSelectedPatient(patient)
        setSearchTerm(`${patient.nombre} ${patient.apellido}`)
      }
    } else {
      setSelectedPatient(null)
      setSearchTerm('')
    }
  }, [selectedPatientId, patients])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const clearSelection = () => {
    setSelectedPatient(null)
    setSearchTerm('')
    setIsOpen(false)
    onPatientSelect('')
  }

  return (
    <div className="relative" ref={searchRef}>
      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
        Paciente *
      </label>

      <div className="relative">
        <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value
            setSearchTerm(value)
            setIsOpen(true)

            if (!value) {
              setSelectedPatient(null)
              onPatientSelect('')
            }
          }}
          onFocus={() => searchTerm.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-12 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#00b09b]/40 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
        />

        {selectedPatient && (
          <button
            type="button"
            onClick={clearSelection}
            className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-slate-200 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          >
            ×
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <button
                key={patient.id || patient.ciPaciente}
                type="button"
                className="flex w-full items-center gap-3 border-b border-slate-100 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                onClick={() => {
                  setSelectedPatient(patient)
                  setSearchTerm(`${patient.nombre} ${patient.apellido}`)
                  setIsOpen(false)
                  onPatientSelect(patient.id || patient.ciPaciente)
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#00b09b]/10 text-[#0f766e] dark:bg-[#00b09b]/15 dark:text-[#5ce1d4]">
                  <FaUser />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {patient.nombre} {patient.apellido}
                  </p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    CI: {patient.cedula || patient.ciPaciente || 'N/D'}
                  </p>
                </div>
              </button>
            ))
          ) : searchTerm ? (
            <div className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400">
              No se encontraron pacientes.
            </div>
          ) : null}
        </div>
      )}

      {selectedPatient && (
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#00b09b]/10 px-3 py-1.5 text-sm font-medium text-[#0f766e] dark:bg-[#00b09b]/15 dark:text-[#5ce1d4]">
          <FaUser className="text-xs" />
          <span>
            {selectedPatient.nombre} {selectedPatient.apellido}
          </span>
        </div>
      )}
    </div>
  )
}

export default PatientSearch
