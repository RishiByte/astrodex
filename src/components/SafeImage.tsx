"use client"

import { useState } from "react"
import Image, { ImageProps } from "next/image"

export function SafeImage(props: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div style={{ position: "relative" }}>
      <Image
        {...props}
        onLoad={(e) => {
          setIsLoaded(true)
          if (props.onLoad) props.onLoad(e)
        }}
        style={{
          ...props.style,
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
      {!isLoaded && (
        <div style={{ 
          position: "absolute", 
          inset: 0, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          background: "rgba(0,0,0,0.2)"
        }}>
          Loading...
        </div>
      )}
    </div>
  )
}
