"use client"

import { useEffect, useState } from "react"
import type { JSONContent } from "@tiptap/react"
import { TextIcon } from "lucide-react"

type Heading = { level: 1 | 2 | 3 | 4 | 5 | 6; label: string; slug: string }

// same slug logic as in ReadOnly
function makeSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "") // keep only alphanumeric + spaces
        .trim()
        .replace(/\s+/g, "-") // spaces → dashes
}

export default function HeadingsList({ json }: { json: JSONContent }) {
    const [headings, setHeadings] = useState<Heading[]>([])

    useEffect(() => {
        if (!json?.content) return

        const newHeadings: Heading[] = []

        const walk = (node: JSONContent) => {
            if (node.type === "heading") {
                const level = (node.attrs?.level ?? 1) as Heading["level"]
                const label =
                    node.content?.map(c => c.text ?? "").join(" ").trim() ?? ""

                if (label && level < 4) {
                    newHeadings.push({ level, label, slug: makeSlug(label) })
                }
            }

            if (node.content) {
                node.content.forEach(walk)
            }
        }

        json.content.forEach(walk)
        setHeadings(newHeadings)
    }, [json])

    if (headings.length === 0) return null

    return (
        <div className="space-y-2">
            <h2 className="text-sm text-muted-foreground font-semibold flex gap-2 items-center">
                <TextIcon size={20} /> On this page
            </h2>
            <ul className="text-foreground/70 list-none pl-4 space-y-1 border-l ml-2 pb-1">
                {headings.map((h, i) => (
                    <li key={i} className={`ml-${(h.level - 1) * 4}`}>
                        <a
                            href={`#${h.slug}`}
                            className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                        >
                            {h.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
