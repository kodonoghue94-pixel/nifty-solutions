import Image from 'next/image'

type SiteSettings = {
  logo?: { asset?: { url: string } }
  email?: string
  linkedinUrl?: string
}

export default function Footer({ settings }: { settings: SiteSettings }) {
  const email = settings?.email || 'hello@niftysolutions.com.au'
  const linkedinUrl = settings?.linkedinUrl || 'https://linkedin.com/company/niftysolutions'
  const logoUrl = settings?.logo?.asset?.url

  return (
    <footer style={{
      background: '#0A0A0A',
      padding: '80px 48px 40px',
      fontFamily: "'Space Grotesk', sans-serif",
    }}>
      <div style={{maxWidth: 1120, margin: '0 auto'}}>

        {/* Top — CTA */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 48,
          alignItems: 'end',
          paddingBottom: 64,
          borderBottom: '1px solid #1A1A1A',
        }}>
          <div>
            <h2 style={{
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              color: 'white',
              marginBottom: 16,
            }}>
              Let's build something<br />
              that <span style={{color: '#FF5C00'}}>actually works.</span>
            </h2>
            <a href={`mailto:${email}`} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              letterSpacing: '0.04em',
              color: '#444',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              transition: 'color 0.2s',
            }}>
              {email} →
            </a>
          </div>
          <button style={{
            background: '#FF5C00',
            color: 'white',
            fontSize: 14,
            fontWeight: 600,
            padding: '14px 32px',
            borderRadius: 100,
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}>
            Book a Call →
          </button>
        </div>

        {/* Mid — logo + nav */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 48,
          alignItems: 'start',
          padding: '48px 0',
          borderBottom: '1px solid #1A1A1A',
        }}>
          <div>
            <a href="/" style={{display: 'inline-block', marginBottom: 16, textDecoration: 'none'}}>
              {logoUrl ? (
                <Image src={logoUrl} alt="Nifty" width={120} height={36} style={{objectFit: 'contain'}} />
              ) : (
                <span style={{
                  fontSize: 32,
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  color: 'white',
                }}>
                  nifty<span style={{color: '#FF5C00'}}>.</span>
                </span>
              )}
            </a>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: '#333',
              lineHeight: 1.6,
            }}>
              Gold Certified Airtable Partner<br />
              APAC #1 · Sydney, Australia
            </div>
          </div>

          <nav style={{display: 'flex', gap: 64, alignItems: 'start'}}>
            <div style={{display: 'flex', flexDirection: 'column' as const, gap: 16}}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                letterSpacing: '0.16em',
                textTransform: 'uppercase' as const,
                color: '#333',
                marginBottom: 4,
              }}>Company</div>
              <a href="/careers" style={{fontSize: 14, color: '#555', textDecoration: 'none'}}>Careers</a>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" style={{fontSize: 14, color: '#555', textDecoration: 'none'}}>LinkedIn</a>
            </div>
            <div style={{display: 'flex', flexDirection: 'column' as const, gap: 16}}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                letterSpacing: '0.16em',
                textTransform: 'uppercase' as const,
                color: '#333',
                marginBottom: 4,
              }}>Legal</div>
              <a href="/privacy" style={{fontSize: 14, color: '#555', textDecoration: 'none'}}>Privacy Policy</a>
            </div>
          </nav>
        </div>

        {/* Bottom — copyright + LinkedIn icon */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 32,
          flexWrap: 'wrap' as const,
          gap: 16,
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.08em',
            color: '#2A2A2A',
          }}>
            © {new Date().getFullYear()} Nifty Solutions Pty Ltd. All rights reserved.
          </div>
          <div style={{display: 'flex', gap: 24, alignItems: 'center'}}>
            <a href="/privacy" style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: '#2A2A2A',
              textDecoration: 'none',
            }}>Privacy</a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{
              width: 32, height: 32,
              border: '1px solid #1E1E1E',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#333',
              textDecoration: 'none',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}