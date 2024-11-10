import { Check, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type ListItem = {
  url: string
  isValid: boolean
}


export default function UrlStatusList({ items = [] }: { items?: ListItem[] }) {
  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">URL Status List</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80%]">URL</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.url}</TableCell>
              <TableCell>
                {item.isValid ? (
                  <Check className="h-6 w-6 text-green-500" aria-label="Valid" />
                ) : (
                  <X className="h-6 w-6 text-red-500" aria-label="Invalid" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}