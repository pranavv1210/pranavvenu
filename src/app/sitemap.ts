import type { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'

const siteUrl = 'https://pranavvenu.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: project.featured ? 0.8 : 0.65,
    })),
  ]
}
