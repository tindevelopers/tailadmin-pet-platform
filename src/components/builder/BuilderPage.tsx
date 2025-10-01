'use client'

import { BuilderComponent } from '@builder.io/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface BuilderPageProps {
  model?: string
  url?: string
}

export default function BuilderPage({ 
  model = 'page', 
  url = '/' 
}: BuilderPageProps) {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
        } else {
          setError('No content found')
        }
      } catch (error) {
        console.error('Error fetching Builder.io content:', error)
        setError('Failed to load content')
      } finally {
        setLoading(false)
      }
    }

    // Add timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      setLoading(false)
      setError('Loading timeout - no content found')
    }, 5000)

    fetchContent()

    return () => clearTimeout(timeout)
  }, [model, url])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading Builder.io content...</p>
        </div>
      </div>
    )
  }

  if (content) {
    return <BuilderComponent model={model} content={content} />
  }

  // Fallback when no content is found
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="mb-6">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Content Found</h2>
        <p className="text-gray-600 mb-6">
          {error || "No Builder.io content has been created for this page yet."}
        </p>
        <div className="space-y-3">
          <p className="text-sm text-gray-500">To create content:</p>
          <ol className="text-sm text-gray-600 text-left space-y-2">
            <li>1. Go to <a href="https://builder.io" target="_blank" className="text-blue-600 hover:text-blue-800">Builder.io</a></li>
            <li>2. Create a new page</li>
            <li>3. Set the URL to: <code className="bg-gray-200 px-1 rounded">{url}</code></li>
            <li>4. Design your page and publish</li>
          </ol>
        </div>
        <div className="mt-8">
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
