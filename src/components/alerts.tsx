'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DowntimeAlerts() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [emailEnabled, setEmailEnabled] = useState(false)
  const [smsEnabled, setSmsEnabled] = useState(false)
  const [downtimeThreshold, setDowntimeThreshold] = useState('5')

  const handleSave = () => {
    // Here you would typically send this data to your backend
    console.log('Saving alert preferences:', { email, phone, emailEnabled, smsEnabled, downtimeThreshold })
  }

  return (
    <div className="p-8 mt-16 ml-64 mr-64">
      <h1 className="text-3xl font-bold mb-8">Downtime Alerts</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Alert Settings</CardTitle>
          <CardDescription>Configure how you want to be notified about downtime</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="email-notifications" checked={emailEnabled} onCheckedChange={setEmailEnabled} />
              <Label htmlFor="email-notifications">Email Notifications</Label>
            </div>
            {emailEnabled && (
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Switch id="sms-notifications" checked={smsEnabled} onCheckedChange={setSmsEnabled} />
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
            </div>
            {smsEnabled && (
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <Input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1234567890" />
              </div>
            )}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="downtime-threshold">Downtime Threshold (minutes)</Label>
              <Select value={downtimeThreshold} onValueChange={setDowntimeThreshold}>
                <SelectTrigger>
                  <SelectValue placeholder="Select threshold" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 minute</SelectItem>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSave}>Save Alert Preferences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}