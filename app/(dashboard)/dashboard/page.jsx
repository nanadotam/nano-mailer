import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Mail,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from "lucide-react"

// Mock data - replace with real data later
const stats = [
  {
    name: "Total Sent",
    value: "12,345",
    icon: Mail,
    change: "+12%",
    changeType: "increase",
  },
  {
    name: "Active Contacts",
    value: "2,345",
    icon: Users,
    change: "+8%",
    changeType: "increase",
  },
  {
    name: "Open Rate",
    value: "68%",
    icon: ArrowUpRight,
    change: "-3%",
    changeType: "decrease",
  },
]

const recentCampaigns = [
  {
    name: "Welcome Newsletter",
    status: "Completed",
    sent: "1,234",
    openRate: "75%",
    clickRate: "25%",
    date: "2024-01-20",
  },
  {
    name: "January Update",
    status: "In Progress",
    sent: "890",
    openRate: "62%",
    clickRate: "18%",
    date: "2024-01-19",
  },
  {
    name: "Product Launch",
    status: "Draft",
    sent: "-",
    openRate: "-",
    clickRate: "-",
    date: "2024-01-18",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Your email campaign metrics and recent activity
          </p>
        </div>
        <Link href="/dashboard/campaigns/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={
                    stat.changeType === "increase"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {stat.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Campaigns</CardTitle>
          <CardDescription>
            Your most recent email campaigns and their performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Open Rate</TableHead>
                <TableHead>Click Rate</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentCampaigns.map((campaign) => (
                <TableRow key={campaign.name}>
                  <TableCell className="font-medium">
                    {campaign.name}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        campaign.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : campaign.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </TableCell>
                  <TableCell>{campaign.sent}</TableCell>
                  <TableCell>{campaign.openRate}</TableCell>
                  <TableCell>{campaign.clickRate}</TableCell>
                  <TableCell>{campaign.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 