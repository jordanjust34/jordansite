import { useMemo, useState } from 'react'
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
/*
  work
  work-fs
  education
*/
type TimelineType = 'work' | 'education' | 'milestone'

interface TimelineEntry {
  id: string
  type: TimelineType
  title: string
  org: string
  /** 'YYYY-MM' */
  start: string
  /** 'YYYY-MM', omit for ongoing work/education */
  end?: string
  description?: string
}

// Edit this list with your real experience — everything below is placeholder data.
const timelineEntries: TimelineEntry[] = [
  {
    id: 'edu-degree',
    type: 'education',
    title: 'B.S. Computer Science',
    org: 'Dakota State University',
    start: '2024-01',
    description: 'Coursework in data structures, algorithms, databases, and web development.'
  },
  {
    id: 'work-freelance',
    type: 'work',
    title: 'Freelance Frontend Developer',
    org: 'Self-employed',
    start: '2023-01',
    description: 'Design and build websites for small businesses using React and TypeScript.'
  },
  {
    id: 'milestone-cpass',
    type: 'milestone',
    title: 'CPass 1.0 Released',
    org: 'Personal project',
    start: '2026-05'
  },
  // {
  //   id: 'work-internship',
  //   type: 'work',
  //   title: 'Software Engineering Intern',
  //   org: 'Northwind Labs',
  //   start: '2024-06',
  //   end: '2024-08',
  //   description: 'Built internal tooling with React and Node.js; shipped a dashboard used by 40+ engineers.'
  // },
  // {
  //   id: 'work-ta',
  //   type: 'work',
  //   title: 'Teaching Assistant, Data Structures',
  //   org: 'Your University CS Dept.',
  //   start: '2024-09',
  //   end: '2025-05',
  //   description: 'Led weekly labs and office hours for 60 students; graded projects and exams.'
  // },
  // {
  //   id: 'milestone-hackathon',
  //   type: 'milestone',
  //   title: 'Won regional hackathon',
  //   org: '36-hour build',
  //   start: '2024-11'
  // },
  // {
  //   id: 'milestone-oss',
  //   type: 'milestone',
  //   title: 'Started contributing to an open-source CLI',
  //   org: 'Open source',
  //   start: '2025-03'
  // }
]

const MS_PER_DAY = 86_400_000
const DAYS_PER_YEAR = 365.25
const PX_PER_YEAR = 140
const MIN_BLOCK_HEIGHT = 58
const BLOCK_GAP = 8

function parseMonth(value: string): Date {
  const [year, month] = value.split('-').map(Number)
  return new Date(year, (month || 1) - 1, 1)
}

function formatMonthYear(value: string): string {
  return parseMonth(value).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function formatEndLabel(item: { isCurrent: boolean; isFuture: boolean; end?: string }): string {
  if (item.isCurrent) return 'Present'
  if (item.isFuture && item.end) return `Expected ${formatMonthYear(item.end)}`
  return item.end ? formatMonthYear(item.end) : 'Present'
}

function yearsBetween(a: Date, b: Date): number {
  return (b.getTime() - a.getTime()) / MS_PER_DAY / DAYS_PER_YEAR
}

interface PositionedItem extends TimelineEntry {
  startDate: Date
  endDate: Date
  isCurrent: boolean
  isFuture: boolean
}

// Greedy interval packing: walk items in start order, drop each into the
// first lane whose previous occupant has already ended. Overlapping items
// (milestones included — a milestone's "range" is just its single date)
// end up in different lanes, sliding right of the spine.
function assignLanes(items: PositionedItem[]): number[] {
  const laneEndDates: Date[] = []
  return items.map((item) => {
    for (let lane = 0; lane < laneEndDates.length; lane++) {
      if (laneEndDates[lane].getTime() <= item.startDate.getTime()) {
        laneEndDates[lane] = item.endDate
        return lane
      }
    }
    laneEndDates.push(item.endDate)
    return laneEndDates.length - 1
  })
}

function minHeightFor(type: TimelineType): number {
  return type === 'milestone' ? 44 : MIN_BLOCK_HEIGHT
}

function Timeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const now = useMemo(() => new Date(), [])

  const { items, laneIndex, laneCount, years, axisHeight, topFor } = useMemo(() => {
    const positioned: PositionedItem[] = timelineEntries
      .map((entry) => {
        const startDate = parseMonth(entry.start)
        const endDate =
          entry.type === 'milestone' ? startDate : entry.end ? parseMonth(entry.end) : now
        return {
          ...entry,
          startDate,
          endDate,
          isCurrent: entry.type !== 'milestone' && !entry.end,
          isFuture: endDate.getTime() > now.getTime()
        }
      })
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())

    const laneIdx = assignLanes(positioned)
    const lanes = Math.max(1, ...laneIdx.map((l) => l + 1))

    const allDates = [...positioned.flatMap((item) => [item.startDate, item.endDate]), now]
    const minYear = Math.min(...allDates.map((d) => d.getFullYear()))
    const maxYear = Math.max(...allDates.map((d) => d.getFullYear()))
    const axisStart = new Date(minYear, 0, 1)
    const axisEnd = new Date(maxYear + 1, 0, 1)
    const totalHeight = yearsBetween(axisStart, axisEnd) * PX_PER_YEAR

    const top = (d: Date) => yearsBetween(axisStart, d) * PX_PER_YEAR

    const yearList: number[] = []
    for (let y = minYear; y <= maxYear + 1; y++) yearList.push(y)

    return {
      items: positioned,
      laneIndex: laneIdx,
      laneCount: lanes,
      years: yearList,
      axisHeight: totalHeight,
      topFor: top
    }
  }, [now])

  // Flip the whole axis vertically so more recent dates render near the
  // top. This is a pure mirror (newTop = axisHeight - oldTop - height), so
  // it preserves every non-overlap guarantee the lane packing already set
  // up below — set REVERSE_CHRONOLOGICAL to false to go back to oldest-first.
  const REVERSE_CHRONOLOGICAL = true
  const mirrorTop = (rawTop: number, height = 0) =>
    REVERSE_CHRONOLOGICAL ? axisHeight - rawTop - height : rawTop

  // Cap each block's visual height so it never grows into the next entry
  // sharing its lane, even after the min-height floor is applied.
  const heights = useMemo(() => {
    return items.map((item, i) => {
      const lane = laneIndex[i]
      let ceiling = axisHeight
      for (let j = i + 1; j < items.length; j++) {
        if (laneIndex[j] === lane) {
          ceiling = topFor(items[j].startDate)
          break
        }
      }
      const floor = minHeightFor(item.type)
      const natural = topFor(item.endDate) - topFor(item.startDate)
      const maxAllowed = Math.max(floor, ceiling - topFor(item.startDate) - BLOCK_GAP)
      return Math.min(Math.max(natural, floor), maxAllowed)
    })
  }, [items, laneIndex, axisHeight, topFor])

  return (
    <div className="timeline">
      <div className="timeline-legend">
        <span className="timeline-legend-item">
          <i className="timeline-dot timeline-dot--work" /> Work
        </span>
        <span className="timeline-legend-item">
          <i className="timeline-dot timeline-dot--education" /> Education
        </span>
        <span className="timeline-legend-item">
          <i className="timeline-dot timeline-dot--milestone" /> Milestone
        </span>
      </div>

      <div className="timeline-track" style={{ height: axisHeight + 24 }}>
        <div className="timeline-spine" />

        {years.map((year) => (
          <div key={year} className="timeline-year" style={{ top: mirrorTop(topFor(new Date(year, 0, 1))) }}>
            <span>{year}</span>
          </div>
        ))}

        <div className="timeline-lanes" style={{ '--lane-count': laneCount } as React.CSSProperties}>
          {items.map((item, i) => {
            const isExpanded = expandedId === item.id
            const isMilestone = item.type === 'milestone'
            return (
              <div
                key={item.id}
                className={`timeline-block timeline-block--${item.type}${isExpanded ? ' is-expanded' : ''}${item.isCurrent ? ' is-current' : ''}`}
                style={{
                  top: mirrorTop(topFor(item.startDate), heights[i]),
                  height: isExpanded ? 'auto' : heights[i],
                  minHeight: isExpanded ? heights[i] : undefined,
                  left: `calc(${laneIndex[i]} * (100% / ${laneCount}))`,
                  width: `calc(100% / ${laneCount} - 10px)`
                }}
                onMouseEnter={() => setExpandedId(item.id)}
                onMouseLeave={() => setExpandedId(null)}
                onFocus={() => setExpandedId(item.id)}
                onBlur={() => setExpandedId(null)}
                tabIndex={0}
              >
                <span className="timeline-block-date">
                  {isMilestone ? formatMonthYear(item.start) : `${formatMonthYear(item.start)} – ${formatEndLabel(item)}`}
                </span>
                <strong className="timeline-block-title">{item.title}</strong>
                <span className="timeline-block-org">{item.org}</span>
                {item.description && <p className="timeline-block-desc">{item.description}</p>}
              </div>
            )
          })}
        </div>
      </div>

      <span className="timeline-hint">Hover or focus a block for the full story · overlapping entries slide right</span>
    </div>
  )
}

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
            <Timeline />
          </div>
        </section>
      
      </div>
    </div>
  )
}

export default App
