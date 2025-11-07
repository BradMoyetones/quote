"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { Building2, Package, FileText, Download, Cloud, Zap } from "lucide-react"

const features = [
    {
        icon: Building2,
        title: "Múltiples Empresas",
        description: "Gestiona tantas empresas como necesites con información personalizada para cada una.",
    },
    {
        icon: Package,
        title: "Catálogo de Productos",
        description: "Organiza tus productos por empresa con precios, descripciones e imágenes.",
    },
    {
        icon: FileText,
        title: "Cotizaciones Dinámicas",
        description: "Crea cotizaciones profesionales con tu branding en segundos.",
    },
    {
        icon: Download,
        title: "Exporta a PDF",
        description: "Genera PDFs hermosos listos para enviar a tus clientes.",
    },
    {
        icon: Cloud,
        title: "Funciona sin Internet",
        description: "Todo se guarda localmente. Sin necesidad de conexión o registro.",
    },
    {
        icon: Zap,
        title: "Súper Rápido",
        description: "Interfaz optimizada para crear cotizaciones a la velocidad del rayo.",
    },
]

export function FeaturesSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section ref={ref} className="py-24 bg-muted/30">
            <div className="container px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Todo lo que necesitas para cotizar</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Herramientas poderosas diseñadas para hacerte la vida más fácil
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                        >
                            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
