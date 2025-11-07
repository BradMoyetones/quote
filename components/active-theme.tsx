"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

const DEFAULT_THEME = "blue"

type ThemeContextType = {
  activeTheme: string
  setActiveTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ActiveThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode
  initialTheme?: string
}) {
  const [activeTheme, setActiveTheme] = useState<string>(() => {
    // Carga inicial: prioridad localStorage > initialTheme > DEFAULT_THEME
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("activeTheme")
      if (savedTheme) return savedTheme
    }
    return initialTheme || DEFAULT_THEME
  })

  useEffect(() => {
    // Guarda el tema actual en localStorage
    localStorage.setItem("activeTheme", activeTheme)

    // Limpia las clases previas del body
    Array.from(document.documentElement.classList)
      .filter((className) => className.startsWith("theme-"))
      .forEach((className) => {
        document.documentElement.classList.remove(className)
      })

    // Aplica la nueva clase del tema
    document.documentElement.classList.add(`theme-${activeTheme}`)

    // Si el tema incluye "-scaled", añade también esa clase
    if (activeTheme.endsWith("-scaled")) {
      document.documentElement.classList.add("theme-scaled")
    }
  }, [activeTheme])

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeConfig() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useThemeConfig must be used within an ActiveThemeProvider")
  }
  return context
}
