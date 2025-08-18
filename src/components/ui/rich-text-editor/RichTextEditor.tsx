'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// Elements
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit, Document, Paragraph, Text],
    content: '<p>Welcome to your Editor</p>',
    immediatelyRender: false,
  })

  return <EditorContent editor={editor} />
}

export default RichTextEditor