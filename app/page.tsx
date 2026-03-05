import { client } from '@/sanity/lib/client'
import { heroQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import Hero from './components/Hero'
import HomePanels from './components/HomePanels'
import Footer from './components/Footer'

export default async function Home() {
  const [heroData, siteSettings] = await Promise.all([
    client.fetch(heroQuery),
    client.fetch(siteSettingsQuery),
  ])

  return (
    <main>
      <Hero data={heroData || {}} />
      <HomePanels />
      <Footer settings={siteSettings || {}} />
    </main>
  )
}