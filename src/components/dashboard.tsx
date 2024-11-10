import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useState } from 'react'
import axios from 'axios'
const dummyData = [
  { name: 'Page A', responseTime: 400 },
  { name: 'Page B', responseTime: 300 },
  { name: 'Page C', responseTime: 500 },
  { name: 'Page D', responseTime: 280 },
  { name: 'Page E', responseTime: 390 },
]

export default function Dashboard() {
  const [newWebsite, setNewWebsite] = useState('')

  const handleAddWebsite = async () => {
    try {
      const response = await axios.post('/api/websites', { url: newWebsite })
      if (response.data.status) {
        alert('Website added successfully')
        setNewWebsite('')
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      alert('Error adding website: ' + (error as any).message)
    }
  }
  return (
    <div className="p-8 mt-16 ml-64 mr-64">
      <h1 className="text-3xl font-bold mb-8">Website Monitoring Dashboard</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Website</CardTitle>
          <CardDescription>Enter the URL of the website you want to monitor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="newWebsite">Website URL</Label>
              <Input
                type="text"
                id="newWebsite"
                placeholder="https://example.com"
              />
            </div>
            <Button>Add</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>example.com</CardTitle>
            <CardDescription>Status: Up</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Uptime: 99.9%</p>
            <p>Response Time: 200ms</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dummyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="responseTime" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 space-x-2">
              <Button asChild><Link href="/performance">Performance</Link></Button>
              <Button asChild><Link href="/security">Security</Link></Button>
              <Button asChild><Link href="/seo">SEO</Link></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}