import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

const securityChecks = [
  { name: 'SSL Certificate', status: 'valid', expiration: '2024-01-01' },
  { name: 'HTTPS Redirect', status: 'enabled' },
  { name: 'Content Security Policy', status: 'missing' },
  { name: 'X-XSS-Protection', status: 'enabled' },
  { name: 'X-Frame-Options', status: 'set' },
]

export default function SecurityChecks() {
  return (
    <div className="p-8 mt-16 ml-64 mr-64">
      <h1 className="text-3xl font-bold mb-8">Security Checks</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {securityChecks.map((check, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {check.name}
                <Badge variant={check.status === 'valid' || check.status === 'enabled' || check.status === 'set' ? 'default' : 'destructive'}>
                  {check.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {check.status === 'valid' || check.status === 'enabled' || check.status === 'set' ? (
                <CheckCircle className="text-green-500" />
              ) : check.status === 'missing' ? (
                <XCircle className="text-red-500" />
              ) : (
                <AlertTriangle className="text-yellow-500" />
              )}
              {check.expiration && (
                <p className="mt-2">Expires on: {check.expiration}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}