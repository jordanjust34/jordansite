import './App.css'

// Left Sidebar Content
interface SidebarContentProps {
  title: string
  link: string
}

const sidebarLinks = [
  {
    title: 'GitHub',
    link: 'https://github.com/jordanjust34'
  },
  {
    title: 'Test2',
    link: 'https://example.com/test2'
  },
  {
    title: 'Test3',
    link: 'https://example.com/test3'
  }
]

function SidebarContent({ title, link }: SidebarContentProps) {
  return (
    <a href={link} target="_blank" rel="noreferrer" className="sidebar-link">
      {title}
    </a>
  )
}

// Project Card
interface ProjectCardProps {
  title: string
  description: string
  techStack: string[]
  link: string
}

const projects = [
  {
    title: 'Project One',
    description: 'A web application that does amazing things.',
    techStack: ['React', 'Node.js', 'MongoDB'],
    link: 'https://github.com/jordanjust34/project-one'
  },
  {
    title: 'Project Two',
    description: 'A mobile app that solves real-world problems.',
    techStack: ['React Native', 'Firebase'],
    link: 'https://github.com/jordanjust34/project-two'
  }
];

function ProjectCard({ title, description, techStack, link }: ProjectCardProps) {
  return (
    <div className="project-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="tech-stack">
        {techStack.map((tech, index) => (
          <span key={index} className="tech-pill">{tech}</span>
        ))}
      </div>
      <a href={link} target="_blank" rel="noreferrer" className="project-link">View Project</a>
    </div>
  );
}

// Timeline


// Main
function App() {
  return (
    <div className="App">

      {/* Left Sidebar */}
      <div className="left-sidebar">
        <aside className="sidebar">
          <div className="sidebar-content">
            {sidebarLinks.map((item, index) => (
              <SidebarContent key={index} title={item.title} link={item.link} />
            ))}
          </div>
        </aside>
      </div>
    
      <div>
        <section id="about" className="section-container hero-section">
          <div className="hero-container">
            
            {/* Left Column: Text & CTAs */}
            <div className="hero-text">

              {/* Status Badge */}
              <span className="status-badge">
                <span className="dot status"></span>
                Available for Hire
              </span>

              {/* Page Heading */}
              <h1>
                Hi, I'm <span className="highlight">Jordan</span>
              </h1>

              {/* Section Heading */}
              <h2>Software Engineering Student & Full-Stack Developer</h2>
              
              {/* Bio */}
              <p className="bio">
                I build modern, performant web applications using React and Node.js. 
                Currently finishing my degree at Your University and looking for full-time 
                entry-level software development roles.
              </p>

              {/* Tech Stack Pills */}
              <div className="tech-stack">
                <span>React</span>
                <span>TypeScript</span>
                <span>Node.js</span>
                <span>Python</span>
                <span>SQL</span>
              </div>

              {/* Action Buttons */}
              <div className="cta-group">
                <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn primary">
                  View Resume
                </a>
                <a href="#projects" className="btn secondary">
                  Featured Work
                </a>
              </div>
            </div>

            {/* Right Column: Profile Picture or Interactive Visual */}
            {/* <div className="hero-visual">
              <div className="image-wrapper">
              <img 
              src={viteLogo}
              alt="Jordan" 
              className="profile-img" 
              />
              </div>
              </div> */}

          </div>
        </section>

        {/* Featured Projects */}
        <section id="projects" className="section-container projects-section">
          <div className="projects-container">

            {/* Section Heading */}
            <h2 className="section-heading featured-projects">Featured Projects</h2>

            {/* Project Cards */}
            <div className="projects-grid">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  techStack={project.techStack}
                  link={project.link}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" className="section-container timeline-section">
          <div className="timeline-container">
            <h2 className="section-heading">Timeline</h2>

          </div>
        </section>
      
      </div>
    </div>
  )
}

export default App