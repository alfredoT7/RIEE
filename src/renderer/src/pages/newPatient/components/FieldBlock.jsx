import React from 'react'
import { ErrorMessage, Field } from 'formik'
import {
  controlClass,
  errorClass,
  fieldLabelClass,
  iconClass,
  titleClass
} from '../formStyles'

export const SectionTitle = ({ icon: Icon, children }) => (
  <div className={titleClass}>
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#00b09b]/10 text-[#0f766e]">
      <Icon size={18} />
    </span>
    <h3>{children}</h3>
  </div>
)

const FieldBlock = ({ name, label, icon: Icon, error, touched, as, type = 'text', placeholder, children }) => (
  <div className="flex min-w-0 flex-col gap-3">
    <label htmlFor={name} className={fieldLabelClass}>
      <Icon className={iconClass} />
      <span>{label}</span>
    </label>
    <Field
      id={name}
      name={name}
      as={as}
      type={type}
      placeholder={placeholder}
      className={`${controlClass} ${error && touched ? '!border-rose-300 !ring-4 !ring-rose-500/10 dark:!border-rose-500/60' : ''}`}
    >
      {children}
    </Field>
    <ErrorMessage name={name} component="div" className={errorClass} />
  </div>
)

export default FieldBlock
