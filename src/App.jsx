import React, { useState, useEffect, useRef } from 'react';

// Load fonts
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=Inter:wght@400;500;600;700&display=swap';
fontLink.rel = 'stylesheet';
if (!document.querySelector(`link[href*="Cinzel"]`)) document.head.appendChild(fontLink);

// SEO: Add structured data and Open Graph tags
const initSEO = () => {
  // Structured Data - Organization
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Forgelight Labs",
    "url": "https://forgelightlabs.com",
    "logo": "https://forgelightlabs.com/logo.png",
    "description": "AI-powered revenue infrastructure for teams who want systems, not services.",
    "email": "hello@forgelightlabs.com",
    "sameAs": [
      "https://linkedin.com/company/forgelightlabs",
      "https://x.com/forgelightlabs"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "email": "hello@forgelightlabs.com",
      "url": "https://forgelightlabs.com/contact"
    }
  };

  // Structured Data - Services
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Forgelight Labs Services",
    "itemListElement": [
      {
        "@type": "Service",
        "position": 1,
        "name": "AI Sales Desk",
        "description": "AI-powered phone system that answers calls 24/7, qualifies leads, and books appointments automatically."
      },
      {
        "@type": "Service",
        "position": 2,
        "name": "Outbound Engine",
        "description": "Automated prospecting and outreach system that fills your pipeline with qualified meetings."
      },
      {
        "@type": "Service",
        "position": 3,
        "name": "Referral Engine",
        "description": "Automated partner nurturing and referral generation for relationship-driven businesses."
      },
      {
        "@type": "Service",
        "position": 4,
        "name": "Broker OS",
        "description": "Deal flow management system for business brokers to organize opportunities and close more deals."
      },
      {
        "@type": "Service",
        "position": 5,
        "name": "Content Engine",
        "description": "Done-for-you content creation and publishing that builds authority and generates inbound leads."
      },
      {
        "@type": "Service",
        "position": 6,
        "name": "Website Design",
        "description": "Conversion-focused websites built to turn visitors into customers, live in 14-21 days."
      }
    ]
  };

  // Structured Data - FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does Forgelight Labs do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Forgelight Labs builds AI-powered revenue infrastructure for businesses. We create systems that automate lead capture, outreach, referrals, content creation, and more—so you can grow revenue without adding headcount."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to get started?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most systems go live in 7-21 days depending on complexity. Simple systems like AI Sales Desk can be live in a week, while more complex builds like Broker OS take 2-3 weeks."
        }
      },
      {
        "@type": "Question",
        "name": "How much does it cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pricing depends on which systems you need and the complexity of your setup. Most clients invest between $2,000-$10,000/month depending on scope. Book a call for a specific quote."
        }
      }
    ]
  };

  // Add structured data to head
  const addSchema = (schema, id) => {
    if (!document.getElementById(id)) {
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  };

  addSchema(orgSchema, 'org-schema');
  addSchema(servicesSchema, 'services-schema');
  addSchema(faqSchema, 'faq-schema');

  // Open Graph tags
  const ogTags = {
    'og:type': 'website',
    'og:site_name': 'Forgelight Labs',
    'og:title': 'Forgelight Labs | AI Revenue Infrastructure',
    'og:description': 'AI-powered revenue infrastructure for teams who want systems, not services. Book a call to see what\'s possible.',
    'og:image': 'https://forgelightlabs.com/og-image.png',
    'og:url': 'https://forgelightlabs.com',
    'twitter:card': 'summary_large_image',
    'twitter:site': '@forgelightlabs',
    'twitter:title': 'Forgelight Labs | AI Revenue Infrastructure',
    'twitter:description': 'AI-powered revenue infrastructure for teams who want systems, not services.',
    'twitter:image': 'https://forgelightlabs.com/og-image.png'
  };

  Object.entries(ogTags).forEach(([property, content]) => {
    const attr = property.startsWith('twitter:') ? 'name' : 'property';
    if (!document.querySelector(`meta[${attr}="${property}"]`)) {
      const meta = document.createElement('meta');
      meta.setAttribute(attr, property);
      meta.content = content;
      document.head.appendChild(meta);
    }
  });

  // Additional meta tags
  const metaTags = {
    'robots': 'index, follow',
    'author': 'Forgelight Labs',
    'keywords': 'AI automation, revenue infrastructure, AI sales, outbound automation, referral engine, business automation, AI phone system'
  };

  Object.entries(metaTags).forEach(([name, content]) => {
    if (!document.querySelector(`meta[name="${name}"]`)) {
      const meta = document.createElement('meta');
      meta.name = name;
      meta.content = content;
      document.head.appendChild(meta);
    }
  });
};

// Initialize SEO on load
if (typeof document !== 'undefined') {
  initSEO();
}

const c = { bg:'#09090B', bgCard:'#111113', text:'#FAFAFA', textSecondary:'#A1A1AA', textTertiary:'#52525B', accent:'#64748B', accentSubtle:'rgba(100,116,139,0.1)', border:'rgba(255,255,255,0.06)', borderHover:'rgba(255,255,255,0.1)', warm:'#E8E4DD' };

// Shared drawing utilities for consistent visual language
const drawNode = (ctx, x, y, radius, opacity = 1, pulse = 0) => {
  const pulseScale = 1 + pulse * 0.3;
  const pulseOpacity = opacity * (1 + pulse * 0.5);
  ctx.beginPath(); ctx.arc(x, y, radius * 4 * pulseScale, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(100,116,139,${0.1 * pulseOpacity})`; ctx.fill();
  ctx.beginPath(); ctx.arc(x, y, radius * 2 * pulseScale, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(100,116,139,${0.2 * pulseOpacity})`; ctx.fill();
  ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(232,228,221,${0.6 * pulseOpacity})`; ctx.fill();
};

const drawLine = (ctx, x1, y1, x2, y2, progress) => {
  const x = x1 + (x2 - x1) * progress, y = y1 + (y2 - y1) * progress;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x, y);
  ctx.strokeStyle = `rgba(100,116,139,${0.3 * progress})`; ctx.lineWidth = 1; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x, y);
  ctx.strokeStyle = `rgba(100,116,139,${0.1 * progress})`; ctx.lineWidth = 4; ctx.stroke();
  return { x, y };
};

const drawTravelingDot = (ctx, x, y, size = 2) => {
  ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(232,228,221,0.8)'; ctx.fill();
};

// Homepage Animation - Architectural network that compounds
const ArchitecturalLines = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const linesRef = useRef([]);
  const nodesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cx = canvas.width * 0.6, cy = canvas.height * 0.5;
      nodesRef.current = [
        {x:cx,y:cy,radius:5},{x:cx-120,y:cy-90,radius:4},{x:cx+130,y:cy-70,radius:4},{x:cx+100,y:cy+110,radius:4},{x:cx-140,y:cy+85,radius:4},
        {x:cx-260,y:cy-170,radius:3},{x:cx+30,y:cy-200,radius:3},{x:cx+260,y:cy-110,radius:3},{x:cx+290,y:cy+60,radius:3},{x:cx+170,y:cy+220,radius:3},
        {x:cx-60,y:cy+210,radius:3},{x:cx-260,y:cy+140,radius:3},{x:cx-290,y:cy-30,radius:3},{x:cx-380,y:cy-250,radius:2},{x:cx+140,y:cy-300,radius:2},
        {x:cx+380,y:cy-60,radius:2},{x:cx+340,y:cy+200,radius:2},{x:cx-80,y:cy+300,radius:2},{x:cx-360,y:cy+220,radius:2}
      ];
      linesRef.current = [
        {from:0,to:1,progress:0,speed:0.008,delay:0},{from:0,to:2,progress:0,speed:0.009,delay:200},{from:0,to:3,progress:0,speed:0.007,delay:400},{from:0,to:4,progress:0,speed:0.008,delay:600},
        {from:1,to:5,progress:0,speed:0.006,delay:800},{from:1,to:6,progress:0,speed:0.007,delay:900},{from:2,to:6,progress:0,speed:0.006,delay:1000},{from:2,to:7,progress:0,speed:0.008,delay:1100},
        {from:2,to:8,progress:0,speed:0.007,delay:1200},{from:3,to:8,progress:0,speed:0.006,delay:1300},{from:3,to:9,progress:0,speed:0.007,delay:1400},{from:3,to:10,progress:0,speed:0.008,delay:1500},
        {from:4,to:10,progress:0,speed:0.006,delay:1600},{from:4,to:11,progress:0,speed:0.007,delay:1700},{from:4,to:5,progress:0,speed:0.008,delay:1800},{from:1,to:12,progress:0,speed:0.006,delay:1900},
        {from:5,to:12,progress:0,speed:0.005,delay:2000},{from:5,to:13,progress:0,speed:0.006,delay:2100},{from:6,to:14,progress:0,speed:0.005,delay:2200},{from:7,to:15,progress:0,speed:0.006,delay:2300},
        {from:8,to:15,progress:0,speed:0.005,delay:2400},{from:8,to:16,progress:0,speed:0.006,delay:2500},{from:9,to:16,progress:0,speed:0.005,delay:2600},{from:10,to:17,progress:0,speed:0.006,delay:2700},
        {from:11,to:18,progress:0,speed:0.005,delay:2800},{from:12,to:18,progress:0,speed:0.006,delay:2900}
      ];
    };
    resize();
    window.addEventListener('resize', resize);
    let startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      ctx.fillStyle = 'rgba(9,9,11,0.1)';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      const nodes = nodesRef.current, lines = linesRef.current;
      lines.forEach(line => {
        if (elapsed > line.delay) {
          line.progress = Math.min(1, line.progress + line.speed);
          const f = nodes[line.from], t = nodes[line.to];
          const pos = drawLine(ctx, f.x, f.y, t.x, t.y, line.progress);
          if (line.progress < 1) drawTravelingDot(ctx, pos.x, pos.y);
        }
      });
      nodes.forEach((node, i) => {
        const reached = lines.some(l => (l.to === i && l.progress > 0.9) || (l.from === i && l.progress > 0)) || i === 0;
        if (reached) drawNode(ctx, node.x, node.y, node.radius);
      });
      if (lines.every(l => l.progress >= 1) && elapsed > 7000) { startTime = Date.now(); lines.forEach(l => l.progress = 0); }
      animationRef.current = requestAnimationFrame(animate);
    };
    ctx.fillStyle = c.bg; ctx.fillRect(0,0,canvas.width,canvas.height); animate();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationRef.current); };
  }, []);

  return (<><canvas ref={canvasRef} style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none'}}/><div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:`radial-gradient(ellipse at 70% 50%, transparent 0%, ${c.bg} 70%)`,pointerEvents:'none'}}/></>);
};

// AI Sales Desk - Calls converging to center hub, then routing to calendar nodes
const SalesDeskAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cx = canvas.width * 0.6, cy = canvas.height * 0.5;

    const hub = { x: cx, y: cy, r: 6, pulse: 0 };
    const calendarNodes = [];
    for (let i = 0; i < 6; i++) {
      const angle = -Math.PI/3 + (i / 5) * (2 * Math.PI / 3);
      calendarNodes.push({ x: cx + Math.cos(angle) * 200, y: cy + Math.sin(angle) * 180, r: 3, filled: false, fillPulse: 0 });
    }
    
    const structureLines = calendarNodes.map((n, i) => ({ from: hub, to: n, progress: 0, speed: 0.012, delay: i * 150 }));
    
    let calls = [];
    let nextCallTime = 0;
    let nextSlot = 0;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      ctx.fillStyle = 'rgba(9,9,11,0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Decay pulses
      hub.pulse *= 0.95;
      calendarNodes.forEach(n => n.fillPulse *= 0.93);

      // Animate structure lines
      structureLines.forEach(line => {
        if (elapsed > line.delay && line.progress < 1) line.progress = Math.min(1, line.progress + line.speed);
        if (line.progress > 0) {
          const pos = drawLine(ctx, line.from.x, line.from.y, line.to.x, line.to.y, line.progress);
          if (line.progress < 1) drawTravelingDot(ctx, pos.x, pos.y);
        }
      });

      // Draw hub with pulse
      drawNode(ctx, hub.x, hub.y, hub.r, 1, hub.pulse);

      // Draw calendar nodes
      calendarNodes.forEach((node, i) => {
        if (structureLines[i].progress > 0.9) {
          const opacity = node.filled ? 1 : 0.5;
          drawNode(ctx, node.x, node.y, node.r, opacity, node.fillPulse);
        }
      });

      // Spawn new calls
      if (elapsed > nextCallTime && elapsed > 2000) {
        const sourceY = cy + (Math.random() - 0.5) * 300;
        calls.push({ phase: 'incoming', x: -50, y: sourceY, progress: 0, targetSlot: nextSlot % 6 });
        nextSlot++;
        nextCallTime = elapsed + 800 + Math.random() * 400;
      }

      // Update calls
      calls = calls.filter(call => {
        if (call.phase === 'incoming') {
          call.progress += 0.012;
          const x = call.x + (hub.x - call.x) * call.progress;
          const y = call.y + (hub.y - call.y) * call.progress;
          
          const trailStart = Math.max(0, call.progress - 0.15);
          ctx.beginPath();
          ctx.moveTo(call.x + (hub.x - call.x) * trailStart, call.y + (hub.y - call.y) * trailStart);
          ctx.lineTo(x, y);
          ctx.strokeStyle = 'rgba(100,116,139,0.4)';
          ctx.lineWidth = 2;
          ctx.stroke();
          drawTravelingDot(ctx, x, y, 3);

          if (call.progress >= 1) {
            hub.pulse = 1; // Pulse when call arrives
            call.phase = 'routing';
            call.progress = 0;
          }
        } else if (call.phase === 'routing') {
          call.progress += 0.015;
          const target = calendarNodes[call.targetSlot];
          const x = hub.x + (target.x - hub.x) * call.progress;
          const y = hub.y + (target.y - hub.y) * call.progress;
          drawTravelingDot(ctx, x, y, 3);

          if (call.progress >= 1) {
            calendarNodes[call.targetSlot].filled = true;
            calendarNodes[call.targetSlot].fillPulse = 1; // Pulse when booked
            return false;
          }
        }
        return true;
      });

      // Reset when all slots filled
      if (calendarNodes.every(n => n.filled) && calls.length === 0) {
        setTimeout(() => calendarNodes.forEach(n => n.filled = false), 2000);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    ctx.fillStyle = c.bg; ctx.fillRect(0,0,canvas.width,canvas.height);
    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (<><canvas ref={canvasRef} style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none'}}/><div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:`radial-gradient(ellipse at 60% 50%, transparent 0%, ${c.bg} 70%)`,pointerEvents:'none'}}/></>);
};

// Outbound Animation - Used for Content Engine: wave discovers symmetric arc, then continues finding scattered nodes while broadcasting
const OutboundAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cx = canvas.width * 0.68, cy = canvas.height * 0.5;

    // Central source - your content engine
    const source = { x: cx - 80, y: cy, r: 9, pulse: 0 };
    
    const audience = [];
    
    // First 9 nodes: symmetric arc at consistent distance (discovered by first wave)
    const arcCount = 9;
    const arcDist = 220;
    for (let i = 0; i < arcCount; i++) {
      const angle = -0.35 * Math.PI + (i / (arcCount - 1)) * 0.7 * Math.PI;
      audience.push({
        x: source.x + Math.cos(angle) * arcDist,
        y: cy + Math.sin(angle) * arcDist,
        r: 4.5,
        discovered: false,
        pulse: 0
      });
    }
    
    // Remaining 5 nodes: scattered further out (discovered one-by-one later)
    const scatteredCount = 5;
    for (let i = 0; i < scatteredCount; i++) {
      const angle = (Math.random() - 0.5) * Math.PI * 0.7;
      const dist = 300 + Math.random() * 100;
      audience.push({
        x: source.x + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        r: 4,
        discovered: false,
        pulse: 0
      });
    }
    
    const audienceCount = audience.length;

    // Animation state
    let waves = [];
    let broadcasts = [];
    let nextWaveTime = 600;
    let nextBroadcastTime = 0;
    let nextDiscoverTime = 0;
    let initialWavesDone = false;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      ctx.fillStyle = 'rgba(9,9,11,0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Decay pulses
      source.pulse *= 0.94;
      audience.forEach(p => p.pulse *= 0.92);

      const discoveredCount = audience.filter(p => p.discovered).length;
      const allDiscovered = discoveredCount === audienceCount;

      // Check if initial wave phase is done (arc nodes discovered)
      if (!initialWavesDone && discoveredCount >= arcCount) {
        initialWavesDone = true;
        nextBroadcastTime = elapsed + 300;
        nextDiscoverTime = elapsed + 800;
      }

      // Draw source node
      drawNode(ctx, source.x, source.y, source.r, 1, source.pulse);

      // Send out discovery wave (just one to hit the arc)
      if (!initialWavesDone && waves.length === 0 && elapsed > nextWaveTime) {
        waves.push({ radius: 0, opacity: 0.5 });
      }

      // Update and draw waves
      waves = waves.filter(wave => {
        wave.radius += 4;
        wave.opacity -= 0.003;
        
        if (wave.opacity > 0) {
          ctx.beginPath();
          ctx.arc(source.x, source.y, wave.radius, -Math.PI * 0.4, Math.PI * 0.4);
          ctx.strokeStyle = `rgba(100,116,139,${wave.opacity})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Check if wave reaches any undiscovered audience in the arc
          audience.slice(0, arcCount).forEach(p => {
            if (!p.discovered) {
              const dist = Math.sqrt((p.x - source.x) ** 2 + (p.y - source.y) ** 2);
              if (Math.abs(dist - wave.radius) < 20) {
                p.discovered = true;
                p.pulse = 1;
              }
            }
          });
        }
        return wave.opacity > 0;
      });

      // After initial wave: broadcast AND discover remaining scattered nodes
      if (initialWavesDone) {
        // Discover remaining scattered nodes one at a time
        if (!allDiscovered && elapsed > nextDiscoverTime) {
          const undiscovered = audience.filter(p => !p.discovered);
          if (undiscovered.length > 0) {
            const node = undiscovered[Math.floor(Math.random() * undiscovered.length)];
            node.discovered = true;
            node.pulse = 1;
            source.pulse = 0.6;
            nextDiscoverTime = elapsed + 800 + Math.random() * 600;
          }
        }

        // Broadcast to discovered nodes
        const discoveredNodes = audience.filter(p => p.discovered);
        if (discoveredNodes.length > 0 && elapsed > nextBroadcastTime) {
          const target = discoveredNodes[Math.floor(Math.random() * discoveredNodes.length)];
          const actualIdx = audience.indexOf(target);
          broadcasts.push({ targetIdx: actualIdx, progress: 0 });
          source.pulse = 0.4;
          nextBroadcastTime = elapsed + 350 + Math.random() * 250;
        }

        // Update broadcasts
        broadcasts = broadcasts.filter(b => {
          b.progress += 0.025;
          const target = audience[b.targetIdx];
          const x = source.x + (target.x - source.x) * b.progress;
          const y = source.y + (target.y - source.y) * b.progress;
          
          ctx.beginPath();
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(232,228,221,${0.8 * (1 - b.progress * 0.3)})`;
          ctx.fill();

          if (b.progress >= 1) {
            target.pulse = 0.8;
            return false;
          }
          return true;
        });
      }

      // Draw connection lines from source to discovered audience
      audience.forEach(p => {
        if (p.discovered) {
          ctx.beginPath();
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = 'rgba(100,116,139,0.2)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      // Draw audience nodes
      audience.forEach(p => {
        if (p.discovered) {
          drawNode(ctx, p.x, p.y, p.r, 1, p.pulse);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(100,116,139,0.15)';
          ctx.fill();
        }
      });

      // Reset after all discovered and broadcast time
      if (allDiscovered && elapsed > 10000) {
        startTime = Date.now();
        audience.forEach(p => p.discovered = false);
        initialWavesDone = false;
        nextWaveTime = 600;
        waves = [];
        broadcasts = [];
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    ctx.fillStyle = c.bg; ctx.fillRect(0,0,canvas.width,canvas.height);
    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (<><canvas ref={canvasRef} style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none'}}/><div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:`radial-gradient(ellipse at 68% 50%, transparent 0%, ${c.bg} 70%)`,pointerEvents:'none'}}/></>);
};

// Referral Engine - Network that grows outward then pulses from center
const ReferralAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cx = canvas.width * 0.6, cy = canvas.height * 0.5;

    const nodes = [{ x: cx, y: cy, r: 6, wave: 0 }];
    const lines = [];

    // Wave 1
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
      nodes.push({ x: cx + Math.cos(angle) * 120, y: cy + Math.sin(angle) * 120, r: 4, wave: 1, parent: 0 });
      lines.push({ from: 0, to: nodes.length - 1, progress: 0, speed: 0.01, delay: i * 150 });
    }

    // Wave 2
    const wave1Count = 5;
    for (let i = 0; i < wave1Count; i++) {
      const parentNode = nodes[i + 1];
      const baseAngle = Math.atan2(parentNode.y - cy, parentNode.x - cx);
      for (let j = 0; j < 2; j++) {
        const angle = baseAngle + (j - 0.5) * 0.7;
        nodes.push({ x: parentNode.x + Math.cos(angle) * 90, y: parentNode.y + Math.sin(angle) * 90, r: 3, wave: 2, parent: i + 1 });
        lines.push({ from: i + 1, to: nodes.length - 1, progress: 0, speed: 0.01, delay: 800 + i * 100 + j * 50 });
      }
    }

    // Wave 3
    const wave2Start = wave1Count + 1;
    const wave2Count = wave1Count * 2;
    for (let i = 0; i < wave2Count; i++) {
      const parentNode = nodes[wave2Start + i];
      const baseAngle = Math.atan2(parentNode.y - cy, parentNode.x - cx);
      nodes.push({ x: parentNode.x + Math.cos(baseAngle) * 70, y: parentNode.y + Math.sin(baseAngle) * 70, r: 2, wave: 3, parent: wave2Start + i });
      lines.push({ from: wave2Start + i, to: nodes.length - 1, progress: 0, speed: 0.01, delay: 1800 + i * 80 });
    }

    let startTime = Date.now();
    let pulsePhase = 0;
    let networkComplete = false;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      ctx.fillStyle = 'rgba(9,9,11,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Check if network is complete
      networkComplete = lines.every(l => l.progress >= 1);
      if (networkComplete) pulsePhase += 0.03;

      // Draw lines
      lines.forEach(line => {
        if (elapsed > line.delay) {
          line.progress = Math.min(1, line.progress + line.speed);
          const from = nodes[line.from], to = nodes[line.to];
          const pos = drawLine(ctx, from.x, from.y, to.x, to.y, line.progress);
          if (line.progress < 1) drawTravelingDot(ctx, pos.x, pos.y);
        }
      });

      // Draw nodes - center pulses when complete
      nodes.forEach((node, i) => {
        if (i === 0) {
          const pulse = networkComplete ? Math.sin(pulsePhase) * 0.5 + 0.5 : 0;
          drawNode(ctx, node.x, node.y, node.r, 1, pulse);
          
          // Draw expanding pulse rings from center when complete
          if (networkComplete) {
            const ringPhase = (pulsePhase % (Math.PI * 2)) / (Math.PI * 2);
            for (let ring = 0; ring < 3; ring++) {
              const ringProgress = (ringPhase + ring * 0.33) % 1;
              const ringRadius = ringProgress * 350;
              const ringOpacity = (1 - ringProgress) * 0.15;
              ctx.beginPath();
              ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(100,116,139,${ringOpacity})`;
              ctx.lineWidth = 2;
              ctx.stroke();
            }
          }
        } else {
          const incomingLine = lines.find(l => l.to === i);
          if (incomingLine && incomingLine.progress > 0.9) {
            drawNode(ctx, node.x, node.y, node.r);
          }
        }
      });

      // Reset
      if (networkComplete && elapsed > 8000) {
        startTime = Date.now();
        lines.forEach(l => l.progress = 0);
        pulsePhase = 0;
        networkComplete = false;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    ctx.fillStyle = c.bg; ctx.fillRect(0,0,canvas.width,canvas.height);
    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (<><canvas ref={canvasRef} style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none'}}/><div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:`radial-gradient(ellipse at 60% 50%, transparent 0%, ${c.bg} 70%)`,pointerEvents:'none'}}/></>);
};

// Call Network Animation - Publishers generating calls that flow through network to buyers
const CallNetworkAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cx = canvas.width * 0.62, cy = canvas.height * 0.5;

    // Central routing hub (Forgelight)
    const hub = { x: cx, y: cy, r: 14, pulse: 0 };

    // Publishers (left side) - call sources
    const publishers = [];
    for (let i = 0; i < 5; i++) {
      const angle = Math.PI * 0.7 + (i / 4) * Math.PI * 0.6;
      const dist = 240 + Math.random() * 50;
      publishers.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        r: 7,
        pulse: 0,
        active: true
      });
    }

    // Buyers (right side) - call destinations
    const buyers = [];
    for (let i = 0; i < 5; i++) {
      const angle = -Math.PI * 0.3 + (i / 4) * Math.PI * 0.6;
      const dist = 240 + Math.random() * 50;
      buyers.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        r: 7,
        pulse: 0,
        active: true,
        callsReceived: 0
      });
    }

    // Structure lines
    const structureLines = [
      ...publishers.map((p, i) => ({ from: p, to: hub, progress: 0, speed: 0.015, delay: i * 150 })),
      ...buyers.map((b, i) => ({ from: hub, to: b, progress: 0, speed: 0.015, delay: 800 + i * 150 }))
    ];

    // Active calls flowing through the network
    let calls = [];
    let nextCallTime = 2500;
    let startTime = Date.now();

    // Draw a small call dot with green glow
    const drawCallDot = (ctx, x, y, size) => {
      ctx.beginPath();
      ctx.arc(x, y, size * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(34, 197, 94, 0.9)';
      ctx.fill();
    };

    const animate = () => {
      const elapsed = Date.now() - startTime;
      ctx.fillStyle = 'rgba(9,9,11,0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Decay pulses
      hub.pulse *= 0.93;
      publishers.forEach(p => p.pulse *= 0.92);
      buyers.forEach(b => b.pulse *= 0.92);

      // Draw structure lines
      structureLines.forEach(line => {
        if (elapsed > line.delay && line.progress < 1) {
          line.progress = Math.min(1, line.progress + line.speed);
        }
        if (line.progress > 0) {
          const pos = drawLine(ctx, line.from.x, line.from.y, line.to.x, line.to.y, line.progress);
          if (line.progress < 1) drawTravelingDot(ctx, pos.x, pos.y);
        }
      });

      // Draw nodes
      drawNode(ctx, hub.x, hub.y, hub.r, 1, hub.pulse);
      publishers.forEach(p => drawNode(ctx, p.x, p.y, p.r, 0.8, p.pulse));
      buyers.forEach(b => drawNode(ctx, b.x, b.y, b.r, 0.8, b.pulse));

      // Spawn new calls
      const structureReady = structureLines.every(l => l.progress >= 1);
      if (structureReady && elapsed > nextCallTime) {
        const pubIdx = Math.floor(Math.random() * publishers.length);
        const buyerIdx = Math.floor(Math.random() * buyers.length);
        calls.push({
          phase: 'toHub',
          pubIdx,
          buyerIdx,
          progress: 0
        });
        publishers[pubIdx].pulse = 1;
        nextCallTime = elapsed + 800 + Math.random() * 600;
      }

      // Animate calls
      calls = calls.filter(call => {
        const pub = publishers[call.pubIdx];
        const buyer = buyers[call.buyerIdx];

        if (call.phase === 'toHub') {
          call.progress += 0.025;
          const x = pub.x + (hub.x - pub.x) * call.progress;
          const y = pub.y + (hub.y - pub.y) * call.progress;
          drawCallDot(ctx, x, y, 3);

          if (call.progress >= 1) {
            hub.pulse = 1;
            call.phase = 'toBuyer';
            call.progress = 0;
          }
        } else if (call.phase === 'toBuyer') {
          call.progress += 0.025;
          const x = hub.x + (buyer.x - hub.x) * call.progress;
          const y = hub.y + (buyer.y - hub.y) * call.progress;
          drawCallDot(ctx, x, y, 3);

          if (call.progress >= 1) {
            buyer.pulse = 1;
            buyer.callsReceived++;
            return false;
          }
        }
        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    ctx.fillStyle = c.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none'}}/>
      <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:`radial-gradient(ellipse at 62% 50%, transparent 0%, ${c.bg} 70%)`,pointerEvents:'none'}}/>
    </>
  );
};

// Broker OS - Two sides (buyers/sellers) with deals connecting through central hub
const BrokerAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cx = canvas.width * 0.68, cy = canvas.height * 0.5;

    // Central deal desk hub
    const hub = { x: cx, y: cy, r: 9, pulse: 0 };

    // Left side: Sellers/Opportunities
    const sellers = [];
    for (let i = 0; i < 4; i++) {
      const y = cy - 120 + i * 80;
      sellers.push({ x: cx - 200, y, r: 5, active: false, pulse: 0 });
    }

    // Right side: Buyers/Demand
    const buyers = [];
    for (let i = 0; i < 4; i++) {
      const y = cy - 120 + i * 80;
      buyers.push({ x: cx + 200, y, r: 5, active: false, pulse: 0 });
    }

    // Structure lines from hub to both sides
    const structureLines = [
      ...sellers.map((s, i) => ({ from: hub, to: s, progress: 0, speed: 0.012, delay: i * 100 })),
      ...buyers.map((b, i) => ({ from: hub, to: b, progress: 0, speed: 0.012, delay: 500 + i * 100 }))
    ];

    // Active deals - connections being made
    let deals = [];
    let nextDealTime = 2000;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      ctx.fillStyle = 'rgba(9,9,11,0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Decay pulses
      hub.pulse *= 0.94;
      sellers.forEach(s => s.pulse *= 0.93);
      buyers.forEach(b => b.pulse *= 0.93);

      // Animate structure lines
      structureLines.forEach(line => {
        if (elapsed > line.delay && line.progress < 1) line.progress = Math.min(1, line.progress + line.speed);
        if (line.progress > 0) {
          const pos = drawLine(ctx, line.from.x, line.from.y, line.to.x, line.to.y, line.progress);
          if (line.progress < 1) drawTravelingDot(ctx, pos.x, pos.y);
        }
      });

      // Draw hub
      drawNode(ctx, hub.x, hub.y, hub.r, 1, hub.pulse);

      // Draw seller nodes (left)
      sellers.forEach((seller, i) => {
        if (structureLines[i].progress > 0.9) {
          drawNode(ctx, seller.x, seller.y, seller.r, seller.active ? 1 : 0.5, seller.pulse);
        }
      });

      // Draw buyer nodes (right)
      buyers.forEach((buyer, i) => {
        if (structureLines[sellers.length + i].progress > 0.9) {
          drawNode(ctx, buyer.x, buyer.y, buyer.r, buyer.active ? 1 : 0.5, buyer.pulse);
        }
      });

      // Spawn new deals
      const structureReady = structureLines.every(l => l.progress >= 1);
      if (structureReady && elapsed > nextDealTime) {
        const sellerIdx = Math.floor(Math.random() * sellers.length);
        const buyerIdx = Math.floor(Math.random() * buyers.length);
        deals.push({ 
          phase: 'sellerToHub', 
          sellerIdx, 
          buyerIdx, 
          progress: 0 
        });
        sellers[sellerIdx].active = true;
        sellers[sellerIdx].pulse = 0.8;
        nextDealTime = elapsed + 1500;
      }

      // Update deals
      deals = deals.filter(deal => {
        const seller = sellers[deal.sellerIdx];
        const buyer = buyers[deal.buyerIdx];

        if (deal.phase === 'sellerToHub') {
          deal.progress += 0.02;
          const x = seller.x + (hub.x - seller.x) * deal.progress;
          const y = seller.y + (hub.y - seller.y) * deal.progress;
          drawTravelingDot(ctx, x, y, 3);

          if (deal.progress >= 1) {
            hub.pulse = 1;
            deal.phase = 'hubToBuyer';
            deal.progress = 0;
            buyers[deal.buyerIdx].active = true;
            buyers[deal.buyerIdx].pulse = 0.8;
          }
        } else if (deal.phase === 'hubToBuyer') {
          deal.progress += 0.02;
          const x = hub.x + (buyer.x - hub.x) * deal.progress;
          const y = hub.y + (buyer.y - hub.y) * deal.progress;
          drawTravelingDot(ctx, x, y, 3);

          if (deal.progress >= 1) {
            buyer.pulse = 1;
            deal.phase = 'matched';
            deal.progress = 0;
            deal.holdTime = elapsed;
          }
        } else if (deal.phase === 'matched') {
          // Show the match briefly
          ctx.beginPath();
          ctx.moveTo(seller.x, seller.y);
          ctx.quadraticCurveTo(hub.x, hub.y, buyer.x, buyer.y);
          ctx.strokeStyle = 'rgba(232,228,221,0.3)';
          ctx.lineWidth = 1;
          ctx.stroke();

          if (elapsed - deal.holdTime > 800) {
            seller.active = false;
            buyer.active = false;
            return false;
          }
        }
        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    ctx.fillStyle = c.bg; ctx.fillRect(0,0,canvas.width,canvas.height);
    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (<><canvas ref={canvasRef} style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none'}}/><div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:`radial-gradient(ellipse at 68% 50%, transparent 0%, ${c.bg} 70%)`,pointerEvents:'none'}}/></>);
};

// Content Engine - Content flowing through approval with pulse effects
const ContentAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cx = canvas.width * 0.58, cy = canvas.height * 0.5;

    const contentSlots = [
      { x: cx - 250, y: cy - 100, r: 5 },
      { x: cx - 250, y: cy, r: 5 },
      { x: cx - 250, y: cy + 100, r: 5 },
    ];
    const approvalHub = { x: cx, y: cy, r: 8, pulse: 0 };
    const distributionNodes = [
      { x: cx + 220, y: cy - 120, r: 4.5, pulse: 0 },
      { x: cx + 270, y: cy, r: 4.5, pulse: 0 },
      { x: cx + 220, y: cy + 120, r: 4.5, pulse: 0 },
    ];

    const structureLines = [
      ...contentSlots.map((slot, i) => ({ from: slot, to: approvalHub, progress: 0, speed: 0.012, delay: i * 200 })),
      ...distributionNodes.map((node, i) => ({ from: approvalHub, to: node, progress: 0, speed: 0.012, delay: 800 + i * 200 }))
    ];

    let contentPieces = [];
    let nextContentTime = 2000;
    let contentIndex = 0;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      ctx.fillStyle = 'rgba(9,9,11,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Decay pulses
      approvalHub.pulse *= 0.93;
      distributionNodes.forEach(n => n.pulse *= 0.93);

      // Animate structure lines
      structureLines.forEach(line => {
        if (elapsed > line.delay && line.progress < 1) line.progress = Math.min(1, line.progress + line.speed);
        if (line.progress > 0) {
          const pos = drawLine(ctx, line.from.x, line.from.y, line.to.x, line.to.y, line.progress);
          if (line.progress < 1) drawTravelingDot(ctx, pos.x, pos.y);
        }
      });

      // Draw nodes
      contentSlots.forEach((slot, i) => {
        if (structureLines[i].progress > 0) drawNode(ctx, slot.x, slot.y, slot.r);
      });
      if (structureLines[0].progress > 0.9) drawNode(ctx, approvalHub.x, approvalHub.y, approvalHub.r, 1, approvalHub.pulse);
      distributionNodes.forEach((node, i) => {
        if (structureLines[3 + i].progress > 0.9) drawNode(ctx, node.x, node.y, node.r, 1, node.pulse);
      });

      // Spawn content pieces
      if (elapsed > nextContentTime && structureLines.every(l => l.progress >= 1)) {
        const slotIndex = contentIndex % 3;
        contentPieces.push({ phase: 'toApproval', slotIndex, progress: 0, targetDist: contentIndex % 3 });
        contentIndex++;
        nextContentTime = elapsed + 1200;
      }

      // Update content pieces
      contentPieces = contentPieces.filter(piece => {
        if (piece.phase === 'toApproval') {
          piece.progress += 0.015;
          const slot = contentSlots[piece.slotIndex];
          const x = slot.x + (approvalHub.x - slot.x) * piece.progress;
          const y = slot.y + (approvalHub.y - slot.y) * piece.progress;
          
          ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(232,228,221,0.8)'; ctx.fill();

          if (piece.progress >= 1) {
            approvalHub.pulse = 1; // Pulse on approval
            piece.phase = 'toDistribution';
            piece.progress = 0;
          }
        } else if (piece.phase === 'toDistribution') {
          piece.progress += 0.015;
          const target = distributionNodes[piece.targetDist];
          const x = approvalHub.x + (target.x - approvalHub.x) * piece.progress;
          const y = approvalHub.y + (target.y - approvalHub.y) * piece.progress;
          
          ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(232,228,221,0.9)'; ctx.fill();

          if (piece.progress >= 1) {
            distributionNodes[piece.targetDist].pulse = 1; // Pulse on distribution
            return false;
          }
        }
        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    ctx.fillStyle = c.bg; ctx.fillRect(0,0,canvas.width,canvas.height);
    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (<><canvas ref={canvasRef} style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none'}}/><div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:`radial-gradient(ellipse at 55% 50%, transparent 0%, ${c.bg} 70%)`,pointerEvents:'none'}}/></>);
};

// Back-Office Animation - Interlocking gears processing data
const BackOfficeAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cx = canvas.width * 0.6, cy = canvas.height * 0.5;

    const gears = [
      { x: cx - 60, y: cy - 20, r: 40, teeth: 10, speed: 0.008, angle: 0 },
      { x: cx + 30, y: cy + 25, r: 30, teeth: 8, speed: -0.0107, angle: 0 },
      { x: cx + 95, y: cy - 10, r: 25, teeth: 7, speed: 0.0128, angle: 0 },
    ];

    // Data particles flowing through
    let particles = [];
    let lastSpawn = 0;

    const drawGear = (x, y, r, teeth, angle, alpha) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      for (let i = 0; i < teeth; i++) {
        const a1 = (i / teeth) * Math.PI * 2;
        const a2 = ((i + 0.3) / teeth) * Math.PI * 2;
        const a3 = ((i + 0.5) / teeth) * Math.PI * 2;
        const a4 = ((i + 0.8) / teeth) * Math.PI * 2;
        const inner = r * 0.75;
        const outer = r;
        if (i === 0) ctx.moveTo(Math.cos(a1) * inner, Math.sin(a1) * inner);
        else ctx.lineTo(Math.cos(a1) * inner, Math.sin(a1) * inner);
        ctx.lineTo(Math.cos(a2) * outer, Math.sin(a2) * outer);
        ctx.lineTo(Math.cos(a3) * outer, Math.sin(a3) * outer);
        ctx.lineTo(Math.cos(a4) * inner, Math.sin(a4) * inner);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(100,116,139,${0.3 * alpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      // Center circle
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.25, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(100,116,139,${0.4 * alpha})`;
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(9,9,11,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Rotate gears
      gears.forEach(g => {
        g.angle += g.speed;
        drawGear(g.x, g.y, g.r, g.teeth, g.angle, 1);
      });

      // Spawn particles from left
      const now = Date.now();
      if (now - lastSpawn > 600) {
        particles.push({ x: cx - 180, y: cy + (Math.random() - 0.5) * 60, life: 1, speed: 1 + Math.random() });
        lastSpawn = now;
      }

      // Update particles
      particles = particles.filter(p => {
        p.x += p.speed;
        // Speed up through gears
        if (p.x > cx - 80 && p.x < cx + 120) p.speed = 2 + Math.random();
        if (p.x > cx + 120) p.life -= 0.02;

        if (p.life > 0 && p.x < cx + 250) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2 * p.life, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(232,228,221,${p.life * 0.6})`;
          ctx.fill();
          return true;
        }
        return false;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    ctx.fillStyle = c.bg; ctx.fillRect(0,0,canvas.width,canvas.height);
    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (<><canvas ref={canvasRef} style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none'}}/><div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:`radial-gradient(ellipse at 60% 50%, transparent 0%, ${c.bg} 70%)`,pointerEvents:'none'}}/></>);
};

// Website Design Animation - Blueprint building into a live site
const WebsiteAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cx = canvas.width * 0.6, cy = canvas.height * 0.5;

    // Website frame
    const frame = { x: cx - 120, y: cy - 80, w: 240, h: 160, progress: 0 };
    
    // Content blocks that build in
    const blocks = [
      { x: cx - 100, y: cy - 60, w: 80, h: 12, delay: 1000, progress: 0 }, // header
      { x: cx - 100, y: cy - 40, w: 200, h: 40, delay: 1400, progress: 0 }, // hero
      { x: cx - 100, y: cy + 10, w: 60, h: 50, delay: 1800, progress: 0 }, // card 1
      { x: cx - 30, y: cy + 10, w: 60, h: 50, delay: 2000, progress: 0 }, // card 2
      { x: cx + 40, y: cy + 10, w: 60, h: 50, delay: 2200, progress: 0 }, // card 3
    ];

    // Conversion sparks
    let sparks = [];
    let nextSparkTime = 3500;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      ctx.fillStyle = 'rgba(9,9,11,0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw frame building
      if (frame.progress < 1) frame.progress = Math.min(1, frame.progress + 0.015);
      
      ctx.strokeStyle = `rgba(100,116,139,${0.3 * frame.progress})`;
      ctx.lineWidth = 2;
      ctx.strokeRect(frame.x, frame.y, frame.w * frame.progress, frame.h);

      // Draw blocks building in
      blocks.forEach(block => {
        if (elapsed > block.delay && block.progress < 1) {
          block.progress = Math.min(1, block.progress + 0.025);
        }
        if (block.progress > 0) {
          ctx.fillStyle = `rgba(100,116,139,${0.15 * block.progress})`;
          ctx.fillRect(block.x, block.y, block.w * block.progress, block.h);
          ctx.strokeStyle = `rgba(100,116,139,${0.3 * block.progress})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(block.x, block.y, block.w * block.progress, block.h);
        }
      });

      // Spawn conversion sparks from completed site
      if (elapsed > nextSparkTime && blocks.every(b => b.progress >= 1)) {
        const startX = cx + 120;
        const startY = cy + (Math.random() - 0.5) * 100;
        sparks.push({ x: startX, y: startY, vx: 2 + Math.random() * 2, vy: (Math.random() - 0.5) * 2, life: 1 });
        nextSparkTime = elapsed + 400 + Math.random() * 300;
      }

      // Update and draw sparks
      sparks = sparks.filter(spark => {
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.life -= 0.015;
        
        if (spark.life > 0) {
          ctx.beginPath();
          ctx.arc(spark.x, spark.y, 3 * spark.life, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(232,228,221,${spark.life * 0.8})`;
          ctx.fill();
          return true;
        }
        return false;
      });

      // Reset cycle
      if (elapsed > 8000) {
        startTime = Date.now();
        frame.progress = 0;
        blocks.forEach(b => b.progress = 0);
        sparks = [];
        nextSparkTime = 3500;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    ctx.fillStyle = c.bg; ctx.fillRect(0,0,canvas.width,canvas.height);
    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (<><canvas ref={canvasRef} style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none'}}/><div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:`radial-gradient(ellipse at 60% 50%, transparent 0%, ${c.bg} 70%)`,pointerEvents:'none'}}/></>);
};

// Web Development Animation - Code lines + SEO network graph
const WebDevAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cx = canvas.width * 0.55, cy = canvas.height * 0.5;

    // Code lines that type in
    const lines = [];
    const lineCount = 12;
    for (let i = 0; i < lineCount; i++) {
      const indent = i === 0 || i === lineCount - 1 ? 0 : (i <= 2 || i >= lineCount - 2) ? 1 : 2;
      lines.push({
        x: cx - 110 + indent * 14,
        y: cy - 70 + i * 12,
        w: 40 + Math.random() * 80,
        progress: 0,
        delay: i * 200,
      });
    }

    // SEO network nodes (right side)
    const nodes = [
      { x: cx + 80, y: cy - 40, r: 6, label: '' },
      { x: cx + 130, y: cy - 60, r: 4, label: '' },
      { x: cx + 150, y: cy - 20, r: 5, label: '' },
      { x: cx + 110, y: cy + 10, r: 4, label: '' },
      { x: cx + 160, y: cy + 30, r: 5, label: '' },
      { x: cx + 100, y: cy + 50, r: 4, label: '' },
      { x: cx + 180, y: cy - 40, r: 3, label: '' },
      { x: cx + 190, y: cy + 10, r: 3, label: '' },
    ];

    const edges = [
      [0,1],[0,2],[0,3],[1,6],[2,4],[2,7],[3,5],[4,7],[3,4]
    ];

    let pulses = [];
    let startTime = Date.now();
    let nextPulse = 3000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      ctx.fillStyle = 'rgba(9,9,11,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw code editor frame
      const frameAlpha = Math.min(1, elapsed / 800);
      ctx.strokeStyle = `rgba(100,116,139,${0.25 * frameAlpha})`;
      ctx.lineWidth = 1;
      const rx = cx - 120, ry = cy - 80, rw = 160, rh = lineCount * 12 + 20;
      // Rounded rect
      const rad = 6;
      ctx.beginPath();
      ctx.moveTo(rx + rad, ry);
      ctx.lineTo(rx + rw - rad, ry);
      ctx.quadraticCurveTo(rx + rw, ry, rx + rw, ry + rad);
      ctx.lineTo(rx + rw, ry + rh - rad);
      ctx.quadraticCurveTo(rx + rw, ry + rh, rx + rw - rad, ry + rh);
      ctx.lineTo(rx + rad, ry + rh);
      ctx.quadraticCurveTo(rx, ry + rh, rx, ry + rh - rad);
      ctx.lineTo(rx, ry + rad);
      ctx.quadraticCurveTo(rx, ry, rx + rad, ry);
      ctx.closePath();
      ctx.stroke();

      // Title bar dots
      if (frameAlpha > 0.5) {
        [0,1,2].forEach((d,i) => {
          ctx.beginPath();
          ctx.arc(rx + 10 + i * 10, ry + 8, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100,116,139,${0.3 * frameAlpha})`;
          ctx.fill();
        });
        ctx.beginPath();
        ctx.moveTo(rx, ry + 16);
        ctx.lineTo(rx + rw, ry + 16);
        ctx.strokeStyle = `rgba(100,116,139,${0.15 * frameAlpha})`;
        ctx.stroke();
      }

      // Draw code lines typing in
      lines.forEach(line => {
        if (elapsed > line.delay && line.progress < 1) {
          line.progress = Math.min(1, line.progress + 0.03);
        }
        if (line.progress > 0) {
          ctx.fillStyle = `rgba(100,116,139,${0.25 * line.progress})`;
          // Rounded code line
          const lh = 4, lr = 2;
          const lw = line.w * line.progress;
          ctx.beginPath();
          ctx.moveTo(line.x + lr, line.y);
          ctx.lineTo(line.x + lw - lr, line.y);
          ctx.quadraticCurveTo(line.x + lw, line.y, line.x + lw, line.y + lr);
          ctx.lineTo(line.x + lw, line.y + lh - lr);
          ctx.quadraticCurveTo(line.x + lw, line.y + lh, line.x + lw - lr, line.y + lh);
          ctx.lineTo(line.x + lr, line.y + lh);
          ctx.quadraticCurveTo(line.x, line.y + lh, line.x, line.y + lh - lr);
          ctx.lineTo(line.x, line.y + lr);
          ctx.quadraticCurveTo(line.x, line.y, line.x + lr, line.y);
          ctx.closePath();
          ctx.fill();
        }
      });

      // Draw network edges
      const netAlpha = Math.min(1, Math.max(0, (elapsed - 2000) / 1000));
      if (netAlpha > 0) {
        edges.forEach(([a,b]) => {
          ctx.beginPath();
          ctx.moveTo(nodes[a].x, nodes[a].y);
          ctx.lineTo(nodes[b].x, nodes[b].y);
          ctx.strokeStyle = `rgba(100,116,139,${0.15 * netAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        // Draw nodes
        nodes.forEach((n, i) => {
          const nodeDelay = 2200 + i * 150;
          const nodeAlpha = Math.min(1, Math.max(0, (elapsed - nodeDelay) / 400));
          if (nodeAlpha > 0) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r * nodeAlpha, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(232,228,221,${0.15 * nodeAlpha})`;
            ctx.fill();
            ctx.strokeStyle = `rgba(232,228,221,${0.3 * nodeAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      }

      // Pulses traveling along edges
      if (elapsed > nextPulse && netAlpha >= 1) {
        const edge = edges[Math.floor(Math.random() * edges.length)];
        pulses.push({ from: edge[0], to: edge[1], t: 0 });
        nextPulse = elapsed + 500 + Math.random() * 400;
      }

      pulses = pulses.filter(p => {
        p.t += 0.025;
        if (p.t <= 1) {
          const a = nodes[p.from], b = nodes[p.to];
          const px = a.x + (b.x - a.x) * p.t;
          const py = a.y + (b.y - a.y) * p.t;
          ctx.beginPath();
          ctx.arc(px, py, 2.5 * (1 - p.t * 0.5), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(232,228,221,${(1 - p.t) * 0.7})`;
          ctx.fill();
          return true;
        }
        return false;
      });

      // Reset cycle
      if (elapsed > 9000) {
        startTime = Date.now();
        lines.forEach(l => l.progress = 0);
        pulses = [];
        nextPulse = 3000;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    ctx.fillStyle = c.bg; ctx.fillRect(0,0,canvas.width,canvas.height);
    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (<><canvas ref={canvasRef} style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none'}}/><div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:`radial-gradient(ellipse at 55% 50%, transparent 0%, ${c.bg} 70%)`,pointerEvents:'none'}}/></>);
};

// Animation selector
const LandingAnimation = ({ type }) => {
  switch(type) {
    case 'ai-front-desk': return <SalesDeskAnimation />;
    case 'ai-outbound': return <ContentAnimation />;
    case 'referral': return <ReferralAnimation />;
    case 'broker-os': return <BrokerAnimation />;
    case 'content-engine': return <OutboundAnimation />;
    case 'website-design': return <WebsiteAnimation />;
    case 'web-development': return <WebDevAnimation />;
    case 'back-office': return <BackOfficeAnimation />;
    default: return <SalesDeskAnimation />;
  }
};

const Btn = ({children,primary,onClick}) => <button onClick={onClick} style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:primary?'14px 28px':'14px 24px',background:primary?c.warm:'transparent',color:primary?c.bg:c.text,fontSize:'0.875rem',fontWeight:500,borderRadius:'100px',border:primary?'none':`1px solid ${c.border}`,cursor:'pointer'}}>{children}</button>;
const Arrow = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
const Chev = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>;

const PhoneIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const BrainIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>;
const CalIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const CheckIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const UsersIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>;
const MailIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const RefreshIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>;
const MsgIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>;
const UserPlusIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>;
const DollarIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const LayoutIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>;
const ActivityIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const BookIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
const GlobeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const PaletteIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/></svg>;
const RocketIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>;
const CodeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;

const Node = ({ icon, label, active }) => (
  <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',opacity:active?1:0.3,transform:active?'scale(1)':'scale(0.95)',transition:'all 0.4s ease',minWidth:'40px' }}>
    <div style={{ width:'32px',height:'32px',background:active?c.accentSubtle:c.bgCard,border:'1px solid '+(active?c.accent:c.border),borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center' }}>
      <span style={{color:active?c.accent:c.textTertiary,transform:'scale(0.85)'}}>{icon}</span>
    </div>
    <span style={{fontSize:'0.5rem',fontWeight:500,letterSpacing:'0.02em',color:active?c.textSecondary:c.textTertiary,textTransform:'uppercase'}}>{label}</span>
  </div>
);

const Line = ({ active }) => <div style={{width:'12px',height:'1px',background:c.border,position:'relative',margin:'0 1px'}}><div style={{position:'absolute',top:0,left:0,width:active?'100%':'0%',height:'100%',background:c.accent,transition:'width 0.3s ease'}}/></div>;

const Diagram = ({ nodes, hovered }) => {
  const [idx, setIdx] = useState(-1);
  useEffect(() => {
    if (hovered) { setIdx(0); const i = setInterval(() => setIdx(p => p >= nodes.length ? 0 : p + 1), 350); return () => clearInterval(i); }
    else setIdx(-1);
  }, [hovered, nodes.length]);
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'12px 8px',background:c.bg,borderRadius:'8px',border:'1px solid '+c.border,gap:'1px'}}>
      {nodes.map((n,i)=>(<React.Fragment key={i}><Node icon={n.icon} label={n.label} active={idx>=i}/>{i<nodes.length-1&&<Line active={idx>i}/>}</React.Fragment>))}
    </div>
  );
};

const Card = ({ children, onClick }) => {
  const [h, setH] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <div 
      onClick={onClick} 
      onMouseEnter={() => setH(true)} 
      onMouseLeave={() => setH(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onTouchCancel={() => setPressed(false)}
      style={{
        cursor:'pointer',
        transform: pressed ? 'scale(0.98)' : 'scale(1)',
        transition: 'transform 0.15s ease'
      }}
    >
      {typeof children === 'function' ? children(h || pressed) : children}
    </div>
  );
};

const systems = [
  {id:'ai-voice-agents',num:'01',title:'AI Voice Agents',desc:'24/7 call handling that qualifies, routes, and books—without hold music.',nodes:[{icon:<PhoneIcon/>,label:'Answer'},{icon:<BrainIcon/>,label:'Qualify'},{icon:<CalIcon/>,label:'Book'},{icon:<DollarIcon/>,label:'Revenue'}]},
  {id:'ai-front-desk',num:'02',title:'AI Front Desk',desc:'Automated reception that greets, answers FAQs, and books.',nodes:[{icon:<PhoneIcon/>,label:'Greet'},{icon:<MsgIcon/>,label:'Answer'},{icon:<CalIcon/>,label:'Schedule'},{icon:<DollarIcon/>,label:'Book'}]},
  {id:'database-reactivation',num:'03',title:'Database Reactivation',desc:'Turn dormant leads into booked appointments with multi-channel outreach.',nodes:[{icon:<UsersIcon/>,label:'Segment'},{icon:<MailIcon/>,label:'Reach'},{icon:<MsgIcon/>,label:'Engage'},{icon:<CalIcon/>,label:'Book'}]},
  {id:'ai-outbound',num:'04',title:'AI Outbound SDR',desc:'Automated prospecting that identifies, contacts, and qualifies leads.',nodes:[{icon:<UsersIcon/>,label:'Identify'},{icon:<MailIcon/>,label:'Engage'},{icon:<CalIcon/>,label:'Meet'},{icon:<DollarIcon/>,label:'Close'}]},
  {id:'referral',num:'05',title:'AI Referral Network',desc:'Systematized partner outreach that turns your network into revenue.',nodes:[{icon:<UsersIcon/>,label:'Find'},{icon:<MsgIcon/>,label:'Nurture'},{icon:<UserPlusIcon/>,label:'Partner'},{icon:<DollarIcon/>,label:'Earn'}]},
  {id:'community-systems',num:'06',title:'Community Systems',desc:'Infrastructure for masterminds and memberships.',nodes:[{icon:<UsersIcon/>,label:'Onboard'},{icon:<MsgIcon/>,label:'Engage'},{icon:<ActivityIcon/>,label:'Track'},{icon:<DollarIcon/>,label:'Monetize'}]},
  {id:'broker-os',num:'07',title:'Broker OS',desc:'Deal flow management for brokers and intermediaries.',nodes:[{icon:<UsersIcon/>,label:'Organize'},{icon:<ActivityIcon/>,label:'Execute'},{icon:<LayoutIcon/>,label:'Track'},{icon:<DollarIcon/>,label:'Scale'}]},
  {id:'ai-parts-counter',num:'08',title:'AI Parts Counter',desc:'Built for heavy-duty dealers. 24/7 parts lookup and order booking.',nodes:[{icon:<PhoneIcon/>,label:'Answer'},{icon:<BrainIcon/>,label:'Lookup'},{icon:<CheckIcon/>,label:'Confirm'},{icon:<DollarIcon/>,label:'Order'}]}
];

const Logo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="27" fill="none" stroke={c.warm} strokeWidth="3"/>
    {[...Array(8)].map((_, i) => {
      const angle = (i * 45 - 90) * Math.PI / 180;
      const x1 = 32 + Math.cos(angle) * 8;
      const y1 = 32 + Math.sin(angle) * 8;
      const mid1Angle = angle + 0.15;
      const xMid1 = 32 + Math.cos(mid1Angle) * 15;
      const yMid1 = 32 + Math.sin(mid1Angle) * 15;
      const mid2Angle = angle - 0.1;
      const xMid2 = 32 + Math.cos(mid2Angle) * 21;
      const yMid2 = 32 + Math.sin(mid2Angle) * 21;
      const x2 = 32 + Math.cos(angle) * 25;
      const y2 = 32 + Math.sin(angle) * 25;
      return <path key={i} d={`M${x1} ${y1} L${xMid1} ${yMid1} L${xMid2} ${yMid2} L${x2} ${y2}`} stroke={c.warm} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>;
    })}
    <circle cx="32" cy="32" r="5.5" fill={c.warm}/>
  </svg>
);

const MenuIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const CloseIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const LinkedInIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const XIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;

const Header = ({setPage}) => {
  const [drop,setDrop] = useState(false);
  const [mobileOpen,setMobileOpen] = useState(false);
  return (
    <>
      <header style={{position:'fixed',top:0,left:0,right:0,height:'72px',background:'rgba(9,9,11,0.85)',backdropFilter:'blur(20px)',borderBottom:'1px solid '+c.border,zIndex:1000}}>
        <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:'100%'}}>
          <button onClick={()=>setPage('home')} style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'12px'}}>
            <Logo size={36}/>
            <span style={{fontSize:'1.1rem',fontWeight:600,color:c.text,fontFamily:'"Cinzel", serif'}}>Forgelight Labs</span>
          </button>
          {/* Desktop nav */}
          <nav style={{display:'flex',alignItems:'center',gap:'32px'}} className="desktop-nav">
            <button onClick={()=>setPage('about')} style={{background:'none',border:'none',cursor:'pointer',fontSize:'0.8rem',color:c.textSecondary}}>About</button>
            <div style={{position:'relative',padding:'20px 0'}} onMouseEnter={()=>setDrop(true)} onMouseLeave={()=>setDrop(false)}>
              <button style={{display:'flex',alignItems:'center',gap:'6px',background:'none',border:'none',cursor:'pointer',fontSize:'0.8rem',color:c.textSecondary}}>Systems <Chev/></button>
              {drop&&<div style={{position:'absolute',top:'100%',left:'50%',transform:'translateX(-50%)',minWidth:'200px',background:'#1C1C1F',border:'1px solid '+c.border,borderRadius:'12px',padding:'6px',boxShadow:'0 10px 40px rgba(0,0,0,0.5)'}}>
                <button onClick={()=>{setPage('back-office');setDrop(false);}} style={{display:'block',width:'100%',textAlign:'left',padding:'10px 12px',background:'none',border:'none',cursor:'pointer',borderRadius:'8px',fontSize:'0.8rem',color:c.warm,fontWeight:500}}>Back-Office Automation</button>
                <div style={{height:'1px',background:c.border,margin:'6px 0'}}/>
                {systems.map(s=><button key={s.id} onClick={()=>{setPage(s.id);setDrop(false);}} style={{display:'block',width:'100%',textAlign:'left',padding:'10px 12px',background:'none',border:'none',cursor:'pointer',borderRadius:'8px',fontSize:'0.8rem',color:c.text}}>{s.title}</button>)}
              </div>}
            </div>
            <button onClick={()=>setPage('call-network')} style={{background:'none',border:'none',cursor:'pointer',fontSize:'0.8rem',color:c.textSecondary}}>Call Network</button>
            <button onClick={()=>setPage('web-development')} style={{background:'none',border:'none',cursor:'pointer',fontSize:'0.8rem',color:c.textSecondary}}>Web Development</button>
            <button onClick={()=>setPage('contact')} style={{background:'none',border:'none',cursor:'pointer',fontSize:'0.8rem',color:c.textSecondary}}>Contact</button>
            <a href="https://calendar.app.google/LUhpKq7nBNLpLiBWA" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}><Btn primary>Book a Call <Arrow/></Btn></a>
          </nav>
          {/* Mobile menu button */}
          <button onClick={()=>setMobileOpen(true)} style={{display:'none',background:'none',border:'none',cursor:'pointer',color:c.text}} className="mobile-menu-btn"><MenuIcon/></button>
        </div>
      </header>
      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(9,9,11,0.98)',zIndex:1001,display:'flex',flexDirection:'column'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'20px 24px',borderBottom:'1px solid '+c.border}}>
            <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
              <Logo size={36}/>
              <span style={{fontSize:'1.1rem',fontWeight:600,color:c.text,fontFamily:'"Cinzel", serif'}}>Forgelight Labs</span>
            </div>
            <button onClick={()=>setMobileOpen(false)} style={{background:'none',border:'none',cursor:'pointer',color:c.text}}><CloseIcon/></button>
          </div>
          <nav style={{flex:1,display:'flex',flexDirection:'column',padding:'24px'}}>
            <button onClick={()=>{setPage('home');setMobileOpen(false);}} style={{background:'none',border:'none',cursor:'pointer',fontSize:'1.25rem',color:c.text,padding:'16px 0',textAlign:'left',borderBottom:'1px solid '+c.border}}>Home</button>
            <button onClick={()=>{setPage('about');setMobileOpen(false);}} style={{background:'none',border:'none',cursor:'pointer',fontSize:'1.25rem',color:c.text,padding:'16px 0',textAlign:'left',borderBottom:'1px solid '+c.border}}>About</button>
            <button onClick={()=>{setPage('call-network');setMobileOpen(false);}} style={{background:'none',border:'none',cursor:'pointer',fontSize:'1.25rem',color:c.text,padding:'16px 0',textAlign:'left',borderBottom:'1px solid '+c.border}}>Call Network</button>
            <button onClick={()=>{setPage('web-development');setMobileOpen(false);}} style={{background:'none',border:'none',cursor:'pointer',fontSize:'1.25rem',color:c.text,padding:'16px 0',textAlign:'left',borderBottom:'1px solid '+c.border}}>Web Development</button>
            <button onClick={()=>{setPage('contact');setMobileOpen(false);}} style={{background:'none',border:'none',cursor:'pointer',fontSize:'1.25rem',color:c.text,padding:'16px 0',textAlign:'left',borderBottom:'1px solid '+c.border}}>Contact</button>
            <div style={{padding:'16px 0',borderBottom:'1px solid '+c.border}}>
              <span style={{fontSize:'0.75rem',color:c.textTertiary,textTransform:'uppercase',letterSpacing:'0.1em'}}>Systems</span>
              <div style={{display:'flex',flexDirection:'column',marginTop:'12px',gap:'8px'}}>
                <button onClick={()=>{setPage('back-office');setMobileOpen(false);}} style={{background:'none',border:'none',cursor:'pointer',fontSize:'1rem',color:c.warm,padding:'8px 0',textAlign:'left',fontWeight:500}}>Back-Office Automation</button>
                {systems.map(s=><button key={s.id} onClick={()=>{setPage(s.id);setMobileOpen(false);}} style={{background:'none',border:'none',cursor:'pointer',fontSize:'1rem',color:c.textSecondary,padding:'8px 0',textAlign:'left'}}>{s.title}</button>)}
              </div>
            </div>
            <div style={{marginTop:'auto',paddingTop:'24px'}}>
              <a href="https://calendar.app.google/LUhpKq7nBNLpLiBWA" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none',display:'block'}}><Btn primary>Book a Call <Arrow/></Btn></a>
            </div>
          </nav>
        </div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
};

const Footer = ({setPage}) => (
  <footer style={{background:c.bg,borderTop:'1px solid '+c.border,padding:'60px 0 40px'}}>
    <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 24px'}}>
      <div className="footer-grid" style={{marginBottom:'40px'}}>
        {/* Brand */}
        <div>
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'16px'}}>
            <Logo size={32}/>
            <span style={{fontSize:'1rem',fontWeight:600,color:c.text,fontFamily:'"Cinzel", serif'}}>Forgelight Labs</span>
          </div>
          <p style={{fontSize:'0.85rem',color:c.textTertiary,lineHeight:1.6,maxWidth:'280px'}}>AI-powered revenue infrastructure for teams who want systems, not services.</p>
        </div>
        {/* Systems */}
        <div>
          <h4 style={{fontSize:'0.7rem',fontWeight:600,color:c.textSecondary,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'16px'}}>Systems</h4>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            <button onClick={()=>setPage('back-office')} style={{background:'none',border:'none',cursor:'pointer',fontSize:'0.8rem',color:c.warm,textAlign:'left',padding:0,fontWeight:500}}>Back-Office Automation</button>
            {systems.slice(0,4).map(s=><button key={s.id} onClick={()=>setPage(s.id)} style={{background:'none',border:'none',cursor:'pointer',fontSize:'0.8rem',color:c.textTertiary,textAlign:'left',padding:0}}>{s.title}</button>)}
          </div>
        </div>
        <div>
          <h4 style={{fontSize:'0.7rem',fontWeight:600,color:c.textSecondary,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'16px'}}>&nbsp;</h4>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {systems.slice(4,8).map(s=><button key={s.id} onClick={()=>setPage(s.id)} style={{background:'none',border:'none',cursor:'pointer',fontSize:'0.8rem',color:c.textTertiary,textAlign:'left',padding:0}}>{s.title}</button>)}
          </div>
        </div>
        {/* Contact */}
        <div>
          <h4 style={{fontSize:'0.7rem',fontWeight:600,color:c.textSecondary,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'16px'}}>Contact</h4>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            <a href="mailto:hello@forgelightlabs.com" style={{fontSize:'0.8rem',color:c.textTertiary,textDecoration:'none'}}>hello@forgelightlabs.com</a>
            <a href="https://calendar.app.google/LUhpKq7nBNLpLiBWA" target="_blank" rel="noopener noreferrer" style={{fontSize:'0.8rem',color:c.textTertiary,textDecoration:'none'}}>Book a Call</a>
            <button onClick={()=>setPage('about')} style={{background:'none',border:'none',cursor:'pointer',fontSize:'0.8rem',color:c.textTertiary,textAlign:'left',padding:0}}>About</button>
            <button onClick={()=>setPage('call-network')} style={{background:'none',border:'none',cursor:'pointer',fontSize:'0.8rem',color:c.textTertiary,textAlign:'left',padding:0}}>Call Network</button>
            <button onClick={()=>setPage('contact')} style={{background:'none',border:'none',cursor:'pointer',fontSize:'0.8rem',color:c.textTertiary,textAlign:'left',padding:0}}>Contact</button>
            <button onClick={()=>setPage('faq')} style={{background:'none',border:'none',cursor:'pointer',fontSize:'0.8rem',color:c.textTertiary,textAlign:'left',padding:0}}>FAQ</button>
            <button onClick={()=>setPage('blog')} style={{background:'none',border:'none',cursor:'pointer',fontSize:'0.8rem',color:c.textTertiary,textAlign:'left',padding:0}}>Blog</button>
            <button onClick={()=>setPage('privacy')} style={{background:'none',border:'none',cursor:'pointer',fontSize:'0.8rem',color:c.textTertiary,textAlign:'left',padding:0}}>Privacy Policy</button>
          </div>
        </div>
      </div>
      {/* Bottom bar */}
      <div style={{borderTop:'1px solid '+c.border,paddingTop:'24px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:'0.75rem',color:c.textTertiary}}>© 2025 Forgelight Labs. All rights reserved.</span>
        <div style={{display:'flex',gap:'16px'}}>
          <a href="https://linkedin.com/company/forgelightlabs" target="_blank" rel="noopener noreferrer" style={{color:c.textTertiary}}><LinkedInIcon/></a>
          <a href="https://x.com/forgelightlabs" target="_blank" rel="noopener noreferrer" style={{color:c.textTertiary}}><XIcon/></a>
        </div>
      </div>
    </div>
  </footer>
);

const Home = ({setPage}) => (
  <div style={{background:c.bg,minHeight:'100vh',color:c.text}}>
    <section style={{position:'relative',minHeight:'70vh',display:'flex',alignItems:'center',paddingTop:'60px'}}>
      <ArchitecturalLines/>
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:'30%',background:`linear-gradient(to top,${c.bg},transparent)`,pointerEvents:'none',zIndex:2}}/>
      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 20px',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'600px'}}>
          <p style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,marginBottom:'16px'}}>Enterprise AI Infrastructure</p>
          <h1 style={{fontSize:'clamp(2.5rem,6vw,4rem)',fontWeight:600,lineHeight:1.1,letterSpacing:'-0.03em',marginBottom:'24px'}}>Revenue Systems<br/>That Run While<br/>You Sleep</h1>
          <p style={{fontSize:'1rem',lineHeight:1.6,color:c.textSecondary,marginBottom:'16px',maxWidth:'480px'}}>We design, build, and deploy AI-powered infrastructure—voice agents, outbound engines, and database reactivation systems—that operate 24/7 and scale without headcount.</p>
          <p style={{fontSize:'0.95rem',fontWeight:500,color:c.accent,marginBottom:'32px'}}>Working demo in 72 hours. Full implementation in weeks.</p>
          <div style={{display:'flex',gap:'12px'}}><a href="https://calendar.app.google/LUhpKq7nBNLpLiBWA" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}><Btn primary>Book a Call <Arrow/></Btn></a><button onClick={()=>document.getElementById('systems')?.scrollIntoView({behavior:'smooth'})} style={{background:'none',border:'none',padding:0,cursor:'pointer'}}><Btn>How It Works</Btn></button></div>
        </div>
      </div>
    </section>
    
    {/* Scrolling Stats Ticker */}
    <section style={{borderTop:'1px solid '+c.border,borderBottom:'1px solid '+c.border,background:c.bgCard,overflow:'hidden',padding:'28px 0'}}>
      <div className="stats-ticker">
        <div className="stats-ticker-track">
          {[1,2,3].map(n => (
            <div key={n} className="stats-ticker-content">
              <span><strong style={{color:c.warm,fontWeight:700,fontSize:'1.5rem'}}>1,000+</strong> workflows automated</span>
              <span style={{color:c.textTertiary,margin:'0 40px'}}>•</span>
              <span><strong style={{color:c.warm,fontWeight:700,fontSize:'1.5rem'}}>50+</strong> businesses transformed</span>
              <span style={{color:c.textTertiary,margin:'0 40px'}}>•</span>
              <span><strong style={{color:c.warm,fontWeight:700,fontSize:'1.5rem'}}>10k+</strong> manual hours eliminated</span>
              <span style={{color:c.textTertiary,margin:'0 40px'}}>•</span>
              <span><strong style={{color:c.warm,fontWeight:700,fontSize:'1.5rem'}}>10+</strong> years operational experience</span>
              <span style={{color:c.textTertiary,margin:'0 40px'}}>•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
    
    {/* Industry Focus */}
    <section style={{padding:'24px 0',borderBottom:'1px solid '+c.border}}>
      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 20px',textAlign:'center'}}>
        <p style={{fontSize:'0.75rem',fontWeight:500,textTransform:'uppercase',letterSpacing:'0.12em',color:c.textTertiary,margin:0}}>Deep expertise in: <span style={{color:c.textSecondary}}>Heavy Truck & Equipment</span> · <span style={{color:c.textSecondary}}>HVAC & Plumbing</span> · <span style={{color:c.textSecondary}}>Industrial Supply</span> · <span style={{color:c.textSecondary}}>Service Businesses</span></p>
      </div>
    </section>
    
    {/* Back-Office Automations Section */}
    <section style={{padding:'80px 0',borderBottom:'1px solid '+c.border}}>
      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 20px'}}>
        <div style={{marginBottom:'32px',textAlign:'center'}}>
          <p style={{fontSize:'0.85rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.text,margin:'0 0 16px 0'}}>Cut Costs First?</p>
          <h2 style={{fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:600,letterSpacing:'-0.02em',lineHeight:1.2,margin:0}}>Optimize back office operations and cut spend.</h2>
        </div>
        <div className="backoffice-grid" style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:'12px',marginBottom:'32px',alignItems:'stretch'}}>
          {[
            {id:'billing-automation',icon:<DollarIcon/>,title:'Billing & Collections',desc:'Automated invoice follow-up'},
            {id:'quoting-automation',icon:<CheckIcon/>,title:'Quoting & Estimates',desc:'Quote generation + follow-up'},
            {id:'scheduling-automation',icon:<CalIcon/>,title:'Scheduling & Dispatch',desc:'Booking, reminders, routing'},
            {id:'customer-communications',icon:<MsgIcon/>,title:'Customer Comms',desc:'Updates, reminders, reviews'},
            {id:'lead-followup',icon:<MailIcon/>,title:'Follow-up & Nurture',desc:'Re-engage unconverted leads'},
            {id:'data-entry-automation',icon:<LayoutIcon/>,title:'Data Entry & Admin',desc:'Forms to CRM automation'}
          ].map((item,i)=>{
            const isWing = i === 0 || i === 5;
            return (
            <Card key={i} onClick={()=>setPage(item.id)}>{h=>(
              <div style={{background:c.bgCard,border:'1px solid '+(h?c.borderHover:c.border),borderRadius:'12px',padding:isWing?'20px 16px':'20px',textAlign:'center',cursor:'pointer',transition:'all 0.2s',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',marginTop:isWing?'8px':'0',marginBottom:isWing?'8px':'0'}}>
                <div style={{color:c.accent,marginBottom:'12px'}}>{item.icon}</div>
                <h4 style={{fontSize:'0.85rem',fontWeight:600,marginBottom:'6px'}}>{item.title}</h4>
                <p style={{fontSize:'0.7rem',color:c.textTertiary,lineHeight:1.4}}>{item.desc}</p>
              </div>
            )}</Card>
          )})}
        </div>
        <div style={{textAlign:'center'}}>
          <p style={{fontSize:'1.1rem',fontWeight:500,color:c.textSecondary,margin:'0 0 20px 0'}}>Eliminate waste. Recover revenue. Then scale.</p>
          <button onClick={()=>setPage('back-office')} style={{background:'none',border:'none',padding:0,cursor:'pointer'}}><Btn>See All Back-Office Solutions <Arrow/></Btn></button>
        </div>
      </div>
    </section>
    {/* Revenue Systems Section */}
    <section id="systems" style={{padding:'80px 0 100px'}}>
      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 20px'}}>
        <div style={{marginBottom:'32px',textAlign:'center'}}>
          <p style={{fontSize:'0.85rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.text,margin:'0 0 16px 0'}}>Ready to Scale?</p>
          <h2 style={{fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:600,letterSpacing:'-0.02em',lineHeight:1.2,margin:0}}>Eight systems. Revenue on autopilot.</h2>
        </div>
        <div className="systems-grid">
          {systems.slice(0,4).map(s=><Card key={s.id} onClick={()=>setPage(s.id)}>{h=><div className="system-card" style={{background:c.bgCard,border:'1px solid '+(h?c.borderHover:c.border),borderRadius:'14px',padding:'24px',transition:'all 0.2s',minHeight:'220px',display:'flex',flexDirection:'column'}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'16px'}}><span style={{fontSize:'0.65rem',color:c.textTertiary,fontWeight:500}}>{s.num}</span><div style={{color:c.textTertiary,transform:h?'translateX(2px)':'translateX(0)',transition:'transform 0.2s'}}><Arrow/></div></div><h3 style={{fontSize:'1.1rem',fontWeight:600,marginBottom:'6px'}}>{s.title}</h3><p style={{fontSize:'0.8rem',color:c.textSecondary,marginBottom:'20px',lineHeight:1.5,flex:1}}>{s.desc}</p><Diagram nodes={s.nodes} hovered={h}/></div>}</Card>)}
        </div>
        <div className="systems-grid" style={{marginTop:'16px'}}>
          {systems.slice(4,8).map(s=><Card key={s.id} onClick={()=>setPage(s.id)}>{h=><div className="system-card" style={{background:c.bgCard,border:'1px solid '+(h?c.borderHover:c.border),borderRadius:'14px',padding:'24px',transition:'all 0.2s',minHeight:'220px',display:'flex',flexDirection:'column'}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'16px'}}><span style={{fontSize:'0.65rem',color:c.textTertiary,fontWeight:500}}>{s.num}</span><div style={{color:c.textTertiary,transform:h?'translateX(2px)':'translateX(0)',transition:'transform 0.2s'}}><Arrow/></div></div><h3 style={{fontSize:'1.1rem',fontWeight:600,marginBottom:'6px'}}>{s.title}</h3><p style={{fontSize:'0.8rem',color:c.textSecondary,marginBottom:'20px',lineHeight:1.5,flex:1}}>{s.desc}</p><Diagram nodes={s.nodes} hovered={h}/></div>}</Card>)}
        </div>
      </div>
    </section>
    <section style={{padding:'60px 0',borderTop:'1px solid '+c.border,borderBottom:'1px solid '+c.border}}>
      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 20px'}}>
        <div className="animated-stats-grid">
          <div><div style={{fontSize:'clamp(1.25rem,3vw,1.75rem)',fontWeight:600,letterSpacing:'-0.02em',color:c.text,marginBottom:'4px'}}>More calls booked.</div><div style={{fontSize:'0.8rem',color:c.textTertiary}}>Pipeline that fills itself</div></div>
          <div><div style={{fontSize:'clamp(1.25rem,3vw,1.75rem)',fontWeight:600,letterSpacing:'-0.02em',color:c.text,marginBottom:'4px'}}>Zero missed leads.</div><div style={{fontSize:'0.8rem',color:c.textTertiary}}>Every opportunity captured</div></div>
          <div><div style={{fontSize:'clamp(1.25rem,3vw,1.75rem)',fontWeight:600,letterSpacing:'-0.02em',color:c.text,marginBottom:'4px'}}>Revenue 24/7.</div><div style={{fontSize:'0.8rem',color:c.textTertiary}}>Systems that never sleep</div></div>
        </div>
      </div>
    </section>
    {/* About Section */}
    <section style={{padding:'100px 0',borderTop:'1px solid '+c.border}}>
      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 20px'}}>
        <div className="about-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'80px',alignItems:'center'}}>
          <div>
            <p style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,marginBottom:'16px'}}>About</p>
            <h2 style={{fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:600,letterSpacing:'-0.02em',lineHeight:1.2,marginBottom:'24px'}}>Built by Operators,<br/>Not Just Technologists</h2>
            <p style={{fontSize:'0.95rem',color:c.textSecondary,marginBottom:'20px',lineHeight:1.7}}>Forgelight Labs was founded on a simple premise: AI systems should be built by people who've actually done the work they're automating.</p>
            <p style={{fontSize:'0.95rem',color:c.textSecondary,marginBottom:'20px',lineHeight:1.7}}>Our team brings 10+ years of frontline experience in heavy truck dealerships, parts operations, and industrial supply chains. We've managed the billing cycles, chased the invoices, scheduled the technicians, and worked the phones. We know how operational inefficiency bleeds margin—how a missed call at 4:47 PM turns into a $3,000 order for your competitor, while manual processes and reporting waste valuable time and misallocate labor.</p>
            <p style={{fontSize:'0.95rem',color:c.textSecondary,lineHeight:1.7}}>That operational background is why Forgelight exists. We don't build generic AI tools. We build systems that understand your actual workflow—back office and front office—because we've lived it.</p>
          </div>
          <div>
            <div style={{borderTop:'1px solid '+c.border,padding:'24px 0'}}><div style={{fontWeight:600,marginBottom:'6px'}}>Speed over perfection</div><div style={{fontSize:'0.9rem',color:c.textSecondary}}>Working demo in 72 hours, not a 6-week discovery phase.</div></div>
            <div style={{borderTop:'1px solid '+c.border,padding:'24px 0'}}><div style={{fontWeight:600,marginBottom:'6px'}}>Ownership over handoffs</div><div style={{fontSize:'0.9rem',color:c.textSecondary}}>Direct communication, not offshore ticket queues.</div></div>
            <div style={{borderTop:'1px solid '+c.border,borderBottom:'1px solid '+c.border,padding:'24px 0'}}><div style={{fontWeight:600,marginBottom:'6px'}}>Outcomes over hours</div><div style={{fontSize:'0.9rem',color:c.textSecondary}}>We measure success in revenue generated, not billable time.</div></div>
          </div>
        </div>
      </div>
    </section>
    <section style={{padding:'100px 0 120px'}}>
      <div style={{maxWidth:'700px',margin:'0 auto',padding:'0 20px',textAlign:'center'}}>
        <div style={{background:c.bgCard,border:'1px solid '+c.border,borderRadius:'16px',padding:'60px 40px'}}>
          <h2 style={{fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:600,letterSpacing:'-0.02em',marginBottom:'12px'}}>See what's possible.</h2>
          <p style={{fontSize:'0.95rem',color:c.textSecondary,marginBottom:'32px',lineHeight:1.6}}>20 minutes. We'll map your revenue gaps and show you how to close them.</p>
          <div style={{display:'flex',justifyContent:'center',gap:'12px'}}><a href="https://calendar.app.google/LUhpKq7nBNLpLiBWA" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}><Btn primary>Book a Call <Arrow/></Btn></a><a href="mailto:hello@forgelightlabs.com" style={{textDecoration:'none'}}><Btn>Email Us</Btn></a></div>
        </div>
      </div>
    </section>
    <Footer setPage={setPage}/>
  </div>
);

// Contact Form component
const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const subject = `Contact from ${form.name}${form.company ? ` at ${form.company}` : ''}`;
    const body = `Name: ${form.name}
Email: ${form.email}
Company: ${form.company || 'Not provided'}

Message:
${form.message}`;
    
    const mailtoLink = `mailto:hello@forgelightlabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'16px'}}>
      <div className="form-grid">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
          required
          style={{padding:'14px 16px',background:c.bgCard,border:'1px solid '+c.border,borderRadius:'10px',color:c.text,fontSize:'0.9rem',outline:'none'}}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
          required
          style={{padding:'14px 16px',background:c.bgCard,border:'1px solid '+c.border,borderRadius:'10px',color:c.text,fontSize:'0.9rem',outline:'none'}}
        />
      </div>
      <input
        type="text"
        placeholder="Company (optional)"
        value={form.company}
        onChange={(e) => setForm({...form, company: e.target.value})}
        style={{padding:'14px 16px',background:c.bgCard,border:'1px solid '+c.border,borderRadius:'10px',color:c.text,fontSize:'0.9rem',outline:'none'}}
      />
      <textarea
        placeholder="How can we help?"
        value={form.message}
        onChange={(e) => setForm({...form, message: e.target.value})}
        required
        rows={4}
        style={{padding:'14px 16px',background:c.bgCard,border:'1px solid '+c.border,borderRadius:'10px',color:c.text,fontSize:'0.9rem',outline:'none',resize:'vertical',fontFamily:'inherit'}}
      />
      <button
        type="submit"
        style={{padding:'14px 24px',background:c.warm,color:c.bg,border:'none',borderRadius:'10px',fontSize:'0.9rem',fontWeight:600,cursor:'pointer'}}
      >
        Send Message
      </button>
    </form>
  );
};

// Animated stat component with count-up effect
const AnimatedStat = ({ value, suffix, label, source, decimals = 1 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = performance.now();
          
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = easeOut * value;
            setCount(current);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated, value]);

  return (
    <div ref={ref} style={{textAlign:'center',padding:'32px 16px'}}>
      <div style={{
        fontSize:'clamp(2.5rem,6vw,4rem)',
        fontWeight:700,
        color:c.warm,
        letterSpacing:'-0.03em',
        lineHeight:1,
        marginBottom:'12px'
      }}>
        {count.toFixed(decimals)}{suffix}
      </div>
      <div style={{
        fontSize:'clamp(0.9rem,2vw,1.1rem)',
        color:c.text,
        fontWeight:500,
        marginBottom:'6px'
      }}>
        {label}
      </div>
      <div style={{
        fontSize:'0.75rem',
        color:c.textTertiary
      }}>
        {source}
      </div>
    </div>
  );
};

const Landing = ({id,setPage}) => {
  const sys = systems.find(s=>s.id===id);
  const content = {
    'ai-voice-agents':{
      sub:'Every call answered. Every opportunity captured.',
      desc:'AI voice agents that qualify leads, route calls, and book appointments—24/7, without hold music.',
      problems:["Missed calls are missed revenue.","You can't answer every call.","After-hours means lost opportunities.","Hold music kills conversions."],
      time:'7-14',
      without:["Missed calls, lost revenue","No coverage after hours","Leads go to voicemail and vanish"],
      with:["Every call answered instantly","24/7 qualification and booking","Revenue captured around the clock"]
    },
    'ai-front-desk':{
      sub:'Never miss a customer again.',
      desc:'Every call answered. Every appointment booked. Even nights, weekends, and holidays.',
      problems:["Missed calls are lost customers.","You can't answer and close at the same time.","After-hours means lost revenue.","Inconsistent service kills referrals."],
      time:'7-14',
      without:["Missed calls, lost leads","Manual follow-up","Revenue leaks everywhere"],
      with:["Every lead captured","Automated 24/7","Revenue on autopilot"]
    },
    'database-reactivation':{
      sub:'Wake your dead leads.',
      desc:'Turn dormant contacts into booked appointments with automated multi-channel outreach.',
      problems:["Your database is full of untapped revenue.","Old leads forget you exist.","Manual follow-up doesn't scale.","You're leaving money on the table."],
      time:'7-14',
      without:["Dead leads stay dead","No systematic reactivation","Revenue sitting in your CRM unused"],
      with:["Dormant leads re-engaged automatically","Multi-channel sequences that convert","Hidden revenue unlocked"]
    },
    'ai-outbound':{
      sub:'Pipeline that fills itself.',
      desc:'Wake up to meetings on your calendar. No cold calling. No manual follow-up. No burnout.',
      problems:["You can't find customers.","You can't reach customers.","Time spent prospecting is not revenue.","Prospects don't know you exist."],
      time:'10-14',
      without:["You're doing all the outreach","Prospects ghost or forget you","Pipeline depends on your effort"],
      with:["Outreach runs on autopilot","Sequences that book meetings","Calendar fills automatically"]
    },
    'referral':{
      sub:'Your referral network, on autopilot.',
      desc:'Find partners. Nurture relationships. Activate referrals. Built for realtors, MLOs, brokers, and relationship-driven businesses.',
      problems:["You're not asking for referrals.","Partners forget you exist.","You have no system to find new partners.","Your easiest revenue is going to competitors."],
      time:'10-14',
      without:["Partners forget you exist","No time to nurture relationships","Referrals happen by accident"],
      with:["System reaches out for you","Relationships nurtured automatically","Referrals flow predictably"]
    },
    'community-systems':{
      sub:'Infrastructure for communities that thrive.',
      desc:'Build, engage, and monetize your mastermind, membership, or professional network.',
      problems:["Members churn before they engage.","No system to track participation.","Monetization feels awkward.","Community management eats your time."],
      time:'14-21',
      without:["Members drift away silently","Engagement is manual and exhausting","Revenue potential unrealized"],
      with:["Automated onboarding and engagement","Participation tracked and rewarded","Monetization built into the system"]
    },
    'broker-os':{
      sub:'One place. Zero chaos.',
      desc:'Your whole operation in one system. No more hunting through 10 tools to find what you need.',
      problems:["Critical info is buried.","New hires take months to ramp.","Your team is disengaged.","Nobody knows the current process."],
      time:'14-21',
      without:["Struggling to find opportunities","Due diligence is scattered chaos","Buyers and sellers slip away"],
      with:["Opportunities surface automatically","Due diligence organized and tracked","More contracts, more revenue"]
    },
    'ai-parts-counter':{
      sub:'Parts lookup that never sleeps.',
      desc:'Built for heavy-duty dealers. 24/7 parts identification, pricing, and order booking.',
      problems:["After-hours calls go to voicemail.","Parts lookup takes too long.","Customers go to competitors.","Your counter staff is overwhelmed."],
      time:'14-21',
      without:["Lost orders after hours","Slow lookup frustrates customers","Revenue walks out the door"],
      with:["24/7 parts lookup and ordering","Instant identification and pricing","Capture every order, day or night"]
    },
    'content-engine':{
      sub:'Content that closes. Zero effort.',
      desc:'Fully produced content delivered to your inbox. You approve. We publish. You get clients.',
      problems:["You're invisible online.","Prospects don't trust you yet.","You have no time to create content.","Your competitors are showing up. You're not."],
      time:'10-14',
      without:["No time to create content","Invisible online, no authority","Competitors dominate the feed"],
      with:["Content delivered to your inbox","Consistent presence, growing trust","Inbound leads start flowing"]
    },
    'website-design':{
      sub:'Your digital foundation. Built to convert.',
      desc:'A website that works as hard as you do. Fast, modern, and designed to turn visitors into customers.',
      problems:["Your site looks outdated.","Visitors leave without taking action.","You're embarrassed to send people there.","Your competitors look more professional."],
      time:'14-21',
      without:["Missed calls, lost leads","Manual follow-up","Revenue leaks everywhere"],
      with:["Every lead captured","Automated 24/7","Revenue on autopilot"]
    }
  }[id];
  if(!sys||!content) return <div style={{background:c.bg,minHeight:'100vh',color:c.text,padding:'100px 20px',textAlign:'center'}}>Page not found</div>;

  return (
    <div style={{background:c.bg,minHeight:'100vh',color:c.text}}>
      <section style={{position:'relative',paddingTop:'120px',paddingBottom:'80px',minHeight:'70vh',display:'flex',alignItems:'center',overflow:'hidden'}}>
        <LandingAnimation type={id}/>
        <div style={{maxWidth:'700px',margin:'0 auto',padding:'0 20px',position:'relative',zIndex:1}}>
          <div style={{marginBottom:'20px',fontSize:'0.75rem',color:c.textTertiary}}>
            <button onClick={()=>setPage('home')} style={{background:'none',border:'none',cursor:'pointer',color:c.textTertiary}}>Home</button>
            <span style={{margin:'0 8px',opacity:0.5}}>/</span><span style={{color:c.textSecondary}}>{sys.title}</span>
          </div>
          <h1 style={{fontSize:'clamp(2rem,5vw,3.5rem)',fontWeight:600,lineHeight:1.1,letterSpacing:'-0.03em',marginBottom:'16px'}}>{content.sub}</h1>
          <p style={{fontSize:'1rem',lineHeight:1.6,color:c.textSecondary,marginBottom:'28px',maxWidth:'500px'}}>{content.desc}</p>
          <a href="https://calendar.app.google/LUhpKq7nBNLpLiBWA" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}><Btn primary>Book a Call <Arrow/></Btn></a>
        </div>
      </section>
      <section style={{padding:'60px 0',borderTop:'1px solid '+c.border}}>
        <div style={{maxWidth:'900px',margin:'0 auto',padding:'0 20px'}}>
          <div className="problem-grid">
            <div>
              <p style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:'0 0 16px 0'}}>The Problem</p>
              <h2 style={{fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:600,letterSpacing:'-0.02em',lineHeight:1.2,margin:0}}>What is costing you.</h2>
            </div>
            <div>
              {content.problems.map((p,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:'12px',padding:'14px 0',borderBottom:i<content.problems.length-1?'1px solid '+c.border:'none'}}>
                <div style={{width:'24px',height:'24px',background:'rgba(239,68,68,0.1)',borderRadius:'6px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                </div>
                <span style={{fontSize:'0.85rem',color:c.textSecondary}}>{p}</span>
              </div>)}
            </div>
          </div>
        </div>
      </section>
      <section style={{padding:'80px 0',borderTop:'1px solid '+c.border}}>
        <div style={{maxWidth:'900px',margin:'0 auto',padding:'0 20px'}}>
          <div style={{textAlign:'center',marginBottom:'48px'}}>
            <h2 style={{fontSize:'clamp(2rem,5vw,3rem)',fontWeight:600,letterSpacing:'-0.03em',margin:0,lineHeight:1.1,color:c.text}}>You book. We build. You profit.</h2>
          </div>
          
          {/* Before/After Visual */}
          <div className="before-after-grid" style={{marginBottom:'48px'}}>
            {/* Before */}
            <div style={{background:c.bgCard,border:'1px solid '+c.border,borderRadius:'16px',padding:'32px 24px'}}>
              <div style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:'#EF4444',marginBottom:'20px',display:'flex',alignItems:'center',gap:'8px'}}>
                <span style={{width:'8px',height:'8px',background:'#EF4444',borderRadius:'50%',opacity:0.5}}></span>
                Without a system
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                {content.without.map((item, i) => (
                  <div key={i} style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px',background:c.bg,borderRadius:'8px',border:'1px solid '+c.border}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                    <span style={{fontSize:'0.8rem',color:c.textSecondary}}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Arrow */}
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'8px'}}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={c.warm} strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            
            {/* After */}
            <div style={{background:c.bgCard,border:'1px solid '+c.border,borderRadius:'16px',padding:'32px 24px'}}>
              <div style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:'#22C55E',marginBottom:'20px',display:'flex',alignItems:'center',gap:'8px'}}>
                <span style={{width:'8px',height:'8px',background:'#22C55E',borderRadius:'50%'}}></span>
                With Forgelight
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                {content.with.map((item, i) => (
                  <div key={i} style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px',background:c.bg,borderRadius:'8px',border:'1px solid '+c.border}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <span style={{fontSize:'0.8rem',color:c.textSecondary}}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Animated stats row */}
          <div className="animated-stats-grid" style={{marginTop:'20px'}}>
            <AnimatedStat value={3.7} suffix="x" label="return per dollar" source="McKinsey" decimals={1} />
            <AnimatedStat value={15.8} suffix="%" label="revenue increase" source="Gartner" decimals={1} />
            <AnimatedStat value={15.2} suffix="%" label="cost savings" source="Gartner" decimals={1} />
          </div>
        </div>
        
        <style>{`
          @media (max-width: 768px) {
            .animated-stats-grid {
              grid-template-columns: 1fr !important;
              gap: 32px !important;
            }
            section > div > div[style*="grid-template-columns: 1fr auto 1fr"] {
              grid-template-columns: 1fr !important;
              gap: 16px !important;
            }
            section > div > div[style*="grid-template-columns: 1fr auto 1fr"] > div:nth-child(2) {
              transform: rotate(90deg);
              padding: 8px 0;
            }
          }
        `}</style>
      </section>
      
      {/* Database Reactivation Section - Only show for ai-front-desk */}
      {id === 'ai-front-desk' && (
        <section style={{padding:'60px 0 24px 0',borderTop:'1px solid '+c.border}}>
          <div style={{maxWidth:'700px',margin:'0 auto',padding:'0 20px'}}>
            <p style={{fontSize:'0.85rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:'0 0 12px 0'}}>Step 1</p>
            <h2 style={{fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:600,letterSpacing:'-0.02em',lineHeight:1.2,margin:'0 0 24px 0'}}>First, we turn your dead leads into booked appointments.</h2>
            <div style={{fontSize:'1rem',lineHeight:1.8}}>
              <p style={{margin:'0 0 16px 0',color:c.textSecondary}}>Past customers. Old quotes. Leads that went cold. We reactivate them—SMS, email, voice—and book the ones who are ready.</p>
              <p style={{margin:0,color:c.textSecondary}}>5x cheaper than new leads. 12x ROI in 90 days. No ad spend. Just money you already own.</p>
            </div>
          </div>
        </section>
      )}
      
      {/* Step 2 Bridge - Only show for ai-front-desk */}
      {id === 'ai-front-desk' && (
        <section style={{padding:'24px 0 60px 0'}}>
          <div style={{maxWidth:'700px',margin:'0 auto',padding:'0 20px'}}>
            <p style={{fontSize:'0.85rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:'0 0 12px 0'}}>Step 2</p>
            <h2 style={{fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:600,letterSpacing:'-0.02em',lineHeight:1.2,margin:'0 0 16px 0'}}>Your AI takes over.</h2>
            <p style={{fontSize:'1rem',lineHeight:1.8,color:c.textSecondary,margin:0}}>Every call. Every form. Every email. Answered instantly, 24/7.</p>
          </div>
        </section>
      )}
      
      {/* Industries Section - Only show for ai-front-desk */}
      {id === 'ai-front-desk' && (
        <section style={{padding:'60px 0',borderTop:'1px solid '+c.border}}>
          <div style={{maxWidth:'1000px',margin:'0 auto',padding:'0 20px'}}>
            <div style={{textAlign:'center',marginBottom:'40px'}}>
              <p style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:'0 0 16px 0'}}>Industries We Serve</p>
              <h2 style={{fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:600,letterSpacing:'-0.02em',margin:0}}>See how it works for your business</h2>
            </div>
            <div className="industries-grid">
              {[
                { id: 'ai-front-desk-roofing', name: 'Roofing', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
                { id: 'ai-front-desk-hvac', name: 'HVAC', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg> },
                { id: 'ai-front-desk-plumbing', name: 'Plumbing', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 12l-1.25-1.25a3.5 3.5 0 1 1 4.95-4.95L17 7.05l4.95-4.95L23 3.15 18.1 8.05l1.3 1.25a3.5 3.5 0 1 1-4.95 4.95L12 12z"/></svg> },
                { id: 'ai-front-desk-trucking', name: 'Parts Dealers', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
                { id: 'ai-front-desk-pest', name: 'Pest Control', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg> },
                { id: 'ai-front-desk-solar', name: 'Solar', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg> },
                { id: 'ai-front-desk-property', name: 'Property Mgmt', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/><path d="M1 21h22"/><path d="M9 7h1M9 11h1M9 15h1M14 7h1M14 11h1M14 15h1"/></svg> },
                { id: 'ai-front-desk-staffing', name: 'Staffing', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                { id: 'ai-front-desk-vet', name: 'Veterinary', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"/><path d="M14.5 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.344-2.5"/><path d="M8 14v.5M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306"/></svg> },
                { id: 'ai-front-desk-towing', name: 'Towing', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="5" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M7 17h8M5 15V9a2 2 0 0 1 2-2h4l3 3h3a2 2 0 0 1 2 2v3"/><path d="M3 17V9"/><path d="M21 12v5"/></svg> },
                { id: 'ai-front-desk-dental', name: 'Dental', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C8 2 5 5 5 9c0 3 1 5 2 7s2 6 2 6h6s1-4 2-6 2-4 2-7c0-4-3-7-7-7z"/><path d="M9 9h6"/></svg> },
                { id: 'ai-front-desk-legal', name: 'Legal', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg> },
                { id: 'ai-front-desk-medical', name: 'Medical', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
                { id: 'ai-front-desk-chiro', name: 'Chiro/Wellness', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 20V10M12 20V4M6 20v-6"/></svg> }
              ].map((industry) => (
                <button 
                  key={industry.id}
                  onClick={() => setPage(industry.id)}
                  style={{
                    background: c.bgCard,
                    border: '1px solid ' + c.border,
                    borderRadius: '12px',
                    padding: '20px 12px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    color: c.textSecondary
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = c.borderHover; e.currentTarget.style.color = c.text; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textSecondary; }}
                >
                  <div style={{display:'flex',justifyContent:'center',marginBottom:'10px',opacity:0.8}}>{industry.icon}</div>
                  <div style={{fontSize:'0.8rem',fontWeight:500,color:c.text}}>{industry.name}</div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Industries Section - Outbound Engine */}
      {id === 'ai-outbound' && (
        <section style={{padding:'60px 0',borderTop:'1px solid '+c.border}}>
          <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 20px'}}>
            <div style={{textAlign:'center',marginBottom:'40px'}}>
              <p style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:'0 0 16px 0'}}>Industries We Serve</p>
              <h2 style={{fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:600,letterSpacing:'-0.02em',margin:0}}>See how it works for your business</h2>
            </div>
            <div className="industries-grid-3">
              {[
                { id: 'ai-outbound-staffing', name: 'Staffing Agencies', desc: 'Client acquisition on autopilot', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                { id: 'ai-outbound-saas', name: 'B2B SaaS', desc: 'Pipeline without the headcount', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
                { id: 'ai-outbound-msp', name: 'IT Services & MSPs', desc: 'MRR growth on autopilot', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg> },
                { id: 'ai-outbound-agency', name: 'Marketing Agencies', desc: 'End the feast-or-famine cycle', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg> },
                { id: 'ai-outbound-advisor', name: 'Financial Advisors', desc: 'HNW prospects on autopilot', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> }
              ].map((industry) => (
                <button 
                  key={industry.id}
                  onClick={() => setPage(industry.id)}
                  style={{
                    background: c.bgCard,
                    border: '1px solid ' + c.border,
                    borderRadius: '12px',
                    padding: '24px 20px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    color: c.textSecondary
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = c.borderHover; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'12px',opacity:0.8}}>{industry.icon}<span style={{fontSize:'0.95rem',fontWeight:600,color:c.text}}>{industry.name}</span></div>
                  <div style={{fontSize:'0.8rem',color:c.textSecondary}}>{industry.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Industries Section - Referral Engine */}
      {id === 'referral' && (
        <section style={{padding:'60px 0',borderTop:'1px solid '+c.border}}>
          <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 20px'}}>
            <div style={{textAlign:'center',marginBottom:'40px'}}>
              <p style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:'0 0 16px 0'}}>Industries We Serve</p>
              <h2 style={{fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:600,letterSpacing:'-0.02em',margin:0}}>See how it works for your business</h2>
            </div>
            <div className="industries-grid-3">
              {[
                { id: 'referral-real-estate', name: 'Real Estate Agents', desc: '82% of sales come from referrals', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
                { id: 'referral-mortgage', name: 'Mortgage Lenders', desc: '87% of business from referrals', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg> },
                { id: 'referral-insurance', name: 'Insurance Brokers', desc: 'Stay top-of-mind year-round', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
                { id: 'referral-advisor', name: 'Financial Advisors', desc: 'COI relationships that produce', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
                { id: 'referral-inspector', name: 'Home Inspectors', desc: '100% referral-dependent business', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> }
              ].map((industry) => (
                <button 
                  key={industry.id}
                  onClick={() => setPage(industry.id)}
                  style={{
                    background: c.bgCard,
                    border: '1px solid ' + c.border,
                    borderRadius: '12px',
                    padding: '24px 20px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    color: c.textSecondary
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = c.borderHover; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'12px',opacity:0.8}}>{industry.icon}<span style={{fontSize:'0.95rem',fontWeight:600,color:c.text}}>{industry.name}</span></div>
                  <div style={{fontSize:'0.8rem',color:c.textSecondary}}>{industry.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Industries Section - Broker OS */}
      {id === 'broker-os' && (
        <section style={{padding:'60px 0',borderTop:'1px solid '+c.border}}>
          <div style={{maxWidth:'700px',margin:'0 auto',padding:'0 20px'}}>
            <div style={{textAlign:'center',marginBottom:'40px'}}>
              <p style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:'0 0 16px 0'}}>Industries We Serve</p>
              <h2 style={{fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:600,letterSpacing:'-0.02em',margin:0}}>See how it works for your business</h2>
            </div>
            <div className="industries-grid-3">
              {[
                { id: 'broker-os-freight', name: 'Freight Brokers', desc: 'Real-time margins, carrier tracking', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
                { id: 'broker-os-wholesale', name: 'Wholesale Real Estate', desc: 'Deals to dispositions in one place', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg> },
                { id: 'broker-os-recruiters', name: 'Recruiters', desc: 'Candidates, clients, pipeline in one system', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> }
              ].map((industry) => (
                <button 
                  key={industry.id}
                  onClick={() => setPage(industry.id)}
                  style={{
                    background: c.bgCard,
                    border: '1px solid ' + c.border,
                    borderRadius: '12px',
                    padding: '24px 20px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    color: c.textSecondary
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = c.borderHover; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'12px',opacity:0.8}}>{industry.icon}<span style={{fontSize:'0.95rem',fontWeight:600,color:c.text}}>{industry.name}</span></div>
                  <div style={{fontSize:'0.8rem',color:c.textSecondary}}>{industry.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Industries Section - Content Engine */}
      {id === 'content-engine' && (
        <section style={{padding:'60px 0',borderTop:'1px solid '+c.border}}>
          <div style={{maxWidth:'500px',margin:'0 auto',padding:'0 20px'}}>
            <div style={{textAlign:'center',marginBottom:'40px'}}>
              <p style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:'0 0 16px 0'}}>Industries We Serve</p>
              <h2 style={{fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:600,letterSpacing:'-0.02em',margin:0}}>See how it works for your business</h2>
            </div>
            <div className="industries-grid-3">
              {[
                { id: 'content-engine-local', name: 'Local Service Businesses', desc: 'Roofing, HVAC, plumbing, contractors—get found online', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> },
                { id: 'content-engine-realestate', name: 'Real Estate Agents', desc: 'Video, market updates, and social—stay visible', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
                { id: 'content-engine-advisor', name: 'Financial Advisors', desc: 'Compliance-friendly thought leadership', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> }
              ].map((industry) => (
                <button 
                  key={industry.id}
                  onClick={() => setPage(industry.id)}
                  style={{
                    background: c.bgCard,
                    border: '1px solid ' + c.border,
                    borderRadius: '12px',
                    padding: '24px 20px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    color: c.textSecondary
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = c.borderHover; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'12px',opacity:0.8}}>{industry.icon}<span style={{fontSize:'0.95rem',fontWeight:600,color:c.text}}>{industry.name}</span></div>
                  <div style={{fontSize:'0.8rem',color:c.textSecondary}}>{industry.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Industries Section - Website Design */}
      {id === 'website-design' && (
        <section style={{padding:'60px 0',borderTop:'1px solid '+c.border}}>
          <div style={{maxWidth:'500px',margin:'0 auto',padding:'0 20px'}}>
            <div style={{textAlign:'center',marginBottom:'40px'}}>
              <p style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:'0 0 16px 0'}}>Industries We Serve</p>
              <h2 style={{fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:600,letterSpacing:'-0.02em',margin:0}}>See how it works for your business</h2>
            </div>
            <div className="industries-grid-2">
              {[
                { id: 'website-design-local', name: 'Local Service Businesses', desc: 'Roofing, HVAC, plumbing, contractors—websites that convert', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> },
                { id: 'website-design-realestate', name: 'Real Estate Agents', desc: 'IDX-integrated sites that build your brand', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> }
              ].map((industry) => (
                <button 
                  key={industry.id}
                  onClick={() => setPage(industry.id)}
                  style={{
                    background: c.bgCard,
                    border: '1px solid ' + c.border,
                    borderRadius: '12px',
                    padding: '24px 20px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    color: c.textSecondary
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = c.borderHover; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'12px',opacity:0.8}}>{industry.icon}<span style={{fontSize:'0.95rem',fontWeight:600,color:c.text}}>{industry.name}</span></div>
                  <div style={{fontSize:'0.8rem',color:c.textSecondary}}>{industry.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
      
      <section style={{padding:'100px 0 120px'}}>
        <div style={{maxWidth:'600px',margin:'0 auto',padding:'0 20px',textAlign:'center'}}>
          <h2 style={{fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:600,letterSpacing:'-0.03em',margin:0,color:c.text,lineHeight:1.2}}>A living revenue engine<br/>that never sleeps.</h2>
          <p style={{fontSize:'1rem',color:c.textSecondary,margin:'20px 0 32px 0',lineHeight:1.6}}>Live in {content.time} days. 20 minutes to see how.</p>
          <div style={{display:'flex',justifyContent:'center',gap:'12px',flexWrap:'wrap'}}>
            <a href="https://calendar.app.google/LUhpKq7nBNLpLiBWA" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}><Btn primary>Book a Call <Arrow/></Btn></a>
            <a href="mailto:hello@forgelightlabs.com" style={{textDecoration:'none'}}><Btn>Email Us</Btn></a>
          </div>
        </div>
      </section>
      <Footer setPage={setPage}/>
    </div>
  );
};

const About = ({setPage}) => (
  <div style={{background:c.bg,minHeight:'100vh',color:c.text}}>
    <section style={{position:'relative',paddingTop:'120px',paddingBottom:'80px',overflow:'hidden'}}>
      <ArchitecturalLines/>
      <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px',position:'relative',zIndex:1}}>
        <div style={{marginBottom:'20px',fontSize:'0.75rem',color:c.textTertiary}}>
          <button onClick={()=>setPage('home')} style={{background:'none',border:'none',cursor:'pointer',color:c.textTertiary}}>Home</button>
          <span style={{margin:'0 8px',opacity:0.5}}>/</span><span style={{color:c.textSecondary}}>About</span>
        </div>
        <h1 style={{fontSize:'clamp(2rem,5vw,3rem)',fontWeight:600,lineHeight:1.1,letterSpacing:'-0.03em',marginBottom:'24px'}}>Operational AI Infrastructure<br/>for Mid-Market Companies</h1>
        <p style={{fontSize:'1.1rem',lineHeight:1.7,color:c.textSecondary,marginBottom:'40px'}}>
          Forgelight Labs designs and deploys AI-powered systems that automate revenue operations—from back-office workflows to customer acquisition. Purpose-built for service businesses, dealerships, and B2B operators ready to scale without adding headcount. Done-for-you systems built by operators who've done the work.
        </p>
      </div>
    </section>
    
    <section style={{padding:'60px 0',borderTop:'1px solid '+c.border}}>
      <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
        <h2 style={{fontSize:'1.5rem',fontWeight:600,letterSpacing:'-0.02em',marginBottom:'24px'}}>The Problem We Solve</h2>
        <p style={{fontSize:'1rem',lineHeight:1.7,color:c.textSecondary,marginBottom:'20px'}}>
          Most businesses run on a patchwork of disconnected tools, manual processes, and tribal knowledge. Leads fall through cracks. Follow-ups get forgotten. Revenue leaks everywhere.
        </p>
        <p style={{fontSize:'1rem',lineHeight:1.7,color:c.textSecondary}}>
          We replace that chaos with systems—AI-powered infrastructure that captures every opportunity, nurtures every relationship, and scales without adding headcount.
        </p>
      </div>
    </section>

    <section style={{padding:'60px 0',borderTop:'1px solid '+c.border}}>
      <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
        <h2 style={{fontSize:'1.5rem',fontWeight:600,letterSpacing:'-0.02em',marginBottom:'24px'}}>Our Approach</h2>
        <div style={{display:'grid',gap:'24px'}}>
          <div style={{padding:'24px',background:c.bgCard,border:'1px solid '+c.border,borderRadius:'12px'}}>
            <h3 style={{fontSize:'1rem',fontWeight:600,marginBottom:'8px'}}>Systems Over Services</h3>
            <p style={{fontSize:'0.9rem',lineHeight:1.6,color:c.textSecondary,margin:0}}>We don't do one-off projects. We build infrastructure that runs 24/7, compounds over time, and becomes more valuable the longer you use it.</p>
          </div>
          <div style={{padding:'24px',background:c.bgCard,border:'1px solid '+c.border,borderRadius:'12px'}}>
            <h3 style={{fontSize:'1rem',fontWeight:600,marginBottom:'8px'}}>AI-Native Architecture</h3>
            <p style={{fontSize:'0.9rem',lineHeight:1.6,color:c.textSecondary,margin:0}}>Every system we build has AI at its core—not bolted on as an afterthought. This means smarter automation, better personalization, and results that improve over time.</p>
          </div>
          <div style={{padding:'24px',background:c.bgCard,border:'1px solid '+c.border,borderRadius:'12px'}}>
            <h3 style={{fontSize:'1rem',fontWeight:600,marginBottom:'8px'}}>Revenue-First Design</h3>
            <p style={{fontSize:'0.9rem',lineHeight:1.6,color:c.textSecondary,margin:0}}>We don't build pretty dashboards. We build systems that directly generate revenue—more calls booked, more deals closed, more referrals earned.</p>
          </div>
        </div>
      </div>
    </section>

    <section style={{padding:'60px 0',borderTop:'1px solid '+c.border}}>
      <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
        <h2 style={{fontSize:'1.5rem',fontWeight:600,letterSpacing:'-0.02em',marginBottom:'24px'}}>Who We Work With</h2>
        <p style={{fontSize:'1rem',lineHeight:1.7,color:c.textSecondary,marginBottom:'20px'}}>
          We partner with businesses who understand that growth requires infrastructure—not just effort. Teams who are ready to stop trading time for money and start building systems that scale.
        </p>
        <p style={{fontSize:'1rem',lineHeight:1.7,color:c.textSecondary}}>
          Our clients span industries from professional services to manufacturing to real estate. What they share: a commitment to building something that compounds.
        </p>
      </div>
    </section>

    <section style={{padding:'100px 0 120px',borderTop:'1px solid '+c.border}}>
      <div style={{maxWidth:'600px',margin:'0 auto',padding:'0 24px',textAlign:'center'}}>
        <h2 style={{fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:600,letterSpacing:'-0.02em',marginBottom:'16px'}}>Ready to build?</h2>
        <p style={{fontSize:'1rem',color:c.textSecondary,marginBottom:'32px',lineHeight:1.6}}>20 minutes to map your revenue gaps and show you what's possible.</p>
        <div style={{display:'flex',justifyContent:'center',gap:'12px'}}>
          <a href="https://calendar.app.google/LUhpKq7nBNLpLiBWA" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}><Btn primary>Book a Call <Arrow/></Btn></a>
          <a href="mailto:hello@forgelightlabs.com" style={{textDecoration:'none'}}><Btn>Email Us</Btn></a>
        </div>
      </div>
    </section>
    <Footer setPage={setPage}/>
  </div>
);

// Privacy Policy page
const Privacy = ({setPage}) => (
  <div style={{background:c.bg,minHeight:'100vh',color:c.text}}>
    <section style={{paddingTop:'120px',paddingBottom:'80px'}}>
      <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'20px',fontSize:'0.75rem',color:c.textTertiary}}>
          <button onClick={()=>setPage('home')} style={{background:'none',border:'none',cursor:'pointer',color:c.textTertiary}}>Home</button>
          <span style={{margin:'0 8px',opacity:0.5}}>/</span><span style={{color:c.textSecondary}}>Privacy Policy</span>
        </div>
        <h1 style={{fontSize:'clamp(2rem,5vw,3rem)',fontWeight:600,lineHeight:1.1,letterSpacing:'-0.03em',marginBottom:'24px'}}>Privacy Policy</h1>
        <p style={{fontSize:'0.85rem',color:c.textTertiary,marginBottom:'40px'}}>Last updated: December 2024</p>
        
        <div style={{display:'flex',flexDirection:'column',gap:'32px'}}>
          <div>
            <h2 style={{fontSize:'1.25rem',fontWeight:600,marginBottom:'12px'}}>Information We Collect</h2>
            <p style={{fontSize:'1rem',lineHeight:1.7,color:c.textSecondary}}>
              We collect information you provide directly, such as your name, email, and company when you fill out a contact form or book a call. We also collect basic analytics data about how you use our website, including pages visited and time spent.
            </p>
          </div>
          
          <div>
            <h2 style={{fontSize:'1.25rem',fontWeight:600,marginBottom:'12px'}}>How We Use Your Information</h2>
            <p style={{fontSize:'1rem',lineHeight:1.7,color:c.textSecondary}}>
              We use the information we collect to respond to your inquiries, provide our services, improve our website, and send occasional updates about our services (only if you've opted in). We never sell your personal information to third parties.
            </p>
          </div>
          
          <div>
            <h2 style={{fontSize:'1.25rem',fontWeight:600,marginBottom:'12px'}}>Cookies & Analytics</h2>
            <p style={{fontSize:'1rem',lineHeight:1.7,color:c.textSecondary}}>
              We use cookies and similar technologies to analyze website traffic and improve your experience. This includes Google Analytics for understanding how visitors interact with our site. You can opt out of analytics tracking through your browser settings or by using the cookie preferences on our site.
            </p>
          </div>
          
          <div>
            <h2 style={{fontSize:'1.25rem',fontWeight:600,marginBottom:'12px'}}>Data Security</h2>
            <p style={{fontSize:'1rem',lineHeight:1.7,color:c.textSecondary}}>
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>
          
          <div>
            <h2 style={{fontSize:'1.25rem',fontWeight:600,marginBottom:'12px'}}>Your Rights</h2>
            <p style={{fontSize:'1rem',lineHeight:1.7,color:c.textSecondary}}>
              You have the right to access, correct, or delete your personal information. You can also opt out of marketing communications at any time. To exercise these rights, contact us at hello@forgelightlabs.com.
            </p>
          </div>
          
          <div>
            <h2 style={{fontSize:'1.25rem',fontWeight:600,marginBottom:'12px'}}>Contact Us</h2>
            <p style={{fontSize:'1rem',lineHeight:1.7,color:c.textSecondary}}>
              If you have questions about this Privacy Policy, please contact us at hello@forgelightlabs.com.
            </p>
          </div>
        </div>
      </div>
    </section>
    <Footer setPage={setPage}/>
  </div>
);

// Contact page
// Back-Office Solutions page
const BackOffice = ({setPage}) => {
  const solutions = [
    {id:'billing-automation',icon:<DollarIcon/>,title:'Billing & Collections',desc:'Invoice generation. Submission. Follow-up. Collections. Fully automated.',outcome:'Reduce DSO. Eliminate backlog. Stop leaving revenue on the table.'},
    {id:'quoting-automation',icon:<CheckIcon/>,title:'Quoting & Estimates',desc:'Faster quotes. Automatic follow-up. More closed deals.',outcome:'Respond faster than competitors. Follow up until they decide.'},
    {id:'scheduling-automation',icon:<CalIcon/>,title:'Scheduling & Dispatch',desc:'Bookings. Reminders. Routing. No manual coordination.',outcome:'Reduce no-shows. Optimize routes. Redeploy scheduling labor.'},
    {id:'customer-communications',icon:<MsgIcon/>,title:'Customer Communications',desc:'Updates. Reminders. Follow-ups. Automated and on-brand.',outcome:'Slash inbound status calls. Boost reviews. Build trust.'},
    {id:'lead-followup',icon:<MailIcon/>,title:'Follow-up & Nurture',desc:'Unconverted leads. Missed calls. Dead quotes. Reactivated automatically.',outcome:'No lead falls through the cracks. Persistence without labor.'},
    {id:'data-entry-automation',icon:<LayoutIcon/>,title:'Data Entry & Admin',desc:'Forms. Entry. Documents. Automated end-to-end.',outcome:'Cut admin hours. Eliminate errors. Scale without headcount.'}
  ];

  return (
    <div style={{background:c.bg,minHeight:'100vh',color:c.text}}>
      {/* Hero */}
      <section style={{position:'relative',paddingTop:'120px',paddingBottom:'80px',overflow:'hidden'}}>
        <LandingAnimation type="back-office"/>
        <div style={{maxWidth:'900px',margin:'0 auto',padding:'0 24px',textAlign:'center',position:'relative',zIndex:1}}>
          <div style={{marginBottom:'20px',fontSize:'0.75rem',color:c.textTertiary}}>
            <button onClick={()=>setPage('home')} style={{background:'none',border:'none',cursor:'pointer',color:c.textTertiary}}>Home</button>
            <span style={{margin:'0 8px',opacity:0.5}}>/</span><span style={{color:c.textSecondary}}>Back-Office Automations</span>
          </div>
          <h1 style={{fontSize:'clamp(2rem,5vw,3rem)',fontWeight:600,lineHeight:1.1,letterSpacing:'-0.03em',marginBottom:'24px'}}>Back-Office Automations</h1>
          <p style={{fontSize:'1.1rem',lineHeight:1.7,color:c.textSecondary,marginBottom:'16px',maxWidth:'600px',margin:'0 auto 16px'}}>
            Billing cycles, quote follow-ups, scheduling, customer updates—the operational work that runs in the background, faster, better, and without adding headcount.
          </p>
          <p style={{fontSize:'1.1rem',fontWeight:500,color:c.accent}}>
            Eliminate waste. Recover revenue. Then scale.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section style={{paddingBottom:'80px'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 24px'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(340px, 1fr))',gap:'24px'}}>
            {solutions.map((sol,i) => (
              <Card key={i} onClick={()=>setPage(sol.id)}>{h=>(
                <div style={{background:h?'rgba(28,28,31,0.9)':c.bgCard,border:'1px solid '+(h?c.borderHover:c.border),borderRadius:'16px',padding:'32px',cursor:'pointer',transition:'all 0.3s',height:'100%',display:'flex',flexDirection:'column',boxShadow:h?'0 0 30px rgba(232,228,221,0.03)':'none'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'16px'}}>
                    <div style={{color:h?c.warm:c.accent,transition:'color 0.3s'}}>{sol.icon}</div>
                    <div style={{color:c.textTertiary,transform:h?'translateX(4px)':'translateX(0)',transition:'transform 0.3s'}}><Arrow/></div>
                  </div>
                  <h3 style={{fontSize:'1.25rem',fontWeight:600,marginBottom:'12px',color:h?c.warm:c.text,transition:'color 0.3s'}}>{sol.title}</h3>
                  <p style={{fontSize:'0.95rem',color:c.textSecondary,marginBottom:'20px',lineHeight:1.6,flex:1}}>{sol.desc}</p>
                  <p style={{fontSize:'0.85rem',color:c.accent,margin:0,fontWeight:500}}>{sol.outcome}</p>
                </div>
              )}</Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'80px 0',borderTop:'1px solid '+c.border,textAlign:'center'}}>
        <div style={{maxWidth:'600px',margin:'0 auto',padding:'0 24px'}}>
          <h2 style={{fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:600,marginBottom:'16px'}}>Not sure where to start?</h2>
          <p style={{fontSize:'1rem',color:c.textSecondary,marginBottom:'32px'}}>Book a call. We'll review your operations and identify the highest-impact automation opportunities.</p>
          <a href="https://calendar.app.google/LUhpKq7nBNLpLiBWA" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}><Btn primary>Book a Call <Arrow/></Btn></a>
        </div>
      </section>

      {/* Link to Revenue Systems */}
      <section style={{padding:'60px 0',borderTop:'1px solid '+c.border,textAlign:'center'}}>
        <div style={{maxWidth:'600px',margin:'0 auto',padding:'0 24px'}}>
          <p style={{fontSize:'0.9rem',color:c.textTertiary,marginBottom:'16px'}}>Operations locked in? Ready to grow?</p>
          <button onClick={()=>{setPage('home');setTimeout(()=>document.getElementById('systems')?.scrollIntoView({behavior:'smooth'}),100);}} style={{background:'none',border:'none',padding:0,cursor:'pointer',color:c.textSecondary,fontSize:'0.95rem',fontWeight:500}}>See Revenue Systems →</button>
        </div>
      </section>

      <Footer setPage={setPage}/>
    </div>
  );
};

// Website Development Landing Page
const WebDev = ({setPage}) => {
  const services = [
    {icon:<LayoutIcon/>,title:'Custom Website Design',desc:'High-performance websites built for conversion. Responsive, fast, and designed to turn visitors into customers.',features:['Mobile-first responsive design','Conversion-optimized layouts','Brand-aligned visual identity','Performance-optimized builds']},
    {icon:<BrainIcon/>,title:'SEO Audits & Strategy',desc:'Technical and on-page SEO analysis that identifies what\'s holding your site back and what to fix first.',features:['Technical SEO audit','Keyword research & mapping','On-page optimization','Competitive analysis']},
    {icon:<ActivityIcon/>,title:'Website Redesigns',desc:'Modernize outdated sites without losing what works. Better UX, faster load times, stronger conversions.',features:['UX/UI modernization','Content migration','Page speed optimization','Analytics setup']},
    {icon:<DollarIcon/>,title:'Landing Pages & Funnels',desc:'Purpose-built pages for campaigns, launches, and lead capture. Every element designed to convert.',features:['A/B test-ready layouts','Lead capture optimization','Campaign-specific pages','CRM integration']},
    {icon:<MsgIcon/>,title:'Content & Copywriting',desc:'SEO-driven content that ranks and converts. Blog posts, service pages, and product descriptions that work.',features:['SEO content strategy','Service page copywriting','Blog content creation','Meta & schema optimization']},
    {icon:<CheckIcon/>,title:'Ongoing Support & Optimization',desc:'Continuous improvement based on real data. Monthly reporting, updates, and conversion rate optimization.',features:['Monthly performance reports','Conversion rate optimization','Security updates & maintenance','Content updates & additions']}
  ];

  return (
    <div style={{background:c.bg,minHeight:'100vh',color:c.text}}>
      {/* Hero */}
      <section style={{position:'relative',paddingTop:'120px',paddingBottom:'80px',overflow:'hidden'}}>
        <LandingAnimation type="web-development"/>
        <div style={{maxWidth:'900px',margin:'0 auto',padding:'0 24px',textAlign:'center',position:'relative',zIndex:1}}>
          <div style={{marginBottom:'20px',fontSize:'0.75rem',color:c.textTertiary}}>
            <button onClick={()=>setPage('home')} style={{background:'none',border:'none',cursor:'pointer',color:c.textTertiary}}>Home</button>
            <span style={{margin:'0 8px',opacity:0.5}}>/</span><span style={{color:c.textSecondary}}>Website Development</span>
          </div>
          <h1 style={{fontSize:'clamp(2rem,5vw,3rem)',fontWeight:600,lineHeight:1.1,letterSpacing:'-0.03em',marginBottom:'24px'}}>Website Development<br/>& SEO Services</h1>
          <p style={{fontSize:'1.1rem',lineHeight:1.7,color:c.textSecondary,maxWidth:'650px',margin:'0 auto 24px'}}>
            High-performance websites built for mid-market businesses. Custom design, technical SEO, and ongoing optimization—so your site generates leads, not just traffic.
          </p>
          <a href="https://calendar.app.google/LUhpKq7nBNLpLiBWA" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}><Btn primary>Book a Call <Arrow/></Btn></a>
        </div>
      </section>

      {/* Why It Matters */}
      <section style={{padding:'80px 0',borderTop:'1px solid '+c.border}}>
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
          <p style={{fontSize:'1.1rem',lineHeight:1.9,color:c.text,opacity:0.9}}>
            Your website is your most visible sales tool—but most business websites underperform. Slow load times cost you rankings. Poor mobile experience loses visitors. Weak SEO means your competitors show up first. We build websites that solve all three: fast, responsive, and optimized to rank for the searches your customers are actually making.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{padding:'80px 0',borderTop:'1px solid '+c.border}}>
        <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 24px'}}>
          <div style={{textAlign:'center',marginBottom:'48px'}}>
            <p style={{fontSize:'0.85rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:'0 0 16px 0'}}>Services</p>
            <h2 style={{fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:600,letterSpacing:'-0.02em',lineHeight:1.2,margin:0}}>Everything your website needs to perform.</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(340px, 1fr))',gap:'24px'}}>
            {services.map((svc,i) => (
              <Card key={i}>{h=>(
                <div style={{background:h?'rgba(28,28,31,0.9)':c.bgCard,border:'1px solid '+(h?c.borderHover:c.border),borderRadius:'16px',padding:'32px',transition:'all 0.3s',height:'100%',display:'flex',flexDirection:'column',boxShadow:h?'0 0 30px rgba(232,228,221,0.03)':'none'}}>
                  <div style={{color:h?c.warm:c.accent,marginBottom:'16px',transition:'color 0.3s'}}>{svc.icon}</div>
                  <h3 style={{fontSize:'1.25rem',fontWeight:600,marginBottom:'12px',color:h?c.warm:c.text,transition:'color 0.3s'}}>{svc.title}</h3>
                  <p style={{fontSize:'0.95rem',color:c.textSecondary,marginBottom:'20px',lineHeight:1.6}}>{svc.desc}</p>
                  <ul style={{listStyle:'none',padding:0,margin:0,marginTop:'auto'}}>
                    {svc.features.map((f,j)=>(
                      <li key={j} style={{fontSize:'0.85rem',color:c.textTertiary,padding:'6px 0',borderTop:j===0?'1px solid '+c.border:'none',display:'flex',alignItems:'center',gap:'8px'}}>
                        <span style={{color:c.accent,fontSize:'0.7rem'}}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}</Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{padding:'80px 0',borderTop:'1px solid '+c.border}}>
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
          <div style={{textAlign:'center',marginBottom:'48px'}}>
            <p style={{fontSize:'0.85rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:'0 0 16px 0'}}>Process</p>
            <h2 style={{fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:600,letterSpacing:'-0.02em',lineHeight:1.2,margin:0}}>How it works.</h2>
          </div>
          {[
            {step:'01',title:'Audit & Discovery',desc:'We analyze your current site, competitors, and target keywords. You get a clear picture of what\'s working, what\'s not, and what to prioritize.'},
            {step:'02',title:'Strategy & Design',desc:'Custom design mockups built around your brand, your audience, and your conversion goals. Nothing templated.'},
            {step:'03',title:'Build & Optimize',desc:'Development with performance baked in. Clean code, fast load times, mobile-first, and SEO-ready from day one.'},
            {step:'04',title:'Launch & Iterate',desc:'Go live with analytics in place. Monthly reporting and continuous optimization based on real traffic data.'}
          ].map((p,i)=>(
            <div key={i} style={{display:'flex',gap:'24px',marginBottom:'40px',alignItems:'flex-start'}}>
              <span style={{fontSize:'1.5rem',fontWeight:700,color:c.warm,minWidth:'48px'}}>{p.step}</span>
              <div>
                <h3 style={{fontSize:'1.1rem',fontWeight:600,marginBottom:'8px'}}>{p.title}</h3>
                <p style={{fontSize:'0.95rem',color:c.textSecondary,lineHeight:1.6,margin:0}}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Keywords Section */}
      <section style={{padding:'80px 0',borderTop:'1px solid '+c.border}}>
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
          <div style={{textAlign:'center',marginBottom:'48px'}}>
            <h2 style={{fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:600,letterSpacing:'-0.02em',marginBottom:'16px'}}>Web development services for businesses that need results.</h2>
            <p style={{fontSize:'1rem',color:c.textSecondary,lineHeight:1.7}}>
              Whether you need a full website redesign, a technical SEO audit, landing pages for paid campaigns, or ongoing website maintenance and optimization—we build websites that rank, convert, and scale with your business. From custom web design to search engine optimization, our Houston-based team delivers enterprise-quality web development for mid-market companies.
            </p>
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'8px',justifyContent:'center'}}>
            {['Custom Web Design','SEO Audit','Technical SEO','Website Redesign','Landing Page Design','Web Development','Search Engine Optimization','Website Optimization','Mobile-First Design','Page Speed Optimization','Conversion Rate Optimization','Local SEO','WordPress Development','React Development','Website Maintenance','Content Strategy','Responsive Web Design','E-commerce Development','Lead Generation Websites','Houston Web Design'].map((tag,i)=>(
              <span key={i} style={{padding:'8px 16px',background:c.bgCard,border:'1px solid '+c.border,borderRadius:'20px',fontSize:'0.8rem',color:c.textSecondary}}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'80px 0',borderTop:'1px solid '+c.border,textAlign:'center'}}>
        <div style={{maxWidth:'600px',margin:'0 auto',padding:'0 24px'}}>
          <h2 style={{fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:600,marginBottom:'16px'}}>Ready for a website that works as hard as you do?</h2>
          <p style={{fontSize:'1rem',color:c.textSecondary,marginBottom:'32px'}}>Book a free audit. We'll review your current site, identify quick wins, and show you what a high-performance website looks like for your business.</p>
          <a href="https://calendar.app.google/LUhpKq7nBNLpLiBWA" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}><Btn primary>Book a Call <Arrow/></Btn></a>
        </div>
      </section>

      <Footer setPage={setPage}/>
    </div>
  );
};
const BackOfficePage = ({setPage, data}) => {
  // Calculator states - set sensible defaults per calculator type
  const getDefaults = () => {
    if (data.title.includes('Billing')) return [250000, 45, 15]; // monthly revenue, DSO, reduction target
    if (data.title.includes('Quoting')) return [50, 5000, 20]; // quotes/mo, deal size, close rate
    if (data.title.includes('Scheduling')) return [50, 250, 10]; // appts/wk, job value, no-show rate
    if (data.title.includes('Customer Comm')) return [15, 4, 35]; // calls/day, minutes, hourly cost
    if (data.title.includes('Lead Follow')) return [100, 8, 15]; // leads/mo, current conversion %, target conversion %
    if (data.title.includes('Data Entry')) return [20, 40, 2]; // hrs/wk, hourly cost, staff count
    return [100, 50, 10];
  };
  const defaults = getDefaults();
  const [calcValue1, setCalcValue1] = useState(defaults[0]);
  const [calcValue2, setCalcValue2] = useState(defaults[1]);
  const [calcValue3, setCalcValue3] = useState(defaults[2]);

  // Determine calculator type based on page
  const getCalculator = () => {
    if (data.title.includes('Billing')) {
      // Accurate DSO calculator
      // calcValue1 = monthly revenue, calcValue2 = current DSO, calcValue3 = target DSO reduction
      const monthlyRevenue = calcValue1;
      const currentDSO = calcValue2;
      const dsoReduction = calcValue3;
      
      const currentAR = (monthlyRevenue / 30) * currentDSO;
      const newAR = (monthlyRevenue / 30) * (currentDSO - dsoReduction);
      const cashFreed = currentAR - newAR;
      
      return {
        title: 'DSO Calculator',
        question: 'How much cash could you free up by collecting faster?',
        inputs: [
          { label: 'Monthly billings', value: calcValue1, set: setCalcValue1, min: 50000, max: 2000000, step: 50000, format: v => '$'+v.toLocaleString() },
          { label: 'Current DSO (days to collect)', value: calcValue2, set: setCalcValue2, min: 30, max: 90, step: 5, format: v => v+' days' },
          { label: 'DSO reduction target', value: calcValue3, set: setCalcValue3, min: 5, max: 30, step: 5, format: v => v+' days faster' }
        ],
        result: '$'+Math.round(cashFreed).toLocaleString(),
        resultLabel: 'one-time cash freed up',
        note: 'This is cash currently tied up in AR that you\'d get back—once—by collecting faster. It doesn\'t repeat, but it\'s real money you can use.'
      };
    }
    if (data.title.includes('Quoting')) {
      // Quote speed calculator: quotes/month, avg deal size, close rate improvement
      const currentRevenue = calcValue1 * calcValue2 * (calcValue3/100);
      const improvedRevenue = calcValue1 * calcValue2 * ((calcValue3 + 5)/100);
      const additionalRevenue = improvedRevenue - currentRevenue;
      return {
        title: 'Quote Speed Calculator',
        question: 'What\'s a 5% close rate improvement worth?',
        inputs: [
          { label: 'Quotes per month', value: calcValue1, set: setCalcValue1, min: 10, max: 200, step: 10, format: v => v },
          { label: 'Average deal size', value: calcValue2, set: setCalcValue2, min: 1000, max: 50000, step: 1000, format: v => '$'+v.toLocaleString() },
          { label: 'Current close rate', value: calcValue3, set: setCalcValue3, min: 10, max: 50, step: 5, format: v => v+'%' }
        ],
        result: '$'+Math.round(additionalRevenue * 12).toLocaleString()+'/yr',
        resultLabel: 'additional revenue with +5% close rate',
        note: 'Studies show first response wins 35-50% of the time. Faster quotes + persistent follow-up = more closed deals.'
      };
    }
    if (data.title.includes('Scheduling')) {
      // No-show calculator
      const weeklyLoss = calcValue1 * calcValue2 * (calcValue3/100);
      const yearlyLoss = weeklyLoss * 52;
      const recoverable = yearlyLoss * 0.4; // conservative 40% reduction
      return {
        title: 'No-Show Calculator',
        question: 'What are no-shows costing you?',
        inputs: [
          { label: 'Appointments per week', value: calcValue1, set: setCalcValue1, min: 20, max: 200, step: 10, format: v => v },
          { label: 'Average job value', value: calcValue2, set: setCalcValue2, min: 100, max: 1000, step: 50, format: v => '$'+v },
          { label: 'No-show rate', value: calcValue3, set: setCalcValue3, min: 5, max: 25, step: 1, format: v => v+'%' }
        ],
        result: '$'+Math.round(recoverable).toLocaleString()+'/yr',
        resultLabel: 'recoverable (assuming 40% reduction)',
        note: 'Automated reminders typically reduce no-shows by 30-50%. That\'s capacity you\'re currently losing.'
      };
    }
    if (data.title.includes('Customer Comm')) {
      // Status call calculator
      const dailyMinutes = calcValue1 * calcValue2;
      const dailyCost = (dailyMinutes / 60) * calcValue3;
      const yearlyCost = dailyCost * 250;
      return {
        title: 'Status Call Calculator',
        question: 'What do "where\'s my tech?" calls cost?',
        inputs: [
          { label: 'Status calls per day', value: calcValue1, set: setCalcValue1, min: 5, max: 50, step: 5, format: v => v },
          { label: 'Average call length', value: calcValue2, set: setCalcValue2, min: 2, max: 8, step: 1, format: v => v+' min' },
          { label: 'CSR loaded cost/hour', value: calcValue3, set: setCalcValue3, min: 25, max: 50, step: 5, format: v => '$'+v }
        ],
        result: '$'+Math.round(yearlyCost).toLocaleString()+'/yr',
        resultLabel: 'in labor on preventable calls',
        note: 'Most status calls are preventable with proactive updates. Your CSRs could be doing something more valuable.'
      };
    }
    if (data.title.includes('Lead Follow')) {
      // Lead follow-up calculator
      // calcValue1 = leads/month, calcValue2 = current conversion %, calcValue3 = target conversion %
      const currentCustomers = calcValue1 * (calcValue2/100);
      const targetCustomers = calcValue1 * (calcValue3/100);
      const additionalCustomers = targetCustomers - currentCustomers;
      const revenuePerCustomer = 2000; // fixed avg customer value for simplicity
      const additionalRevenue = additionalCustomers * revenuePerCustomer;
      return {
        title: 'Follow-up Calculator',
        question: 'What\'s better conversion worth?',
        inputs: [
          { label: 'Leads per month', value: calcValue1, set: setCalcValue1, min: 50, max: 500, step: 25, format: v => v },
          { label: 'Current conversion rate', value: calcValue2, set: setCalcValue2, min: 3, max: 20, step: 1, format: v => v+'%' },
          { label: 'Target conversion rate', value: calcValue3, set: setCalcValue3, min: 5, max: 30, step: 1, format: v => v+'%' }
        ],
        result: additionalRevenue > 0 ? '$'+Math.round(additionalRevenue * 12).toLocaleString()+'/yr' : '$0/yr',
        resultLabel: `additional revenue at $2k/customer (${Math.round(additionalCustomers * 12)} more customers/yr)`,
        note: 'Most leads need 5+ touches to convert. Consistent follow-up typically improves conversion by 5-15 points.'
      };
    }
    if (data.title.includes('Data Entry')) {
      // Time savings calculator
      const weeklyLaborCost = calcValue1 * calcValue2;
      const yearlyLaborCost = weeklyLaborCost * 52;
      const savingsAt60Percent = yearlyLaborCost * 0.6;
      return {
        title: 'Data Entry Calculator',
        question: 'What\'s manual data entry costing you?',
        inputs: [
          { label: 'Hours/week on data entry', value: calcValue1, set: setCalcValue1, min: 5, max: 60, step: 5, format: v => v+' hrs' },
          { label: 'Loaded hourly cost', value: calcValue2, set: setCalcValue2, min: 25, max: 60, step: 5, format: v => '$'+v },
          { label: 'Staff doing data entry', value: calcValue3, set: setCalcValue3, min: 1, max: 5, step: 1, format: v => v+' people' }
        ],
        result: '$'+Math.round(savingsAt60Percent * calcValue3).toLocaleString()+'/yr',
        resultLabel: 'in labor (at 60% automation)',
        note: 'Plus fewer errors, faster processing, and room to grow without adding headcount.'
      };
    }
    return null;
  };

  const calc = getCalculator();

  return (
    <div style={{background:c.bg,minHeight:'100vh',color:c.text}}>
      {/* Hero with animation */}
      <section style={{position:'relative',paddingTop:'140px',paddingBottom:'100px',overflow:'hidden'}}>
        <LandingAnimation type="back-office"/>
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px',textAlign:'center',position:'relative',zIndex:1}}>
          <div style={{marginBottom:'24px',fontSize:'0.75rem',color:c.textTertiary}}>
            <button onClick={()=>setPage('home')} style={{background:'none',border:'none',cursor:'pointer',color:c.textTertiary}}>Home</button>
            <span style={{margin:'0 10px',opacity:0.5}}>/</span>
            <button onClick={()=>setPage('back-office')} style={{background:'none',border:'none',cursor:'pointer',color:c.textTertiary}}>Back-Office</button>
            <span style={{margin:'0 10px',opacity:0.5}}>/</span>
            <span style={{color:c.textSecondary}}>{data.title.replace('AI ', '').replace(' Automation', '')}</span>
          </div>
          <h1 style={{fontSize:'clamp(2rem,5vw,3rem)',fontWeight:600,lineHeight:1.15,letterSpacing:'-0.03em',marginBottom:'20px',color:c.warm}}>{data.title}</h1>
          <p style={{fontSize:'1.15rem',lineHeight:1.7,color:c.textSecondary,marginBottom:'36px',maxWidth:'600px',margin:'0 auto 36px'}}>{data.subtitle}</p>
          <a href="https://calendar.app.google/LUhpKq7nBNLpLiBWA" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}><Btn primary>Book a Call <Arrow/></Btn></a>
        </div>
      </section>

      {/* Intro / Overview - SEO rich */}
      {data.intro && (
        <section style={{padding:'80px 0',borderTop:'1px solid '+c.border}}>
          <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
            <p style={{fontSize:'1.1rem',lineHeight:1.9,color:c.text,opacity:0.9}}>{data.intro}</p>
          </div>
        </section>
      )}

      {/* What We Automate */}
      <section style={{padding:'80px 0',borderTop:'1px solid '+c.border}}>
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
            <div style={{width:'40px',height:'40px',background:'rgba(100,116,139,0.1)',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c.accent} strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            </div>
            <p style={{fontSize:'0.8rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:0}}>What We Automate</p>
          </div>
          <p style={{fontSize:'1.1rem',lineHeight:1.9,color:c.text,opacity:0.9}}>{data.whatWeAutomate}</p>
        </div>
      </section>

      {/* Calculator - now in middle */}
      {calc && (
        <section style={{padding:'80px 0',borderTop:'1px solid '+c.border}}>
          <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
              <div style={{width:'40px',height:'40px',background:'rgba(100,116,139,0.1)',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c.accent} strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/></svg>
              </div>
              <p style={{fontSize:'0.8rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:0}}>{calc.title}</p>
            </div>
            
            <div style={{background:c.bgCard,border:'1px solid '+c.border,borderRadius:'12px',padding:'32px'}}>
              <p style={{fontSize:'1.1rem',color:c.text,margin:'0 0 28px 0',fontWeight:500}}>{calc.question}</p>
              
              <div style={{display:'grid',gap:'24px',marginBottom:'32px'}}>
                {calc.inputs.map((input, i) => {
                  // Get current value directly from state
                  const currentValue = i === 0 ? calcValue1 : i === 1 ? calcValue2 : calcValue3;
                  const setValue = i === 0 ? setCalcValue1 : i === 1 ? setCalcValue2 : setCalcValue3;
                  return (
                  <div key={i}>
                    <label style={{display:'block',fontSize:'0.9rem',color:c.textSecondary,marginBottom:'8px'}}>
                      {input.label}: <strong style={{color:c.text}}>{input.format(currentValue)}</strong>
                    </label>
                    <input 
                      type="range" 
                      min={input.min} 
                      max={input.max}
                      step={input.step}
                      value={currentValue} 
                      onChange={(e) => setValue(Number(e.target.value))}
                      style={{width:'100%',accentColor:c.accent}}
                    />
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.75rem',color:c.textTertiary}}>
                      <span>{input.format(input.min)}</span><span>{input.format(input.max)}</span>
                    </div>
                  </div>
                )})}
              </div>
              
              <div style={{background:c.bg,borderRadius:'8px',padding:'24px',textAlign:'center'}}>
                <p style={{fontSize:'0.85rem',color:c.textSecondary,margin:'0 0 8px 0'}}>{calc.resultLabel}</p>
                <p style={{fontSize:'2.5rem',fontWeight:700,color:'#22C55E',margin:'0',letterSpacing:'-0.02em'}}>
                  {calc.result}
                </p>
              </div>
              
              <p style={{fontSize:'0.85rem',color:c.textTertiary,margin:'20px 0 0 0',textAlign:'center'}}>
                {calc.note}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Integrations */}
      <section style={{padding:'80px 0',borderTop:'1px solid '+c.border}}>
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
            <div style={{width:'40px',height:'40px',background:'rgba(100,116,139,0.1)',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c.accent} strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
            </div>
            <p style={{fontSize:'0.8rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:0}}>Integrations</p>
          </div>
          <p style={{fontSize:'1.1rem',lineHeight:1.9,color:c.text,opacity:0.9}}>{data.integrations}</p>
        </div>
      </section>

      {/* How It Works */}
      <section style={{padding:'80px 0',borderTop:'1px solid '+c.border}}>
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
            <div style={{width:'40px',height:'40px',background:'rgba(100,116,139,0.1)',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c.accent} strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <p style={{fontSize:'0.8rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:0}}>How It Works</p>
          </div>
          <p style={{fontSize:'1.1rem',lineHeight:1.9,color:c.text,opacity:0.9}}>{data.howItWorks}</p>
        </div>
      </section>

      {/* Implementation */}
      <section style={{padding:'80px 0',borderTop:'1px solid '+c.border}}>
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
            <div style={{width:'40px',height:'40px',background:'rgba(100,116,139,0.1)',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c.accent} strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </div>
            <p style={{fontSize:'0.8rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:0}}>Implementation</p>
          </div>
          <p style={{fontSize:'1.1rem',lineHeight:1.9,color:c.text,opacity:0.9}}>{data.implementation}</p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{padding:'80px 0',borderTop:'1px solid '+c.border}}>
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'32px'}}>
            <div style={{width:'40px',height:'40px',background:'rgba(100,116,139,0.1)',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c.accent} strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <p style={{fontSize:'0.8rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:0}}>FAQ</p>
          </div>
          <div style={{display:'grid',gap:'16px'}}>
            {data.faq.map((item, i) => (
              <div key={i} style={{background:c.bgCard,border:'1px solid '+c.border,borderRadius:'12px',padding:'24px'}}>
                <p style={{fontSize:'1rem',fontWeight:500,color:c.text,margin:'0 0 10px 0'}}>{item.q}</p>
                <p style={{fontSize:'0.95rem',color:c.textSecondary,margin:0,lineHeight:1.7}}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'100px 0',borderTop:'1px solid '+c.border,background:c.bgCard}}>
        <div style={{maxWidth:'600px',margin:'0 auto',padding:'0 24px',textAlign:'center'}}>
          <h2 style={{fontSize:'1.75rem',fontWeight:600,color:c.text,marginBottom:'16px'}}>Ready to talk?</h2>
          <p style={{fontSize:'1.05rem',color:c.textSecondary,marginBottom:'32px',lineHeight:1.7}}>{data.cta}</p>
          <a href="https://calendar.app.google/LUhpKq7nBNLpLiBWA" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}><Btn primary>Book a Call <Arrow/></Btn></a>
        </div>
      </section>

      <Footer setPage={setPage}/>
    </div>
  );
};

const Contact = ({setPage}) => (
  <div style={{background:c.bg,minHeight:'100vh',color:c.text}}>
    <section style={{paddingTop:'120px',paddingBottom:'100px'}}>
      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'20px',fontSize:'0.75rem',color:c.textTertiary}}>
          <button onClick={()=>setPage('home')} style={{background:'none',border:'none',cursor:'pointer',color:c.textTertiary}}>Home</button>
          <span style={{margin:'0 8px',opacity:0.5}}>/</span><span style={{color:c.textSecondary}}>Contact</span>
        </div>
        
        <div className="contact-grid">
          {/* Left side - Copy */}
          <div>
            <h1 style={{fontSize:'clamp(2rem,5vw,3rem)',fontWeight:600,lineHeight:1.1,letterSpacing:'-0.03em',marginBottom:'24px'}}>Let's talk.</h1>
            <p style={{fontSize:'1.1rem',lineHeight:1.7,color:c.textSecondary,marginBottom:'40px'}}>
              Have a question about our systems? Want to see if we're a fit? Drop us a message and we'll get back to you within 24 hours.
            </p>
            
            <div style={{display:'flex',flexDirection:'column',gap:'24px'}}>
              <div>
                <h3 style={{fontSize:'0.75rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.textTertiary,marginBottom:'8px'}}>Prefer to talk now?</h3>
                <a href="https://calendar.app.google/LUhpKq7nBNLpLiBWA" target="_blank" rel="noopener noreferrer" style={{fontSize:'1rem',color:c.warm,textDecoration:'none',fontWeight:500}}>Book a 20-minute call →</a>
              </div>
              
              <div>
                <h3 style={{fontSize:'0.75rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.textTertiary,marginBottom:'8px'}}>Email directly</h3>
                <a href="mailto:hello@forgelightlabs.com" style={{fontSize:'1rem',color:c.textSecondary,textDecoration:'none'}}>hello@forgelightlabs.com</a>
              </div>
              
              <div>
                <h3 style={{fontSize:'0.75rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.textTertiary,marginBottom:'8px'}}>Follow us</h3>
                <div style={{display:'flex',gap:'16px'}}>
                  <a href="https://linkedin.com/company/forgelightlabs" target="_blank" rel="noopener noreferrer" style={{color:c.textSecondary}}><LinkedInIcon/></a>
                  <a href="https://x.com/forgelightlabs" target="_blank" rel="noopener noreferrer" style={{color:c.textSecondary}}><XIcon/></a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Form */}
          <div style={{background:c.bgCard,border:'1px solid '+c.border,borderRadius:'16px',padding:'32px'}}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
    
    <style>{`
      @media (max-width: 768px) {
        .contact-grid {
          grid-template-columns: 1fr !important;
          gap: 48px !important;
        }
      }
    `}</style>
    
    <Footer setPage={setPage}/>
  </div>
);

// FAQ page
const FAQ = ({setPage}) => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "What does Forgelight Labs do?",
          a: "We build AI-powered revenue infrastructure for businesses. Think of us as the team that builds the systems behind your growth—automated lead capture, outbound outreach, referral generation, content creation, and more. Our systems run 24/7 so you can grow revenue without adding headcount."
        },
        {
          q: "How is this different from hiring a marketing agency?",
          a: "Agencies do work for you. We build systems that do work for you forever. An agency stops when the contract ends. Our systems keep running, compounding, and improving. You own the infrastructure we build."
        },
        {
          q: "What industries do you work with?",
          a: "We work across industries—professional services, real estate, manufacturing, healthcare, home services, and more. If you have a sales process that involves leads, appointments, and deals, we can systematize it."
        },
        {
          q: "How do I know if I'm ready for this?",
          a: "You're ready if: (1) You have a proven offer that people want to buy, (2) You're tired of manual processes eating your time, and (3) You want to scale without proportionally scaling headcount. You're not ready if you're still figuring out product-market fit."
        }
      ]
    },
    {
      category: "Our Systems",
      questions: [
        {
          q: "What is the AI Sales Desk?",
          a: "An AI-powered phone system that answers every call 24/7, qualifies leads based on your criteria, and books appointments directly to your calendar. No missed calls, no voicemail black holes, no phone tag. Works nights, weekends, and holidays."
        },
        {
          q: "What is the Outbound Engine?",
          a: "An automated system that identifies your ideal prospects, runs personalized outreach sequences across email and LinkedIn, handles follow-ups, and books qualified meetings on your calendar. You wake up to opportunities instead of cold call lists."
        },
        {
          q: "What is the Referral Engine?",
          a: "A system that finds potential referral partners, nurtures those relationships automatically, and activates referrals at the right moments. Built for relationship-driven businesses like realtors, mortgage officers, and brokers."
        },
        {
          q: "What is Broker OS?",
          a: "A deal flow management system for business brokers. Organizes opportunities, tracks due diligence, matches buyers with sellers, and gives you visibility into your entire pipeline. One place, zero chaos."
        },
        {
          q: "What is the Content Engine?",
          a: "Done-for-you content creation and publishing. We create content tailored to your voice and audience, deliver it to your inbox for approval, then publish across your channels. You build authority without lifting a finger."
        },
        {
          q: "What does Website Design include?",
          a: "Strategy, design, and development of a conversion-focused website. Fast, modern, mobile-first, and built to turn visitors into customers. Includes SEO fundamentals, analytics setup, and a site you're proud to share."
        }
      ]
    },
    {
      category: "Pricing & Timeline",
      questions: [
        {
          q: "How much does it cost?",
          a: "Pricing depends on which systems you need and the complexity of your setup. Most clients invest between $2,000-$10,000/month depending on scope. We'll give you exact pricing on a call after understanding your needs."
        },
        {
          q: "Is there a setup fee?",
          a: "Some systems have a one-time setup fee to cover the initial build, training, and integration work. This varies by system. We'll cover all costs transparently on our call."
        },
        {
          q: "How long does it take to go live?",
          a: "Most systems go live in 7-21 days. Simple systems like AI Sales Desk can be live in a week. More complex builds like Broker OS or multi-system implementations take 2-3 weeks."
        },
        {
          q: "Are there long-term contracts?",
          a: "No. After the initial setup period, our engagements are month-to-month. We keep clients because the systems work, not because of contracts."
        }
      ]
    },
    {
      category: "Working Together",
      questions: [
        {
          q: "What do I need to provide?",
          a: "Access to relevant accounts (email, calendar, CRM), information about your ideal customers and sales process, and about 2-3 hours of your time during setup for discovery and training. We handle everything else."
        },
        {
          q: "How much of my time will this take?",
          a: "During setup: 2-3 hours total for discovery calls and review. After launch: minimal—most systems are designed to run autonomously. You'll review dashboards and results, but the heavy lifting is automated."
        },
        {
          q: "What if it doesn't work for my business?",
          a: "We'll tell you upfront if we don't think it's a fit. We only take on projects where we're confident we can deliver results. If something isn't working after launch, we iterate until it does."
        },
        {
          q: "Do I own what you build?",
          a: "Yes. The systems, automations, and infrastructure we build are yours. If we part ways, you keep everything."
        }
      ]
    },
    {
      category: "Technology & Security",
      questions: [
        {
          q: "What technology do you use?",
          a: "We use best-in-class AI and automation tools—the specific stack depends on your needs and existing systems. Common tools include advanced AI models for conversation and content, CRM integrations, email automation platforms, and custom-built workflows."
        },
        {
          q: "Is my data secure?",
          a: "Yes. We follow industry best practices for data security. Your data is encrypted in transit and at rest, access is strictly controlled, and we never share or sell your information. Happy to discuss specifics on a call."
        },
        {
          q: "Will this integrate with my existing tools?",
          a: "Usually, yes. We integrate with most major CRMs (HubSpot, Salesforce, Pipedrive, etc.), calendar systems, email providers, and other business tools. We'll confirm compatibility during our discovery call."
        }
      ]
    }
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div style={{background:c.bg,minHeight:'100vh',color:c.text}}>
      <section style={{paddingTop:'120px',paddingBottom:'80px'}}>
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
          <div style={{marginBottom:'20px',fontSize:'0.75rem',color:c.textTertiary}}>
            <button onClick={()=>setPage('home')} style={{background:'none',border:'none',cursor:'pointer',color:c.textTertiary}}>Home</button>
            <span style={{margin:'0 8px',opacity:0.5}}>/</span><span style={{color:c.textSecondary}}>FAQ</span>
          </div>
          <h1 style={{fontSize:'clamp(2rem,5vw,3rem)',fontWeight:600,lineHeight:1.1,letterSpacing:'-0.03em',marginBottom:'16px'}}>Frequently Asked Questions</h1>
          <p style={{fontSize:'1.1rem',lineHeight:1.7,color:c.textSecondary,marginBottom:'48px'}}>
            Everything you need to know about working with Forgelight Labs.
          </p>
          
          {faqs.map((category, catIndex) => (
            <div key={catIndex} style={{marginBottom:'48px'}}>
              <h2 style={{fontSize:'0.75rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,marginBottom:'20px'}}>{category.category}</h2>
              <div style={{display:'flex',flexDirection:'column',gap:'2px'}}>
                {category.questions.map((item, qIndex) => {
                  const isOpen = openIndex === `${catIndex}-${qIndex}`;
                  return (
                    <div key={qIndex} style={{borderBottom:'1px solid '+c.border}}>
                      <button 
                        onClick={() => toggleQuestion(catIndex, qIndex)}
                        style={{
                          width:'100%',
                          display:'flex',
                          justifyContent:'space-between',
                          alignItems:'center',
                          padding:'20px 0',
                          background:'none',
                          border:'none',
                          cursor:'pointer',
                          textAlign:'left'
                        }}
                      >
                        <span style={{fontSize:'1rem',fontWeight:500,color:c.text,paddingRight:'16px'}}>{item.q}</span>
                        <span style={{color:c.textTertiary,fontSize:'1.5rem',lineHeight:1,flexShrink:0,transition:'transform 0.2s',transform:isOpen?'rotate(45deg)':'rotate(0deg)'}}>+</span>
                      </button>
                      {isOpen && (
                        <div style={{paddingBottom:'20px'}}>
                          <p style={{fontSize:'0.95rem',lineHeight:1.7,color:c.textSecondary,margin:0}}>{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          
          <div style={{background:c.bgCard,border:'1px solid '+c.border,borderRadius:'16px',padding:'40px',textAlign:'center',marginTop:'60px'}}>
            <h3 style={{fontSize:'1.25rem',fontWeight:600,marginBottom:'12px'}}>Still have questions?</h3>
            <p style={{fontSize:'0.95rem',color:c.textSecondary,marginBottom:'24px'}}>Book a call and we'll answer everything.</p>
            <div style={{display:'flex',justifyContent:'center',gap:'12px'}}>
              <a href="https://calendar.app.google/LUhpKq7nBNLpLiBWA" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}><Btn primary>Book a Call <Arrow/></Btn></a>
              <button onClick={()=>setPage('contact')} style={{background:'none',border:'none',cursor:'pointer'}}><Btn>Contact Us</Btn></button>
            </div>
          </div>
        </div>
      </section>
      <Footer setPage={setPage}/>
    </div>
  );
};

// Blog listing page
const Blog = ({setPage}) => {
  const posts = [
    {
      slug: 'what-is-revenue-infrastructure',
      title: 'What is Revenue Infrastructure?',
      excerpt: 'Revenue infrastructure is the system of tools, automations, and processes that generate revenue for your business—without requiring proportional increases in headcount.',
      date: 'December 2024',
      readTime: '5 min read'
    }
  ];

  return (
    <div style={{background:c.bg,minHeight:'100vh',color:c.text}}>
      <section style={{paddingTop:'120px',paddingBottom:'80px'}}>
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
          <div style={{marginBottom:'20px',fontSize:'0.75rem',color:c.textTertiary}}>
            <button onClick={()=>setPage('home')} style={{background:'none',border:'none',cursor:'pointer',color:c.textTertiary}}>Home</button>
            <span style={{margin:'0 8px',opacity:0.5}}>/</span><span style={{color:c.textSecondary}}>Blog</span>
          </div>
          <h1 style={{fontSize:'clamp(2rem,5vw,3rem)',fontWeight:600,lineHeight:1.1,letterSpacing:'-0.03em',marginBottom:'16px'}}>Blog</h1>
          <p style={{fontSize:'1.1rem',lineHeight:1.7,color:c.textSecondary,marginBottom:'48px'}}>
            Thoughts on AI, automation, and building revenue systems that scale.
          </p>
          
          <div style={{display:'flex',flexDirection:'column',gap:'24px'}}>
            {posts.map((post, i) => (
              <article key={i} style={{background:c.bgCard,border:'1px solid '+c.border,borderRadius:'16px',padding:'32px',cursor:'pointer',transition:'border-color 0.2s'}} onClick={()=>setPage('blog-'+post.slug)}>
                <div style={{display:'flex',gap:'16px',fontSize:'0.8rem',color:c.textTertiary,marginBottom:'16px'}}>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 style={{fontSize:'1.5rem',fontWeight:600,marginBottom:'12px',color:c.text}}>{post.title}</h2>
                <p style={{fontSize:'1rem',lineHeight:1.6,color:c.textSecondary,margin:0}}>{post.excerpt}</p>
              </article>
            ))}
          </div>

          {posts.length === 1 && (
            <p style={{textAlign:'center',color:c.textTertiary,marginTop:'48px',fontSize:'0.9rem'}}>More posts coming soon.</p>
          )}
        </div>
      </section>
      <Footer setPage={setPage}/>
    </div>
  );
};

// Blog post page
const BlogPost = ({setPage, slug}) => {
  const posts = {
    'what-is-revenue-infrastructure': {
      title: 'What is Revenue Infrastructure?',
      date: 'December 2024',
      readTime: '5 min read',
      content: `
Revenue infrastructure is the system of tools, automations, and processes that generate revenue for your business—without requiring proportional increases in headcount.

Think about it this way: most businesses grow by adding people. More salespeople, more customer service reps, more marketers. Revenue goes up, but so does payroll. You're trading time for money at scale.

Revenue infrastructure flips that model. Instead of adding people, you add systems. Systems that work 24/7. Systems that don't call in sick. Systems that compound over time.

## What Revenue Infrastructure Looks Like

Here's a concrete example. A typical service business might have:

**Without infrastructure:**
- Phone rings → receptionist answers (maybe)
- Lead info written on paper or typed into spreadsheet
- Salesperson follows up when they remember
- Appointment scheduled via back-and-forth emails
- Lead falls through cracks, competitor wins

**With infrastructure:**
- Phone rings → AI answers instantly, 24/7
- Lead automatically qualified and entered into CRM
- Automated sequence nurtures lead immediately
- Appointment booked directly to calendar
- Nothing falls through cracks

Same lead, completely different outcome. The second version requires zero additional headcount and works at 3 AM on a Sunday.

## The Components

Revenue infrastructure typically includes:

**1. Lead Capture Systems**
Everything that brings prospects into your world—website forms, phone systems, chat widgets, landing pages. The goal: never miss an opportunity to start a conversation.

**2. Nurture Sequences**
Automated follow-up that keeps you top of mind. Email sequences, SMS follow-ups, retargeting ads. The goal: stay in front of prospects until they're ready to buy.

**3. Booking & Scheduling**
Frictionless ways for prospects to get on your calendar. Online scheduling, automated reminders, no-show follow-ups. The goal: convert interest into conversations.

**4. Pipeline Management**
Systems to track every opportunity from first touch to closed deal. CRM workflows, deal stages, forecasting. The goal: know exactly where you stand at all times.

**5. Referral Systems**
Automated ways to generate word-of-mouth. Partner nurturing, review requests, referral tracking. The goal: turn happy customers into your sales force.

## Why It Matters Now

AI has changed the game. Five years ago, building this kind of infrastructure required a team of developers and six-figure budgets. Today, AI can handle conversations, qualify leads, write content, and manage complex workflows.

The businesses that build this infrastructure now will compound their advantage. The ones that wait will find themselves competing against companies that can do more with less.

## Getting Started

You don't need to build everything at once. Start with your biggest bottleneck:

- Missing calls? Start with an AI phone system.
- Empty pipeline? Start with outbound automation.
- No time for content? Start with a content engine.

Each system you add compounds the effectiveness of the others. An AI that answers calls is good. An AI that answers calls and feeds qualified leads into an automated nurture sequence that books meetings is a revenue machine.

That's revenue infrastructure.
      `
    }
  };

  const post = posts[slug];
  
  if (!post) {
    return (
      <div style={{background:c.bg,minHeight:'100vh',color:c.text,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{textAlign:'center'}}>
          <h1 style={{fontSize:'2rem',marginBottom:'16px'}}>Post not found</h1>
          <button onClick={()=>setPage('blog')} style={{background:'none',border:'none',cursor:'pointer',color:c.warm}}>← Back to blog</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{background:c.bg,minHeight:'100vh',color:c.text}}>
      <article style={{paddingTop:'120px',paddingBottom:'80px'}}>
        <div style={{maxWidth:'700px',margin:'0 auto',padding:'0 24px'}}>
          <div style={{marginBottom:'20px',fontSize:'0.75rem',color:c.textTertiary}}>
            <button onClick={()=>setPage('home')} style={{background:'none',border:'none',cursor:'pointer',color:c.textTertiary}}>Home</button>
            <span style={{margin:'0 8px',opacity:0.5}}>/</span>
            <button onClick={()=>setPage('blog')} style={{background:'none',border:'none',cursor:'pointer',color:c.textTertiary}}>Blog</button>
            <span style={{margin:'0 8px',opacity:0.5}}>/</span>
            <span style={{color:c.textSecondary}}>Article</span>
          </div>
          
          <div style={{display:'flex',gap:'16px',fontSize:'0.85rem',color:c.textTertiary,marginBottom:'24px'}}>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          
          <h1 style={{fontSize:'clamp(2rem,5vw,3rem)',fontWeight:600,lineHeight:1.2,letterSpacing:'-0.03em',marginBottom:'48px'}}>{post.title}</h1>
          
          <div style={{fontSize:'1.1rem',lineHeight:1.8,color:c.textSecondary}}>
            {post.content.trim().split('\n\n').map((para, i) => {
              if (para.startsWith('## ')) {
                return <h2 key={i} style={{fontSize:'1.5rem',fontWeight:600,color:c.text,marginTop:'48px',marginBottom:'24px'}}>{para.replace('## ', '')}</h2>;
              }
              if (para.startsWith('**') && para.endsWith('**')) {
                return <h3 key={i} style={{fontSize:'1.1rem',fontWeight:600,color:c.text,marginTop:'32px',marginBottom:'12px'}}>{para.replace(/\*\*/g, '')}</h3>;
              }
              if (para.startsWith('- ')) {
                return (
                  <ul key={i} style={{margin:'16px 0',paddingLeft:'24px'}}>
                    {para.split('\n').map((item, j) => (
                      <li key={j} style={{marginBottom:'8px'}}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={i} style={{marginBottom:'24px'}}>{para}</p>;
            })}
          </div>
          
          <div style={{borderTop:'1px solid '+c.border,marginTop:'60px',paddingTop:'40px'}}>
            <h3 style={{fontSize:'1.25rem',fontWeight:600,marginBottom:'16px'}}>Ready to build your revenue infrastructure?</h3>
            <p style={{fontSize:'1rem',color:c.textSecondary,marginBottom:'24px'}}>Book a 20-minute call to see what's possible for your business.</p>
            <a href="https://calendar.app.google/LUhpKq7nBNLpLiBWA" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}><Btn primary>Book a Call <Arrow/></Btn></a>
          </div>
        </div>
      </article>
      <Footer setPage={setPage}/>
    </div>
  );
};

// Call Network page - for publishers and buyers
const CallNetwork = ({setPage}) => {
  const verticals = ['Auto Insurance', 'Health Insurance', 'Life Insurance', 'Medicare', 'Home Services', 'Solar', 'Legal/MVA'];
  
  return (
    <div style={{background:c.bg,minHeight:'100vh',color:c.text}}>
      {/* Hero - Split messaging */}
      <section style={{position:'relative',paddingTop:'120px',paddingBottom:'80px',minHeight:'80vh',display:'flex',alignItems:'center',overflow:'hidden'}}>
        <CallNetworkAnimation />
        <div style={{maxWidth:'900px',margin:'0 auto',padding:'0 24px',position:'relative',zIndex:1}}>
          <div style={{marginBottom:'20px',fontSize:'0.75rem',color:c.textTertiary}}>
            <button onClick={()=>setPage('home')} style={{background:'none',border:'none',cursor:'pointer',color:c.textTertiary}}>Home</button>
            <span style={{margin:'0 8px',opacity:0.5}}>/</span><span style={{color:c.textSecondary}}>Call Network</span>
          </div>
          <h1 style={{fontSize:'clamp(2rem,5vw,3.5rem)',fontWeight:600,lineHeight:1.1,letterSpacing:'-0.03em',marginBottom:'16px'}}>High-intent calls.<br/>Reliable partners.</h1>
          <p style={{fontSize:'1.1rem',lineHeight:1.6,color:c.textSecondary,marginBottom:'32px',maxWidth:'600px'}}>
            Connecting publishers who generate calls with buyers who close them. One point of contact. Consistent quality. Managed relationships.
          </p>
          <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
            <button onClick={()=>document.getElementById('publishers')?.scrollIntoView({behavior:'smooth'})} style={{background:'none',border:'none',padding:0,cursor:'pointer'}}><Btn primary>I Have Calls <Arrow/></Btn></button>
            <button onClick={()=>document.getElementById('buyers')?.scrollIntoView({behavior:'smooth'})} style={{background:'none',border:'none',padding:0,cursor:'pointer'}}><Btn>I Need Calls <Arrow/></Btn></button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{padding:'80px 0',borderTop:'1px solid '+c.border}}>
        <div style={{maxWidth:'1000px',margin:'0 auto',padding:'0 24px'}}>
          <div style={{textAlign:'center',marginBottom:'48px'}}>
            <p style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,marginBottom:'12px'}}>How It Works</p>
            <h2 style={{fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:600,letterSpacing:'-0.03em',margin:0}}>The Forgelight Difference</h2>
          </div>
          
          <div className="how-it-works-grid">
            <div style={{background:c.bgCard,border:'1px solid '+c.border,borderRadius:'16px',padding:'32px'}}>
              <div style={{width:'48px',height:'48px',background:c.accentSubtle,borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'20px'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c.warm} strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3 style={{fontSize:'1.1rem',fontWeight:600,marginBottom:'12px'}}>For Publishers</h3>
              <p style={{fontSize:'0.9rem',color:c.textSecondary,lineHeight:1.6,margin:0}}>
                You generate calls. We find qualified buyers, negotiate rates, and guarantee payment. Focus on traffic—we handle the rest.
              </p>
            </div>
            
            <div style={{background:c.bgCard,border:'1px solid '+c.border,borderRadius:'16px',padding:'32px'}}>
              <div style={{width:'48px',height:'48px',background:c.accentSubtle,borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'20px'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c.warm} strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <h3 style={{fontSize:'1.1rem',fontWeight:600,marginBottom:'12px'}}>For Buyers</h3>
              <p style={{fontSize:'0.9rem',color:c.textSecondary,lineHeight:1.6,margin:0}}>
                You need calls. We vet publishers, manage quality, and handle disputes. One point of contact for consistent, qualified volume.
              </p>
            </div>
            
            <div style={{background:c.bgCard,border:'1px solid '+c.border,borderRadius:'16px',padding:'32px'}}>
              <div style={{width:'48px',height:'48px',background:c.accentSubtle,borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'20px'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c.warm} strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              <h3 style={{fontSize:'1.1rem',fontWeight:600,marginBottom:'12px'}}>Managed Network</h3>
              <p style={{fontSize:'0.9rem',color:c.textSecondary,lineHeight:1.6,margin:0}}>
                We track every call, monitor quality weekly, and resolve issues before they become problems. Data-driven, transparent, reliable.
              </p>
            </div>
          </div>
        </div>
        
        <style>{`
          @media (max-width: 768px) {
            .how-it-works-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* For Publishers */}
      <section id="publishers" style={{padding:'80px 0',borderTop:'1px solid '+c.border}}>
        <div style={{maxWidth:'900px',margin:'0 auto',padding:'0 24px'}}>
          <div className="publisher-grid">
            <div>
              <p style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,marginBottom:'12px'}}>For Publishers</p>
              <h2 style={{fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:600,letterSpacing:'-0.02em',marginBottom:'20px'}}>You generate the calls.<br/>We handle the rest.</h2>
              <p style={{fontSize:'1rem',color:c.textSecondary,lineHeight:1.7,marginBottom:'24px'}}>
                Stop chasing payments and managing buyer relationships. Partner with us and focus on what you do best—generating quality traffic.
              </p>
              <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'28px'}}>
                {['Guaranteed weekly payouts','Access to vetted, high-capacity buyers','One point of contact for all deals','Transparent tracking and reporting','No exclusivity requirements'].map((item,i) => (
                  <div key={i} style={{display:'flex',alignItems:'center',gap:'12px'}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <span style={{fontSize:'0.9rem',color:c.textSecondary}}>{item}</span>
                  </div>
                ))}
              </div>
              <a href="https://calendar.app.google/LUhpKq7nBNLpLiBWA" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}><Btn primary>Partner With Us <Arrow/></Btn></a>
            </div>
            <div style={{background:c.bgCard,border:'1px solid '+c.border,borderRadius:'16px',padding:'32px'}}>
              <h3 style={{fontSize:'1rem',fontWeight:600,marginBottom:'20px'}}>What we need from you:</h3>
              <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                {[
                  {label:'Traffic source',desc:'Where your calls come from'},
                  {label:'Vertical focus',desc:'Insurance, home services, legal, etc.'},
                  {label:'Daily volume',desc:'How many calls you can generate'},
                  {label:'Geographic coverage',desc:'States or regions you cover'},
                  {label:'Current payout',desc:'What you are getting now'}
                ].map((item,i) => (
                  <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',paddingBottom:'16px',borderBottom:i<4?'1px solid '+c.border:'none'}}>
                    <div>
                      <div style={{fontSize:'0.9rem',fontWeight:500,color:c.text}}>{item.label}</div>
                      <div style={{fontSize:'0.8rem',color:c.textTertiary}}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <style>{`
          @media (max-width: 768px) {
            .publisher-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </section>

      {/* For Buyers */}
      <section id="buyers" style={{padding:'80px 0',borderTop:'1px solid '+c.border}}>
        <div style={{maxWidth:'900px',margin:'0 auto',padding:'0 24px'}}>
          <div className="buyer-grid">
            <div>
              <p style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,marginBottom:'12px'}}>For Buyers</p>
              <h2 style={{fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:600,letterSpacing:'-0.02em',marginBottom:'20px'}}>Calls that close.<br/>Sources you can trust.</h2>
              <p style={{fontSize:'1rem',color:c.textSecondary,lineHeight:1.7,marginBottom:'24px'}}>
                Stop managing a dozen publishers with inconsistent quality. Get vetted, qualified calls from a managed network with one point of contact.
              </p>
              <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'28px'}}>
                {['All publishers pre-vetted before sending traffic','Quality tracked and reported weekly','Disputes handled directly','Scale up or down based on capacity','No long-term contracts required'].map((item,i) => (
                  <div key={i} style={{display:'flex',alignItems:'center',gap:'12px'}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <span style={{fontSize:'0.9rem',color:c.textSecondary}}>{item}</span>
                  </div>
                ))}
              </div>
              <a href="https://calendar.app.google/LUhpKq7nBNLpLiBWA" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}><Btn primary>Get Calls <Arrow/></Btn></a>
            </div>
            <div style={{background:c.bgCard,border:'1px solid '+c.border,borderRadius:'16px',padding:'32px'}}>
              <h3 style={{fontSize:'1rem',fontWeight:600,marginBottom:'20px'}}>What we deliver:</h3>
              <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                {[
                  {label:'Qualified calls',desc:'Pre-vetted, intent-verified leads'},
                  {label:'Consistent volume',desc:'Predictable daily/weekly flow'},
                  {label:'Quality monitoring',desc:'Weekly reports, dispute resolution'},
                  {label:'Flexible terms',desc:'Test before you commit'},
                  {label:'Single invoice',desc:'One vendor, simple accounting'}
                ].map((item,i) => (
                  <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',paddingBottom:'16px',borderBottom:i<4?'1px solid '+c.border:'none'}}>
                    <div>
                      <div style={{fontSize:'0.9rem',fontWeight:500,color:c.text}}>{item.label}</div>
                      <div style={{fontSize:'0.8rem',color:c.textTertiary}}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <style>{`
          @media (max-width: 768px) {
            .buyer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </section>

      {/* Verticals */}
      <section style={{padding:'80px 0',borderTop:'1px solid '+c.border}}>
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px',textAlign:'center'}}>
          <p style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,marginBottom:'12px'}}>Verticals</p>
          <h2 style={{fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:600,letterSpacing:'-0.02em',marginBottom:'32px'}}>Industries We Serve</h2>
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'12px'}}>
            {verticals.map((v,i) => (
              <div key={i} style={{padding:'12px 24px',background:c.bgCard,border:'1px solid '+c.border,borderRadius:'100px',fontSize:'0.9rem',color:c.textSecondary}}>
                {v}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Forgelight */}
      <section style={{padding:'80px 0',borderTop:'1px solid '+c.border}}>
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
          <div style={{textAlign:'center',marginBottom:'48px'}}>
            <p style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,marginBottom:'12px'}}>Why Forgelight</p>
            <h2 style={{fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:600,letterSpacing:'-0.02em',margin:0}}>We don't just broker calls.<br/>We build the infrastructure.</h2>
          </div>
          <p style={{fontSize:'1rem',color:c.textSecondary,lineHeight:1.7,textAlign:'center',marginBottom:'32px'}}>
            Forgelight Labs builds AI-powered revenue systems. We understand lead generation from every angle—from the ad click to the closed deal. When you work with us, you're working with operators who have skin in the game.
          </p>
          <div className="why-grid" style={{marginTop:'40px'}}>
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:'2rem',fontWeight:600,color:c.warm,marginBottom:'8px'}}>24/7</div>
              <div style={{fontSize:'0.85rem',color:c.textSecondary}}>Network monitoring</div>
            </div>
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:'2rem',fontWeight:600,color:c.warm,marginBottom:'8px'}}>Weekly</div>
              <div style={{fontSize:'0.85rem',color:c.textSecondary}}>Quality reports</div>
            </div>
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:'2rem',fontWeight:600,color:c.warm,marginBottom:'8px'}}>100%</div>
              <div style={{fontSize:'0.85rem',color:c.textSecondary}}>On-time payments</div>
            </div>
          </div>
        </div>
        
        <style>{`
          @media (max-width: 768px) {
            .why-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
        `}</style>
      </section>

      {/* Cross-sell */}
      <section style={{padding:'60px 0',borderTop:'1px solid '+c.border,background:c.bgCard}}>
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px',textAlign:'center'}}>
          <p style={{fontSize:'0.9rem',color:c.textSecondary,marginBottom:'16px'}}>
            <span style={{fontWeight:600,color:c.text}}>Need more than calls?</span> We also build AI systems for businesses that want to capture more leads, answer more calls, and close more deals.
          </p>
          <button onClick={()=>setPage('home')} style={{background:'none',border:'none',cursor:'pointer',color:c.warm,fontSize:'0.9rem',fontWeight:500}}>
            See our AI services →
          </button>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'100px 0 120px'}}>
        <div style={{maxWidth:'600px',margin:'0 auto',padding:'0 24px',textAlign:'center'}}>
          <h2 style={{fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:600,letterSpacing:'-0.03em',margin:0,color:c.text,lineHeight:1.2}}>Ready to talk?</h2>
          <p style={{fontSize:'1rem',color:c.textSecondary,margin:'20px 0 32px 0',lineHeight:1.6}}>Whether you have calls or need calls, let's see if there's a fit.</p>
          <div style={{display:'flex',justifyContent:'center',gap:'12px',flexWrap:'wrap'}}>
            <a href="https://calendar.app.google/LUhpKq7nBNLpLiBWA" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}><Btn primary>Book a Call <Arrow/></Btn></a>
            <a href="mailto:calls@forgelightlabs.com" style={{textDecoration:'none'}}><Btn>Email Us</Btn></a>
          </div>
        </div>
      </section>

      <Footer setPage={setPage}/>
    </div>
  );
};

// Cookie Banner component
const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setTimeout(() => setVisible(true), 1500);
    }
  }, []);
  
  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
    // Initialize analytics after consent
    initAnalytics();
  };
  
  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  };
  
  if (!visible) return null;
  
  return (
    <div style={{
      position:'fixed',
      bottom:'24px',
      left:'24px',
      right:'24px',
      maxWidth:'480px',
      background:c.bgCard,
      border:'1px solid '+c.border,
      borderRadius:'16px',
      padding:'20px 24px',
      zIndex:999,
      boxShadow:'0 10px 40px rgba(0,0,0,0.3)'
    }}>
      <p style={{fontSize:'0.9rem',color:c.textSecondary,margin:'0 0 16px 0',lineHeight:1.5}}>
        We use cookies to analyze site traffic and improve your experience. 
      </p>
      <div style={{display:'flex',gap:'12px'}}>
        <button onClick={accept} style={{flex:1,padding:'10px 16px',background:c.warm,color:c.bg,border:'none',borderRadius:'8px',fontSize:'0.85rem',fontWeight:600,cursor:'pointer'}}>Accept</button>
        <button onClick={decline} style={{flex:1,padding:'10px 16px',background:'transparent',color:c.textSecondary,border:'1px solid '+c.border,borderRadius:'8px',fontSize:'0.85rem',fontWeight:500,cursor:'pointer'}}>Decline</button>
      </div>
    </div>
  );
};

// Analytics initialization (Google Analytics placeholder)
const initAnalytics = () => {
  // Replace GA_MEASUREMENT_ID with your actual Google Analytics ID
  const GA_ID = 'G-XXXXXXXXXX';
  
  // Only load if not already loaded
  if (window.gtag) return;
  
  // Load Google Analytics script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);
  
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);
};

// Check for existing consent on load
const checkAnalyticsConsent = () => {
  const consent = localStorage.getItem('cookie-consent');
  if (consent === 'accepted') {
    initAnalytics();
  }
};

// Money Page Component - Industry-specific landing pages
const MoneyPage = ({ setPage, data }) => {
  const [calcCalls, setCalcCalls] = React.useState(5);
  const [calcValue, setCalcValue] = React.useState(data.avgJobValue || 5000);
  const [calcClose, setCalcClose] = React.useState(40);
  
  // Calculate missed revenue
  const weeklyLoss = Math.round(calcCalls * (calcClose/100) * calcValue);
  const yearlyLoss = weeklyLoss * 52;
  
  // Generate FAQ Schema JSON-LD
  const faqSchema = data.faq && data.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  // Add schema to head on mount
  React.useEffect(() => {
    if (faqSchema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(faqSchema);
      script.id = 'faq-schema';
      document.head.appendChild(script);
      return () => {
        const existing = document.getElementById('faq-schema');
        if (existing) existing.remove();
      };
    }
  }, []);

  // Comparison data based on service type
  const getComparisonData = () => {
    if (data.parentService === 'ai-front-desk') {
      return {
        title: 'AI Receptionist vs. Traditional Options',
        subtitle: 'See how an AI receptionist compares to what you\'re doing now.',
        options: [
          { 
            name: 'Voicemail', 
            availability: '0%', 
            cost: 'Free', 
            quality: 'No qualification',
            result: '3% callback rate',
            verdict: 'Losing 97% of after-hours leads'
          },
          { 
            name: 'Answering Service', 
            availability: '24/7', 
            cost: '$300-800/mo', 
            quality: 'Basic messages only',
            result: 'No booking, no qualifying',
            verdict: 'Still requires callback'
          },
          { 
            name: 'Additional Staff', 
            availability: 'Business hours', 
            cost: '$3,500-5,000/mo', 
            quality: 'Full capability',
            result: 'Can book and qualify',
            verdict: 'Expensive, limited hours'
          },
          { 
            name: 'AI Receptionist', 
            availability: '24/7/365', 
            cost: 'Fraction of staff', 
            quality: 'Qualifies + books',
            result: 'Appointments on calendar',
            verdict: 'Best of all options',
            highlight: true
          }
        ]
      };
    }
    if (data.parentService === 'ai-outbound') {
      return {
        title: 'AI Outbound vs. Traditional Sales Development',
        subtitle: 'See how AI-powered outbound compares to hiring SDRs.',
        options: [
          { 
            name: 'No Outbound', 
            availability: 'N/A', 
            cost: '$0', 
            quality: 'Hope for referrals',
            result: 'Unpredictable pipeline',
            verdict: 'Growth limited by luck'
          },
          { 
            name: 'Hire SDR', 
            availability: '40 hrs/week', 
            cost: '$80-130K/year', 
            quality: '12-15 meetings/mo',
            result: '$700+ per meeting',
            verdict: 'Expensive, high turnover'
          },
          { 
            name: 'Outsourced Agency', 
            availability: 'Variable', 
            cost: '$5-15K/mo', 
            quality: 'Mixed results',
            result: 'Less control',
            verdict: 'Quality concerns'
          },
          { 
            name: 'AI Outbound System', 
            availability: '24/7', 
            cost: 'Fraction of SDR', 
            quality: 'Personalized at scale',
            result: 'Qualified meetings booked',
            verdict: '10x efficiency',
            highlight: true
          }
        ]
      };
    }
    if (data.parentService === 'referral') {
      return {
        title: 'Systematic Referrals vs. Hope',
        subtitle: 'See how a referral system compares to what most do.',
        options: [
          { 
            name: 'Hope & Wait', 
            availability: 'N/A', 
            cost: '$0', 
            quality: 'Random referrals',
            result: 'Inconsistent revenue',
            verdict: 'Not a strategy'
          },
          { 
            name: 'Manual Outreach', 
            availability: 'When you remember', 
            cost: 'Your time', 
            quality: 'Sporadic touches',
            result: 'Relationships fade',
            verdict: 'Unsustainable'
          },
          { 
            name: 'CRM Reminders', 
            availability: 'Still manual', 
            cost: '$50-300/mo', 
            quality: 'You still do the work',
            result: 'Falls through cracks',
            verdict: 'Tool without action'
          },
          { 
            name: 'AI Referral Engine', 
            availability: 'Automated', 
            cost: 'Predictable monthly', 
            quality: 'Consistent nurturing',
            result: 'Referrals flow steadily',
            verdict: 'Relationships at scale',
            highlight: true
          }
        ]
      };
    }
    return null;
  };

  const comparison = getComparisonData();

  return (
    <div style={{background:c.bg,minHeight:'100vh',color:c.text}}>
      {/* Hero */}
      <section style={{position:'relative',paddingTop:'120px',paddingBottom:'60px'}}>
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
          <div style={{marginBottom:'20px',fontSize:'0.75rem',color:c.textTertiary}}>
            <button onClick={()=>setPage('home')} style={{background:'none',border:'none',cursor:'pointer',color:c.textTertiary}}>Home</button>
            <span style={{margin:'0 8px',opacity:0.5}}>/</span>
            <button onClick={()=>setPage(data.parentService)} style={{background:'none',border:'none',cursor:'pointer',color:c.textTertiary}}>{data.parentServiceName}</button>
            <span style={{margin:'0 8px',opacity:0.5}}>/</span>
            <span style={{color:c.textSecondary}}>{data.industry}</span>
          </div>
          <h1 style={{fontSize:'clamp(2rem,5vw,3rem)',fontWeight:600,lineHeight:1.1,letterSpacing:'-0.03em',marginBottom:'16px'}}>{data.headline}</h1>
          <p style={{fontSize:'1.1rem',lineHeight:1.6,color:c.textSecondary,marginBottom:'32px',maxWidth:'600px'}}>{data.subheadline}</p>
          <a href="https://calendar.app.google/LUhpKq7nBNLpLiBWA" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}><Btn primary>Book a Call <Arrow/></Btn></a>
        </div>
      </section>

      {/* The Problem */}
      <section style={{padding:'60px 0',borderTop:'1px solid '+c.border}}>
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
          <p style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:'0 0 24px 0'}}>The Problem</p>
          <div style={{fontSize:'1.25rem',lineHeight:1.8,color:c.text,marginBottom:'32px'}}>
            {data.problemStatements.map((statement, i) => (
              <p key={i} style={{margin:'0 0 16px 0'}}>{statement}</p>
            ))}
          </div>
          <p style={{fontSize:'1.1rem',lineHeight:1.7,color:c.text,marginBottom:'32px',opacity:0.85}}>{data.problemContext}</p>
          <div style={{background:c.bgCard,border:'1px solid '+c.border,borderRadius:'12px',padding:'28px'}}>
            <p style={{fontSize:'0.85rem',color:c.textSecondary,margin:'0 0 20px 0',fontWeight:500}}>Here's what the data shows:</p>
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              {data.stats.map((stat, i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'12px'}}>
                  <span style={{color:'#EF4444',fontSize:'1.2rem'}}>•</span>
                  <span style={{fontSize:'1.05rem',color:c.text,opacity:0.9}}><strong style={{color:c.text}}>{stat.value}</strong> {stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What That Costs You */}
      <section style={{padding:'60px 0',borderTop:'1px solid '+c.border}}>
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
          <p style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:'0 0 24px 0'}}>What That Costs You</p>
          <div style={{fontSize:'1.1rem',lineHeight:1.8,color:c.text,opacity:0.9}}>
            {data.costStatements.map((statement, i) => (
              <p key={i} style={{margin:'0 0 20px 0'}} dangerouslySetInnerHTML={{__html: statement}}></p>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Calculator - Only for AI Sales Desk */}
      {data.parentService === 'ai-front-desk' && (
        <section style={{padding:'60px 0',borderTop:'1px solid '+c.border}}>
          <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
            <p style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:'0 0 24px 0'}}>Calculate Your Cost</p>
            <div style={{background:c.bgCard,border:'1px solid '+c.border,borderRadius:'12px',padding:'32px'}}>
              <p style={{fontSize:'1.1rem',color:c.text,margin:'0 0 28px 0',fontWeight:500}}>How much are missed calls costing you?</p>
              
              <div style={{display:'grid',gap:'24px',marginBottom:'32px'}}>
                <div>
                  <label style={{display:'block',fontSize:'0.9rem',color:c.textSecondary,marginBottom:'8px'}}>
                    Missed calls per week: <strong style={{color:c.text}}>{calcCalls}</strong>
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="20" 
                    value={calcCalls} 
                    onChange={(e) => setCalcCalls(Number(e.target.value))}
                    style={{width:'100%',accentColor:c.accent}}
                  />
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.75rem',color:c.textTertiary}}>
                    <span>1</span><span>20</span>
                  </div>
                </div>
                
                <div>
                  <label style={{display:'block',fontSize:'0.9rem',color:c.textSecondary,marginBottom:'8px'}}>
                    Average job value: <strong style={{color:c.text}}>${calcValue.toLocaleString()}</strong>
                  </label>
                  <input 
                    type="range" 
                    min="500" 
                    max="50000" 
                    step="500"
                    value={calcValue} 
                    onChange={(e) => setCalcValue(Number(e.target.value))}
                    style={{width:'100%',accentColor:c.accent}}
                  />
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.75rem',color:c.textTertiary}}>
                    <span>$500</span><span>$50,000</span>
                  </div>
                </div>
                
                <div>
                  <label style={{display:'block',fontSize:'0.9rem',color:c.textSecondary,marginBottom:'8px'}}>
                    Close rate: <strong style={{color:c.text}}>{calcClose}%</strong>
                  </label>
                  <input 
                    type="range" 
                    min="10" 
                    max="80" 
                    step="5"
                    value={calcClose} 
                    onChange={(e) => setCalcClose(Number(e.target.value))}
                    style={{width:'100%',accentColor:c.accent}}
                  />
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.75rem',color:c.textTertiary}}>
                    <span>10%</span><span>80%</span>
                  </div>
                </div>
              </div>
              
              <div style={{background:c.bg,borderRadius:'8px',padding:'24px',textAlign:'center'}}>
                <p style={{fontSize:'0.85rem',color:c.textSecondary,margin:'0 0 8px 0'}}>You're losing approximately</p>
                <p style={{fontSize:'2.5rem',fontWeight:700,color:'#EF4444',margin:'0 0 4px 0',letterSpacing:'-0.02em'}}>
                  ${yearlyLoss.toLocaleString()}/year
                </p>
                <p style={{fontSize:'0.9rem',color:c.textSecondary,margin:0}}>
                  (${weeklyLoss.toLocaleString()} per week × 52 weeks)
                </p>
              </div>
              
              <p style={{fontSize:'0.85rem',color:c.textTertiary,margin:'20px 0 0 0',textAlign:'center'}}>
                An AI receptionist typically costs less than one lost job per month.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* How We Fix It */}
      <section style={{padding:'60px 0',borderTop:'1px solid '+c.border}}>
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
          <p style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:'0 0 24px 0'}}>How We Fix It</p>
          <p style={{fontSize:'1.1rem',lineHeight:1.6,color:c.text,marginBottom:'16px'}}>{data.solutionIntro}</p>
          {data.solutionSubIntro && <p style={{fontSize:'1rem',lineHeight:1.6,color:c.text,opacity:0.85,marginBottom:'32px'}}>{data.solutionSubIntro}</p>}
          <div style={{display:'flex',flexDirection:'column',gap:'16px',marginBottom:'32px'}}>
            {data.features.map((feature, i) => (
              <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'16px',padding:'20px',background:c.bgCard,border:'1px solid '+c.border,borderRadius:'12px'}}>
                <div style={{width:'32px',height:'32px',background:'rgba(34,197,94,0.1)',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <p style={{fontSize:'0.95rem',color:c.text,margin:0,fontWeight:500}}>{feature.title}</p>
                  <p style={{fontSize:'0.85rem',color:c.textSecondary,margin:'4px 0 0 0'}}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{fontSize:'1.15rem',lineHeight:1.6,color:c.text,opacity:0.9,marginTop:'8px'}}>{data.solutionOutcome}</p>
        </div>
      </section>

      {/* What Changes */}
      <section style={{padding:'60px 0',borderTop:'1px solid '+c.border}}>
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
          <p style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:'0 0 24px 0'}}>What Changes</p>
          <div className="two-col-grid">
            <div style={{background:c.bgCard,border:'1px solid '+c.border,borderRadius:'12px',padding:'24px'}}>
              <p style={{fontSize:'0.75rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:'#EF4444',margin:'0 0 16px 0'}}>Before</p>
              <p style={{fontSize:'0.9rem',color:c.textSecondary,margin:0,lineHeight:1.6}}>{data.before}</p>
            </div>
            <div style={{background:c.bgCard,border:'1px solid '+c.border,borderRadius:'12px',padding:'24px'}}>
              <p style={{fontSize:'0.75rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:'#22C55E',margin:'0 0 16px 0'}}>After</p>
              <p style={{fontSize:'0.9rem',color:c.textSecondary,margin:0,lineHeight:1.6}}>{data.after}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Forgelight */}
      <section style={{padding:'60px 0',borderTop:'1px solid '+c.border}}>
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
          <p style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:'0 0 24px 0'}}>Why Us</p>
          {data.whyUsIntro ? (
            <div style={{fontSize:'1.05rem',lineHeight:1.8,color:c.text}}>
              <p style={{margin:'0 0 20px 0',fontWeight:500}}>{data.whyUsIntro}</p>
              <p style={{margin:'0 0 20px 0',opacity:0.9}}>{data.whyUsStory}</p>
              <p style={{margin:'0 0 20px 0',opacity:0.9}}>{data.whyUsPromise}</p>
              <p style={{margin:0,fontWeight:500}}>{data.whyUsGuarantee}</p>
            </div>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              {data.whyUs.map((item, i) => (
                <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'12px'}}>
                  <span style={{color:c.warm,fontSize:'1.1rem'}}>→</span>
                  <p style={{fontSize:'0.95rem',color:c.textSecondary,margin:0}}><strong style={{color:c.text}}>{item.title}</strong>—{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Comparison Section */}
      {comparison && (
        <section style={{padding:'60px 0',borderTop:'1px solid '+c.border}}>
          <div style={{maxWidth:'900px',margin:'0 auto',padding:'0 24px'}}>
            <p style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:'0 0 12px 0'}}>Compare Your Options</p>
            <h2 style={{fontSize:'1.5rem',fontWeight:600,color:c.text,margin:'0 0 8px 0'}}>{comparison.title}</h2>
            <p style={{fontSize:'1rem',color:c.textSecondary,margin:'0 0 32px 0'}}>{comparison.subtitle}</p>
            
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse',minWidth:'600px'}}>
                <thead>
                  <tr style={{borderBottom:'2px solid '+c.border}}>
                    <th style={{textAlign:'left',padding:'12px 16px',fontSize:'0.8rem',fontWeight:600,color:c.textSecondary,textTransform:'uppercase',letterSpacing:'0.05em'}}>Option</th>
                    <th style={{textAlign:'left',padding:'12px 16px',fontSize:'0.8rem',fontWeight:600,color:c.textSecondary,textTransform:'uppercase',letterSpacing:'0.05em'}}>Availability</th>
                    <th style={{textAlign:'left',padding:'12px 16px',fontSize:'0.8rem',fontWeight:600,color:c.textSecondary,textTransform:'uppercase',letterSpacing:'0.05em'}}>Cost</th>
                    <th style={{textAlign:'left',padding:'12px 16px',fontSize:'0.8rem',fontWeight:600,color:c.textSecondary,textTransform:'uppercase',letterSpacing:'0.05em'}}>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.options.map((option, i) => (
                    <tr 
                      key={i} 
                      style={{
                        borderBottom:'1px solid '+c.border,
                        background: option.highlight ? 'rgba(212,175,55,0.08)' : 'transparent'
                      }}
                    >
                      <td style={{padding:'16px',fontSize:'0.95rem',fontWeight:option.highlight ? 600 : 400,color:c.text}}>
                        {option.name}
                        {option.highlight && <span style={{marginLeft:'8px',fontSize:'0.7rem',background:c.accent,color:c.bg,padding:'2px 8px',borderRadius:'4px',fontWeight:600}}>BEST</span>}
                      </td>
                      <td style={{padding:'16px',fontSize:'0.9rem',color:c.textSecondary}}>{option.availability}</td>
                      <td style={{padding:'16px',fontSize:'0.9rem',color:c.textSecondary}}>{option.cost}</td>
                      <td style={{padding:'16px'}}>
                        <span style={{fontSize:'0.9rem',color:option.highlight ? c.text : c.textSecondary,fontWeight:option.highlight ? 500 : 400}}>{option.result}</span>
                        <br/>
                        <span style={{fontSize:'0.8rem',color:option.highlight ? c.accent : c.textTertiary}}>{option.verdict}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {data.faq && data.faq.length > 0 && (
        <section style={{padding:'60px 0',borderTop:'1px solid '+c.border}}>
          <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
            <p style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:c.accent,margin:'0 0 24px 0'}}>Frequently Asked Questions</p>
            <div style={{display:'flex',flexDirection:'column',gap:'24px'}}>
              {data.faq.map((item, i) => (
                <div key={i} style={{borderBottom: i < data.faq.length - 1 ? '1px solid '+c.border : 'none', paddingBottom: i < data.faq.length - 1 ? '24px' : '0'}}>
                  <h3 style={{fontSize:'1.05rem',fontWeight:600,color:c.text,margin:'0 0 12px 0'}}>{item.question}</h3>
                  <p style={{fontSize:'0.95rem',color:c.textSecondary,margin:0,lineHeight:1.7}}>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{padding:'80px 0 100px'}}>
        <div style={{maxWidth:'600px',margin:'0 auto',padding:'0 24px',textAlign:'center'}}>
          <h2 style={{fontSize:'clamp(1.5rem,4vw,2rem)',fontWeight:600,letterSpacing:'-0.03em',margin:0,color:c.text,lineHeight:1.2}}>{data.ctaHeadline}</h2>
          <p style={{fontSize:'1.05rem',color:c.text,opacity:0.85,margin:'20px 0 8px 0',lineHeight:1.6}}>{data.ctaSubheadline}</p>
          {data.ctaNote && <p style={{fontSize:'0.95rem',color:c.textSecondary,margin:'0 0 32px 0',lineHeight:1.6}}>{data.ctaNote}</p>}
          <a href="https://calendar.app.google/LUhpKq7nBNLpLiBWA" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}><Btn primary>Book a Call <Arrow/></Btn></a>
        </div>
      </section>

      <Footer setPage={setPage}/>
    </div>
  );
};

// Money Page Data - Roofing
const roofingData = {
  industry: 'Roofing Contractors',
  parentService: 'ai-front-desk',
  parentServiceName: 'AI Sales Desk',
  avgJobValue: 9200,
  headline: 'Storm Season Calls Are 4x Higher. Your Answer Rate Isn\'t.',
  subheadline: 'AI voice agents that answer every call—especially when hail hits and your phones explode.',
  problemStatements: [
    'Hail hits at 6 PM. By 7 PM, you have 47 missed calls. By morning, half those homeowners booked someone else.',
    'Phone rings. Your office manager is on another line. Your crew\'s on three jobs. You\'re running estimates.',
    'Phone rings. It\'s Sunday after a storm and every roofer in town is slammed.'
  ],
  problemContext: 'Storm leads are the highest-value, highest-urgency calls you\'ll get. A homeowner with a tarp on their roof isn\'t shopping—they\'re calling until someone answers. If that\'s not you, it\'s your competitor. And they\'re not calling back.',
  stats: [
    { value: '400%', label: 'increase in call volume after major storms' },
    { value: '35%', label: 'of calls to roofing companies go unanswered on normal days' },
    { value: '$15,000+', label: 'average insurance replacement job you\'re missing' }
  ],
  costStatements: [
    'The average insurance roof replacement is worth <strong>$15,000-25,000</strong>. Storm season is when you make your year.',
    'After a hailstorm, call volume spikes <strong>400%</strong>. Your team can\'t scale 400%. Every unanswered call is a job to your competitor.',
    'A homeowner with a damaged roof calls <strong>3-5 roofers</strong>. The one who answers, qualifies, and books first wins. Speed is everything.',
    'Miss 20 storm calls in a week? At 50% close rate on $15K jobs, that\'s <strong>$150,000</strong> gone to whoever picked up.'
  ],
  solutionIntro: 'We add an AI voice agent to your phone line. Not a voicemail. Not a call center that\'s also slammed. An AI that handles unlimited concurrent calls—even when every roofer in town is underwater.',
  solutionSubIntro: 'It picks up on the first ring—every time, including nights, weekends, and the middle of a hailstorm—and it:',
  features: [
    { title: 'Handles storm surge', description: 'Unlimited concurrent calls. 50 calls at once? All answered.' },
    { title: 'Qualifies insurance vs cash', description: 'Claim filed? Adjuster scheduled? Timeline urgency?' },
    { title: 'Captures damage details', description: 'Hail, wind, tree damage? Photos via text? Emergency tarp needed?' },
    { title: 'Books the inspection', description: 'Directly on your calendar with all details captured' }
  ],
  solutionOutcome: 'Storm season becomes your biggest advantage, not your biggest bottleneck. Every call answered. Every lead captured. Your competitors drown in voicemails while you book jobs.',
  before: 'Storm hits. Phones explode. You capture maybe 30% of leads. The rest go to voicemail and call someone else. You leave money on the table every storm season.',
  after: 'Storm hits. AI answers every call instantly. Leads qualified and booked while competitors scramble. You capture the season instead of surviving it.',
  whyUsIntro: 'We\'re not an AI company that discovered roofing.',
  whyUsStory: 'We understand storm season economics. We know that the roofer who captures leads during the surge wins the year. We built this for that reality.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, run it, and optimize it. You get one monthly fee and a phone system that scales when you need it most.',
  whyUsGuarantee: 'If it\'s not booking jobs, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before Storm Season',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the AI handles call surges and books inspections.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your business in mind.',
  faq: [
    {
      question: 'How does it handle 50+ calls during a storm?',
      answer: 'Unlimited concurrent calls. Unlike humans or call centers, the AI doesn\'t get overwhelmed. Every caller gets answered on the first ring, even during the biggest surge.'
    },
    {
      question: 'Does it understand insurance claims vs cash jobs?',
      answer: 'Yes. It asks whether a claim is filed, if an adjuster is scheduled, and qualifies the timeline—so you know which leads to prioritize.'
    },
    {
      question: 'Can it collect photos of damage?',
      answer: 'Yes. After the call, it can text the homeowner to request photos. You get damage documentation before you even arrive.'
    },
    {
      question: 'What about emergency tarp calls?',
      answer: 'It flags emergency situations and routes them according to your protocol—immediate dispatch, priority callback, or next-day scheduling.'
    },
    {
      question: 'How fast can we be ready for storm season?',
      answer: 'Most roofing companies are live within 5-7 days. Don\'t wait for the first hailstorm to realize you needed this.'
    }
  ]
};

// Money Page Data - HVAC
const hvacData = {
  industry: 'HVAC Companies',
  parentService: 'ai-front-desk',
  parentServiceName: 'AI Sales Desk',
  avgJobValue: 8500,
  headline: 'The First 100-Degree Day Will Break Your Phones. Be Ready.',
  subheadline: 'AI voice agents that handle call surges, triage emergencies, and book jobs—even when every line is lit.',
  problemStatements: [
    'First heatwave hits. You get 3x normal call volume. Your team answers maybe half.',
    'Elderly homeowner calls at 6 PM. No AC. 95 degrees inside. They get voicemail.',
    'Saturday afternoon. Everyone\'s phones are ringing. No one can answer.'
  ],
  problemContext: 'Emergency HVAC calls are worth 2-3x normal service calls—homeowners pay premium pricing and don\'t negotiate. But they also call 3 companies and book whoever answers. The heatwave that should make your quarter becomes the week you lose your best leads.',
  stats: [
    { value: '300%', label: 'call volume spike during first major heatwave' },
    { value: '2-3x', label: 'revenue on emergency calls vs scheduled service' },
    { value: '67%', label: 'of callers won\'t leave a voicemail—they\'ll call your competitor' }
  ],
  costStatements: [
    'Emergency no-AC calls close at <strong>80%+ rates</strong> and command premium pricing. A $300 service call becomes a <strong>$500-800 emergency visit</strong>.',
    'The average system replacement is worth <strong>$8,500</strong>. Emergency replacements often close same-day at <strong>full margin</strong>—no negotiating.',
    'During a heatwave, you might get <strong>50+ calls in a day</strong>. Your team can handle maybe 20. That\'s 30 emergency jobs going to competitors.',
    'One week of missed emergency calls during peak season can cost <strong>$50,000-100,000</strong> in lost revenue.'
  ],
  solutionIntro: 'We add an AI voice agent that scales when you can\'t. Unlimited concurrent calls. No hold times. No missed emergencies. Even when every HVAC company in town is underwater.',
  solutionSubIntro: 'It picks up on the first ring—every time, including nights, weekends, and the middle of a heatwave—and it:',
  features: [
    { title: 'Handles call surges', description: 'Unlimited concurrent calls. 50 at once? All answered instantly.' },
    { title: 'Triages real emergencies', description: 'Elderly with no AC? Medical equipment needs cooling? Flagged immediately.' },
    { title: 'Captures premium opportunities', description: 'Emergency willingness-to-pay, same-day availability, system age for replacement leads' },
    { title: 'Books directly into dispatch', description: 'Integrated with ServiceTitan, Housecall Pro, Jobber—jobs appear in real-time' }
  ],
  solutionOutcome: 'Peak season becomes your biggest advantage, not your biggest headache. Every emergency answered. Every premium job captured. Your competitors leave money on the table while you book it.',
  before: 'Heatwave hits. Phones explode. Team drowns. You capture maybe 40% of calls. Emergency jobs—your highest-margin work—go to whoever answered.',
  after: 'Heatwave hits. AI answers everything. Emergencies triaged and booked. You capture the season instead of surviving it.',
  whyUsIntro: 'We\'re not an AI company that discovered HVAC.',
  whyUsStory: 'We understand seasonal economics. Emergency calls are 2-3x more valuable and close at 2x the rate. Capturing them is how you make your year. We built this for that reality.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, run it, and optimize it. You get one monthly fee and a phone system that scales when you need it most.',
  whyUsGuarantee: 'If it\'s not booking jobs, we fix it. That\'s the deal.',
  ctaHeadline: 'Be Ready for Peak Season',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the AI handles call surges and captures emergency revenue.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your business in mind.',
  faq: [
    {
      question: 'How does the AI handle true emergencies?',
      answer: 'It recognizes high-risk situations—elderly with no AC, medical equipment needs, infants in the home—and flags them for immediate dispatch or priority callback per your rules.'
    },
    {
      question: 'Can it handle 50+ calls during a heatwave?',
      answer: 'Unlimited concurrent calls. Unlike humans or call centers, the AI doesn\'t get overwhelmed. Every caller gets answered on the first ring, even during the biggest surge.'
    },
    {
      question: 'Does it know the difference between maintenance and emergencies?',
      answer: 'Yes. It asks qualifying questions and routes accordingly—emergencies get priority, maintenance gets scheduled. You define what counts as urgent.'
    },
    {
      question: 'Does it integrate with ServiceTitan / Housecall Pro / Jobber?',
      answer: 'Yes. Jobs book directly into your dispatch system with all details captured—urgency level, system info, homeowner contact.'
    },
    {
      question: 'How fast can we be ready for summer?',
      answer: 'Most HVAC companies are live within 5-7 days. Don\'t wait for the first heatwave to realize you needed this.'
    }
  ]
};

// Money Page Data - Plumbing
const plumbingData = {
  industry: 'Plumbing Companies',
  parentService: 'ai-front-desk',
  parentServiceName: 'AI Sales Desk',
  avgJobValue: 4500,
  headline: 'Water Damage Compounds by the Minute. So Does Your Loss.',
  subheadline: 'AI voice agents that answer emergency calls instantly—because every minute a pipe bursts costs the homeowner $50.',
  problemStatements: [
    'Phone rings at 2 AM. Burst pipe. Water gushing. Homeowner panicking. They get your voicemail.',
    'Phone rings. Your office is slammed. The caller has a slow leak—today it\'s $200, next week it\'s $2,000.',
    'Phone rings. It\'s Saturday. Your whole crew is on jobs. Emergency calls stack up.'
  ],
  problemContext: 'Water damage compounds at $50-100 per minute. A homeowner with water gushing isn\'t leaving voicemails—they\'re calling until someone answers. Every minute they wait is more damage, more stress, and more chance they book your competitor who picked up.',
  stats: [
    { value: '$50-100/min', label: 'is how fast water damage compounds in a flooded home' },
    { value: '3 minutes', label: 'average time before a caller hangs up and tries someone else' },
    { value: '80%+ close rate', label: 'on true emergencies—if you answer first' }
  ],
  costStatements: [
    'A burst pipe emergency runs <strong>$800-1,500</strong>. But the homeowner isn\'t price shopping—they\'re calling whoever picks up.',
    'Water damage costs homeowners <strong>$50-100 per minute</strong>. They know it. They\'re panicking. They will call until someone answers.',
    'Emergency calls close at <strong>80%+ rates</strong> because urgency eliminates comparison shopping. Miss it? Someone else gets an easy close.',
    'That emergency customer becomes a <strong>$5,000+ lifetime customer</strong>—water heater, repiping, drain cleaning. Lose the emergency, lose the relationship.'
  ],
  solutionIntro: 'We add an AI voice agent that answers every call instantly. Not voicemail. Not a call center that puts them on hold. An AI that understands plumbing emergencies and acts immediately.',
  solutionSubIntro: 'It picks up on the first ring—every time, 24/7/365, including holidays and 2 AM—and it:',
  features: [
    { title: 'Recognizes true emergencies', description: 'Burst pipe, sewage backup, gas smell, no water—immediately escalated' },
    { title: 'Dispatches your on-call', description: 'Emergency protocols trigger texts, calls, or app notifications to your team' },
    { title: 'Calms the homeowner', description: 'Provides water shutoff instructions while help is dispatched' },
    { title: 'Captures the job details', description: 'Location, access info, problem description—your plumber arrives informed' }
  ],
  solutionOutcome: 'Emergency calls become your most reliable revenue. Homeowners get immediate response. Your after-hours stops being a black hole.',
  before: 'After-hours calls go to voicemail. Emergency revenue goes to whoever answers. You lose high-margin jobs and lifetime customers.',
  after: 'Every emergency answered instantly. On-call dispatched in minutes. High-margin, high-close-rate jobs captured 24/7.',
  whyUsIntro: 'We\'re not an AI company that discovered plumbing.',
  whyUsStory: 'We understand that a burst pipe at 2 AM is the most valuable call you\'ll get all week—and the easiest to lose. We built this for that reality.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, run it, and optimize it. You get one monthly fee and an after-hours that actually works.',
  whyUsGuarantee: 'If it\'s not dispatching emergencies, we fix it. That\'s the deal.',
  ctaHeadline: 'See How Fast We Answer',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the AI handles emergencies and dispatches your team.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your business in mind.',
  faq: [
    {
      question: 'How does the AI handle true emergencies like burst pipes?',
      answer: 'It recognizes urgency immediately—burst pipe, flooding, no water, gas smell—and triggers your emergency protocol. Your on-call plumber gets notified in seconds, not minutes.'
    },
    {
      question: 'Can it give the homeowner water shutoff instructions?',
      answer: 'Yes. While dispatching your team, the AI can walk the homeowner through shutting off water to minimize damage. Every minute matters.'
    },
    {
      question: 'What about 2 AM calls—does it actually work overnight?',
      answer: 'Yes. The AI answers 24/7/365 with the same quality. For after-hours emergencies, it dispatches your on-call plumber immediately.'
    },
    {
      question: 'Does it work with ServiceTitan?',
      answer: 'Yes. We integrate with ServiceTitan, Housecall Pro, Jobber, and other field service platforms. Emergency jobs appear in your system with full details.'
    },
    {
      question: 'How is this different from an answering service?',
      answer: 'Answering services take messages and hope someone calls back. Our AI dispatches emergencies immediately, provides homeowner guidance, and captures job details—true emergency response.'
    }
  ]
};

// Money Page Data - Truck Dealers
const truckingData = {
  industry: 'Parts Dealers',
  parentService: 'ai-front-desk',
  parentServiceName: 'AI Sales Desk',
  avgJobValue: 2500,
  headline: 'Stop Losing $50K Accounts While Your Counter Is Slammed',
  subheadline: 'AI sales desk that handles calls and emails, looks up inventory, and captures orders—24/7.',
  problemStatements: [
    'Phone rings. Your parts counter is three deep with walk-ins.',
    'Email lands. A fleet manager needs a quote—but your team won\'t see it for hours.',
    'Phone rings. It\'s 6 AM, a truck is down, and the night shift mechanic needs a part.'
  ],
  problemContext: 'When a truck is down, customers need parts now. They\'re not leaving voicemails. They\'re calling the next dealer. One missed call can cost you an entire fleet account—and cost your customer an entire day of downtime.',
  stats: [
    { value: '$1,000+/day', label: 'what downtime costs your customers' },
    { value: '< 3%', label: 'of callers leave a voicemail—the rest call your competitor' },
    { value: '1 missed call', label: 'can cost you a $50K account' }
  ],
  costStatements: [
    'The average fleet account is worth <strong>$50,000+ per year</strong> in recurring parts revenue.',
    'Lose just one fleet relationship because they couldn\'t get through? That\'s <strong>$50K gone</strong>—every year, for years.',
    'And it\'s not just the big accounts. Miss 3 counter calls a day at <strong>$300 average</strong>? That\'s <strong>$280,000 per year</strong> walking out the door.',
    'Drivers, maintenance supervisors, fleet managers—when a truck is down, they\'re calling whoever picks up. Day shift, night shift, weekends. Breakdowns don\'t wait for business hours.'
  ],
  solutionIntro: 'We add an AI sales desk to your parts department. Not a voicemail. Not a phone tree. An AI that monitors calls and emails—and actually knows truck parts.',
  solutionSubIntro: 'It picks up on the first ring and responds to emails in minutes—24/7, including nights, weekends, and emergency breakdowns. It quotes accurately, never misses key details, and never has a bad day. And it:',
  features: [
    { title: 'Looks up parts', description: 'VIN decoding, cross-references, availability—handled instantly' },
    { title: 'Captures orders from any channel', description: 'Phone, email, even text—part numbers, quantities, delivery or pickup' },
    { title: 'Flags priority accounts', description: 'Fleet managers and VIP accounts get routed immediately' },
    { title: 'Works when you don\'t', description: 'After-hours calls captured and ready for your team at open' }
  ],
  solutionOutcome: 'Your counter team focuses on walk-ins and closing deals. Every call, email, and after-hours inquiry gets handled—so you stop losing accounts to missed calls.',
  before: 'Your counter is slammed during the day. After hours, calls go to voicemail. Emails pile up overnight. By morning, your customers already found another source.',
  after: 'Every call answered. Every email handled. Every order captured—24/7. Your counter team focuses on closing, not catching up.',
  whyUsIntro: 'We\'re not an AI company that discovered truck parts.',
  whyUsStory: 'We come from this world—parts counters, dealerships, heavy-duty distribution. We\'ve been the guy watching the phone ring while three customers waited at the counter. And we\'ve been the guy on the other end—calling in for a part, never getting through, never getting the quote, watching a truck sit dead while we waited for a callback that never came.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, run it, and optimize it. You get one monthly fee and a parts counter that never misses an inquiry.',
  whyUsGuarantee: 'If it\'s not capturing orders, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the AI handles calls, emails, and VIN lookups.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your operation in mind.',
  faq: [
    {
      question: 'Can the AI actually look up parts by VIN?',
      answer: 'Yes. We integrate with your DMS and parts catalog. The AI can look up parts, check inventory across locations, and provide accurate availability—just like your best counterperson.'
    },
    {
      question: 'What about technical questions the AI can\'t answer?',
      answer: 'It gracefully escalates to your team during business hours or captures details for callback. Complex fitment questions get flagged for your experts.'
    },
    {
      question: 'How does it handle fleet accounts vs one-time buyers?',
      answer: 'It recognizes returning callers and fleet accounts, applies their pricing, and prioritizes accordingly. Your best accounts get treated like your best accounts.'
    },
    {
      question: 'Does it work with our DMS (CDK, Reynolds, Procede)?',
      answer: 'Yes. We integrate with major heavy-duty DMS platforms for inventory lookup, pricing, and order capture. The AI sees what your counter sees.'
    },
    {
      question: 'What about after-hours emergency parts requests?',
      answer: 'The AI can take orders 24/7, check inventory, and either process for next-day or escalate true emergencies to your on-call team—you define the rules.'
    }
  ]
};

// Money Page Data - Pest Control
const pestData = {
  industry: 'Pest Control Companies',
  parentService: 'ai-front-desk',
  parentServiceName: 'AI Sales Desk',
  avgJobValue: 400,
  headline: 'A Homeowner With Bed Bugs Isn\'t Leaving a Voicemail',
  subheadline: 'AI voice agents that answer every call, book treatments, and capture high-urgency leads—24/7.',
  problemStatements: [
    'Phone rings. Your scheduler is already booking another appointment.',
    'Phone rings. Someone just found rats in their kitchen—at 9 PM.',
    'Phone rings. It\'s the first warm week of spring and every line is lit.'
  ],
  problemContext: 'Pest calls are urgent calls. A homeowner with bed bugs or mice isn\'t comparison shopping—they\'re calling until someone picks up. If that\'s not you, it\'s your competitor. And they won\'t call back.',
  stats: [
    { value: '90%+', label: 'close rate on bed bug and rodent calls—urgency sells itself' },
    { value: '27%', label: 'of calls to pest control companies go unanswered' },
    { value: '$2,400+', label: 'lifetime value of a recurring pest customer (4+ years)' }
  ],
  costStatements: [
    'The average recurring pest control customer is worth <strong>$600/year</strong>—and they stay for <strong>4+ years</strong>.',
    'That\'s <strong>$2,400+ in lifetime value</strong> from a single answered call.',
    'Miss just 5 calls a week? Even at a 50% close rate, that\'s <strong>$312,000 in lifetime revenue</strong> lost every year.',
    'And it\'s not just the contract. It\'s the termite inspection they call you for. The referral to their neighbor. The commercial account they manage—gone to whoever picked up first.'
  ],
  solutionIntro: 'We add an AI voice agent to your phone line. Not a voicemail. Not a call center with scripts. An AI that sounds human and actually understands pest control.',
  solutionSubIntro: 'It picks up on the first ring—every time, including nights, weekends, and the middle of termite season—and it:',
  features: [
    { title: 'Identifies the pest', description: 'Rodents, roaches, termites, bed bugs? Different urgency, different routing.' },
    { title: 'Captures property details', description: 'Home or business? Square footage? Severity?' },
    { title: 'Books the appointment', description: 'Directly on your schedule, no back-and-forth' },
    { title: 'Confirms with the customer', description: 'Text and email, automatically' }
  ],
  solutionOutcome: 'Your office stops drowning in spring and summer. Your team converts more first-time callers into recurring customers.',
  before: 'Spring and summer are chaos. Your scheduler is underwater. Techs are on routes. Calls keep going to voicemail while your team plays catch-up.',
  after: 'Every call answered. Every lead qualified. Appointments booked automatically. Your team focuses on closing jobs, not chasing them.',
  whyUsIntro: 'We\'re not an AI company that discovered pest control.',
  whyUsStory: 'We come from operations—field service, route management, seasonal businesses. We\'ve seen what happens when call volume doubles overnight and you can\'t keep up.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, run it, and optimize it. You get one monthly fee and a schedule that fills itself.',
  whyUsGuarantee: 'If it\'s not booking jobs, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the AI sounds, what it captures, and how it books.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your business in mind.',
  faq: [
    {
      question: 'How does the AI handle urgent calls like rodent or wasp emergencies?',
      answer: 'It recognizes urgency—rats in the kitchen, wasp nest by the door, bed bugs—and prioritizes accordingly. You define what counts as emergency and how those get routed.'
    },
    {
      question: 'Can it sell recurring treatment plans?',
      answer: 'Yes. The AI can explain your maintenance programs, answer questions about frequency and coverage, and book the initial service that starts the plan.'
    },
    {
      question: 'What about seasonal spikes in spring and summer?',
      answer: 'The AI handles unlimited concurrent calls. When your phones explode in April, every call still gets answered on the first ring—no hold times, no voicemail.'
    },
    {
      question: 'Does it integrate with PestPac, ServSuite, or Briostack?',
      answer: 'Yes. We integrate with major pest control software platforms so appointments book directly into your system with all service details captured.'
    },
    {
      question: 'How quickly can we get started?',
      answer: 'Most pest control companies are live within 5-7 days. We handle training the AI on your services, areas, and pricing approach.'
    }
  ]
};

// Money Page Data - Solar
const solarData = {
  industry: 'Solar Companies',
  parentService: 'ai-front-desk',
  parentServiceName: 'AI Sales Desk',
  avgJobValue: 20000,
  headline: 'Stop Losing $10K Every Time a Lead Goes Unanswered',
  subheadline: 'AI sales desk that handles calls, web forms, and emails—qualifying leads and booking consultations 24/7.',
  problemStatements: [
    'Phone rings. Leads are pouring in but your team can\'t keep up.',
    'Web form lands. A homeowner just got their summer electric bill—and they\'re ready to buy.',
    'Email comes in. Your office manager is busy qualifying another lead.'
  ],
  problemContext: 'The lead doesn\'t wait. They\'re shopping. They call the next solar company or submit another form. Whether you\'re running a sales team or buying leads yourself, that $200 just walked out the door.',
  stats: [
    { value: '78%', label: 'of buyers choose whoever responds first' },
    { value: 'Less than 3%', label: 'of people leave voicemails' },
    { value: 'The rest?', label: 'They call your competitor' }
  ],
  costStatements: [
    'The average residential solar install is worth <strong>$20,000</strong>.',
    'At a typical 25% close rate, every missed lead costs you roughly <strong>$5,000</strong> in potential revenue.',
    'Miss just 4 qualified leads a week? That\'s <strong>$1 million per year</strong> walking out the door.',
    'And it\'s not just the install. It\'s the referral bonus they never earn you. The battery add-on two years later. The neighbor who asks who did their panels—all gone to whoever answered first.'
  ],
  solutionIntro: 'We add an AI sales desk to your lead flow. Not a voicemail. Not a CRM that sends auto-replies. An AI that monitors calls, web forms, and emails—and actually qualifies solar leads.',
  solutionSubIntro: 'It picks up on the first ring and responds to inquiries in minutes—every time, including evenings and weekends when homeowners actually have time to reach out—and it:',
  features: [
    { title: 'Qualifies from any channel', description: 'Phone, web form, email—homeowner? Roof age? Monthly bill? Shading issues?' },
    { title: 'Captures property details', description: 'Address, electric provider, roof type' },
    { title: 'Books the consultation', description: 'Directly on your sales calendar, no back-and-forth' },
    { title: 'Confirms with the homeowner', description: 'Text and email, automatically' }
  ],
  solutionOutcome: 'Your paid leads actually convert. Whether you\'re managing a team or working leads yourself, you walk into consultations with qualified buyers—no matter how the lead came in.',
  before: 'Your sales team is in the field. Web forms sit until someone checks. Emails pile up. Leads come in after hours and go cold by morning.',
  after: 'Every lead answered instantly—calls, forms, and emails. Every prospect qualified. Consultations booked before they move on.',
  whyUsIntro: 'We\'re not an AI company that discovered solar.',
  whyUsStory: 'We\'re in the solar space ourselves—running cold outreach to property investors and voice agents to homeowners. We know what it costs when a $200 lead goes cold because nobody answered. We built this because we needed it.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, run it, and optimize it. You get one monthly fee and a sales calendar that fills itself.',
  whyUsGuarantee: 'If it\'s not booking consultations, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the AI handles calls, web forms, and email inquiries.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your sales process in mind.',
  faq: [
    {
      question: 'Does it work with our existing lead sources?',
      answer: 'Yes. We integrate with your web forms, phone lines, and email. Whether leads come from Google, Facebook, or lead vendors—they all get handled the same way.'
    },
    {
      question: 'How does it qualify solar leads?',
      answer: 'It asks the questions that matter—homeowner or renter, roof age, monthly electric bill, shade issues, credit comfort. Bad leads get filtered before they waste your sales team\'s time.'
    },
    {
      question: 'What about leads that come in at night?',
      answer: 'The AI responds immediately—24/7. Evening and weekend leads often have the highest intent because that\'s when homeowners have time to research. We capture them while they\'re hot.'
    },
    {
      question: 'Can it handle both residential and commercial inquiries?',
      answer: 'Yes. We can configure different qualification paths for residential vs commercial, routing each to the right team with the right questions asked.'
    },
    {
      question: 'How fast can we be live?',
      answer: 'Most solar companies are live within 5-7 days. We handle integration with your lead sources, CRM, and calendar.'
    }
  ]
};

// Money Page Data - Property Management
const propertyData = {
  industry: 'Property Management Companies',
  parentService: 'ai-front-desk',
  parentServiceName: 'AI Sales Desk',
  avgJobValue: 4000,
  headline: 'Stop Losing $4K Every Time a Tenant Doesn\'t Renew',
  subheadline: 'AI sales desk that handles calls and emails, logs requests, and dispatches vendors—24/7.',
  problemStatements: [
    'Phone rings. Your property managers are out showing units.',
    'Email lands. A tenant reports a leak—but it sits in the inbox until morning.',
    'Phone rings. Your office staff is already handling three other calls.'
  ],
  problemContext: 'The tenant doesn\'t wait. They call again. Email again. Then they leave a 1-star review. Then they don\'t renew.',
  stats: [
    { value: '$4,000', label: 'average cost to turn a unit' },
    { value: '42%', label: 'national average turnover rate' },
    { value: 'Every point', label: 'you reduce that rate goes straight to your bottom line' }
  ],
  costStatements: [
    'The average tenant turnover costs <strong>$4,000</strong>—lost rent, cleaning, repairs, marketing, and vacancy.',
    'With a 42% national turnover rate, a 100-unit portfolio loses <strong>$168,000/year</strong> just to turnover.',
    'Cut that rate by just 10%? You keep <strong>$40,000</strong> that was walking out the door.',
    'And it\'s not just the turnover. It\'s the bad reviews that kill your leads. The reputation hit. The good tenants who tell their friends to look elsewhere—all because they couldn\'t get through when it mattered.'
  ],
  solutionIntro: 'We add an AI sales desk to your property management operation. Not a voicemail. Not an answering service. An AI that monitors calls and emails—and actually handles property management inquiries.',
  solutionSubIntro: 'It picks up on the first ring and responds to emails in minutes—every time, including nights, weekends, and holidays when emergencies actually happen—and it:',
  features: [
    { title: 'Logs maintenance requests', description: 'Phone or email—unit number, issue type, urgency, photos via text' },
    { title: 'Handles emergencies', description: 'Water, fire, lockouts—routed to on-call immediately' },
    { title: 'Answers tenant questions', description: 'Rent due dates, office hours, lease policies' },
    { title: 'Routes leasing inquiries', description: 'Prospective tenants get answers and showing times—from any channel' }
  ],
  solutionOutcome: 'Your tenants feel heard. Your property managers stop drowning in calls and emails. Your retention goes up.',
  before: 'Your property managers are spread thin. Calls go to voicemail. Emails pile up. Tenants can\'t get through and maintenance requests fall through the cracks.',
  after: 'Every call answered. Every email handled. Emergencies routed. Tenants stay because they feel valued.',
  whyUsIntro: 'We\'re not an AI company that discovered property management.',
  whyUsStory: 'We come from operations—service businesses, tenant relations, after-hours emergencies. We\'ve seen what happens when tenants can\'t reach anyone and decide not to renew.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, run it, and optimize it. You get one monthly fee and tenants who actually renew.',
  whyUsGuarantee: 'If it\'s not improving your retention, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the AI handles calls, emails, and maintenance requests.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your portfolio in mind.',
  faq: [
    {
      question: 'How does the AI handle maintenance emergencies?',
      answer: 'It recognizes true emergencies—water leaks, no heat, lockouts, fire—and immediately routes to your on-call team or vendor network according to your escalation rules.'
    },
    {
      question: 'Can tenants submit maintenance requests by phone and text?',
      answer: 'Yes. The AI takes requests via phone call, captures photos via text message, and logs everything in your property management software with unit number and issue details.'
    },
    {
      question: 'Does it integrate with AppFolio, Buildium, or Rent Manager?',
      answer: 'Yes. We integrate with major property management platforms so maintenance requests, tenant communications, and leasing inquiries all sync automatically.'
    },
    {
      question: 'What about prospective tenants calling about vacancies?',
      answer: 'The AI answers questions about available units, qualifications, and pricing—and books showings directly on your leasing calendar.'
    },
    {
      question: 'How does this affect tenant satisfaction scores?',
      answer: 'Dramatically. Tenants who can reach someone immediately—especially for emergencies—rate their experience significantly higher. Happy tenants renew.'
    }
  ]
};

// Money Page Data - Staffing
const staffingData = {
  industry: 'Staffing Agencies',
  parentService: 'ai-front-desk',
  parentServiceName: 'AI Sales Desk',
  avgJobValue: 12000,
  headline: 'Stop Losing $12K Placements to Slow Response',
  subheadline: 'AI sales desk that handles calls and emails, screens candidates, and schedules interviews—24/7.',
  problemStatements: [
    'Phone rings. Your recruiters are all in interviews.',
    'Email lands. A client needs 10 people by Monday—but the message sits until someone checks.',
    'Application comes in. A qualified candidate is waiting—but nobody responds for hours.'
  ],
  problemContext: 'The candidate doesn\'t wait. They accept another offer. The client doesn\'t wait. They call the next agency. Speed wins in staffing.',
  stats: [
    { value: '20%', label: 'average placement fee on a $60K salary = $12,000' },
    { value: '27 days', label: 'average time to fill—but candidates move in hours' },
    { value: 'First call wins', label: 'Speed is the only differentiator that matters' }
  ],
  costStatements: [
    'The average direct hire placement fee is <strong>$12,000</strong> (20% of a $60K salary).',
    'But candidates are fielding multiple offers. Every hour you don\'t respond, someone else does.',
    'Lose just 2 placements a month to slower response? That\'s <strong>$288,000/year</strong> walking out the door.',
    'And it\'s not just the placement. It\'s the client relationship that sours. The referrals that stop. The candidate who tells their network you never called back.'
  ],
  solutionIntro: 'We add an AI sales desk to your agency. Not a voicemail. Not an ATS auto-reply. An AI that monitors calls, emails, and applications—and actually screens candidates.',
  solutionSubIntro: 'It picks up on the first ring and responds to inquiries in minutes—every time, including evenings and weekends when candidates actually have time to reach out—and it:',
  features: [
    { title: 'Screens candidates from any channel', description: 'Phone, email, application—availability, experience, certifications, wage expectations' },
    { title: 'Qualifies client inquiries', description: 'Positions, timeline, volume, budget' },
    { title: 'Schedules interviews', description: 'Directly on recruiter calendars, no back-and-forth' },
    { title: 'Follows up on no-shows', description: 'Candidates who missed get a callback' }
  ],
  solutionOutcome: 'Your recruiters interview pre-screened candidates. Your clients get faster response. Your team places more people—no matter how the inquiry came in.',
  before: 'Your recruiters are in back-to-back interviews. Emails pile up. Candidates apply and hear nothing for days. Clients wait for callbacks while faster agencies close the deal.',
  after: 'Every call answered. Every email handled. Every candidate screened. Your recruiters focus on closing.',
  whyUsIntro: 'We\'re not an AI company that discovered staffing.',
  whyUsStory: 'We come from operations—high-volume hiring, candidate management, client service. We\'ve seen what happens when you\'re too slow and the candidate takes another offer.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, run it, and optimize it. You get one monthly fee and a faster placement cycle.',
  whyUsGuarantee: 'If it\'s not speeding up your placements, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the AI handles calls, emails, and candidate screening.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your agency in mind.',
  faq: [
    {
      question: 'How does the AI screen candidates?',
      answer: 'It asks your qualification questions—availability, experience, certifications, salary expectations—and scores candidates based on your criteria before they reach a recruiter.'
    },
    {
      question: 'Can it handle both client calls and candidate calls?',
      answer: 'Yes. The AI recognizes whether someone is calling about hiring needs or about a job opportunity, and handles each appropriately with different conversation flows.'
    },
    {
      question: 'What about high-volume light industrial or warehouse staffing?',
      answer: 'Perfect fit. The AI can screen hundreds of candidates simultaneously, checking availability and basic qualifications—no hold times, no missed applicants.'
    },
    {
      question: 'Does it integrate with Bullhorn, JobDiva, or our ATS?',
      answer: 'Yes. We integrate with major staffing platforms so candidate info and client requests flow directly into your system.'
    },
    {
      question: 'How fast can candidates get scheduled for interviews?',
      answer: 'Immediately. The AI checks recruiter availability and books interviews in real-time—candidates can be scheduled within minutes of applying.'
    }
  ]
};

// Money Page Data - Veterinary
const vetData = {
  industry: 'Veterinary Clinics',
  parentService: 'ai-front-desk',
  parentServiceName: 'AI Sales Desk',
  avgJobValue: 350,
  headline: 'Stop Losing $5K Every Time a Pet Parent Can\'t Get Through',
  subheadline: 'AI voice agents that answer calls, book appointments, and handle emergencies—24/7.',
  problemStatements: [
    'Phone rings. Your front desk is checking out three clients at once.',
    'Phone rings. A pet parent\'s dog just ate chocolate—at 9 PM.',
    'Phone rings. It\'s Monday morning and every line is already lit.'
  ],
  problemContext: 'The caller doesn\'t leave a voicemail. Their pet is sick and they\'re scared. They call the next clinic. That\'s a client for life—gone.',
  stats: [
    { value: '$5,000+', label: 'lifetime value of a bonded client' },
    { value: 'Monday morning', label: 'Every line is lit—and calls are going to voicemail' },
    { value: 'The rest?', label: 'They find another vet' }
  ],
  costStatements: [
    'The average veterinary client is worth <strong>$5,000+</strong> over their pet\'s lifetime.',
    'New client inquiries are down 8.6% year-over-year. Every call matters more than ever.',
    'Miss just 3 new client calls a week? Even at a 50% conversion rate, that\'s <strong>$390,000 in lifetime revenue</strong> lost every year.',
    'And it\'s not just the one pet. It\'s the second dog they adopt. The cat. The referral to their neighbor. The family that would\'ve stayed for 15 years—gone to whoever answered.'
  ],
  solutionIntro: 'We add an AI voice agent to your phone line. Not a voicemail. Not a call tree. An AI that sounds human and actually understands veterinary care.',
  solutionSubIntro: 'It picks up on the first ring—every time, including Monday mornings and after hours when worried pet parents call—and it:',
  features: [
    { title: 'Triages emergencies', description: 'Toxin ingestion? Trauma? Difficulty breathing? Flagged immediately.' },
    { title: 'Books appointments', description: 'Wellness, sick visits, follow-ups—directly on your schedule' },
    { title: 'Answers common questions', description: 'Hours, pricing, vaccine schedules, prescription refills' },
    { title: 'Captures new patients', description: 'Pet details, medical history, reason for visit' }
  ],
  solutionOutcome: 'Your front desk stops drowning. Pet parents feel heard. Your practice keeps more clients for life.',
  before: 'Monday mornings are chaos. Your front desk is underwater. Pet parents are on hold. Emergencies get mixed with routine calls while the lines stack up.',
  after: 'Every call answered. Every lead captured. Emergencies routed instantly. Your team focuses on care, not phones.',
  whyUsIntro: 'We\'re not an AI company that discovered veterinary care.',
  whyUsStory: 'We come from operations—front desk management, appointment scheduling, client retention. We\'ve seen what happens when worried pet parents can\'t reach you and find another vet.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, run it, and optimize it. You get one monthly fee and a front desk that never misses a call.',
  whyUsGuarantee: 'If it\'s not booking appointments, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the AI sounds, what it captures, and how it books.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your clinic in mind.',
  faq: [
    {
      question: 'How does the AI handle pet emergencies after hours?',
      answer: 'It recognizes emergency symptoms—difficulty breathing, toxin ingestion, trauma—and either routes to your on-call vet or directs to the nearest emergency clinic according to your protocols.'
    },
    {
      question: 'Can it schedule different appointment types (wellness, sick visit, surgery)?',
      answer: 'Yes. The AI understands appointment types and duration, booking the right slot for routine wellness vs sick visits vs procedures that need more time.'
    },
    {
      question: 'Does it work with our practice management software?',
      answer: 'Yes. We integrate with major veterinary PM systems like IDEXX, Cornerstone, and AVImark for real-time scheduling and patient lookup.'
    },
    {
      question: 'What about new client intake?',
      answer: 'The AI collects pet info, owner details, and basic history—so new clients arrive with paperwork already started.'
    },
    {
      question: 'How do pet parents react to an AI answering?',
      answer: 'Most don\'t notice—they\'re just relieved someone answered. Pet parents calling worried about their pet care more about getting help fast than who picks up.'
    }
  ]
};

// Money Page Data - Towing
const towingData = {
  industry: 'Towing Companies',
  parentService: 'ai-front-desk',
  parentServiceName: 'AI Sales Desk',
  avgJobValue: 150,
  headline: 'Stop Losing $190K/Year to Missed Calls',
  subheadline: 'AI voice agents that answer calls, dispatch jobs, and capture every opportunity—24/7.',
  problemStatements: [
    'Phone rings. Your dispatcher is coordinating three jobs at once.',
    'Phone rings. It\'s 2 AM and your night guy is already on a call.',
    'Phone rings. Every driver is on the road and the office line keeps ringing.'
  ],
  problemContext: 'The caller is stranded. They\'re not leaving a voicemail. They\'re calling the next towing company on Google. Every missed call is a job gone in 30 seconds.',
  stats: [
    { value: '$150', label: 'average tow—recovery jobs run $500-1,500' },
    { value: '5+ calls/day', label: 'missed when your team is busy on the road' },
    { value: 'Your contracts?', label: 'Motor clubs track your answer rate' }
  ],
  costStatements: [
    'The average tow is worth <strong>$150</strong>. Accident recovery? <strong>$500-1,500</strong>.',
    'At 70% close rate, every missed call costs you roughly <strong>$105</strong> in immediate revenue.',
    'Miss just 5 calls a day? That\'s <strong>$190,000 per year</strong> walking out the door.',
    'And it\'s not just the tow. It\'s the motor club contract that depends on your answer rate. The roadside assist program that drops you. The repeat customer who needed you twice—and found someone else both times.'
  ],
  solutionIntro: 'We add an AI voice agent to your phone line. Not a voicemail. Not a call center. An AI that sounds human and actually dispatches towing calls.',
  solutionSubIntro: 'It picks up on the first ring—every time, 24/7/365, even when every truck is on the road—and it:',
  features: [
    { title: 'Captures location', description: 'Address, cross streets, landmarks—exactly where to send the truck' },
    { title: 'Gets vehicle details', description: 'Make, model, year, condition—so the right truck responds' },
    { title: 'Dispatches immediately', description: 'Job details sent to your driver or dispatch system' },
    { title: 'Handles motor club calls', description: 'PO numbers, service types, mileage limits—captured correctly' }
  ],
  solutionOutcome: 'Your trucks stay busy. Your phones are always answered. Motor clubs keep sending you work.',
  before: 'Your dispatcher is slammed. Drivers are on jobs. The phone keeps ringing and calls go to voicemail while your team plays catch-up.',
  after: 'Every call answered. Every job dispatched. Your team captures every opportunity, 24/7.',
  whyUsIntro: 'We\'re not an AI company that discovered towing.',
  whyUsStory: 'We come from operations—dispatch, field service, 24/7 businesses. We\'ve seen what happens when someone\'s stranded on the highway and nobody picks up.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, run it, and optimize it. You get one monthly fee and phones that are always answered.',
  whyUsGuarantee: 'If it\'s not dispatching jobs, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the AI sounds, what it captures, and how it dispatches.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your operation in mind.',
  faq: [
    {
      question: 'Can the AI actually dispatch jobs to drivers?',
      answer: 'Yes. It captures all job details and sends them directly to your dispatch system or driver\'s phone—location, vehicle info, service type, everything needed to roll.'
    },
    {
      question: 'How does it handle motor club and roadside assistance calls?',
      answer: 'The AI captures PO numbers, service types, mileage authorizations, and all the details motor clubs require. Your paperwork is complete from the first call.'
    },
    {
      question: 'What about complex situations like accidents or heavy recovery?',
      answer: 'It asks the right questions—is the vehicle upright, are there injuries, is law enforcement on scene—and routes appropriately based on your capabilities and protocols.'
    },
    {
      question: 'Does it affect our motor club answer rate metrics?',
      answer: 'Improves them dramatically. Motor clubs track answer rates and response times. The AI answers every call on the first ring, 24/7—your metrics will be best in class.'
    },
    {
      question: 'Can it quote prices?',
      answer: 'If you want. Some companies have the AI give mileage-based estimates. Others prefer to quote after dispatch. We configure it to match your process.'
    }
  ]
};

// Money Page Data - AI Sales Desk: Dental Practices
const dentalData = {
  industry: 'Dental Practices',
  parentService: 'ai-front-desk',
  parentServiceName: 'AI Sales Desk',
  avgJobValue: 1200,
  headline: 'Your Hygienists Are Answering Phones. That\'s Costing You $200/Hour.',
  subheadline: 'AI receptionist that answers every call, books appointments, and handles new patient intake—so your team can focus on patients.',
  problemStatements: [
    'Every time your hygienist answers the phone, production stops.',
    'New patients call once. If you miss it, they call the practice down the street.',
    'Phone rings. It\'s Saturday morning and a patient just chipped a tooth.'
  ],
  problemContext: 'Dental practices lose $50,000-100,000 per year in missed calls and interrupted production. Your front desk is overwhelmed, your clinical staff gets pulled off patients, and new patient calls slip through. The practices growing fastest aren\'t hiring more staff—they\'re answering every call instantly.',
  stats: [
    { value: '35%', label: 'of calls to dental practices go unanswered during business hours' },
    { value: '$200+', label: 'per hour in lost production when hygienists answer phones' },
    { value: '85%', label: 'of callers who reach voicemail don\'t leave a message' }
  ],
  costStatements: [
    'Every missed new patient call costs you <strong>$800-1,500 in lifetime value</strong>. Miss just 5 per week? That\'s <strong>$200,000-400,000 per year</strong> walking to competitors.',
    'When your hygienist stops to answer a call, you lose <strong>$200+ in production</strong>. Multiply that by 10 interruptions per day.',
    'After-hours calls represent <strong>20-30% of total call volume</strong>. Those patients are booking somewhere—just not with you.',
    'A full-time receptionist costs <strong>$40,000-55,000/year</strong>. And they still can\'t answer calls during lunch, after hours, or when they\'re checking in patients.'
  ],
  solutionIntro: 'We build an AI receptionist specifically for dental practices. Not a generic answering service. An AI that knows dental terminology, handles new patient intake, and books directly into your practice management software.',
  solutionSubIntro: 'It answers every call instantly—during hours, after hours, weekends—and it:',
  features: [
    { title: 'Books appointments directly', description: 'Integrates with Dentrix, Eaglesoft, Open Dental, and more—real-time scheduling' },
    { title: 'Handles new patient intake', description: 'Collects insurance info, medical history basics, and reason for visit' },
    { title: 'Answers common questions', description: 'Insurance accepted, hours, directions, services offered—no more repetitive calls' },
    { title: 'Routes emergencies appropriately', description: 'Identifies urgent situations and escalates according to your protocols' }
  ],
  solutionOutcome: 'Every call answered. New patients booked instantly. Your team focuses on the patients in the chair—not the phone.',
  before: 'Phones ring constantly. Front desk is overwhelmed. Hygienists get pulled from patients. New patient calls go to voicemail and never call back.',
  after: 'Every call answered on the first ring. New patients booked before they hang up. Your team focuses on patient care. Production stays on schedule.',
  whyUsIntro: 'We\'re not a generic AI company that discovered dental.',
  whyUsStory: 'We build AI systems for businesses where every call matters. We understand that a missed new patient call isn\'t just an inconvenience—it\'s thousands in lost revenue.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, integrate it with your PMS, train it on your protocols, and optimize it. You get one monthly fee and a front desk that never misses a call.',
  whyUsGuarantee: 'If it\'s not booking patients, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the AI sounds, how it handles new patient intake, and how appointments get booked.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your practice in mind.',
  faq: [
    {
      question: 'Does it integrate with Dentrix, Eaglesoft, or Open Dental?',
      answer: 'Yes. We integrate with major dental practice management systems for real-time scheduling, patient lookup, and appointment booking.'
    },
    {
      question: 'Can it handle insurance verification questions?',
      answer: 'It collects insurance information from new patients and can answer basic questions about which plans you accept. Complex benefits questions get routed to your team.'
    },
    {
      question: 'What about emergency calls on weekends?',
      answer: 'The AI triages urgency—chipped tooth, severe pain, swelling—and routes according to your protocols. True emergencies reach your on-call provider.'
    },
    {
      question: 'Will patients know they\'re talking to an AI?',
      answer: 'Most don\'t notice. The AI sounds natural and handles dental conversations smoothly. Patients care about getting their appointment—not who books it.'
    },
    {
      question: 'How does this affect production vs hiring another front desk person?',
      answer: 'An AI receptionist costs 70-80% less than another hire, works 24/7, and never pulls your hygienists off patients. Most practices see ROI within 60 days.'
    }
  ]
};

// Money Page Data - AI Sales Desk: Law Firms
const legalData = {
  industry: 'Law Firms & Attorneys',
  parentService: 'ai-front-desk',
  parentServiceName: 'AI Sales Desk',
  avgJobValue: 15000,
  headline: 'Every Missed Call Is a Case That Went to Another Firm.',
  subheadline: 'AI receptionist that answers every call, qualifies leads, and captures intake—24/7, even when your office is closed.',
  problemStatements: [
    'Potential clients call once. If you don\'t answer, they call the next firm on Google.',
    'Your staff is doing intake, but they\'re also answering phones, scheduling, and putting out fires.',
    'Phone rings. It\'s 11 PM and someone just got arrested.'
  ],
  problemContext: 'Law firms lose 30-50% of potential clients to missed or slow-answered calls. Your front desk can\'t be everywhere at once, and clients expect immediate response. The firms winning aren\'t just better at law—they\'re better at answering the phone.',
  stats: [
    { value: '35-50%', label: 'of calls to law firms go unanswered or to voicemail' },
    { value: '67%', label: 'of callers won\'t leave a voicemail—they just call the next firm' },
    { value: '$3,000-50,000+', label: 'average case value lost with every missed intake call' }
  ],
  costStatements: [
    'The average personal injury case is worth <strong>$10,000-50,000+</strong> in fees. Family law matters average <strong>$3,000-15,000</strong>. Every missed call is that much walking to your competitor.',
    'Your receptionist costs <strong>$40,000-60,000/year</strong> and still can\'t answer calls after hours, during lunch, or when they\'re helping a client.',
    '<strong>67% of callers</strong> who reach voicemail don\'t leave a message. They hang up and call the next firm.',
    'Potential clients in crisis—divorce, accident, criminal charges—call when they\'re ready to act. That\'s often <strong>nights and weekends</strong>. If you\'re not available, someone else will be.'
  ],
  solutionIntro: 'We build an AI receptionist specifically for law firms. Not a generic answering service. An AI that understands legal intake, qualifies leads based on your criteria, and captures the information you need to follow up.',
  solutionSubIntro: 'It answers every call instantly—during hours, after hours, weekends—and it:',
  features: [
    { title: 'Qualifies leads immediately', description: 'Practice area, urgency, basic case facts—knows who to prioritize' },
    { title: 'Captures detailed intake', description: 'Contact info, incident details, timeline, prior representation—ready for your review' },
    { title: 'Routes urgent matters', description: 'Criminal arrests, restraining orders, accidents—escalated according to your protocols' },
    { title: 'Books consultations', description: 'Directly on your calendar—no back-and-forth, no missed opportunities' }
  ],
  solutionOutcome: 'Every call answered. Leads qualified instantly. Intake captured completely. You wake up to consultation-ready prospects—not missed voicemails.',
  before: 'Calls go to voicemail after hours. Your receptionist is overwhelmed during the day. Potential clients call once, don\'t get through, and hire someone else.',
  after: 'Every call answered on the first ring. Leads qualified and intake captured. Consultations booked automatically. Cases stop walking out the door.',
  whyUsIntro: 'We\'re not a call center that discovered law firms.',
  whyUsStory: 'We build AI systems for businesses where every call represents serious money. We understand that a missed intake call isn\'t just an inconvenience—it\'s a case that went to your competitor.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, train it on your practice areas, configure your intake questions, and optimize it. You get one monthly fee and an intake system that never sleeps.',
  whyUsGuarantee: 'If it\'s not capturing leads, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the AI handles intake calls and how qualified leads get delivered.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your firm in mind.',
  faq: [
    {
      question: 'Can the AI handle intake for different practice areas?',
      answer: 'Yes. We configure different intake flows for PI, family law, criminal defense, immigration—whatever areas you practice. Each gets the right questions.'
    },
    {
      question: 'How does it handle potential clients who call at 2 AM after an arrest?',
      answer: 'It captures all details, assesses urgency, and routes according to your protocols—whether that\'s immediate notification to your on-call attorney or detailed message for morning follow-up.'
    },
    {
      question: 'What information does it capture during intake?',
      answer: 'Contact info, incident details, timeline, injuries/damages, insurance info, prior representation, statute of limitations concerns—everything you need to evaluate the case.'
    },
    {
      question: 'Does it integrate with Clio, MyCase, or our practice management software?',
      answer: 'Yes. We integrate with major legal practice management platforms so intakes flow directly into your system and consultations book on your calendar.'
    },
    {
      question: 'How is this different from a legal answering service?',
      answer: 'Answering services take messages. Our AI actually qualifies the lead, captures detailed intake, assesses case fit, and books consultations—like your best intake specialist, but 24/7.'
    }
  ]
};

// Money Page Data - AI Sales Desk: Medical/Healthcare
const medicalData = {
  industry: 'Medical Practices & Healthcare',
  parentService: 'ai-front-desk',
  parentServiceName: 'AI Sales Desk',
  avgJobValue: 250,
  headline: 'Your Front Desk Is Drowning. Your Patients Are Noticing.',
  subheadline: 'HIPAA-compliant AI receptionist that answers every call, schedules appointments, and handles patient intake—24/7.',
  problemStatements: [
    'Phone rings. Your front desk is checking in patients, answering questions, and managing insurance—all at once.',
    'Phone rings. It\'s 7 PM and a patient needs to reschedule tomorrow\'s appointment.',
    'Phone rings. It\'s flu season and your lines have been jammed for three weeks straight.'
  ],
  problemContext: 'Medical practices lose 20-30% of calls to hold times and voicemail. Patients expect immediate answers—and when they don\'t get them, they find another provider. Your front desk can\'t scale, but your call volume keeps growing.',
  stats: [
    { value: '30%', label: 'of patient calls go unanswered or abandoned on hold' },
    { value: '$150-300', label: 'average value per patient visit' },
    { value: '67%', label: 'of patients will switch providers over poor phone experience' }
  ],
  costStatements: [
    'The average patient lifetime value is <strong>$12,000-25,000</strong> depending on specialty. Lose one patient to a competitor who answered faster? That\'s real money.',
    'Your front desk costs <strong>$35,000-50,000/year per person</strong>. And they still can\'t answer calls while checking in patients.',
    '<strong>30% of calls</strong> to medical practices go unanswered during business hours. After hours? Nearly 100% go to voicemail.',
    'Patients who can\'t get through don\'t leave messages. They call the next practice on their insurance list.'
  ],
  solutionIntro: 'We build a HIPAA-compliant AI receptionist for medical practices. Not a generic answering service. An AI that understands healthcare workflows, handles PHI appropriately, and integrates with your systems.',
  solutionSubIntro: 'It answers every call instantly—during hours, after hours, weekends—and it:',
  features: [
    { title: 'Schedules appointments', description: 'Integrates with your EHR/PM system—real-time availability, no double-booking' },
    { title: 'Handles patient intake', description: 'Collects insurance info, reason for visit, and basic symptoms—HIPAA compliant' },
    { title: 'Triages urgency', description: 'Identifies emergencies and routes appropriately per your protocols' },
    { title: 'Answers common questions', description: 'Hours, location, insurance accepted, prescription refill process—reducing repetitive calls' }
  ],
  solutionOutcome: 'Every call answered. Patients scheduled instantly. Your front desk focuses on the patients in front of them—not the phone.',
  before: 'Phones ring constantly. Patients wait on hold. Front desk is overwhelmed. After-hours calls go to voicemail and patients call elsewhere.',
  after: 'Every call answered on the first ring. Appointments booked 24/7. Front desk focuses on in-person care. Patients feel heard.',
  whyUsIntro: 'We\'re not a generic AI company that discovered healthcare.',
  whyUsStory: 'We build AI systems for businesses where every interaction matters—and where compliance isn\'t optional. We understand HIPAA requirements and healthcare workflows.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, ensure HIPAA compliance, integrate with your PM/EHR, and optimize it. You get one monthly fee and a front desk that never drops a call.',
  whyUsGuarantee: 'If it\'s not booking patients, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the AI handles patient calls and how appointments get scheduled.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your practice in mind.',
  faq: [
    {
      question: 'Is this actually HIPAA compliant?',
      answer: 'Yes. We use HIPAA-compliant infrastructure, sign BAAs, and the AI is trained to handle PHI appropriately. We can walk you through our compliance documentation on the demo call.'
    },
    {
      question: 'How does it integrate with our EHR/practice management system?',
      answer: 'We integrate with most major systems including Epic, Athenahealth, eClinicalWorks, Kareo, and others. The AI checks real-time availability and books directly into your schedule.'
    },
    {
      question: 'What happens with urgent calls or emergencies?',
      answer: 'You define the protocols. The AI can identify urgent symptoms, route to on-call staff, direct to ER, or follow whatever escalation path you specify.'
    },
    {
      question: 'How much does this cost compared to hiring another front desk person?',
      answer: 'Typically 70-80% less than a full-time employee, with 24/7 coverage. Most practices see ROI within 60 days from reduced missed calls alone.'
    },
    {
      question: 'Will patients know they\'re talking to an AI?',
      answer: 'The AI is transparent when asked directly, but most patients don\'t notice—they just appreciate getting an immediate answer instead of hold music.'
    }
  ]
};

// Money Page Data - AI Sales Desk: Chiropractic/PT/Wellness
const chiroData = {
  industry: 'Chiropractic & Wellness Practices',
  parentService: 'ai-front-desk',
  parentServiceName: 'AI Sales Desk',
  avgJobValue: 150,
  headline: '47% of New Patients Find You Through Google. Then They Get Voicemail.',
  subheadline: 'AI receptionist that captures online searchers the moment they call—before they book your competitor.',
  problemStatements: [
    'Someone Googles "chiropractor near me." They find you. They call. You\'re with a patient. They call the next listing.',
    'A new patient referral calls at 5:30 PM. You closed at 5. They book elsewhere.',
    'Your front desk is adjusting the schedule, checking patients out, and the phone keeps ringing.'
  ],
  problemContext: 'Chiropractic practices have a unique challenge: 47% of new patients find you through online search, but you\'re a small team focused on patient care. Unlike medical offices with large front desk staffs, you\'re competing against chains and bigger practices with one or two people. When you can\'t answer, the searcher calls the next result.',
  stats: [
    { value: '47%', label: 'of new chiropractic patients find their provider through Google' },
    { value: '$3,500+', label: 'average lifetime value per wellness patient (12+ visits/year)' },
    { value: '85%', label: 'of callers who reach voicemail don\'t leave a message—they call your competitor' }
  ],
  costStatements: [
    'A loyal chiropractic patient visits <strong>12-24 times per year</strong>. At $75-150/visit, that\'s <strong>$900-3,600 annual value</strong>—for years.',
    'Unlike medical practices with insurance driving referrals, you compete for <strong>every new patient through search</strong>. Answering first wins.',
    'Wellness practices have <strong>higher rebooking rates than medical</strong>—but only if you capture them initially. Miss the first call, miss the relationship.',
    'A solo practice losing just 3 new patients per week to missed calls loses <strong>$500K+ in lifetime value</strong> annually.'
  ],
  solutionIntro: 'We build an AI receptionist for solo and small chiropractic practices. Not designed for hospital systems—designed for your reality: small team, high call volume, every new patient matters.',
  solutionSubIntro: 'It answers every call instantly—during hours, after hours, weekends—and it:',
  features: [
    { title: 'Captures Google searchers', description: 'New patient calls answered instantly—before they call the next listing' },
    { title: 'Handles wellness-specific intake', description: 'Collects symptoms, goals, insurance, and preferred appointment times' },
    { title: 'Books into your PM system', description: 'ChiroTouch, Jane App, Genesis—real-time availability, no double-booking' },
    { title: 'Explains your approach', description: 'Answers questions about what you treat, first visit expectations, and your philosophy' }
  ],
  solutionOutcome: 'You compete with bigger practices without bigger staff. Every search-driven call captured. Every new patient opportunity converted.',
  before: 'Google sends you leads. You miss the calls. They book elsewhere. You spend money on SEO and ads for patients who never become patients.',
  after: 'Every call answered instantly. Search traffic converts. Small team competes with big practices. New patient acquisition becomes predictable.',
  whyUsIntro: 'We\'re not built for hospital systems.',
  whyUsStory: 'We understand solo and small wellness practices. You don\'t have a call center. You don\'t have three receptionists. You have a small team doing everything—and you still need to answer every call to grow.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, integrate with your practice management software, and optimize for your patient acquisition needs.',
  whyUsGuarantee: 'If it\'s not booking new patients, we fix it. That\'s the deal.',
  ctaHeadline: 'Capture Every Google Search',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the AI handles new patient calls and books appointments.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your practice in mind.',
  faq: [
    {
      question: 'How is this different from what medical practices use?',
      answer: 'Medical practices have different dynamics—insurance referrals, larger staffs, less search-driven acquisition. We\'re built for wellness practices where Google sends most new patients and you compete for every one.'
    },
    {
      question: 'Does it integrate with ChiroTouch and Jane App?',
      answer: 'Yes. We integrate with ChiroTouch, Jane App, Genesis, and most chiropractic PM systems. Appointments book directly into your schedule in real-time.'
    },
    {
      question: 'Can it explain what conditions I treat?',
      answer: 'Yes. We train it on your services—back pain, neck pain, sports injuries, whatever your focus. It answers questions and helps callers understand if you\'re right for them.'
    },
    {
      question: 'What about existing patients calling to reschedule?',
      answer: 'Handles those too. It can look up appointments, reschedule within your rules, and confirm changes—freeing your front desk from routine calls.'
    },
    {
      question: 'How does pricing compare to a part-time receptionist?',
      answer: '60-70% less than part-time help, with 24/7 coverage instead of limited hours. For a solo practice, it\'s the difference between answering every call and losing new patients.'
    }
  ]
};

// Money Page Data - Outbound Engine: Staffing Agencies
const outboundStaffingData = {
  industry: 'Staffing & Recruiting Agencies',
  parentService: 'ai-outbound',
  parentServiceName: 'Outbound Engine',
  headline: 'Client Acquisition Is Now Your #1 Problem. We Fix It.',
  subheadline: 'AI outbound system that finds hiring managers, books discovery calls, and fills your pipeline—on autopilot.',
  problemStatements: [
    'Your recruiters should be closing deals, not cold calling.',
    'You know companies are hiring. You just can\'t reach them fast enough.',
    'Every hour spent prospecting is an hour not spent placing candidates.'
  ],
  problemContext: 'Finding new clients jumped from the #4 challenge to #1 for staffing agencies in 2025. While your team is dialing, your competitors are already in the door. The agencies winning aren\'t working harder—they\'re reaching more decision-makers, faster.',
  stats: [
    { value: '23%', label: 'of agencies say client acquisition is their top challenge—up from 16% last year' },
    { value: '$9,000-15,000', label: 'average placement fee for mid-level roles' },
    { value: '12-15', label: 'meetings per month—that\'s all most SDRs book' }
  ],
  costStatements: [
    'The average direct hire placement fee is <strong>$9,000-15,000</strong> for mid-level roles. Executive placements run <strong>$25,000-50,000+</strong>.',
    'One SDR running manual outreach books maybe <strong>12-15 meetings per month</strong>. That\'s the industry benchmark.',
    'What if you could 3x that without hiring? That\'s <strong>$270,000+ in additional pipeline</strong> per quarter.',
    'And it\'s not just the placement. It\'s the temp-to-perm conversion. The repeat business. The client who uses you for every hire—gone to whoever reached them first.'
  ],
  solutionIntro: 'We build an AI outbound system that prospects for you. Not a generic email blast. A multi-channel engine that finds hiring managers and books calls with decision-makers.',
  solutionSubIntro: 'It runs 24/7—targeting your ideal clients across email, LinkedIn, and phone—and it:',
  features: [
    { title: 'Identifies hiring signals', description: 'Job postings, growth announcements, leadership changes—companies actively hiring' },
    { title: 'Personalizes at scale', description: 'Industry, recent news, specific hiring needs—every message is relevant' },
    { title: 'Books discovery calls', description: 'Directly on your calendar—no back-and-forth, no manual follow-up' },
    { title: 'Nurtures non-responders', description: 'Automated sequences that keep you top-of-mind until they\'re ready' }
  ],
  solutionOutcome: 'Your recruiters focus on placements. Your pipeline fills itself. You stop losing deals to whoever reached out first.',
  before: 'Your team spends mornings cold calling. Afternoons following up. Evenings wondering why the pipeline is thin. The feast-or-famine cycle never ends.',
  after: 'Discovery calls appear on your calendar. Your recruiters walk into conversations with warm prospects. Pipeline grows even when you\'re focused on filling roles.',
  whyUsIntro: 'We\'re not an AI company that discovered staffing.',
  whyUsStory: 'We come from operations—sales, lead generation, relationship-driven businesses. We\'ve seen what happens when great recruiters are stuck prospecting instead of closing.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, run it, and optimize it. You get one monthly fee and a calendar that fills itself.',
  whyUsGuarantee: 'If it\'s not booking meetings, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the system finds prospects, what the outreach looks like, and how meetings get booked.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your agency in mind.',
  faq: [
    {
      question: 'How do you find companies that are hiring?',
      answer: 'We track hiring signals—job postings, growth indicators, funding news—and target decision-makers at companies actively building teams in your specialty areas.'
    },
    {
      question: 'What channels does the outbound use?',
      answer: 'Multi-channel: email, LinkedIn, and optional phone. We personalize messaging based on the company\'s industry, recent hires, and specific pain points.'
    },
    {
      question: 'How many meetings can we expect per month?',
      answer: 'Depends on your niche and ICP, but most staffing agencies see 15-30+ qualified meetings per month once the system is optimized.'
    },
    {
      question: 'What makes this different from buying a lead list?',
      answer: 'Lead lists give you names. We give you booked meetings with decision-makers who\'ve already engaged with your messaging and agreed to talk.'
    },
    {
      question: 'How long until we see results?',
      answer: 'Most agencies see first meetings within 2-3 weeks of launch. Full optimization takes 30-60 days as we learn what messaging resonates with your ICP.'
    }
  ]
};

// Money Page Data - Outbound Engine: B2B SaaS
const outboundSaasData = {
  industry: 'B2B SaaS Companies',
  parentService: 'ai-outbound',
  parentServiceName: 'Outbound Engine',
  headline: 'Your SDRs Cost $130K and Book 12 Meetings a Month',
  subheadline: 'AI outbound system that books qualified demos at a fraction of the cost—without the headcount.',
  problemStatements: [
    'SDRs spend 2 hours a day actually selling. The rest is research and admin.',
    'You\'re paying $80K+ base for maybe 12-15 meetings a month.',
    'Pipeline depends on human effort that doesn\'t scale.'
  ],
  problemContext: '70% of B2B sales reps missed quota in 2024. SDRs cost more, book less, and burn out faster. Meanwhile, your competitors are automating outbound and reaching 10x more prospects with the same budget.',
  stats: [
    { value: '$130K+', label: 'true cost per SDR when you add benefits, tools, management, and ramp' },
    { value: '12-15', label: 'meetings per month—industry benchmark with 80% show rate' },
    { value: '70%', label: 'of B2B sales reps missed quota in 2024' }
  ],
  costStatements: [
    'The average SDR costs <strong>$80,000+ base</strong>. Add benefits, tools, management overhead, and ramp time? You\'re at <strong>$130,000+ per year</strong>.',
    'They book <strong>12-15 meetings per month</strong>. That\'s roughly <strong>$700+ per meeting</strong>.',
    'What if you could book the same meetings for <strong>$50-100 each</strong>? That\'s 7-10x more pipeline efficiency.',
    'And it\'s not just the meetings. It\'s the accounts you never reached. The competitors who got there first. The pipeline gap that cost you the quarter.'
  ],
  solutionIntro: 'We build an AI outbound system that does what your SDRs do—but at 10x the scale. Not spam. Personalized, multi-channel outreach that books qualified demos.',
  solutionSubIntro: 'It runs continuously—targeting your ICP across email, LinkedIn, and phone—and it:',
  features: [
    { title: 'Finds your ICP', description: 'Company size, tech stack, funding stage, hiring signals—accounts that match' },
    { title: 'Personalizes every touch', description: 'Recent news, job postings, LinkedIn activity—real personalization, not mail merge' },
    { title: 'Books qualified demos', description: 'Directly on your AEs\' calendars with context on the prospect' },
    { title: 'Handles follow-up', description: 'Automated sequences, objection handling, meeting confirmations' }
  ],
  solutionOutcome: 'Your AEs get more at-bats. Your pipeline grows predictably. You stop paying SDR salaries for SDR problems.',
  before: 'SDRs ramp for 3 months, hit quota for 6, then leave. You\'re constantly hiring, training, managing. Pipeline depends entirely on human effort.',
  after: 'Demos appear on your AEs\' calendars. Pipeline grows while you sleep. You scale outbound without scaling headcount.',
  whyUsIntro: 'We\'re not an AI company that discovered SaaS sales.',
  whyUsStory: 'We come from operations—outbound, pipeline generation, revenue teams. We\'ve seen what happens when great AEs sit idle because the top of funnel dried up.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, run it, and optimize it. You get one monthly fee and a pipeline that fills itself.',
  whyUsGuarantee: 'If it\'s not booking demos, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the system targets accounts, what the outreach looks like, and how demos get booked.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your sales motion in mind.',
  faq: [
    {
      question: 'How does AI outbound compare to hiring more SDRs?',
      answer: 'An SDR costs $130K+ fully loaded and books 12-15 meetings/month. Our system books similar volume at 70-80% lower cost—and scales without adding headcount.'
    },
    {
      question: 'Is this just automated spam?',
      answer: 'No. We use real personalization—recent funding, job postings, tech stack signals, LinkedIn activity—not mail merge tokens. Prospects respond because the outreach is relevant.'
    },
    {
      question: 'What channels do you use?',
      answer: 'Multi-channel: email, LinkedIn, and optional phone/SMS. We test and optimize which channels work best for your ICP and messaging.'
    },
    {
      question: 'How do you ensure lead quality?',
      answer: 'We target accounts matching your ICP criteria—company size, industry, tech stack, funding stage—and the system qualifies interest before booking. Your AEs get real opportunities.'
    },
    {
      question: 'How long until we see pipeline impact?',
      answer: 'First demos typically book within 2-3 weeks. Full ramp takes 30-60 days as we optimize targeting and messaging based on response data.'
    }
  ]
};

// Money Page Data - Outbound Engine: IT Services & MSPs
const outboundMspData = {
  industry: 'IT Services & MSPs',
  parentService: 'ai-outbound',
  parentServiceName: 'Outbound Engine',
  headline: 'By the Time They Call You, They\'ve Talked to 3 Competitors',
  subheadline: 'AI outbound system that finds businesses with IT pain and books discovery calls—before your competition does.',
  problemStatements: [
    'Your best clients came from referrals. But referrals don\'t scale.',
    'The businesses that need you don\'t know you exist.',
    'You\'re waiting for the phone to ring while competitors knock on doors.'
  ],
  problemContext: 'MSP growth is a prospecting problem. Referrals are great—until you need to grow faster than word-of-mouth allows. The MSPs scaling right now aren\'t better at IT. They\'re better at getting in front of businesses before anyone else.',
  stats: [
    { value: '$1,000-10,000', label: 'monthly recurring revenue per managed services client' },
    { value: '3-5 years', label: 'average client lifetime—that\'s $36K-600K in LTV' },
    { value: '1 client/month', label: 'adds $12K-120K in annual recurring revenue' }
  ],
  costStatements: [
    'The average MSP client is worth <strong>$1,000-10,000/month</strong>. Over 3-5 years, that\'s <strong>$36,000-600,000 in lifetime value</strong>.',
    'One new managed services client per month adds <strong>$12,000-120,000 in annual recurring revenue</strong>.',
    'What if outbound could deliver <strong>5-10 qualified discovery calls per month</strong>? Even at 20% close rate, that transforms your growth.',
    'And it\'s not just the contract. It\'s the project work. The hardware sales. The referrals to their network—all gone to whoever reached out first.'
  ],
  solutionIntro: 'We build an AI outbound system that finds businesses with IT pain. Not generic cold email. Targeted outreach to decision-makers at companies that match your ideal client profile.',
  solutionSubIntro: 'It runs continuously—targeting your ICP across email, LinkedIn, and phone—and it:',
  features: [
    { title: 'Finds businesses with IT pain', description: 'Outdated tech, security incidents, growth signals—companies that need help' },
    { title: 'Reaches the right people', description: 'Business owners, office managers, IT directors—whoever makes the decision' },
    { title: 'Books discovery calls', description: 'Directly on your calendar with context on their environment' },
    { title: 'Nurtures the not-yets', description: 'Automated sequences until their current provider fails them' }
  ],
  solutionOutcome: 'Your pipeline doesn\'t depend on referrals. You get in front of businesses before they start shopping. MRR growth becomes predictable.',
  before: 'You rely on referrals, maybe run some ads, attend networking events. Growth is sporadic. When a big client churns, you scramble.',
  after: 'Discovery calls appear on your calendar. You talk to business owners who have real IT pain. MRR grows predictably month over month.',
  whyUsIntro: 'We\'re not an AI company that discovered MSPs.',
  whyUsStory: 'We come from operations—B2B sales, recurring revenue businesses, service companies. We\'ve seen what happens when great MSPs can\'t fill their pipeline.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, run it, and optimize it. You get one monthly fee and a calendar that fills itself.',
  whyUsGuarantee: 'If it\'s not booking calls, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the system finds prospects, what the outreach looks like, and how calls get booked.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your MSP in mind.',
  faq: [
    {
      question: 'How do you find businesses that need IT help?',
      answer: 'We track pain signals—outdated tech stacks, security incidents in their industry, growth indicators, and companies outgrowing their current IT setup. These are businesses ready to talk.'
    },
    {
      question: 'What size companies do you target?',
      answer: 'You define it. Most MSPs target 20-200 employee companies, but we can focus on whatever segment is your sweet spot—by size, industry, or specific technology needs.'
    },
    {
      question: 'How is this different from buying leads?',
      answer: 'Bought leads are names and numbers. We deliver booked discovery calls with business owners who\'ve engaged with your messaging and agreed to talk about their IT challenges.'
    },
    {
      question: 'What MRR can we expect per closed deal?',
      answer: 'That depends on your pricing, but most MSPs close deals worth $1,500-5,000+ MRR from our pipeline. The key is getting more at-bats with qualified prospects.'
    },
    {
      question: 'How many calls should we expect per month?',
      answer: 'Most MSPs see 10-25 qualified discovery calls per month once optimized. Your close rate determines how that translates to new MRR.'
    }
  ]
};

// Money Page Data - Outbound Engine: Marketing Agencies
const outboundAgencyData = {
  industry: 'Marketing & Creative Agencies',
  parentService: 'ai-outbound',
  parentServiceName: 'Outbound Engine',
  headline: 'You\'re Great at Marketing. Except for Your Own Agency.',
  subheadline: 'AI outbound system that fills your pipeline—so you stop the feast-or-famine cycle.',
  problemStatements: [
    'When you\'re busy with client work, prospecting stops.',
    'When client work dries up, you scramble to fill the pipeline.',
    'You know how to market everyone except yourself.'
  ],
  problemContext: 'Every agency knows this cycle: you\'re slammed with client work, so you stop prospecting. Then projects end, and suddenly you\'re desperate for new business. The agencies breaking this cycle aren\'t better at marketing—they have systems that prospect while they deliver.',
  stats: [
    { value: '$5,000-25,000', label: 'average monthly retainer per client' },
    { value: '12-24 months', label: 'typical client lifetime = $60K-600K in LTV' },
    { value: '0 hours', label: 'time you have for prospecting when client work is busy' }
  ],
  costStatements: [
    'The average agency client is worth <strong>$5,000-25,000/month</strong>. Over 12-24 months, that\'s <strong>$60,000-600,000 in lifetime value</strong>.',
    'But you\'re so busy delivering for current clients that <strong>prospecting stops</strong>. Then a big client churns and you\'re scrambling.',
    'Hiring a salesperson costs <strong>$80,000-120,000/year</strong>. And they still need leads to work.',
    'What if qualified discovery calls appeared on your calendar <strong>automatically</strong>—whether you\'re busy or slow?'
  ],
  solutionIntro: 'We build an AI outbound system that prospects for your agency while you focus on client work. Not generic cold email. Targeted outreach to companies that need what you do.',
  solutionSubIntro: 'It runs continuously—filling your pipeline whether you\'re busy or slow—and it:',
  features: [
    { title: 'Finds companies that need you', description: 'Hiring marketers, launching products, funding announcements—signals they need agency help' },
    { title: 'Personalizes every touch', description: 'Their industry, recent news, specific challenges—outreach that gets responses' },
    { title: 'Books discovery calls', description: 'Directly on your calendar with context on the prospect' },
    { title: 'Runs when you\'re busy', description: 'Pipeline fills itself while you\'re heads-down on client work' }
  ],
  solutionOutcome: 'Your pipeline never dries up. Discovery calls appear whether you\'re busy or slow. The feast-or-famine cycle ends.',
  before: 'Busy months mean no prospecting. Slow months mean panic. Every client departure triggers a scramble. Revenue is unpredictable.',
  after: 'Discovery calls appear on your calendar automatically. Pipeline fills while you deliver great work. Revenue becomes predictable.',
  whyUsIntro: 'We\'re not an AI company that discovered agencies.',
  whyUsStory: 'We understand the agency model—we\'ve lived it. We know that the best agencies still struggle with their own business development because client work always comes first.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, run it, and optimize it. You get one monthly fee and a pipeline that fills itself.',
  whyUsGuarantee: 'If it\'s not booking calls, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the system finds prospects and books discovery calls.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your agency in mind.',
  faq: [
    {
      question: 'How do you find companies that need marketing help?',
      answer: 'We target businesses showing growth signals—hiring, funding, new locations, outdated websites—companies investing in growth but lacking marketing sophistication.'
    },
    {
      question: 'What industries work best?',
      answer: 'You define your ICP. Some agencies target specific verticals (SaaS, healthcare, professional services). Others go broader. We build around your sweet spot.'
    },
    {
      question: 'How do you prevent competing with our own clients?',
      answer: 'We exclude your current clients, past clients, and any industries or companies you specify. Your reputation is protected.'
    },
    {
      question: 'How long until we see pipeline?',
      answer: 'First discovery calls typically book within 2-3 weeks. Full optimization takes 30-60 days as we learn what messaging resonates with your ideal clients.'
    },
    {
      question: 'What retainer size clients does this typically bring?',
      answer: 'Depends on your positioning and ICP targeting. Most agencies see prospects in the $3K-15K/month range, with some enterprise opportunities at higher values.'
    }
  ]
};

// Money Page Data - Outbound Engine: Financial Advisors
const outboundAdvisorData = {
  industry: 'Financial Advisors',
  parentService: 'ai-outbound',
  parentServiceName: 'Outbound Engine',
  headline: 'Your COI Relationships Are Underperforming. Let\'s Fix That.',
  subheadline: 'AI outbound system that identifies high-net-worth prospects and books qualified appointments—on autopilot.',
  problemStatements: [
    'You\'re waiting for referrals that come sporadically.',
    'Your COI relationships could produce more, but you don\'t have time to nurture them all.',
    'HNW prospects are being reached by your competitors while you wait.'
  ],
  problemContext: 'Most financial advisors rely on referrals and hope. But hope isn\'t a strategy, and referrals are unpredictable. The advisors growing AUM fastest have proactive prospecting systems—they\'re reaching HNW individuals before competitors do.',
  stats: [
    { value: '$500K+', label: 'average AUM per client' },
    { value: '1% fee', label: '= $5,000+ per year per client, recurring' },
    { value: '10-20 years', label: 'typical client relationship—massive LTV' }
  ],
  costStatements: [
    'The average advisory client brings <strong>$500,000+ in AUM</strong>. At 1% fee, that\'s <strong>$5,000+ per year</strong>—recurring for 10-20 years.',
    'One new HNW client is worth <strong>$50,000-100,000+ in lifetime fees</strong>. How many are you adding per month?',
    'Your competitors are reaching out to HNW individuals <strong>proactively</strong>. By the time they call you, they\'ve already talked to three other advisors.',
    'What if you could get in front of <strong>5-10 qualified HNW prospects per month</strong>—automatically?'
  ],
  solutionIntro: 'We build an AI outbound system that identifies and reaches HNW prospects before your competition. Not spam. Targeted, compliant outreach that books qualified appointments.',
  solutionSubIntro: 'It runs continuously—building your prospect pipeline—and it:',
  features: [
    { title: 'Identifies HNW prospects', description: 'Business owners, executives, liquidity events—people who need advisory services' },
    { title: 'Reaches out appropriately', description: 'Compliant, professional outreach that positions you as a resource' },
    { title: 'Books qualified appointments', description: 'Directly on your calendar with background on the prospect' },
    { title: 'Nurtures your COI network', description: 'CPAs, attorneys, insurance pros—keeps relationships warm for referrals' }
  ],
  solutionOutcome: 'Your calendar fills with qualified HNW prospects. AUM growth becomes predictable. You stop waiting for referrals that may never come.',
  before: 'You rely on referrals and wait. Some months are good, some are quiet. Competitors reach prospects before you do. AUM growth is unpredictable.',
  after: 'Qualified appointments appear on your calendar. You talk to HNW prospects proactively. AUM growth becomes consistent and predictable.',
  whyUsIntro: 'We\'re not an AI company that discovered financial services.',
  whyUsStory: 'We build systems for relationship-driven businesses with high client lifetime value. We understand that one HNW client can be worth more than a year of marketing spend.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, run it, and optimize it. You get one monthly fee and a prospect pipeline that fills itself.',
  whyUsGuarantee: 'If it\'s not booking appointments, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the system identifies prospects and books appointments.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your practice in mind.',
  faq: [
    {
      question: 'How do you identify high-net-worth prospects?',
      answer: 'We look for wealth indicators—business ownership, executive titles, liquidity events, real estate holdings, and professional signals that indicate advisory needs and capacity.'
    },
    {
      question: 'Is the outreach compliance-friendly?',
      answer: 'Yes. We focus on educational, value-first messaging—not cold pitches. The outreach positions you as a resource, not a salesperson. We can work with your compliance team.'
    },
    {
      question: 'How does the COI nurturing work?',
      answer: 'We help you stay in front of CPAs, attorneys, and insurance professionals with relevant touchpoints—market updates, educational content, referral requests—keeping relationships warm.'
    },
    {
      question: 'How many qualified appointments per month?',
      answer: 'Most advisors see 5-15 qualified HNW appointments per month once optimized. Quality matters more than quantity—one good client can be worth $100K+ in lifetime fees.'
    },
    {
      question: 'What AUM level prospects do you target?',
      answer: 'You define your minimums. Most advisors target $500K+ investable assets, but we can focus on whatever segment fits your practice.'
    }
  ]
};

// Money Page Data - Referral Engine: Real Estate Agents
const referralRealEstateData = {
  industry: 'Real Estate Agents',
  parentService: 'referral',
  parentServiceName: 'Referral Engine',
  headline: '82% of Your Business Should Come From Referrals. Does It?',
  subheadline: 'AI referral system that nurtures your network, stays top-of-mind, and activates referrals—on autopilot.',
  problemStatements: [
    'You know referrals are your best leads. But you\'re not working your network systematically.',
    'Past clients love you. They just forget to mention you when someone asks.',
    'You met agents at that conference. When did you last follow up?'
  ],
  problemContext: '82% of real estate transactions come from referrals and repeat business. Top agents don\'t get more referrals because they\'re better at real estate—they get more because they have a system. Everyone else relies on memory. Memory fails.',
  stats: [
    { value: '82%', label: 'of real estate sales come from referrals and repeat business' },
    { value: '41%', label: 'of agent income comes from repeat clients and referrals' },
    { value: '25%', label: 'typical agent-to-agent referral fee—pure profit for introductions' }
  ],
  costStatements: [
    '<strong>82% of real estate transactions</strong> come from referrals and repeat business. This is where money is made.',
    'The typical agent-to-agent referral fee is <strong>25% of commission</strong>. Send 10 referrals a year at $10K average commission? That\'s <strong>$25,000 for making introductions</strong>.',
    'But referrals don\'t happen by accident. They happen when you <strong>stay top-of-mind</strong> with past clients, sphere, and partner agents.',
    'Every month you\'re not nurturing your network, referrals are going to agents who stayed in touch.'
  ],
  solutionIntro: 'We build an AI referral system that works your network for you. Not a CRM you have to remember to use. An engine that nurtures relationships and activates referrals automatically.',
  solutionSubIntro: 'It runs continuously—keeping you top-of-mind with your entire sphere—and it:',
  features: [
    { title: 'Finds new referral partners', description: 'Agents in other markets, lenders, title reps—potential partners identified and reached' },
    { title: 'Nurtures existing relationships', description: 'Past clients, sphere, partner agents—automated touches that feel personal' },
    { title: 'Activates referrals', description: 'Timely asks, anniversary reminders, life event triggers—referrals happen when you ask' },
    { title: 'Tracks your network', description: 'Who sent you business, who you owe, who\'s gone cold—all visible in one place' }
  ],
  solutionOutcome: 'Your network works for you. Referrals flow predictably. You stop losing business to agents who simply stayed in touch.',
  before: 'You mean to follow up with past clients. You intend to reach out to that agent from the conference. Life gets busy. Referrals happen randomly—or not at all.',
  after: 'Your network hears from you consistently. Past clients remember you when someone asks for an agent. Referrals become predictable revenue.',
  whyUsIntro: 'We\'re not an AI company that discovered real estate.',
  whyUsStory: 'We built this for relationship-driven businesses—agents, lenders, brokers. We\'ve seen what happens when great agents let their network go cold.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, run it, and optimize it. You get one monthly fee and a referral network that actually works.',
  whyUsGuarantee: 'If it\'s not generating referrals, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the system nurtures your network and how referrals get activated.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your business in mind.',
  faq: [
    {
      question: 'How is this different from just using a CRM?',
      answer: 'A CRM stores contacts. Our system actually works them—automated outreach, timely follow-ups, referral asks—without you having to remember or find time.'
    },
    {
      question: 'What kind of touches does it send?',
      answer: 'Home anniversary reminders, market updates, birthday messages, check-ins, and strategic referral asks. All personalized and timed for maximum impact.'
    },
    {
      question: 'How does it find new referral partners?',
      answer: 'We identify agents in relocation markets, lenders, title reps, and other COIs—then reach out to build the relationship on your behalf.'
    },
    {
      question: 'Will my sphere know it\'s automated?',
      answer: 'No. The touches feel personal and are written in your voice. Most people just think you\'re great at staying in touch.'
    },
    {
      question: 'How quickly do referrals increase?',
      answer: 'Most agents see increased referral activity within 60-90 days. The system compounds over time—the longer you nurture, the more referrals flow.'
    }
  ]
};

// Money Page Data - Referral Engine: Mortgage Lenders
const referralMortgageData = {
  industry: 'Mortgage Lenders & Loan Officers',
  parentService: 'referral',
  parentServiceName: 'Referral Engine',
  headline: '87% of Your Business Comes From Referrals. Are You Nurturing Them?',
  subheadline: 'AI referral system that keeps you top-of-mind with agents and past clients—on autopilot.',
  problemStatements: [
    'Your realtor relationships are everything. When did you last touch base with all of them?',
    'You have agents who used to send you deals. They just... stopped.',
    'Your competitors are calling on your agents. Every. Single. Week.'
  ],
  problemContext: '87% of mortgage business comes from referrals and past clients. Loan officers live and die by their realtor relationships. But relationships fade when you don\'t nurture them. The LOs winning right now aren\'t better at mortgages—they\'re better at staying top-of-mind.',
  stats: [
    { value: '87%', label: 'of mortgage business comes from referrals and past clients' },
    { value: '$4,000-8,000', label: 'average commission per loan' },
    { value: '5-20 loans/year', label: 'potential from one strong agent relationship' }
  ],
  costStatements: [
    '<strong>87% of mortgage business</strong> comes from referrals and past clients. This is the game.',
    'The average loan generates <strong>$4,000-8,000 in commission</strong>. A strong agent relationship can send you <strong>5-20 loans per year</strong>.',
    'That\'s <strong>$20,000-160,000 per agent relationship</strong>—if they remember you when they have a buyer.',
    'Every agent you\'re not nurturing is an agent your competitor is calling right now.'
  ],
  solutionIntro: 'We build an AI referral system that nurtures your agent relationships for you. Not another CRM. An engine that keeps you top-of-mind with agents automatically.',
  solutionSubIntro: 'It runs continuously—working your realtor network—and it:',
  features: [
    { title: 'Finds new agent partners', description: 'Active agents in your market, new licensees, teams without a preferred lender' },
    { title: 'Nurtures existing relationships', description: 'Co-marketing, market updates, check-in touches—automated but personal' },
    { title: 'Re-engages cold relationships', description: 'Agents who used to send deals but went quiet—we bring them back' },
    { title: 'Tracks relationship health', description: 'Who\'s sending deals, who\'s gone cold, who needs attention—all visible' }
  ],
  solutionOutcome: 'Your agent network stays warm. Referrals flow predictably. You stop losing relationships to LOs who out-hustle you.',
  before: 'You mean to call your agents. You plan to stop by their office. But you\'re busy closing loans. Relationships fade. Deals go elsewhere.',
  after: 'Your agents hear from you consistently. You\'re top-of-mind when they have a buyer. Referrals become predictable, not random.',
  whyUsIntro: 'We\'re not an AI company that discovered mortgage.',
  whyUsStory: 'We built this for relationship-driven businesses—lenders, agents, brokers. We\'ve seen what happens when great LOs lose deals to competitors who stayed in touch.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, run it, and optimize it. You get one monthly fee and agent relationships that stay warm.',
  whyUsGuarantee: 'If it\'s not generating referrals, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the system nurtures your agent network and keeps you top-of-mind.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your business in mind.',
  faq: [
    {
      question: 'How does the system nurture agent relationships?',
      answer: 'Co-marketing offers, market updates, rate alerts, check-in messages—consistent touches that keep you top-of-mind without being annoying.'
    },
    {
      question: 'Can it help reactivate agents who stopped sending deals?',
      answer: 'Yes. We have specific re-engagement sequences for cold relationships. Often agents went quiet because life got busy—not because they found someone better.'
    },
    {
      question: 'How does it find new agent partners?',
      answer: 'We identify active agents in your area, new licensees, and teams without a preferred lender—then reach out on your behalf to start the relationship.'
    },
    {
      question: 'What about past clients for refi business?',
      answer: 'The system tracks rate changes and reaches out to past clients when refinancing makes sense for their situation—automated opportunity alerts.'
    },
    {
      question: 'How many new agent relationships can I expect?',
      answer: 'Most LOs add 5-15 new agent conversations per month. Not all convert to referral partners, but consistent outreach builds your network over time.'
    }
  ]
};

// Money Page Data - Referral Engine: Insurance Brokers
const referralInsuranceData = {
  industry: 'Insurance Brokers',
  parentService: 'referral',
  parentServiceName: 'Referral Engine',
  headline: 'You Touch Clients Once a Year at Renewal. Then Wonder Why Referrals Are Slow.',
  subheadline: 'AI referral system that nurtures client relationships and activates referrals—year-round, on autopilot.',
  problemStatements: [
    'Your best clients would refer you—if they remembered to.',
    'You have COI relationships with realtors and lenders. Are you nurturing them?',
    'Renewal is your only touchpoint. That\'s not a relationship.'
  ],
  problemContext: 'Insurance is a relationship business disguised as a paperwork business. The brokers growing fastest aren\'t better at underwriting—they\'re better at staying connected. People don\'t refer businesses they forget.',
  stats: [
    { value: '5-10 years', label: 'average client retention—massive lifetime value' },
    { value: '$2,500-50,000', label: 'lifetime value per P&C client' },
    { value: '1 touchpoint/year', label: 'is all most clients get—then you wonder why they don\'t refer' }
  ],
  costStatements: [
    'The average P&C client pays <strong>$500-5,000/year in premium</strong>. Over 5-10 years, that\'s <strong>$2,500-50,000 in lifetime value</strong>.',
    'But insurance clients forget you exist between renewals. And <strong>people don\'t refer businesses they forget</strong>.',
    'What if every client got <strong>valuable touchpoints throughout the year</strong>—not just renewal notices?',
    'Every client who forgets you is a client who won\'t refer you. Every COI you\'re not nurturing is sending business to someone else.'
  ],
  solutionIntro: 'We build an AI referral system that keeps you connected to clients and COIs year-round. Not renewal reminders. Relationship nurturing that generates referrals.',
  solutionSubIntro: 'It runs continuously—working your book of business and professional network—and it:',
  features: [
    { title: 'Nurtures client relationships', description: 'Life events, policy anniversaries, seasonal tips—touchpoints that add value' },
    { title: 'Builds COI relationships', description: 'Realtors, lenders, attorneys, accountants—referral partners identified and nurtured' },
    { title: 'Activates referrals', description: 'Timely asks, referral programs, incentives—referrals happen when you ask' },
    { title: 'Tracks your network', description: 'Who\'s referring, who\'s gone quiet, who needs attention—all visible' }
  ],
  solutionOutcome: 'Your clients remember you. Your COIs think of you first. Referrals flow year-round—not just at renewal.',
  before: 'You talk to clients once a year. You mean to nurture your COI relationships. Life gets busy. Referrals happen randomly.',
  after: 'Your clients hear from you consistently. Your COIs send you business. Referrals become predictable revenue.',
  whyUsIntro: 'We\'re not an AI company that discovered insurance.',
  whyUsStory: 'We built this for relationship-driven businesses. We\'ve seen what happens when great brokers let their network go cold.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, run it, and optimize it. You get one monthly fee and relationships that generate referrals.',
  whyUsGuarantee: 'If it\'s not generating referrals, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the system nurtures your network and activates referrals.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your book in mind.',
  faq: [
    {
      question: 'What kind of touchpoints does the system send to clients?',
      answer: 'Seasonal safety tips, life event check-ins, policy review reminders, and valuable content—not just renewal notices. Touches that make clients feel valued.'
    },
    {
      question: 'How does COI nurturing work?',
      answer: 'We help you stay connected to realtors, lenders, and attorneys with relevant content and check-ins—positioning you as their go-to insurance referral.'
    },
    {
      question: 'Will clients know it\'s automated?',
      answer: 'No. Messages are written in your voice and feel personal. Clients think you\'re just great at staying in touch.'
    },
    {
      question: 'How does this affect client retention?',
      answer: 'Dramatically. Clients who feel connected to their broker are far less likely to price shop or leave for a small savings. Nurturing protects your book.'
    },
    {
      question: 'How many more referrals should I expect?',
      answer: 'Most brokers see 2-5x increase in referral activity within 6 months. The compounding effect increases over time as your network stays warm.'
    }
  ]
};

// Money Page Data - Referral Engine: Financial Advisors
const referralAdvisorData = {
  industry: 'Financial Advisors',
  parentService: 'referral',
  parentServiceName: 'Referral Engine',
  headline: 'Your CPA and Attorney Relationships Could Be Sending You 10x More Business.',
  subheadline: 'AI referral system that nurtures your COI network and activates referrals—on autopilot.',
  problemStatements: [
    'You have relationships with CPAs and attorneys. How often do they actually refer you?',
    'Your best clients would refer you—if they remembered to.',
    'You\'re too busy managing money to nurture your referral network.'
  ],
  problemContext: 'Most financial advisors know their best growth comes from COI relationships and client referrals. But maintaining those relationships takes time you don\'t have. The advisors growing fastest have systems that nurture relationships automatically—so referrals happen consistently, not randomly.',
  stats: [
    { value: '$500K+', label: 'average AUM per referred client' },
    { value: '5-10x', label: 'higher close rate on referrals vs cold prospects' },
    { value: '1 CPA relationship', label: 'can send 5-20 HNW clients per year' }
  ],
  costStatements: [
    'One strong CPA relationship can send you <strong>5-20 HNW clients per year</strong>. At $500K+ AUM each, that\'s <strong>$2.5M-10M in new assets</strong> from one relationship.',
    'But CPAs are busy too. If you\'re not <strong>staying top-of-mind</strong>, they refer to whoever they talked to last.',
    'Your existing clients know other HNW individuals. <strong>But they\'re not thinking about referring you</strong> unless prompted.',
    'What if every CPA, attorney, and top client heard from you <strong>consistently</strong>—without you doing the work?'
  ],
  solutionIntro: 'We build an AI referral system that nurtures your COI relationships and activates client referrals automatically. Not another CRM. An engine that keeps you top-of-mind with everyone who should be sending you business.',
  solutionSubIntro: 'It runs continuously—working your referral network—and it:',
  features: [
    { title: 'Nurtures COI relationships', description: 'CPAs, attorneys, insurance pros—consistent touches that keep you top-of-mind' },
    { title: 'Activates client referrals', description: 'Timely asks, life event triggers, appreciation touches—referrals happen when you ask' },
    { title: 'Finds new COI partners', description: 'Identifies CPAs and attorneys who serve your target market' },
    { title: 'Tracks relationship health', description: 'Who\'s referring, who\'s gone cold, who needs attention—all visible' }
  ],
  solutionOutcome: 'Your COI network stays warm. Client referrals flow consistently. AUM growth becomes predictable—powered by relationships, not cold outreach.',
  before: 'You mean to reach out to your CPAs. You intend to ask clients for referrals. But you\'re busy managing portfolios. Referrals happen randomly.',
  after: 'Your COI network hears from you consistently. Clients think of you when friends need an advisor. Referrals become predictable revenue.',
  whyUsIntro: 'We\'re not an AI company that discovered financial services.',
  whyUsStory: 'We built this for relationship-driven businesses where referrals are gold. We understand that one strong COI relationship is worth more than any marketing campaign.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, run it, and optimize it. You get one monthly fee and a referral network that actually works.',
  whyUsGuarantee: 'If it\'s not generating referrals, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the system nurtures your COI network and activates referrals.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your practice in mind.',
  faq: [
    {
      question: 'How does COI nurturing actually work?',
      answer: 'We keep you connected to CPAs, attorneys, and other professionals with valuable content, market updates, and check-ins—positioning you as their go-to advisor referral.'
    },
    {
      question: 'What about existing client referrals?',
      answer: 'The system prompts satisfied clients with timely referral asks—after positive interactions, market wins, or service milestones. Referrals happen when you ask.'
    },
    {
      question: 'Is this approach compliance-friendly?',
      answer: 'Yes. We focus on relationship nurturing and educational content—not solicitation. The touches build trust without creating compliance concerns.'
    },
    {
      question: 'How do you track which COIs are actually referring?',
      answer: 'The system tracks referral sources so you know which relationships are producing and which need more attention. Data drives your networking strategy.'
    },
    {
      question: 'What kind of ROI should I expect?',
      answer: 'One referred HNW client is worth $50,000-100,000+ in lifetime fees. Most advisors see the system pay for itself within the first referral.'
    }
  ]
};

// Money Page Data - Referral Engine: Home Inspectors
const referralInspectorData = {
  industry: 'Home Inspectors',
  parentService: 'referral',
  parentServiceName: 'Referral Engine',
  headline: 'Agents Know 5 Inspectors. Why Would They Recommend You?',
  subheadline: 'AI referral system that keeps you top-of-mind with agents—so you\'re the first name they mention.',
  problemStatements: [
    'Your business is 100% dependent on agent referrals.',
    'Every agent knows multiple inspectors. You\'re competing for mindshare.',
    'When you\'re busy inspecting, you\'re not nurturing relationships.'
  ],
  problemContext: 'Home inspection is a referral business. Period. Every agent knows 3-5 inspectors they could recommend. The question is: who do they think of first? The inspectors winning aren\'t better at inspections—they\'re better at staying top-of-mind with agents.',
  stats: [
    { value: '100%', label: 'of your business comes from agent referrals' },
    { value: '10-50', label: 'inspections per year from one strong agent relationship' },
    { value: '$300-500', label: 'per inspection × dozens of agents = your livelihood' }
  ],
  costStatements: [
    'One good agent relationship sends you <strong>10-50 inspections per year</strong>. At $300-500 each, that\'s <strong>$3,000-25,000 per relationship</strong>.',
    'But agents are busy. They recommend <strong>whoever comes to mind first</strong>. If you\'re not staying in touch, that\'s not you.',
    'Every agent who forgets about you is <strong>10-50 inspections going to your competitor</strong>.',
    'What if every agent in your network <strong>heard from you consistently</strong>—without taking time away from inspections?'
  ],
  solutionIntro: 'We build an AI referral system that keeps you top-of-mind with agents automatically. Not spam. Valuable touches that make agents think of you first when they have a buyer.',
  solutionSubIntro: 'It runs continuously—nurturing your agent network—and it:',
  features: [
    { title: 'Nurtures existing relationships', description: 'Consistent touches that keep you top-of-mind without being annoying' },
    { title: 'Finds new agent partners', description: 'Active agents in your area who aren\'t currently referring you' },
    { title: 'Re-engages cold relationships', description: 'Agents who used to refer you but stopped—we bring them back' },
    { title: 'Tracks your network', description: 'Who\'s referring, who\'s gone cold, who needs attention—all visible' }
  ],
  solutionOutcome: 'Agents think of you first. Referrals flow consistently. Your calendar fills while you\'re out doing inspections.',
  before: 'You meet agents, do great work, then lose touch. They forget about you. Inspections are feast-or-famine depending on who remembers you.',
  after: 'Every agent hears from you regularly. You\'re the first name they mention. Inspections become predictable because relationships stay warm.',
  whyUsIntro: 'We\'re not an AI company that discovered home inspection.',
  whyUsStory: 'We built this for businesses that live and die by referrals. We understand that in your business, relationships aren\'t just important—they\'re everything.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, run it, and optimize it. You get one monthly fee and an agent network that keeps you busy.',
  whyUsGuarantee: 'If it\'s not generating referrals, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the system keeps agents engaged and referring.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your business in mind.',
  faq: [
    {
      question: 'What kind of touchpoints do you send to agents?',
      answer: 'Educational content they can share with clients, market updates, seasonal home maintenance tips, and personal check-ins—valuable touches, not spam.'
    },
    {
      question: 'How do you find new agent relationships?',
      answer: 'We identify active agents in your area who aren\'t currently in your network, then reach out on your behalf to start building the relationship.'
    },
    {
      question: 'Can it help reactivate agents who stopped referring me?',
      answer: 'Yes. We have specific re-engagement sequences for cold relationships. Often agents went quiet because they got busy—not because they found someone better.'
    },
    {
      question: 'How quickly will I see more referrals?',
      answer: 'Most inspectors see increased agent engagement within 30-60 days. Referral volume typically increases over 90 days as relationships strengthen.'
    },
    {
      question: 'How is this different from just sending a monthly email?',
      answer: 'A monthly email is one touch that gets ignored. We create a systematic nurturing process with varied, valuable touchpoints that keep you top-of-mind consistently.'
    }
  ]
};

// Money Page Data - Broker OS: Freight Brokers
const brokerFreightData = {
  industry: 'Freight Brokers',
  parentService: 'broker-os',
  parentServiceName: 'Broker OS',
  headline: 'You Can\'t See Your Real Margins Until Month-End. That\'s a Problem.',
  subheadline: 'One system for your entire freight brokerage—shippers, carriers, loads, margins—all visible in real-time.',
  problemStatements: [
    'Your carrier network is in spreadsheets. Your load board is separate. Your accounting is somewhere else.',
    'You\'re making money but can\'t see actual margins until the books close.',
    'One bad carrier can blow a shipper relationship. But tracking performance? A nightmare.'
  ],
  problemContext: 'Freight brokerage is a margins game with a lot of moving parts. The brokers making real money have tight operations—they know their margins in real-time and which carriers deliver. Everyone else is guessing until month-end.',
  stats: [
    { value: '10-15%', label: 'average gross margin per load' },
    { value: '$150-500', label: 'typical margin on a standard load—volume is everything' },
    { value: '13-15%', label: 'commission on gross margin (industry standard)' }
  ],
  costStatements: [
    'The average load generates <strong>$150-500 in gross margin</strong>. Volume is everything.',
    'But <strong>margin compression is real</strong>. If you\'re not tracking in real-time, you\'re losing money on loads you think are profitable.',
    'Bad carrier performance costs you shippers. <strong>One service failure</strong> can end a relationship worth thousands per month.',
    'Every hour spent reconciling spreadsheets is an hour not spent booking loads.'
  ],
  solutionIntro: 'We build a centralized system for your entire freight brokerage operation. Not another TMS to learn. One place for everything.',
  solutionSubIntro: 'It handles your whole workflow—quote to payment—and it:',
  features: [
    { title: 'Manages your carrier network', description: 'Rates, lanes, performance scores, documents—complete carrier intelligence' },
    { title: 'Tracks shipper relationships', description: 'Contracts, lane history, preferences, volume—serve them better' },
    { title: 'Monitors loads in real-time', description: 'Status, location, issues, delivery confirmation—complete visibility' },
    { title: 'Reports margin instantly', description: 'Load profitability, carrier performance, shipper trends—always know where you stand' }
  ],
  solutionOutcome: 'Your operation runs tight. Margins are visible. Carriers are accountable. You book more loads with confidence.',
  before: 'Carriers in one system. Shippers in another. Margins calculated monthly. You\'re making money but leaving more on the table.',
  after: 'One system. Real-time margins. Carrier performance tracked. You focus on growing volume, not managing spreadsheets.',
  whyUsIntro: 'We\'re not an AI company that discovered freight.',
  whyUsStory: 'We built this for brokers who needed control of their operations. We\'ve seen what happens when good brokers lose money to bad systems.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, configure it, and optimize it. You get one monthly fee and an operation that scales.',
  whyUsGuarantee: 'If it\'s not improving your margins, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the system manages carriers, shippers, and loads.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your brokerage in mind.',
  faq: [
    {
      question: 'How is this different from a TMS like Tai Software or DAT?',
      answer: 'TMS platforms focus on load execution. We give you operational intelligence—carrier performance, real-time margins, shipper trends—so you run a tighter brokerage.'
    },
    {
      question: 'Can you migrate our existing carrier and shipper data?',
      answer: 'Yes. We handle full migration from spreadsheets, existing TMS, or wherever your data lives. Most brokerages are fully migrated within 2-3 weeks.'
    },
    {
      question: 'How does real-time margin tracking work?',
      answer: 'As you book loads and carriers, the system calculates margins instantly. No more waiting until month-end to know if you\'re actually making money.'
    },
    {
      question: 'What about carrier compliance and documents?',
      answer: 'The system tracks carrier authority, insurance expirations, and required documents—alerting you before compliance issues become problems.'
    },
    {
      question: 'How does carrier performance scoring work?',
      answer: 'We track on-time delivery, damage claims, communication responsiveness, and other metrics. You know which carriers to prioritize and which to avoid.'
    }
  ]
};

// Money Page Data - Broker OS: Wholesale Real Estate
const brokerWholesaleData = {
  industry: 'Wholesale Real Estate Investors',
  parentService: 'broker-os',
  parentServiceName: 'Broker OS',
  headline: 'You Have 72 Hours to Move a Deal. Your Systems Are Held Together With Duct Tape.',
  subheadline: 'One system for your entire wholesale operation—leads, deals, buyers, dispositions—all in one place.',
  problemStatements: [
    'Your buyer list is outdated. Your deals are in spreadsheets. Your follow-up is inconsistent.',
    'You lose deals because the right buyer didn\'t see it in time.',
    'You\'re doing deals but can\'t scale because your systems don\'t.'
  ],
  problemContext: 'Wholesale real estate is a speed game. The investors closing deals have systems that match deals to buyers instantly. Everyone else is sending blast emails and hoping. When you have 24-72 hours to move a deal, hoping isn\'t a strategy.',
  stats: [
    { value: '$5,000-50,000', label: 'typical wholesale assignment fee' },
    { value: '24-72 hours', label: 'window to move a good deal before it dies' },
    { value: '100+', label: 'active buyers needed for consistent dispositions' }
  ],
  costStatements: [
    'The average wholesale deal generates <strong>$5,000-50,000 in assignment fees</strong>. Every deal matters.',
    'But deals move fast. <strong>24-72 hours</strong> is often all you have before a seller moves on or a competitor swoops in.',
    'Your buyer list is your competitive advantage—but only if you can <strong>match the right buyer to the right deal instantly</strong>.',
    'Every deal that doesn\'t close because of buyer chaos is $10,000-50,000 walking away.'
  ],
  solutionIntro: 'We build a centralized system for your entire wholesale operation. Not another CRM. One place for leads, deals, buyers, and dispositions.',
  solutionSubIntro: 'It handles your whole workflow—lead to assignment—and it:',
  features: [
    { title: 'Manages your deal pipeline', description: 'Leads, offers, contracts, status—complete deal intelligence' },
    { title: 'Organizes your buyer list', description: 'Criteria, budgets, areas, purchase history—match deals to buyers instantly' },
    { title: 'Automates disposition', description: 'Blast to matching buyers, track interest, manage showings—move deals fast' },
    { title: 'Reports on your business', description: 'Lead sources, conversion rates, buyer performance—know what\'s working' }
  ],
  solutionOutcome: 'Deals move faster. Buyers see the right deals. You close more assignments with less chaos.',
  before: 'Leads in one place. Buyers in another. Deals tracked in your head. Good deals die because you couldn\'t move fast enough.',
  after: 'One system. Instant buyer matching. Automated disposition. You focus on finding deals, not managing spreadsheets.',
  whyUsIntro: 'We\'re not an AI company that discovered wholesale.',
  whyUsStory: 'We built this for deal-makers who needed to move faster. We\'ve seen what happens when good wholesalers lose deals to bad systems.',
  whyUsPromise: 'We don\'t sell you software and disappear. We build the system, configure it, and optimize it. You get one monthly fee and an operation that scales.',
  whyUsGuarantee: 'If it\'s not helping you close deals, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the system manages deals, buyers, and dispositions.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your operation in mind.',
  faq: [
    {
      question: 'How does instant buyer matching work?',
      answer: 'You enter deal criteria—location, ARV, asking price—and the system instantly surfaces matching buyers from your list based on their stated preferences and purchase history.'
    },
    {
      question: 'Can it handle both cash buyer and JV deal structures?',
      answer: 'Yes. The system tracks different buyer types and deal structures, so you know which deals to send to which buyers based on their preferred investment model.'
    },
    {
      question: 'How does automated disposition work?',
      answer: 'When you have a deal, you can blast to matching buyers with one click, track who opens and responds, and manage showing requests—all from one place.'
    },
    {
      question: 'Can you migrate our existing buyer list?',
      answer: 'Yes. We import your existing buyers with their criteria, areas, and history. Most wholesalers are fully migrated within 1-2 weeks.'
    },
    {
      question: 'What about tracking where leads come from?',
      answer: 'The system tracks lead sources—direct mail, driving for dollars, PPC—so you know which marketing channels actually produce deals.'
    }
  ]
};

// Money Page Data - Broker OS: Recruiters
const brokerRecruitersData = {
  industry: 'Recruiters & Executive Search',
  parentService: 'broker-os',
  parentServiceName: 'Broker OS',
  headline: 'Your Candidates Are in One System. Your Clients Are in Another. Your Pipeline Is in Your Head.',
  subheadline: 'One operating system for placements—candidates, clients, pipeline, and commissions in one place.',
  problemStatements: [
    'Your ATS has candidates. Your CRM has clients. Your pipeline? Spreadsheets and sticky notes.',
    'A hot candidate comes in. Which clients need this exact profile? You\'re digging through emails to remember.',
    'Month-end arrives. Calculating commissions takes half a day because data lives everywhere.'
  ],
  problemContext: 'Recruiting is a matching game—right candidate, right client, right timing. But when your data lives in five different places, matches get missed. The recruiter with the best memory wins. That doesn\'t scale.',
  stats: [
    { value: '$15,000-50,000', label: 'average placement fee' },
    { value: '20-30%', label: 'typical recruiter fee on salary' },
    { value: '3-5 hours/week', label: 'lost to admin and searching across systems' }
  ],
  costStatements: [
    'The average placement fee is <strong>$15,000-50,000</strong>. Lose one placement because you forgot a client needed that exact candidate? That\'s real money.',
    'Your recruiters spend <strong>3-5 hours per week</strong> on admin—updating systems, searching for info, calculating commissions. At $50-100/hour loaded cost, that\'s <strong>$10,000-25,000/year per recruiter</strong> in lost productivity.',
    'Candidates go cold because follow-up fell through the cracks. Clients go to competitors because you didn\'t move fast enough.',
    'The best recruiters aren\'t the best at recruiting—they\'re the best at staying organized. What if your system did that for everyone?'
  ],
  solutionIntro: 'We build an operating system for recruiting firms. Not another ATS. Not another CRM. One place where candidates, clients, jobs, and pipeline connect—so nothing falls through the cracks.',
  solutionSubIntro: 'It brings your entire operation together—and it:',
  features: [
    { title: 'Unified candidate + client view', description: 'See every interaction, every job, every placement in one place' },
    { title: 'Smart matching', description: 'Candidate comes in? Instantly see which open jobs and clients fit' },
    { title: 'Pipeline visibility', description: 'Every deal, every stage, every expected close date—no more guessing' },
    { title: 'Commission tracking', description: 'Automatic calculation based on your fee structures—no more spreadsheets' }
  ],
  solutionOutcome: 'Your recruiters focus on recruiting—not admin. Matches happen faster. Nothing falls through the cracks. Commissions calculate themselves.',
  before: 'Candidates in the ATS. Clients in the CRM. Pipeline in spreadsheets. Commissions calculated manually. Things fall through cracks.',
  after: 'Everything in one system. Candidates match to clients automatically. Pipeline is visible. Commissions calculate in real-time.',
  whyUsIntro: 'We\'re not an ATS company that added features.',
  whyUsStory: 'We build operating systems for deal-driven businesses. Recruiting is a brokerage—you\'re matching supply and demand and taking a cut. Your systems should reflect that.',
  whyUsPromise: 'We don\'t give you software and disappear. We build the system around your workflow, migrate your data, and optimize as you grow. One monthly fee, one system, one source of truth.',
  whyUsGuarantee: 'If it\'s not making your team faster, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly how the system works with your recruiting workflow.',
  ctaNote: 'No pitch deck. No pressure. Just a live demo with your firm in mind.',
  faq: [
    {
      question: 'How is this different from Bullhorn, Crelate, or other ATS/CRM combos?',
      answer: 'Those are built for either candidates OR clients. We built for the match—the placement. Everything connects around deals, not just records.'
    },
    {
      question: 'Can you migrate our existing data?',
      answer: 'Yes. We handle full migration from your current ATS, CRM, and spreadsheets. Most firms are fully migrated within 2-3 weeks.'
    },
    {
      question: 'How does commission tracking work?',
      answer: 'You set your fee structures (percentage of salary, flat fee, split arrangements). The system calculates automatically when placements close.'
    },
    {
      question: 'Does this work for both contingency and retained search?',
      answer: 'Yes. The system handles both models, including milestone billing for retained searches and split fees for contingency.'
    },
    {
      question: 'What\'s the learning curve for my team?',
      answer: 'Most recruiters are productive within a day. The interface is built around how recruiters actually work—not how software engineers think they should work.'
    }
  ]
};

// Money Page Data - Content Engine: Local Service Businesses
const contentLocalData = {
  industry: 'Local Service Businesses',
  parentService: 'content-engine',
  parentServiceName: 'Content Engine',
  headline: 'Your Competitor Ranks for "Roofer Near Me." You Don\'t.',
  subheadline: 'Done-for-you content that gets you found on Google—blog posts, service pages, and local SEO that actually ranks.',
  problemStatements: [
    'Search "HVAC repair [your city]." Where do you show up? Page 3? Nowhere?',
    'Your competitor posts weekly. They rank for everything. You haven\'t blogged since 2019.',
    'You know content matters. But between jobs, who has 10 hours a week to write?'
  ],
  problemContext: 'Google rewards businesses that publish helpful, local content. Your competitors figured this out. They\'re ranking for "emergency plumber near me" and "roof repair [city]" while you\'re invisible. Every day you don\'t publish, they pull further ahead.',
  stats: [
    { value: '68%', label: 'of online experiences start with a search engine' },
    { value: 'Position 1', label: 'gets 27% of clicks—position 10 gets 2.4%' },
    { value: '4-8 posts/month', label: 'is what it takes to compete for local rankings' }
  ],
  costStatements: [
    'The business ranking #1 for "roofer near me" gets <strong>10x more clicks</strong> than #10. Same search, wildly different results.',
    'A single blog post ranking for "how much does roof repair cost in [city]" can generate <strong>5-20 leads per month</strong> for years.',
    'Your competitors posting weekly? They\'re not just visible—they\'re <strong>building a moat</strong> you\'ll have to climb over.',
    'A marketing hire costs <strong>$50-80K/year</strong>. Our content service delivers more output at a fraction of the cost.'
  ],
  solutionIntro: 'We create and publish the content you need to rank. Blog posts targeting local searches. Service area pages for every city you serve. FAQ content that answers what customers actually Google.',
  solutionSubIntro: 'It runs on autopilot—building your search visibility—and it:',
  features: [
    { title: 'Targets local keywords', description: '"Roof repair [city]", "emergency plumber near me", "HVAC cost [area]"—we find what your customers search' },
    { title: 'Creates service area pages', description: 'Pages for every city and neighborhood you serve—local SEO that compounds' },
    { title: 'Builds authority content', description: 'How-to guides, cost breakdowns, FAQs—content that ranks and converts' },
    { title: 'Handles publishing', description: 'We post to your blog, optimize images, add internal links—you just approve' }
  ],
  solutionOutcome: 'You start showing up in searches. Organic leads come in. Your competitors stop being the only option customers find.',
  before: 'You\'re invisible on Google. Competitors rank for every local search. Customers find them first. You rely on referrals and paid ads to survive.',
  after: 'You rank for "[service] near me" searches. Blog posts generate leads monthly. Your online presence becomes an asset, not an afterthought.',
  whyUsIntro: 'We\'re not a content mill churning out generic articles.',
  whyUsStory: 'We understand local service SEO. We know that "roof repair Houston" and "roof repair Katy" need different pages. We build content strategies that actually rank.',
  whyUsPromise: 'We don\'t give you templates. We research your market, find the keywords, create the content, and publish it. You approve in 5 minutes. We do the rest.',
  whyUsGuarantee: 'If it\'s not building your rankings, we fix it. That\'s the deal.',
  ctaHeadline: 'See What You\'re Missing',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly which keywords you should rank for and what content you need.',
  ctaNote: 'No pitch deck. No pressure. Just a real conversation about your search visibility.',
  faq: [
    {
      question: 'What kind of content do you create?',
      answer: 'Blog posts targeting local searches ("roof repair cost in [city]"), service area pages for every location you serve, FAQ content, how-to guides, and seasonal content that matches search demand.'
    },
    {
      question: 'How do you know what keywords to target?',
      answer: 'We research what your customers actually search—tools like Ahrefs, local search data, competitor analysis. We find the gaps where you can rank and win.'
    },
    {
      question: 'How long until I see ranking improvements?',
      answer: 'SEO compounds over time. You\'ll typically see movement in 2-3 months, meaningful ranking improvements in 4-6 months, and strong positions by month 9-12. Content published today pays dividends for years.'
    },
    {
      question: 'How is this different from hiring a marketing person?',
      answer: 'A marketing hire costs $50-80K/year, needs management, takes PTO, and may or may not know SEO. We deliver more consistent output, specialized expertise, and no HR headaches—at a fraction of the cost.'
    },
    {
      question: 'Do I have to write anything?',
      answer: 'No. We handle research, writing, and publishing. Content shows up in your inbox for approval. You spend 5 minutes reviewing. We do the rest.'
    }
  ]
};

// Money Page Data - Website Design: Local Service Businesses
const websiteLocalData = {
  industry: 'Local Service Businesses',
  parentService: 'website-design',
  parentServiceName: 'Website Design',
  headline: 'Your Website Is Costing You Jobs. You Just Don\'t Know It.',
  subheadline: 'A fast, mobile-first website built to turn searchers into callers—launched in weeks, not months.',
  problemStatements: [
    'A homeowner Googles "roof repair near me." They find you. They click. Your site takes 6 seconds to load. They leave.',
    'Someone searches "emergency plumber [city]." Your site looks like it was built in 2010. They call your competitor.',
    'You paid $500 for a website 8 years ago. It shows. And it\'s killing your close rate on organic leads.'
  ],
  problemContext: 'Your website is the first impression for every Google search, every referral who looks you up, every lead from your ads. A slow, dated, mobile-broken site doesn\'t just look bad—it actively loses you jobs you already paid to get.',
  stats: [
    { value: '53%', label: 'of mobile visitors leave if a site takes more than 3 seconds to load' },
    { value: '75%', label: 'of people judge business credibility by website design' },
    { value: '70%+', label: 'of local service searches happen on mobile devices' }
  ],
  costStatements: [
    'You\'re paying for Google Ads, SEO, or referrals to get visitors to your site. <strong>A slow site wastes that spend</strong>.',
    '<strong>53% of mobile visitors leave</strong> if your site takes more than 3 seconds. How fast is yours?',
    'A homeowner comparing 3 roofing companies judges credibility in seconds. <strong>Dated site = dated company</strong> in their mind.',
    'Traditional web agencies charge <strong>$5,000-15,000</strong> and take 3-6 months. We deliver faster, for less.'
  ],
  solutionIntro: 'We build websites for roofers, plumbers, HVAC companies, and contractors. Fast. Mobile-first. Designed to convert visitors into calls. Not templates—sites built for your trade and your market.',
  solutionSubIntro: 'We handle everything—design, development, launch—and we build sites that:',
  features: [
    { title: 'Load in under 3 seconds', description: 'No lost visitors from slow load times. Performance optimized.' },
    { title: 'Work perfectly on phones', description: 'Click-to-call buttons, mobile-first layouts, thumb-friendly navigation' },
    { title: 'Convert visitors to calls', description: 'Clear CTAs above the fold, trust signals, easy contact forms' },
    { title: 'Set up for local SEO', description: 'Proper structure, schema markup, service area pages—ready to rank' }
  ],
  solutionOutcome: 'A website that looks professional, loads fast, and turns visitors into calls. The leads you\'re already getting finally convert.',
  before: 'Slow site, dated design, broken on mobile. Visitors leave before they see your work. Leads from ads and referrals bounce.',
  after: 'Fast, modern, mobile-first. Visitors stay, trust what they see, and call. Your website becomes an asset instead of a liability.',
  whyUsIntro: 'We\'re not a generic web agency.',
  whyUsStory: 'We build sites for trades. We know roofers need storm damage pages. Plumbers need emergency service CTAs. HVAC companies need seasonal content. We build for your business, not a template.',
  whyUsPromise: 'We launch in 2-3 weeks, not 3-6 months. We handle hosting and updates. One monthly fee, no surprises.',
  whyUsGuarantee: 'If it\'s not converting better than your old site, we fix it. That\'s the deal.',
  ctaHeadline: 'See What Your Site Should Look Like',
  ctaSubheadline: 'Book a 20-minute call. We\'ll audit your current site and show you exactly what a high-converting trade site looks like.',
  ctaNote: 'No pitch deck. No pressure. Just a real conversation about your digital presence.',
  faq: [
    {
      question: 'How long does it take to build a new website?',
      answer: 'Most trade websites launch within 2-3 weeks. We handle design, development, and launch—you provide feedback and approve.'
    },
    {
      question: 'What makes this different from Wix or a $500 template?',
      answer: 'Speed, conversion focus, and trade expertise. We build for performance (sub-3-second load), mobile-first design, and know what roofers/plumbers/HVAC companies need to convert local searches.'
    },
    {
      question: 'Do I own the website?',
      answer: 'Yes. The design, content, and domain are yours. If you ever leave, you take everything with you.'
    },
    {
      question: 'What about ongoing updates and maintenance?',
      answer: 'Included. We handle hosting, security, updates, and content changes. You focus on running your business.'
    },
    {
      question: 'How does pricing compare to other web agencies?',
      answer: 'Typically 50-70% less than traditional agencies, with faster delivery. We focus on results, not endless design revisions and scope creep.'
    }
  ]
};

// Money Page Data - Content Engine: Real Estate Agents
const contentRealEstateData = {
  industry: 'Real Estate Agents',
  parentService: 'content-engine',
  parentServiceName: 'Content Engine',
  headline: '73% of Homeowners Prefer Agents Who Use Video. Do You?',
  subheadline: 'Done-for-you content that builds your brand and keeps you visible—without stealing time from selling.',
  problemStatements: [
    'You know you should be posting. You just have zero time.',
    'Your sphere sees other agents showing up consistently. They don\'t see you.',
    'By the time you\'re ready to create content, you\'re exhausted from showings.'
  ],
  problemContext: 'Real estate is a visibility game. The agents winning listings aren\'t necessarily better—they\'re more visible. They show up in feeds, in searches, in inboxes. But you\'re too busy showing homes to create content. That\'s the trap.',
  stats: [
    { value: '73%', label: 'of homeowners are more likely to list with agents who use video' },
    { value: '47%', label: 'of buyers find their agent through a referral—visibility drives referrals' },
    { value: '0 hours', label: 'is what you have for content creation after showings' }
  ],
  costStatements: [
    '<strong>73% of homeowners</strong> say they\'re more likely to list with agents who use video content. Are you using video?',
    'The average listing commission is <strong>$10,000-30,000</strong>. Lose one listing because you weren\'t visible enough? That\'s real money.',
    'Your sphere sees <strong>other agents posting consistently</strong>. When they need an agent, who will they think of?',
    'You could hire a marketing person for <strong>$40-60K/year</strong>. Or you could get done-for-you content for a fraction of that.'
  ],
  solutionIntro: 'We create and publish content for you. Not templates. Fully produced market updates, listing content, neighborhood features, and social posts—delivered to your inbox. You approve. We publish.',
  solutionSubIntro: 'It runs on autopilot—building your visibility—and it:',
  features: [
    { title: 'Creates market update content', description: 'Weekly/monthly updates that position you as the local expert' },
    { title: 'Produces social content', description: 'Posts, images, short videos—keeps you visible in feeds' },
    { title: 'Builds local SEO', description: 'Neighborhood pages, community content—get found in local searches' },
    { title: 'Publishes for you', description: 'We handle posting—you just approve and focus on selling' }
  ],
  solutionOutcome: 'You show up consistently. Your sphere sees you as the active, visible agent. Referrals and leads flow because you\'re top-of-mind.',
  before: 'You mean to post content. You plan to shoot videos. But showings and transactions take over. Weeks go by without posting. Your sphere forgets you\'re in real estate.',
  after: 'Content appears in your inbox weekly. You approve in minutes. Your sphere sees you everywhere. When they need an agent, you\'re the obvious choice.',
  whyUsIntro: 'We\'re not a content mill that discovered real estate.',
  whyUsStory: 'We understand that you don\'t need more things to do—you need visibility without the work. Every piece we create is designed to keep you top-of-mind with your sphere.',
  whyUsPromise: 'We don\'t give you templates and disappear. We create the content, handle publishing, and optimize for engagement. You get one monthly fee and a growing presence.',
  whyUsGuarantee: 'If it\'s not building your visibility, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you exactly what content we\'d create and how it keeps you visible.',
  ctaNote: 'No pitch deck. No pressure. Just a real conversation about your brand.',
  faq: [
    {
      question: 'What kind of content do you create for real estate agents?',
      answer: 'Market updates, neighborhood spotlights, listing promotions, buyer/seller tips, just-sold announcements, and social posts—everything that keeps you visible to your sphere.'
    },
    {
      question: 'Do I have to be on camera for video content?',
      answer: 'Not necessarily. We can create market update videos, property showcases, and neighborhood content that don\'t require you on camera. When you are ready for personal video, we help with that too.'
    },
    {
      question: 'How much time does this take from me?',
      answer: 'About 10-15 minutes per week to review and approve content. We handle research, creation, and publishing.'
    },
    {
      question: 'Will this help with my Google presence?',
      answer: 'Yes. We create SEO-optimized neighborhood and area pages that help you rank for local real estate searches—"homes for sale in [neighborhood]" type searches.'
    },
    {
      question: 'How does this compare to hiring a marketing coordinator?',
      answer: 'A marketing coordinator costs $40-60K/year. Our content service delivers more consistent output at a fraction of the cost—and you don\'t have to manage anyone.'
    }
  ]
};

// Money Page Data - Content Engine: Financial Advisors
const contentAdvisorData = {
  industry: 'Financial Advisors',
  parentService: 'content-engine',
  parentServiceName: 'Content Engine',
  headline: 'You Need Thought Leadership Content. You Don\'t Have Time to Create It.',
  subheadline: 'Compliance-friendly content that positions you as an expert—created and published without stealing time from clients.',
  problemStatements: [
    'You know content builds credibility. But between client meetings and portfolio management, who has time?',
    'Your competitors are publishing market commentary. You\'re too busy actually managing money.',
    'You\'ve tried hiring writers. They don\'t understand finance—or compliance.'
  ],
  problemContext: 'High-net-worth clients expect their advisor to be a thought leader. They want market insights, financial planning tips, and evidence you\'re paying attention. But creating compliant content takes time you don\'t have—and generic content actually hurts your credibility.',
  stats: [
    { value: '74%', label: 'of HNW investors research advisors online before meeting' },
    { value: '0 hours', label: 'is what you have for content creation after client work' },
    { value: '$500K+', label: 'AUM per client—worth the investment in credibility' }
  ],
  costStatements: [
    '<strong>74% of high-net-worth investors</strong> research advisors online before taking a meeting. What do they find when they search your name?',
    'Your competitors publish weekly market commentary. They show up in searches. They look like experts. Where\'s your content?',
    'Hiring a content person costs <strong>$50,000-80,000/year</strong>—and they still won\'t understand compliance or finance.',
    'One new HNW client is worth <strong>$50,000-100,000+ in lifetime fees</strong>. The ROI on credibility content is massive.'
  ],
  solutionIntro: 'We create compliance-friendly content for financial advisors. Market commentary, planning insights, educational content—all written by people who understand finance and reviewed for compliance.',
  solutionSubIntro: 'It runs on autopilot—building your authority—and it:',
  features: [
    { title: 'Market commentary', description: 'Weekly/monthly updates on markets—timely, relevant, compliance-ready' },
    { title: 'Educational content', description: 'Tax planning, retirement strategies, estate planning—positions you as the expert' },
    { title: 'Compliance-friendly', description: 'Written with compliance in mind—no performance promises, no guarantees, no red flags' },
    { title: 'Published for you', description: 'LinkedIn, newsletter, website—we handle distribution' }
  ],
  solutionOutcome: 'You show up as a thought leader. HNW prospects find credible content when they search. You never spend a minute writing.',
  before: 'You know you should publish content. You don\'t have time. Your online presence is a static bio. Prospects can\'t tell if you\'re any good.',
  after: 'Content publishes consistently. You show up in searches. Prospects see you as a thought leader before they ever call.',
  whyUsIntro: 'We\'re not a content mill that discovered finance.',
  whyUsStory: 'We understand that advisor content has to be credible AND compliant. Generic finance content hurts you. We create content that sounds like you and passes compliance.',
  whyUsPromise: 'We don\'t give you templates. We create original content, tailored to your voice and specialties, with compliance considerations built in. One monthly fee, consistent output.',
  whyUsGuarantee: 'If it\'s not building your credibility, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you sample content and how we handle compliance considerations.',
  ctaNote: 'No pitch deck. No pressure. Just a real conversation about your content.',
  faq: [
    {
      question: 'How do you handle compliance?',
      answer: 'We write with compliance in mind—no performance promises, no guarantees, no testimonials, no red flags. You still run it through your compliance process, but we make that easy.'
    },
    {
      question: 'Will this sound like me or like generic finance content?',
      answer: 'Like you. We learn your voice, your specialties, your client base. The content reflects your perspective—not generic advice anyone could give.'
    },
    {
      question: 'What if I\'m at a broker-dealer with strict compliance?',
      answer: 'We\'ve worked with advisors at major BDs. We understand the constraints and write accordingly. Your compliance team will appreciate how clean the content is.'
    },
    {
      question: 'How often do you publish?',
      answer: 'We recommend weekly or bi-weekly for LinkedIn, monthly for longer-form content. We build a cadence that\'s sustainable and impactful.'
    },
    {
      question: 'Can you handle market volatility content quickly?',
      answer: 'Yes. When markets move, we can turn around timely commentary within 24-48 hours so you can be responsive to client concerns.'
    }
  ]
};

// Money Page Data - Website Design: Real Estate Agents
const websiteRealEstateData = {
  industry: 'Real Estate Agents',
  parentService: 'website',
  parentServiceName: 'Website Design',
  headline: 'Your Brokerage Website Makes You Look Like Every Other Agent.',
  subheadline: 'A personal website with IDX search that makes you—not your brokerage—the brand buyers and sellers remember.',
  problemStatements: [
    'Your brokerage gives you a templated page. So does every other agent at the company.',
    'Buyers search on Zillow and Redfin. When they land on your site, can they search listings too?',
    'Your "website" is a bio page. It doesn\'t capture leads, showcase your sales, or build your brand.'
  ],
  problemContext: 'Top-producing agents build personal brands. They have websites that capture leads, showcase their track record, and let buyers search listings—all under their name, not their brokerage\'s. Your current site is a business card at best.',
  stats: [
    { value: '97%', label: 'of buyers search online during their home search' },
    { value: '73%', label: 'of sellers interview only one agent—be the one they find online' },
    { value: '3 seconds', label: 'to make a first impression—your website is that impression' }
  ],
  costStatements: [
    'The average commission is <strong>$10,000-30,000</strong>. If your website helps you win one extra listing per year, it\'s paid for itself 10x.',
    '<strong>73% of sellers interview only one agent</strong>. If they find you online and your site looks professional, you\'re that agent.',
    'Your brokerage template looks like every other agent\'s. <strong>Top producers have personal brands</strong>—starting with their website.',
    'Buyers want to search listings. If your site doesn\'t have IDX, they leave and search on Zillow—where they find other agents.'
  ],
  solutionIntro: 'We build personal websites for real estate agents. Not templates. Custom sites with IDX integration, lead capture, and your brand—designed to convert visitors into clients.',
  solutionSubIntro: 'Your website becomes a client-generating asset—and it:',
  features: [
    { title: 'IDX integration', description: 'Buyers search listings directly on your site—keeps them engaged with you, not Zillow' },
    { title: 'Lead capture', description: 'Valuation tools, saved searches, and forms that capture buyer and seller leads' },
    { title: 'Your brand, not your brokerage\'s', description: 'Custom design that builds YOUR name recognition' },
    { title: 'Mobile-first', description: '60%+ of real estate searches happen on phones—your site works perfectly on every device' }
  ],
  solutionOutcome: 'Visitors find a professional agent with a real online presence. Buyers search listings on your site. Sellers see your track record. Leads come in automatically.',
  before: 'Your "website" is a brokerage template. It looks like every other agent\'s. No IDX, no lead capture, no brand differentiation.',
  after: 'Your website showcases your brand. Buyers search listings and stay on your site. Sellers see social proof. Leads capture automatically.',
  whyUsIntro: 'We\'re not a web agency that discovered real estate.',
  whyUsStory: 'We build websites for agents who understand that their personal brand matters. We know IDX, we know lead capture, and we know what converts visitors into clients.',
  whyUsPromise: 'We don\'t give you a template and disappear. We build a custom site, integrate IDX, set up lead capture, and make sure it actually drives business. One fee, fully managed.',
  whyUsGuarantee: 'If it\'s not generating leads, we fix it. That\'s the deal.',
  ctaHeadline: 'See It Before You Buy It',
  ctaSubheadline: 'Book a 20-minute call. We\'ll show you examples and discuss what your site should include.',
  ctaNote: 'No pitch deck. No pressure. Just a real conversation about your online presence.',
  faq: [
    {
      question: 'Which IDX providers do you work with?',
      answer: 'We integrate with most major IDX providers including IDX Broker, Showcase IDX, and iHomefinder. We\'ll recommend the best fit for your MLS.'
    },
    {
      question: 'Will this compete with my brokerage\'s website?',
      answer: 'It complements it. Your brokerage site is for the company. Your personal site is for YOUR brand. Top producers have both.'
    },
    {
      question: 'How do leads get captured?',
      answer: 'Multiple ways—home valuation tools, saved search signups, contact forms, and property inquiry buttons. All leads go directly to you.'
    },
    {
      question: 'How long does it take to build?',
      answer: 'Most agent sites launch within 2-3 weeks including IDX integration and custom design.'
    },
    {
      question: 'What about ongoing maintenance?',
      answer: 'Included. We handle hosting, updates, security, and any changes you need. You focus on selling homes.'
    }
  ]
};


// Back-Office Automation Data Objects - Direct, helpful, accurate
const billingAutomationData = {
  title: 'Billing & Collections Automation',
  subtitle: 'Invoices go out on time. Follow-up runs automatically. You get paid faster.',
  intro: 'You know the drill. Job closes, but the invoice sits for days because billing is slammed. When it finally goes out, follow-up is inconsistent. Some customers pay on time. Others don\'t hear from you until they\'re 60 days past due. By then, collecting is harder and write-offs are more likely. We automate the entire sequence—invoice generation, delivery, and follow-up—so your team handles disputes and exceptions instead of routine paperwork.',
  whatWeAutomate: 'Invoice creation triggered by job completion, PO approval, or whatever event makes sense for your workflow. Delivery via email, customer portal, or EDI—formatted the way each customer requires. Payment reminders at intervals you set. Escalation when invoices age. Handoff to your team when a real conversation is needed.',
  integrations: 'QuickBooks, NetSuite, SAP, Sage, Dynamics, Salesforce, HubSpot. Customer portals. EDI. If your system has an API, we can probably connect to it.',
  howItWorks: 'You tell us what triggers an invoice and what your follow-up cadence should be. We build the automation. Invoices generate and send without anyone touching them. Reminders go out on schedule. Exceptions—disputes, large invoices, new customers—route to your team with full context. Everything else just runs.',
  implementation: 'We need access to your billing system, your invoice templates, and your rules. We map your workflow, build the automation, test with real data, and go live. Most setups take 2-4 weeks.',
  cta: 'Let\'s look at your AR. Book a call and we\'ll show you where automation fits.',
  faq: [
    { q: 'We have complicated billing—progress billing, retainers, milestone-based. Can you handle that?', a: 'Yes. We build for your model, not a template. If you can explain the logic, we can automate it.' },
    { q: 'What if something needs a human review?', a: 'You define the rules. Invoices that need review get flagged and routed. Everything else runs automatically.' },
    { q: 'Can we adjust the rules after go-live?', a: 'Anytime. Timing, triggers, escalation paths—all changeable.' },
    { q: 'What does it cost?', a: 'Depends on complexity. We\'ll scope it on a call—no mystery pricing.' }
  ]
};

const quotingAutomationData = {
  title: 'Quoting & Estimating Automation',
  subtitle: 'Quotes go out fast. Follow-up happens automatically. You close more deals.',
  intro: 'Speed matters in quoting. The first credible response often wins. But your sales team is busy, quotes take time to build, and follow-up falls through the cracks. Meanwhile, the customer gets three other quotes and goes with whoever responded first. We automate quote generation from intake data and run follow-up sequences until they say yes, no, or not yet. Your team focuses on selling, not paperwork.',
  whatWeAutomate: 'Quote generation from web forms, RFQs, or CRM opportunities. Pricing pulled from your rules—discounts, minimums, volume tiers. Delivery via email or portal. Follow-up sequences that persist until you get a decision.',
  integrations: 'Salesforce, HubSpot, Dynamics, Pipedrive, Zoho. Your ERP for pricing. CPQ tools if you have them. We connect to your source of truth.',
  howItWorks: 'Request comes in. System pulls customer data, applies your pricing, generates the quote, sends it. Follow-up starts automatically—Day 2, Day 5, Day 10, whatever you set. When they respond, the sequence stops. Quotes that need approval route to the right person first.',
  implementation: 'We need your pricing logic, quote templates, and approval rules. Build takes 2-3 weeks. We test with real scenarios before going live.',
  cta: 'Let\'s look at your quote-to-close process. Book a call.',
  faq: [
    { q: 'What about complex or custom quotes?', a: 'We automate the repeatable parts. Complex quotes route to your team with all the intake data pre-filled.' },
    { q: 'Can this handle approvals?', a: 'Yes. Quotes over threshold, discount requests, non-standard terms—all routable for approval before sending.' },
    { q: 'How does it connect to our CRM?', a: 'Direct integration. Quotes sync to opportunities, status updates in real-time.' },
    { q: 'What does it cost?', a: 'Depends on complexity. We\'ll scope it on a call.' }
  ]
};

const schedulingAutomationData = {
  title: 'Scheduling & Dispatch Automation',
  subtitle: 'Customers book themselves. Reminders cut no-shows. Routes make sense.',
  intro: 'Your scheduler is overwhelmed. Phone calls, calendar juggling, last-minute changes, no-shows that kill productivity. It\'s a full-time job just keeping the board straight. We automate the parts that don\'t need human judgment—online booking, confirmations, reminders, rescheduling, route optimization. Your scheduler handles exceptions and complex situations instead of routine coordination.',
  whatWeAutomate: 'Online self-booking from your availability. Confirmation emails and texts. Reminder sequences—24 hours out, morning of, on-the-way. No-show follow-up. Route optimization based on location and time windows.',
  integrations: 'ServiceTitan, Housecall Pro, Jobber, Google Calendar, Outlook. FSM systems. GPS and routing tools. We work with what you have.',
  howItWorks: 'Customer books online from your real-time availability. They get instant confirmation with details. Reminders go out automatically. If they need to reschedule, they do it themselves within your rules. Routes reoptimize as the day changes. No-shows get follow-up to rebook.',
  implementation: 'We need your scheduling system access and your rules—time windows, tech skills, service areas, reminder timing. Setup takes 2-4 weeks.',
  cta: 'Let\'s look at your scheduling workflow. Book a call.',
  faq: [
    { q: 'Does this replace our scheduling software?', a: 'No. We integrate with it. Your team keeps their tools—we automate the coordination layer.' },
    { q: 'Can customers reschedule themselves?', a: 'Yes, within your rules. Minimum notice, available windows, whatever constraints you set.' },
    { q: 'How does route optimization work?', a: 'Jobs sequence by location and time windows. Routes update as the day changes.' },
    { q: 'What does it cost?', a: 'Depends on complexity. We\'ll scope it on a call.' }
  ]
};

const customerCommsData = {
  title: 'Customer Communications Automation',
  subtitle: 'Customers know what\'s happening before they have to ask. Reviews come in automatically.',
  intro: 'Every "where\'s my technician?" call is a failure. The customer shouldn\'t have to call. They should already know. Proactive communication—booking confirmations, on-the-way alerts, service summaries, review requests—eliminates most inbound status calls and makes your company look buttoned-up. We automate these touchpoints so they happen consistently, on brand, without anyone having to remember.',
  whatWeAutomate: 'Booking confirmations with appointment details. On-the-way notifications with real ETA. Job completion summaries. Review requests timed for when satisfaction is highest. Follow-up for repeat business.',
  integrations: 'Your CRM, FSM, or scheduling system. Twilio, SendGrid, or whatever you use for SMS/email. Google, Yelp, or industry review platforms. We trigger from events in your systems.',
  howItWorks: 'Customer books—confirmation goes out. Tech dispatched—on-the-way notification with ETA. Job complete—summary with invoice and next steps. 24 hours later—review request. All automatic, all in your voice.',
  implementation: 'We need your message templates, brand guidelines, and access to trigger events in your systems. Setup takes 1-3 weeks.',
  cta: 'Let\'s map your customer touchpoints. Book a call.',
  faq: [
    { q: 'Can we customize the messages?', a: 'Completely. Your brand, your tone. We automate timing and delivery—you control every word.' },
    { q: 'What channels?', a: 'SMS, email, app notifications if you have them. We use what your customers actually check.' },
    { q: 'What about negative feedback?', a: 'Negative responses route to your team immediately for service recovery—before they become public reviews.' },
    { q: 'What does it cost?', a: 'Depends on volume and channels. We\'ll scope it on a call.' }
  ]
};

const leadFollowupData = {
  title: 'Lead Follow-up Automation',
  subtitle: 'Every lead gets followed up. Automatically. Until they decide.',
  intro: 'You\'re paying to generate leads. Then most of them die in your CRM. Someone was supposed to follow up. They got busy. The lead went cold. It happens constantly, and it\'s expensive. We automate the follow-up sequence—fast initial response, persistent outreach until they engage, long-term nurture for the ones who aren\'t ready yet. No lead falls through the cracks because someone forgot.',
  whatWeAutomate: 'Speed-to-lead response within minutes. Follow-up sequences on open quotes. Missed call recovery. Long-term nurture for not-ready-yet leads. Re-engagement for dormant contacts.',
  integrations: 'Salesforce, HubSpot, Pipedrive, Zoho, Dynamics. Web forms, landing pages, call tracking. Your email and SMS tools. We connect to wherever your leads come from.',
  howItWorks: 'Lead comes in—response goes out within minutes via email, SMS, or AI call. No reply? Follow-up at Day 1, Day 3, Day 7. Still nothing? Into the nurture sequence with periodic touches. When they engage, your team takes over.',
  implementation: 'We need access to your lead sources, CRM, and your follow-up sequences (or we\'ll help you build them). Setup takes 2-3 weeks.',
  cta: 'Let\'s look at your lead flow. Book a call.',
  faq: [
    { q: 'Won\'t this annoy people?', a: 'No. Sequences are spaced appropriately and stop when they engage or opt out. Persistent isn\'t aggressive.' },
    { q: 'How is this different from my CRM automation?', a: 'Most CRM automation needs manual setup per lead. We build always-on sequences that trigger automatically from any source.' },
    { q: 'What channels?', a: 'Email, SMS, phone via AI or callback queues. Multi-channel works better than single-channel.' },
    { q: 'What does it cost?', a: 'Depends on volume. We\'ll scope it on a call.' }
  ]
};

const dataEntryAutomationData = {
  title: 'Data Entry & Admin Automation',
  subtitle: 'Enter it once. It shows up everywhere. Documents generate themselves.',
  intro: 'Your team types the same information into three systems. Customer fills out a form, someone re-enters it into the CRM, then again into dispatch, then again into accounting. It\'s slow, error-prone, and it doesn\'t scale. We connect your systems so data flows automatically. Enter once, sync everywhere. Documents generate from system data. Your team handles exceptions, not copy-paste.',
  whatWeAutomate: 'Smart intake forms that validate at entry. System-to-system sync—CRM to dispatch to accounting. Document generation from system data—contracts, work orders, reports. Exception routing for anything that needs a human look.',
  integrations: 'CRMs, ERPs, accounting systems. Google Sheets, Airtable, custom databases. If it has an API or accepts imports, we can probably connect it.',
  howItWorks: 'Data enters via form or import. Validation catches errors at entry. Information syncs to every system that needs it. Documents generate automatically. Exceptions flag for review. No duplicate entry. No copy-paste.',
  implementation: 'We map your data flows—what goes where, what triggers what. Simple integrations take days. Complex multi-system setups take 2-4 weeks.',
  cta: 'Let\'s map your data workflows. Book a call.',
  faq: [
    { q: 'What systems can you integrate?', a: 'Most CRMs, ERPs, and accounting systems. Custom databases with API access. We work with what you have.' },
    { q: 'What about paper forms?', a: 'We can digitize intake with mobile-friendly forms. For paper that has to stay paper, OCR/scanning is an option.' },
    { q: 'How do you handle bad data?', a: 'Validation rules catch errors at entry. Anomalies flag for review. Bad data doesn\'t spread.' },
    { q: 'What does it cost?', a: 'Depends on complexity and number of systems. We\'ll scope it on a call.' }
  ]
};


export default function App() {
  const [page,setPage] = useState('home');
  
  // Check analytics consent on mount
  useEffect(() => {
    checkAnalyticsConsent();
  }, []);
  
  // Update page title based on current page
  useEffect(() => {
    const titles = {
      'home': 'Forgelight Labs | AI Revenue Infrastructure',
      'about': 'About | Forgelight Labs',
      'contact': 'Contact | Forgelight Labs',
      'faq': 'FAQ | Forgelight Labs',
      'blog': 'Blog | Forgelight Labs',
      'call-network': 'Call Network | Forgelight Labs',
      'web-development': 'Website Development & SEO Services | Forgelight Labs',
      'privacy': 'Privacy Policy | Forgelight Labs',
      'ai-front-desk': 'AI Sales Desk | Forgelight Labs',
      'ai-outbound': 'Outbound Engine | Forgelight Labs',
      'referral': 'Referral Engine | Forgelight Labs',
      'broker-os': 'Broker OS | Forgelight Labs',
      'content-engine': 'Content Engine | Forgelight Labs',
      'website-design': 'Website Design | Forgelight Labs',
      'ai-front-desk-roofing': 'AI Voice Agents for Roofing Contractors | Forgelight Labs',
      'ai-front-desk-hvac': 'AI Voice Agents for HVAC Companies | Forgelight Labs',
      'ai-front-desk-plumbing': 'AI Voice Agents for Plumbers | Forgelight Labs',
      'ai-front-desk-trucking': 'AI Voice Agents for Parts Dealers | Forgelight Labs',
      'ai-front-desk-pest': 'AI Voice Agents for Pest Control | Forgelight Labs',
      'ai-front-desk-solar': 'AI Voice Agents for Solar Companies | Forgelight Labs',
      'ai-front-desk-property': 'AI Voice Agents for Property Management | Forgelight Labs',
      'ai-front-desk-staffing': 'AI Voice Agents for Staffing Agencies | Forgelight Labs',
      'ai-front-desk-vet': 'AI Voice Agents for Veterinary Clinics | Forgelight Labs',
      'ai-front-desk-towing': 'AI Voice Agents for Towing Companies | Forgelight Labs',
      'ai-front-desk-dental': 'AI Receptionist for Dental Practices | Forgelight Labs',
      'ai-front-desk-legal': 'AI Receptionist for Law Firms | Forgelight Labs',
      'ai-front-desk-medical': 'AI Receptionist for Medical Practices | Forgelight Labs',
      'ai-front-desk-chiro': 'AI Receptionist for Chiropractors | Forgelight Labs',
      'ai-outbound-staffing': 'AI Outbound for Staffing Agencies | Forgelight Labs',
      'ai-outbound-saas': 'AI Outbound for B2B SaaS | Forgelight Labs',
      'ai-outbound-msp': 'AI Outbound for MSPs & IT Services | Forgelight Labs',
      'ai-outbound-agency': 'AI Outbound for Marketing Agencies | Forgelight Labs',
      'ai-outbound-advisor': 'AI Outbound for Financial Advisors | Forgelight Labs',
      'referral-real-estate': 'AI Referral System for Real Estate Agents | Forgelight Labs',
      'referral-mortgage': 'AI Referral System for Mortgage Lenders | Forgelight Labs',
      'referral-insurance': 'AI Referral System for Insurance Brokers | Forgelight Labs',
      'referral-advisor': 'AI Referral System for Financial Advisors | Forgelight Labs',
      'referral-inspector': 'AI Referral System for Home Inspectors | Forgelight Labs',
      'broker-os-freight': 'Broker OS for Freight Brokers | Forgelight Labs',
      'broker-os-wholesale': 'Broker OS for Wholesale Real Estate | Forgelight Labs',
      'broker-os-recruiters': 'Broker OS for Recruiters | Forgelight Labs',
      'content-engine-local': 'Content Engine for Local Service Businesses | Forgelight Labs',
      'content-engine-realestate': 'Content Engine for Real Estate Agents | Forgelight Labs',
      'content-engine-advisor': 'Content Engine for Financial Advisors | Forgelight Labs',
      'website-design-local': 'Website Design for Local Service Businesses | Forgelight Labs',
      'website-design-realestate': 'Website Design for Real Estate Agents | Forgelight Labs',
      'back-office': 'Back-Office Automations | Forgelight Labs',
      'billing-automation': 'AI Billing Automation | Forgelight Labs',
      'quoting-automation': 'AI Quoting & Estimating Automation | Forgelight Labs',
      'scheduling-automation': 'AI Scheduling & Dispatch Automation | Forgelight Labs',
      'customer-communications': 'AI Customer Communications Automation | Forgelight Labs',
      'lead-followup': 'AI Lead Follow-up & Nurture Automation | Forgelight Labs',
      'data-entry-automation': 'AI Data Entry & Admin Automation | Forgelight Labs'
    };
    document.title = titles[page] || 'Forgelight Labs';
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'AI-powered revenue infrastructure for teams who want systems, not services. Book a call to see what\'s possible.');
    }
    
    // Scroll to top on page change
    window.scrollTo(0, 0);
    
    // Track page view if analytics is loaded
    if (window.gtag) {
      window.gtag('event', 'page_view', { page_path: '/' + page });
    }
  }, [page]);
  
  const renderPage = () => {
    if (page === 'home') return <Home setPage={setPage}/>;
    if (page === 'privacy') return <Privacy setPage={setPage}/>;
    if (page === 'contact') return <Contact setPage={setPage}/>;
    if (page === 'faq') return <FAQ setPage={setPage}/>;
    if (page === 'blog') return <Blog setPage={setPage}/>;
    if (page === 'call-network') return <CallNetwork setPage={setPage}/>;
    if (page === 'back-office') return <BackOffice setPage={setPage}/>;
    if (page === 'web-development') return <WebDev setPage={setPage}/>;
    if (page.startsWith('blog-')) return <BlogPost setPage={setPage} slug={page.replace('blog-', '')}/>;
    if (page === 'about') return <About setPage={setPage}/>;
    if (page === 'ai-front-desk-roofing') return <MoneyPage setPage={setPage} data={roofingData}/>;
    if (page === 'ai-front-desk-hvac') return <MoneyPage setPage={setPage} data={hvacData}/>;
    if (page === 'ai-front-desk-plumbing') return <MoneyPage setPage={setPage} data={plumbingData}/>;
    if (page === 'ai-front-desk-trucking') return <MoneyPage setPage={setPage} data={truckingData}/>;
    if (page === 'ai-front-desk-pest') return <MoneyPage setPage={setPage} data={pestData}/>;
    if (page === 'ai-front-desk-solar') return <MoneyPage setPage={setPage} data={solarData}/>;
    if (page === 'ai-front-desk-property') return <MoneyPage setPage={setPage} data={propertyData}/>;
    if (page === 'ai-front-desk-staffing') return <MoneyPage setPage={setPage} data={staffingData}/>;
    if (page === 'ai-front-desk-vet') return <MoneyPage setPage={setPage} data={vetData}/>;
    if (page === 'ai-front-desk-towing') return <MoneyPage setPage={setPage} data={towingData}/>;
    if (page === 'ai-front-desk-dental') return <MoneyPage setPage={setPage} data={dentalData}/>;
    if (page === 'ai-front-desk-legal') return <MoneyPage setPage={setPage} data={legalData}/>;
    if (page === 'ai-front-desk-medical') return <MoneyPage setPage={setPage} data={medicalData}/>;
    if (page === 'ai-front-desk-chiro') return <MoneyPage setPage={setPage} data={chiroData}/>;
    // Outbound Engine Money Pages
    if (page === 'ai-outbound-staffing') return <MoneyPage setPage={setPage} data={outboundStaffingData}/>;
    if (page === 'ai-outbound-saas') return <MoneyPage setPage={setPage} data={outboundSaasData}/>;
    if (page === 'ai-outbound-msp') return <MoneyPage setPage={setPage} data={outboundMspData}/>;
    if (page === 'ai-outbound-agency') return <MoneyPage setPage={setPage} data={outboundAgencyData}/>;
    if (page === 'ai-outbound-advisor') return <MoneyPage setPage={setPage} data={outboundAdvisorData}/>;
    // Referral Engine Money Pages
    if (page === 'referral-real-estate') return <MoneyPage setPage={setPage} data={referralRealEstateData}/>;
    if (page === 'referral-mortgage') return <MoneyPage setPage={setPage} data={referralMortgageData}/>;
    if (page === 'referral-insurance') return <MoneyPage setPage={setPage} data={referralInsuranceData}/>;
    if (page === 'referral-advisor') return <MoneyPage setPage={setPage} data={referralAdvisorData}/>;
    if (page === 'referral-inspector') return <MoneyPage setPage={setPage} data={referralInspectorData}/>;
    // Broker OS Money Pages
    if (page === 'broker-os-freight') return <MoneyPage setPage={setPage} data={brokerFreightData}/>;
    if (page === 'broker-os-wholesale') return <MoneyPage setPage={setPage} data={brokerWholesaleData}/>;
    if (page === 'broker-os-recruiters') return <MoneyPage setPage={setPage} data={brokerRecruitersData}/>;
    // Content Engine Money Pages
    if (page === 'content-engine-local') return <MoneyPage setPage={setPage} data={contentLocalData}/>;
    if (page === 'content-engine-realestate') return <MoneyPage setPage={setPage} data={contentRealEstateData}/>;
    if (page === 'content-engine-advisor') return <MoneyPage setPage={setPage} data={contentAdvisorData}/>;
    // Website Design Money Pages
    if (page === 'website-design-local') return <MoneyPage setPage={setPage} data={websiteLocalData}/>;
    if (page === 'website-design-realestate') return <MoneyPage setPage={setPage} data={websiteRealEstateData}/>;
    // Back-Office Automation Pages
    if (page === 'billing-automation') return <BackOfficePage setPage={setPage} data={billingAutomationData}/>;
    if (page === 'quoting-automation') return <BackOfficePage setPage={setPage} data={quotingAutomationData}/>;
    if (page === 'scheduling-automation') return <BackOfficePage setPage={setPage} data={schedulingAutomationData}/>;
    if (page === 'customer-communications') return <BackOfficePage setPage={setPage} data={customerCommsData}/>;
    if (page === 'lead-followup') return <BackOfficePage setPage={setPage} data={leadFollowupData}/>;
    if (page === 'data-entry-automation') return <BackOfficePage setPage={setPage} data={dataEntryAutomationData}/>;
    return <Landing id={page} setPage={setPage}/>;
  };
  
  return (
    <div style={{fontFamily:'Inter,-apple-system,sans-serif'}}>
      <Header setPage={setPage}/>
      {renderPage()}
      {/* Chat widget removed - add back when connected to real service */}
      <CookieBanner/>
    </div>
  );
}

// Chat Widget Component
const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hey! I'm the Forgelight AI assistant. I can answer questions about our systems, help you figure out what you need, or get you booked on a call. What brings you here today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const SYSTEM_PROMPT = `You are the Forgelight Labs AI assistant. You help visitors understand our AI-powered revenue systems and qualify them for a call.

Our services:
1. AI Sales Desk - AI answers calls 24/7, qualifies leads, books appointments
2. Outbound Engine - Automated prospecting and outreach that books meetings
3. Referral Engine - Automated partner nurturing and referral generation
4. Broker OS - Deal flow management for business brokers
5. Content Engine - Done-for-you content creation and publishing
6. Website Design - Conversion-focused websites, live in 14-21 days

Pricing: Depends on scope, typically $2-10k/month. Encourage them to book a call for specifics.
Timeline: Most systems go live in 7-21 days depending on complexity.
Booking link: calendly.com/forgelightlabs

Be helpful, concise, and conversational. Ask clarifying questions. Guide qualified prospects toward booking a call. Keep responses under 3 sentences unless more detail is specifically requested.`;

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsTyping(true);

    // Claude API call
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'YOUR_ANTHROPIC_API_KEY', // Replace with your API key
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          system: SYSTEM_PROMPT,
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.content[0].text 
        }]);
      } else {
        // Fallback to placeholder if API fails
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: getPlaceholderResponse(userMessage)
        }]);
      }
    } catch (error) {
      // Fallback to placeholder responses
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: getPlaceholderResponse(userMessage)
      }]);
    }
    
    setIsTyping(false);
  };

  const getPlaceholderResponse = (msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) {
      return "Pricing depends on which systems you need and the complexity of your setup. Most clients invest between $2-10k/month depending on scope. Want to book a quick call to get a proper quote for your situation?";
    }
    if (lower.includes('book') || lower.includes('call') || lower.includes('talk') || lower.includes('meeting')) {
      return "Great! You can book a 20-minute call directly here: calendly.com/forgelightlabs — or just tell me a bit about what you're looking for and I can point you in the right direction first.";
    }
    if (lower.includes('ai') || lower.includes('voice') || lower.includes('phone') || lower.includes('sales desk')) {
      return "Our AI Sales Desk answers every call 24/7, qualifies leads, and books appointments directly to your calendar. No missed calls, no voicemail black holes. Want to know more about how it works?";
    }
    if (lower.includes('outbound') || lower.includes('lead') || lower.includes('prospect')) {
      return "The Outbound Engine fills your pipeline automatically — we identify your ideal prospects, run personalized outreach, and book meetings on your calendar. Interested in learning more?";
    }
    if (lower.includes('website') || lower.includes('web') || lower.includes('design') || lower.includes('site')) {
      return "We build websites that actually convert — fast, modern, and designed to turn visitors into customers. Most sites go live in 14-21 days. Your current site not pulling its weight?";
    }
    if (lower.includes('content') || lower.includes('social') || lower.includes('post')) {
      return "Our Content Engine creates and publishes content for you automatically. You just approve what we send to your inbox. Sound like something you need?";
    }
    if (lower.includes('referral') || lower.includes('partner')) {
      return "The Referral Engine finds partners, nurtures relationships, and activates referrals on autopilot. Perfect for anyone who lives on referrals. Want to see how it could work for you?";
    }
    if (lower.includes('how') && lower.includes('work')) {
      return "Simple: we build the system, it runs 24/7. We handle the AI and infrastructure — you get more revenue without more headcount. What are you trying to solve?";
    }
    return "Good question. What's the main revenue challenge you're trying to solve right now?";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const ChatIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  );

  const CloseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );

  const SendIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  );

  return (
    <>
      {/* Chat bubble button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: c.warm,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            zIndex: 1000,
            color: c.bg,
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          <ChatIcon/>
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '380px',
          height: '520px',
          background: c.bgCard,
          borderRadius: '16px',
          border: '1px solid ' + c.border,
          boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid ' + c.border,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: c.bg
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: c.accentSubtle,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="18" height="18" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="27" fill="none" stroke={c.warm} strokeWidth="3"/>
                  {[...Array(8)].map((_, i) => {
                    const angle = (i * 45 - 90) * Math.PI / 180;
                    const x1 = 32 + Math.cos(angle) * 8;
                    const y1 = 32 + Math.sin(angle) * 8;
                    const x2 = 32 + Math.cos(angle) * 20;
                    const y2 = 32 + Math.sin(angle) * 20;
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c.warm} strokeWidth="2" strokeLinecap="round"/>;
                  })}
                  <circle cx="32" cy="32" r="4" fill={c.warm}/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: c.text }}>Forgelight AI</div>
                <div style={{ fontSize: '0.7rem', color: c.accent }}>Usually replies instantly</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: c.textTertiary,
                padding: '4px'
              }}
            >
              <CloseIcon/>
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '85%',
                  padding: '12px 16px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user' ? c.warm : c.bg,
                  color: msg.role === 'user' ? c.bg : c.text,
                  fontSize: '0.875rem',
                  lineHeight: 1.5
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '16px 16px 16px 4px',
                  background: c.bg,
                  color: c.textTertiary,
                  fontSize: '0.875rem'
                }}>
                  <span style={{ animation: 'pulse 1.5s infinite' }}>●</span>
                  <span style={{ animation: 'pulse 1.5s infinite 0.2s' }}> ●</span>
                  <span style={{ animation: 'pulse 1.5s infinite 0.4s' }}> ●</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '16px',
            borderTop: '1px solid ' + c.border,
            background: c.bg
          }}>
            <div style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center'
            }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '100px',
                  border: '1px solid ' + c.border,
                  background: c.bgCard,
                  color: c.text,
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: input.trim() ? c.warm : c.bgCard,
                  border: 'none',
                  cursor: input.trim() ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: input.trim() ? c.bg : c.textTertiary
                }}
              >
                <SendIcon/>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @media (max-width: 480px) {
          div[style*="width: 380px"] {
            width: calc(100vw - 32px) !important;
            height: calc(100vh - 100px) !important;
            bottom: 16px !important;
            right: 16px !important;
          }
        }
      `}</style>
    </>
  );
};
