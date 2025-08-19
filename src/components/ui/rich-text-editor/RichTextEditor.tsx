'use client'

// Hooks
import { useEditor, EditorContent } from '@tiptap/react'

// Elements
import StarterKit from '@tiptap/starter-kit'
import { TableKit } from '@tiptap/extension-table'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Highlight from '@tiptap/extension-highlight'
import Heading from '@tiptap/extension-heading'

// Components
import Header from "./Header"
import Menubar from "./Menubar"
import { Skeleton } from '../skeleton'

export default function RichTextEditor ({
    defaultContent = 
        `
            <p> 
                <b> Embrace every moment with curiosity and joy, and let your creativity shine! </b> With Seagull, you can create professional documents and articles with full customization. Easily apply <b>bold</b>, <i>italic</i>, <u>underline</u>, or <mark>highlight</mark> your text, and enhance your content with custom nodes such as tables, images, and lists.
            </p>
            <blockquote>  
                <i> "Imagination is more important than knowledge." </i> 
                <br> Albert Einstein
            </blockquote>
        `
} : {
    defaultContent?: string
}) {
    const editor = useEditor({
    extensions: [
        StarterKit,
        Document,
        Paragraph,
        Text,
        TableKit.configure({
            table: { resizable: true, allowTableNodeSelection: true },
        }),
        Highlight.configure({ 
            multicolor: true 
        }),
        Heading.configure({
            levels: [1, 2, 3, 4],
        }),
    ],
    content: defaultContent,
    immediatelyRender: false,
    })

    // Display loading animation
    if (!editor) return <>
        <Skeleton className='h-13 w-full rounded-lg mb-3'/>
        <Skeleton className='h-90 w-full rounded-lg'/>
    </>

    return (<div>

        <div className="bg-card p-2 rounded flex flex-col gap-2 sticky top-0 shadow-2xl z-20">
            <Menubar
                editor={editor} 
            />

            <Header 
                editor={editor} 
            />
        </div>

        <div className='bg-card rounded-lg document-body'>
            <div className="relative">
                <EditorContent
                    placeholder='Start editing here'
                    className='focus:!outline-none !p-5'
                    editor={editor} 
                />
            </div>
        </div>

    </div>)
}
