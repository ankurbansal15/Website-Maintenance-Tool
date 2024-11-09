'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Activity, AlertTriangle, ArrowDown, ArrowUp, Clock, Download, Zap } from 'lucide-react'

// Simulated API call to fetch performance data
const fetchPerformanceData = async (url: string, days: number) => {
  // In a real application, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const data = []
  const now = Date.now()
  for (let i = 0; i < days; i++) {
    data.push({
      date: new Date(now - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      loadTime: Math.random() * 3000 + 500,
      ttfb: Math.random() * 500 + 100,
      fcp: Math.random() * 1500 + 300,
      lcp: Math.random() * 2500 + 500,
      cls: Math.random() * 0.25,
      fid: Math.random() * 100 + 50,
    })
  }
  return data.reverse()
}

const websites = [
  { value: 'example.com', label: 'Example.com' },
  { value: 'test.com', label: 'Test.com' },
  { value: 'demo.com', label: 'Demo.com' },
]

const timeRanges = [
  { value: '7', label: 'Last 7 days' },
  { value: '30', label: 'Last 30 days' },
  { value: '90', label: 'Last 90 days' },
]

interface PerformanceDataPoint {
  date: string
  loadTime: number
  ttfb: number
  fcp: number
  lcp: number
  cls: number
  fid: number
}

export default function PerformanceMetrics() {
  const [selectedWebsite, setSelectedWebsite] = useState(websites[0].value)
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRanges[0].value)
  const [performanceData, setPerformanceData] = useState<PerformanceDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const data = await fetchPerformanceData(selectedWebsite, parseInt(selectedTimeRange))
      setPerformanceData(data)
      setIsLoading(false)
    }
    fetchData()
  }, [selectedWebsite, selectedTimeRange])

  const getAverageMetric = (metric: keyof PerformanceDataPoint) => {
    if (performanceData.length === 0) return '0'
    const sum = performanceData.reduce((acc, curr) => acc + (curr[metric] as number), 0)
    return (sum / performanceData.length).toFixed(2)
  }

  const getMetricTrend = (metric: keyof PerformanceDataPoint) => {
    if (performanceData.length < 2) return 0
    const firstValue = performanceData[0][metric]
    const lastValue = performanceData[performanceData.length - 1][metric]
    return ((Number(lastValue) - Number(firstValue)) / Number(firstValue) * 100)
  }

  const renderMetricCard = (title: string, metric: keyof PerformanceDataPoint, unit: string, icon: React.ReactNode) => {
    const value = getAverageMetric(metric)
    const trend = getMetricTrend(metric)
    
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value} {unit}</div>
          <p className="text-xs text-muted-foreground">
            {trend > 0 ? <ArrowUp className="inline mr-1 text-red-500" /> : <ArrowDown className="inline mr-1 text-green-500" />}
            <span className={trend > 0 ? "text-red-500" : "text-green-500"}>{Math.abs(trend).toFixed(2)}%</span> from last {selectedTimeRange} days
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">Performance Metrics</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={selectedWebsite} onValueChange={setSelectedWebsite}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select website" />
          </SelectTrigger>
          <SelectContent>
            {websites.map((website) => (
              <SelectItem key={website.value} value={website.value}>
                {website.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            {timeRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading performance data...</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {renderMetricCard("Average Load Time", "loadTime", "ms", <Clock className="h-4 w-4 text-muted-foreground" />)}
            {renderMetricCard("Average TTFB", "ttfb", "ms", <Zap className="h-4 w-4 text-muted-foreground" />)}
            {renderMetricCard("Average FCP", "fcp", "ms", <Activity className="h-4 w-4 text-muted-foreground" />)}
            {renderMetricCard("Average LCP", "lcp", "ms", <Download className="h-4 w-4 text-muted-foreground" />)}
          </div>

          <Tabs defaultValue="loadTime" className="space-y-4">
            <TabsList>
              <TabsTrigger value="loadTime">Load Time</TabsTrigger>
              <TabsTrigger value="ttfb">TTFB</TabsTrigger>
              <TabsTrigger value="fcp">FCP</TabsTrigger>
              <TabsTrigger value="lcp">LCP</TabsTrigger>
            </TabsList>
            {['loadTime', 'ttfb', 'fcp', 'lcp'].map((metric) => (
              <TabsContent key={metric} value={metric}>
                <Card>
                  <CardHeader>
                    <CardTitle>{metric === 'ttfb' ? 'Time to First Byte' : metric.toUpperCase()} Over Time</CardTitle>
                    <CardDescription>
                      Track how {metric === 'ttfb' ? 'Time to First Byte' : metric.toUpperCase()} changes over the selected time period
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey={metric} stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Core Web Vitals</CardTitle>
              <CardDescription>
                Track Core Web Vitals metrics: Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="lcp" fill="#8884d8" name="LCP (ms)" />
                  <Bar yAxisId="left" dataKey="fid" fill="#82ca9d" name="FID (ms)" />
                  <Bar yAxisId="right" dataKey="cls" fill="#ffc658" name="CLS" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}