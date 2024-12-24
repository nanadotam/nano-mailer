"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Reader, renderToStaticMarkup } from "@usewaypoint/email-builder"
import { useDropzone } from "react-dropzone"
import Papa from "papaparse"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Upload,
  Download,
  Save,
  Send,
  Edit2,
  Trash2,
  Plus,
  AlertCircle,
} from "lucide-react"

// Initial email template configuration
const initialEmailConfig = {
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

export default function NewCampaignPage() {
  const [csvData, setCsvData] = useState([])
  const [headers, setHeaders] = useState([])
  const [requiredColumns, setRequiredColumns] = useState([])
  const [emailConfig, setEmailConfig] = useState(initialEmailConfig)
  const [errors, setErrors] = useState([])
  const [variables, setVariables] = useState([])
  const { toast } = useToast()

  // CSV Drop zone handler
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          if (results.data && results.data.length > 0) {
            const headers = results.data[0]
            setHeaders(headers)
            setCsvData(results.data.slice(1))
            
            // Extract potential variables from the CSV headers
            const vars = headers.map(header => ({
              name: header,
              placeholder: `{{${header}}}`,
              required: false
            }))
            setVariables(vars)
            
            toast({
              title: "CSV uploaded successfully",
              description: `${results.data.length - 1} rows loaded`,
            })
          }
        },
        header: true,
        error: (error) => {
          setErrors(prev => [...prev, `CSV parsing error: ${error.message}`])
          toast({
            title: "Error parsing CSV",
            description: error.message,
            variant: "destructive",
          })
        }
      })
    }
  }, [toast])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
  })

  // Handle required column selection
  const toggleRequiredColumn = (header) => {
    setRequiredColumns(prev => {
      if (prev.includes(header)) {
        return prev.filter(h => h !== header)
      }
      return [...prev, header]
    })
  }

  // Validate CSV data
  const validateData = () => {
    const newErrors = []
    
    // Check required columns
    requiredColumns.forEach(column => {
      if (!headers.includes(column)) {
        newErrors.push(`Required column "${column}" is missing`)
      }
    })

    // Validate email addresses if "email" is a required column
    if (requiredColumns.includes("email")) {
      csvData.forEach((row, index) => {
        if (!row.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
          newErrors.push(`Invalid email address in row ${index + 1}`)
        }
      })
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  // Export modified CSV
  const exportCSV = () => {
    const csv = Papa.unparse([headers, ...csvData])
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "modified_contacts.csv"
    a.click()
  }

  // Send test email
  const sendTestEmail = async () => {
    try {
      const htmlContent = renderToStaticMarkup(emailConfig, { rootBlockId: "root" })
      // TODO: Implement actual email sending logic
      toast({
        title: "Test email sent",
        description: "Check your inbox for the test email",
      })
    } catch (error) {
      toast({
        title: "Error sending test email",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">New Campaign</h1>
          <p className="text-muted-foreground">Create and configure your email campaign</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={sendTestEmail}>
            <Send className="mr-2 h-4 w-4" />
            Test Send
          </Button>
          <Button onClick={() => validateData()}>
            <Save className="mr-2 h-4 w-4" />
            Save Campaign
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CSV Upload and Management */}
        <Card>
          <CardHeader>
            <CardTitle>Contact List</CardTitle>
            <CardDescription>Upload and manage your contact list</CardDescription>
          </CardHeader>
          <CardContent>
            {/* CSV Drop Zone */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center mb-4 ${
                isDragActive ? "border-primary bg-primary/10" : "border-muted"
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Drag and drop your CSV file here, or click to select
              </p>
            </div>

            {/* Required Columns Selection */}
            {headers.length > 0 && (
              <div className="mb-4">
                <h3 className="font-medium mb-2">Required Columns</h3>
                <div className="flex flex-wrap gap-2">
                  {headers.map((header) => (
                    <Button
                      key={header}
                      variant={requiredColumns.includes(header) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleRequiredColumn(header)}
                    >
                      {header}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* CSV Preview */}
            {csvData.length > 0 && (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {headers.map((header) => (
                        <TableHead key={header}>{header}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {csvData.slice(0, 5).map((row, index) => (
                      <TableRow key={index}>
                        {headers.map((header) => (
                          <TableCell key={`${index}-${header}`}>
                            {row[header]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {csvData.length > 5 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Showing 5 of {csvData.length} rows
                  </p>
                )}
              </div>
            )}

            {/* Error Display */}
            {errors.length > 0 && (
              <div className="mt-4 p-4 bg-destructive/10 rounded-lg">
                <div className="flex items-center gap-2 text-destructive mb-2">
                  <AlertCircle className="h-4 w-4" />
                  <h3 className="font-medium">Validation Errors</h3>
                </div>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index} className="text-sm text-destructive">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Email Template Editor */}
        <Card>
          <CardHeader>
            <CardTitle>Email Template</CardTitle>
            <CardDescription>Design your email template</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="font-medium mb-2">Available Variables</h3>
              <div className="flex flex-wrap gap-2">
                {variables.map((variable) => (
                  <code
                    key={variable.name}
                    className="px-2 py-1 bg-muted rounded text-sm font-mono"
                  >
                    {variable.placeholder}
                  </code>
                ))}
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Reader document={emailConfig} rootBlockId="root" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 