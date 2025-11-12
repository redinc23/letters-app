export interface EmailTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  htmlPath: string;
}

export const templates: EmailTemplate[] = [
  {
    id: 'archived',
    name: 'Blog Archive',
    category: 'blog',
    description: 'Professional blog archive template with modern design and navigation',
    htmlPath: '/templates/archived.html'
  }
];
