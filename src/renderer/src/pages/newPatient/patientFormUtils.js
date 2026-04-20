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

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('No se pudo procesar la imagen'))
            return
          }

          resolve(new File([blob], file.name, { type: file.type }))
        }, 'image/jpeg', 0.7)
      }

      img.onerror = (error) => reject(error)
      img.src = event.target.result
    }

    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })
}

export const buildPatientFormData = (values, selectedFile) => {
  const patientData = new FormData()

  patientData.append('ciPaciente', values.ci.trim())
  patientData.append('email', values.email.trim())
  patientData.append('estadoCivil', values.civilStatus)
  patientData.append('fechaNacimiento', values.birthDate)
  patientData.append('direccion', values.address.trim())
  patientData.append('ocupacion', values.occupation.trim())
  patientData.append('personaDeReferencia', values.referencePerson.trim())
  patientData.append('numeroPersonaRef', values.referencePhone.trim())
  patientData.append('nombre', values.name.trim())
  patientData.append('apellido', values.lastname.trim())
  patientData.append('phonesNumbers[0].numero', values.phone.trim())

  if (values.secondPhone?.trim()) {
    patientData.append('phonesNumbers[1].numero', values.secondPhone.trim())
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
  birthDate: patient?.fechaNacimiento ? `${patient.fechaNacimiento}`.slice(0, 10) : '',
  address: patient?.direccion || '',
  phone: patient?.telefono || patient?.phonesNumbers?.[0]?.numero || '',
  secondPhone: patient?.phonesNumbers?.[1]?.numero || '',
  civilStatus: patient?.estadoCivil || '',
  occupation: patient?.ocupacion || '',
  email: patient?.email || '',
  referencePerson:
    patient?.personaDeReferencia || patient?.contactoEmergencia || patient?.emergencyContact || '',
  referencePhone: patient?.numeroPersonaRef || ''
})
