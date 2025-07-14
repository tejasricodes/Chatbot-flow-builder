"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

// Settings Panel component - appears when a node is selected
export const SettingsPanel = ({ node, onUpdateNode, onClose }) => {
  const [text, setText] = useState(node.data.text || "")

  // Update local state when node changes
  useEffect(() => {
    setText(node.data.text || "")
  }, [node.data.text])

  // Handle text change and update node
  const handleTextChange = (newText) => {
    setText(newText)
    onUpdateNode(node.id, { text: newText })
  }

  return (
    <Card className="h-full rounded-none border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 border-b">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
            <ArrowLeft size={16} />
          </Button>
          <CardTitle className="text-lg font-semibold text-gray-800">Message</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div>
          <Label htmlFor="node-text" className="text-sm font-medium text-gray-700">
            Text
          </Label>
          <Textarea
            id="node-text"
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Enter message text..."
            className="mt-1 min-h-[100px]"
          />
        </div>

        {/* Future settings can be added here based on node type */}
      </CardContent>
      <div className="p-4 text-xs text-gray-500 border-t">Changes are saved automatically as you type.</div>
    </Card>
  )
}
