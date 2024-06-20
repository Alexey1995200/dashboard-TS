import React from "react";

interface ISpinnerProps {
  width: number,
  height: number,
  margin: number
}

export const Spinner: React.FC<ISpinnerProps> = ({width, height, margin}) => {
  return (
    <svg viewBox="0 0 100 100" style={{width: `${width}px`, height: `${height}px`, margin: `${margin}px`}}>
      <defs>
        <linearGradient id="Gradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#008000">
            <animate attributeName="stop-color" values="#008000; #008000; #008000" dur="4s"
                     repeatCount="indefinite"></animate>
          </stop>
          <stop offset="100%" stopColor="#00cc00">
            <animate attributeName="stop-color" values="#00cc00; #00cc00; #00cc00" dur="4s"
                     repeatCount="indefinite"></animate>
          </stop>
        </linearGradient>
      </defs>
      <circle className="circle" cx="50" cy="50" r="30" fill="none"
      ></circle>
    </svg>
  )
}