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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../dropdown-menu"
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
            {/* POSITIONED LEFT */}
            <div className={`flex flex-wrap items-center gap-5 py-1`}>
                {/* Render all menubar items */}
                <File editor={editor}/>

                <Edit editor={editor} defaultContent={defaultContent}/>

                <Insert editor={editor}/>

                <Tools editor={editor}/>

                <Help editor={editor}/>
            </div>

            {/* POSITIONED RIGHT */}
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

function File({ editor } : {editor: Editor}) {
    return (
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

    )
}

function Insert({ editor } : {editor: Editor}) {

    return ( 
        <DropdownMenu>
            <DropdownMenuTrigger className="text-sm data-[state=open]:bg-muted p-1 rounded">Insert</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel> Blocks </DropdownMenuLabel>
                <DropdownMenuItem onClick={() => editor.chain().focus().insertContent("<hr> </hr>").run()}> <MinusIcon/> Divider </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editor.chain().focus().insertTable( {rows: 3, cols: 3} ).run()}> <TableIcon/> Table </DropdownMenuItem>
                <DropdownMenuItem disabled> <ImageIcon/> Image... </DropdownMenuItem>
                <DropdownMenuItem disabled> <VideoIcon/> Youtube Video... </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editor.chain().focus().insertContent("<blockquote> </blockquote>").run()}> <QuoteIcon/> Quote </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editor.chain().focus().insertContent("<code> </code>").run()}> <Code2Icon/> Codeblock </DropdownMenuItem>
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
    )
}

function Edit({ editor, defaultContent } : {editor: Editor, defaultContent: string}) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="text-sm data-[state=open]:bg-muted p-1 rounded">Edit</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => editor.chain().undo().run()}> <Undo2Icon/> Undo </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editor.chain().redo().run()}> <Redo2Icon/> Redo </DropdownMenuItem>
                <MenubarSeparator />

                {/* Wont use this due to accessibility issues. And there is already a way to manage a table */}
                {false && (
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                    <TableIcon /> Manage table
                    </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                        {/* Manage Table */}
                        <DropdownMenuLabel>Manage Table</DropdownMenuLabel>
                        <DropdownMenuItem
                            variant="destructive"
                            onClick={() => editor.chain().focus().deleteTable().run()}
                        >
                            Delete table
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        {/* Header Options */}
                        <DropdownMenuLabel>Header options</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
                            Toggle row header
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
                            Toggle column header
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
                            Toggle header cell
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        {/* Rows & Columns */}
                        <DropdownMenuLabel>Rows & columns</DropdownMenuLabel>
                        <DropdownMenuItem
                            variant="destructive"
                            onClick={() => editor.chain().focus().deleteRow().run()}
                        >
                            Delete selected row
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            variant="destructive"
                            onClick={() => editor.chain().focus().deleteColumn().run()}
                        >
                            Delete selected column
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().focus().addRowBefore().run()}>
                            Add row before
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().focus().addRowAfter().run()}>
                            Add row after
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().focus().addColumnBefore().run()}>
                            Add column before
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().focus().addColumnAfter().run()}>
                            Add column after
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        {/* Merge / Split */}
                        <DropdownMenuLabel>Merge / Split</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => editor.chain().focus().mergeOrSplit().run()}>
                            Toggle merge/split cells
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().focus().mergeCells().run()}>
                            Merge selected cells
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.chain().focus().splitCell().run()}>
                            Split selected cells
                        </DropdownMenuItem>
                        </DropdownMenuSubContent>
                </DropdownMenuSub>
                )}

                <DropdownMenuItem onClick={() => editor.chain().setContent(defaultContent).run()} variant="destructive"> <RotateCcwIcon/> Restart </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editor.chain().setContent("").run()} variant="destructive"> <Trash2Icon/> Delete all </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function Tools({ editor } : {editor: Editor}) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="text-sm data-[state=open]:bg-muted p-1 rounded">Tools</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel> Character counter </DropdownMenuLabel>
                <DropdownMenuItem> {editor.storage.characterCount?.characters()} Characters </DropdownMenuItem>
                <DropdownMenuItem> {editor.storage.characterCount?.words()} Words </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function Help({ editor } : {editor: Editor}) {

    return ( 
        <DropdownMenu>
            <DropdownMenuTrigger className="text-sm data-[state=open]:bg-muted p-1 rounded">Help</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem disabled> <BookMarkedIcon/> Support page </DropdownMenuItem>
                <DropdownMenuItem disabled> <MessageCircleQuestionMarkIcon/> Join Discord </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editor.chain().setContent(dinosaurExampleDoc).run()}> <PlusIcon/> Insert example </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}