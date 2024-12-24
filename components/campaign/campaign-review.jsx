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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Mail, Smartphone, Monitor, Send } from "lucide-react"

export function CampaignReview({ onBack }) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [previewType, setPreviewType] = useState("desktop")

  // Mock data - replace with real data from context/state management
  const campaignData = {
    details: {
      name: "January Newsletter",
      subject: "Your January Update is Here!",
      fromName: "John Doe",
      fromEmail: "john@example.com",
      replyTo: "support@example.com",
    },
    recipients: {
      total: 2345,
      valid: 2300,
      invalid: 45,
    },
    template: {
      content: `
        <h1>January Newsletter</h1>
        <p>Dear {{name}},</p>
        <p>Welcome to our January newsletter! We have some exciting updates to share with you.</p>
        <h2>What's New</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      `,
    },
  }

  const handleSend = () => {
    // Implement send functionality
    console.log("Sending campaign...")
    setShowConfirmation(false)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
            <CardDescription>Review your campaign settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Campaign Name</label>
              <p className="mt-1">{campaignData.details.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Subject Line</label>
              <p className="mt-1">{campaignData.details.subject}</p>
            </div>
            <div>
              <label className="text-sm font-medium">From</label>
              <p className="mt-1">
                {campaignData.details.fromName} &lt;{campaignData.details.fromEmail}&gt;
              </p>
            </div>
            <div>
              <label className="text-sm font-medium">Reply-To</label>
              <p className="mt-1">{campaignData.details.replyTo}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recipients</CardTitle>
            <CardDescription>Your contact list summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Recipients</span>
              <Badge variant="secondary">{campaignData.recipients.total}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Valid Emails</span>
              <Badge variant="success" className="bg-green-100 text-green-700">
                {campaignData.recipients.valid}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Invalid Emails</span>
              <Badge variant="destructive">{campaignData.recipients.invalid}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email Preview</CardTitle>
          <CardDescription>Preview your email in different formats</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={previewType} onValueChange={setPreviewType}>
            <TabsList className="mb-4">
              <TabsTrigger value="desktop">
                <Monitor className="h-4 w-4 mr-2" />
                Desktop
              </TabsTrigger>
              <TabsTrigger value="mobile">
                <Smartphone className="h-4 w-4 mr-2" />
                Mobile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="desktop" className="border rounded-lg p-8">
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: campaignData.template.content }}
              />
            </TabsContent>

            <TabsContent value="mobile" className="border rounded-lg">
              <div className="max-w-[375px] mx-auto p-4">
                <div
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: campaignData.template.content }}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogTrigger asChild>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Send Campaign
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Campaign Send</DialogTitle>
              <DialogDescription>
                Are you sure you want to send this campaign to {campaignData.recipients.valid} recipients?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmation(false)}>
                Cancel
              </Button>
              <Button onClick={handleSend}>
                <Mail className="mr-2 h-4 w-4" />
                Send Now
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
} 