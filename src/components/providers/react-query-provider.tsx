'use client' // Ensure this is a Client Component

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

export default function ReactQueryProvider({ children }: { children: ReactNode }) {
  // ✅ Ensure the queryClient instance is only created on the client side
  const [queryClient] = useState(() => new QueryClient())

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}