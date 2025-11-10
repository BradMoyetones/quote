import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PartyPopper } from '@/components/animate-ui/icons/party-popper';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';
import { MotionEffect } from '@/components/effects/motion-effect';
import { SplittingText } from '@/components/animate-ui/primitives/texts/splitting';
import ReactIcon from '@/components/icons/react-icon';
import TSIcon from '@/components/icons/ts-icon';
import TailwindIcon from '@/components/icons/tailwind-icon';
import MotionIcon from '@/components/icons/motion-icon';
import ShadcnIcon from '@/components/icons/shadcn-icon';
import { ArrowRightIcon } from '@/components/animate-ui/icons/arrow-right';
import { AnimatedBackground } from '@/components/ui/animated-background';

const ICONS = [ReactIcon, TSIcon, TailwindIcon, MotionIcon, ShadcnIcon];
const TITLE = 'Cotizaciones profesionales en minutos';

export const Hero = () => {
    return (
        <div className="relative overflow-x-hidden flex flex-col items-center px-5 bg-linear-to-b from-background via-background to-muted/20">
            <AnimatedBackground circleCount={5} circleOpacity={0.11} />
            <div className="relative min-h-[calc(100vh-53px)] z-10 flex flex-col items-center justify-center">
                <MotionEffect
                    slide={{
                        direction: 'down',
                    }}
                    fade
                    zoom
                    inView
                >
                    <div className="mb-8 rounded-full bg-accent py-1 pl-1 pr-3 text-sm flex items-center gap-2">
                        <Link
                            href="/editor"
                            className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400"
                        >
                            <span className="h-6 px-2 bg-primary text-xs text-primary-foreground rounded-full flex gap-1 items-center justify-center">
                                New
                                <PartyPopper delay={500} className="size-3.5" animate />
                            </span>{' '}
                            <span>Editor</span>
                        </Link>
                    </div>
                </MotionEffect>

                <MotionEffect
                    slide={{
                        direction: 'down',
                    }}
                    fade
                    zoom
                    inView
                    delay={0.15}
                >
                    <div className="relative z-10">
                        <h1 className="md:max-w-[800px] max-w-[320px]">
                            <SplittingText
                                text={TITLE}
                                aria-hidden="true"
                                className="block md:text-5xl text-4xl font-medium text-center text-neutral-200 dark:text-neutral-800"
                                disableAnimation
                            />
                        </h1>
                        <div className="md:max-w-[800px] max-w-[320px] absolute inset-0 flex items-center justify-center">
                            <SplittingText
                                text={TITLE}
                                className="block md:text-5xl text-4xl font-medium text-center"
                                type="chars"
                                delay={400}
                                initial={{ y: 0, opacity: 0, x: 0, filter: 'blur(10px)' }}
                                animate={{ y: 0, opacity: 1, x: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                            />
                        </div>
                    </div>
                </MotionEffect>

                <MotionEffect
                    slide={{
                        direction: 'down',
                    }}
                    fade
                    zoom
                    inView
                    delay={0.3}
                >
                    <p className="block font-normal md:text-lg sm:text-base text-sm text-center mt-3 text-muted-foreground md:max-w-[660px] sm:max-w-[450px] text-balance">
                        La herramienta definitiva para gestionar múltiples empresas, productos y generar cotizaciones profesionales
                        con un solo clic.
                    </p>
                </MotionEffect>

                <div className="flex sm:flex-row flex-col sm:gap-4 gap-3 mt-5 mb-8 max-sm:w-full">
                    <MotionEffect
                        slide={{
                            direction: 'down',
                        }}
                        fade
                        zoom
                        delay={0.45}
                    >
                        <AnimateIcon animateOnHover="out" completeOnStop asChild>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    size="sm"
                                    className="w-full !pr-5"
                                    variant="default"
                                    asChild
                                >
                                    <Link href="/editor">
                                        Empezar <ArrowRightIcon className="!size-5" />
                                    </Link>
                                </Button>
                            </motion.div>
                        </AnimateIcon>
                    </MotionEffect>

                    <MotionEffect
                        slide={{
                            direction: 'down',
                        }}
                        fade
                        zoom
                        delay={0.6}
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="sm" className="w-full" variant="secondary" asChild>
                                <Link href="/demo">Ver demo</Link>
                            </Button>
                        </motion.div>
                    </MotionEffect>
                </div>

                <div className="flex items-center gap-4 justify-center sm:justify-start">
                    {ICONS.map((Icon, index) => (
                        <MotionEffect
                            key={index}
                            slide={{
                                direction: 'down',
                            }}
                            fade
                            zoom
                            delay={0.75 + index * 0.1}
                        >
                            <Icon className="size-8" />
                        </MotionEffect>
                    ))}
                </div>
                <MotionEffect
                    slide={{
                        direction: 'down',
                    }}
                    fade
                    zoom
                    delay={0.85}
                    className="mt-12 text-sm text-muted-foreground"
                >
                    <p>
                        No requiere tarjeta de crédito • Funciona sin conexión
                    </p>
                </MotionEffect>
            </div>
        </div>
    );
};