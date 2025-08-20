import { NodeViewWrapper } from '@tiptap/react'
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@/components/ui/context-menu"

export default function TableNodeView(props: any) {
  return (
    <NodeViewWrapper as="table" className="border-collapse border border-gray-300">
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <tbody {...props.attributes}>
            {props.children}
          </tbody>
        </ContextMenuTrigger>

        <ContextMenuContent>
          <ContextMenuItem onClick={() => console.log("Insert row above")}>
            Insert row above
          </ContextMenuItem>
          <ContextMenuItem onClick={() => console.log("Delete row")}>
            Delete row
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </NodeViewWrapper>
  )
}
