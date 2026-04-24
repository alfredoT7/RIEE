import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { buttonVariants } from './button'
import { cn } from '../../lib/utils'
import 'react-day-picker/style.css'

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('rdp-custom p-1', className)}
      classNames={{
        root: 'w-full',
        months: 'flex flex-col gap-3',
        month: 'space-y-3',
        month_caption: 'flex items-center justify-center gap-2 pt-1',
        caption_label: 'text-sm font-semibold text-slate-800 dark:text-slate-100',
        dropdowns: 'flex items-center justify-center gap-2',
        dropdown_root:
          'relative inline-flex h-9 items-center overflow-hidden rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100',
        dropdown: 'absolute inset-0 cursor-pointer opacity-0 disabled:cursor-not-allowed',
        months_dropdown: 'text-sm font-medium',
        years_dropdown: 'text-sm font-medium',
        nav: 'flex items-center gap-1',
        button_previous: cn(
          buttonVariants({ variant: 'outline', size: 'icon' }),
          'h-8 w-8 bg-transparent p-0 opacity-80 hover:opacity-100'
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline', size: 'icon' }),
          'h-8 w-8 bg-transparent p-0 opacity-80 hover:opacity-100'
        ),
        month_grid: 'w-full border-collapse',
        weekdays: 'flex w-full',
        weekday:
          'w-9 rounded-md py-2 text-center text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400',
        weeks: 'mt-1',
        week: 'mt-1 flex w-full',
        day: 'h-9 w-9 p-0 text-center text-sm',
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 rounded-full p-0 font-normal aria-selected:opacity-100'
        ),
        day_selected:
          'bg-[#00b09b] text-white hover:bg-[#0f766e] hover:text-white focus:bg-[#0f766e] focus:text-white',
        day_today: 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100',
        day_outside: 'text-slate-400 opacity-60 dark:text-slate-500',
        day_disabled: 'text-slate-400 opacity-50 dark:text-slate-500',
        day_hidden: 'invisible',
        ...classNames
      }}
      formatters={{
        formatWeekdayName: (date, options, dateLib) =>
          dateLib.format(date, 'EEEEEE').replace('.', '').slice(0, 2).toUpperCase()
      }}
      components={{
        Chevron: ({ orientation, className: iconClassName, ...iconProps }) => {
          const Icon = orientation === 'left' ? ChevronLeft : ChevronRight
          return <Icon className={cn('h-4 w-4', iconClassName)} {...iconProps} />
        }
      }}
      {...props}
    />
  )
}

export { Calendar }
