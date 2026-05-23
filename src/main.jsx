import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import content from './content/siteContent.json';
import './styles.css';

function updateMetaContent(selector, value) {
  const tag = document.querySelector(selector);
  tag?.setAttribute('content', value);
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label={`${content.site.name} home`}>
        <span className="brand-mark">{content.site.brandMark}</span>
        <span>
          {content.site.name}
          <small>{content.site.tagline}</small>
        </span>
      </a>
      <nav aria-label="Main navigation">
        {content.navigation.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
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

function serviceLinkForTitle(title) {
  return content.servicesPage.categories.find((service) => service.title === title)?.id || title.toLowerCase().replaceAll(' ', '-');
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
            <a className="text-link" href={`/services.html#${serviceLinkForTitle(service.title)}`}>
              View service
            </a>
          </article>
        ))}
      </div>
      <p className="intro-note">
        <a className="button secondary" href="/services.html">
          View All Services
        </a>
      </p>
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

function HookLabPromo() {
  return (
    <section className="section hook-promo-section" id="hook-lab">
      <div className="hook-promo-copy">
        <span className="eyebrow">Free Creative Tool</span>
        <h2>{content.hookLabPromo.title}</h2>
        <p>{content.hookLabPromo.text}</p>
        <div className="tag-strip">
          {content.hookLabPromo.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="qr-card">
        <span className="eyebrow">{content.hookLabPromo.qrTitle}</span>
        <div className="qr-frame">
          <img src={content.hookLabPromo.qrImage} alt="QR code for the Quiet Moth Hook Lab app" />
        </div>
        <p>{content.hookLabPromo.qrText}</p>
        <p className="install-lines">
          <strong>iPhone:</strong> Safari - Share - Add to Home Screen
          <br />
          <strong>Android:</strong> Chrome - Install App or Add to Home Screen
        </p>
        <a className="text-link" href={content.hookLabPromo.url} target="_blank" rel="noopener noreferrer">
          {content.hookLabPromo.browserLink}
        </a>
      </div>
    </section>
  );
}

function ServicesPage() {
  useEffect(() => {
    document.title = content.servicesPage.seoTitle;
    updateMetaContent('meta[name="description"]', content.servicesPage.seoDescription);
    updateMetaContent('meta[property="og:title"]', content.servicesPage.seoTitle);
    updateMetaContent('meta[property="og:description"]', content.servicesPage.seoDescription);
    updateMetaContent('meta[property="og:url"]', `${content.seo.url}/services.html`);

    if (window.location.hash) {
      requestAnimationFrame(() => {
        document.querySelector(window.location.hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="section dark-section page-hero">
          <div>
            <span className="eyebrow">Creative Services</span>
            <h1>{content.servicesPage.headline}</h1>
            <p>{content.servicesPage.subtitle}</p>
            <div className="button-row">
              <a className="button primary" href="/contact.html">
                Start My Project
              </a>
              <a className="button ghost" href="/work.html">
                View Work
              </a>
            </div>
          </div>
        </section>
        <section className="section dark-section services-page-section">
          <SectionIntro title="Service Categories">{content.servicesPage.categoriesIntro}</SectionIntro>
          <div className="service-panel-grid">
            {content.servicesPage.categories.map((service, index) => (
              <article className="service-panel" id={service.id} key={service.id}>
                <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <p>
                  <strong>Best for:</strong> {service.bestFor}
                </p>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a className="button primary" href="/contact.html">
                  Start This Project
                </a>
              </article>
            ))}
          </div>
        </section>
        <section className="section light-section outcome-section">
          <SectionIntro title="Find the Right Starting Point" light>
            Not sure what service you need? Start with the result you want.
          </SectionIntro>
          <div className="outcome-grid">
            {content.servicesPage.outcomes.map((outcome) => (
              <a className="outcome-card" href={outcome.href} key={outcome.question}>
                <span>{outcome.question}</span>
                <strong>{outcome.answer}</strong>
              </a>
            ))}
          </div>
        </section>
        <section className="section dark-section">
          <SectionIntro title="Project Starting Points">Choose a focused starting lane and we can shape the details from there.</SectionIntro>
          <div className="package-grid">
            {content.servicesPage.startingPoints.map((project) => (
              <article className="package-card dark-package-card" key={project.title}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a className="text-link" href="/contact.html">
                  Start This Project
                </a>
              </article>
            ))}
          </div>
        </section>
        <section className="section split-section dark-section">
          <div>
            <SectionIntro title="How It Works">A simple process for turning the rough idea into polished creative work.</SectionIntro>
          </div>
          <div className="process-grid">
            {content.servicesPage.process.map((step, index) => (
              <article className="process-card" key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step}</h3>
              </article>
            ))}
          </div>
        </section>
        <section className="section final-cta-section">
          <div className="final-cta-card">
            <span className="eyebrow">Ready?</span>
            <h2>Ready to make your idea look official?</h2>
            <p>
              Whether you need a website, logo, flyer, apparel concept, hook, or creative direction, Quiet Moth Artz can help shape it into something polished and ready to share.
            </p>
            <a className="button primary" href="/contact.html">Start My Project</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function BlogPage() {
  useEffect(() => {
    document.title = content.blog.seoTitle;
    updateMetaContent('meta[name="description"]', content.blog.seoDescription);
    updateMetaContent('meta[property="og:title"]', content.blog.seoTitle);
    updateMetaContent('meta[property="og:description"]', content.blog.seoDescription);
    updateMetaContent('meta[property="og:url"]', `${content.seo.url}/blog.html`);
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="section dark-section page-hero blog-page-hero">
          <div>
            <span className="eyebrow">Creative Notes</span>
            <h1>{content.blog.headline}</h1>
            <p>{content.blog.subtitle}</p>
            <div className="button-row">
              <a className="button primary" href="/contact.html">
                Start My Project
              </a>
              <a className="button ghost" href="/services.html">
                View Services
              </a>
            </div>
          </div>
        </section>

        <section className="section dark-section featured-note-section">
          <article className="featured-note-card">
            <div>
              <span className="eyebrow">Featured Note</span>
              <h2>{content.blog.featured.title}</h2>
              <p>{content.blog.featured.text}</p>
            </div>
            <a className="button primary" href={content.blog.featured.href} target="_blank" rel="noopener noreferrer">
              {content.blog.featured.cta}
            </a>
          </article>
        </section>

        <section className="section dark-section blog-list-section">
          <div className="blog-category-strip" aria-label="Blog categories">
            {content.blog.categories.map((category) => (
              <span key={category}>{category}</span>
            ))}
          </div>
          <div className="blog-card-grid">
            {content.blog.cards.map((post) => (
              <article className="note-card" key={post.title}>
                <span className="blog-category-label">{post.category}</span>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <div className="note-card-footer">
                  <span>{post.readTime}</span>
                  <span className="coming-soon-link">Read Note - Coming Soon</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section final-cta-section">
          <div className="final-cta-card">
            <span className="eyebrow">Next Project</span>
            <h2>Need help shaping your next creative project?</h2>
            <p>
              Whether you need a website, flyer, logo, hook, or brand direction, Quiet Moth Artz can help turn the idea into something polished and ready to share.
            </p>
            <a className="button primary" href="/contact.html">
              Start My Project
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
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
            <a className="text-link" href="/contact.html">{item.price}</a>
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

function AboutPage() {
  useEffect(() => {
    document.title = content.about.seoTitle;
    updateMetaContent('meta[name="description"]', content.about.seoDescription);
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="section dark-section page-hero">
          <div>
            <span className="eyebrow">About</span>
            <h1>{content.about.headline}</h1>
            <p>{content.about.copy}</p>
          </div>
        </section>
        <WhyWorkWithMe />
        <HookLabPromo />
      </main>
      <Footer />
    </>
  );
}

function WorkPage() {
  useEffect(() => {
    document.title = "Work | Quiet Moth Artz";
    updateMetaContent('meta[name="description"]', "Selected Quiet Moth Artz work and portfolio preview.");
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="section dark-section page-hero">
          <div>
            <span className="eyebrow">Selected Work</span>
            <h1>Visuals, websites, hooks, and brand direction.</h1>
            <p>{content.portfolio.intro}</p>
          </div>
        </section>
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

function ContactPage() {
  useEffect(() => {
    document.title = "Start a Project | Quiet Moth Artz";
    updateMetaContent('meta[name="description"]', "Start a Quiet Moth Artz project for websites, visuals, hooks, brand direction, and creative consulting.");
  }, []);

  return (
    <>
      <Header />
      <main>
        <Contact />
      </main>
      <Footer />
    </>
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
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    document.title = content.seo.title;
    updateMetaContent('meta[name="description"]', content.seo.description);
    updateMetaContent('meta[property="og:title"]', content.seo.title);
    updateMetaContent('meta[property="og:description"]', content.seo.description);
    updateMetaContent('meta[property="og:url"]', content.seo.url);

    function handlePopState() {
      setPath(window.location.pathname);
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (path === '/services.html' || path === '/services') {
    return <ServicesPage />;
  }

  if (path === '/about.html' || path === '/about') {
    return <AboutPage />;
  }

  if (path === '/work.html' || path === '/work') {
    return <WorkPage />;
  }

  if (path === '/blog.html' || path === '/blog') {
    return <BlogPage />;
  }

  if (path === '/contact.html' || path === '/contact') {
    return <ContactPage />;
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <HookLabPromo />
        <Packages />
        <WhyWorkWithMe />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
