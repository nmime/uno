import React from "react"

interface ErrorProps {
  message: string
  onClose: () => void
}

export function ToastError({ message, onClose }: ErrorProps) {
  return (
    <div className="fixed left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-red-500 p-4 text-white shadow-lg">
      <button
        onClick={onClose}
        className="ml-auto focus:border-none focus:outline-none"
      >
        <div>{message}</div>
      </button>
    </div>
  )
}
