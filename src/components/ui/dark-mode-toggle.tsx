"use client"

import * as React from "react"
import { Moon, MoonIcon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

enum Mode{
    dark = "dark",
    light = "light",
    system = "system"
}

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  return (<>
        <Button variant="secondary" size="icon" onClick={() => {
            setTheme(theme == Mode.dark? Mode.light: Mode.dark);
          }}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
        </Button>
  </>
  )
}
