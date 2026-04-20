const FIELD_KEYWORDS = {
  ci: ['ci', 'carnet', 'identidad', 'ciPaciente'],
  email: ['email', 'correo'],
  phone: ['telefono principal', 'telefono', 'phone'],
  secondPhone: ['telefono secundario', 'secondPhone'],
  birthDate: ['fecha de nacimiento', 'birthDate'],
  civilStatus: ['estado civil', 'civilStatus'],
  occupation: ['ocupacion', 'ocupación'],
  referencePerson: ['persona de referencia', 'referencePerson'],
  referencePhone: ['telefono de referencia', 'referencePhone'],
  address: ['direccion', 'dirección', 'address'],
  name: ['nombre', 'nombres'],
  lastname: ['apellido', 'apellidos']
}

export const extractBackendMessage = (error) => {
  const data = error.response?.data

  if (typeof data?.message === 'string') {
    return data.message
  }

  if (typeof data?.error === 'string') {
    return data.error
  }

  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    return data.errors.join(' | ')
  }

  return ''
}

export const applyBackendFieldErrors = (error, setFieldError, fallbackMessage) => {
  const data = error.response?.data

  if (data && typeof data === 'object') {
    const fieldErrors = data.fieldErrors || data.errorsByField || data.validationErrors

    if (fieldErrors && typeof fieldErrors === 'object' && !Array.isArray(fieldErrors)) {
      let applied = false

      Object.entries(fieldErrors).forEach(([field, message]) => {
        if (typeof message === 'string') {
          setFieldError(field, message)
          applied = true
        }
      })

      if (applied) {
        return true
      }
    }
  }

  const normalizedMessage = fallbackMessage.toLowerCase()
  let hasMatch = false

  Object.entries(FIELD_KEYWORDS).forEach(([field, keywords]) => {
    if (keywords.some((keyword) => normalizedMessage.includes(keyword.toLowerCase()))) {
      setFieldError(field, fallbackMessage)
      hasMatch = true
    }
  })

  return hasMatch
}
