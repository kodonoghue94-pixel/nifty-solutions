import {groq} from 'next-sanity'

export const heroQuery = groq`*[_type == "hero"][0]{
  eyebrow1,
  eyebrow2,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  stats,
  clients
}`
