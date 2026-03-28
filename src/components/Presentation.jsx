import { useState, useEffect, useCallback } from 'react'
import './Presentation.css'

const slides = [
  // SLIDE 1 — COVER
  {
    id: 1,
    section: 'cover',
    title: 'SOLO × AITD',
    subtitle: 'AI Build Workshop',
    tagline: 'Learn. Build. Ship with AI.',
    type: 'cover',
  },
  // SLIDE 2 — ABOUT SOLO
  {
    id: 2,
    section: 'solo',
    title: 'What is SOLO?',
    type: 'content',
    icon: '🚀',
    body: 'SOLO is a platform designed to help students move beyond just learning and actually start building real, practical projects. It acts as both a learning ecosystem and a verification layer, where students can gain hands-on experience and receive credentials that represent actual work done.',
    highlight: 'Instead of traditional resumes that only list skills, SOLO focuses on proof of execution — helping students showcase what they have built.',
  },
  // SLIDE 3 — SOLO ROADMAP
  {
    id: 3,
    section: 'solo',
    title: 'Your Journey with SOLO',
    type: 'roadmap',
    icon: '🗺️',
    steps: [
      { num: '01', label: 'Create Profile', desc: 'Set up your SOLO presence' },
      { num: '02', label: 'Explore Learning Paths', desc: 'Find your direction' },
      { num: '03', label: 'Build Projects', desc: 'Turn learning into output' },
      { num: '04', label: 'Earn Credentials', desc: 'Get verified for real work' },
      { num: '05', label: 'Showcase Work', desc: 'Share your proof of execution' },
    ],
    body: 'This roadmap ensures that students are not stuck in passive learning. Every step is designed to push them toward real output and visible progress.',
  },
  // SLIDE 4 — QR CODE ONBOARDING
  {
    id: 4,
    section: 'solo',
    title: 'Get Started on SOLO',
    type: 'qr',
    icon: '📱',
    bullets: [
      'Create your SOLO account',
      'Complete your profile',
      'Access the workshop course',
    ],
    instruction: 'Make sure you complete signup before we proceed.',
  },
  // SLIDE 5 — LIVE DEMO TRANSITION
  {
    id: 5,
    section: 'solo',
    title: "Let's Get You Set Up",
    type: 'demo',
    icon: '🎬',
    bullets: [
      'Creating your account',
      'Enrolling in the AI Workshop',
      'Setting up your profile',
    ],
    note: 'Live demo time — follow along!',
  },
  // SLIDE 6 — FRONTEND PATHWAY
  {
    id: 6,
    section: 'pathways',
    title: 'Frontend Development Path',
    type: 'pathway',
    icon: '🎨',
    color: 'cyan',
    body: 'Frontend development focuses on what users see and interact with. This includes building interfaces, layouts, and experiences using modern tools and frameworks.',
    bullets: [
      'UI building & layouts',
      'Responsive design',
      'Component-based development',
    ],
  },
  // SLIDE 7 — BACKEND PATHWAY
  {
    id: 7,
    section: 'pathways',
    title: 'Backend Development Path',
    type: 'pathway',
    icon: '⚙️',
    color: 'violet',
    body: 'Backend development handles the logic, databases, and systems behind applications. It ensures that everything works smoothly behind the scenes.',
    bullets: [
      'APIs & endpoints',
      'Databases & storage',
      'Server-side logic',
    ],
  },
  // SLIDE 8 — WHY THESE PATHS MATTER
  {
    id: 8,
    section: 'pathways',
    title: 'Why Follow a Structured Path?',
    type: 'content',
    icon: '🧭',
    body: 'Without a roadmap, students often jump between tools and tutorials without direction. These pathways provide a clear, step-by-step progression, ensuring that learning leads to real building capability.',
    highlight: 'Structure turns scattered learning into a powerful skill stack.',
  },
  // SLIDE 9 — INTRO TO PROMPTING
  {
    id: 9,
    section: 'prompting',
    title: 'What is Prompting?',
    type: 'content',
    icon: '🧠',
    body: 'Prompting is the ability to communicate effectively with AI tools. The quality of your output depends directly on how clearly you instruct the AI.',
    highlight: 'Better prompts → better results. Every time.',
  },
  // SLIDE 10 — ROLE
  {
    id: 10,
    section: 'prompting',
    title: 'Role',
    type: 'prompt-element',
    icon: '👤',
    tag: 'PROMPT ELEMENT 1',
    color: 'blue',
    body: 'Define who the AI is. This sets context and dramatically improves output quality.',
    example: '"You are a senior frontend developer."',
  },
  // SLIDE 11 — CONTEXT
  {
    id: 11,
    section: 'prompting',
    title: 'Context',
    type: 'prompt-element',
    icon: '📋',
    tag: 'PROMPT ELEMENT 2',
    color: 'violet',
    body: 'Provide background information about the problem, project, or environment. The more context you give, the more accurate the response.',
    example: '"I am building a SaaS dashboard for students."',
  },
  // SLIDE 12 — OBJECTIVE
  {
    id: 12,
    section: 'prompting',
    title: 'Objective',
    type: 'prompt-element',
    icon: '🎯',
    tag: 'PROMPT ELEMENT 3',
    color: 'cyan',
    body: 'Clearly state what you want the AI to do. Be specific about the expected output.',
    example: '"Build a responsive landing page."',
  },
  // SLIDE 13 — DATA MODEL
  {
    id: 13,
    section: 'prompting',
    title: 'Data / Constraints',
    type: 'prompt-element',
    icon: '📐',
    tag: 'PROMPT ELEMENT 4',
    color: 'neon',
    body: 'Define structure, format, or limitations. Constraints help the AI produce exactly what you need.',
    bullets: [
      'Use React',
      'Mobile-first design',
      'Clean, minimal UI',
    ],
  },
  // SLIDE 14–18 — GOOGLE STITCH
  {
    id: 14,
    section: 'tools',
    tool: 'Google Stitch',
    title: 'What is Google Stitch?',
    type: 'tool-intro',
    icon: '🧵',
    color: 'blue',
    body: 'Google Stitch is an AI-powered tool that helps developers build polished UI components and full interfaces quickly using natural language prompts.',
    tag: 'GOOGLE STITCH',
  },
  {
    id: 15,
    section: 'tools',
    tool: 'Google Stitch',
    title: 'Build UI Instantly',
    type: 'tool-detail',
    icon: '⚡',
    color: 'blue',
    tag: 'GOOGLE STITCH',
    body: 'Stitch translates your design ideas into working code. Describe what you want and watch it generate responsive, clean UI components in seconds.',
  },
  {
    id: 16,
    section: 'tools',
    tool: 'Google Stitch',
    title: 'Use Cases',
    type: 'tool-detail',
    icon: '💡',
    color: 'blue',
    tag: 'GOOGLE STITCH',
    bullets: [
      'Rapid prototyping',
      'Landing page generation',
      'Component design from scratch',
      'Figma-to-code conversion',
    ],
  },
  {
    id: 17,
    section: 'tools',
    tool: 'Google Stitch',
    title: 'Stitch Workflow',
    type: 'tool-flow',
    icon: '🔄',
    color: 'blue',
    tag: 'GOOGLE STITCH',
    steps: [
      { label: 'Describe', desc: 'Write your UI idea in plain English' },
      { label: 'Generate', desc: 'Stitch creates the component' },
      { label: 'Refine', desc: 'Iterate with follow-up prompts' },
      { label: 'Export', desc: 'Copy the clean code' },
    ],
  },
  {
    id: 18,
    section: 'tools',
    tool: 'Google Stitch',
    title: 'Why Stitch?',
    type: 'tool-detail',
    icon: '🏆',
    color: 'blue',
    tag: 'GOOGLE STITCH',
    body: 'Stitch removes the gap between design and code. Instead of spending hours on layouts, you focus on logic and features.',
    highlight: 'From idea to interface in minutes.',
  },
  // SLIDE 19–23 — GOOGLE AI STUDIO
  {
    id: 19,
    section: 'tools',
    tool: 'Google AI Studio',
    title: 'What is Google AI Studio?',
    type: 'tool-intro',
    icon: '🔬',
    color: 'violet',
    tag: 'GOOGLE AI STUDIO',
    body: 'Google AI Studio is a browser-based IDE for working with Gemini models. It lets you experiment with prompts, test AI responses, and build prototypes quickly.',
  },
  {
    id: 20,
    section: 'tools',
    tool: 'Google AI Studio',
    title: 'How to Use It',
    type: 'tool-detail',
    icon: '🛠️',
    color: 'violet',
    tag: 'GOOGLE AI STUDIO',
    bullets: [
      'Go to aistudio.google.com',
      'Choose a Gemini model',
      'Write your prompt in the editor',
      'Test and iterate in real time',
    ],
  },
  {
    id: 21,
    section: 'tools',
    tool: 'Google AI Studio',
    title: 'Prompt Experimentation',
    type: 'tool-detail',
    icon: '🧪',
    color: 'violet',
    tag: 'GOOGLE AI STUDIO',
    body: 'AI Studio gives you a sandbox to try different prompts, compare outputs, and find what works best — before writing a single line of application code.',
  },
  {
    id: 22,
    section: 'tools',
    tool: 'Google AI Studio',
    title: 'Model Usage',
    type: 'tool-detail',
    icon: '🤖',
    color: 'violet',
    tag: 'GOOGLE AI STUDIO',
    bullets: [
      'Gemini 1.5 Flash — fast, lightweight',
      'Gemini 1.5 Pro — powerful reasoning',
      'Gemini 2.0 — multimodal capabilities',
      'Custom system instructions',
    ],
  },
  {
    id: 23,
    section: 'tools',
    tool: 'Google AI Studio',
    title: 'Real-World Applications',
    type: 'tool-detail',
    icon: '🌍',
    color: 'violet',
    tag: 'GOOGLE AI STUDIO',
    bullets: [
      'Build AI-powered chatbots',
      'Automate content generation',
      'Summarize and analyze documents',
      'Generate and explain code',
    ],
  },
  // SLIDE 24–28 — ANTIGRAVITY
  {
    id: 24,
    section: 'tools',
    tool: 'Antigravity',
    title: 'What is Antigravity?',
    type: 'tool-intro',
    icon: '🛸',
    color: 'cyan',
    tag: 'ANTIGRAVITY',
    body: 'Antigravity is a no-code / low-code AI automation platform that lets you build powerful workflows, integrations, and applications without heavy engineering overhead.',
  },
  {
    id: 25,
    section: 'tools',
    tool: 'Antigravity',
    title: 'Key Features',
    type: 'tool-detail',
    icon: '✨',
    color: 'cyan',
    tag: 'ANTIGRAVITY',
    bullets: [
      'Visual workflow builder',
      'AI task automation',
      'API integrations out of the box',
      'Real-time event triggers',
    ],
  },
  {
    id: 26,
    section: 'tools',
    tool: 'Antigravity',
    title: 'Automation Capabilities',
    type: 'tool-detail',
    icon: '⚙️',
    color: 'cyan',
    tag: 'ANTIGRAVITY',
    body: 'Antigravity can automate repetitive tasks, connect services, and orchestrate multi-step AI pipelines — giving you the power of a full engineering team without the overhead.',
  },
  {
    id: 27,
    section: 'tools',
    tool: 'Antigravity',
    title: 'Use Cases',
    type: 'tool-detail',
    icon: '🎯',
    color: 'cyan',
    tag: 'ANTIGRAVITY',
    bullets: [
      'Automated data pipelines',
      'AI-powered form processing',
      'Notification and alert systems',
      'Content generation workflows',
    ],
  },
  {
    id: 28,
    section: 'tools',
    tool: 'Antigravity',
    title: "Why It's Powerful",
    type: 'tool-detail',
    icon: '💥',
    color: 'cyan',
    tag: 'ANTIGRAVITY',
    body: 'Antigravity lowers the barrier to building. You can ship production-ready automations in hours instead of weeks.',
    highlight: 'Build more. Code less.',
  },
  // SLIDE 29–33 — GEMINI CLI
  {
    id: 29,
    section: 'tools',
    tool: 'Gemini CLI',
    title: 'What is Gemini CLI?',
    type: 'tool-intro',
    icon: '💻',
    color: 'neon',
    tag: 'GEMINI CLI',
    body: "Gemini CLI brings the power of Google's Gemini AI directly into your terminal. Interact with AI models without leaving your development environment.",
  },
  {
    id: 30,
    section: 'tools',
    tool: 'Gemini CLI',
    title: 'How Developers Use It',
    type: 'tool-detail',
    icon: '👨‍💻',
    color: 'neon',
    tag: 'GEMINI CLI',
    bullets: [
      'Generate code from the terminal',
      'Explain and debug existing code',
      'Run AI queries in CI/CD pipelines',
      'Automate dev tasks with AI commands',
    ],
  },
  {
    id: 31,
    section: 'tools',
    tool: 'Gemini CLI',
    title: 'Workflow Integration',
    type: 'tool-detail',
    icon: '🔗',
    color: 'neon',
    tag: 'GEMINI CLI',
    body: 'Gemini CLI fits naturally into existing developer workflows. Chain it with git, npm, and your build tools to create AI-enhanced pipelines.',
    example: '$ gemini "explain this git diff"',
  },
  {
    id: 32,
    section: 'tools',
    tool: 'Gemini CLI',
    title: 'Speed Advantages',
    type: 'tool-detail',
    icon: '🏎️',
    color: 'neon',
    tag: 'GEMINI CLI',
    bullets: [
      'No browser switching required',
      'Scriptable and automatable',
      'Instant responses in-context',
      'Integrates with any shell',
    ],
  },
  {
    id: 33,
    section: 'tools',
    tool: 'Gemini CLI',
    title: 'Real-World Dev Usage',
    type: 'tool-detail',
    icon: '🌐',
    color: 'neon',
    tag: 'GEMINI CLI',
    bullets: [
      'Write unit tests automatically',
      'Generate documentation from code',
      'Refactor legacy code with AI guidance',
      'Query APIs and parse responses inline',
    ],
  },
  // SLIDE 34 — BUILD MODE
  {
    id: 34,
    section: 'final',
    title: "Now It's Your Turn",
    type: 'final',
    icon: '🔥',
    items: ['Tools', 'Framework', 'Workflow'],
    cta: "Let's build something real.",
  },
]

const sectionColors = {
  cover: 'cover',
  solo: 'solo',
  pathways: 'pathways',
  prompting: 'prompting',
  tools: 'tools',
  final: 'final',
}

function SlideContent({ slide }) {
  switch (slide.type) {
    case 'cover':
      return (
        <div className="slide-cover">
          <div className="cover-grid" aria-hidden="true">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="grid-cell" />
            ))}
          </div>
          <div className="cover-glow" aria-hidden="true" />
          <div className="cover-content">
            <div className="cover-badge">AITD × SOLO WORKSHOP</div>
            <h1 className="cover-title">{slide.title}</h1>
            <h2 className="cover-subtitle">{slide.subtitle}</h2>
            <p className="cover-tagline">{slide.tagline}</p>
          </div>
        </div>
      )

    case 'roadmap':
      return (
        <div className="slide-body">
          <div className="slide-icon">{slide.icon}</div>
          <h2 className="slide-title">{slide.title}</h2>
          <div className="roadmap-flow">
            {slide.steps.map((step, i) => (
              <div key={i} className="roadmap-item">
                <div className="roadmap-num">{step.num}</div>
                <div className="roadmap-info">
                  <strong>{step.label}</strong>
                  <span>{step.desc}</span>
                </div>
                {i < slide.steps.length - 1 && (
                  <div className="roadmap-arrow">→</div>
                )}
              </div>
            ))}
          </div>
          {slide.body && <p className="slide-body-text">{slide.body}</p>}
        </div>
      )

    case 'qr':
      return (
        <div className="slide-body">
          <div className="slide-icon">{slide.icon}</div>
          <h2 className="slide-title">{slide.title}</h2>
          <div className="qr-layout">
            <div className="qr-placeholder">
              <div className="qr-inner">
                <div className="qr-corner tl" />
                <div className="qr-corner tr" />
                <div className="qr-corner bl" />
                <div className="qr-corner br" />
                <span className="qr-label">QR CODE</span>
              </div>
            </div>
            <div className="qr-info">
              <ul className="slide-bullets">
                {slide.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className="slide-instruction">{slide.instruction}</div>
            </div>
          </div>
        </div>
      )

    case 'demo':
      return (
        <div className="slide-body">
          <div className="slide-icon">{slide.icon}</div>
          <h2 className="slide-title">{slide.title}</h2>
          <ul className="slide-bullets large">
            {slide.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          {slide.note && <div className="demo-note">{slide.note}</div>}
        </div>
      )

    case 'pathway':
      return (
        <div className={`slide-body pathway-${slide.color}`}>
          <div className="slide-icon">{slide.icon}</div>
          <h2 className="slide-title">{slide.title}</h2>
          {slide.body && <p className="slide-body-text">{slide.body}</p>}
          <ul className="slide-bullets">
            {slide.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      )

    case 'prompt-element':
      return (
        <div className={`slide-body prompt-el-${slide.color}`}>
          <div className="prompt-tag">{slide.tag}</div>
          <div className="slide-icon">{slide.icon}</div>
          <h2 className="slide-title">{slide.title}</h2>
          <p className="slide-body-text">{slide.body}</p>
          {slide.example && (
            <div className="slide-example">
              <code>{slide.example}</code>
            </div>
          )}
          {slide.bullets && (
            <ul className="slide-bullets">
              {slide.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      )

    case 'tool-intro':
    case 'tool-detail':
    case 'tool-flow':
      return (
        <div className={`slide-body tool-${slide.color}`}>
          <div className="tool-tag">{slide.tag}</div>
          <div className="slide-icon">{slide.icon}</div>
          <h2 className="slide-title">{slide.title}</h2>
          {slide.body && <p className="slide-body-text">{slide.body}</p>}
          {slide.highlight && (
            <div className="slide-highlight">{slide.highlight}</div>
          )}
          {slide.bullets && (
            <ul className="slide-bullets">
              {slide.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
          {slide.example && (
            <div className="slide-example">
              <code>{slide.example}</code>
            </div>
          )}
          {slide.steps && (
            <div className="tool-flow-steps">
              {slide.steps.map((step, i) => (
                <div key={i} className="tool-flow-item">
                  <strong>{step.label}</strong>
                  <span>{step.desc}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )

    case 'final':
      return (
        <div className="slide-final">
          <div className="final-glow" aria-hidden="true" />
          <div className="slide-icon final-icon">{slide.icon}</div>
          <h2 className="slide-title final-title">{slide.title}</h2>
          <p className="final-have">You now have:</p>
          <div className="final-items">
            {slide.items.map((item, i) => (
              <div key={i} className="final-item">
                <span className="final-check">✓</span>
                {item}
              </div>
            ))}
          </div>
          <div className="final-cta">👉 {slide.cta}</div>
        </div>
      )

    default:
      return (
        <div className="slide-body">
          <div className="slide-icon">{slide.icon}</div>
          <h2 className="slide-title">{slide.title}</h2>
          {slide.body && <p className="slide-body-text">{slide.body}</p>}
          {slide.highlight && (
            <div className="slide-highlight">{slide.highlight}</div>
          )}
          {slide.bullets && (
            <ul className="slide-bullets">
              {slide.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      )
  }
}

export default function Presentation() {
  const [current, setCurrent] = useState(0)
  const total = slides.length

  const prev = useCallback(() => {
    setCurrent((c) => (c > 0 ? c - 1 : c))
  }, [])

  const next = useCallback(() => {
    setCurrent((c) => (c < total - 1 ? c + 1 : c))
  }, [total])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev])

  const slide = slides[current]
  const sectionClass = sectionColors[slide.section] || 'default'

  return (
    <div className="presentation">
      {/* Header nav */}
      <header className="ppt-header">
        <div className="ppt-logo">SOLO × AITD</div>
        <nav className="ppt-section-nav" aria-label="Slide sections">
          {['cover', 'solo', 'pathways', 'prompting', 'tools', 'final'].map((sec) => (
            <button
              key={sec}
              className={`section-btn ${slide.section === sec ? 'active' : ''}`}
              onClick={() => {
                const idx = slides.findIndex((s) => s.section === sec)
                if (idx !== -1) setCurrent(idx)
              }}
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </button>
          ))}
        </nav>
        <div className="ppt-counter">
          {current + 1} / {total}
        </div>
      </header>

      {/* Main slide area */}
      <main className={`slide-area section-${sectionClass}`} aria-live="polite">
        <SlideContent slide={slide} />
      </main>

      {/* Controls */}
      <footer className="ppt-footer">
        <button
          className="nav-btn"
          onClick={prev}
          disabled={current === 0}
          aria-label="Previous slide"
        >
          ← Prev
        </button>

        {/* Dot indicators */}
        <div className="ppt-dots" role="tablist" aria-label="Slide indicators">
          {slides.map((s, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}`}
              className={`dot ${i === current ? 'active' : ''} section-dot-${s.section}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>

        <button
          className="nav-btn"
          onClick={next}
          disabled={current === total - 1}
          aria-label="Next slide"
        >
          Next →
        </button>
      </footer>
    </div>
  )
}
