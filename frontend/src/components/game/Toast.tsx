import { DimensionContext } from "@contexts/Dimension"
import Image from "next/image"
import React, { useContext } from "react"

export interface ToastProps {
  message: string
  style: "info" | "error" | "warning"
  onClose: () => void
}

export function Toast({ message, onClose, style }: ToastProps) {
  const { playerSize } = useContext(DimensionContext)

  return (
    <div
      className={`fixed left-1/2 flex -translate-x-1/2 -translate-y-1/2 rounded-lg bg-red-500 text-white shadow-lg transition-all active:ease-in-out`}
      style={{
        backgroundColor:
          style === "error"
            ? "rgb(239 68 68)"
            : style === "warning"
              ? "rgb(253 224 71)"
              : "rgb(2 132 199)",
        padding: `${playerSize * 0.05}px`,
        top: `${playerSize * 1.3}px`
      }}
    >
      <button
        onClick={onClose}
        className="flex items-center focus:border-none focus:outline-none"
      >
        <Image
          src={`/assets/warn.svg`}
          alt=""
          width={playerSize * 0.3}
          height={playerSize * 0.3}
          className="mr-1 inline-block"
        />
        {message}
      </button>
    </div>
  )
}
