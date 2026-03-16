import React, { useEffect, useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import ImagesApp from '../../assets/ImagesApp'

const routeOrder = {
  '/login': 0,
  '/register': 1
}

const leftHighlights = [
  'Gestion de pacientes',
  'Control de citas y agenda',
  'Seguimiento de tratamientos',
  'Inventario mas ordenado'
]

const AuthShell = () => {
  const location = useLocation()
  const previousIndexRef = useRef(routeOrder[location.pathname] ?? 0)

  const direction = useMemo(() => {
    const currentIndex = routeOrder[location.pathname] ?? 0
    return currentIndex >= previousIndexRef.current ? 1 : -1
  }, [location.pathname])

  useEffect(() => {
    previousIndexRef.current = routeOrder[location.pathname] ?? 0
  }, [location.pathname])

  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="grid min-h-screen w-full lg:grid-cols-[1.12fr_0.88fr]">
        <div
          className="relative hidden min-h-screen overflow-hidden lg:block"
          style={{
            backgroundImage: `url(${ImagesApp.imglogin})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.18),rgba(2,6,23,0.82))]" />
          <div className="absolute left-12 top-12 xl:left-16 xl:top-16">
            <div className="inline-flex rounded-full border border-white/20 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white">
              Centro Odontologico
            </div>
          </div>

          <div className="relative flex h-full items-center justify-center p-12 text-white xl:p-16">
            <div className="flex w-full max-w-xl flex-col items-center text-center">
              <div className="mt-8 flex w-full flex-col items-center">
                <img src={ImagesApp.rieeLogo} alt="RIEE Logo" className="mb-8 w-64" />
                <h1 className="max-w-lg text-3xl font-semibold leading-tight xl:text-4xl">
                  Gestion dental clara, moderna y lista para el dia a dia.
                </h1>
                <div className="mt-8 grid w-full max-w-lg gap-3">
                  {leftHighlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-[#00b09b]/25 bg-[#00b09b]/14 px-4 py-3 text-left backdrop-blur-sm"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00b09b] text-sm font-bold text-white">
                        ✓
                      </div>
                      <p className="text-sm font-medium text-white/92">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-10 py-18 dark:bg-slate-950 sm:px-14 lg:px-20 xl:px-24">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: direction > 0 ? 72 : -72 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -72 : 72 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[620px]"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default AuthShell
