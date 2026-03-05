'use client'

import {PortableText, PortableTextComponents} from '@portabletext/react'

const headlineComponents: PortableTextComponents = {
  marks: {
    orange: ({children}) => <span style={{color: '#FF5C00'}}>{children}</span>,
    em: ({children}) => <em style={{fontStyle: 'italic', fontWeight: 300}}>{children}</em>,
  },
  block: {
    normal: ({children}) => <span className="headline-row"><span>{children}</span></span>,
  },
}

type Stat = { number: string; label: string }

type HeroData = {
  eyebrow1?: string
  eyebrow2?: string
  headline?: any[]
  subheadline?: string
  primaryCta?: string
  secondaryCta?: string
  stats?: Stat[]
  clients?: string[]
}

export default function Hero({data}: {data: HeroData}) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        :root { --orange: #FF5C00; --black: #0A0A0A; --off-white: #F5F4F1; --border: #E2E0DC; }
        body { font-family: 'Space Grotesk', sans-serif; background: var(--off-white); color: var(--black); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        body::after { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); opacity: 0.025; pointer-events: none; z-index: 1000; }

        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 24px 48px; background: var(--off-white); }
        .nav-logo { font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 700; letter-spacing: -0.04em; color: var(--black); text-decoration: none; }
        .nav-links { display: flex; gap: 36px; list-style: none; }
        .nav-links li { font-size: 13px; font-weight: 500; color: #777; cursor: pointer; transition: color 0.2s; }
        .nav-links li:hover { color: var(--black); }
        .nav-cta { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: white; background: var(--black); border: none; padding: 9px 20px; border-radius: 100px; cursor: pointer; transition: background 0.2s; }
        .nav-cta:hover { background: var(--orange); }

        .eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--orange); display: flex; align-items: center; gap: 10px; margin-bottom: 40px; opacity: 0; animation: fade-up 0.6s ease forwards 0.1s; }
        .eyebrow-dot { width: 6px; height: 6px; background: var(--orange); border-radius: 50%; flex-shrink: 0; animation: pulse 2s ease-in-out infinite; }

        .headline { font-family: 'Space Grotesk', sans-serif; font-size: clamp(52px, 9.5vw, 148px); font-weight: 700; line-height: 0.95; letter-spacing: -0.04em; color: var(--black); overflow: visible; padding-bottom: 8px; display: block; }
        .headline-row { display: block; overflow: visible; }
        .headline-row span { display: block; transform: translateY(110%); animation: slide-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .headline-row:nth-child(1) span { animation-delay: 0.2s; }
        .headline-row:nth-child(2) span { animation-delay: 0.35s; }

        .hero-headline-row { display: grid; grid-template-columns: 1fr 240px; gap: 0 48px; align-items: center; }
        .hero-bottom { display: flex; flex-direction: row; gap: 48px; align-items: flex-end; margin-top: 32px; opacity: 0; animation: fade-up 0.7s ease forwards 0.9s; }
        .hero-sub { font-size: 17px; font-weight: 300; line-height: 1.6; color: #666; max-width: 420px; }
        .hero-sub strong { color: var(--black); font-weight: 500; }
        .hero-ctas { display: flex; gap: 16px; align-items: center; flex-shrink: 0; }

        .btn-primary { background: var(--orange); color: white; font-size: 14px; font-weight: 600; padding: 13px 28px; border-radius: 100px; border: none; cursor: pointer; transition: background 0.2s, transform 0.15s; }
        .btn-primary:hover { background: #e85200; transform: scale(1.03); }
        .btn-ghost { font-size: 14px; font-weight: 500; color: #555; cursor: pointer; background: none; border: none; display: inline-flex; align-items: center; gap: 6px; transition: color 0.2s; }
        .btn-ghost:hover { color: var(--black); }

        .ticker-wrap { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); overflow: hidden; padding: 14px 0; opacity: 0; animation: fade-up 0.6s ease forwards 1.1s; }
        .ticker-track { display: flex; animation: ticker 28s linear infinite; white-space: nowrap; }
        .ticker-item { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #aaa; padding: 0 40px; display: inline-flex; align-items: center; gap: 40px; flex-shrink: 0; }
        .ticker-item::after { content: '·'; color: var(--orange); }

        .stats { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--border); margin: 0 48px; opacity: 0; animation: fade-up 0.7s ease forwards 1.3s; }
        .stat { padding: 40px 32px; border-right: 1px solid var(--border); transition: background 0.3s; }
        .stat:last-child { border-right: none; }
        .stat:hover { background: white; }
        .stat-num { font-size: 48px; font-weight: 700; letter-spacing: -0.04em; line-height: 1; color: var(--black); margin-bottom: 8px; }
        .stat-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #aaa; line-height: 1.5; white-space: pre-line; }

        .hero-visual { width: 220px; height: 220px; opacity: 0; animation: fade-up 0.8s ease forwards 0.8s; flex-shrink: 0; }
        .orbit-ring { animation: orbit-spin 18s linear infinite; transform-origin: 110px 110px; }
        .orbit-ring-reverse { animation: orbit-spin 24s linear infinite reverse; transform-origin: 110px 110px; }
        .core-pulse { animation: core-breathe 3s ease-in-out infinite; transform-origin: 110px 110px; }

        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.4; transform:scale(0.6); } }
        @keyframes slide-up { to { transform: translateY(0); } }
        @keyframes fade-up { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes core-breathe { 0%,100% { transform:scale(1); opacity:1; } 50% { transform:scale(1.08); opacity:0.8; } }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .nav { padding: 20px 24px; }
          .nav-links { display: none; }
          .hero-section { min-height: auto !important; padding-top: 100px !important; padding-left: 24px !important; padding-right: 24px !important; padding-bottom: 0 !important; }
          .hero-section > div { padding-bottom: 40px !important; }
          .hero-headline-row { grid-template-columns: 1fr; }
          .hero-visual { display: none; }
          .hero-bottom { flex-direction: column; align-items: flex-start; gap: 32px; margin-top: 40px; }
          .hero-ctas { flex-wrap: wrap; }
          .eyebrow { flex-wrap: wrap; gap: 6px; }
          .eyebrow-sep { display: none; }
          .eyebrow-dot { display: none; }
          .eyebrow-line2 { display: block; width: 100%; padding-left: 0; }
          .ticker-wrap { display: none; }
          .stats { grid-template-columns: repeat(2, 1fr); margin: 0 24px; }
          .stat { padding: 28px 20px; }
          .stat:nth-child(2) { border-right: none; }
          .stat:nth-child(3) { border-top: 1px solid var(--border); border-right: 1px solid var(--border); }
          .stat:nth-child(4) { border-top: 1px solid var(--border); }
          .stat-num { font-size: 36px; }
        }
      `}</style>

      <nav className="nav">
        <a href="/" className="nav-logo">
          nifty<span style={{color: 'var(--orange)'}}>.</span>
        </a>
        <ul className="nav-links">
          {['What We Do', 'Industries', 'Work', 'About'].map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button className="nav-cta">Book a Call →</button>
      </nav>

      <section className="hero-section" style={{minHeight: 'auto', display: 'grid', gridTemplateRows: '1fr auto', padding: '0 48px', paddingTop: 120}}>
        <div style={{display: 'flex', flexDirection: 'column', paddingBottom: 80}}>
          <div className="eyebrow">
  <span className="eyebrow-dot" />
  <span className="eyebrow-line1">{data.eyebrow1 || 'Gold Certified Airtable Partner'}</span>
  <span className="eyebrow-sep" style={{color: '#ccc'}}>·</span>
  <span className="eyebrow-line2">{data.eyebrow2 || 'APAC #1'}</span>
</div>

          <div className="hero-headline-row">
            <h1 className="headline">
              {data.headline ? (
                <PortableText value={data.headline} components={headlineComponents} />
              ) : (
                <>
                  <span className="headline-row"><span>Built for the</span></span>
                  <span className="headline-row"><span>
                    <em style={{fontStyle:'italic', fontWeight:300}}>speed</em>
                    {' '}of{' '}
                    <span style={{color:'var(--orange)'}}>creativity.</span>
                  </span></span>
                </>
              )}
            </h1>
            <div className="hero-visual">
              <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%', height:'100%', overflow:'visible'}}>
                <circle cx="110" cy="110" r="100" stroke="#E2E0DC" strokeWidth="1" strokeDasharray="4 6"/>
                <g className="orbit-ring">
                  <circle cx="110" cy="110" r="72" stroke="#E2E0DC" strokeWidth="1" strokeDasharray="2 8"/>
                  <circle cx="110" cy="38" r="4" fill="#FF5C00"/>
                </g>
                <g className="orbit-ring-reverse">
                  <circle cx="110" cy="110" r="46" stroke="#E2E0DC" strokeWidth="1" strokeDasharray="3 5"/>
                  <circle cx="156" cy="110" r="3" fill="#0A0A0A"/>
                </g>
                <g className="core-pulse">
                  <circle cx="110" cy="110" r="18" fill="#FF5C00" opacity="0.12"/>
                  <circle cx="110" cy="110" r="10" fill="#FF5C00"/>
                </g>
                <text x="162" y="48" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#ccc" letterSpacing="1">SYSTEM</text>
                <text x="162" y="60" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#ccc" letterSpacing="1">ACTIVE</text>
              </svg>
            </div>
          </div>

          <div className="hero-bottom">
            <p className="hero-sub">
              {data.subheadline || 'Nifty is the Airtable partner for global media, entertainment, and production companies. We design, build, and ship operational systems in weeks. Trusted by Netflix, Paramount, and Disney.'}
            </p>
            <div className="hero-ctas">
              <button className="btn-primary">{data.primaryCta || 'Book a Call →'}</button>
              <button className="btn-ghost">{data.secondaryCta || 'See our work'} →</button>
            </div>
          </div>
        </div>

        <div className="ticker-wrap">
          <div className="ticker-track">
            {[
              'Airtable Implementation','Operational Systems','Media & Entertainment',
              'Streaming Operations','Production Workflows','Broadcast Systems',
              'Partnership Revenue Ops','Low-Code Development',
              'Airtable Implementation','Operational Systems','Media & Entertainment',
              'Streaming Operations','Production Workflows','Broadcast Systems',
              'Partnership Revenue Ops','Low-Code Development',
            ].map((item, i) => (
              <span key={i} className="ticker-item">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="stats">
        {(data.stats || [
          {number: '$300M+', label: 'in partnership\nrevenue ops'},
          {number: '#1', label: 'Airtable partner\nin APAC'},
          {number: '16', label: 'person team,\nall in Sydney'},
          {number: 'Top 5', label: 'worldwide\nAirtable partner'},
        ]).map((stat, i) => (
          <div key={i} className="stat">
            <div className="stat-num" style={{color: i === 0 ? 'var(--orange)' : 'var(--black)'}}>{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{height: 1, background: 'var(--border)', margin: '0 48px'}} />
    </>
  )
}