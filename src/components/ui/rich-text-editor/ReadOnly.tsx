// app/components/ReadOnly.tsx
import React from "react"
import { generateHTML } from "@tiptap/html/server"

// Import only SSR-safe extensions
import Document from "@tiptap/extension-document"
import Paragraph from "@tiptap/extension-paragraph"
import Text from "@tiptap/extension-text"
import Bold from "@tiptap/extension-bold"
import Italic from "@tiptap/extension-italic"
import Underline from "@tiptap/extension-underline"
import Highlight from "@tiptap/extension-highlight"
import Strike from "@tiptap/extension-strike"
import ListItem from "@tiptap/extension-list-item"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import Blockquote from "@tiptap/extension-blockquote"
import CodeBlock from "@tiptap/extension-code-block"
import HorizontalRule from "@tiptap/extension-horizontal-rule"
import HardBreak from "@tiptap/extension-hard-break"
import { TableKit } from "@tiptap/extension-table"
import Heading from "@tiptap/extension-heading"

type ReadOnlyProps = {
    json: any // tiptap JSON (body)
}

// Simple slugify helper
function makeSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "") // keep letters, numbers, spaces
        .trim()
        .replace(/\s+/g, "-") // spaces → dashes
}

// 🔑 Custom Heading extension to add `id` + anchors
const CustomHeading = Heading.configure({
    levels: [1, 2, 3, 4],
}).extend({
    renderHTML({ node, HTMLAttributes }) {
        const level = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0]

        // Turn Fragment → JSON → array of nodes
        const content = (node.content as any)?.toJSON?.() ?? []
        const text = content.map((c: any) => c.text || "").join(" ").trim()
        const slug = node.attrs.id || makeSlug(text)

        return [
            `h${level}`,
            { ...HTMLAttributes, id: slug },
            [
                "a",
                {
                    href: `#${slug}`,
                    class: "no-underline hover:underline",
                },
                0,
            ],
        ]
    },
})

export const tiptapExtensions = [
    Document,
    Paragraph,
    Text,
    CustomHeading, // 👈 custom heading
    Bold,
    Underline,
    Highlight,
    Italic,
    Strike,
    ListItem,
    BulletList,
    OrderedList,
    Blockquote,
    CodeBlock,
    HorizontalRule,
    HardBreak,
    TableKit,
]

export default function ReadOnly({ json }: ReadOnlyProps) {
    const html = generateHTML(json, tiptapExtensions)

    return (
        <div
            className="document-body dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}
