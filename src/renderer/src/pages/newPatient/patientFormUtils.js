export const resizeImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()

      img.onload = () => {
        const maxWidth = 550
        const maxHeight = 550
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }
        } else if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const context = canvas.getContext('2d')
        context.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('No se pudo procesar la imagen'))
              return
            }

            resolve(new File([blob], file.name, { type: file.type }))
          },
          'image/jpeg',
          0.7
        )
      }

      img.onerror = (error) => reject(error)
      img.src = event.target.result
    }

    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })
}

export const normalizeTextValue = (value) => {
  if (value === null || value === undefined) {
    return ''
  }

  return String(value).trim()
}

export const normalizeCivilStatusValue = (value) => {
  const rawValue =
    value && typeof value === 'object' ? value.status || value.value || value.label || '' : value

  return normalizeTextValue(rawValue).replace(/^"+|"+$/g, '')
}

const padTwoDigits = (value) => String(value).padStart(2, '0')

const toDisplayDate = (value) => {
  const rawValue = normalizeTextValue(value)
  if (!rawValue) {
    return ''
  }

  const ddmmyyyyMatch = rawValue.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (ddmmyyyyMatch) {
    return rawValue
  }

  const yyyymmddMatch = rawValue.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (yyyymmddMatch) {
    const [, year, month, day] = yyyymmddMatch
    return `${day}/${month}/${year}`
  }

  const parsed = new Date(rawValue)
  if (!Number.isNaN(parsed.getTime())) {
    return `${padTwoDigits(parsed.getDate())}/${padTwoDigits(parsed.getMonth() + 1)}/${parsed.getFullYear()}`
  }

  return rawValue
}

export const toApiDate = (value) => {
  const rawValue = normalizeTextValue(value)
  if (!rawValue) {
    return ''
  }

  const ddmmyyyyMatch = rawValue.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (ddmmyyyyMatch) {
    const [, day, month, year] = ddmmyyyyMatch
    return `${year}-${month}-${day}`
  }

  const yyyymmddMatch = rawValue.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (yyyymmddMatch) {
    return rawValue
  }

  const parsed = new Date(rawValue)
  if (!Number.isNaN(parsed.getTime())) {
    return `${parsed.getFullYear()}-${padTwoDigits(parsed.getMonth() + 1)}-${padTwoDigits(parsed.getDate())}`
  }

  return rawValue
}

export const buildPatientFormData = (values, selectedFile) => {
  const patientData = new FormData()
  const ci = normalizeTextValue(values.ci)
  const email = normalizeTextValue(values.email)
  const address = normalizeTextValue(values.address)
  const occupation = normalizeTextValue(values.occupation)
  const referencePerson = normalizeTextValue(values.referencePerson)
  const referencePhone = normalizeTextValue(values.referencePhone)
  const name = normalizeTextValue(values.name)
  const lastname = normalizeTextValue(values.lastname)
  const phone = normalizeTextValue(values.phone)
  const secondPhone = normalizeTextValue(values.secondPhone)
  const civilStatus = normalizeCivilStatusValue(values.civilStatus)

  patientData.append('ciPaciente', ci)
  patientData.append('email', email)
  patientData.append('estadoCivil', civilStatus)
  patientData.append('fechaNacimiento', toApiDate(values.birthDate))
  patientData.append('direccion', address)
  patientData.append('ocupacion', occupation)
  patientData.append('personaDeReferencia', referencePerson)
  patientData.append('numeroPersonaRef', referencePhone)
  patientData.append('nombre', name)
  patientData.append('apellido', lastname)
  patientData.append('phonesNumbers[0].numero', phone)

  if (secondPhone) {
    patientData.append('phonesNumbers[1].numero', secondPhone)
  }

  if (selectedFile) {
    patientData.append('imagen', selectedFile)
  }

  return patientData
}

export const mapPatientToInitialValues = (patient) => ({
  name: patient?.nombre || '',
  lastname: patient?.apellido || '',
  ci: patient?.ciPaciente || patient?.cedula || '',
  birthDate: toDisplayDate(patient?.fechaNacimiento),
  address: patient?.direccion || '',
  phone: patient?.telefono || patient?.phonesNumbers?.[0]?.numero || '',
  secondPhone: patient?.phonesNumbers?.[1]?.numero || '',
  civilStatus: normalizeCivilStatusValue(patient?.estadoCivil),
  occupation: patient?.ocupacion || '',
  email: patient?.email || '',
  referencePerson:
    patient?.personaDeReferencia || patient?.contactoEmergencia || patient?.emergencyContact || '',
  referencePhone: patient?.numeroPersonaRef || ''
})
