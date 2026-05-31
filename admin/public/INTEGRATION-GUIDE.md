# 🔗 BrandForge Dashboard ↔ Website Integration Guide

## How It Works

1. Edit content in this Admin Dashboard
2. Click **Export** → **Download JSON**
3. Place the downloaded file in your Next.js project
4. Your website reads from that file
5. Deploy → Changes are live!

---

## Step-by-Step Setup

### Step 1: Export Content from Dashboard
1. Open the Admin Dashboard
2. Go to **Export / Import** (sidebar bottom)
3. Click **Download JSON**
4. You'll get a file like `brandforge-content-2025-01-15.json`

### Step 2: Add the file to your Next.js project
1. Rename it to `siteContent.json`
2. Place it at: `your-nextjs-project/src/data/siteContent.json`

### Step 3: Create a content reader in your Next.js project
Create this file: `src/data/content.ts`

```typescript
import contentData from './siteContent.json';

export type SiteContent = typeof contentData;
export const content = contentData;
```

### Step 4: Update your components to use it
Instead of hardcoded text, import and use the content:

```typescript
// In any component:
import { content } from '@/data/content';

// Then use:
content.hero.titleLine1    // "We Build"
content.hero.titleLine2    // "Brands That"
content.services.items     // Array of services
content.contact.info       // Contact details
// etc.
```

### Step 5: Deploy
Push changes to your repo → Vercel/hosting rebuilds → Live!

---

## Detailed Component Examples

### Hero.tsx
```tsx
import { content } from '@/data/content';

export default function Hero() {
  const { hero } = content;
  
  return (
    <section>
      <h1>{hero.titleLine1}</h1>
      <h1>{hero.titleLine2}</h1>
      <h1>{hero.titleLine3}</h1>
      <p>{hero.subtitle}</p>
      <a href="#contact">{hero.ctaPrimary}</a>
      <a href="#services">{hero.ctaSecondary}</a>
      
      <video src={hero.videoUrl} autoPlay loop muted playsInline />
      <img src={hero.backgroundImage} alt="" />
      
      {hero.stats.map(stat => (
        <div key={stat.label}>
          <span>{stat.value}{stat.suffix}</span>
          <span>{stat.label}</span>
        </div>
      ))}
    </section>
  );
}
```

### Services.tsx
```tsx
import { content } from '@/data/content';

export default function Services() {
  const { services } = content;
  
  return (
    <section>
      <span>{services.badge}</span>
      <h2>{services.title} <span>{services.titleHighlight}</span></h2>
      <p>{services.subtitle}</p>
      
      {services.items.map(service => (
        <div key={service.id} className={`bg-gradient-to-br ${service.color}`}>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </section>
  );
}
```

---

## Quick Reference: All Available Content Paths

```
content.siteName
content.siteDescription
content.navLinks[]                    → { name, href }
content.hero.titleLine1/2/3
content.hero.subtitle
content.hero.ctaPrimary / ctaSecondary
content.hero.tagline
content.hero.scrollText
content.hero.backgroundImage
content.hero.videoUrl
content.hero.stats[]                  → { value, suffix, label }
content.services.badge/title/titleHighlight/subtitle/ctaText
content.services.items[]              → { id, icon, title, description, color }
content.about.badge/title/titleHighlight
content.about.description/descriptionSecondary
content.about.companyName/companyShort/foundedYear
content.about.tags[]
content.about.stats[]                 → { value, label }
content.about.features[]              → { num, icon, title, desc }
content.portfolio.badge/title/titleHighlight/subtitle
content.portfolio.categories[]
content.portfolio.projects[]          → { id, title, category, description, gradient, tags[] }
content.testimonials.badge/title/titleHighlight/subtitle
content.testimonials.items[]          → { id, quote, name, role, rating }
content.faq.badge/title/titleHighlight/subtitle
content.faq.items[]                   → { id, question, answer }
content.process.badge/title/titleHighlight/subtitle
content.process.steps[]               → { id, num, title, description, icon, color }
content.contact.badge/title/titleHighlight/subtitle
content.contact.info[]                → { icon, label, value, color }
content.contact.whatsappNumber/whatsappText/whatsappSubtext
content.contact.formLabels            → { name, email, phone, service, message, submit }
content.contact.serviceOptions[]
content.contact.responseTime
content.footer.brandName/brandTagline/description
content.footer.ctaTitle/ctaSubtitle/ctaButton
content.footer.copyright/madeWithText
content.footer.links.services[]
content.footer.links.company[]
content.footer.links.support[]
content.marquee.stats[]               → { value, label, icon }
content.marquee.items[]
```
