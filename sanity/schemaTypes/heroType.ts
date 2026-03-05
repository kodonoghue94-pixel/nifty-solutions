import {defineField, defineType} from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow1',
      title: 'Eyebrow — Left',
      type: 'string',
      description: 'e.g. Gold Certified Airtable Partner',
    }),
    defineField({
      name: 'eyebrow2',
      title: 'Eyebrow — Right',
      type: 'string',
      description: 'e.g. APAC #1',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'array',
      description: 'Select words and use Orange or Italic marks to style them',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            decorators: [
              {title: 'Italic', value: 'em'},
              {title: 'Orange', value: 'orange'},
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'number', title: 'Number', type: 'string'},
            {name: 'label', title: 'Label', type: 'string'},
          ],
          preview: {
            select: {title: 'number', subtitle: 'label'},
          },
        },
      ],
    }),
    defineField({
      name: 'clients',
      title: 'Client Names',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Add client names for the trusted by strip',
    }),
  ],
})