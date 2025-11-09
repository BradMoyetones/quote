"use client"

import { motion } from "framer-motion"
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
import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"
import UserDropdown from "@/components/user-dropdown"

const LOGO_WRAPPER_VARIANTS = {
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

export const Header = ({ transition }: { transition: boolean }) => {
    const isMobile = useIsMobile()

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
                    className="absolute z-110 flex items-center gap-x-4"
                >
                    <div className="hidden sm:flex items-center gap-x-1">
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

                                <span className="rounded-[4px] flex items-center gap-x-1 select-none bg-accent dark:group-hover:bg-neutral-900 group-hover:bg-white text-sm py-1 pl-1.5 pr-[5px]">
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
                    </div>
                    
                    <ModeToggle />
                    <ThemeSelector />
                    <UserDropdown />

                </motion.div>
            </div>
        </motion.div>
    )
}
