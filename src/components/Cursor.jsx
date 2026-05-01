import { useEffect, useRef, useState } from "react";

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const [big, setBig] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const mv = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const dn = () => setClicked(true);
    const up = () => setClicked(false);
    document.addEventListener("mousemove", mv);
    document.addEventListener("mousedown", dn);
    document.addEventListener("mouseup", up);

    const on = () => setBig(true),
      off = () => setBig(false);
    const sel = "a,button,[data-hover]";
    const attach = () =>
      document.querySelectorAll(sel).forEach((el) => {
        el.addEventListener("mouseenter", on);
        el.addEventListener("mouseleave", off);
      });
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });

    let raf;
    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.11;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.11;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${mouse.current.x - 5}px,${
          mouse.current.y - 5
        }px)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${pos.current.x - 20}px,${
          pos.current.y - 20
        }px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("mousemove", mv);
      document.removeEventListener("mousedown", dn);
      document.removeEventListener("mouseup", up);
      cancelAnimationFrame(raf);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
          pointerEvents: "none",
          width: clicked ? 6 : big ? 14 : 10,
          height: clicked ? 6 : big ? 14 : 10,
          background: big ? "var(--gold)" : "var(--accent)",
          borderRadius: "50%",
          transition: "width .18s,height .18s,background .18s",
          willChange: "transform",
          mixBlendMode: "multiply",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99998,
          pointerEvents: "none",
          width: clicked ? 28 : big ? 54 : 40,
          height: clicked ? 28 : big ? 54 : 40,
          border: `1.5px solid ${big ? "var(--gold)" : "var(--accent)"}`,
          borderRadius: "50%",
          transition: "width .28s,height .28s,border-color .25s",
          willChange: "transform",
          opacity: 0.55,
        }}
      />
    </>
  );
};

export default Cursor;
