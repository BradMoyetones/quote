"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-b from-background via-background to-muted/20">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

            <div className="container px-4 pt-32 pb-20 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2 }}
                    className="mx-auto max-w-4xl"
                >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 2.2 }}
                    className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-2"
                >
                    <span className="text-sm font-medium text-primary">✨ Cotizaciones profesionales en minutos</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.4 }}
                    className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-balance"
                >
                    Crea cotizaciones{" "}
                    <span className="bg-linear-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent">
                        hermosas
                    </span>{" "}
                    en segundos
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.6 }}
                    className="mb-8 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto text-pretty"
                >
                    La herramienta definitiva para gestionar múltiples empresas, productos y generar cotizaciones profesionales
                    con un solo clic.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Button size="lg" className="text-base group">
                    Empezar gratis
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button size="lg" variant="outline" className="text-base bg-transparent">
                    Ver demo
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 3 }}
                    className="mt-12 text-sm text-muted-foreground"
                >
                    No requiere tarjeta de crédito • Funciona sin conexión
                </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
