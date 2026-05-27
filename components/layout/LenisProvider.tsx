'use client'
import { createContext, useContext, type ReactNode } from 'react'
import type Lenis from 'lenis'
import useLenis from '@/hooks/useLenis'

const LenisContext = createContext<React.RefObject<Lenis | null> | null>(null)

export function useLenisContext() {
  return useContext(LenisContext)
}

interface LenisProviderProps {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useLenis()

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  )
}
