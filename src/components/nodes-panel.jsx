"use client"

import { MessageSquare } from "lucide-react"
import { Card, CardContent } from "./ui/card"

// Draggable node item component
const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <Card
      className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-blue-300 rounded-lg cursor-grab hover:border-blue-500 hover:bg-blue-50 transition-colors"
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <CardContent className="flex flex-col items-center justify-center p-0">
        <div className="text-blue-500 mb-2">{icon}</div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </CardContent>
    </Card>
  )
}

// Nodes Panel component - houses all available node types
export const NodesPanel = () => {
  return (
    <div className="h-full p-4">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">Nodes Panel</h2>

      {/* Available node types - extensible for future node types */}
      <div className="space-y-4">
        <DraggableNode type="textNode" label="Message" icon={<MessageSquare size={24} />} />

        {/* Future node types can be added here */}
        {/* 
        <DraggableNode
          type="conditionNode"
          label="Condition"
          icon={<GitBranch size={24} />}
        />
        <DraggableNode
          type="actionNode"
          label="Action"
          icon={<Zap size={24} />}
        />
        */}
      </div>

      <div className="mt-8 text-xs text-gray-500">Drag and drop nodes to the canvas to build your chatbot flow.</div>
    </div>
  )
}
