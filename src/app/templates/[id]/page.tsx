'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { templates } from '@/templates';

export default function TemplateDetailPage() {
  const params = useParams();
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);
  
  const template = templates.find(t => t.id === params.id);

  useEffect(() => {
    if (template) {
      fetch(template.htmlPath)
        .then(res => res.text())
        .then(html => {
          setHtmlContent(html);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [template]);

  if (!template) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Template not found</h1>
          <Link href="/templates" className="text-blue-600 hover:underline">
            Back to templates
          </Link>
        </div>
      </div>
    );
  }

  const handleExport = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.id}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlContent);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link 
              href="/templates"
              className="mb-4 inline-flex items-center text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              ← Back to templates
            </Link>
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
              {template.name}
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              {template.description}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Copy HTML
            </button>
            <button
              onClick={handleExport}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Export
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="border-b border-zinc-200 p-4 dark:border-zinc-800">
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">Preview</h2>
            </div>
            <div className="p-4">
              {loading ? (
                <div className="flex h-96 items-center justify-center">
                  <div className="text-zinc-500">Loading preview...</div>
                </div>
              ) : (
                <iframe
                  srcDoc={htmlContent}
                  className="h-96 w-full rounded border border-zinc-200 dark:border-zinc-800"
                  title="Email Preview"
                />
              )}
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="border-b border-zinc-200 p-4 dark:border-zinc-800">
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">HTML Source</h2>
            </div>
            <div className="p-4">
              <pre className="h-96 overflow-auto rounded bg-zinc-50 p-4 text-xs dark:bg-zinc-950">
                <code>{htmlContent}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
