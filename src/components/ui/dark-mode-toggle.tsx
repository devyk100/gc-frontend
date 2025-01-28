"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

enum Mode {
  dark = "dark",
  light = "light",
  system = "system"
}

export function ModeToggle({className}: {className?: string}) {
  const { theme, setTheme } = useTheme()
  return (<span className={cn(className)}>
    <span className="lg:hidden">Dark Mode Toggle</span>
    <Button variant="secondary" size="icon" onClick={() => {
      setTheme(theme == Mode.dark ? Mode.light : Mode.dark);
    }}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  </span>
  )
}
