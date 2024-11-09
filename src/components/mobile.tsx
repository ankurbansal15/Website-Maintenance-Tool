import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const devices = [
  { name: 'iPhone 12', score: 95, screenshot: '/placeholder.svg?height=400&width=200' },
  { name: 'Samsung Galaxy S21', score: 90, screenshot: '/placeholder.svg?height=400&width=200' },
  { name: 'iPad Air', score: 85, screenshot: '/placeholder.svg?height=400&width=300' },
]

export default function MobileCompatibility() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Mobile Compatibility Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {device.name}
                <Badge variant={device.score >= 90 ? 'default' : 'secondary'}>
                  Score: {device.score}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-[400px]">
                <Image
                  src={device.screenshot}
                  alt={`${device.name} screenshot`}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}