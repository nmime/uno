"use client"

import { ToastError } from "@game/ToastError"
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState
} from "react"

type ToastFunction = (msg: string) => void

export const ToastContext = createContext<ToastFunction | undefined>(undefined)

export function ToastProvider({ children }: PropsWithChildren<any>) {
  const [message, setMessage] = useState<string | null>(null)
  const duration = 1500

  const showToast = useCallback((msg: string) => {
    setMessage(msg)
  }, [])

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {message && (
        <ToastError message={message} onClose={() => setMessage(null)} />
      )}
    </ToastContext.Provider>
  )
}
