'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const dummyLatencyData = [
  { location: 'New York', latency: 50 },
  { location: 'London', latency: 100 },
  { location: 'Tokyo', latency: 200 },
  { location: 'Sydney', latency: 250 },
  { location: 'São Paulo', latency: 150 },
]

export default function PingLatencyTest() {
  const [url, setUrl] = useState('')
  const [latencyData, setLatencyData] = useState(dummyLatencyData)

  const handleTest = () => {
    // Here you would typically send a request to your backend to perform the latency test
    console.log('Testing latency for:', url)
    // For now, we'll just randomize the dummy data
    setLatencyData(dummyLatencyData.map(item => ({ ...item, latency: Math.floor(Math.random() * 300) + 50 })))
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Ping & Latency Test</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Test Latency</CardTitle>
          <CardDescription>Enter a URL to test its latency from various global locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="url">Website URL</Label>
              <Input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <Button onClick={handleTest}>Test</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Latency Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead>Latency (ms)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {latencyData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.latency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}