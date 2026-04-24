import React, { useMemo, useState } from 'react'
import { useField, useFormikContext } from 'formik'
import { format, isValid, parse } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '../../../components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover'
import { controlClass, errorClass, fieldLabelClass, iconClass } from '../formStyles'

const DDMMYYYY_REGEX = /^\d{2}\/\d{2}\/\d{4}$/
const FIELD_NAME = 'birthDate'
const FIELD_LABEL = 'Fecha de Nacimiento *'
const MIN_BIRTH_MONTH = new Date(1900, 0, 1)

const normalizeDigitsToDisplay = (digits) => {
  const safeDigits = digits.replace(/\D/g, '').slice(0, 8)

  if (safeDigits.length <= 2) return safeDigits
  if (safeDigits.length <= 4) return `${safeDigits.slice(0, 2)}/${safeDigits.slice(2)}`

  return `${safeDigits.slice(0, 2)}/${safeDigits.slice(2, 4)}/${safeDigits.slice(4)}`
}

const parseDisplayDate = (value) => {
  if (!DDMMYYYY_REGEX.test(value)) {
    return undefined
  }

  const parsed = parse(value, 'dd/MM/yyyy', new Date())
  if (!isValid(parsed)) {
    return undefined
  }

  if (format(parsed, 'dd/MM/yyyy') !== value) {
    return undefined
  }

  return parsed
}

const BirthDatePickerField = () => {
  const [field, meta] = useField(FIELD_NAME)
  const { setFieldValue, setFieldTouched } = useFormikContext()
  const [open, setOpen] = useState(false)

  const hasError = Boolean(meta.touched && meta.error)
  const selectedDate = useMemo(() => parseDisplayDate(field.value || ''), [field.value])
  const today = useMemo(() => new Date(), [])
  const defaultMonth = useMemo(
    () => selectedDate || new Date(today.getFullYear() - 18, today.getMonth(), 1),
    [selectedDate, today]
  )

  const handleTextChange = (event) => {
    const nextValue = normalizeDigitsToDisplay(event.target.value)
    setFieldValue(FIELD_NAME, nextValue)
  }

  const handleSelectDate = (date) => {
    if (!date) return
    setFieldValue(FIELD_NAME, format(date, 'dd/MM/yyyy'), true)
    setFieldTouched(FIELD_NAME, true, false)
    setOpen(false)
  }

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <label htmlFor={FIELD_NAME} className={fieldLabelClass}>
        <CalendarIcon className={iconClass} size={14} />
        <span>{FIELD_LABEL}</span>
      </label>

      <div className="relative">
        <input
          id={FIELD_NAME}
          name={FIELD_NAME}
          type="text"
          inputMode="numeric"
          autoComplete="bday"
          placeholder="dd/mm/aaaa"
          value={field.value || ''}
          onChange={handleTextChange}
          onBlur={() => setFieldTouched(FIELD_NAME, true, true)}
          className={`${controlClass} pr-12 ${hasError ? '!border-rose-300 !ring-4 !ring-rose-500/10 dark:!border-rose-500/60' : ''}`}
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label="Abrir calendario"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 transition-colors hover:text-[#0f766e]"
            >
              <CalendarIcon className="h-4 w-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-auto p-3">
            <Calendar
              mode="single"
              locale={es}
              selected={selectedDate}
              onSelect={handleSelectDate}
              defaultMonth={defaultMonth}
              startMonth={MIN_BIRTH_MONTH}
              endMonth={today}
              captionLayout="dropdown"
              navLayout="after"
              reverseYears
              fixedWeeks
              disabled={{ after: today }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {hasError ? <div className={errorClass}>{meta.error}</div> : null}
    </div>
  )
}

export default BirthDatePickerField
