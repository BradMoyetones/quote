"use client"

import { THEMES } from "@/lib/themes"
import { cn } from "@/lib/utils"
import { useThemeConfig } from "@/components/active-theme"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "./ui/button"

// import { CopyCodeButton } from "./theme-customizer"

export function ThemeSelector({ className }: React.ComponentProps<"div">) {
  const { activeTheme, setActiveTheme } = useThemeConfig()

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Label htmlFor="theme-selector" className="sr-only">
        Theme
      </Label>
      <Select value={activeTheme} onValueChange={setActiveTheme}>
        <Button asChild variant={"outline"}>
          <SelectTrigger
            id="theme-selector"
          >
            <div className="font-medium bg-primary rounded-full h-4 w-4" />
          </SelectTrigger>
        </Button>
        <SelectContent align="end">
          {THEMES.map((theme) => (
            <SelectItem
              key={theme.name}
              value={theme.name}
              className="data-[state=checked]:opacity-50"
            >
              <div className="font-medium rounded-full h-4 w-4" style={{backgroundColor: `hsl(${theme.activeColor.dark})`}} />
              {theme.label === "Neutral" ? "Default" : theme.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* <CopyCodeButton variant="secondary" size="sm" /> */}
    </div>
  )
}
