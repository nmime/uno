"use client"

import { Toast, ToastProps } from "@game/Toast"
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState
} from "react"

type ToastFunction = (
  message: string,
  style: ToastProps["style"],
  duration?: number
) => void

export const ToastContext = createContext<ToastFunction | undefined>(undefined)

export function ToastProvider({ children }: PropsWithChildren<any>) {
  const [message, setMessage] = useState<string | null>(null)
  const [style, setStyle] = useState<ToastProps["style"] | null>(null)
  const [duration, setDuration] = useState(1500)

  const showToast = useCallback(
    (message: string, style: ToastProps["style"], duration: number = 1500) => {
      setMessage(message)
      setStyle(style)
      setDuration(duration)
    },
    []
  )

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
        setStyle(null)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {message && (
        <Toast
          message={message}
          style={style}
          onClose={() => setMessage(null)}
        />
      )}
    </ToastContext.Provider>
  )
}
