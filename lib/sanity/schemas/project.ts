import type { Rule } from 'sanity';

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'tag',
      title: 'Tag / Label',
      type: 'string',
      description: 'e.g. Concept, Demo, Prototype',
    },
    {
      name: 'url',
      title: 'Project URL',
      type: 'url',
      description: 'Link to the live project or website',
    },
    {
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      description: 'Screenshot or preview of the project',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
};
