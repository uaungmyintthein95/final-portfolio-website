import { useEffect, useState } from "react";

const hotspots = [
  { label: "Home", href: "#home", x: 286, y: 9, w: 48, h: 46 },
  { label: "About", href: "#about", x: 337, y: 9, w: 52, h: 46 },
  { label: "Projects", href: "#projects", x: 390, y: 9, w: 66, h: 46 },
  { label: "Skills", href: "#skills", x: 458, y: 9, w: 50, h: 46 },
  { label: "Experience", href: "#experience", x: 509, y: 9, w: 76, h: 46 },
  { label: "Bagan Empire", href: "#bagan", x: 585, y: 9, w: 93, h: 46 },
  { label: "Blog", href: "#projects", x: 679, y: 9, w: 44, h: 46 },
  { label: "Contact", href: "#contact", x: 722, y: 9, w: 62, h: 46 },
  { label: "View projects", href: "#projects", x: 53, y: 357, w: 135, h: 39 },
  {
    label: "Download CV",
    href: "/Aung-Myint-Thein-CV.txt",
    x: 196,
    y: 357,
    w: 132,
    h: 39,
    download: true,
  },
  { label: "View all projects", href: "#projects", x: 1406, y: 31, w: 106, h: 34 },
  { label: "Tokyo Digital Twin case study", href: "#tokyo", x: 981, y: 277, w: 124, h: 32 },
  { label: "Akasaka GT project case study", href: "#tokyo", x: 1114, y: 277, w: 124, h: 32 },
  { label: "Kabutocho Digital Twin case study", href: "#tokyo", x: 1247, y: 277, w: 127, h: 32 },
  { label: "Shin Digital Twin case study", href: "#tokyo", x: 1380, y: 277, w: 130, h: 32 },
  { label: "View live demo", href: "#tokyo", x: 981, y: 579, w: 106, h: 34 },
  { label: "View full resume", href: "#experience", x: 297, y: 900, w: 99, h: 34 },
  { label: "Explore Bagan Empire project", href: "#bagan", x: 984, y: 918, w: 138, h: 31 },
  {
    label: "Email Aung Myint Thein",
    href: "mailto:aungmyintthein9993@gmail.com",
    x: 1266,
    y: 892,
    w: 225,
    h: 36,
  },
];

const anchors = [
  { id: "home", x: 0, y: 0 },
  { id: "about", x: 0, y: 80 },
  { id: "projects", x: 960, y: 54 },
  { id: "tokyo", x: 960, y: 326 },
  { id: "experience", x: 0, y: 636 },
  { id: "skills", x: 425, y: 636 },
  { id: "bagan", x: 875, y: 636 },
  { id: "contact", x: 1234, y: 636 },
];

function positionStyle({ x, y, w = 1, h = 1 }) {
  return {
    left: `${(x / 1536) * 100}%`,
    top: `${(y / 1024) * 100}%`,
    width: `${(w / 1536) * 100}%`,
    height: `${(h / 1024) * 100}%`,
  };
}

export function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = "/portfolio-design.jpg";
    image.onload = () => setLoaded(true);
  }, []);

  return (
    <>
      <a className="skip-link" href="#projects">Skip to projects</a>
      <main className={`portfolio-stage${loaded ? " is-loaded" : ""}`} aria-label="Aung Myint Thein digital twin portfolio">
        <img
          className="portfolio-visual"
          src="/portfolio-design.jpg"
          alt="Aung Myint Thein portfolio showing digital twin projects, experience, skills, Bagan Empire and contact information"
          width="1536"
          height="1024"
        />

        {anchors.map((anchor) => (
          <span
            className="section-anchor"
            id={anchor.id}
            key={anchor.id}
            style={positionStyle(anchor)}
            tabIndex="-1"
          />
        ))}

        <nav className="interactive-layer" aria-label="Portfolio navigation">
          {hotspots.map((hotspot) => (
            <a
              className="hotspot"
              href={hotspot.href}
              style={positionStyle(hotspot)}
              aria-label={hotspot.label}
              title={hotspot.label}
              download={hotspot.download || undefined}
              key={`${hotspot.label}-${hotspot.x}`}
            >
              <span>{hotspot.label}</span>
            </a>
          ))}
        </nav>
      </main>
      <noscript>This portfolio requires JavaScript for its interactive navigation.</noscript>
    </>
  );
}
