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
      <div className="section home-section">
        <Home />
      </div>
      <div className="section about-section">
        <About />
      </div>
      <div className="section experience-section">
        <Experience />
      </div>
      <div className="section portfolio-section">
        <Portfolio />
      </div>
      <div className="section contact-section">
        <Contact />
      </div>
      <SocialLinks />
    </div>
  );
}

export default App;
