"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"

export function PreviewSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section ref={ref} className="py-24 bg-linear-to-b from-muted/30 to-background">
            <div className="container px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Editor intuitivo y poderoso</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Interfaz diseñada para maximizar tu productividad
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative max-w-6xl mx-auto"
                >
                    <div className="relative rounded-2xl overflow-hidden border-2 border-border shadow-2xl bg-card">
                        <div className="aspect-video bg-linear-to-br from-primary/5 via-chart-1/5 to-chart-2/5 flex items-center justify-center">
                            <div className="text-center p-8">
                                <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-primary/10 mb-6">
                                    <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Vista previa del editor</h3>
                                <p className="text-muted-foreground">
                                    Interfaz limpia y profesional para crear cotizaciones rápidamente
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-chart-1/20 rounded-full blur-3xl" />
                </motion.div>
            </div>
        </section>
    )
}
