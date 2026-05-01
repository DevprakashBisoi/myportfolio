import React from "react";

const Footer = () => (
  <footer
    className="footer-pad"
    style={{
      background: "#050508",
      color: "rgba(245,242,236,.28)",
      padding: "1.8rem 4rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: ".5rem",
      borderTop: "1px solid rgba(245,242,236,.05)",
      fontFamily: "var(--mono)",
      fontSize: ".6rem",
      letterSpacing: ".1em",
      textTransform: "uppercase",
    }}
  >
    <span>© 2026 Devprakash</span>
    <span>Associate Consultant · EY India · Bengaluru</span>
    <span>Built with craft, not templates</span>
  </footer>
);

export default Footer;
