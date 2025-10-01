'use client'

import { BuilderComponent } from '@builder.io/react'
import { useEffect, useState } from 'react'

interface BuilderPageProps {
  model?: string
  url?: string
}

export default function BuilderPage({ 
  model = 'page', 
  url = '/' 
}: BuilderPageProps) {
  const [content, setContent] = useState(null)

  useEffect(() => {
    // Simple fetch to Builder.io API
    const fetchContent = async () => {
      try {
        const response = await fetch(
          `https://cdn.builder.io/api/v1/query/${model}?apiKey=${process.env.NEXT_PUBLIC_BUILDER_API_KEY}&url=${encodeURIComponent(url)}`
        )
        const data = await response.json()
        if (data.results && data.results.length > 0) {
          setContent(data.results[0])
        }
      } catch (error) {
        console.error('Error fetching Builder.io content:', error)
      }
    }

    fetchContent()
  }, [model, url])

  return content ? (
    <BuilderComponent model={model} content={content} />
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p>Loading Builder.io content...</p>
      </div>
    </div>
  )
}
