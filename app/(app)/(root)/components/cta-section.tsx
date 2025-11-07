"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section ref={ref} className="py-24 bg-background">
            <div className="container px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <div className="rounded-3xl bg-linear-to-br from-primary/10 via-chart-1/10 to-chart-2/10 p-12 md:p-16 border border-primary/20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-3xl md:text-5xl font-bold mb-6 text-balance"
                        >
                            Comienza a crear cotizaciones profesionales hoy
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                        >
                            Sin registro, sin complicaciones. Solo abre la app y empieza a trabajar.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Button size="lg" className="text-base group">
                                Empezar ahora
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                            <Button size="lg" variant="outline" className="text-base bg-transparent">
                                Explorar características
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
