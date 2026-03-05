'use client'

import {useEffect, useRef} from 'react'

export default function HomePanels() {
  const statsRef = useRef<HTMLDivElement>(null)
  const statsStarted = useRef(false)

  function countUp(el: HTMLElement, target: number, prefix = '', suffix = '', duration = 1500) {
    const start = performance.now()
    function update(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      const current = Math.round(eased * target)
      el.textContent = prefix + current + suffix
      if (progress < 1) requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
  }

  useEffect(() => {
    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, {threshold: 0.1})

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    // Stats count-up
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsStarted.current) {
          statsStarted.current = true
          const s1 = document.getElementById('stat-1')
          const s2 = document.getElementById('stat-2')
          const s4 = document.getElementById('stat-4')
          if (s1) countUp(s1, 200, '', '+')
          if (s2) countUp(s2, 300, '$', 'M+')
          if (s4) { setTimeout(() => { if(s4) s4.textContent = 'Top 5' }, 400) }
        }
      })
    }, {threshold: 0.3})

    if (statsRef.current) statsObserver.observe(statsRef.current)

    return () => { observer.disconnect(); statsObserver.disconnect() }
  }, [])

  return (
    <>
      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-d1 { transition-delay: 0.1s; }
        .reveal-d2 { transition-delay: 0.2s; }
        .reveal-d3 { transition-delay: 0.3s; }

        .section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #FF5C00;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 48px;
        }
        .section-label::before {
          content: '';
          width: 24px; height: 1px;
          background: #FF5C00;
          flex-shrink: 0;
        }
        .section-label-dark::before { background: #333; }
        .section-label-dark { color: #444; }

        .problem-row {
          display: flex; align-items: center; gap: 16px;
          padding: 20px 24px;
          border: 1px solid #E2E0DC;
          border-radius: 6px;
          background: #F5F4F1;
          transition: border-color 0.3s, background 0.3s;
          margin-bottom: 12px;
        }
        .problem-row:hover { border-color: #ccc; background: white; }
        .problem-row-icon { width: 32px; height: 32px; border-radius: 50%; background: #EDE9E4; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
        .problem-row-text { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.06em; color: #999; text-transform: uppercase; }
        .problem-row-dot { margin-left: auto; width: 8px; height: 8px; border-radius: 50%; background: #E8453C; flex-shrink: 0; }
        .problem-row.warn .problem-row-dot { background: #F5A623; }

        .stat-item { padding: 48px 36px; border-right: 1px solid #1E1E1E; transition: background 0.3s; cursor: default; }
        .stat-item:last-child { border-right: none; }
        .stat-item:hover { background: #111; }

        .industry-card {
          background: white; padding: 40px 36px;
          border: 1px solid #E2E0DC;
          display: flex; flex-direction: column; gap: 20px;
          transition: border-color 0.2s, box-shadow 0.2s;
          cursor: pointer; position: relative; overflow: hidden;
        }
        .industry-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px; background: #FF5C00;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s ease;
        }
        .industry-card:hover { border-color: #ccc; box-shadow: 0 4px 32px rgba(0,0,0,0.06); }
        .industry-card:hover::after { transform: scaleX(1); }

        .industry-tag {
          font-family: 'JetBrains Mono', monospace; font-size: 9px;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #aaa; padding: 4px 10px;
          border: 1px solid #E2E0DC; border-radius: 100px;
        }

        .process-step { padding: 48px 36px 48px 0; border-right: 1px solid #E2E0DC; }
        .process-step:last-child { border-right: none; padding-right: 0; }
        .process-step:not(:first-child) { padding-left: 36px; }
      `}</style>

      {/* ── PANEL 2: THE PROBLEM ── */}
      <section style={{background: 'white', padding: '120px 48px', borderTop: '1px solid #E2E0DC'}}>
        <div style={{maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center'}}>
          <div>
            <div className="section-label reveal">The problem</div>
            <h2 className="reveal" style={{fontSize: 'clamp(36px, 4.5vw, 58px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, color: '#0A0A0A', marginBottom: 32}}>
              Your tools weren't<br />built for this.
            </h2>
            <div className="reveal">
              <p style={{fontSize: 17, fontWeight: 300, lineHeight: 1.75, color: '#666', marginBottom: 16}}>
                Spreadsheets held together with formulas. Tools that don't talk to each other. Reporting that takes days. Timelines nobody trusts.
              </p>
              <p style={{fontSize: 17, fontWeight: 300, lineHeight: 1.75, color: '#666', marginBottom: 16}}>
                The creative industries move fast. <strong style={{color: '#0A0A0A', fontWeight: 600}}>Most operational systems don't.</strong>
              </p>
              <p style={{fontSize: 17, fontWeight: 300, lineHeight: 1.75, color: '#666'}}>
                We fix that.
              </p>
            </div>
          </div>

          <div className="reveal reveal-d1">
            <div className="problem-row bad">
              <div className="problem-row-icon">📊</div>
              <div className="problem-row-text">Production tracker v14_FINAL_final.xlsx</div>
              <div className="problem-row-dot"></div>
            </div>
            <div className="problem-row warn">
              <div className="problem-row-icon">📧</div>
              <div className="problem-row-text">Campaign brief — Slack thread (287 messages)</div>
              <div className="problem-row-dot"></div>
            </div>
            <div className="problem-row bad">
              <div className="problem-row-icon">📋</div>
              <div className="problem-row-text">Partner status — last updated 3 weeks ago</div>
              <div className="problem-row-dot"></div>
            </div>
            <div className="problem-row warn">
              <div className="problem-row-icon">📁</div>
              <div className="problem-row-text">Budget approvals — waiting on 6 people</div>
              <div className="problem-row-dot"></div>
            </div>
            <div style={{marginTop: 24, padding: '20px 24px', background: '#FF5C00', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 16}}>
              <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'white', fontWeight: 500}}>Nifty — one source of truth</div>
              <div style={{marginLeft: 'auto', width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14}}>✓</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PANEL 3: STATS ── */}
      <section style={{background: '#0A0A0A', padding: '120px 48px'}}>
        <div style={{maxWidth: 1120, margin: '0 auto'}}>
          <div className="section-label section-label-dark reveal">By the numbers</div>
          <h2 className="reveal" style={{fontSize: 'clamp(36px, 4.5vw, 58px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'white', marginBottom: 80, lineHeight: 1.0}}>
            The numbers<br />that matter.
          </h2>
          <div ref={statsRef} style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid #1E1E1E', borderRadius: 4, overflow: 'hidden'}}>
            <div className="stat-item reveal">
              <span id="stat-1" style={{fontSize: 56, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: '#FF5C00', display: 'block', marginBottom: 12}}>200+</span>
              <span style={{fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#444', lineHeight: 1.6}}>enterprise<br />implementations</span>
            </div>
            <div className="stat-item reveal reveal-d1">
              <span id="stat-2" style={{fontSize: 56, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: '#FF5C00', display: 'block', marginBottom: 12}}>$300M+</span>
              <span style={{fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#444', lineHeight: 1.6}}>in partnership<br />revenue ops</span>
            </div>
            <div className="stat-item reveal reveal-d2">
              <span style={{fontSize: 56, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: '#FF5C00', display: 'block', marginBottom: 12}}>#1</span>
              <span style={{fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#444', lineHeight: 1.6}}>rated Airtable<br />partner in APAC</span>
            </div>
            <div className="stat-item reveal reveal-d3">
              <span id="stat-4" style={{fontSize: 56, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: '#FF5C00', display: 'block', marginBottom: 12}}>Top 5</span>
              <span style={{fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#444', lineHeight: 1.6}}>Airtable partners<br />worldwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PANEL 4: INDUSTRIES ── */}
      <section style={{background: '#F5F4F1', padding: '120px 48px'}}>
        <div style={{maxWidth: 1120, margin: '0 auto'}}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'end', marginBottom: 64}}>
            <div>
              <div className="section-label reveal">Industries</div>
              <h2 className="reveal" style={{fontSize: 'clamp(36px, 4.5vw, 58px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, color: '#0A0A0A'}}>
                We work where<br />complexity lives.
              </h2>
            </div>
            <p className="reveal" style={{fontSize: 16, fontWeight: 300, lineHeight: 1.7, color: '#666', maxWidth: 380, justifySelf: 'end', alignSelf: 'end'}}>
              The most demanding creative organisations in the world trust Nifty because we understand their business — not just their software.
            </p>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2}}>
            <div className="industry-card reveal">
              <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', color: '#FF5C00', textTransform: 'uppercase' as const}}>01</div>
              <div style={{fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: '#0A0A0A'}}>Streaming &amp; Digital Media</div>
              <div style={{fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: '#666', flex: 1}}>Partnership operations at scale. $300M+ in revenue managed across a single Airtable platform — connecting opportunities, campaigns, and creative collaboration across regions.</div>
              <div style={{display: 'flex', flexWrap: 'wrap' as const, gap: 6, paddingTop: 20, borderTop: '1px solid #E2E0DC', marginTop: 'auto'}}>
                <span className="industry-tag">Partnership Ops</span>
                <span className="industry-tag">Revenue Tracking</span>
                <span className="industry-tag">Campaign Mgmt</span>
              </div>
              <div style={{fontSize: 13, fontWeight: 500, color: '#FF5C00'}}>Learn more →</div>
            </div>

            <div className="industry-card reveal reveal-d1">
              <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', color: '#FF5C00', textTransform: 'uppercase' as const}}>02</div>
              <div style={{fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: '#0A0A0A'}}>Film, TV &amp; Production</div>
              <div style={{fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: '#666', flex: 1}}>Development through delivery. External partner portals. Real-time visibility across content, legal, and finance — across as many markets as you need.</div>
              <div style={{display: 'flex', flexWrap: 'wrap' as const, gap: 6, paddingTop: 20, borderTop: '1px solid #E2E0DC', marginTop: 'auto'}}>
                <span className="industry-tag">Production Tracking</span>
                <span className="industry-tag">Partner Portals</span>
                <span className="industry-tag">Multi-market</span>
              </div>
              <div style={{fontSize: 13, fontWeight: 500, color: '#FF5C00'}}>Learn more →</div>
            </div>

            <div className="industry-card reveal reveal-d2">
              <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', color: '#FF5C00', textTransform: 'uppercase' as const}}>03</div>
              <div style={{fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: '#0A0A0A'}}>Broadcast</div>
              <div style={{fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: '#666', flex: 1}}>Campaign management, capacity planning, brief-to-execution workflows. We replaced 15 spreadsheets at a national broadcaster and gave 100 people one source of truth.</div>
              <div style={{display: 'flex', flexWrap: 'wrap' as const, gap: 6, paddingTop: 20, borderTop: '1px solid #E2E0DC', marginTop: 'auto'}}>
                <span className="industry-tag">Campaign Mgmt</span>
                <span className="industry-tag">Capacity Planning</span>
                <span className="industry-tag">Workflows</span>
              </div>
              <div style={{fontSize: 13, fontWeight: 500, color: '#FF5C00'}}>Learn more →</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PANEL 5: HOW WE WORK ── */}
      <section style={{background: 'white', padding: '120px 48px', borderTop: '1px solid #E2E0DC'}}>
        <div style={{maxWidth: 1120, margin: '0 auto'}}>
          <div style={{marginBottom: 80, maxWidth: 640}}>
            <div className="section-label reveal">How we work</div>
            <h2 className="reveal" style={{fontSize: 'clamp(36px, 4.5vw, 58px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, color: '#0A0A0A', marginBottom: 24}}>
              We show working software<br />at every meeting.
            </h2>
            <p className="reveal" style={{fontSize: 17, fontWeight: 300, lineHeight: 1.7, color: '#666'}}>
              No 80-page SOWs. No endless discovery phases. Here's how it actually goes.
            </p>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid #E2E0DC'}}>
            {[
              {num: '01', title: 'A call with one of our founders.', body: 'We understand your situation and tell you honestly whether we can help — and what that looks like.'},
              {num: '02', title: 'A proposal that week.', body: 'Clear scope, clear plan. No surprises.'},
              {num: '03', title: 'Working software, every check-in.', body: 'We build live. You see real progress every session. A production-ready system in 4 to 8 weeks.'},
              {num: '04', title: 'We stick around.', body: 'Your business evolves — your systems should too. We\'re there for the roadmap and the surprises.'},
            ].map((step, i) => (
              <div key={i} className={`process-step reveal reveal-d${i}`}>
                <div style={{width: 44, height: 44, borderRadius: '50%', background: '#FF5C00', color: 'white', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28}}>
                  {step.num}
                </div>
                <div style={{fontSize: 17, fontWeight: 600, letterSpacing: '-0.02em', color: '#0A0A0A', marginBottom: 12, lineHeight: 1.3}}>{step.title}</div>
                <div style={{fontSize: 14, fontWeight: 300, lineHeight: 1.75, color: '#666'}}>{step.body}</div>
              </div>
            ))}
          </div>

          <div className="reveal" style={{marginTop: 80, paddingTop: 48, borderTop: '1px solid #E2E0DC', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: '#0A0A0A'}}>Ready to get started?</div>
            <button style={{background: '#FF5C00', color: 'white', fontSize: 14, fontWeight: 600, padding: '14px 32px', borderRadius: 100, border: 'none', cursor: 'pointer'}}>
              Book a Call →
            </button>
          </div>
        </div>
      </section>
    </>
  )
}