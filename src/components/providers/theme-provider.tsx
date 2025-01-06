'use client'

import * as React from 'react'
const NextThemesProvider = dynamic(
	() => import('next-themes').then((e) => e.ThemeProvider),
	{
		ssr: false,
	}
)

// @ts-expect-error hha
import { type ThemeProviderProps } from 'next-themes/dist/types'
import dynamic from 'next/dynamic'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}