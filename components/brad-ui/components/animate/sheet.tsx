"use client"

import { AnimatePresence, motion, Variants } from "motion/react"
import { useEffect, useState, createContext, useContext, ReactNode } from "react"
import { cn } from "@/lib/utils"

const SIDEBAR_VARIANTS: Variants = {
    hidden: { opacity: 0, x: 300 },
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
        transition: { type: "tween", duration: 0.35, ease: "easeInOut" },
    },
}

const SidebarContext = createContext<{
    isOpen: boolean
    setIsOpen: (v: boolean) => void
}>({ isOpen: false, setIsOpen: () => {} })

export function Sidebar({
    children,
    isOpen: controlledIsOpen,
    setIsOpen: controlledSetIsOpen
}: {
    children: ReactNode
    isOpen?: boolean              // <-- opcional
    setIsOpen?: (v: boolean) => void // <-- opcional
}) {
    // Si NO pasan props → usa el estado interno.
    const [internalIsOpen, internalSetIsOpen] = useState(false)

    const isOpen = controlledIsOpen ?? internalIsOpen
    const setIsOpen = controlledSetIsOpen ?? internalSetIsOpen

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto"
            return () => {
            document.body.style.overflow = "auto"
        }
    }, [isOpen])

    return (
        <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </SidebarContext.Provider>
    )
}

export function SidebarTrigger({ asChild, children }: { asChild?: boolean; children: ReactNode }) {
    const { setIsOpen } = useContext(SidebarContext)

    if (asChild)
        return (
            <span onClick={() => setIsOpen(true)} style={{ display: "contents" }}>
                {children}
            </span>
        )

    return <button onClick={() => setIsOpen(true)}>{children}</button>
}

type SidebarContentProps = React.ComponentPropsWithoutRef<typeof motion.div>

export function SidebarContent({ className, children, ...props }: SidebarContentProps) {
    const { isOpen, setIsOpen } = useContext(SidebarContext)

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-background/50 z-50"
                    onClick={() => setIsOpen(false)}
                />

                <motion.div
                    variants={SIDEBAR_VARIANTS}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={cn(
                        "fixed top-0 right-0 h-screen w-64 bg-background border-l border-border z-60 p-6 flex flex-col gap-6 shadow-lg",
                        className
                    )}
                    {...props}
                >
                    {children}
                </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

type SidebarCloseProps = React.ComponentPropsWithoutRef<typeof motion.button>

export function SidebarClose({ children, ...props }: SidebarCloseProps) {
    const { setIsOpen } = useContext(SidebarContext)
    return (
        <motion.button 
            onClick={() => setIsOpen(false)} 
            className="mt-auto"
            {...props}
        >
            {children}
        </motion.button>
    )
}
