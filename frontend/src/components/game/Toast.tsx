import { DimensionContext } from "@contexts/Dimension"
import Image from "next/image"
import React, { useContext } from "react"

export interface ToastProps {
  message: string
  style: "info" | "error" | "warning"
  onClose: () => void
}

export function Toast({ message, onClose, style }: ToastProps) {
  const { cardWidth, playerSize } = useContext(DimensionContext)

  const bgColor = (style: string) => {
    switch (style) {
      case "error":
        return "bg-red-500"
      case "warning":
        return "bg-yellow-400"
      case "info":
      default:
        return "bg-blue-500"
    }
  }

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-lg p-2 ${bgColor(
        style
      )} text-white shadow-xl transition duration-300 ease-in-out`}
      style={{
        maxWidth: `${cardWidth * 2}px`,
        padding: `${playerSize * 0.05}px`,
        top: `${playerSize * 1.3}px`
      }}
    >
      <div className="flex items-center space-x-2">
        <Image
          src={`/assets/warn.svg`}
          alt=""
          width={playerSize * 0.3}
          height={playerSize * 0.3}
          className="inline-block"
        />
        <span className="flex-1 break-words">
          <p className="text-sm font-medium">{message}</p>
        </span>
        <button
          onClick={onClose}
          className="text-whit mr-1 inline-flex items-center justify-center rounded-full"
          aria-label="Close"
        >
          <svg
            style={{
              height: `${playerSize * 0.2}px`,
              width: `${playerSize * 0.2}px`
            }}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}
