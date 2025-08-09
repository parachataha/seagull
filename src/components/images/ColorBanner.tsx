"use client"
/**
 * Uses the browser to get the most dominant HEX color in a given image
 * @param imageUrl - URL from uploadThing
 * @returns a hex value (eg: #FFFFFF)
 */
// app/(pages)/user/[slug]/page.tsx
"use client"

import { useEffect, useState } from "react"

const getDominantHexColorFromURL = (imageUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = imageUrl

        img.onload = () => {
            const canvas = document.createElement("canvas")
            canvas.width = img.width
            canvas.height = img.height

            const ctx = canvas.getContext("2d")
            if (!ctx) return reject(new Error("No 2D context found"))

            ctx.drawImage(img, 0, 0)
            const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data

            const colorCounts: Record<string, number> = {}
            let maxCount = 0
            let dominantColor = "#000000"

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i]
                const g = data[i + 1]
                const b = data[i + 2]
                const hex = `#${r.toString(16).padStart(2, "0")}${g
                    .toString(16)
                    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`

                colorCounts[hex] = (colorCounts[hex] || 0) + 1

                if (colorCounts[hex] > maxCount) {
                    maxCount = colorCounts[hex]
                    dominantColor = hex
                }
            }

            resolve(dominantColor)
        }

        img.onerror = () => reject(new Error("Failed to load image"))
    })
}

const defaultAvatar = "https://z90iq4irr8.ufs.sh/f/b0Ply9TOA2MWkJFTETqQ9siFb6I2MDh07RmWVynLSBzdeX3q"

export default function ColorBanner( {imageURL = defaultAvatar, className, children} : {imageURL: string, className?: string, children?: React.ReactNode} ) {

    const [color, setColor] = useState<string>("#332700")

    useEffect(() => {
        const run = async () => {
            try {
                const colorValue = await getDominantHexColorFromURL(imageURL)
                setColor(colorValue || "#332700")
            } catch (err) {
                console.log("Failed to extract dominant color:", err)
                setColor("#332700") // fallback
            }
        }
        run()
    }, [imageURL])

    return ( <div className={`w-full h-20 ${className ?? ""}`} style={{ backgroundColor: color }}> 
        {children}
    </div>  )
}
