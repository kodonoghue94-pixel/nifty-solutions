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
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, {threshold: 0.1})

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsStarted.current) {
          statsStarted.current = true
          const s1 = document.getElementById('stat-1')
          const s2 = document.getElementById('stat-2')
          if (s1) countUp(s1, 200, '', '+')
          if (s2) countUp(s2, 300, '$', 'M+')
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

        .section-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #FF5C00; display: flex; align-items: center; gap: 12px; margin-bottom: 48px; }
        .section-label::before { content: ''; width: 24px; height: 1px; background: #FF5C00; flex-shrink: 0; }
        .section-label-dark::before { background: #333; }
        .section-label-dark { color: #444; }

        .problem-row { display: flex; align-items: center; gap: 16px; padding: 20px 24px; border: 1px solid #E2E0DC; border-radius: 6px; background: #F5F4F1; transition: border-color 0.3s, background 0.3s; margin-bottom: 12px; }
        .problem-row:hover { border-color: #ccc; background: white; }
        .problem-row-icon { width: 32px; height: 32px; border-radius: 50%; background: #EDE9E4; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
        .problem-row-text { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.06em; color: #999; text-transform: uppercase; }
        .problem-row-dot { margin-left: auto; width: 8px; height: 8px; border-radius: 50%; background: #E8453C; flex-shrink: 0; }
        .problem-row.warn .problem-row-dot { background: #F5A623; }

        .stat-item { padding: 48px 36px; border-right: 1px solid #1E1E1E; transition: background 0.3s; cursor: default; }
        .stat-item:last-child { border-right: none; }
        .stat-item:hover { background: #111; }

        .industry-card { background: white; padding: 40px 36px; border: 1px solid #E2E0DC; display: flex; flex-direction: column; gap: 20px; transition: border-color 0.2s, box-shadow 0.2s; cursor: pointer; position: relative; overflow: hidden; }
        .industry-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: #FF5C00; transform: scaleX(0); transform-origin: left; transition: transform 0.3s ease; }
        .industry-card:hover { border-color: #ccc; box-shadow: 0 4px 32px rgba(0,0,0,0.06); }
        .industry-card:hover::after { transform: scaleX(1); }
        .industry-tag { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; color: #aaa; padding: 4px 10px; border: 1px solid #E2E0DC; border-radius: 100px; }

        .process-step { padding: 48px 36px 48px 0; border-right: 1px solid #E2E0DC; }
        .process-step:last-child { border-right: none; padding-right: 0; }
        .process-step:not(:first-child) { padding-left: 36px; }

        .trusted-by-item { font-family: 'JetBrains Mono', monospace; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; color: #0A0A0A; font-weight: 500; padding: 20px 32px; border-right: 1px solid #E2E0DC; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
        .trusted-by-item:hover { background: #F5F4F1; }
        .trusted-by-item:last-child { border-right: none; }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .problem-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .stats-grid-inner { grid-template-columns: repeat(2, 1fr) !important; }
          .stat-item:nth-child(2) { border-right: none; }
          .stat-item:nth-child(3) { border-top: 1px solid #1E1E1E; }
          .stat-item { padding: 32px 24px; }
          .industries-header { grid-template-columns: 1fr !important; gap: 24px !important; }
          .industries-sub { justify-self: start !important; }
          .industries-grid { grid-template-columns: 1fr !important; }
          .process-steps { grid-template-columns: 1fr !important; }
          .process-step { padding: 36px 0 !important; border-right: none !important; border-bottom: 1px solid #E2E0DC; }
          .process-step:last-child { border-bottom: none; }
          .process-cta { flex-direction: column !important; align-items: flex-start !important; gap: 24px !important; }
          .panel-padding { padding: 80px 24px !important; }
          .cs-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .cs-slide { padding: 36px 24px !important; }
          .team-grid { grid-template-columns: 1fr !important; }
          .team-header { grid-template-columns: 1fr !important; gap: 32px !important; }
          .cs-nav { display: none !important; }
          .trusted-by-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .trusted-by-item { border-bottom: 1px solid #E2E0DC; }
          .team-photo-content { left: 24px !important; right: 24px !important; bottom: 32px !important; }
          .team-photo-wrap { height: 400px !important; }
        }
      `}</style>

      {/* ── PANEL 2: THE PROBLEM ── */}
      <section className="panel-padding" style={{background: 'white', padding: '120px 48px', borderTop: '1px solid #E2E0DC'}}>
        <div style={{maxWidth: 1120, margin: '0 auto'}}>
          <div className="problem-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center'}}>
            <div>
              <div className="section-label reveal">The problem</div>
              <h2 className="reveal" style={{fontSize: 'clamp(36px, 4.5vw, 58px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, color: '#0A0A0A', marginBottom: 32}}>
                Your tools weren't<br />built for this.
              </h2>
              <div className="reveal">
                <p style={{fontSize: 17, fontWeight: 300, lineHeight: 1.75, color: '#666', marginBottom: 16}}>Spreadsheets held together with formulas. Tools that don't talk to each other. Reporting that takes days. Timelines nobody trusts.</p>
                <p style={{fontSize: 17, fontWeight: 300, lineHeight: 1.75, color: '#666', marginBottom: 16}}>The creative industries move fast. <strong style={{color: '#0A0A0A', fontWeight: 600}}>Most operational systems don't.</strong></p>
                <p style={{fontSize: 17, fontWeight: 300, lineHeight: 1.75, color: '#666'}}>We fix that.</p>
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
        </div>
      </section>

      {/* ── TRUSTED BY ── */}
      <section style={{background: 'white', borderTop: '1px solid #E2E0DC', borderBottom: '1px solid #E2E0DC'}}>
        <div style={{maxWidth: 1120, margin: '0 auto'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'stretch'}}>
            <div style={{padding: '20px 32px', borderRight: '1px solid #E2E0DC', display: 'flex', alignItems: 'center'}}>
              <span style={{fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#aaa', whiteSpace: 'nowrap' as const}}>Trusted by</span>
            </div>
            <div className="trusted-by-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)'}}>
              {['Netflix', 'Paramount', 'Disney', 'ABC', 'Discovery'].map(name => (
                <div key={name} className="trusted-by-item">{name}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PANEL 3: STATS ── */}
      <section className="panel-padding" style={{background: '#0A0A0A', padding: '120px 48px'}}>
        <div style={{maxWidth: 1120, margin: '0 auto'}}>
          <div className="section-label section-label-dark reveal">By the numbers</div>
          <h2 className="reveal" style={{fontSize: 'clamp(36px, 4.5vw, 58px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'white', marginBottom: 80, lineHeight: 1.0}}>
            The numbers<br />that matter.
          </h2>
          <div ref={statsRef} className="stats-grid-inner" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid #1E1E1E', borderRadius: 4, overflow: 'hidden'}}>
            <div className="stat-item reveal">
              <span id="stat-1" style={{fontSize: 56, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: '#FF5C00', display: 'block', marginBottom: 12}}>200+</span>
              <span style={{fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#888', lineHeight: 1.6}}>enterprise<br />implementations</span>
            </div>
            <div className="stat-item reveal reveal-d1">
              <span id="stat-2" style={{fontSize: 56, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: '#FF5C00', display: 'block', marginBottom: 12}}>$300M+</span>
              <span style={{fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#888', lineHeight: 1.6}}>in partnership<br />revenue ops</span>
            </div>
            <div className="stat-item reveal reveal-d2">
              <span style={{fontSize: 56, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: '#FF5C00', display: 'block', marginBottom: 12}}>#1</span>
              <span style={{fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#888', lineHeight: 1.6}}>rated Airtable<br />partner in APAC</span>
            </div>
            <div className="stat-item reveal reveal-d3">
              <span style={{fontSize: 56, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: '#FF5C00', display: 'block', marginBottom: 12}}>Top 5</span>
              <span style={{fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#888', lineHeight: 1.6}}>Airtable partners<br />worldwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PANEL 4: INDUSTRIES ── */}
      <section className="panel-padding" style={{background: '#F5F4F1', padding: '120px 48px'}}>
        <div style={{maxWidth: 1120, margin: '0 auto'}}>
          <div className="industries-header" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'end', marginBottom: 64}}>
            <div>
              <div className="section-label reveal">Industries</div>
              <h2 className="reveal" style={{fontSize: 'clamp(36px, 4.5vw, 58px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, color: '#0A0A0A'}}>
                We work where<br />complexity lives.
              </h2>
            </div>
            <p className="industries-sub reveal" style={{fontSize: 16, fontWeight: 300, lineHeight: 1.7, color: '#666', maxWidth: 380, justifySelf: 'end' as const, alignSelf: 'end' as const}}>
              The most demanding creative organisations in the world trust Nifty because we understand their business — not just their software.
            </p>
          </div>
          <div className="industries-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2}}>
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
      <section className="panel-padding" style={{background: 'white', padding: '120px 48px', borderTop: '1px solid #E2E0DC'}}>
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
          <div className="process-steps" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid #E2E0DC'}}>
            {[
              {num: '01', title: 'A call with one of our founders.', body: 'We understand your situation and tell you honestly whether we can help — and what that looks like.'},
              {num: '02', title: 'A proposal that week.', body: 'Clear scope, clear plan. No surprises.'},
              {num: '03', title: 'Working software, every check-in.', body: 'We build live. You see real progress every session. A production-ready system in 4 to 8 weeks.'},
              {num: '04', title: 'We stick around.', body: 'Your business evolves — your systems should too. We\'re there for the roadmap and the surprises.'},
            ].map((step, i) => (
              <div key={i} className={`process-step reveal reveal-d${i}`}>
                <div style={{width: 44, height: 44, borderRadius: '50%', background: '#FF5C00', color: 'white', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28}}>{step.num}</div>
                <div style={{fontSize: 17, fontWeight: 600, letterSpacing: '-0.02em', color: '#0A0A0A', marginBottom: 12, lineHeight: 1.3}}>{step.title}</div>
                <div style={{fontSize: 14, fontWeight: 300, lineHeight: 1.75, color: '#666'}}>{step.body}</div>
              </div>
            ))}
          </div>
          <div className="process-cta reveal" style={{marginTop: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: '#0A0A0A'}}>Ready to get started?</div>
            <button style={{background: '#FF5C00', color: 'white', fontSize: 14, fontWeight: 600, padding: '14px 32px', borderRadius: 100, border: 'none', cursor: 'pointer'}}>Book a Call →</button>
          </div>
        </div>
      </section>
      {/* ── PANEL 6: CASE STUDIES ── */}
      <section className="panel-padding" style={{background: '#0A0A0A', padding: '120px 48px'}}>
        <div style={{maxWidth: 1120, margin: '0 auto'}}>
          <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 64}}>
            <div>
              <div className="section-label section-label-dark reveal">Selected work</div>
              <h2 className="reveal" style={{fontSize: 'clamp(36px, 4.5vw, 58px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'white', lineHeight: 1.0}}>
                Work that ships.<br />Results that stick.
              </h2>
            </div>
            <div className="cs-nav reveal" style={{display: 'flex', gap: 12}}>
              <button style={{width: 44, height: 44, borderRadius: '50%', border: '1px solid #2A2A2A', background: 'none', color: '#666', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s, color 0.2s'}}
                onClick={() => {
                  const current = parseInt(document.getElementById('cs-track')?.dataset.current || '0')
                  const next = (current - 1 + 3) % 3
                  const track = document.getElementById('cs-track')
                  if (track) { track.dataset.current = String(next); track.style.transform = `translateX(-${next * 100}%)` }
                }}>←</button>
              <button style={{width: 44, height: 44, borderRadius: '50%', border: '1px solid #2A2A2A', background: 'none', color: '#666', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s, color 0.2s'}}
                onClick={() => {
                  const current = parseInt(document.getElementById('cs-track')?.dataset.current || '0')
                  const next = (current + 1) % 3
                  const track = document.getElementById('cs-track')
                  if (track) { track.dataset.current = String(next); track.style.transform = `translateX(-${next * 100}%)` }
                }}>→</button>
            </div>
          </div>

          <div style={{overflow: 'hidden', borderRadius: 4}}>
            <div id="cs-track" data-current="0" style={{display: 'flex', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'}}>
              {[
                {label: 'Global Streaming Platform — Partnership Operations', stat: '$300M+', statLabel: 'in partnership revenue operations', body: 'A global streaming leader needed to connect opportunity development, campaign execution, and creative collaboration across regions — for 200+ users, in one platform.', detail: 'We built it in six weeks.', industry: 'Streaming & Digital Media'},
                {label: 'National Broadcaster — Campaign Operations', stat: '15→1', statLabel: 'spreadsheets replaced with one source of truth', body: 'A national broadcaster was running campaign management across 15 separate spreadsheets. Brief-to-execution workflows were broken. Deadlines were missed.', detail: '100 people. One platform. Built in four weeks.', industry: 'Broadcast'},
                {label: 'Major Film Studio — Production Tracking', stat: '200+', statLabel: 'productions tracked across global markets', body: 'A major film studio needed real-time visibility across content, legal, and finance for productions spanning multiple markets and time zones.', detail: 'External partner portals. Live dashboards. Delivered on time.', industry: 'Film, TV & Production'},
              ].map((cs, i) => (
                <div key={i} className="cs-slide" style={{minWidth: '100%', padding: '64px', background: '#111', border: '1px solid #1A1A1A', borderRadius: 4}}>
                  <div className="cs-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center'}}>
                    <div>
                      <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#FF5C00', marginBottom: 32}}>{cs.label}</div>
                      <div style={{fontSize: 'clamp(56px, 7vw, 96px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: 'white', marginBottom: 12}}>{cs.stat}</div>
                      <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#777', marginBottom: 48}}>{cs.statLabel}</div>
                      <a href="#" style={{display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 500, color: '#FF5C00', textDecoration: 'none'}}>Read the full story →</a>
                    </div>
                    <div>
                      <p style={{fontSize: 16, fontWeight: 300, lineHeight: 1.75, color: '#999', marginBottom: 24}}>{cs.body}</p>
                      <p style={{fontSize: 17, fontWeight: 600, lineHeight: 1.75, color: 'white', marginBottom: 32}}>{cs.detail}</p>
                      <div style={{display: 'inline-block', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#555', padding: '6px 14px', border: '1px solid #222', borderRadius: 100}}>{cs.industry}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal" style={{display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32}}>
            {[0,1,2].map(i => (
              <div key={i} onClick={() => {
                const track = document.getElementById('cs-track')
                if (track) { track.dataset.current = String(i); track.style.transform = `translateX(-${i * 100}%)` }
              }} style={{width: i === 0 ? 24 : 8, height: 8, borderRadius: 100, background: i === 0 ? '#FF5C00' : '#2A2A2A', cursor: 'pointer', transition: 'all 0.3s'}} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PANEL 7: TEAM ── */}
      <section style={{background: '#F5F4F1'}}>
        <div style={{position: 'relative', width: '100%', height: 560, overflow: 'hidden'}}>
          <img
            src="/team-photo.jpg"
            alt="The Nifty team"
            style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', filter: 'brightness(0.55)'}}
          />
          <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.2) 60%, rgba(10,10,10,0.05) 100%)'}} />
          <div className="team-photo-content reveal" style={{position: 'absolute', bottom: 56, left: 64, right: 64}}>
            <div className="section-label" style={{marginBottom: 20}}>The team</div>
            <h2 style={{fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, color: 'white'}}>
              One team. Genuinely<br />invested in your problem.
            </h2>
          </div>
        </div>

        <div className="team-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginTop: 2}}>
          {[
            {name: 'Nathan Coffey', role: 'Co-Founder', bio: 'The product mind behind every build. 500+ Airtable implementations. If there\'s a smarter way to architect something, Nathan finds it.', tag: 'Product & Architecture', initials: 'NC'},
            {name: 'Andrew Akib', role: 'Co-Founder', bio: 'Transformation background from Accenture and Deloitte, with deep roots in media, entertainment, and music. Andrew is why our solutions actually get adopted.', tag: 'Strategy & Delivery', initials: 'AA'},
          ].map((founder, i) => (
            <div key={i} className={`reveal reveal-d${i}`} style={{background: 'white', padding: '48px 40px', border: '1px solid #E2E0DC'}}>
              <div style={{width: 56, height: 56, borderRadius: '50%', background: '#F0EDE8', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700, color: '#FF5C00'}}>
                {founder.initials}
              </div>
              <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: '#FF5C00', marginBottom: 8}}>{founder.role}</div>
              <div style={{fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#0A0A0A', marginBottom: 16}}>{founder.name}</div>
              <p style={{fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: '#666', marginBottom: 24}}>{founder.bio}</p>
              <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#aaa', padding: '5px 12px', border: '1px solid #E2E0DC', borderRadius: 100, display: 'inline-block'}}>{founder.tag}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PANEL 8: FINAL CTA ── */}
      <section className="panel-padding" style={{background: '#0A0A0A', padding: '120px 48px'}}>
        <div style={{maxWidth: 720, margin: '0 auto', textAlign: 'center' as const}}>
          <div className="section-label reveal" style={{justifyContent: 'center', marginBottom: 40}}>Get in touch</div>
          <h2 className="reveal" style={{fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, color: 'white', marginBottom: 32}}>
            Let's build something<br />that <span style={{color: '#FF5C00'}}>actually works.</span>
          </h2>
          <p className="reveal" style={{fontSize: 17, fontWeight: 300, lineHeight: 1.75, color: '#999', marginBottom: 48, maxWidth: 520, margin: '0 auto 48px'}}>
            Book 45 minutes with one of our founders. We'll understand your situation, tell you what's possible, and give you a clear next step — whether or not we end up working together.
          </p>
          <div className="reveal" style={{display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' as const}}>
            <button style={{background: '#FF5C00', color: 'white', fontSize: 14, fontWeight: 600, padding: '16px 36px', borderRadius: 100, border: 'none', cursor: 'pointer'}}>Book a Call →</button>
            <a href="mailto:hello@niftysolutions.com.au" style={{fontSize: 14, color: '#555', textDecoration: 'none', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.04em'}}>
              hello@niftysolutions.com.au
            </a>
          </div>
        </div>
      </section>
    </>
  )
}