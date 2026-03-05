import { client } from '@/sanity/lib/client'
import { heroQuery } from '@/sanity/lib/queries'
import Hero from './components/Hero'

export default async function Home() {
  const heroData = await client.fetch(heroQuery)

  return (
    <main>
      <Hero data={heroData || {}} />
    </main>
  )
}