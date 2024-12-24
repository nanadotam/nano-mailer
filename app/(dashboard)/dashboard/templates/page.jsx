"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Plus, Search, Filter, Eye, Copy, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock data for templates
const mockTemplates = [
  {
    id: 1,
    name: "Welcome Email",
    description: "A warm welcome message for new subscribers",
    category: "Newsletter",
    platform: "Gmail",
    usage: "Professional",
    thumbnail: "/templates/welcome.png",
  },
  {
    id: 2,
    name: "Event Invitation",
    description: "Professional event invitation template",
    category: "Event",
    platform: "Outlook",
    usage: "Professional",
    thumbnail: "/templates/event.png",
  },
  {
    id: 3,
    name: "Monthly Newsletter",
    description: "Clean and modern newsletter layout",
    category: "Newsletter",
    platform: "Gmail",
    usage: "Professional",
    thumbnail: "/templates/newsletter.png",
  },
  {
    id: 4,
    name: "Product Announcement",
    description: "Announce new products or features",
    category: "Announcement",
    platform: "Gmail",
    usage: "Professional",
    thumbnail: "/templates/announcement.png",
  },
]

const categories = ["All", "Newsletter", "Event", "Announcement"]
const platforms = ["All", "Gmail", "Outlook"]
const usageTypes = ["All", "Personal", "Professional"]

export default function TemplatesPage() {
  const [templates, setTemplates] = useState(mockTemplates)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPlatform, setSelectedPlatform] = useState("All")
  const [selectedUsage, setSelectedUsage] = useState("All")
  const { toast } = useToast()

  const handleDeleteTemplate = (id) => {
    setTemplates(templates.filter((template) => template.id !== id))
    toast({
      title: "Template deleted",
      description: "The template has been deleted successfully.",
    })
  }

  const handleDuplicateTemplate = (template) => {
    const newTemplate = {
      ...template,
      id: templates.length + 1,
      name: `${template.name} (Copy)`,
    }
    setTemplates([...templates, newTemplate])
    toast({
      title: "Template duplicated",
      description: "The template has been duplicated successfully.",
    })
  }

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "All" || template.category === selectedCategory
    const matchesPlatform =
      selectedPlatform === "All" || template.platform === selectedPlatform
    const matchesUsage =
      selectedUsage === "All" || template.usage === selectedUsage

    return matchesSearch && matchesCategory && matchesPlatform && matchesUsage
  })

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Email Templates</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage your email templates
          </p>
        </div>
        <Link href="/dashboard/templates/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search templates..."
                className="pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
              >
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
              <select
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedUsage}
                onChange={(e) => setSelectedUsage(e.target.value)}
              >
                {usageTypes.map((usage) => (
                  <option key={usage} value={usage}>
                    {usage}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <div className="aspect-video bg-muted relative">
              {/* Replace with actual template thumbnail */}
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                Template Preview
              </div>
            </div>
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                    {template.category}
                  </span>
                  <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-md text-xs">
                    {template.platform}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      toast({
                        title: "Preview Template",
                        description: "Opening template preview...",
                      })
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDuplicateTemplate(template)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 