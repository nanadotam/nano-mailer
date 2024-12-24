"use client"

import { useState } from "react"
import { Reader, renderToStaticMarkup } from "@usewaypoint/email-builder"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Monitor, Smartphone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Initial email template configuration
const initialConfig = {
  root: {
    type: "EmailLayout",
    data: {
      backdropColor: "#F8F8F8",
      canvasColor: "#FFFFFF",
      textColor: "#242424",
      fontFamily: "MODERN_SANS",
      childrenIds: ["block-text"],
    },
  },
  "block-text": {
    type: "Text",
    data: {
      style: {
        fontWeight: "normal",
        padding: {
          top: 16,
          bottom: 16,
          right: 24,
          left: 24,
        },
      },
      props: {
        text: "Hello {{name}},\n\nThis is your email content.",
      },
    },
  },
}

export function CampaignTemplate({ onBack, onNext }) {
  const [config, setConfig] = useState(initialConfig)
  const [previewMode, setPreviewMode] = useState("desktop")

  const handleConfigChange = (newConfig) => {
    setConfig(newConfig)
  }

  const handleNext = () => {
    // Convert the builder config to HTML before moving to next step
    const htmlContent = renderToStaticMarkup(config, { rootBlockId: "root" })
    onNext({ config, htmlContent })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Template</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={previewMode} onValueChange={setPreviewMode}>
            <TabsList>
              <TabsTrigger value="desktop">
                <Monitor className="h-4 w-4 mr-2" />
                Desktop
              </TabsTrigger>
              <TabsTrigger value="mobile">
                <Smartphone className="h-4 w-4 mr-2" />
                Mobile
              </TabsTrigger>
            </TabsList>
            <TabsContent value="desktop" className="border rounded-lg p-4">
              <div className="min-h-[500px]">
                <Reader 
                  document={config} 
                  rootBlockId="root"
                  onChange={handleConfigChange}
                />
              </div>
            </TabsContent>
            <TabsContent value="mobile" className="border rounded-lg">
              <div className="max-w-[375px] mx-auto p-4 min-h-[500px]">
                <Reader 
                  document={config} 
                  rootBlockId="root"
                  onChange={handleConfigChange}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  )
} 