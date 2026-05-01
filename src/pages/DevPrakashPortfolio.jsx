import { useState, useEffect, useRef } from "react";
import Bootstrap from "../components/Bootstrap";
import Cursor from "../components/Cursor";
import Footer from "../components/Footer";

/* SCROLL PROGRESS */
const ScrollProgress = () => {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement;
      setP((window.scrollY / (d.scrollHeight - d.clientHeight)) * 100);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 9999,
        background: "rgba(10,10,15,.08)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${p}%`,
          background: "linear-gradient(90deg,var(--accent),var(--gold))",
          transition: "width .08s",
        }}
      />
    </div>
  );
};

/* 
   SCROLL REVEAL HOOK
 */
const useReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
};

const Reveal = ({
  children,
  delay = 0,
  y = 28,
  style: s = {},
  as: Tag = "div",
}) => {
  const [ref, vis] = useReveal();
  return (
    <Tag
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity .75s ${delay}s ease, transform .75s ${delay}s ease`,
        ...s,
      }}
    >
      {children}
    </Tag>
  );
};

/* 
   ANIMATED COUNTER
 */
const Counter = ({ to, suffix = "", dur = 1600 }) => {
  const [n, setN] = useState(0);
  const [ref, vis] = useReveal(0.5);
  const done = useRef(false);
  useEffect(() => {
    if (!vis || done.current) return;
    done.current = true;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [vis, to, dur]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
};

/* 
   MAGNETIC BUTTON
 */
const Mag = ({ children, href, primary, onClick, extraStyle = {} }) => {
  const ref = useRef(null);
  const mv = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${
      (e.clientX - r.left - r.width / 2) * 0.22
    }px,${(e.clientY - r.top - r.height / 2) * 0.22}px)`;
  };
  const lv = () => {
    ref.current.style.transform = "translate(0,0)";
  };
  const T = href ? "a" : "button";
  return (
    <T
      ref={ref}
      href={href}
      onClick={onClick}
      data-hover
      onMouseMove={mv}
      onMouseLeave={lv}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = primary
          ? "var(--accent)"
          : "rgba(10,10,15,.04)";
        e.currentTarget.style.borderColor = primary
          ? "var(--accent)"
          : "var(--ink)";
        e.currentTarget.style.boxShadow = primary
          ? "0 8px 28px rgba(200,64,42,.32)"
          : "0 4px 14px rgba(10,10,15,.1)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = primary
          ? "var(--ink)"
          : "transparent";
        e.currentTarget.style.borderColor = primary
          ? "var(--ink)"
          : "var(--border)";
        e.currentTarget.style.boxShadow = "none";
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: ".5rem",
        padding: ".88rem 2.1rem",
        background: primary ? "var(--ink)" : "transparent",
        color: primary ? "var(--paper)" : "var(--ink)",
        fontFamily: "var(--mono)",
        fontSize: ".7rem",
        letterSpacing: ".12em",
        textTransform: "uppercase",
        textDecoration: "none",
        border: primary ? "1px solid var(--ink)" : "1px solid var(--border)",
        transition:
          "background .22s,border-color .22s,box-shadow .22s,transform .18s",
        position: "relative",
        overflow: "hidden",
        ...extraStyle,
      }}
    >
      {children}
    </T>
  );
};

/* 
   WAVY SECTION DIVIDER
 */
const WaveDivider = ({ fromColor, toColor, flip = false }) => (
  <div
    style={{
      display: "block",
      lineHeight: 0,
      background: fromColor,
      marginBottom: -2,
    }}
  >
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      style={{
        display: "block",
        width: "100%",
        height: 90,
        transform: flip ? "scaleY(-1)" : "none",
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={toColor}
        d="M0,45 C180,90 360,0 540,45 C720,90 900,0 1080,45 C1260,90 1380,20 1440,45 L1440,90 L0,90 Z"
      />
    </svg>
  </div>
);

/* 
   SECTION LABEL
 */
const Label = ({ children, light }) => (
  <div
    style={{
      fontFamily: "var(--mono)",
      fontSize: ".63rem",
      letterSpacing: ".24em",
      textTransform: "uppercase",
      color: light ? "var(--gold)" : "var(--accent)",
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center",
      gap: ".75rem",
    }}
  >
    <span
      style={{
        display: "inline-block",
        width: "1.4rem",
        height: 1,
        background: light ? "var(--gold)" : "var(--accent)",
      }}
    />
    {children}
  </div>
);

/* 
   SOCIAL SIDEBAR
 */
const SocialLinks = () => (
  <div
    className="social-sidebar"
    style={{
      position: "fixed",
      right: "1.8rem",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 400,
      display: "flex",
      flexDirection: "column",
      gap: ".75rem",
      alignItems: "center",
    }}
  >
    <div style={{ width: 1, height: "2.5rem", background: "var(--border)" }} />
    {[
      {
        l: "In",
        href: "https://www.linkedin.com/in/devprakashbisoi/",
        title: "LinkedIn",
      },
      { l: "gh", href: "https://github.com/DevprakashBisoi", title: "GitHub" },
      { l: "@", href: "mailto:devprakashbisoi@gmail.com", title: "Email" },
    ].map(({ l, href, title }) => (
      <a
        key={l}
        href={href}
        title={title}
        data-hover
        style={{
          width: 30,
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--muted)",
          textDecoration: "none",
          fontFamily: "var(--mono)",
          fontSize: ".72rem",
          fontWeight: 500,
          transition: "color .2s,transform .2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--accent)";
          e.currentTarget.style.transform = "scale(1.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--muted)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {l}
      </a>
    ))}
    <div style={{ width: 1, height: "2.5rem", background: "var(--border)" }} />
  </div>
);

/* 
   NAVBAR
 */
const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 60);
      ["home", "about", "experience", "skills", "projects", "contact"].forEach(
        (id) => {
          const el = document.getElementById(id);
          if (el && window.scrollY >= el.offsetTop - 220) setActive(id);
        }
      );
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = () => {
      if (window.innerWidth > 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const navLinks = ["About", "Experience", "Skills", "Projects"];

  return (
    <>
      <nav
        className="nav-pad"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 800,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.15rem 4rem",
          background:
            scrolled || menuOpen ? "rgba(245,242,236,.96)" : "transparent",
          borderBottom:
            scrolled || menuOpen
              ? "1px solid var(--border)"
              : "1px solid transparent",
          backdropFilter: scrolled || menuOpen ? "blur(18px)" : "none",
          transition: "background .4s,border-color .4s,backdrop-filter .4s",
        }}
      >
        <a
          href="#home"
          style={{
            fontFamily: "var(--display)",
            fontSize: "1.65rem",
            letterSpacing: ".08em",
            color: "var(--ink)",
            textDecoration: "none",
            zIndex: 810,
          }}
        >
          D<span style={{ color: "var(--accent)" }}>.</span>B
        </a>
        <ul
          className="nav-links-wrap"
          style={{
            display: "flex",
            gap: "2.4rem",
            listStyle: "none",
            margin: 0,
          }}
        >
          {navLinks.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: ".67rem",
                  textTransform: "uppercase",
                  letterSpacing: ".12em",
                  color:
                    active === l.toLowerCase() ? "var(--ink)" : "var(--muted)",
                  textDecoration: "none",
                  position: "relative",
                  transition: "color .2s",
                }}
              >
                {l}
                {active === l.toLowerCase() && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: -4,
                      left: 0,
                      right: 0,
                      height: 1,
                      background: "var(--accent)",
                      animation: "drawLine .3s forwards",
                    }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-cta-wrap">
          <Mag href="#contact" primary>
            Let's Talk →
          </Mag>
        </div>
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            background: "none",
            border: "none",
            padding: ".4rem",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            zIndex: 810,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 24,
                height: 1.5,
                background: "var(--ink)",
                borderRadius: 1,
                transition: "transform .3s, opacity .3s",
                transform:
                  menuOpen && i === 0
                    ? "translateY(6.5px) rotate(45deg)"
                    : menuOpen && i === 2
                    ? "translateY(-6.5px) rotate(-45deg)"
                    : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {navLinks.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
          >
            {l}
          </a>
        ))}
        <Mag href="#contact" primary onClick={() => setMenuOpen(false)}>
          Let's Talk →
        </Mag>
      </div>
    </>
  );
};

const TYPING_LINES = [
  "Associate Consultant",
  "AI/ML Engineer",
  "GenAI Architect",
  "Systems Builder",
];

const Hero = () => {
  const [typed, setTyped] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const ci = useRef(0),
    del = useRef(false),
    pause = useRef(false);

  useEffect(() => {
    let t;
    const tick = () => {
      const cur = TYPING_LINES[lineIdx];
      if (!del.current && !pause.current) {
        if (ci.current < cur.length) {
          setTyped(cur.slice(0, ++ci.current));
          t = setTimeout(tick, 68);
        } else {
          pause.current = true;
          t = setTimeout(() => {
            pause.current = false;
            del.current = true;
            tick();
          }, 1900);
        }
      } else if (del.current) {
        if (ci.current > 0) {
          setTyped(cur.slice(0, --ci.current));
          t = setTimeout(tick, 34);
        } else {
          del.current = false;
          setLineIdx((i) => (i + 1) % TYPING_LINES.length);
          t = setTimeout(tick, 280);
        }
      }
    };
    t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, [lineIdx]);

  const bgRef = useRef(null);
  useEffect(() => {
    const fn = () => {
      if (bgRef.current)
        bgRef.current.style.transform = `translateY(${
          window.scrollY * 0.22
        }px)`;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <section
      id="home"
      className="hero-pad"
      style={{
        minHeight: "100vh",
        background: "var(--paper)",
        padding: "0 4rem",
        position: "relative",
        overflow: "hidden",
        display: "grid",
        gridTemplateRows: "1fr auto",
      }}
    >
      {/* ── CHANGE 1: Animated glowing dot grid lines ── */}
      {[
        { left: "20%", dur: "4s", delay: "0s" },
        { left: "40%", dur: "6s", delay: "1.4s" },
        { left: "60%", dur: "5s", delay: "0.7s" },
        { left: "80%", dur: "7s", delay: "2.1s" },
      ].map(({ left, dur, delay }) => (
        <div key={left} className="grid-line-wrap" style={{ left }}>
          <div className="grid-line-track" />
          <div
            className="grid-dot"
            style={{ animationDuration: dur, animationDelay: delay }}
          />
        </div>
      ))}

      {/* Giant parallax bg text */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          bottom: "-0.05em",
          left: "-0.03em",
          fontFamily: "var(--display)",
          fontSize: "clamp(10rem,21vw,25rem)",
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1px rgba(10,10,15,.05)",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
          letterSpacing: "-0.02em",
        }}
      >
        DEV
      </div>

      {/* Soft radial glow */}
      <div
        style={{
          position: "absolute",
          right: "5%",
          top: "18%",
          width: 340,
          height: 340,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,64,42,.06) 0%, transparent 68%)",
          pointerEvents: "none",
          animation: "float 7s ease-in-out infinite",
        }}
      />

      {/* Main grid */}
      <div
        className="hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "center",
          paddingTop: "13vh",
          paddingBottom: "4vh",
          gap: "4rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* LEFT */}
        <div>
          <Reveal delay={0.1}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: ".67rem",
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "1.2rem",
                display: "flex",
                alignItems: "center",
                gap: ".8rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "2rem",
                  height: 1,
                  background: "var(--accent)",
                }}
              />
              Associate Consultant · EY India · Bengaluru
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <h1
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(5rem,10.5vw,12.5rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.01em",
                color: "var(--ink)",
              }}
            >
              Dev
              <em
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  color: "var(--accent)",
                  display: "block",
                  lineHeight: 1,
                }}
              >
                prakash
              </em>
            </h1>
          </Reveal>

          <Reveal delay={0.38}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: ".95rem",
                letterSpacing: ".03em",
                color: "var(--muted)",
                marginTop: "1.4rem",
                height: "1.4rem",
                display: "flex",
                alignItems: "center",
                gap: ".08rem",
              }}
            >
              {typed}
              <span
                style={{
                  animation: "blink 1s step-end infinite",
                  color: "var(--accent)",
                  fontWeight: 700,
                }}
              >
                |
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.48}>
            <p
              style={{
                fontWeight: 300,
                fontSize: "1rem",
                lineHeight: 1.82,
                color: "var(--muted)",
                maxWidth: "42ch",
                marginTop: ".9rem",
              }}
            >
              Building intelligent systems at the intersection of language
              models, enterprise software, and real-world impact. 2+ years
              turning ideas into production AI.
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "2.4rem",
                flexWrap: "wrap",
              }}
            >
              <Mag href="#projects" primary>
                View Work ↓
              </Mag>
              <Mag href="#contact">Contact Me</Mag>
            </div>
          </Reveal>

          {/* ── CHANGE 2: Updated stats ── */}
          <Reveal delay={0.72}>
            <div
              className="stats-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: "1px",
                background: "var(--border)",
                border: "1px solid var(--border)",
                marginTop: "3rem",
              }}
            >
              {[
                { val: 2, suf: "+", label: "Years at EY" },
                { val: 5, suf: "", label: "Internships" },
                { val: 4, suf: "", label: "Tech stacks shipped" },
                { val: 3, suf: "", label: "Enterprise clients" },
              ].map(({ val, suf, label }) => (
                <div
                  key={label}
                  style={{
                    background: "var(--paper)",
                    padding: "1.4rem 1.2rem",
                    transition: "background .2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#ede9e0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "var(--paper)")
                  }
                >
                  <div
                    style={{
                      fontFamily: "var(--display)",
                      fontSize: "2.5rem",
                      lineHeight: 1,
                      color: "var(--ink)",
                    }}
                  >
                    <Counter to={val} suffix={suf} />
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: ".58rem",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      marginTop: ".35rem",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* RIGHT — Circular profile image */}
        <Reveal
          delay={0.3}
          y={0}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          className="hero-profile"
        >
          <div style={{ position: "relative", width: 300, height: 300 }}>
            <div
              style={{
                position: "absolute",
                inset: -18,
                borderRadius: "50%",
                border: "2px dashed rgba(200,160,42,.35)",
                animation: "spin-slow 18s linear infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: -8,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at center, rgba(200,160,42,.22) 60%, transparent 100%)",
                animation: "pulse-ring 3.5s ease-in-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: -5,
                borderRadius: "50%",
                border: "3px solid var(--gold)",
                boxShadow:
                  "0 0 32px rgba(200,160,42,.3), 0 0 64px rgba(200,160,42,.12)",
              }}
            />
            <div
              style={{
                width: 300,
                height: 300,
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative",
                zIndex: 2,
                background: "linear-gradient(135deg,#e8e2d8,#d4cfc5)",
                border: "4px solid var(--paper)",
                boxShadow: "0 20px 60px rgba(10,10,15,.18)",
              }}
            >
              <img
                src={require("../assets/me.jpg")}
                alt="Devprakash"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 10,
                right: -18,
                zIndex: 3,
                background: "var(--paper)",
                border: "1px solid var(--border)",
                borderRadius: 4,
                padding: ".5rem .9rem",
                boxShadow: "0 4px 16px rgba(10,10,15,.12)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--display)",
                  fontSize: "1.1rem",
                  color: "var(--gold)",
                  lineHeight: 1,
                }}
              >
                EY
              </div>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: ".5rem",
                  letterSpacing: ".1em",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                }}
              >
                India
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Marquee */}
      <div
        style={{
          overflow: "hidden",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: ".7rem 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "2rem",
            animation: "marquee 22s linear infinite",
            whiteSpace: "nowrap",
          }}
        >
          {[
            "LLM",
            "·",
            "Python",
            "·",
            "Copilot Studio",
            "·",
            "Power BI",
            "·",
            "Multi-Agent Systems",
            "·",
            "C#",
            "·",
            "RAG Pipelines",
            "·",
            "Power Automate",
            "·",
            "LLM",
            "·",
            "Langgraph",
            "·",
            "Copilot Studio",
            "·",
            "Langchain",
            "·",
            "Power BI",
            "·",
            "Multi-Agent Systems",
            "·",
            "C#",
            "·",
            "RAG Pipelines",
            "·",
            "Power Automate",
            "·",
          ].map((t, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--mono)",
                fontSize: ".61rem",
                letterSpacing: ".13em",
                textTransform: "uppercase",
                color: t === "·" ? "var(--border)" : "var(--muted)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

/* 
   ABOUT
 */
const About = () => {
  const facts = [
    {
      icon: "🎓",
      label: "Education",
      value:
        "B.Tech. Computer Science\nSpecialization in machine intelligence and Data science\nPES University, Bengaluru",
    },
    {
      icon: "🏢",
      label: "Current Role",
      value: "Associate Consultant\nEY India · 2+ Years",
    },
    {
      icon: "🌐",
      label: "Domains",
      value: "Logistics · Cybersecurity\nFMCG · Retail",
    },
    {
      icon: "✍️",
      label: "Beyond Work",
      value:
        "Horror & fantasy fiction · Karate\nBasketball · Precious metals investing",
    },
  ];
  const badges = [
    "PES University",
    "EY India",
    "Bengaluru",
    "Fiction Writer",
    "Karate Black belt",
    "Basketball",
    "Macro Investor",
  ];

  return (
    <>
      <WaveDivider fromColor="var(--paper)" toColor="var(--ink)" />
      <section
        id="about"
        className="section-pad"
        style={{
          padding: "8rem 4rem",
          background: "var(--ink)",
          color: "var(--paper)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "8%",
            right: "4%",
            width: 380,
            height: 380,
            borderRadius: "50%",
            border: "1px solid rgba(200,160,42,.07)",
            pointerEvents: "none",
          }}
        />
        <Reveal>
          <Label light>About Me</Label>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(2.4rem,4.8vw,4.2rem)",
              lineHeight: 1.06,
              color: "var(--paper)",
              maxWidth: "14ch",
            }}
          >
            Engineer.{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
              Thinker.
            </em>{" "}
            Builder.
          </h2>
        </Reveal>
        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.15fr",
            gap: "5.5rem",
            marginTop: "3.5rem",
            alignItems: "start",
          }}
        >
          <div>
            {[
              <p>
                Hi! I'm{" "}
                <strong style={{ color: "var(--paper)" }}>Devprakash</strong>, a
                25-year-old graduate of{" "}
                <strong style={{ color: "var(--paper)" }}>
                  PES University
                </strong>{" "}
                with a degree in Computer Science and Engineering. I've always
                been fascinated by computing and technology.
              </p>,
              <p>
                What inspires me most is how advancements in computer science
                influence every field — from science to culture — impacting
                people who may not even realize it. This{" "}
                <strong style={{ color: "var(--paper)" }}>
                  transformative power of technology
                </strong>{" "}
                is what led me to pursue a computer-based career.
              </p>,
              <p>
                I'm passionate about using my technical skills to address
                real-world challenges. Beyond coding, I enjoy{" "}
                <strong style={{ color: "var(--paper)" }}>
                  gaming, playing basketball, practicing karate
                </strong>
                , exploring new places, writing horror stories, and engaging in
                social service.
              </p>,
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.11}>
                <div
                  style={{
                    fontWeight: 300,
                    fontSize: "1rem",
                    lineHeight: 1.84,
                    color: "rgba(245,242,236,.7)",
                    marginBottom: "1.3rem",
                  }}
                >
                  {p}
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.38}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: ".45rem",
                  marginTop: "1.4rem",
                }}
              >
                {badges.map((b) => (
                  <span
                    key={b}
                    data-hover
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: ".58rem",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      padding: ".35rem .75rem",
                      border: "1px solid rgba(245,242,236,.14)",
                      color: "rgba(245,242,236,.48)",
                      transition: "border-color .2s,color .2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--gold)";
                      e.currentTarget.style.color = "var(--gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(245,242,236,.14)";
                      e.currentTarget.style.color = "rgba(245,242,236,.48)";
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal
            delay={0.18}
            style={{ border: "1px solid rgba(245,242,236,.08)" }}
          >
            {facts.map((f, i) => (
              <div
                key={i}
                style={{
                  padding: "1.7rem 2rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1.4rem",
                  borderBottom:
                    i < facts.length - 1
                      ? "1px solid rgba(245,242,236,.06)"
                      : "none",
                  transition: "background .2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(245,242,236,.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>
                  {f.icon}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: ".58rem",
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      marginBottom: ".3rem",
                    }}
                  >
                    {f.label}
                  </div>
                  <div
                    style={{
                      fontSize: ".88rem",
                      color: "rgba(245,242,236,.64)",
                      lineHeight: 1.65,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {f.value}
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
};

/* 
   EXPERIENCE
 */
const Experience = () => {
  const [active, setActive] = useState(0);
  const exps = [
    {
      date: "2023 — Present",
      company: "EY India (Ernst & Young)",
      type: "Full-Time",
      role: "Associate Consultant — AI/ML & GenAI",
      desc: "Building end-to-end GenAI solutions across enterprise clients in logistics, FMCG, cybersecurity, and retail. Lead development of multi-agent Copilot Studio systems, RAG pipelines with Azure AI Search, and document intelligence workflows.",
      impact: [
        "95% reduction in manual review time for cosmetics client",
        "1,000+ hours saved annually with cybersecurity audit tool",
        "85%+ accuracy on security policy extraction",
        "Built multi-agent Jira automation system end-to-end",
      ],
      tags: [
        "LLM",
        "Azure",
        "Copilot Studio",
        "Power Automate",
        "C#",
        "Power BI",
        "Python",
        "ReactJS",
      ],
    },
    {
      date: "Dec 2022 — Jun 2023",
      company: "Bernoullium",
      type: "Internship",
      role: "Intern — Virtual Worlds & XR Research",
      desc: "Conducted platform analysis to identify and evaluate virtual world building platforms, gaining insights into industry dynamics and cost-benefit analysis. Researched and assessed VR gear for work meetings, developing expertise in processors, Wi-Fi protocols, and global availability. Created a comprehensive test plan for a network sizing tool to optimise data flow and minimise lag in virtual meetings.",
      impact: [
        "Identified optimal virtual world platform balancing features and cost",
        "Evaluated VR gear for client meetings — recommended best-fit device",
        "Built network test plan using Wireshark & protocol analysis to deliver lag-free virtual meetings",
        "Helped determine network optimisations for perfect picture resolution and voice quality",
      ],
      tags: [
        "VR Research",
        "Wireshark",
        "Network Analysis",
        "Wi-Fi Protocols",
        "Platform Evaluation",
        "Cost-Benefit Analysis",
      ],
    },
    {
      date: "Jan 2023 — Jun 2023",
      company: "Netcon Technologies India Pvt. Ltd.",
      type: "Internship",
      role: "Intern — Knowledge Graph & NLP",
      desc: "Worked on an application that utilises knowledge graphs to retrieve information from uploaded documents. Developed a knowledge graph-based information retrieval system for extracting structured insights from unstructured document data.",
      impact: [
        "Built knowledge graph pipeline for document information retrieval",
        "Enabled structured insight extraction from unstructured uploads",
        "Delivered functional NLP-based query system over document corpus",
      ],
      tags: [
        "Knowledge Graphs",
        "NLP",
        "Python",
        "Information Retrieval",
        "Document Processing",
      ],
    },
    {
      date: "Jun 2022 — Aug 2022",
      company: "Altimetrik",
      type: "Internship",
      role: "Project Intern — Blockchain",
      desc: "Created a secure system that stores and retrieves background details of a candidate using blockchain technology. The solution enables registered users to safely access candidate information in a tamper-proof, decentralised manner.",
      impact: [
        "Designed and built a blockchain-based candidate background verification system",
        "Ensured secure, tamper-proof storage and retrieval of sensitive data",
        "Restricted access to registered users only for data integrity",
      ],
      tags: [
        "Blockchain",
        "Smart Contracts",
        "Solidity",
        "Web3",
        "Security",
        "Decentralised Systems",
      ],
    },
    {
      date: "Jun 2022 — Aug 2022",
      company: "Cloudbyz",
      type: "Internship",
      role: "Intern — Salesforce & Process Automation",
      desc: "Worked on different modules in Salesforce Trailhead for hands-on training. Created process workflows and automation algorithms to streamline business operations within the Salesforce ecosystem.",
      impact: [
        "Completed hands-on Salesforce Trailhead module training",
        "Designed and implemented process automation workflows",
        "Contributed to business process optimisation through automation algorithms",
      ],
      tags: [
        "Salesforce",
        "Trailhead",
        "Process Automation",
        "Workflow Design",
        "CRM",
      ],
    },
    {
      date: "Jun 2021 — Jul 2021",
      company: "Kritikal Solutions",
      type: "Internship",
      role: "Intern",
      desc: "Created a liveness detection model using Python to verify the authenticity of real-time user images. The model helps determine whether a real-time image is genuine to prevent spoofing and identity fraud.",
      impact: [
        "Built a liveness detection model to distinguish real vs spoofed user images",
        "Helped prevent identity fraud in real-time image verification systems",
        "Implemented using Python-based computer vision techniques",
      ],
      tags: [
        "Python",
        "Computer Vision",
        "Liveness Detection",
        "OpenCV",
        "Deep Learning",
        "Anti-Spoofing",
      ],
    },
    {
      date: "2019 — 2023",
      company: "PES University",
      type: "Academic",
      role: "B.Tech Computer Science — Machine Intelligence & Data Science",
      desc: "Four years of rigorous computer science education at one of South India's top engineering colleges. Built strong foundations in algorithms, OS, networking, databases, and software engineering alongside applied MIDS coursework.",
      impact: [
        "Graduated with Computer Science & Engineering degree",
        "Active in hackathons",
        "Final year capstone project in machine learning",
      ],
      tags: [
        "C",
        "Java",
        "Python",
        "DBMS",
        "OS",
        "Computer Networks",
        "Data Structures",
        "Software Engineering",
        "ReactJS",
        "Informtion retrival",
        "Data Mining",
        "Big Data",
      ],
    },
  ];
  const cur = exps[active];
  const typeColors = {
    "Full-Time": "var(--accent)",
    Internship: "var(--gold)",
    Academic: "#5a8a6a",
  };

  return (
    <>
      <WaveDivider fromColor="var(--ink)" toColor="var(--paper)" />
      <section
        id="experience"
        className="section-pad"
        style={{ padding: "8rem 4rem", background: "var(--paper)" }}
      >
        <Reveal>
          <Label>Career & Experience</Label>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(2.4rem,4.8vw,4.2rem)",
              lineHeight: 1.06,
              maxWidth: "14ch",
            }}
          >
            Where I've{" "}
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
              Built
            </em>{" "}
            Things
          </h2>
        </Reveal>
        <div
          className="exp-grid"
          style={{
            marginTop: "3.5rem",
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            border: "1px solid var(--border)",
          }}
        >
          <div
            className="exp-tabs"
            style={{ borderRight: "1px solid var(--border)" }}
          >
            {exps.map((e, i) => (
              <div
                key={i}
                className="exp-tab-item"
                data-hover
                onClick={() => setActive(i)}
                style={{
                  padding: "1.6rem 1.4rem",
                  borderBottom: "1px solid var(--border)",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  background:
                    active === i ? "rgba(200,64,42,.04)" : "var(--paper)",
                  transition: "background .2s",
                }}
                onMouseEnter={(x) => {
                  if (active !== i)
                    x.currentTarget.style.background = "rgba(10,10,15,.02)";
                }}
                onMouseLeave={(x) => {
                  if (active !== i)
                    x.currentTarget.style.background = "var(--paper)";
                }}
              >
                {active === i && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 3,
                      background: "var(--accent)",
                    }}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                    marginBottom: ".3rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: ".56rem",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      padding: ".18rem .5rem",
                      background: typeColors[e.type] + "18",
                      color: typeColors[e.type],
                      borderRadius: 2,
                    }}
                  >
                    {e.type}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: ".58rem",
                    letterSpacing: ".08em",
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    marginBottom: ".35rem",
                  }}
                >
                  {e.date}
                </div>
                <div
                  style={{
                    fontFamily: "var(--sans)",
                    fontWeight: 600,
                    fontSize: ".95rem",
                    color: active === i ? "var(--accent)" : "var(--ink)",
                    transition: "color .2s",
                    lineHeight: 1.3,
                  }}
                >
                  {e.company}
                </div>
              </div>
            ))}
          </div>
          <div
            key={active}
            style={{
              padding: "2.5rem 3rem",
              animation: "fadeUp .38s forwards",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".8rem",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: ".58rem",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  padding: ".2rem .6rem",
                  background: typeColors[cur.type] + "18",
                  color: typeColors[cur.type],
                  borderRadius: 2,
                }}
              >
                {cur.type}
              </span>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: ".58rem",
                  color: "var(--muted)",
                  letterSpacing: ".06em",
                }}
              >
                {cur.date}
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: "1.45rem",
                fontStyle: "italic",
                color: "var(--accent)",
                marginBottom: "1rem",
              }}
            >
              {cur.role}
            </div>
            <p
              style={{
                fontSize: ".88rem",
                lineHeight: 1.82,
                color: "var(--muted)",
                maxWidth: "62ch",
                marginBottom: "1.6rem",
              }}
            >
              {cur.desc}
            </p>
            <div style={{ marginBottom: "1.5rem" }}>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: ".58rem",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  marginBottom: ".6rem",
                }}
              >
                Key Impact
              </div>
              {cur.impact.map((pt, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: ".55rem",
                    marginBottom: ".38rem",
                  }}
                >
                  <span
                    style={{
                      color: "var(--accent)",
                      marginTop: ".12rem",
                      flexShrink: 0,
                    }}
                  >
                    →
                  </span>
                  <span
                    style={{
                      fontSize: ".86rem",
                      color: "var(--muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    {pt}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: ".38rem",
                paddingTop: "1.4rem",
                borderTop: "1px solid var(--border)",
              }}
            >
              {cur.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: ".58rem",
                    letterSpacing: ".05em",
                    padding: ".22rem .6rem",
                    background: "rgba(200,64,42,.07)",
                    color: "var(--accent)",
                    borderRadius: 2,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

/* 
   SKILLS  ── CHANGE 3: futuristic categorised text layout
 */
const SKILL_CATEGORIES = [
  {
    icon: "⌨️",
    label: "Languages",
    color: "#7eb8f7",
    items: [
      "Python",
      "PySpark",
      "C",
      "R",
      "SQL",
      "ReactJS",
      "HTML",
      "CSS",
      "C#",
    ],
  },
  {
    icon: "☁️",
    label: "Cloud & DevOps",
    color: "#a78bfa",
    items: ["Azure", "AWS"],
  },
  {
    icon: "🤖",
    label: "AI / ML & GenAI",
    color: "#c8a02a",
    items: [
      "LLM Engineering",
      "Langchain",
      "RAG Pipelines",
      "Prompt Engineering",
      "Multi-Agent Systems",
      "Copilot Studio",
      "AI Builder",
      "Computer Vision",
      "NLP",
      "Knowledge Graphs",
    ],
  },
  {
    icon: "🛠️",
    label: "Developer Tools",
    color: "#6ee7b7",
    items: [
      "Git",
      "Docker",
      "VS Code",
      "MongoDB",
      "PostgreSQL",
      "Linux",
      "Power BI",
      "Power Automate",
      "Yellow.ai",
      "GitHub Copilot",
      "Jira",
      "Wireshark",
      "Salesforce",
    ],
  },
  {
    icon: "🔗",
    label: "Frameworks & Platforms",
    color: "#f9a8d4",
    items: [
      "Scikit-learn",
      "TensorFlow",
      "OpenCV",
      "Pandas",
      "NumPy",
      "Heroku",
      "Databricks",
      "Web3 / Blockchain",
      "Solidity",
    ],
  },
];

const Skills = () => (
  <>
    <WaveDivider fromColor="var(--paper)" toColor="#0f0e14" />
    <section
      id="skills"
      className="section-pad"
      style={{
        padding: "8rem 4rem",
        background: "#0f0e14",
        color: "var(--paper)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(rgba(200,160,42,.038) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(126,184,247,.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "3%",
          width: 240,
          height: 240,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,160,42,.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Reveal>
        <Label light>Capabilities</Label>
      </Reveal>
      <Reveal delay={0.1}>
        <h2
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(2.4rem,4.8vw,4.2rem)",
            lineHeight: 1.06,
            color: "var(--paper)",
            maxWidth: "14ch",
          }}
        >
          Tools of the{" "}
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Trade</em>
        </h2>
      </Reveal>

      <div
        style={{
          marginTop: "4rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "1px",
          background: "rgba(245,242,236,.06)",
          border: "1px solid rgba(245,242,236,.06)",
        }}
      >
        {SKILL_CATEGORIES.map((cat, ci) => (
          <Reveal
            key={cat.label}
            delay={ci * 0.08}
            style={{ background: "#0f0e14", padding: "2.2rem 2.4rem" }}
          >
            <div
              style={{ height: "100%", transition: "background .25s" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(245,242,236,.025)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".75rem",
                  marginBottom: "1.4rem",
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>{cat.icon}</span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: ".58rem",
                      letterSpacing: ".22em",
                      textTransform: "uppercase",
                      color: cat.color,
                      marginBottom: ".18rem",
                    }}
                  >
                    {cat.label}
                  </div>
                  <div
                    style={{
                      width: "2.5rem",
                      height: "1px",
                      background: cat.color,
                      opacity: 0.5,
                    }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".45rem" }}>
                {cat.items.map((item) => (
                  <span
                    key={item}
                    data-hover
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: ".62rem",
                      letterSpacing: ".07em",
                      padding: ".32rem .75rem",
                      border: `1px solid ${cat.color}28`,
                      color: "rgba(245,242,236,.65)",
                      borderRadius: "2px",
                      transition: "border-color .2s, color .2s, background .2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = cat.color;
                      e.currentTarget.style.color = cat.color;
                      e.currentTarget.style.background = cat.color + "12";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = cat.color + "28";
                      e.currentTarget.style.color = "rgba(245,242,236,.65)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal
        delay={0.5}
        style={{
          marginTop: "3rem",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(245,242,236,.06)",
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: ".6rem",
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "rgba(245,242,236,.25)",
          }}
        >
          Specialisations
        </div>
        {[
          "GenAI Engineering",
          "Multi-Agent Systems",
          "RAG Architecture",
          "Document Intelligence",
          "Power Platform",
          "Cloud AI",
        ].map((s) => (
          <span
            key={s}
            style={{
              fontFamily: "var(--mono)",
              fontSize: ".62rem",
              letterSpacing: ".08em",
              color: "rgba(245,242,236,.35)",
              display: "flex",
              alignItems: "center",
              gap: ".4rem",
            }}
          >
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "var(--gold)",
                display: "inline-block",
                opacity: 0.7,
              }}
            />
            {s}
          </span>
        ))}
      </Reveal>
    </section>
  </>
);

/* 
   PROJECTS
 */
const ProjCard = ({ num, title, desc, impact, tech, delay: d }) => {
  const [hov, setHov] = useState(false);
  return (
    <Reveal
      delay={d}
      style={{
        background: hov ? "#f0ece3" : "var(--paper)",
        padding: "2.4rem",
        display: "flex",
        flexDirection: "column",
        transition: "background .22s",
        position: "relative",
        overflow: "hidden",
        borderBottom: `3px solid ${hov ? "var(--accent)" : "transparent"}`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: hov ? 72 : 0,
          height: hov ? 72 : 0,
          background: "var(--accent)",
          opacity: 0.08,
          transition: "width .28s,height .28s",
          borderBottomLeftRadius: "100%",
        }}
      />
      <div
        style={{
          fontFamily: "var(--display)",
          fontSize: "3.2rem",
          lineHeight: 1,
          color: hov ? "rgba(200,64,42,.18)" : "rgba(10,10,15,.07)",
          marginBottom: ".7rem",
          transition: "color .3s",
        }}
      >
        {num}
      </div>
      <div
        style={{
          fontFamily: "var(--serif)",
          fontSize: "1.12rem",
          lineHeight: 1.3,
          color: "var(--ink)",
          marginBottom: ".75rem",
        }}
      >
        {title}
      </div>
      <p
        style={{
          fontSize: ".82rem",
          lineHeight: 1.76,
          color: "var(--muted)",
          flex: 1,
          marginBottom: "1.1rem",
        }}
      >
        {desc}
      </p>
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: ".6rem",
          letterSpacing: ".06em",
          color: "var(--accent)",
          paddingTop: ".75rem",
          borderTop: "1px solid var(--border)",
          marginTop: "auto",
        }}
      >
        ↑ {impact}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: ".28rem",
          marginTop: ".6rem",
        }}
      >
        {tech.map((t) => (
          <span
            key={t}
            style={{
              fontFamily: "var(--mono)",
              fontSize: ".56rem",
              letterSpacing: ".04em",
              color: "var(--muted)",
              padding: ".18rem .48rem",
              background: "rgba(10,10,15,.05)",
              borderRadius: 2,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </Reveal>
  );
};

const Projects = () => {
  const projs = [
    {
      num: "01",
      title: "MindArt — GenAI Image Metadata Generator",
      desc: "An intelligent image analysis application powered by Google Gemini that automatically generates optimized titles, descriptions, and SEO tags from visual content. Leverages advanced prompt engineering and embeddings to create consistent, context-aware metadata tailored for artists, photographers, and digital galleries. Streamlines asset management and improves discoverability across digital platforms.",
      impact: "Automated metadata generation for digital creatives",
      tech: [
        "Gemini",
        "Python",
        "Embeddings",
        "Prompt Engineering",
        "Image Analysis",
      ],
    },
    {
      num: "02",
      title: "EasyRental — Laptop Rental Portal",
      desc: "End-to-end database-driven rental platform enabling seamless laptop rental transactions. Architected with PostgreSQL for complex relational data modeling, Python backend for business logic, and intuitive UX for customer browsing, booking, and payment workflows. Optimized queries for inventory management and rental tracking.",
      impact: "Easy to use production-ready application",
      tech: [
        "PostgreSQL",
        "Python",
        "Flask",
        "SQL Optimization",
        "Database Design",
      ],
    },
    {
      num: "03",
      title: "Cars+ A Car Rental & Purchase Platform",
      desc: "Full-stack web application providing unified car rental and purchase marketplace. Built with React.js frontend for dynamic UI, MongoDB for flexible document storage, and Node.js backend. Implemented real-time availability tracking, secure payment integration, and user authentication with role-based access.",
      impact: "Multi-vendor rental & sales ecosystem",
      tech: ["React.js", "MongoDB", "Node.js", "Express"],
    },
    {
      num: "04",
      title: "Placement Analytics Dashboard",
      desc: "Data-driven analysis tool leveraging statistical methods in R to uncover factors influencing student placement outcomes. Performed exploratory data analysis on university placement dataset, built predictive models, and generated visualizations revealing correlations between academic metrics, skills, and job placements. Delivered actionable insights to improve placement strategies.",
      impact: "Evidence-based placement insights",
      tech: [
        "R",
        "ggplot2",
        "dplyr",
        "Statistical Modeling",
        "Data Visualization",
      ],
    },
    {
      num: "05",
      title: "Smart Stick — Assistive Technology Device",
      desc: "Innovative dual-sensor wearable device designed to enhance mobility and safety for visually impaired individuals. Integrates ultrasonic and thermal sensors to detect obstacles and temperature changes in real-time, providing tactile and auditory feedback. Prototyped with Arduino and embedded C, validated through accessibility testing.",
      impact: "Assistive tech for accessibility",
      tech: [
        "Arduino",
        "Embedded C",
        "Sensor Integration",
        "IoT",
        "Real-time Processing",
      ],
    },
  ];
  return (
    <>
      <WaveDivider fromColor="#0f0e14" toColor="var(--paper)" />
      <section
        id="projects"
        className="section-pad"
        style={{ padding: "8rem 4rem", background: "var(--paper)" }}
      >
        <div style={{ marginBottom: "3.5rem" }}>
          <Reveal>
            <Label>Selected Work</Label>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(2.4rem,4.8vw,4.2rem)",
                lineHeight: 1.06,
              }}
            >
              Things I've{" "}
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
                Made
              </em>
            </h2>
          </Reveal>
        </div>
        <div
          className="projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "1px",
            background: "var(--border)",
            border: "1px solid var(--border)",
          }}
        >
          {projs.map((p, i) => (
            <ProjCard key={p.num} {...p} delay={(i % 3) * 0.09} />
          ))}
        </div>
      </section>
    </>
  );
};

/* 
   CONTACT
 */
const Contact = () => (
  <>
    <WaveDivider fromColor="var(--paper)" toColor="var(--ink)" />
    <section
      id="contact"
      className="contact-pad"
      style={{
        padding: "11rem 4rem",
        background: "var(--ink)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: "var(--display)",
            fontSize: "28vw",
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "1px rgba(245,242,236,.04)",
            userSelect: "none",
          }}
        >
          HI
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 560,
          height: 560,
          borderRadius: "50%",
          border: "1px solid rgba(200,160,42,.06)",
          pointerEvents: "none",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <Reveal style={{ position: "relative" }}>
        <Label light>Get In Touch</Label>
      </Reveal>
      <Reveal delay={0.1} style={{ position: "relative" }}>
        <h2
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(2.4rem,5.5vw,4.8rem)",
            lineHeight: 1.1,
            color: "var(--paper)",
            maxWidth: "18ch",
            margin: "0 auto 1.4rem",
          }}
        >
          Let's build something{" "}
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
            remarkable
          </em>{" "}
          together.
        </h2>
      </Reveal>
      <Reveal delay={0.2} style={{ position: "relative" }}>
        <p
          style={{
            fontWeight: 300,
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "rgba(245,242,236,.48)",
            maxWidth: "44ch",
            margin: "0 auto 3rem",
          }}
        >
          Whether you're looking for an AI engineer, want to discuss a GenAI
          problem, or just want to say hello — my inbox is always open.
        </p>
      </Reveal>
      <Reveal
        delay={0.3}
        style={{
          position: "relative",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Mag
          href="mailto:devprakashbisoi@gmail.com"
          extraStyle={{
            color: "var(--paper)",
          }}
        >
          Send Email
        </Mag>
        <Mag
          href="https://www.linkedin.com/in/devprakashbisoi/"
          extraStyle={{
            borderColor: "rgba(245,242,236,.2)",
            color: "var(--paper)",
          }}
        >
          LinkedIn
        </Mag>
        <Mag
          href="https://github.com/DevprakashBisoi"
          extraStyle={{
            borderColor: "rgba(245,242,236,.2)",
            color: "var(--paper)",
          }}
        >
          GitHub
        </Mag>
      </Reveal>
    </section>
  </>
);

/* 
   APP ROOT
 */
export default function App() {
  return (
    <>
      <Bootstrap />
      <Cursor />
      <ScrollProgress />
      <SocialLinks />
      <NavBar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
