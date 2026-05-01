import { useEffect } from "react";

const Bootstrap = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
        :root {
          --ink: #0a0a0f;
          --paper: #f5f2ec;
          --accent: #c8402a;
          --gold: #c8a02a;
          --muted: #6b6b6b;
          --border: #d4cfc5;
          --serif: 'DM Serif Display', Georgia, serif;
          --sans: 'Outfit', sans-serif;
          --mono: 'JetBrains Mono', monospace;
          --display: 'Bebas Neue', sans-serif;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: var(--paper);
          color: var(--ink);
          font-family: var(--sans);
          overflow-x: hidden;
          cursor: none !important;
        }
        * { cursor: none !important; }
        body::after {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 9000; opacity: 0.22;
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: var(--paper); }
        ::-webkit-scrollbar-thumb { background: var(--accent); }
        ::selection { background: var(--accent); color: var(--paper); }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes drawLine { from{width:0} to{width:100%} }
        @keyframes pulse-ring {
          0%{transform:scale(1);opacity:0.6}
          50%{transform:scale(1.04);opacity:0.3}
          100%{transform:scale(1);opacity:0.6}
        }
        @keyframes shimmer {
          0%{background-position:-400px 0}
          100%{background-position:400px 0}
        }
        @keyframes gridDot {
          0%   { top: -6px; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: calc(100% + 6px); opacity: 0; }
        }
        .grid-line-wrap { position: absolute; top: 0; bottom: 0; width: 1px; overflow: visible; pointer-events: none; }
        .grid-line-track { position: absolute; inset: 0; background: rgba(10,10,15,.035); }
        .grid-dot {
          position: absolute; left: 50%; transform: translateX(-50%);
          width: 5px; height: 5px; border-radius: 50%;
          background: radial-gradient(circle, rgba(200,180,60,1) 0%, rgba(200,160,42,.6) 50%, transparent 100%);
          box-shadow: 0 0 8px 3px rgba(200,160,42,.55), 0 0 20px 6px rgba(200,160,42,.2);
          animation: gridDot linear infinite;
        }
  
        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .hero-grid       { grid-template-columns: 1fr !important; }
          .about-grid      { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .exp-grid        { grid-template-columns: 1fr !important; }
          .exp-tabs        { border-right: none !important; border-bottom: 1px solid var(--border) !important; display: flex !important; overflow-x: auto !important; scrollbar-width: none !important; }
          .exp-tabs::-webkit-scrollbar { display: none; }
          .exp-tab-item    { border-bottom: none !important; border-right: 1px solid var(--border) !important; min-width: 180px !important; flex-shrink: 0 !important; }
          .skills-bars     { grid-template-columns: 1fr !important; }
          .projects-grid   { grid-template-columns: repeat(2,1fr) !important; }
          .nav-links-wrap  { display: none !important; }
          .nav-hamburger   { display: flex !important; }
          .nav-cta-wrap    { display: none !important; }
        }
        @media (max-width: 640px) {
          .section-pad     { padding: 5rem 1.4rem !important; }
          .hero-pad        { padding: 0 1.4rem !important; }
          .nav-pad         { padding: 1rem 1.4rem !important; }
          .stats-grid      { grid-template-columns: repeat(2,1fr) !important; }
          .hero-profile    { display: none !important; }
          .projects-grid   { grid-template-columns: 1fr !important; }
          .contact-pad     { padding: 7rem 1.4rem !important; }
          .footer-pad      { padding: 1.5rem 1.4rem !important; flex-direction: column !important; gap: .4rem !important; text-align: center !important; }
          .social-sidebar  { display: none !important; }
          .exp-tabs        { flex-direction: column !important; }
          .exp-tab-item    { border-right: none !important; border-bottom: 1px solid var(--border) !important; min-width: unset !important; }
        }
  
        /* Hamburger hidden by default on desktop */
        .nav-hamburger { display: none; cursor: none !important; }
  
        /* Mobile slide-down menu */
        .mobile-menu {
          position: fixed; inset: 0; top: 60px;
          background: rgba(245,242,236,.97);
          backdrop-filter: blur(20px);
          z-index: 790;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 2.5rem;
          transform: translateY(-110%);
          transition: transform .4s cubic-bezier(.4,0,.2,1);
          pointer-events: none;
        }
        .mobile-menu.open { transform: translateY(0); pointer-events: all; }
        .mobile-menu a {
          font-family: var(--display);
          font-size: 2.8rem;
          letter-spacing: .06em;
          color: var(--ink);
          text-decoration: none;
          transition: color .2s;
          cursor: none !important;
        }
        .mobile-menu a:hover { color: var(--accent); }
      `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);
  return null;
};

export default Bootstrap;
