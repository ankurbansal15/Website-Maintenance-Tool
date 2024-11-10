'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function KeywordResearchComponent() {
  const [keyword, setKeyword] = useState('')
  interface KeywordResult {
    keyword: string;
    volume: number;
    difficulty: number;
    cpc: number;
  }

  const [results, setResults] = useState<KeywordResult[]>([])

  const handleSearch = async () => {
    if (!keyword) return;

    try {
      const response = await fetch('/api/keyword-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword })
      });

      if (response.ok) {
        const data: KeywordResult[] = await response.json();
        setResults(data);
      } else {
        console.error('Failed to fetch keyword data');
      }
    } catch (error) {
      console.error('Error fetching keyword data:', error);
    }
  }

  return (
    <div className='mt-16'>
      <Card>
        <div className='ml-64 mr-64'>
          <CardHeader>
            <CardTitle>Keyword Research</CardTitle>
            <CardDescription>Discover valuable keywords for your content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-4">
              <Input 
                placeholder="Enter a keyword" 
                value={keyword} 
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button onClick={handleSearch}>Search</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword</TableHead>
                  <TableHead>Search Volume</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>CPC</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell>{result.keyword}</TableCell>
                    <TableCell>{result.volume.toLocaleString()}</TableCell>
                    <TableCell>{result.difficulty}/100</TableCell>
                    <TableCell>${result.cpc.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
