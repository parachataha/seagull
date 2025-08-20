// app/components/ReadOnly.tsx
import React from "react"
import { generateHTML } from "@tiptap/html/server"

// Import only SSR-safe extensions
import Document from "@tiptap/extension-document"
import Paragraph from "@tiptap/extension-paragraph"
import Text from "@tiptap/extension-text"
import Heading from "@tiptap/extension-heading"
import Bold from "@tiptap/extension-bold"
import Italic from "@tiptap/extension-italic"
import Strike from "@tiptap/extension-strike"
import ListItem from "@tiptap/extension-list-item"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import Blockquote from "@tiptap/extension-blockquote"
import CodeBlock from "@tiptap/extension-code-block"
import HorizontalRule from "@tiptap/extension-horizontal-rule"
import HardBreak from "@tiptap/extension-hard-break"
import { TableKit } from "@tiptap/extension-table"

type ReadOnlyProps = {
  json: any // your tiptap JSON (body)
}

export const tiptapExtensions = [
    Document,
    Paragraph,
    Text,
    Heading,
    Bold,
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
