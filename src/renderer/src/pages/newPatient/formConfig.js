import * as Yup from 'yup'

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
  name: Yup.string().matches(/^[a-zA-Z\s]+$/, 'Nombre no debe contener números').required('Nombre es obligatorio'),
  lastname: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Apellido no debe contener números')
    .required('Apellido es obligatorio'),
  ci: Yup.string().required('Carnet de identidad es obligatorio'),
  birthDate: Yup.date().required('Fecha de nacimiento es obligatoria'),
  phone: Yup.string().required('Teléfono es obligatorio'),
  secondPhone: Yup.string(),
  civilStatus: Yup.string().required('Estado civil es obligatorio'),
  occupation: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Ocupación no debe contener números')
    .required('Ocupación es obligatoria'),
  email: Yup.string().email('Email no es válido').required('Email es obligatorio'),
  referencePerson: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Nombre de persona de referencia no debe contener números')
    .required('Persona de referencia es obligatoria'),
  referencePhone: Yup.string().required('Teléfono de referencia es obligatorio')
})
