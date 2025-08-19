// TableMenu.tsx
"use client"

import { useState, useEffect } from "react"
import type { Editor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetBody } from "../../sheet"
import { Label } from "../../input"
import { Rows3Icon, TableProperties } from "lucide-react"

export function EditTableSheet({ editor }: { editor: Editor }) {

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

  if (editor.isActive("table")) return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="!bg-transparent" variant="outline"> <TableProperties/> Manage table </Button>
      </SheetTrigger>
      <SheetContent side="right" overlay={false}>
        <SheetHeader>
          <SheetTitle>Manage table</SheetTitle>
          <SheetDescription>Customize your table just to your liking. Before managing cells, rows or columns, make sure to select the correct area by clicking or hold clicking</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <div className="flex flex-col gap-3">
            <div>
              <Label>Manage Table</Label>
              <div className="flex flex-wrap gap-2">
                <Button className="!text-destructive-foreground bg-destructive/40 hover:bg-destructive/50" variant="ghostBg" onClick={() => editor.chain().focus().deleteTable().run()}> Delete table </Button>
              </div>
            </div>

            <div>
              <Label>Header options</Label>
              <div className="flex flex-wrap gap-2">
                <Button variant="ghostBg" onClick={() => editor.chain().focus().toggleHeaderRow().run()}> Toggle row header </Button>
                <Button variant="ghostBg" onClick={() => editor.chain().focus().toggleHeaderColumn().run()}> Toggle column header </Button>
                <Button variant="ghostBg" onClick={() => editor.chain().focus().toggleHeaderCell().run()}> Toggle column cell </Button>
              </div>
            </div>

            <div>
              <Label>Rows and columns</Label>
              <div className="flex flex-wrap gap-2">
                <Button className="!text-destructive-foreground bg-destructive/40 hover:bg-destructive/50" variant="ghostBg" onClick={() => editor.chain().focus().deleteRow().run()}> Delete selected row </Button>
                <Button className="!text-destructive-foreground bg-destructive/40 hover:bg-destructive/50" variant="ghostBg" onClick={() => editor.chain().focus().deleteColumn().run()}> Delete selected column </Button>
                <Button variant="ghostBg" onClick={() => editor.chain().focus().addRowBefore().run()}> Add row before </Button>
                <Button variant="ghostBg" onClick={() => editor.chain().focus().addColumnBefore().run()}> Add column before </Button>
                <Button variant="ghostBg" onClick={() => editor.chain().focus().addRowAfter().run()}> Add row after </Button>
                <Button variant="ghostBg" onClick={() => editor.chain().focus().addColumnAfter().run()}> Add column after </Button>
              </div>
            </div>

            <div>
              <Label>Merge/split cells</Label>
              <div className="flex flex-wrap gap-2">
                <Button variant="ghostBg" onClick={() => editor.chain().focus().mergeOrSplit().run()}> Toggle merge/split cells </Button>
                <Button variant="ghostBg" onClick={() => editor.chain().focus().mergeCells().run()}> Merge selected cells </Button>
                <Button variant="ghostBg" onClick={() => editor.chain().focus().splitCell().run()}> Split selected cells </Button>
              </div>
            </div>

          </div>
        </SheetBody>
      </SheetContent>
    </Sheet>
  )
}
