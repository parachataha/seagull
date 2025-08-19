"use client"

// Components
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"

// Hooks
import { useEffect, useState } from "react"

// Types
import type { Editor } from "@tiptap/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../dropdown-menu"
import { BookMarkedIcon, BuildingIcon, ChartBarIcon, ChartLineIcon, ChartNoAxesCombinedIcon, ChartScatterIcon, Code2Icon, CreditCardIcon, FlaskConicalIcon, GlobeIcon, ImageIcon, LinkIcon, MessageCircleQuestionMarkIcon, MinusIcon, NotebookTextIcon, PieChart, PieChartIcon, PlusIcon, QuoteIcon, Redo2Icon, RotateCcwIcon, SaveIcon, TableIcon, Trash2Icon, Undo2Icon, UserIcon, UsersIcon, VideoIcon } from "lucide-react"
import { Button } from "../button"
import { dinosaurExampleDoc } from "@/lib/data/docExample"
import { EditTableSheet } from "./table-controls/EditTableSheet"

export default function RichTextEditorMenubar ( {
    editor,
    className = "",
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
}: {
    editor: Editor
    className?: string,
    defaultContent?: string
} ) {

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

        <div className={`flex justify-between gap-1.5 items-center bg-card pl-2 pr-1 w-full rounded-md ${className}`}>
            <div className={`flex flex-wrap items-center gap-5 py-1`}>

                <DropdownMenu>
                    <DropdownMenuTrigger className="text-sm data-[state=open]:bg-muted p-1 rounded">File</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel> Save your work </DropdownMenuLabel>
                        <DropdownMenuItem> <GlobeIcon/> Publish </DropdownMenuItem>
                        <DropdownMenuItem> <SaveIcon/> Save as draft </DropdownMenuItem>
                        <MenubarSeparator />
                        <DropdownMenuLabel> Move elsewhere </DropdownMenuLabel>
                        <DropdownMenuItem disabled> <NotebookTextIcon/> Move to blog </DropdownMenuItem>
                        <DropdownMenuItem disabled> <UsersIcon/> Move to team </DropdownMenuItem>
                        <DropdownMenuItem disabled> <BuildingIcon/> Move to organization </DropdownMenuItem>
                        <MenubarSeparator />
                        <DropdownMenuItem disabled variant="destructive"> <Trash2Icon/> Delete </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger className="text-sm data-[state=open]:bg-muted p-1 rounded">Edit</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => editor.chain().undo().run()}> <Undo2Icon/> Undo </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().redo().run()}> <Redo2Icon/> Redo </DropdownMenuItem>
                        <MenubarSeparator />
                        <DropdownMenuItem onClick={() => editor.chain().setContent(defaultContent).run()} variant="destructive"> <RotateCcwIcon/> Restart </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().setContent("").run()} variant="destructive"> <Trash2Icon/> Delete all </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger className="text-sm data-[state=open]:bg-muted p-1 rounded">Insert</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel> Blocks </DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => editor.chain().insertContent("<hr> </hr>").run()}> <MinusIcon/> Divider </DropdownMenuItem>
                        <DropdownMenuItem> <TableIcon/> Table </DropdownMenuItem>
                        <DropdownMenuItem disabled> <ImageIcon/> Image... </DropdownMenuItem>
                        <DropdownMenuItem disabled> <VideoIcon/> Youtube Video... </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().insertContent("<blockquote> </blockquote>").run()}> <QuoteIcon/> Quote </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().insertContent("<code> </code>").run()}> <Code2Icon/> Codeblock </DropdownMenuItem>
                        <DropdownMenuItem disabled> <LinkIcon/> Link... </DropdownMenuItem>
                        <MenubarSeparator />
                        <DropdownMenuLabel> Complex blocks </DropdownMenuLabel>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <CreditCardIcon/> Seagull Cards
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem disabled> <UserIcon/> User card </DropdownMenuItem>
                                <DropdownMenuItem disabled> <UsersIcon/> Team card </DropdownMenuItem>
                                <DropdownMenuItem disabled> <BuildingIcon/> Organization card </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <FlaskConicalIcon/> Mathematics and science
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem disabled> <UserIcon/> LaTeX expressions </DropdownMenuItem>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <ChartNoAxesCombinedIcon/> Graphs
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem disabled> <ChartScatterIcon/> Scatter graph </DropdownMenuItem>
                                        <DropdownMenuItem disabled> <ChartLineIcon/> Line graph </DropdownMenuItem>
                                        <DropdownMenuItem disabled> <ChartBarIcon/> Bar graph </DropdownMenuItem>
                                        <DropdownMenuItem disabled> <PieChartIcon/> Pie chart </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger className="text-sm data-[state=open]:bg-muted p-1 rounded">Help</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem disabled> <BookMarkedIcon/> Support page </DropdownMenuItem>
                        <DropdownMenuItem disabled> <MessageCircleQuestionMarkIcon/> Join Discord </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().setContent(dinosaurExampleDoc).run()}> <PlusIcon/> Insert example </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>

            <div className="flex items-center gap-1">
                <EditTableSheet editor={editor} />
                <Button 
                    mode="icon" type="button"
                    size="sm" variant="ghost"
                    onClick={() => editor.chain().undo().run()}
                >
                    <Undo2Icon/>
                </Button>
                <Button 
                    mode="icon" type="button"
                    size="sm" variant="ghost"
                    onClick={() => editor.chain().redo().run()}
                >
                    <Redo2Icon/>
                </Button>
            </div>

        </div>
    
    );
}

