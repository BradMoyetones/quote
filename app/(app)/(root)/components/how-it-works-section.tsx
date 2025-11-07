"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"

const steps = [
    {
        number: "01",
        title: "Crea tu empresa",
        description: "Agrega información de tu negocio: logo, nombre, dirección y datos de contacto.",
    },
    {
        number: "02",
        title: "Añade productos",
        description: "Crea tu catálogo con productos, precios y descripciones personalizadas.",
    },
    {
        number: "03",
        title: "Genera cotizaciones",
        description: "Selecciona productos, ajusta cantidades y genera PDFs profesionales al instante.",
    },
]

export function HowItWorksSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section ref={ref} className="py-24 bg-background">
            <div className="container px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Tres pasos simples</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Desde cero hasta tu primera cotización en minutos
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="relative flex gap-8 pb-12 last:pb-0"
                        >
                            {index < steps.length - 1 && <div className="absolute left-10 top-20 bottom-0 w-px bg-border" />}

                            <div className="shrink-0 w-20 h-20 rounded-full bg-linear-to-br from-primary to-chart-1 flex items-center justify-center text-primary-foreground font-bold text-2xl relative z-10">
                                {step.number}
                            </div>

                            <div className="flex-1 pt-4">
                                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                                <p className="text-muted-foreground text-lg">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
