"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Upload, AlertCircle, ChevronLeft } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function CampaignRecipients({ onBack, onNext }) {
  const [csvData, setCsvData] = useState(null)
  const [mappings, setMappings] = useState({})
  const [error, setError] = useState(null)

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()

    reader.onabort = () => setError("File reading was aborted")
    reader.onerror = () => setError("File reading failed")
    reader.onload = () => {
      const csvText = reader.result
      try {
        // Simple CSV parsing (you might want to use a library like papaparse)
        const rows = csvText.split("\\n").map(row => row.split(","))
        const headers = rows[0]
        const data = rows.slice(1).map(row => {
          return headers.reduce((obj, header, index) => {
            obj[header.trim()] = row[index]?.trim() || ""
            return obj
          }, {})
        })

        setCsvData({ headers, data })
        setError(null)

        // Initialize mappings
        const initialMappings = {}
        headers.forEach(header => {
          if (header.toLowerCase().includes("email")) {
            initialMappings.email = header
          } else if (header.toLowerCase().includes("name")) {
            initialMappings.name = header
          }
        })
        setMappings(initialMappings)
      } catch (e) {
        setError("Error parsing CSV file. Please check the format.")
      }
    }

    reader.readAsText(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
  })

  const handleMapping = (field, value) => {
    setMappings(prev => ({ ...prev, [field]: value }))
  }

  const handleContinue = () => {
    if (!mappings.email) {
      setError("Please map an email field before continuing")
      return
    }
    onNext()
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!csvData ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-primary bg-primary/10" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium">
            {isDragActive
              ? "Drop your CSV file here"
              : "Drag and drop your CSV file here, or click to select"}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Your CSV should include email addresses and any other recipient data
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2">Map Your CSV Columns</h3>
              <p className="text-sm text-muted-foreground">
                Match your CSV columns to the required fields
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setCsvData(null)
                setMappings({})
              }}
            >
              Upload Different File
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Email Field</label>
              <Select
                value={mappings.email}
                onValueChange={(value) => handleMapping("email", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select email column" />
                </SelectTrigger>
                <SelectContent>
                  {csvData.headers.map((header) => (
                    <SelectItem key={header} value={header}>
                      {header}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Name Field (Optional)</label>
              <Select
                value={mappings.name}
                onValueChange={(value) => handleMapping("name", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select name column" />
                </SelectTrigger>
                <SelectContent>
                  {csvData.headers.map((header) => (
                    <SelectItem key={header} value={header}>
                      {header}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  {csvData.headers.map((header) => (
                    <TableHead key={header}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {csvData.data.slice(0, 5).map((row, index) => (
                  <TableRow key={index}>
                    {csvData.headers.map((header) => (
                      <TableCell key={header}>{row[header]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <p className="text-sm text-muted-foreground">
            Showing first 5 rows of {csvData.data.length} total rows
          </p>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleContinue} disabled={!csvData || !mappings.email}>
          Continue to Template
        </Button>
      </div>
    </div>
  )
} 