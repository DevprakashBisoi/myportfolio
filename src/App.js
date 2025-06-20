import Contact from "./components/Contact";
import Experience from "./components/Experience";
import About from "./components/About";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Portfolio from "./components/Skills";
import SocialLinks from "./components/SocialLinks";

function App() {
  return (
    <div className="app-container">
      <NavBar />

      {/* Home Section */}
      <div className="section home-section">
        <Home />
      </div>

      {/* Wavy divider between Home and About */}

      <div
        className="wave-divider"
        style={{
          position: "relative",
          marginTop: "-1px",
          lineHeight: 0,
          backgroundColor: "#361540", // Match the SVG fill color
        }}
      >
        <svg
          viewBox="0 0 1240 250"
          preserveAspectRatio="none"
          className="wave-svg"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            margin: 0,
            padding: 0,
          }}
        >
          <path
            fill="#9141d9"
            d="M0,224L48,213.3C96,203,192,181,288,165.3C384,149,480,139,576,160C672,181,768,235,864,234.7C960,235,1056,181,1152,154.7C1248,128,1344,128,1392,128L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      {/* About Section */}
      <div className="section about-section">
        <About />
      </div>

      {/* Wavy divider between Home and About */}

      <div
        className="wave-divider"
        style={{
          position: "relative",
          marginTop: "-1px",
          lineHeight: 0,
          backgroundColor: "#10061a", // Match the SVG fill color
        }}
      >
        <svg
          viewBox="0 0 1240 250"
          preserveAspectRatio="none"
          className="wave-svg"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            margin: 0,
            padding: 0,
          }}
        >
          <path
            fill="#774187"
            d="M0,224L48,213.3C96,203,192,181,288,165.3C384,149,480,139,576,160C672,181,768,235,864,234.7C960,235,1056,181,1152,154.7C1248,128,1344,128,1392,128L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      {/* Remaining Sections */}
      <div className="section experience-section">
        <Experience />
      </div>

      {/* Wavy divider between Home and About */}

      <div
        className="wave-divider"
        style={{
          position: "relative",
          marginTop: "-1px",
          lineHeight: 0,
          backgroundColor: "#e66465", // Match the SVG fill color
        }}
      >
        <svg
          viewBox="0 0 1240 250"
          preserveAspectRatio="none"
          className="wave-svg"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            margin: 0,
            padding: 0,
          }}
        >
          <path
            fill="#9141d9"
            d="M0,224L48,213.3C96,203,192,181,288,165.3C384,149,480,139,576,160C672,181,768,235,864,234.7C960,235,1056,181,1152,154.7C1248,128,1344,128,1392,128L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      <div className="section portfolio-section">
        <Portfolio />
      </div>

      {/* Wavy divider between Home and About */}

      <div
        className="wave-divider"
        style={{
          position: "relative",
          marginTop: "-1px",
          lineHeight: 0,
          backgroundColor: "#080808", // Match the SVG fill color
        }}
      >
        <svg
          viewBox="0 0 1240 250"
          preserveAspectRatio="none"
          className="wave-svg"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            margin: 0,
            padding: 0,
          }}
        >
          <path
            fill="#9198e5"
            d="M0,224L48,213.3C96,203,192,181,288,165.3C384,149,480,139,576,160C672,181,768,235,864,234.7C960,235,1056,181,1152,154.7C1248,128,1344,128,1392,128L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      <div className="section contact-section">
        <Contact />
      </div>
      <SocialLinks />
    </div>
  );
}

export default App;
