import { memo } from "react"
import { Handle, Position } from "reactflow"
import { MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

// Custom Text Node component
export const TextNode = memo(({ data, selected }) => {
  return (
    <Card className={`min-w-[200px] shadow-md ${selected ? "border-blue-500" : "border-gray-200"}`}>
      {/* Target handle - can have multiple incoming connections */}
      <Handle type="target" position={Position.Top} className="!bg-gray-400 !w-3 !h-3" />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 bg-green-100 rounded-t-md">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <MessageSquare size={14} />
          <span>{data.label}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-3 text-sm text-gray-800">{data.text}</CardContent>

      {/* Source handle - can only have one outgoing connection */}
      <Handle type="source" position={Position.Bottom} className="!bg-gray-400 !w-3 !h-3" />
    </Card>
  )
})

TextNode.displayName = "TextNode"
