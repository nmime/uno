"use client"

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState
} from "react"
import { ToastError } from "@components/ToastError"

type ToastFunction = (msg: string) => void

export const ToastContext = createContext<ToastFunction | undefined>(undefined)

export function ToastProvider({ children }: PropsWithChildren<any>) {
  const [message, setMessage] = useState<string | null>(null)
  const duration = 3000

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