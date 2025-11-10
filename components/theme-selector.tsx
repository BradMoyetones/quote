"use client"

import { THEMES } from "@/lib/themes"
import { useThemeConfig } from "@/components/active-theme"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check } from "lucide-react"

export function ThemeSelector({ ...props }: React.ComponentProps<typeof Button>) {
  const { activeTheme, setActiveTheme } = useThemeConfig()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={"ghost"} 
          size={"icon"}
          {...props}
        >
          <div className="font-medium bg-primary rounded-full h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Color</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {THEMES.map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            onClick={() => setActiveTheme(theme.name)}
            disabled={theme.name === activeTheme}
            className="data-[state=checked]:opacity-50"
          >
            <div className="font-medium rounded-full h-4 w-4" style={{backgroundColor: `hsl(${theme.activeColor.dark})`}} />
            {theme.label === "Neutral" ? "Default" : theme.label}
            {theme.name === activeTheme && (
              <DropdownMenuShortcut>
                <Check />
              </DropdownMenuShortcut>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
