"use client"

import { AnimatePresence, motion, Variants } from "motion/react"
import { Logo } from "@/components/logo-delta"
import { useIsMobile } from "@/hooks/use-mobile"
import { ThemeSelector } from "@/components/theme-selector"
import {
    GithubStars,
    GithubStarsIcon,
    GithubStarsLogo,
    GithubStarsNumber,
    GithubStarsParticles,
} from '@/components/animate-ui/primitives/animate/github-stars';
import { StarIcon, X } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"
import UserDropdown from "@/components/user-dropdown"
import { useEffect, useState } from "react"
import { Menu } from "@/components/animate-ui/icons/menu"
import { AnimateIcon } from "@/components/animate-ui/icons/icon"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const LOGO_WRAPPER_VARIANTS: Variants = {
    center: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: "100%",
    },
    topLeft: {
        top: 0,
        left: 0,
        right: 0,
        bottom: "auto",
        height: "auto",
    },
}

const SIDEBAR_VARIANTS: Variants = {
    hidden: {
        opacity: 0,
        x: 300,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 25,
        },
    },
    exit: {
        opacity: 0,
        x: [0, -40, 300],
        transition: {
            type: "tween",
            duration: 0.35,
            ease: "easeInOut",
        },
    },
}

export const Header = ({ transition }: { transition: boolean }) => {
    const isMobile = useIsMobile()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (isOpen) {
            // Deshabilitar scroll
            document.body.style.overflow = "hidden";
        } else {
            // Habilitar scroll
            document.body.style.overflow = "auto";
        }

        // Cleanup por si el componente se desmonta
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <motion.div
            variants={LOGO_WRAPPER_VARIANTS}
            initial="center"
            animate={transition ? "topLeft" : "center"}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className="absolute z-40 flex items-center justify-center"
        >
            <div className="relative max-w-7xl size-full">
                <Link href={"/"}>
                    
                    {transition ? (
                        <motion.div
                            layoutId="logo"
                            className="absolute z-110 left-5"
                            animate={{
                                top: 32,
                            }}
                        >
                            <Logo size="sm" />
                        </motion.div>
                    ) : (
                        <motion.div layoutId="logo" className="absolute z-110 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Logo size={isMobile ? "lg" : "xl"} draw />
                        </motion.div>
                    )}
                </Link>

                <motion.div
                    initial={{
                        top: 28,
                        right: -43,
                        opacity: 0,
                    }}
                    animate={
                        transition
                        ? {
                            top: 28,
                            right: 20,
                            opacity: 1,
                            }
                        : {
                            top: 28,
                            right: -43,
                            opacity: 0,
                            }
                    }
                    transition={{ type: "spring", stiffness: 200, damping: 30 }}
                    className="absolute z-110 flex items-center gap-x-2"
                >
                    <div className="hidden sm:flex items-center gap-x-2">
                        <GithubStars
                            username="BradMoyetones"
                            repo="quote"
                            delay={2000}
                            asChild
                        >
                            <a
                                href="https://github.com/BradMoyetones/quote"
                                rel="noreferrer noopener"
                                target="_blank"
                                className="group cursor-pointer justify-center rounded-md text-sm group font-medium transition-colors duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50 hover:bg-fd-accent hover:text-fd-accent-foreground p-1.5 [&_svg]:size-5 text-fd-muted-foreground sm:[&_svg]:size-5.5 flex items-center gap-x-2"
                            >
                                <GithubStarsLogo className="size-6" />

                                <span className="rounded-lg flex items-center gap-x-1 select-none bg-accent dark:group-hover:bg-neutral-900 group-hover:bg-white text-sm py-1 pl-1.5 pr-[5px]">
                                    <GithubStarsNumber />{' '}
                                    <GithubStarsParticles>
                                        <GithubStarsIcon
                                            icon={StarIcon}
                                            className="!size-4"
                                            activeClassName="text-muted-foreground group-hover:text-current"
                                        />
                                    </GithubStarsParticles>
                                </span>
                            </a>
                        </GithubStars>
                    
                        <ModeToggle />
                        <ThemeSelector />
                    </div>

                    <UserDropdown />
                    <Button
                        onClick={() => setIsOpen(!isOpen)}
                        variant={"ghost"}
                        size={"icon"}
                        className="sm:hidden"
                    >
                        <AnimateIcon>
                            <Menu animate={isOpen} />
                        </AnimateIcon>
                    </Button>
                </motion.div>

                <AnimatePresence>
                    {isOpen && (
                        <>
                        <motion.div
                            initial={{
                                opacity: 0
                            }}
                            animate={{
                                opacity: 1
                            }}
                            exit={{
                                opacity: 0
                            }}
                            className="fixed inset-0 bg-background/50 z-111"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            variants={SIDEBAR_VARIANTS}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed top-0 right-0 h-screen w-64 bg-background border-l border-border z-112 p-6 flex flex-col gap-6 shadow-lg"
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold text-muted-foreground">Menu</span>
                                <Button 
                                    variant={"ghost"} 
                                    size={"icon"} 
                                    onClick={() => setIsOpen(false)}
                                >
                                    <AnimateIcon>
                                        <Menu animate={isOpen} />
                                    </AnimateIcon>
                                </Button>
                            </div>

                            {/* GitHub Stars Section */}
                            <div className="flex items-center justify-center">
                                <GithubStars username="BradMoyetones" repo="quote" delay={0} asChild>
                                    <a
                                        href="https://github.com/BradMoyetones/quote"
                                        rel="noreferrer noopener"
                                        target="_blank"
                                        className="group cursor-pointer justify-center rounded-md text-sm font-medium transition-colors duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground p-3 [&_svg]:size-5 flex flex-col items-center gap-2 w-full"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <GithubStarsLogo className="size-8" />
                                        <span className="text-xs text-muted-foreground">GitHub Stars</span>
                                        <span className="rounded-lg flex items-center gap-x-1 select-none bg-accent hover:bg-muted text-sm py-1 pl-1.5 pr-[5px]">
                                            <GithubStarsNumber />{" "}
                                            <GithubStarsParticles>
                                                <GithubStarsIcon
                                                    icon={StarIcon}
                                                    className="!size-4"
                                                    activeClassName="text-muted-foreground group-hover:text-current"
                                                />
                                            </GithubStarsParticles>
                                        </span>
                                    </a>
                                </GithubStars>
                            </div>

                            <Separator />

                            {/* Settings Section */}
                            <div className="flex flex-col gap-3">
                                <span className="text-xs font-semibold text-muted-foreground tracking-wide">Ajustes</span>
                                <div className="flex items-center justify-between px-3 py-2 rounded-md transition-colors">
                                    <span className="text-sm">Tema</span>
                                    <ModeToggle />
                                </div>
                                <div className="flex items-center justify-between px-3 py-2 rounded-md transition-colors">
                                    <span className="text-sm">Color</span>
                                    <ThemeSelector />
                                </div>
                            </div>

                            <Separator />

                            {/* User Section */}
                            <div className="flex items-center justify-center">
                                <UserDropdown mode="mobile" />
                            </div>

                            {/* Spacer */}
                            <div className="flex-1" />
                        </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}
