import Image from "next/image"
import React from "react"

interface ErrorProps {
  message: string
  onClose: () => void
}

export function ToastError({ message, onClose }: ErrorProps) {
  return (
    <div className="fixed left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-red-500 p-2 text-white shadow-lg transition-all active:ease-in-out">
      <button
        onClick={onClose}
        className="ml-auto focus:border-none focus:outline-none"
      >
        <div className="flex items-center">
          <Image
            src={`/assets/warn.svg`}
            alt=""
            width={20}
            height={20}
            className="mr-1 inline-block"
          />
          {message}
        </div>
      </button>
    </div>
  )
}
