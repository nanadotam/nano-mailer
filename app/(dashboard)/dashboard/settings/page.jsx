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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Mail, Lock, Server, Send, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"

// Common SMTP providers and their default settings
const smtpProviders = {
  gmail: {
    host: "smtp.gmail.com",
    port: "587",
    secure: true,
    requiresAuth: true,
  },
  outlook: {
    host: "smtp.office365.com",
    port: "587",
    secure: true,
    requiresAuth: true,
  },
  custom: {
    host: "",
    port: "",
    secure: true,
    requiresAuth: true,
  },
}

export default function SettingsPage() {
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState("custom")
  const { toast } = useToast()

  const form = useForm({
    defaultValues: {
      smtpHost: "",
      smtpPort: "",
      smtpUsername: "",
      smtpPassword: "",
      defaultFromName: "",
      defaultFromEmail: "",
      defaultReplyTo: "",
    },
  })

  const handleProviderChange = (e) => {
    const provider = e.target.value
    setSelectedProvider(provider)
    if (provider !== "custom") {
      const settings = smtpProviders[provider]
      form.setValue("smtpHost", settings.host)
      form.setValue("smtpPort", settings.port)
    }
  }

  const handleTestConnection = async () => {
    setIsTestingConnection(true)
    try {
      // Mock testing SMTP connection
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast({
        title: "Connection successful",
        description: "SMTP settings are working correctly.",
      })
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Failed to connect to SMTP server. Please check your settings.",
        variant: "destructive",
      })
    } finally {
      setIsTestingConnection(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      // Mock saving settings
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Settings saved",
        description: "Your email settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your email and SMTP settings
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SMTP Settings */}
        <Card>
          <CardHeader>
            <CardTitle>SMTP Configuration</CardTitle>
            <CardDescription>
              Configure your SMTP server settings for sending emails
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="smtpProvider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SMTP Provider</FormLabel>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={selectedProvider}
                        onChange={handleProviderChange}
                      >
                        <option value="custom">Custom SMTP</option>
                        <option value="gmail">Gmail</option>
                        <option value="outlook">Outlook</option>
                      </select>
                      <FormDescription>
                        Select your email provider or use custom SMTP settings
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="smtpHost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SMTP Host</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Server className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-8" placeholder="smtp.example.com" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="smtpPort"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SMTP Port</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="587" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="smtpUsername"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SMTP Username</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-8" placeholder="username@example.com" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="smtpPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SMTP Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            className="pl-8"
                            type="password"
                            placeholder="••••••••"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleTestConnection}
                    disabled={isTestingConnection}
                  >
                    {isTestingConnection ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Testing
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Test Connection
                      </>
                    )}
                  </Button>
                  <Button type="submit">Save Settings</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Default Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Default Email Settings</CardTitle>
            <CardDescription>
              Configure default settings for your email campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="defaultFromName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default From Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        The name that appears in the From field
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="defaultFromEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default From Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        The email address that appears in the From field
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="defaultReplyTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Reply-To</FormLabel>
                      <FormControl>
                        <Input placeholder="replies@example.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        The email address that receives replies
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Save Settings</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 