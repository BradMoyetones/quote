"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { Check } from "lucide-react"

const benefits = [
    "Sin necesidad de registro inicial",
    "Funciona completamente offline",
    "Datos guardados localmente",
    "Exporta tus datos cuando quieras",
    "PDFs de alta calidad",
    "Interfaz rápida y responsive",
    "Soporte para múltiples empresas",
    "Actualización automática de precios",
]

export function BenefitsSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section ref={ref} className="py-24 bg-muted/30">
            <div className="container px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">¿Por qué elegir Quote?</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Diseñado pensando en tu privacidad y productividad
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {benefits.map((benefit, index) => (
                        <motion.div
                            key={benefit}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex items-center gap-4 bg-card rounded-lg p-4 border border-border hover:border-primary/50 transition-colors"
                        >
                            <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Check className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-lg">{benefit}</span>
                        </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
