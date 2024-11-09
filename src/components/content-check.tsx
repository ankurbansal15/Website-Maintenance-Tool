'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle } from 'lucide-react'

const dummyContentData = [
  { type: 'Image', path: '/logo.png', status: 'OK' },
  { type: 'CSS', path: '/styles.css', status: 'OK' },
  { type: 'JavaScript', path: '/main.js', status: 'Error' },
  { type: 'Image', path: '/banner.jpg', status: 'OK' },
  { type: 'Font', path: '/fonts/opensans.woff2', status: 'Error' },
]

export default function ContentCheck() {
  const [url, setUrl] = useState('')
  const [contentData, setContentData] = useState(dummyContentData)

  const handleCheck = () => {
    // Here you would typically send a request to your backend to perform the content check
    console.log('Checking content for:', url)
    // For now, we'll just randomize the dummy data
    setContentData(dummyContentData.map(item => ({ ...item, status: Math.random() > 0.2 ? 'OK' : 'Error' })))
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Content Check</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Check Website Content</CardTitle>
          <CardDescription>Enter a URL to check if all content is loading correctly</CardDescription>
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
            <Button onClick={handleCheck}>Check Content</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Check Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contentData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.path}</TableCell>
                  <TableCell>
                    {item.status === 'OK' ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <XCircle className="text-red-500" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}