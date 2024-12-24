"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Save,
  Undo,
  Redo,
  Smartphone,
  Monitor,
  Send,
  ChevronLeft,
  Heading,
  Type,
  Image as ImageIcon,
  Link as LinkIcon,
  Button as ButtonIcon,
  Divide,
  Columns,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

// Mock building blocks for the template editor
const buildingBlocks = [
  {
    id: "header",
    name: "Header",
    icon: Heading,
    content: "<h1>Header Text</h1>",
  },
  {
    id: "text",
    name: "Text Block",
    icon: Type,
    content: "<p>Add your text here...</p>",
  },
  {
    id: "image",
    name: "Image",
    icon: ImageIcon,
    content: '<img src="https://via.placeholder.com/600x200" alt="Image" />',
  },
  {
    id: "button",
    name: "Button",
    icon: ButtonIcon,
    content: '<button class="btn">Click Me</button>',
  },
  {
    id: "divider",
    name: "Divider",
    icon: Divide,
    content: "<hr />",
  },
  {
    id: "columns",
    name: "2 Columns",
    icon: Columns,
    content: '<div class="columns-2"><div>Column 1</div><div>Column 2</div></div>',
  },
]

export default function TemplateEditorPage() {
  const [previewMode, setPreviewMode] = useState("desktop")
  const [selectedBlock, setSelectedBlock] = useState(null)
  const [templateName, setTemplateName] = useState("Untitled Template")
  const [templateBlocks, setTemplateBlocks] = useState([])
  const { toast } = useToast()

  const handleDragStart = (block) => {
    setSelectedBlock(block)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (selectedBlock) {
      setTemplateBlocks([...templateBlocks, { ...selectedBlock, id: Date.now() }])
      setSelectedBlock(null)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleSaveTemplate = () => {
    toast({
      title: "Template saved",
      description: "Your template has been saved successfully.",
    })
  }

  const handleTestSend = () => {
    toast({
      title: "Test email sent",
      description: "A test email has been sent to your address.",
    })
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/templates">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="text-2xl font-bold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary rounded px-2"
            />
            <p className="text-muted-foreground">Design your email template</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleTestSend}>
            <Send className="h-4 w-4 mr-2" />
            Test Send
          </Button>
          <Button onClick={handleSaveTemplate}>
            <Save className="h-4 w-4 mr-2" />
            Save Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Panel - Building Blocks */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Blocks</CardTitle>
            <CardDescription>Drag elements to build</CardDescription>
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

        {/* Center Panel - Editor */}
        <Card className="col-span-7">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
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
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Undo className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Redo className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div
              className={`min-h-[600px] border-2 border-dashed rounded-lg p-4 ${
                previewMode === "mobile" ? "max-w-sm mx-auto" : ""
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {templateBlocks.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Drag blocks here to build your template
                </div>
              ) : (
                <div className="space-y-4">
                  {templateBlocks.map((block) => (
                    <div
                      key={block.id}
                      className="p-4 border rounded-lg hover:border-primary cursor-pointer"
                      dangerouslySetInnerHTML={{ __html: block.content }}
                    />
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Properties */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Properties</CardTitle>
            <CardDescription>Customize selected element</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedBlock ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Content</label>
                  <textarea
                    className="w-full mt-1 p-2 border rounded-md"
                    rows={4}
                    value={selectedBlock.content}
                    onChange={(e) =>
                      setSelectedBlock({ ...selectedBlock, content: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Styles</label>
                  {/* Add style controls here */}
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground">
                Select an element to edit its properties
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 