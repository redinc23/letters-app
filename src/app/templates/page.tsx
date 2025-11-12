'use client';

import { useState } from 'react';
import Link from 'next/link';
import { templates } from '@/templates';

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(templates.map(t => t.category))];
  
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            Email Templates
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Browse and customize {templates.length} professional email templates
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 rounded-lg border border-zinc-200 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-zinc-200 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <Link
              key={template.id}
              href={`/templates/${template.id}`}
              className="group rounded-lg border border-zinc-200 bg-white p-6 transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mb-4 aspect-video rounded bg-zinc-100 dark:bg-zinc-800" />
              <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {template.name}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {template.description}
              </p>
              <span className="mt-4 inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                {template.category}
              </span>
            </Link>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="py-12 text-center text-zinc-500 dark:text-zinc-400">
            No templates found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
