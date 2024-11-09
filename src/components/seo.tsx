import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const seoMetrics = [
  { name: 'Title Tag', score: 90, description: 'Title is well-optimized' },
  { name: 'Meta Description', score: 75, description: 'Meta description could be improved' },
  { name: 'Header Tags', score: 100, description: 'Proper use of header tags' },
  { name: 'Image Alt Text', score: 60, description: 'Some images are missing alt text' },
  { name: 'Internal Links', score: 85, description: 'Good internal linking structure' },
]

export default function SEOAnalysis() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">SEO Analysis</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {seoMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{metric.name}</CardTitle>
              <CardDescription>{metric.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Progress value={metric.score} className="w-full" />
                <span className="text-sm font-medium">{metric.score}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}