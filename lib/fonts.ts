import {
  Geist_Mono as FontMono,
  Geist as FontSans,
  Inter,
  Outfit,
} from "next/font/google"

import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
})

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const fontOutfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})


export const fontVariables = cn(
  fontOutfit.variable,
  fontSans.variable,
  fontMono.variable,
  fontInter.variable
)
