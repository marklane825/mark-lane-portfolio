import { client } from '@/sanity/lib/client';

export default async function sitemap() {
  const baseUrl = 'https://mark-lane.co.uk';

  // 1. Fetch all project slugs from Sanity
  const query = `*[_type == "project" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }`;
  
  const projects = await client.fetch(query);

  // 2. Map projects to sitemap format
  const projectUrls = projects.map((project: any) => ({
  url: `${baseUrl}/lighting/${project.slug}`,
  lastModified: new Date(project._updatedAt),
  changeFrequency: 'monthly',
  priority: 0.8,
}));

  // 3. Define your static main pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/lighting`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  return [...staticPages, ...projectUrls];
}