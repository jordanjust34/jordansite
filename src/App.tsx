// import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <section id="about" className="hero-section">
      <div className="hero-container">
        
        {/* Left Column: Text & CTAs */}
        <div className="hero-text">
          <span className="status-badge">
            <span className="dot status"></span>
            Available for Hire
          </span>
          <h1>
            Hi, I'm <span className="highlight">Jordan</span>
          </h1>
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
    </>
  )
}

export default App