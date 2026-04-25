export const normalizeCompletePatientData = (payload) => {
  const basePatient = payload?.patient || {}
  const clinicalInfo = payload?.clinicalInfo || {}
  const questionnaire = payload?.questionnaire || {}

  return {
    ...questionnaire,
    ...basePatient,
    clinicalInfo,
    questionnaire,
    missingClinicalInfo: Boolean(payload?.missingClinicalInfo),
    missingQuestionnaire: Boolean(payload?.missingQuestionnaire),
    missingSections: Array.isArray(payload?.missingSections) ? payload.missingSections : [],
    motivoConsulta: clinicalInfo.motivoConsulta || basePatient.motivoConsulta || '',
    alergias: clinicalInfo.alergias || basePatient.alergias || '',
    observaciones: clinicalInfo.observaciones || basePatient.observaciones || basePatient.notas || ''
  }
}

export const formatDate = (value) => {
  if (!value) {
    return 'No registrado'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('es-BO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

export const calculateAge = (value) => {
  if (!value) {
    return null
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  const today = new Date()
  let age = today.getFullYear() - date.getFullYear()
  const monthDifference = today.getMonth() - date.getMonth()

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < date.getDate())) {
    age -= 1
  }

  return age
}

export const buildInfoColumns = (patient) => {
  const phoneNumber = patient?.telefono || patient?.phonesNumbers?.[0]?.numero || 'No registrado'
  const emergencyContact =
    patient?.personaDeReferencia ||
    patient?.contactoEmergencia ||
    patient?.emergencyContact ||
    patient?.responsable ||
    'No registrado'

  return [
    [
      {
        label: 'Nombre',
        value: `${patient?.nombre || ''} ${patient?.apellido || ''}`.trim() || 'Paciente sin nombre'
      },
      { label: 'Dirección', value: patient?.direccion || 'No registrada' },
      { label: 'Email', value: patient?.email || 'No registrado', accent: true },
      { label: 'Contacto de referencia', value: emergencyContact },
      { label: 'Fecha de nacimiento', value: formatDate(patient?.fechaNacimiento) },
      { label: 'Estado civil', value: patient?.estadoCivil?.status || patient?.estadoCivil || 'No registrado' }
    ],
    [
      { label: 'Sexo', value: patient?.sexo || patient?.genero || 'No registrado' },
      { label: 'Teléfono', value: phoneNumber, accent: true },
      { label: 'Ocupación', value: patient?.ocupacion || 'No registrada' },
      {
        label: 'Número de documento',
        value: patient?.ciPaciente || patient?.cedula || patient?.id || 'No registrado'
      },
      {
        label: 'Número referencia',
        value: patient?.numeroPersonaRef || patient?.numeroReferencia || 'No registrado'
      }
    ]
  ]
}

export const buildClinicalItems = (patient) => [
  {
    label: 'Motivo de la consulta',
    value: patient?.motivoConsulta || patient?.motivo || 'Pendiente de registrar'
  },
  {
    label: 'Alergias',
    value: patient?.alergias || 'No reportadas'
  },
  {
    label: 'Observaciones',
    value: patient?.observaciones || patient?.notas || 'Sin observaciones adicionales'
  }
]

export const formatQuestionnaireValue = (value) => {
  if (typeof value === 'boolean') {
    return value ? 'Sí' : 'No'
  }

  if (value === null || value === undefined || value === '') {
    return 'No registrado'
  }

  return value
}

export const buildQuestionnaireItems = (patient) => [
  {
    label: 'Bajo tratamiento médico actualmente',
    value: formatQuestionnaireValue(patient?.estaBajoTratamientoMedicoActualmente)
  },
  {
    label: 'Toma medicamentos regularmente',
    value: formatQuestionnaireValue(patient?.tomaMedicamentosRegularmente)
  },
  {
    label: 'Cirugías importantes',
    value: formatQuestionnaireValue(patient?.haTenidoCirugiasImportantes)
  },
  {
    label: 'Hipertenso',
    value: formatQuestionnaireValue(patient?.esHipertenso)
  },
  {
    label: 'Diabético',
    value: formatQuestionnaireValue(patient?.esDiabetico)
  },
  {
    label: 'Problemas cardíacos',
    value: formatQuestionnaireValue(patient?.tieneProblemasCardiacos)
  },
  {
    label: 'Problemas de coagulación o sangrado',
    value: formatQuestionnaireValue(patient?.tieneProblemasCoagulacionOSangraFacilmente)
  },
  {
    label: 'Alergia a medicamentos o anestesia',
    value: formatQuestionnaireValue(patient?.esAlergicoAMedicamentosOAnestesia)
  },
  {
    label: 'Hepatitis o enfermedad infecciosa importante',
    value: formatQuestionnaireValue(patient?.haTenidoHepatitisOEnfermedadInfecciosaImportante)
  },
  {
    label: 'Asma o problemas respiratorios',
    value: formatQuestionnaireValue(patient?.padeceAsmaOProblemasRespiratorios)
  },
  { label: 'Fuma', value: formatQuestionnaireValue(patient?.fuma) },
  {
    label: 'Consume alcohol frecuentemente',
    value: formatQuestionnaireValue(patient?.consumeAlcoholFrecuentemente)
  },
  { label: 'Sangrado de encías', value: formatQuestionnaireValue(patient?.leSangranLasEncias) },
  {
    label: 'Dolor o sensibilidad dental',
    value: formatQuestionnaireValue(patient?.tieneDolorOSensibilidadDental)
  },
  {
    label: 'Problemas con tratamientos dentales anteriores',
    value: formatQuestionnaireValue(patient?.haTenidoProblemasConTratamientosDentalesAnteriores)
  },
  {
    label: 'Embarazada o en lactancia',
    value: formatQuestionnaireValue(patient?.estaEmbarazadaOLactancia)
  }
]
