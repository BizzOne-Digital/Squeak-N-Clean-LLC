"use client"

import { useState, type CSSProperties } from "react"

export type UplinkLoaderProps = {
  className?: string
  style?: CSSProperties
}

export function UplinkLoader({ className = "", style }: UplinkLoaderProps) {
  const [ready, setReady] = useState(false)

  return (
    <div
      className={`uplink-loader${className ? ` ${className}` : ""}`}
      data-state={ready ? "ready" : "loading"}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#0B131F",
        ...style,
      }}
    >
      <iframe
        title="SYS.LINK uplink progress loader"
        src="/uplink-loader.html?run=1300"
        sandbox="allow-scripts"
        // Lazy: when the splash is hidden (seen this session / reduced motion) the iframe never loads.
        loading="eager"
        onLoad={() => setReady(true)}
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
          width: "100%",
          height: "100%",
          border: 0,
          background: "#0B131F",
        }}
      />
    </div>
  )
}