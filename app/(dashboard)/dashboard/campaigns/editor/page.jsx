"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Save,
  Monitor,
  Smartphone,
  ChevronLeft,
  Type,
  Image as ImageIcon,
  Columns,
  Divide,
  Square,
  ArrowUpDown,
} from "lucide-react"
import Link from "next/link"

// Import our new components
import Reader from "@/components/email-builder/Reader"
import { renderToStaticMarkup } from "@/components/email-builder/renderToStaticMarkup"

// Initial template configuration
const initialConfig = {
  root: {
    type: "EmailLayout",
    data: {
      backdropColor: "#F8F8F8",
      canvasColor: "#FFFFFF",
      textColor: "#242424",
      fontFamily: "MODERN_SANS",
      childrenIds: ["container-1"],
    },
  },
  "container-1": {
    type: "Container",
    data: {
      style: {
        padding: { top: 24, bottom: 24, left: 24, right: 24 },
      },
      props: {
        childrenIds: ["text-1"],
      },
    },
  },
  "text-1": {
    type: "Text",
    data: {
      style: {
        fontSize: 16,
        fontWeight: "normal",
      },
      props: {
        text: "Start editing your email content...",
      },
    },
  },
}

// Building blocks configuration
const buildingBlocks = [
  { id: "text", name: "Text", icon: Type, type: "Text" },
  { id: "image", name: "Image", icon: ImageIcon, type: "Image" },
  { id: "columns", name: "Columns", icon: Columns, type: "ColumnsContainer" },
  { id: "divider", name: "Divider", icon: Divide, type: "Divider" },
  { id: "container", name: "Container", icon: Square, type: "Container" },
  { id: "spacer", name: "Spacer", icon: ArrowUpDown, type: "Spacer" },
]

export default function EmailEditorPage() {
  const [config, setConfig] = useState(initialConfig)
  const [previewMode, setPreviewMode] = useState("desktop")

  const handleDragStart = (block) => {
    const newBlockId = `block-${Date.now()}`
    const newBlock = {
      type: block.type,
      data: {
        style: {
          padding: { top: 16, bottom: 16, left: 24, right: 24 }
        },
        props: {
          text: block.type === "Text" ? "New text block" : "",
          childrenIds: ["container", "columns"].includes(block.type) ? [] : undefined
        }
      }
    }

    // Add new block to root's children
    setConfig(prev => ({
      ...prev,
      [newBlockId]: newBlock,
      root: {
        ...prev.root,
        data: {
          ...prev.root.data,
          childrenIds: [...(prev.root.data.childrenIds || []), newBlockId]
        }
      }
    }))
  }

  const handleSave = () => {
    const htmlContent = renderToStaticMarkup(config, { rootBlockId: "root" })
    console.log("HTML Output:", htmlContent)
    // TODO: Save template to backend
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/campaigns">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Email Editor</h1>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Template
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Panel - Building Blocks */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Blocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {buildingBlocks.map((block) => (
                <div
                  key={block.id}
                  draggable
                  onDragStart={() => handleDragStart(block)}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-move"
                >
                  <block.icon className="h-4 w-4" />
                  <span>{block.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Editor Area */}
        <div className="col-span-10">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Email Content</CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setPreviewMode("desktop")}
                  className={previewMode === "desktop" ? "bg-accent" : ""}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setPreviewMode("mobile")}
                  className={previewMode === "mobile" ? "bg-accent" : ""}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`border rounded-lg p-4 min-h-[600px] ${
                previewMode === "mobile" ? "max-w-[375px] mx-auto" : ""
              }`}>
                <Reader 
                  document={config}
                  rootBlockId="root"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 