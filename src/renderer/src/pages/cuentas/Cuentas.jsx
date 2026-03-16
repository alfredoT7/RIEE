import React from 'react'
import { FaArrowDown, FaArrowUp, FaChartBar, FaChartLine, FaDollarSign } from 'react-icons/fa'

const summaryCards = [
  { title: 'Ingresos', amount: 'Bs. 25,320', trend: '+8.2%', positive: true, icon: FaChartLine },
  { title: 'Gastos', amount: 'Bs. 12,450', trend: '-3.1%', positive: false, icon: FaChartBar },
  { title: 'Ganancia neta', amount: 'Bs. 12,870', trend: '+12.5%', positive: true, icon: FaDollarSign }
]

const transactions = [
  { title: 'Consulta ortodoncia - Juan Perez', date: '22 Oct 2023', amount: 'Bs. 350', income: true },
  { title: 'Materiales dentales - Proveedor XYZ', date: '21 Oct 2023', amount: '- Bs. 1,200', income: false },
  { title: 'Tratamiento conducto - Maria Garcia', date: '20 Oct 2023', amount: 'Bs. 800', income: true }
]

const Cuentas = () => {
  return (
    <section className="px-2 pb-6 pt-3">
      <div className="rounded-[24px] border border-white/60 bg-gradient-to-br from-[#f9fffd] via-white to-[#eef8f6] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_55%,#0b2f2d_100%)] dark:shadow-none">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Finanzas</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Gestion financiera y reportes del consultorio.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {summaryCards.map((card) => {
            const Icon = card.icon

            return (
              <article key={card.title} className="rounded-[22px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{card.title}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-800 dark:text-slate-100">{card.amount}</h3>
                  </div>
                  <Icon className="text-2xl text-[#0f766e]" />
                </div>
                <p className={`mt-4 text-sm font-semibold ${card.positive ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {card.trend} vs mes anterior
                </p>
              </article>
            )
          })}
        </div>
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Resumen financiero</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Ingresos y gastos del periodo.</p>
            </div>
            <select className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
              <option>Mensual</option>
              <option>Semanal</option>
              <option>Anual</option>
            </select>
          </div>

          <div className="flex min-h-[260px] items-center justify-center rounded-[22px] border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Grafico de ingresos vs gastos
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Transacciones recientes</h2>
          <div className="mt-5 space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.title} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${transaction.income ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10'}`}>
                    {transaction.income ? <FaArrowUp /> : <FaArrowDown />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{transaction.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{transaction.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${transaction.income ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cuentas
