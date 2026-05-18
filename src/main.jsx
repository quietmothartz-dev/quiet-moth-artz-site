import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import content from './content/siteContent.json';
import './styles.css';

const hookStyles = {
  'Street anthem': [
    'They know the name, they feel the wave, {topic} got the whole block moving',
    'From the ground to the lights, {topic} keep the city in tune',
    'Say it loud when the beat drops, {topic} never came here to lose',
  ],
  'R&B': [
    '{topic} on my mind when the lights go low',
    'Soft words, real touch, {topic} got a rhythm I know',
    'I keep replaying {topic}, like a melody pulling me close',
  ],
  Motivational: [
    'Built from the pressure, {topic} shining through the climb',
    'Step by step, no fear, {topic} right on time',
    'Turn the dream into proof, let {topic} rise',
  ],
  Club: [
    'Lights up, hands high, {topic} in the room tonight',
    'Move with the bass, let {topic} take control',
    'Whole floor locked in when {topic} hits the speakers',
  ],
  'Pain / emotional': [
    'I smile through the storm, but {topic} still lives under my skin',
    'Every scar got a sound, and {topic} keeps singing again',
    'I lost a little light, but {topic} taught me how to glow',
  ],
  'Brand slogan': [
    '{topic}: built to be seen, remembered, and trusted',
    'Make it clear. Make it polished. Make it {topic}.',
    '{topic} turns the idea into a brand people believe',
  ],
  'Gospel/inspirational clean': [
    'Grace on the path, {topic} in the plan',
    'Faith in my heart, {topic} in His hands',
    'When the road gets heavy, {topic} lifts me higher',
  ],
  'Business promo': [
    '{topic} helps your brand look ready for the next level',
    'Bring the vision, build the presence, let {topic} do the work',
    'Clean design, clear message, {topic} made to promote',
  ],
};

const openings = ['Hook idea', 'Chorus starter', 'Campaign line', 'Creative spark'];
const closers = [
  'Keep it catchy, repeatable, and easy to remember.',
  'Use this as the main line, then build the verse around the feeling.',
  'Try saying it over a slow beat and then over a faster bounce.',
  'This can become a song hook, ad line, flyer headline, or brand slogan.',
];

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function makeHooks(topic, style) {
  const cleanTopic = topic.trim() || 'your idea';
  const templates = hookStyles[style] || hookStyles['Street anthem'];

  return Array.from({ length: 3 }, (_, index) => {
    const line = pick(templates).replaceAll('{topic}', cleanTopic);
    return `${pick(openings)} ${index + 1}: ${line}. ${pick(closers)}`;
  });
}

function updateMetaContent(selector, value) {
  const tag = document.querySelector(selector);
  tag?.setAttribute('content', value);
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label={`${content.site.name} home`}>
        <span className="brand-mark">{content.site.brandMark}</span>
        <span>
          {content.site.name}
          <small>{content.site.tagline}</small>
        </span>
      </a>
      <nav aria-label="Main navigation">
        {content.navigation.map(({ label, href }) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero section dark-section" id="home">
      <div className="hero-copy">
        <h1>{content.hero.headline}</h1>
        <p>{content.hero.subheadline}</p>
        <div className="button-row">
          {content.hero.buttons.map((button) => (
            <a className={`button ${button.style}`} href={button.href} key={`${button.label}-${button.href}`}>
              {button.label}
            </a>
          ))}
        </div>
      </div>
      <div className="hero-panel" aria-label={`${content.site.name} creative services`}>
        <div className="orbital">
          {content.hero.visualLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <div className="moth-signal">
          <span className="wing left-wing" />
          <span className="moth-body" />
          <span className="wing right-wing" />
        </div>
      </div>
    </section>
  );
}

function SectionIntro({ title, children, light = false }) {
  return (
    <div className={`section-intro ${light ? 'light-intro' : ''}`}>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function Services() {
  return (
    <section className="section light-section" id="services">
      <SectionIntro title={content.services.title} light>
        {content.services.intro}
      </SectionIntro>
      <div className="card-grid services-grid">
        {content.services.cards.map((service, index) => (
          <article className="service-card" key={service.title}>
            <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section className="section dark-section" id="portfolio">
      <SectionIntro title={content.portfolio.title}>{content.portfolio.intro}</SectionIntro>
      <div className="card-grid portfolio-grid">
        {content.portfolio.cards.map((item, index) => (
          <article className="portfolio-card" key={item.title}>
            <div className={item.image ? 'visual-block has-image' : 'visual-block'}>
              {item.image && <img src={item.image} alt="" />}
              <span>{item.label}</span>
              <strong>{String(index + 1).padStart(2, '0')}</strong>
            </div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="text-link">{content.portfolio.placeholderText}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HookGenerator() {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('Street anthem');
  const [hooks, setHooks] = useState(() => makeHooks(content.site.name, 'Brand slogan'));
  const [copied, setCopied] = useState(false);

  const combinedHooks = useMemo(() => hooks.join('\n\n'), [hooks]);

  function generateHook() {
    setHooks(makeHooks(topic, style));
    setCopied(false);
  }

  async function copyHook() {
    await navigator.clipboard.writeText(combinedHooks);
    setCopied(true);
  }

  return (
    <section className="section tool-section" id="hook-generator">
      <div className="tool-copy">
        <SectionIntro title={content.hookGenerator.title} light>
          {content.hookGenerator.promoCopy}
        </SectionIntro>
        <p className="tool-cta">{content.hookGenerator.ctaCopy}</p>
      </div>
      <div className="generator-card">
        <label htmlFor="hook-topic">{content.hookGenerator.inputLabel}</label>
        <input
          id="hook-topic"
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          placeholder={content.hookGenerator.inputPlaceholder}
        />
        <label htmlFor="hook-style">{content.hookGenerator.styleLabel}</label>
        <select id="hook-style" value={style} onChange={(event) => setStyle(event.target.value)}>
          {Object.keys(hookStyles).map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <div className="generator-actions">
          <button className="button primary" type="button" onClick={generateHook}>
            {content.hookGenerator.generateButton}
          </button>
          <button className="button secondary" type="button" onClick={copyHook}>
            {copied ? content.hookGenerator.copiedButton : content.hookGenerator.copyButton}
          </button>
          <button className="button ghost dark-ghost" type="button" onClick={generateHook}>
            {content.hookGenerator.againButton}
          </button>
        </div>
        <output className="hook-output" aria-live="polite">
          {hooks.map((hook) => (
            <span key={hook}>{hook}</span>
          ))}
        </output>
      </div>
    </section>
  );
}

function Packages() {
  return (
    <section className="section light-section" id="packages">
      <SectionIntro title={content.packages.title} light>
        {content.packages.intro}
      </SectionIntro>
      <div className="package-grid">
        {content.packages.cards.map((item) => (
          <article className="package-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <ul>
              {item.includes.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <strong>{item.price}</strong>
          </article>
        ))}
      </div>
      <p className="intro-note">{content.packages.note}</p>
    </section>
  );
}

function WhyWorkWithMe() {
  return (
    <section className="section split-section dark-section">
      <div>
        <SectionIntro title={content.whyWorkWithMe.title}>{content.whyWorkWithMe.paragraph}</SectionIntro>
      </div>
      <ul className="reason-list">
        {content.whyWorkWithMe.checklist.map((reason) => (
          <li key={reason}>{reason}</li>
        ))}
      </ul>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    need: content.contact.needOptions[0],
    budget: content.contact.budgetOptions[content.contact.budgetOptions.length - 1],
    timeline: content.contact.timelineOptions[content.contact.timelineOptions.length - 1],
    details: '',
  });

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function submitForm(event) {
    event.preventDefault();
    const subject = encodeURIComponent(`Project request from ${form.name || `${content.site.name} website visitor`}`);
    const body = encodeURIComponent(
      `Hello ${content.site.name},\n\nI would like to start a project.\n\nName: ${form.name}\nEmail: ${form.email}\nWhat I need: ${form.need}\nBudget range: ${form.budget}\nTimeline: ${form.timeline}\n\nProject details:\n${form.details}\n\nThank you.`
    );

    window.location.href = `mailto:${content.site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="section contact-section" id="hire-me">
      <div className="contact-copy">
        <SectionIntro title={content.contact.title} light>
          {content.contact.copy}
        </SectionIntro>
        <a className="button secondary email-button" href={`mailto:${content.site.email}`}>
          {content.contact.emailButton}
        </a>
      </div>
      <form className="contact-form" onSubmit={submitForm}>
        <label>
          Name
          <input name="name" value={form.name} onChange={updateField} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={updateField} required />
        </label>
        <label>
          What do you need?
          <select name="need" value={form.need} onChange={updateField}>
            {content.contact.needOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Budget range
          <select name="budget" value={form.budget} onChange={updateField}>
            {content.contact.budgetOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Timeline
          <select name="timeline" value={form.timeline} onChange={updateField}>
            {content.contact.timelineOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="full-field">
          Project details
          <textarea
            name="details"
            value={form.details}
            onChange={updateField}
            rows="5"
            placeholder={content.contact.detailsPlaceholder}
            required
          />
        </label>
        <button className="button primary full-field" type="submit">
          {content.contact.submitButton}
        </button>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>{content.site.name}</strong>
        <p>{content.footer.description}</p>
      </div>
      <div className="footer-links">
        <a href={`mailto:${content.site.email}`}>{content.site.email}</a>
        {content.site.socialLinks.map((link) => (
          <a href={link.url} key={link.url}>
            {link.label}
          </a>
        ))}
      </div>
      <p>{content.footer.copyright}</p>
    </footer>
  );
}

function App() {
  useEffect(() => {
    document.title = content.seo.title;
    updateMetaContent('meta[name="description"]', content.seo.description);
    updateMetaContent('meta[property="og:title"]', content.seo.title);
    updateMetaContent('meta[property="og:description"]', content.seo.description);
    updateMetaContent('meta[property="og:url"]', content.seo.url);
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <HookGenerator />
        <Packages />
        <WhyWorkWithMe />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
