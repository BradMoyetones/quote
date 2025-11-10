"use client"

import { motion } from "motion/react"
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
import { StarIcon } from "lucide-react"
import Link from "next/link"
import UserDropdown from "@/components/user-dropdown"
import { useEffect, useState } from "react"
import { Menu } from "@/components/animate-ui/icons/menu"
import { AnimateIcon } from "@/components/animate-ui/icons/icon"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sidebar, SidebarContent, SidebarTrigger } from "@/components/brad-ui/components/animate/sheet"
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler"

export const Header = ({ transition }: { transition: boolean }) => {
    const isMobile = useIsMobile()
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

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


    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])


    return (
        <>
        {!transition && (
            <div className="fixed inset-0 scale-z-110 flex items-center justify-center">
                <motion.div layoutId="logo" className="">
                    <Logo size={isMobile ? "lg" : "xl"} draw />
                </motion.div>
            </div>
        )}
        <motion.div
            initial="center"
            animate={transition ? "topLeft" : "center"}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className={`
                sticky top-0 z-40 flex items-center justify-center backdrop-blur-md w-full
                transition-all duration-300 py-2 px-4
                ${scrolled ? "border-b border-border/40 shadow-sm" : ""}
            `}
        >
            <div className="max-w-7xl size-full flex items-center justify-between">
                <Link href={"/"}>
                    
                    {transition && (
                        <motion.div
                            layoutId="logo"
                            className="z-110 left-5"
                            animate={{
                                top: scrolled ? 16 : 32,
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        >
                            <Logo size="sm" />
                        </motion.div>
                    )}
                </Link>

                <motion.div
                    initial={{
                        translateX: -43,
                        opacity: 0,
                    }}
                    animate={
                        transition
                        ? {
                            translateX: 0,
                            opacity: 1,
                            }
                        : {
                            translateX: 43,
                            opacity: 0,
                        }
                    }
                    transition={{ type: "spring", stiffness: 200, damping: 30 }}
                    className="z-110 flex items-center gap-x-2"
                >
                    <div className="hidden sm:flex items-center gap-x-2">
                        <GithubStars
                            username="BradMoyetones"
                            repo="quote"
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
                    
                        <AnimatedThemeToggler variant={"ghost"} size={"icon"} />
                        <ThemeSelector />
                    </div>

                    <UserDropdown />
                    
                    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}>
                        <SidebarTrigger asChild>
                            <Button 
                                variant="ghost" 
                                size="icon"
                                className="sm:hidden"
                            >
                                <AnimateIcon>
                                    <Menu animate={isOpen} />
                                </AnimateIcon>
                            </Button>
                        </SidebarTrigger>

                        <SidebarContent>
                            <div className="flex flex-col gap-4">
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
                                        <AnimatedThemeToggler variant={"ghost"} size={"icon"} />
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
                            </div>
                        </SidebarContent>
                    </Sidebar>
                </motion.div>
            </div>
        </motion.div>
        </>
    )
}
