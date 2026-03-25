import type { Rule } from 'sanity';

export default {
  name: 'contactSettings',
  title: 'Contact Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'whatsappNumber',
      title: 'WhatsApp Phone Number',
      type: 'string',
      description: 'Include country code, e.g. +1234567890',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
};
