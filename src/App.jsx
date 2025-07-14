"use client"

import { useState, useCallback, useRef } from "react"
import ReactFlow, { addEdge, useNodesState, useEdgesState, Controls, Background, ReactFlowProvider } from "reactflow"
import "reactflow/dist/style.css"
import './global.css'

import { TextNode } from "./components/text-node"
import { NodesPanel } from "./components/nodes-panel"
import { SettingsPanel } from "./components/settings.panel"
import { SaveButton } from "./components/save-button"
import { Alert, AlertDescription } from "./components/ui/alert"

// Define the node types that our flow builder supports
const nodeTypes = {
  textNode: TextNode,
}

// Initial empty state
const initialNodes = []
const initialEdges = []

export default function ChatbotFlowBuilder() {
  // React Flow state management
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  // UI state management
  const [selectedNode, setSelectedNode] = useState(null)
  const [saveError, setSaveError] = useState("")

  const reactFlowWrapper = useRef(null)

  // Handle new connections between nodes
  const onConnect = useCallback(
    (params) => {
      // Ensure source handle can only have one outgoing edge
      const existingEdge = edges.find(
        (edge) => edge.source === params.source && edge.sourceHandle === params.sourceHandle,
      )

      if (existingEdge) {
        // Remove existing edge before adding new one
        const updatedEdges = edges.filter((edge) => edge.id !== existingEdge.id)
        setEdges(updatedEdges)
      }

      setEdges((eds) => addEdge(params, eds))
    },
    [edges, setEdges],
  )

  // Handle node selection
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node)
  }, [])

  // Handle clicking on empty space to deselect
  const onPaneClick = useCallback(() => {
    setSelectedNode(null)
  }, [])

  // Handle drag and drop from nodes panel
  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      if (!reactFlowInstance || !reactFlowWrapper.current) return

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const type = event.dataTransfer.getData("application/reactflow")

      if (!type) return

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      const newNode = {
        id: `${type}-${Date.now()}`,
        type: "textNode",
        position,
        data: {
          label: "Send Message",
          text: "text message",
        },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes],
  )

  // Update node data when edited in settings panel
  const updateNodeData = useCallback(
    (nodeId, newData) => {
      setNodes((nds) =>
        nds.map((node) => (node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node)),
      )
    },
    [setNodes],
  )

  // Validate and save the flow
  const handleSave = useCallback(() => {
    setSaveError("")

    // Validation: If there are more than one nodes, more than one node should not have empty target handles
    if (nodes.length > 1) {
      const nodesWithoutIncomingEdges = nodes.filter((node) => !edges.some((edge) => edge.target === node.id))

      if (nodesWithoutIncomingEdges.length > 1) {
        setSaveError("Cannot save Flow")
        return
      }
    }

    // If validation passes, save the flow
    console.log("Flow saved successfully!", { nodes, edges })
    alert("Flow saved successfully!")
  }, [nodes, edges])

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Main flow area */}
      <div className="relative flex-1" ref={reactFlowWrapper}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <Background />
          </ReactFlow>
        </ReactFlowProvider>

        {/* Save button */}
        <div className="absolute right-4 top-4 z-10">
          <SaveButton onSave={handleSave} />
        </div>

        {/* Error message */}
        {saveError && (
          <div className="absolute right-4 top-16 z-10">
            <Alert variant="destructive" className="w-64">
              <AlertDescription>{saveError}</AlertDescription>
            </Alert>
          </div>
        )}
      </div>

      {/* Right panel - either nodes panel or settings panel */}
      <div className="w-full border-t bg-gray-50 shadow-lg md:w-80 md:border-l md:border-t-0">
        {selectedNode ? (
          <SettingsPanel node={selectedNode} onUpdateNode={updateNodeData} onClose={() => setSelectedNode(null)} />
        ) : (
          <NodesPanel />
        )}
      </div>
    </div>
  )
}
