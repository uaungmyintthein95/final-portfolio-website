import "./styles.css";
import * as THREE from "three";

const cvUrl = "/portfolio-assets/pdf/Aung%20Myint%20Thein%20CV%202026.pdf";

const projects = [
  {
    id: "riverport",
    title: "Riverport Interactive City Tour",
    category: "Web 3D",
    image: "/assets/tokyo-business.gif",
    year: "2026",
    summary: "A browser-based 3D city experience combining a fly-through map, interactive landmarks and immersive 360° views.",
    tech: ["Three.js", "WebGL", "GLB", "360° Panorama"],
    url: "/riverport/index.html",
    details: ["Interactive Tokyo city model", "Camera fly-through and orbit navigation", "Projected landmark pins and place stories", "In-browser 360° panorama viewer"],
  },
  {
    id: "shin",
    title: "Shin Digital Twin",
    category: "Digital Twin",
    image: "/assets/tokyo-business.gif",
    year: "2023–2024",
    summary: "Urban digital-twin technology development powered by Unreal Engine.",
    tech: ["Unreal Engine 5", "Urban Development", "Real-time 3D"],
    url: "https://shin-digitaltwin.jp/movie/",
    details: ["Real-time urban visualization", "City-scale technical development", "Interactive stakeholder presentations", "Production Unreal Engine workflow"],
  },
  {
    id: "akasaka",
    title: "Akasaka Digital Twin",
    category: "Digital Twin",
    image: "/assets/Akasaka Digital Twin.gif",
    year: "2024–2025",
    summary: "A data-linked urban twin for the Akasaka–Toranomon greenway area.",
    tech: ["Unreal Engine 5", "IoT", "API Integration"],
    url: "https://www.tokyo-platform.metro.tokyo.lg.jp/projects/akasaka-toranomon/",
    details: ["IoT and API-connected urban data", "Real-time Unreal Engine development", "Interactive public-space visualization", "City data utilization research"],
  },
  {
    id: "kabutocho",
    title: "Kabutocho Digital Twin",
    category: "Digital Twin",
    image: "/assets/Kabutocho Digital Twin.gif",
    year: "2025",
    summary: "A real-time digital twin for the Nihonbashi Kabutocho district.",
    tech: ["Unreal Engine 5", "GIS", "Point Cloud"],
    url: "https://prtimes.jp/main/html/rd/p/000000155.000024148.html",
    details: ["City-scale point-cloud visualization", "Mobility and public-space studies", "Asset information linked to 3D context", "High-performance desktop presentation"],
  },
  {
    id: "marble",
    title: "Marble Visions",
    category: "Digital Twin",
    image: "/assets/tokyo-waterfront.png",
    year: "2025–2026",
    summary: "Digital-twin technology for infrastructure and urban-development workflows.",
    tech: ["Unreal Engine 5", "Infrastructure", "Urban Development"],
    url: "https://marble-visions.com/jp/",
    details: ["Infrastructure-focused visualization", "Urban-development technology research", "Scalable AEC data pipelines", "High-fidelity stakeholder presentation"],
  },
  {
    id: "okazaki",
    title: "Okazaki Digital Twin",
    category: "Digital Twin",
    image: "/assets/tokyo-business.gif",
    year: "2025",
    summary: "A city-scale digital-twin initiative for Okazaki, Japan.",
    tech: ["Unreal Engine 5", "City Data", "Visualization"],
    url: "https://note.com/scsi/n/n220a42dbae83",
    details: ["Municipal-scale visualization", "Urban data integration", "Interactive city exploration", "Digital-twin communication tools"],
  },
  {
    id: "hiroshima",
    title: "Hiroshima Peace Memorial",
    category: "Point Cloud",
    image: "/assets/Hiroshima Peace Memorial.gif",
    year: "2025",
    summary: "A point-cloud and 3D-scan study of the Hiroshima Peace Memorial.",
    tech: ["Point Cloud", "3D Scan", "Sketchfab"],
    url: "https://sketchfab.com/3d-models/hiroshima-peace-memorial-point-cloud-style-08c22e7c4d334f8e869ad7149141b798",
    details: ["Point-cloud reconstruction", "Historic-site visualization", "Web-based 3D presentation", "Spatial capture workflow"],
  },
  {
    id: "yangon",
    title: "Yangon Downtown",
    category: "Point Cloud",
    image: "/assets/Yangon Downtown.gif",
    year: "2025",
    summary: "An interactive point-cloud visualization of downtown Yangon.",
    tech: ["Point Cloud", "3D", "Sketchfab"],
    url: "https://sketchfab.com/3d-models/yangon-downtown-2ce12b1a66164d3bbda43b658becffae",
    details: ["Urban-scale spatial capture", "Web-delivered 3D model", "Downtown context visualization", "Point-cloud presentation workflow"],
  },
  {
    id: "urban-planning",
    title: "Digital Twin Urban Planning",
    category: "Unreal Engine",
    image: "/assets/Digital Twin Urban Planning.gif",
    year: "2025",
    summary: "An Unreal Engine 5 planning visualization combining architectural and Revit data.",
    tech: ["Unreal Engine 5", "Revit", "ArchViz"],
    url: "https://www.youtube.com/watch?v=1S6axGCF0nw",
    details: ["Revit and architectural data integration", "Real-time urban visualization", "Cinematic city presentation", "Interactive planning environment"],
  },
  {
    id: "bim-portfolio",
    title: "BIM Portfolio",
    category: "BIM/CIM",
    image: "/assets/BIM Portfolio.gif",
    year: "2018–2020",
    summary: "A portfolio of BIM design, modeling and coordination work across civil and building projects.",
    tech: ["Revit", "Navisworks", "BIM Coordination"],
    url: "https://uaungmyintthein171.wixsite.com/1710",
    details: ["Architectural and structural BIM", "Model coordination and collaboration", "Construction documentation", "Design and visualization studies"],
  },
  {
    id: "bagan",
    title: "Bagan Empire Myanmar Art",
    category: "Unreal Engine",
    image: "/assets/bagan-empire.gif",
    year: "2025",
    summary: "A personal AAA action-RPG world inspired by the monumental landscape of ancient Bagan.",
    tech: ["Unreal Engine 5", "World Building", "Gameplay"],
    url: "https://www.youtube.com/channel/UC_orXpQ464E_Dlrt8iTMXTQ",
    details: ["Large-scale historical environment", "Exploration and interaction systems", "Atmospheric lighting and VFX", "Modular architecture and world streaming"],
  },
];

const skills = [
  ["Unreal Engine 5", 90],
  ["Revit & SketchUp", 90],
  ["Cesium", 80],
  ["Twinmotion & D5 & Enscape & Lumion", 95],
  ["GIS / QGIS", 75],
  ["Navisworks", 90],
  ["Python", 70],
  ["C++", 60],
  ["WingEarth", 75],
  ["Houdini & Blender", 75],
];

const experience = [
  ["Feb 2022 — Jun 2026", "VACS Co., Ltd.", "Technical Leader · BIM/CIM Urban Development Digital Twin Engineer", "Tokyo, Japan"],
  ["Dec 2019 — Dec 2021", "RYOWA Co., Ltd.", "Construction Management Engineer", "Osaka, Japan"],
  ["Mar 2018 — Dec 2018", "MaHarYeMon Co., Ltd.", "Site Engineer", "Mandalay, Myanmar"],
  ["Aug 2016 — Dec 2016", "Global Grand Group Co., Ltd.", "Roadway Engineer", "Yangon, Myanmar"],
  ["Sep 2012 — Sep 2014", "Kyaw Gabar Construction Co., Ltd.", "Site Engineer", "Mandalay, Myanmar"],
];

const education = [
  ["Bachelor of Engineering", "Civil Engineering · Technological University, Kyaukse", "2017–2019"],
  ["Bachelor of Technology", "Civil Engineering · Technological University, Kyaukse", "2014–2016"],
];

const toolLogos = [
  ["Unreal Engine 5", "Unreal Engine 5.png"], ["Revit", "Revit.png"], ["Twinmotion", "Twinmotion.png"],
  ["Blender", "Blender.png"], ["Houdini", "Houdini.png"], ["Navisworks", "Navisworks.png"],
  ["WingEarth", "wingearth.png"], ["D5 Render", "D5 Render.png"], ["SketchUp", "Google Sketchup.png"],
  ["Enscape", "Enscape.png"], ["AutoCAD", "Auto CAD.png"], ["Lumion", "Lumion.png"],
];

const certifications = [
  ["Google AI Essentials", "Google · 2025", "Google_AI_Essentials__Google_.pdf"],
  ["AWS AI Practitioner Certification Prep", "Learnkarts · 2025", "AWS_AI_Practitioner_Certification_Prep__Learnkarts_.pdf"],
  ["Python for Data Analysis", "Coursera · 2025", "Python_for_Data_Analysis_Pandas___NumPy__Coursera_.pdf"],
  ["Foundations of Project Management", "Google · 2025", "Foundations_of_Project_Management__Google_.pdf"],
  ["Introduction to C++ & Unreal Engine", "University of Colorado · 2025", "Introduction_to_C___Programming_and_Unreal_Engine__University_of_Colorado_.pdf"],
  ["Unreal Engine Fundamentals", "Epic Games · 2025", "Unreal_Engine_Fundamentals__Epic_.pdf"],
  ["Unreal Engine 5 Environment Design", "Packt · 2024", "Unreal_Engine_5___Environment_Design__packt_.pdf"],
  ["Mastering Digital Twins", "28DGTL · 2024", "Mastering_Digital_Twins__28DGTL_.pdf"],
  ["BIM Coordination & Collaboration", "Autodesk / YOI · 2020", "BIM_03_Coordination___Collaboration_Autodesk_Authorized_Certificate_YOI_Knowledge_Center_BIMLight_SG_Myanmar.pdf"],
  ["Construction Project Management Diploma", "City of Oxford College · 2019", "Professional_Diploma_in_Construction_Project_Management__City_of_Oxford_College__UK__course_conducted_by_Myanmar_International_Business_Academy.pdf"],
  ["BIM Modeling Revit 01 & 02", "TU Kyaukse · 2018", "BIM_Modeling_Revit_01_02_Architecture___Structure__Department_of_Civil_Engineering__Technological_University_Kyaukse.pdf"],
];

const projectCards = projects
  .map(
    (project) => `
      <article class="project-card" data-category="${project.category}" data-project="${project.id}">
        <img src="${project.image}" alt="${project.title} project visualization" loading="lazy" />
        <div class="project-card__body">
          <p class="eyebrow">${project.category} · ${project.year}</p>
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <div class="tags">${project.tech.map((item) => `<span>${item}</span>`).join("")}</div>
          <button class="text-action" type="button" data-open-project="${project.id}">View case study</button>
        </div>
      </article>`,
  )
  .join("");

document.querySelector("#root").innerHTML = `
  <a class="skip-link" href="#main">Skip to content</a>

  <header class="site-header">
    <a class="brand" href="#home" aria-label="Aung Myint Thein home">AMT</a>
    <nav class="desktop-nav" aria-label="Primary navigation">
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#featured-case">3D Tour</a>
      <a href="#skills">Skills</a>
      <a href="#credentials">Credentials</a>
      <a href="#experience">Experience</a>
      <a href="#bagan">Bagan Empire</a>
      <a href="#contact">Contact</a>
    </nav>
    <div class="header-actions">
      <button class="language-toggle" type="button" aria-pressed="false">EN / 日本語</button>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu">Menu</button>
    </div>
    <nav class="mobile-nav" id="mobile-menu" aria-label="Mobile navigation" hidden>
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#featured-case">3D Tour</a>
      <a href="#skills">Skills</a>
      <a href="#credentials">Credentials</a>
      <a href="#experience">Experience</a>
      <a href="#bagan">Bagan Empire</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main id="main">
    <section class="hero" id="home" aria-labelledby="hero-title">
      <div class="hero-shade"></div>
      <div class="hero-content">
        <p class="eyebrow">Digital Twin · BIM/CIM · Unreal Engine</p>
        <h1 id="hero-title">Mr.Aung <span>Myint</span> Thein</h1>
        <p class="hero-roles">Civil BIM/CIM Engineer<br />Digital Twin Specialist<br />Unreal Engine Developer</p>
        <p class="hero-copy">Designing the future of smart infrastructure through real-time 3D technology and digital twin solutions.</p>
        <div class="button-row">
          <a class="button button-primary" href="#projects">View projects</a>
          <a class="button button-secondary" href="${cvUrl}" download="Aung Myint Thein CV 2026.pdf">Download CV</a>
        </div>
        <div class="social-links" aria-label="Social links">
          <a href="https://www.youtube.com/@uaungmyintthein4303" target="_blank" rel="noreferrer">YouTube</a>
          <a href="https://www.artstation.com/uaungmyintthein8" target="_blank" rel="noreferrer">ArtStation</a>
          <a href="https://uaungmyintthein171.wixsite.com/1710" target="_blank" rel="noreferrer">BIM Portfolio</a>
          <a href="mailto:aungmyintthein9593@gmail.com">Email</a>
        </div>
      </div>
      <aside class="hero-callouts" aria-label="Featured work">
        <button type="button" data-open-project="riverport"><strong>Riverport 3D Tour</strong><span>WebGL + 360°</span></button>
        <button type="button" data-open-project="shin"><strong>Shin Digital Twin</strong><span>Urban simulation</span></button>
        <button type="button" data-open-project="akasaka"><strong>Akasaka Project</strong><span>IoT + Unreal Engine</span></button>
      </aside>
      
    </section>

    <section class="section about-section" id="about" aria-labelledby="about-title" style="margin-top:-65px;margin-bottom: -130px;">
      <div class="about-portrait">
        <img src="/portfolio-assets/img/profile.png" alt="Aung Myint Thein" />
      </div>
      <div class="about-copy">
        <p class="eyebrow">Engineer · Technical Designer · Builder</p>
        <h2 id="about-title">Bridging BIM/CIM/AEC data and real-time worlds.</h2>
        <p>Originally from Myanmar and now living and working in Japan, I specialize in transforming complex BIM/CIM and urban data into interactive digital twins. My work connects civil engineering, construction knowledge, geospatial systems and Unreal Engine development.</p>
        <p>I lead technical research and development for scalable urban visualization workflows, while continuing to explore world building, point-cloud capture and real-time storytelling through personal projects.</p>
        <div class="about-facts">
          <div><strong>Burmese</strong><span>Native</span></div>
          <div><strong>English</strong><span>Business</span></div>
          <div><strong>Japanese</strong><span>JLPT N2+Business</span></div>
        </div>
      </div>
      <div class="about-motion">
        <img src="/portfolio-assets/img/DigitaltwinAnimation.gif" alt="Animated digital-twin visualization" loading="lazy" />
      </div>
    </section>

    <section class="meridian-scene-section" id="meridian-scene" aria-labelledby="meridian-scene-title">
      <div class="section-heading scene-heading" style="margin-top: 60px;">
        <div>
          <p class="eyebrow">Interactive concept scene</p>
          <h2 id="meridian-scene-title">Scroll through a digital twin narrative</h2>
          <p>Immersive concept visuals bring the same spatial storytelling that powers the projects below.</p>
        </div>
      </div>
      <div class="scroll-stage" id="meridian-stage">
        <div class="pin">
          <canvas class="scene-canvas" id="meridian-scene-canvas"></canvas>
          <div class="scene-grid-bg grid-bg"></div>
          <div class="scene-loader" id="meridian-scene-loader">
            <div class="scene-mark">LOADING SCENE</div>
            <div class="scene-bar"></div>
          </div>
          <div class="scene-hud scene-hud--topleft">
            <div class="scene-sheet-no" id="meridian-sheet-no">SHT.00/04</div>
            <div id="meridian-sheet-label">西新宿</div>
          </div>
          <div class="scene-hud scene-hud--topright">
            <div>西新宿</div>
            <div>DIGITAL TWIN — CONCEPT</div>
          </div>
          <div class="scene-hud scene-hud--bottomleft" id="meridian-cursor">X 0.000 · Y 0.000</div>
          <div class="scene-ruler" id="meridian-ruler">
            <div class="scene-track"></div>
            <div class="scene-fill" id="meridian-ruler-fill"></div>
            <div class="scene-head" id="meridian-ruler-head"></div>
            <div class="scene-pct" id="meridian-ruler-pct">000%</div>
          </div>
          <div class="scene-copy-layer">
            <div class="scene-hero">
              <div class="scene-eyebrow">DIGITAL TWIN — CONCEPT PRESENTATION</div>
              <h3>西新宿</h3>
              <div class="scene-sub">Scroll to move through the sheet</div>
            </div>
            <div class="scene-beat scene-beat--right" id="meridian-beat-1">
              <div class="scene-eyebrow">01 — CONCEPT</div>
              <h4>One gesture, drawn at every scale</h4>
              <p>東京都は、新しい西新宿地区を象徴する空間として、都庁周辺が「東京の魅力を世界に発信する新たなシティホール」となることを目指し、空間の再整備を進めます。</p>
            </div>
            <div class="scene-beat scene-beat--left" id="meridian-beat-2">
              <div class="scene-eyebrow">02 — STRUCTURE</div>
              <h4>西新宿</h4>
              <p>都庁周辺の空間再編計画―新しい西新宿を目指して―【過去～未来編】</p>
            </div>
            <div class="scene-beat scene-beat--right" id="meridian-beat-3">
              <div class="scene-eyebrow">03 — SEQUENCE</div>
              <h4>Arrival, ascent, threshold</h4>
              <p>本動画では、デジタルツインを活用し、デジタル空間上に西新宿地区の過去から現在までの姿を再現し、その中心に位置する都庁周辺について、空間再編後のイメージを紹介しています。</p>
            </div>
            <div class="scene-beat scene-beat--left" id="meridian-beat-4">
              <div class="scene-eyebrow">04 — CONTEXT</div>
              <h4>Landscape as extension of structure</h4>
              <p>※動画中のイメージは、実際の状況と異なる場合があります。また、再編後のイメージについても、関係機関との調整等により、今後変更となる可能性があります。</p>
            </div>
          </div>
          <div class="scene-scroll-hint" id="西新宿-scroll-hint">
            <span>SCROLL</span>
            <div class="scene-stick"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section projects-section" id="projects" aria-labelledby="projects-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Selected work</p>
          <h2 id="projects-title">Projects</h2>
          <p>Featured digital twin, BIM/CIM and real-time visualization projects.</p>
        </div>
        <div class="filters" role="group" aria-label="Filter projects">
          <button type="button" class="is-active" data-filter="All" aria-pressed="true">All</button>
          <button type="button" data-filter="Digital Twin" aria-pressed="false">Digital Twin</button>
          <button type="button" data-filter="BIM/CIM" aria-pressed="false">BIM/CIM</button>
          <button type="button" data-filter="Unreal Engine" aria-pressed="false">Unreal Engine</button>
          <button type="button" data-filter="Point Cloud" aria-pressed="false">Point Cloud</button>
          <button type="button" data-filter="Web 3D" aria-pressed="false">Web 3D</button>
        </div>
      </div>
      <div class="project-grid">${projectCards}</div>
      <p class="empty-state" hidden>No projects match this filter.</p>
    </section>

    <section class="featured-case" id="featured-case" aria-labelledby="featured-title">
      <div class="featured-copy">
        <p class="eyebrow">Featured case study</p>
        <h2 id="featured-title">Riverport Interactive City Tour</h2>
        <p class="lead">A complete WebGL city experience that turns 3D urban data into an explorable digital destination.</p>
        <div class="tags"><span>Three.js</span><span>WebGL</span><span>GLB</span><span>360° Panorama</span></div>
        <ul>
          <li>Cinematic camera fly-through over an optimized Tokyo city model</li>
          <li>Interactive landmark pins, stories and guided camera movement</li>
          <li>Immersive 360° place views with drag and zoom controls</li>
          <li>Responsive mouse, touch and keyboard-friendly interface</li>
        </ul>
        <div class="button-row">
          <a class="button button-primary" href="/riverport/index.html">Launch full experience</a>
          <button class="button button-secondary" type="button" data-open-project="riverport">Project details</button>
        </div>
      </div>
      <div class="interactive-preview">
        <iframe
          src="/riverport/index.html?embed=1"
          title="Interactive preview of the Riverport 3D city tour"
          loading="lazy"
          allow="fullscreen"
        ></iframe>
        <div class="interactive-preview__bar">
          <span><i></i> Live interactive preview</span>
          <a href="/riverport/index.html">Open full screen</a>
        </div>
      </div>
    </section>

    <section class="section resume-grid">
      <div class="panel experience-panel" id="experience">
        <p class="eyebrow">My professional journey</p>
        <h2>Experience</h2>
        <ol class="timeline">
          ${experience
            .map(
              ([year, company, role, location]) => `
                <li>
                  <time>${year}</time>
                  <div><strong>${company}</strong><span>${role}</span><small>${location}</small></div>
                </li>`,
            )
            .join("")}
        </ol>
        <div class="education-list">
          <p class="eyebrow">Education</p>
          ${education
            .map(([degree, school, year]) => `<div><strong>${degree}</strong><span>${school}</span><small>${year}</small></div>`)
            .join("")}
        </div>
        <a class="button button-primary" href="${cvUrl}" download="Aung Myint Thein CV 2026.pdf">Download full resume</a>
      </div>

      <div class="panel skills-panel" id="skills">
        <p class="eyebrow">Core competencies</p>
        <h2>Skills & technologies</h2>
        <div class="skill-list">
          ${skills
            .map(
              ([name, value]) => `
                <div class="skill">
                  <div><span>${name}</span><strong>${value}%</strong></div>
                  <progress max="100" value="${value}">${value}%</progress>
                </div>`,
            )
            .join("")}
        </div>
        <div class="tool-logo-grid" aria-label="Technology toolkit">
          ${toolLogos
            .map(
              ([name, file]) => `
                <div class="tool-logo">
                  <img src="/portfolio-assets/logo/${file}" alt="" loading="lazy" />
                  <span>${name}</span>
                </div>`,
            )
            .join("")}
        </div>
      </div>
    </section>

    <section class="section credentials-section" id="credentials" aria-labelledby="credentials-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Continuous learning</p>
          <h2 id="credentials-title">Credentials</h2>
          <p>Selected certifications spanning AI, project management, BIM and real-time 3D.</p>
        </div>
        <a class="button button-secondary" href="${cvUrl}" target="_blank" rel="noreferrer">Open CV</a>
      </div>
      <div class="credential-grid">
        ${certifications
          .map(
            ([title, issuer, file]) => `
              <article class="credential-card">
                <p class="eyebrow">${issuer}</p>
                <h3>${title}</h3>
                <a href="/portfolio-assets/pdf/${encodeURIComponent(file)}" target="_blank" rel="noreferrer">View credential</a>
              </article>`,
          )
          .join("")}
      </div>
    </section>

    <section class="bagan-feature" id="bagan" aria-labelledby="bagan-title">
      <div class="bagan-shade"></div>
      <div class="bagan-content">
        <p class="eyebrow">Personal AAA action RPG project</p>
        <h2 id="bagan-title">Bagan Empire</h2>
        <p>Building an explorable world inspired by Myanmar’s ancient capital, where monumental architecture, atmospheric storytelling and real-time systems meet.</p>
        <div class="tags"><span>World building</span><span>Characters</span><span>Gameplay</span><span>VFX</span></div>
        <button class="button button-warm" type="button" data-open-project="bagan">Explore project</button>
      </div>
    </section>

    <section class="section contact-section" id="contact" aria-labelledby="contact-title">
      <div class="contact-copy">
        <p class="eyebrow">Start a conversation</p>
        <h2 id="contact-title">Let’s build something real.</h2>
        <p>I collaborate on digital twins, BIM/CIM workflows, real-time visualization and interactive Unreal Engine experiences.</p>
        <dl>
          <div><dt>Email</dt><dd><a href="mailto:aungmyintthein9593@gmail.com">aungmyintthein9593@gmail.com</a></dd></div>
          <div><dt>Phone</dt><dd><a href="tel:+818040221710">080-4022-1710</a></dd></div>
          <div><dt>Location</dt><dd>Tokyo, Japan</dd></div>
        </dl>
      </div>
      <form class="contact-form" novalidate>
        <div class="form-row">
          <label>Name<input name="name" autocomplete="name" required /></label>
          <label>Email<input name="email" type="email" autocomplete="email" required /></label>
        </div>
        <label>Project type
          <select name="projectType">
            <option>Digital Twin</option>
            <option>BIM/CIM Consulting</option>
            <option>Unreal Engine Development</option>
            <option>Other</option>
          </select>
        </label>
        <label>Message<textarea name="message" rows="5" required placeholder="Tell me about your project, timeline and goals."></textarea></label>
        <p class="form-status" aria-live="polite"></p>
        <button class="button button-primary" type="submit">Send inquiry</button>
      </form>
    </section>
  </main>

  <footer>
    <a class="brand" href="#home">AMT</a>
    <p>Aung Myint Thein © 2026. All rights reserved.</p>
    <p>Building the future with BIM, Digital Twins, and Real-Time 3D.</p>
    <a href="#home">Back to top</a>
  </footer>

  <dialog class="project-dialog" aria-labelledby="dialog-title">
    <button class="dialog-close" type="button">Close</button>
    <img class="dialog-image" src="" alt="" />
    <div class="dialog-body">
      <p class="eyebrow dialog-category"></p>
      <h2 id="dialog-title"></h2>
      <p class="dialog-summary"></p>
      <div class="tags dialog-tags"></div>
      <ul class="dialog-details"></ul>
      <a class="button button-primary dialog-link" href="#" target="_blank" rel="noreferrer">Open live project</a>
      <div class="dialog-nav">
        <button type="button" data-dialog-nav="previous">Previous project</button>
        <button type="button" data-dialog-nav="next">Next project</button>
      </div>
    </div>
  </dialog>
`;

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const languageButton = document.querySelector(".language-toggle");
const dialog = document.querySelector(".project-dialog");
let activeProjectIndex = 0;

function initMeridianScene() {
  const section = document.getElementById("meridian-scene");
  const stage = document.getElementById("meridian-stage");
  const canvas = document.getElementById("meridian-scene-canvas");
  const loader = document.getElementById("meridian-scene-loader");
  const sheetNoEl = document.getElementById("meridian-sheet-no");
  const sheetLabelEl = document.getElementById("meridian-sheet-label");
  const cursorEl = document.getElementById("meridian-cursor");
  const scrollHint = document.getElementById("meridian-scroll-hint");
  const rulerFill = document.getElementById("meridian-ruler-fill");
  const rulerHead = document.getElementById("meridian-ruler-head");
  const rulerPct = document.getElementById("meridian-ruler-pct");
  const beats = Array.from(document.querySelectorAll(".scene-beat"));

  if (!section || !stage || !canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lowPowerDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  const renderPixelRatioLimit = reducedMotion || lowPowerDevice ? 1 : 1.5;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, renderPixelRatioLimit));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  const VIDEO_ASPECT = 1920 / 911;

  const video = document.createElement("video");
  video.src = "/video.mp4";
  video.muted = true;
  video.playsInline = true;
  video.preload = reducedMotion || lowPowerDevice ? "metadata" : "auto";
  video.loop = false;
  video.crossOrigin = "anonymous";
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  video.addEventListener("loadeddata", () => {
    video.pause();
    video.currentTime = 0.01;
  });
  video.addEventListener("canplaythrough", () => {
    loader?.classList.add("is-hidden");
  });
  video.addEventListener("error", () => loader?.classList.add("is-hidden"));
  video.load();

  const texture = new THREE.VideoTexture(video);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  const planeGeometry = new THREE.PlaneGeometry(1, 1 / VIDEO_ASPECT, 1, 1);
  const planeMaterial = new THREE.MeshBasicMaterial({ map: texture });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  scene.add(plane);

  const bezelGeometry = new THREE.PlaneGeometry(1.06, 1.06 / VIDEO_ASPECT + 0.06);
  const bezelMaterial = new THREE.MeshStandardMaterial({ color: 0x0f2b45, roughness: 0.9, metalness: 0.1 });
  const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
  bezel.position.z = -0.02;
  plane.add(bezel);

  const keyLight = new THREE.DirectionalLight(0xbfe6ee, 1.1);
  keyLight.position.set(2.2, 2.7, 4);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xe2924f, 0.5);
  rimLight.position.set(-2.8, -1.2, 2.4);
  scene.add(rimLight);
  scene.add(new THREE.AmbientLight(0x8fa9bd, 0.55));

  const mouse = { x: 0, y: 0 };
  const mouseTarget = { x: 0, y: 0 };
  const progress = { value: 0, smooth: 0 };
  const sections = [
    { range: [0.0, 0.1], label: "HERO" },
    { range: [0.14, 0.32], label: "01 CONCEPT" },
    { range: [0.36, 0.54], label: "02 STRUCTURE" },
    { range: [0.58, 0.76], label: "03 SEQUENCE" },
    { range: [0.8, 0.95], label: "04 CONTEXT" },
  ];
  let scrollFrameId = null;

  function fitScene() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;

    const planeHeight = 1 / VIDEO_ASPECT;
    const targetFraction = width < 860 ? 0.92 : 0.88;
    const fovRad = camera.fov * (Math.PI / 180);
    const distance = planeHeight / (targetFraction * 2 * Math.tan(fovRad / 2));
    camera.position.z = distance;
    camera.updateProjectionMatrix();
  }

  function updateSceneState() {
    const rect = stage.getBoundingClientRect();
    const total = Math.max(stage.offsetHeight - window.innerHeight, 1);
    const nextProgress = Math.min(1, Math.max(0, -rect.top / total));
    progress.value = nextProgress;

    let activeIndex = 0;
    sections.forEach((sectionConfig, index) => {
      const [start, end] = sectionConfig.range;
      const fade = 0.035;
      const inValue = Math.max(0, Math.min(1, (nextProgress - (start - fade)) / (fade * 2)));
      const outValue = 1 - Math.max(0, Math.min(1, (nextProgress - (end - fade)) / (fade * 2)));
      const opacity = Math.max(0, Math.min(1, Math.min(inValue, outValue)));
      if (nextProgress >= start - fade && nextProgress <= end + fade) activeIndex = index;
      beats[index]?.style.setProperty("opacity", String(opacity));
    });

    if (sheetNoEl) sheetNoEl.textContent = `SHT.${String(activeIndex).padStart(2, "0")}/0${sections.length - 1}`;
    if (sheetLabelEl) sheetLabelEl.textContent = sections[activeIndex]?.label ?? "HERO";
    if (scrollHint) scrollHint.style.opacity = nextProgress > 0.04 ? "0" : "1";

    const rulerHeight = 320;
    const y = nextProgress * rulerHeight;
    if (rulerFill) rulerFill.style.height = `${y}px`;
    if (rulerHead) rulerHead.style.top = `${y}px`;
    if (rulerPct) rulerPct.textContent = `${Math.round(nextProgress * 100).toString().padStart(3, "0")}%`;

    if (cursorEl) cursorEl.textContent = `X ${mouseTarget.x.toFixed(3)} · Y ${(-mouseTarget.y).toFixed(3)}`;
  }

  function scheduleScrollUpdate() {
    if (scrollFrameId !== null) return;

    scrollFrameId = requestAnimationFrame(() => {
      scrollFrameId = null;
      updateSceneState();
    });
  }

  section.addEventListener("pointermove", (event) => {
    const rect = section.getBoundingClientRect();
    mouseTarget.x = (event.clientX - rect.left) / rect.width * 2 - 1;
    mouseTarget.y = (event.clientY - rect.top) / rect.height * 2 - 1;
  });

  window.addEventListener("resize", () => {
    fitScene();
    scheduleScrollUpdate();
  });
  window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
  fitScene();
  updateSceneState();

  function animate() {
    requestAnimationFrame(animate);
    const motionFactor = reducedMotion || lowPowerDevice ? 0.03 : 0.07;
    const mouseFactor = reducedMotion || lowPowerDevice ? 0.03 : 0.045;

    progress.smooth += (progress.value - progress.smooth) * motionFactor;
    mouse.x += (mouseTarget.x - mouse.x) * mouseFactor;
    mouse.y += (mouseTarget.y - mouse.y) * mouseFactor;

    const cinematicProgress = Math.pow(progress.smooth, 1.2);

    if (video.duration && video.readyState >= 2) {
      const targetTime = cinematicProgress * Math.max(0.05, video.duration - 0.05);
      const timeDelta = Math.abs(video.currentTime - targetTime);
      if (timeDelta > 0.06) {
        video.currentTime = targetTime;
      }
    }

    plane.rotation.y = mouse.x * 0.1 + Math.sin(progress.smooth * Math.PI) * 0.035;
    plane.rotation.x = -mouse.y * 0.08;
    plane.position.x = mouse.x * 0.03;
    plane.position.y = -mouse.y * 0.02;

    camera.position.x = mouse.x * 0.06;
    camera.position.y = -mouse.y * 0.04;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  animate();
}

// Observe the stage and lazy-init scene assets when visible.
initMeridianScene();


window.addEventListener("scroll", () => header.classList.toggle("is-scrolled", window.scrollY > 18), { passive: true });

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  menuButton.textContent = open ? "Menu" : "Close";
  mobileNav.hidden = open;
});

mobileNav.addEventListener("click", (event) => {
  if (!event.target.closest("a")) return;
  mobileNav.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "Menu";
});

languageButton.addEventListener("click", () => {
  const japanese = languageButton.getAttribute("aria-pressed") !== "true";
  languageButton.setAttribute("aria-pressed", String(japanese));
  languageButton.textContent = japanese ? "日本語 / EN" : "EN / 日本語";
  document.documentElement.lang = japanese ? "ja" : "en";
  document.querySelector(".form-status").textContent = japanese
    ? "日本語表示を選択しました。主要コンテンツは英語のままです。"
    : "";
});

document.querySelectorAll(".filters button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".filters button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    let visible = 0;
    document.querySelectorAll(".project-card").forEach((card) => {
      const show = filter === "All" || card.dataset.category === filter;
      card.hidden = !show;
      if (show) visible += 1;
    });
    document.querySelector(".empty-state").hidden = visible !== 0;
  });
});

function renderProject(index) {
  activeProjectIndex = (index + projects.length) % projects.length;
  const project = projects[activeProjectIndex];
  dialog.querySelector(".dialog-image").src = project.image;
  dialog.querySelector(".dialog-image").alt = `${project.title} project visualization`;
  dialog.querySelector(".dialog-category").textContent = `${project.category} · ${project.year}`;
  dialog.querySelector("#dialog-title").textContent = project.title;
  dialog.querySelector(".dialog-summary").textContent = project.summary;
  dialog.querySelector(".dialog-tags").innerHTML = project.tech.map((item) => `<span>${item}</span>`).join("");
  dialog.querySelector(".dialog-details").innerHTML = project.details.map((item) => `<li>${item}</li>`).join("");
  dialog.querySelector(".dialog-link").href = project.url;
}

function openProject(id) {
  const index = projects.findIndex((project) => project.id === id);
  renderProject(index < 0 ? 0 : index);
  dialog.showModal();
  document.body.classList.add("dialog-open");
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-open-project]");
  if (trigger) openProject(trigger.dataset.openProject);
});

dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
dialog.querySelector('[data-dialog-nav="previous"]').addEventListener("click", () => renderProject(activeProjectIndex - 1));
dialog.querySelector('[data-dialog-nav="next"]').addEventListener("click", () => renderProject(activeProjectIndex + 1));

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector(".form-status");
  if (!form.checkValidity()) {
    form.reportValidity();
    status.textContent = "Please complete the required fields.";
    status.className = "form-status is-error";
    return;
  }
  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const projectType = formData.get("projectType");
  const message = formData.get("message");
  const subject = encodeURIComponent(`Portfolio inquiry: ${projectType}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject type: ${projectType}\n\n${message}`);
  status.textContent = "Your email application is opening with the completed inquiry.";
  status.className = "form-status is-success";
  form.reset();
  window.location.href = `mailto:aungmyintthein9593@gmail.com?subject=${subject}&body=${body}`;
});
