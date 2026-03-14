import React, { useEffect, useMemo, useState } from 'react'
import './index.css'

type SkillItem = {
  name: string
  level: string
  useCase: string
}

type SkillCategory = {
  id: string
  label: string
  items: SkillItem[]
}

type Metric = {
  label: string
  before: string
  after: string
}

type CaseStudy = {
  id: string
  title: string
  context: string
  role: string
  stack: string[]
  metrics: Metric[]
  problem: string
  approach: string
  solution: string
  impact: string
}

type Project = {
  id: string
  title: string
  tagline: string
  tags: string[]
  tech: string[]
  links: {
    github?: string
    demo?: string
  }
}

type JourneyItem = {
  id: string
  period: string
  title: string
  org: string
  summary: string
  outcomes: string[]
}

type Insight = {
  id: string
  title: string
  type: string
  summary: string
  link?: string
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'data-eng',
    label: 'Data Platforms',
    items: [
      {
        name: 'Data Lakes & Lakehouses',
        level: 'Advanced',
        useCase: 'Designing lakehouse-style platforms on Azure/AWS with governance and performance in mind.'
      },
      {
        name: 'Batch & Streaming Pipelines',
        level: 'Advanced',
        useCase: 'Building robust pipelines for ingestion, transformation, and enrichment across batch and near real-time.'
      },
      {
        name: 'Analytics Warehousing',
        level: 'Advanced',
        useCase: 'Dimensional models and ELT patterns that keep analysts productive and dashboards fast.'
      }
    ]
  },
  {
    id: 'ml-ai',
    label: 'ML & GenAI',
    items: [
      {
        name: 'Applied ML Engineering',
        level: 'Advanced',
        useCase: 'From experimentation to production-ready models with monitoring and feedback loops.'
      },
      {
        name: 'GenAI Assistants',
        level: 'Intermediate',
        useCase: 'RAG-style assistants over your knowledge base for support, ops, and analytics teams.'
      },
      {
        name: 'MLOps Foundations',
        level: 'Intermediate',
        useCase: 'Versioning, CI/CD for ML, and lightweight feature stores so models don’t get stuck in notebooks.'
      }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics & BI',
    items: [
      {
        name: 'Decision Dashboards',
        level: 'Advanced',
        useCase: 'Designing Power BI-style experiences that surface the right KPIs to the right roles.'
      },
      {
        name: 'Experimentation & KPIs',
        level: 'Intermediate',
        useCase: 'Defining KPIs, running tests, and closing the loop between data and product decisions.'
      }
    ]
  },
  {
    id: 'consulting',
    label: 'Advisory & Delivery',
    items: [
      {
        name: 'Data & AI Roadmapping',
        level: 'Advanced',
        useCase: 'Aligning stakeholders on why, what, and how before we touch a line of code.'
      },
      {
        name: 'Discovery Workshops',
        level: 'Advanced',
        useCase: 'Structuring sessions that turn ideas and pain points into scoped initiatives.'
      },
      {
        name: 'Change & Enablement',
        level: 'Advanced',
        useCase: 'Equipping teams to own, extend, and trust what we build together.'
      }
    ]
  }
]

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'retail-demand-forecasting',
    title: 'Retail Demand Forecasting Platform',
    context:
      'Global retailer struggling with stockouts and overstock across hundreds of stores and DCs.',
    role: 'Data & AI Consultant',
    stack: ['Azure', 'Databricks', 'Delta Lake', 'MLflow', 'Power BI'],
    metrics: [
      { label: 'Forecast error', before: '18%', after: '7%' },
      { label: 'Working capital tied in stock', before: '100%', after: '85%' },
      { label: 'Planning cycle time', before: '5 days', after: '1 day' }
    ],
    problem:
      'Manual spreadsheets and siloed data sources made demand planning reactive, inconsistent, and hard to scale.',
    approach:
      'Ran discovery with planners and finance, designed a lakehouse architecture, and built automated pipelines feeding ML forecasts into planning workflows.',
    solution:
      'Production-grade pipelines powering daily forecasts by segment and region, consumed through curated Power BI dashboards.',
    impact:
      'Reduced stockouts, freed working capital, and gave planners a single, trusted view for demand decisions.'
  },
  {
    id: 'subscription-churn',
    title: 'Subscription Churn Early-Warning System',
    context: 'B2B SaaS provider wanted to move from reactive churn analysis to proactive retention.',
    role: 'Data & AI Consultant',
    stack: ['AWS', 'Python', 'scikit-learn', 'Airflow', 'Looker'],
    metrics: [
      { label: 'Churn in target segment', before: '11%', after: '7%' },
      { label: 'Time-to-signal', before: 'Monthly', after: 'Daily' }
    ],
    problem:
      'Customer success teams had limited visibility into at-risk accounts until after cancellations occurred.',
    approach:
      'Partnered with CS and sales to define risk signals, engineered features from product usage, and built a churn model integrated into their CRM.',
    solution:
      'Daily-updated risk scores with explainable drivers surfaced directly in CS workflows, backed by Looker dashboards.',
    impact:
      'Enabled targeted outreach, better renewal forecasting, and a measurable uplift in retention for the pilot segment.'
  },
  {
    id: 'manufacturing-quality',
    title: 'Manufacturing Quality Anomaly Detection',
    context:
      'Industrial client facing costly defects and rework across several production lines with complex sensor data.',
    role: 'Data & AI Engineer',
    stack: ['Azure', 'Event Hubs', 'Spark Streaming', 'Kafka', 'Grafana'],
    metrics: [
      { label: 'Defect rate', before: 'Baseline', after: '-15%' },
      { label: 'Time to detect issues', before: 'Hours', after: 'Minutes' }
    ],
    problem:
      'Quality issues were identified too late, after large batches were produced, leading to waste and delays.',
    approach:
      'Designed streaming ingestion, feature pipelines, and unsupervised detection models tuned with process engineers.',
    solution:
      'Real-time anomaly alerts integrated into existing monitoring, paired with simple runbooks for the floor.',
    impact:
      'Reduced unplanned downtime and scrap while giving engineers a deeper view into line health.'
  }
]

const PROJECT_TAGS = ['All', 'Data Platforms', 'ML & GenAI', 'Analytics', 'Advisory']

const PROJECTS: Project[] = [
  {
    id: 'data-platform-starter',
    title: 'Carbon Hue Data Platform Starter',
    tagline: 'A blueprint for modern data platforms with governance and observability baked in.',
    tags: ['Data Platforms'],
    tech: ['Azure/AWS', 'dbt', 'Orchestration'],
    links: {
      github: '#'
    }
  },
  {
    id: 'genai-rag',
    title: 'GenAI Knowledge Assistant',
    tagline: 'Retrieval-augmented assistant over internal docs for support and ops teams.',
    tags: ['ML & GenAI'],
    tech: ['Python', 'Vector DB', 'LLM API'],
    links: {
      github: '#'
    }
  },
  {
    id: 'analytics-suite',
    title: 'Executive Analytics Suite',
    tagline: 'Portfolio of decision dashboards aligned to product, revenue, and operations.',
    tags: ['Analytics'],
    tech: ['Power BI', 'SQL', 'Cloud DW'],
    links: {
      github: '#'
    }
  }
]

const JOURNEY: JourneyItem[] = [
  {
    id: 'journey-role',
    period: 'Early career',
    title: 'Data & AI Engineer in product and enterprise teams',
    org: 'Analytics & engineering teams',
    summary:
      'Built data pipelines, dashboards, and ML pilots that powered reporting and experimentation.',
    outcomes: [
      'Gained hands-on experience with production data systems and business stakeholders.',
      'Learned how fragile data flows can break trust when not designed and monitored well.'
    ]
  },
  {
    id: 'journey-consultant',
    period: 'Consultant',
    title: 'Independent Data & AI Consultant',
    org: 'Clients across retail, SaaS, and industry',
    summary:
      'Worked directly with business and technical leaders to scope, design, and deliver initiatives end-to-end.',
    outcomes: [
      'Refined a consulting-style approach: discovery, design, delivery, and enablement.',
      'Focused on use cases that balance ambition (AI) with strong data foundations.'
    ]
  },
  {
    id: 'journey-carbonhuedata',
    period: 'Now',
    title: 'Carbon Hue Data',
    org: 'Data & AI studio',
    summary:
      'Created Carbon Hue Data to bring product thinking, engineering, and advisory together under one studio.',
    outcomes: [
      'Offer structured engagements from strategy to build, sized to 6–12 week horizons.',
      'Operate as a partner that can plug into existing teams rather than a black-box vendor.'
    ]
  }
]

const INSIGHTS: Insight[] = [
  {
    id: 'insight1',
    title: 'From Dashboards to Decisions: Framing Data Work Around Outcomes',
    type: 'Perspective',
    summary:
      'How to translate loosely defined questions into projects that ship something decision-makers actually use.',
    link: 'https://sites.google.com/view/datalenses/home'
  },
  {
    id: 'insight2',
    title: 'Making ML Projects Survive Beyond the Notebook',
    type: 'Article',
    summary:
      'Patterns for taking models into production without over-engineering platforms on day one.',
    link: undefined
  },
  {
    id: 'insight3',
    title: 'GenAI in Analytics Teams: Where It Fits',
    type: 'Note',
    summary:
      'Where assistants, RAG, and summarisation meaningfully help analysts and stakeholders — and where they do not.',
    link: undefined
  }
]

const QUICK_STATS = [
  { label: 'Years working with data & AI', value: '4+' },
  { label: 'Client & internal projects shipped', value: '15+' },
  { label: 'Typical engagement length', value: '6–12 weeks' },
  { label: 'Industries', value: 'Retail · SaaS · Industrial' }
]

const scrollToId = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return
  const navOffset = 72
  const rect = el.getBoundingClientRect()
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const targetY = rect.top + scrollTop - navOffset
  window.scrollTo({ top: targetY, behavior: 'smooth' })
}

type NavbarProps = {
  onNavClick: (id: string) => void
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

const Navbar: React.FC<Omit<NavbarProps, 'theme' | 'toggleTheme'>> = ({ onNavClick }) => {
  const [open, setOpen] = useState(false)

  const links = [
    { id: 'about', label: 'About' },
    { id: 'journey', label: 'Journey' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'projects', label: 'Services & Work' },
    { id: 'skills', label: 'Capabilities' },
    { id: 'insights', label: 'Insights' },
    { id: 'contact', label: 'Contact' }
  ]

  const handleNav = (id: string) => {
    onNavClick(id)
    setOpen(false)
  }

  return (
    <header className="nav">
      <div className="nav__inner">
        <div className="nav__brand" onClick={() => handleNav('about')}>
        <img
          src="/logos/logo-carbonhue.png"
          alt="CarbonHue Data"
          className="nav__brand-logo"
        />
        </div>

        <nav className="nav__links">
          {links.map((link) => (
            <button
              key={link.id}
              className="nav__link"
              onClick={() => handleNav(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="nav__actions">
          <button
            className="nav__menu"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <div className="nav__mobile">
          {links.map((link) => (
            <button
              key={link.id}
              className="nav__mobile-link"
              onClick={() => handleNav(link.id)}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}

type SectionProps = {
  id: string
  title: string
  eyebrow?: string
  children: React.ReactNode
}

const Section: React.FC<SectionProps> = ({ id, title, eyebrow, children }) => (
  <section id={id} className="section">
    <div className="section__inner">
      <header className="section__header">
        {eyebrow && <p className="section__eyebrow">{eyebrow}</p>}
        <h2 className="section__title">{title}</h2>
      </header>
      <div className="section__content">{children}</div>
    </div>
  </section>
)

const Hero: React.FC = () => (
  <section className="hero">
    <div className="hero__overlay-grid" aria-hidden="true" />
    <div className="hero__inner">
      <div className="hero__copy">
        <p className="hero__eyebrow">Carbon Hue Data · Data &amp; AI Studio</p>
        <h1 className="hero__title">
          Turning noisy data
          <br />
          into sharp,{' '}
          <span className="hero__title-accent">decision-ready signals.</span>
        </h1>
        <p className="hero__subtitle">
          Carbon Hue Data is a small studio led by a data &amp; AI engineer-turned-consultant. We help
          teams move from scattered dashboards and experiments to platforms, analytics, and ML
          solutions that ship and stick.
        </p>
        <div className="hero__actions">
          <button
            className="btn btn--primary"
            onClick={() => scrollToId('case-studies')}
          >
            View case studies
          </button>
          <button
            className="btn btn--ghost"
            onClick={() => scrollToId('contact')}
          >
            Explore an engagement
          </button>
        </div>
        <div className="hero__stats">
          {QUICK_STATS.map((stat) => (
            <div key={stat.label} className="hero__stat">
              <div className="hero__stat-value">{stat.value}</div>
              <div className="hero__stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__panel">
        <div className="console">
          <div className="console__header">
            <span className="console__dot console__dot--red" />
            <span className="console__dot console__dot--yellow" />
            <span className="console__dot console__dot--green" />
            <span className="console__title">carbon-hue-data.ts</span>
          </div>
          <div className="console__body">
            <p className="console__line">
              <span className="console__prompt">&gt;</span>
              import <span className="console__token">Studio</span> from
              <span className="console__string">&apos;carbon-hue-data&apos;</span>
            </p>
            <p className="console__line">
              <span className="console__prompt">&gt;</span>
              new Studio().engage(
              <span className="console__string">&apos;data &amp; ai strategy&apos;</span>)
            </p>
            <p className="console__line console__line--muted">
              // data platforms, analytics, ml &amp; genai, delivered with a consulting mindset
            </p>
          </div>
        </div>
        <div className="hero__kpis">
          <div className="hero__kpi-card">
            <div className="hero__kpi-label">How we usually work</div>
            <div className="hero__kpi-value">Scoped engagements</div>
            <p className="hero__kpi-desc">
              Clear start and end, from discovery to a first version in production or high-fidelity
              pilot.
            </p>
          </div>
          <div className="hero__kpi-card">
            <div className="hero__kpi-label">Where we plug in</div>
            <div className="hero__kpi-value">Between idea &amp; delivery</div>
            <p className="hero__kpi-desc">
              Helping product, data, and business teams get from &quot;we should&quot; to &quot;this is live&quot;.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const About: React.FC = () => (
  <Section id="about" title="About Carbon Hue Data" eyebrow="A small studio with a sharp focus">
    <div className="about">
      <div className="about__primary">
        <p>
          Carbon Hue Data is run by Rahul, a data &amp; AI engineer with a consulting mindset. After
          working across product and enterprise teams, the studio was created to bring{' '}
          <span className="text-highlight">data platforms</span>,{' '}
          <span className="text-highlight">analytics</span>, and{' '}
          <span className="text-highlight">applied AI</span> together under one roof.
        </p>
        <p>
          The studio works best with teams that already feel the friction of scattered data, ad-hoc
          reporting, or ML experiments that never make it past the notebook. If you have ambitious
          ideas but need a pragmatic path to ship them, that is where Carbon Hue Data fits.
        </p>
        <p>
          Engagements are sized so you see progress quickly — usually in 6–12 weeks — while building
          foundations you can extend long after the project wraps.
        </p>
      </div>
      <div className="about__sidebar">
        <h3 className="about__sidebar-title">What the studio helps with</h3>
        <ul className="about__list">
          <li>Clarifying data &amp; AI opportunities and creating a simple roadmap.</li>
          <li>Designing and implementing data platforms on Azure or AWS.</li>
          <li>Building analytics and decision dashboards around clear KPIs.</li>
          <li>Shipping applied ML and GenAI assistants tied to your workflows.</li>
        </ul>
      </div>
    </div>
  </Section>
)

const JourneySection: React.FC = () => (
  <Section
    id="journey"
    title="Journey"
    eyebrow="From engineer, to consultant, to studio"
  >
    <div className="timeline">
      {JOURNEY.map((item) => (
        <div key={item.id} className="timeline__item">
          <div className="timeline__marker" />
          <div>
            <p className="timeline__period">{item.period}</p>
            <h3 className="timeline__title">
              {item.title} · <span className="timeline__org">{item.org}</span>
            </h3>
            <p className="timeline__summary">{item.summary}</p>
            <ul className="timeline__outcomes">
              {item.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </Section>
)

const SkillMatrix: React.FC = () => {
  const [active, setActive] = useState<string>(SKILL_CATEGORIES[0]?.id ?? '')
  const activeCategory = useMemo(
    () => SKILL_CATEGORIES.find((c) => c.id === active) ?? SKILL_CATEGORIES[0],
    [active]
  )

  return (
    <div className="skills">
      <div className="skills__tabs" id="skills">
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={
              'skills__tab' + (cat.id === activeCategory.id ? ' skills__tab--active' : '')
            }
            onClick={() => setActive(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="skills__grid" aria-live="polite">
        {activeCategory.items.map((item) => (
          <div key={item.name} className="skills__card">
            <div className="skills__card-header">
              <h3 className="skills__name">{item.name}</h3>
              <span className="skills__level">{item.level}</span>
            </div>
            <p className="skills__usecase">{item.useCase}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

type CaseStudyCardProps = {
  cs: CaseStudy
  onOpen: (cs: CaseStudy) => void
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ cs, onOpen }) => (
  <button className="case-card" onClick={() => onOpen(cs)}>
    <div className="case-card__header">
      <h3 className="case-card__title">{cs.title}</h3>
      <p className="case-card__role">{cs.role}</p>
    </div>
    <p className="case-card__context">{cs.context}</p>
    <div className="case-card__stack">
      {cs.stack.map((s) => (
        <span key={s} className="chip chip--stack">
          {s}
        </span>
      ))}
    </div>
    <div className="case-card__metrics">
      {cs.metrics.map((m) => (
        <div key={m.label} className="case-card__metric">
          <span className="case-card__metric-label">{m.label}</span>
          <span className="case-card__metric-values">
            {m.before} → <span className="case-card__metric-after">{m.after}</span>
          </span>
        </div>
      ))}
    </div>
    <div className="case-card__footer">
      <span>Read the story</span>
    </div>
  </button>
)

type CaseStudyModalProps = {
  cs: CaseStudy | null
  onClose: () => void
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ cs, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!cs) return null

  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__content">
        <button className="modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <p className="modal__eyebrow">Case study</p>
        <h3 className="modal__title">{cs.title}</h3>
        <p className="modal__role">
          {cs.role} · {cs.stack.join(' · ')}
        </p>
        <p className="modal__context">{cs.context}</p>
        <div className="modal__grid">
          <div className="modal__column">
            <h4>Problem</h4>
            <p>{cs.problem}</p>
            <h4>Approach</h4>
            <p>{cs.approach}</p>
          </div>
          <div className="modal__column">
            <h4>Solution</h4>
            <p>{cs.solution}</p>
            <h4>Impact</h4>
            <p>{cs.impact}</p>
            <div className="modal__metrics">
              {cs.metrics.map((m) => (
                <div key={m.label} className="modal__metric">
                  <span className="modal__metric-label">{m.label}</span>
                  <span className="modal__metric-values">
                    {m.before} → <span className="modal__metric-after">{m.after}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="modal__diagram">
          <div className="diagram">
            <div className="diagram__node">Sources</div>
            <div className="diagram__arrow">Pipelines</div>
            <div className="diagram__node">Models &amp; Metrics</div>
            <div className="diagram__arrow">APIs &amp; Dashboards</div>
            <div className="diagram__node">Decision Makers</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CaseStudiesSection: React.FC = () => {
  const [activeCase, setActiveCase] = useState<CaseStudy | null>(null)

  return (
    <Section
      id="case-studies"
      title="Case studies"
      eyebrow="A sample of the kinds of problems Carbon Hue Data helps with"
    >
      <div className="case-grid">
        {CASE_STUDIES.map((cs) => (
          <CaseStudyCard key={cs.id} cs={cs} onOpen={setActiveCase} />
        ))}
      </div>
      <CaseStudyModal cs={activeCase} onClose={() => setActiveCase(null)} />
    </Section>
  )
}

const ProjectsSection: React.FC = () => {
  const [activeTag, setActiveTag] = useState<string>('All')

  const visible = useMemo<Project[]>(() => {
    if (activeTag === 'All') return PROJECTS
    return PROJECTS.filter((p) => p.tags.includes(activeTag))
  }, [activeTag])

  return (
    <Section
      id="projects"
      title="Services & sample work"
      eyebrow="How Carbon Hue Data engages"
    >
      <div className="projects">
        <div className="projects__filters">
          {PROJECT_TAGS.map((tag) => (
            <button
              key={tag}
              className={
                'chip chip--filter' + (tag === activeTag ? ' chip--filter-active' : '')
              }
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="projects__grid">
          {visible.map((p) => (
            <article key={p.id} className="project-card">
              <h3 className="project-card__title">{p.title}</h3>
              <p className="project-card__tagline">{p.tagline}</p>
              <div className="project-card__tags">
                {p.tags.map((t) => (
                  <span key={t} className="chip chip--tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="project-card__tech">
                {p.tech.map((t) => (
                  <span key={t} className="badge">
                    {t}
                  </span>
                ))}
              </div>
              <div className="project-card__links">
                {p.links.github && (
                  <a
                    href={p.links.github}
                    className="link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                )}
                {p.links.demo && (
                  <a
                    href={p.links.demo}
                    className="link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}

const SkillsSection: React.FC = () => (
  <Section
    id="skills"
    title="Capabilities"
    eyebrow="What Carbon Hue Data brings to the table"
  >
    <SkillMatrix />
  </Section>
)

const InsightsSection: React.FC = () => (
  <Section
    id="insights"
    title="Insights"
    eyebrow="How the studio thinks about data & AI work"
  >
    <div className="insights">
      {INSIGHTS.map((item) => (
        <article key={item.id} className="insight-card">
          <div className="insight-card__meta">
            <span className="badge badge--soft">{item.type}</span>
          </div>
          <h3 className="insight-card__title">{item.title}</h3>
          <p className="insight-card__summary">{item.summary}</p>
          {item.link && (
            <a href={item.link} className="link" target="_blank" rel="noreferrer">
              View
            </a>
          )}
        </article>
      ))}
    </div>
  </Section>
)

const ContactSection: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const subject = encodeURIComponent('Data & AI project inquiry – Carbon Hue Data')
    const body = encodeURIComponent(
      `Hi Rahul,\n\nMy name is ${form.name}.\n\n${form.message}\n\nYou can reach me at: ${form.email}.\n`
    )
    window.location.href = `mailto:rahul.vaghasia96@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <Section
      id="contact"
      title="Let’s talk about your data & AI roadmap"
      eyebrow="Next steps"
    >
      <div className="contact">
        <form className="contact__form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field__label">Name</span>
            <input
              className="field__input"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label className="field">
            <span className="field__label">Email</span>
            <input
              className="field__input"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="field">
            <span className="field__label">What would you like to explore?</span>
            <textarea
              className="field__textarea"
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              placeholder="e.g., modernising our data platform, exploring a GenAI assistant, or productionising existing models."
              required
            />
          </label>
          <button className="btn btn--primary" type="submit">
            Draft email
          </button>
        </form>

        <div className="contact__sidebar">
          <h3 className="contact__sidebar-title">Prefer direct links?</h3>
          <ul className="contact__list">
            <li>
              <span className="contact__label">Email</span>
              <a href="mailto:rahul.vaghasia96@gmail.com" className="link">
                rahul.vaghasia96@gmail.com
              </a>
            </li>
            <li>
              <span className="contact__label">LinkedIn</span>
              <a
                href="https://www.linkedin.com/in/rahulvaghasia/"
                className="link"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/rahulvaghasia
              </a>
            </li>
            <li>
              <span className="contact__label">Upwork</span>
              <a
                href="https://www.upwork.com/freelancers/~01d7c9d1bf1bf127ff"
                className="link"
                target="_blank"
                rel="noreferrer"
              >
                Upwork profile
              </a>
            </li>
          </ul>
          <p className="contact__note">
            Ideal fits are projects where we can ship something real within the first 6–12 weeks,
            and then decide together what makes sense next.
          </p>
        </div>
      </div>
    </Section>
  )
}

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer__inner">
      <span className="footer__text">
        Carbon Hue Data · boutique data &amp; AI studio.
      </span>
      <span className="footer__text">
        Built with React &amp; Vite. Live at carbonhuedata.com.
      </span>
    </div>
  </footer>
)

const App: React.FC = () => {
  useEffect(() => {
    const body = document.body
    body.classList.remove('body--light')
  }, [])

  return (
    <div className="app">
      <Navbar onNavClick={scrollToId} />
      <main>
        <Hero />
        <About />
        <JourneySection />
        <CaseStudiesSection />
        <ProjectsSection />
        <SkillsSection />
        <InsightsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
