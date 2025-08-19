"use client"

import { Bold, Italic, Underline, List, ListOrdered, Quote, Minus, ChevronDown, Highlighter, Code2Icon, Strikethrough, TableIcon } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { Editor } from "@tiptap/react"
import { useEffect, useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "../dropdown-menu"
import { Button } from "../button"

export default function RichTextEditorHeader({
    editor,
    className = "",
}: {
    editor: Editor
    className?: string
}) {

    // Rerender the header on every editor change
    const [, setUpdate] = useState(0)
    useEffect(() => {
        if (!editor) return
        const rerender = () => setUpdate((x) => x + 1)

        editor.on("selectionUpdate", rerender)
        editor.on("transaction", rerender)

        return () => {
            editor.off("selectionUpdate", rerender)
            editor.off("transaction", rerender)
        }
    }, [editor])

    return (
        <div className={`
            ${className}
            flex flex-wrap items-center gap-2 w-full
        `}>
            
            {/* Inline formatting */}
            <ToggleGroup type="multiple">
                <ToggleGroupItem
                    value="bold"
                    aria-label="Toggle bold"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    data-state={editor.isActive("bold") ? "on" : "off"}
                >
                    <Bold className="h-4 w-4" />
                </ToggleGroupItem>

                <ToggleGroupItem
                    value="italic"
                    aria-label="Toggle italic"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    data-state={editor.isActive("italic") ? "on" : "off"}
                >
                    <Italic className="h-4 w-4" />
                </ToggleGroupItem>

                <ToggleGroupItem
                    value="underline"
                    aria-label="Toggle underline"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    data-state={editor.isActive("underline") ? "on" : "off"}
                >
                    <Underline className="h-4 w-4" />
                </ToggleGroupItem>

                <ToggleGroupItem
                    value="strike"
                    aria-label="Toggle strike"
                    onClick={() => editor.chain().focus().toggleStrike().run() }
                    data-state={editor.isActive("strike") ? "on" : "off"}
                >
                    <Strikethrough className="h-4 w-4" />
                </ToggleGroupItem>
                
                <ToggleGroupItem
                    className={editor.isActive("highlight") ? "!bg-yellow-500" : ""}
                    value="highlight"
                    aria-label="Toggle highlight"
                    onClick={() => editor.chain().focus().toggleHighlight().run() }
                    data-state={editor.isActive("highlight") ? "on" : "off"}
                >
                    <Highlighter className="h-4 w-4" />
                </ToggleGroupItem>

            </ToggleGroup>

            {/* Headings dropdown */}

            <div className="px-3 border-x">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="w-50 justify-between !bg-transparent group">
                            {editor.isActive("heading", { level: 1 })
                                ? "Heading 1"
                                : editor.isActive("heading", { level: 2 })
                                ? "Heading 2"
                                : editor.isActive("heading", { level: 3 })
                                ? "Heading 3"
                                : editor.isActive("heading", { level: 4 })
                                ? "Small text"
                                : "Paragraph"
                            }
                            <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-50 flex flex-col gap-1">
                            <DropdownMenuItem
                                className={editor.isActive("paragraph") ? "bg-foreground/5" : ""}
                                onClick={() => editor.chain().focus().setParagraph().run()}
                            >
                                Paragraph
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className={`font-[600] text-[24px] ${editor.isActive("heading", { level: 1 }) ? "bg-foreground/5" : ""}`}
                                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            >
                                Heading 1
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className={`font-[600] text-[20px]  ${editor.isActive("heading", { level: 2 }) ? "bg-foreground/5" : ""}`}
                                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            >
                                Heading 2
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className={`font-[500] text-[18px] ${editor.isActive("heading", { level: 3 }) ? "bg-foreground/5" : ""}`}
                                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            >   
                                Heading 3
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem
                                className={`text-xs text-muted-foreground ${editor.isActive("heading", { level: 4 }) ? "bg-foreground/5" : ""}`}
                                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                            >
                                Small text
                            </DropdownMenuItem>
                        </DropdownMenuContent>

                </DropdownMenu>
            </div>

            {/* Quote, code buttons */}
            <div className="border-r pr-2">
                <ToggleGroup type="multiple">
                    <ToggleGroupItem
                        value="blockquote"
                        aria-label="Toggle blockquote"
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        data-state={editor.isActive("blockquote") ? "on" : "off"}
                    >
                        <Quote className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="codeblock"
                        aria-label="Toggle codeblock"
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        data-state={editor.isActive("codeblock") ? "on" : "off"}
                    >
                        <Code2Icon className="h-4 w-4" />
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
            
            <div className="border-r pr-2">
                <ToggleGroup type="multiple">
                    <ToggleGroupItem
                        value="bulletList"
                        aria-label="Toggle bullet list"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        data-state={editor.isActive("bulletList") ? "on" : "off"}
                    >
                        <List className="h-4 w-4" />
                    </ToggleGroupItem>

                    <ToggleGroupItem
                        value="orderedList"
                        aria-label="Toggle ordered list"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        data-state={editor.isActive("orderedList") ? "on" : "off"}
                    >
                        <ListOrdered className="h-4 w-4" />
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>

            <ToggleGroup type="multiple">
                <ToggleGroupItem
                    value="hr"
                    aria-label="Insert horizontal rule"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                >
                    <Minus className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="table"
                    aria-label="Insert table"
                    onClick={() => editor.chain().focus().insertTable().run()}
                >
                    <TableIcon className="h-4 w-4" />
                </ToggleGroupItem>
            </ToggleGroup>

        </div>
    )
}
