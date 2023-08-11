import React from "react"

export default function CircularProgressBar() {
  const percent = 50
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <div>
      <svg width="80" height="80" className="progress">
        <circle
          className="progress-ring"
          stroke="#ccc"
          strokeWidth="8"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
        <circle
          className="progress-bar"
          stroke="#00bfff"
          strokeWidth="8"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset
          }}
        />
      </svg>
    </div>
  )
}
