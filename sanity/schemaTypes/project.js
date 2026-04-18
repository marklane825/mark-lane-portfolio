export default {
  name: 'project',
  title: 'Lighting',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The URL path for this project. Click "Generate" to create it from the title.',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'hoverGif',
      title: 'Hover GIF',
      type: 'image',
      description: 'This GIF will play when someone hovers over the project in the grid.',
      options: {
        hotspot: true
      },
    },
    {
      name: 'coverImage',
      title: 'Main Title Card Image',
      type: 'image',
      description: 'The full-screen image behind the title.',
      options: {
        hotspot: true
      },
      // ADDED THIS SECTION:
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text (SEO)',
          description: 'Mark A. Lane - Gaffer - [Mood] - [Brand]'
        }
      ]
    },
    {
      name: 'isHeroProject',
      title: 'Show in Hero Rotator?',
      type: 'boolean',
      description: 'If checked, this project’s cover image will be eligible for the Home/About/Lighting Hero sections.',
      initialValue: false,
    },
    {
      name: 'sortingId',
      title: 'Sorting ID',
      type: 'number',
      description: 'Higher numbers appear first (e.g., 100 is top, 1 is bottom)',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'gallery',
      title: 'Image Grid Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          // ADDED THIS SECTION:
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text (Technical Description)',
              description: 'Describe the lighting setup and style here.'
            }
          ]
        }
      ],
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Paste the full link (YouTube or Vimeo) to the project video.',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'production',
      title: 'Production Company',
      type: 'string',
    },
    {
      name: 'director',
      title: 'Director',
      type: 'string',
    },
    {
      name: 'cinematography',
      title: 'Cinematography (DP)',
      type: 'string',
    },
    {
      name: 'credit',
      title: 'Your Credit',
      type: 'string',
      initialValue: 'Gaffer',
    },
  ],
};