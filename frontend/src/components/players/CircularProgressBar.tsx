import React from "react"

export type CircularProgressBarProps = {
  color: string
  percentage: number
}

export default function CircularProgressBar({
  percentage,
  color
}: CircularProgressBarProps) {
  return (
    <svg className="absolute left-0 top-0 h-full w-full">
      <circle
        cx="50%"
        cy="50%"
        r="40%"
        className="circle fill-none stroke-[5px]"
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "center",
          strokeDashoffset:
            ((100 - percentage) / 100) * (2 * Math.PI * 0.4 * 100),
          strokeDasharray: 2 * Math.PI * 0.385 * 100,
          stroke: color,
          strokeLinecap: "round",
          filter: `drop-shadow(0 0 4px ${color})`
        }}
      ></circle>
    </svg>
  )
}
