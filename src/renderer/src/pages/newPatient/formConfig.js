import * as Yup from 'yup'

const TEXT_ONLY_REGEX = /^[\p{L}\s'-]+$/u

export const CIVIL_STATUS_OPTIONS = [
  { value: 'SINGLE', label: 'Soltero(a)' },
  { value: 'MARRIED', label: 'Casado(a)' },
  { value: 'DIVORCED', label: 'Divorciado(a)' },
  { value: 'WIDOWED', label: 'Viudo(a)' },
  { value: 'SEPARATED', label: 'Separado(a)' }
]

export const initialValues = {
  name: '',
  lastname: '',
  ci: '',
  birthDate: '',
  address: '',
  phone: '',
  secondPhone: '',
  civilStatus: '',
  occupation: '',
  email: '',
  referencePerson: '',
  referencePhone: ''
}

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(TEXT_ONLY_REGEX, 'Nombre solo debe contener letras')
    .required('Nombre es obligatorio'),
  lastname: Yup.string()
    .matches(TEXT_ONLY_REGEX, 'Apellido solo debe contener letras')
    .required('Apellido es obligatorio'),
  ci: Yup.string().required('Carnet de identidad es obligatorio'),
  birthDate: Yup.string()
    .required('Fecha de nacimiento es obligatoria')
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Formato de fecha inválido (dd/mm/aaaa)')
    .test('valid-birth-date', 'Fecha de nacimiento inválida', (value) => {
      if (!value) return false
      const [day, month, year] = value.split('/').map(Number)

      const date = new Date(year, month - 1, day)
      const isRealDate =
        date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day

      if (!isRealDate) return false

      const today = new Date()
      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      return date <= startOfToday
    }),
  phone: Yup.string().required('Teléfono es obligatorio'),
  secondPhone: Yup.string(),
  civilStatus: Yup.string().required('Estado civil es obligatorio'),
  occupation: Yup.string()
    .matches(TEXT_ONLY_REGEX, 'Ocupación solo debe contener letras')
    .required('Ocupación es obligatoria'),
  email: Yup.string().email('Email no es válido').required('Email es obligatorio'),
  referencePerson: Yup.string()
    .matches(TEXT_ONLY_REGEX, 'Nombre de persona de referencia solo debe contener letras')
    .required('Persona de referencia es obligatoria'),
  referencePhone: Yup.string().required('Teléfono de referencia es obligatorio')
})
