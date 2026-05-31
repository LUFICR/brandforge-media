export interface HeroContent {
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  tagline: string;
  scrollText: string;
  backgroundImage: string;
  videoUrl: string;
  stats: Array<{ value: number; suffix: string; label: string }>;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface AboutContent {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  descriptionSecondary: string;
  companyName: string;
  companyShort: string;
  foundedYear: string;
  tags: string[];
  stats: Array<{ value: string; label: string }>;
  whyChooseUsBadge: string;
  whyChooseUsTitle: string;
  whyChooseUsHighlight: string;
  features: Array<{ num: string; icon: string; title: string; desc: string }>;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  gradient: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ProcessStep {
  id: string;
  num: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  color: string;
}

export interface ContactContent {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  info: ContactInfo[];
  whatsappNumber: string;
  whatsappText: string;
  whatsappSubtext: string;
  formLabels: {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    submit: string;
  };
  serviceOptions: string[];
  responseTime: string;
}

export interface NavLink {
  name: string;
  href: string;
}

export interface FooterContent {
  brandName: string;
  brandTagline: string;
  description: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  copyright: string;
  madeWithText: string;
  links: {
    services: string[];
    company: string[];
    support: string[];
  };
}

export interface MarqueeContent {
  stats: Array<{ value: string; label: string; icon: string }>;
  items: string[];
}

export interface SiteContent {
  siteName: string;
  siteDescription: string;
  navLinks: NavLink[];
  hero: HeroContent;
  services: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaText: string;
    items: Service[];
  };
  about: AboutContent;
  portfolio: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    categories: string[];
    projects: Project[];
  };
  testimonials: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    items: Testimonial[];
  };
  faq: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    items: FAQ[];
  };
  process: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    steps: ProcessStep[];
  };
  contact: ContactContent;
  footer: FooterContent;
  marquee: MarqueeContent;
}

export const defaultSiteContent: SiteContent = {
  siteName: "BrandForge Media",
  siteDescription: "Premium Digital Marketing Agency",

  navLinks: [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Work", href: "#portfolio" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ],

  hero: {
    titleLine1: "We Build",
    titleLine2: "Brands That",
    titleLine3: "Dominate",
    subtitle: "From social media to complete digital presence — premium solutions for ambitious businesses that demand excellence.",
    ctaPrimary: "Start Your Project →",
    ctaSecondary: "Explore Services",
    tagline: "Since 2019",
    scrollText: "Scroll to explore",
    backgroundImage: "/hero-bg.jpg",
    videoUrl: "/basic.mp4",
    stats: [
      { value: 100, suffix: "+", label: "Clients" },
      { value: 500, suffix: "+", label: "Projects" },
      { value: 5, suffix: "+", label: "Years" },
      { value: 98, suffix: "%", label: "Satisfaction" },
    ],
  },

  services: {
    badge: "What We Do",
    title: "Services That Drive",
    titleHighlight: "Growth",
    subtitle: "From basic setup to complete business branding — we handle everything professionally.",
    ctaText: "Get Free Consultation",
    items: [
      { id: "1", icon: "Palette", title: "Brand Identity", description: "Complete brand identity design including logo, colors, typography & brand guidelines that make you unforgettable.", color: "from-violet-500 to-purple-600" },
      { id: "2", icon: "Globe", title: "Web Design & Dev", description: "Premium, responsive websites crafted with cutting-edge technology to convert visitors into loyal customers.", color: "from-cyan-500 to-blue-600" },
      { id: "3", icon: "Share2", title: "Social Media", description: "Strategic social media management that builds communities, drives engagement, and grows your audience.", color: "from-pink-500 to-rose-600" },
      { id: "4", icon: "BarChart3", title: "SEO & Analytics", description: "Data-driven SEO strategies that boost rankings, increase traffic, and deliver measurable ROI.", color: "from-emerald-500 to-green-600" },
      { id: "5", icon: "Megaphone", title: "Paid Advertising", description: "High-performing ad campaigns across Google, Meta & more — optimized for maximum conversions.", color: "from-orange-500 to-amber-600" },
      { id: "6", icon: "Camera", title: "Content Creation", description: "Professional content production — from photography to video and copywriting that tells your story.", color: "from-indigo-500 to-violet-600" },
    ],
  },

  about: {
    badge: "About Us",
    title: "We Turn Businesses Into",
    titleHighlight: "Powerful Brands",
    description: "We're a team of creative strategists, designers, and marketers passionate about helping businesses establish a powerful online presence.",
    descriptionSecondary: "At BrandForge Media, we believe every business deserves a premium digital identity. We combine creative excellence with data-driven strategy to deliver results that matter. From social media management to complete brand overhauls, we handle everything with the same level of care and professionalism.",
    companyName: "BrandForge Media",
    companyShort: "BF",
    foundedYear: "Since 2019",
    tags: ["Creative Strategy", "Brand Design", "Digital Marketing", "Social Media", "SEO"],
    stats: [
      { value: "5+", label: "Years" },
      { value: "100+", label: "Clients" },
      { value: "500+", label: "Projects" },
    ],
    whyChooseUsBadge: "Why Choose Us",
    whyChooseUsTitle: "Built Different, Built",
    whyChooseUsHighlight: "Better",
    features: [
      { num: "01", icon: "Award", title: "Premium Quality", desc: "Every pixel crafted to perfection with attention to detail." },
      { num: "02", icon: "Rocket", title: "Fast Delivery", desc: "Quick turnaround without compromising quality." },
      { num: "03", icon: "Shield", title: "24/7 Support", desc: "Always available when you need us, anytime." },
      { num: "04", icon: "Users", title: "Result-Driven", desc: "Strategies that deliver measurable growth." },
    ],
  },

  portfolio: {
    badge: "Our Work",
    title: "Projects That",
    titleHighlight: "Speak",
    subtitle: "A selection of our recent work across branding, web design, and digital marketing.",
    categories: ["All", "Branding", "Social Media", "Web Development", "Digital Marketing", "Content", "E-Commerce"],
    projects: [
      { id: "1", title: "TechStart Rebrand", category: "Branding", description: "Complete brand overhaul for a tech startup — logo, identity system, and digital presence.", gradient: "from-violet-600 to-indigo-600", tags: ["Logo", "Brand Guide", "Web"] },
      { id: "2", title: "FoodieHub Marketing", category: "Social Media", description: "Social media strategy that grew engagement by 400% in 4 months.", gradient: "from-pink-600 to-rose-600", tags: ["Instagram", "Content", "Ads"] },
      { id: "3", title: "Luxe Fashion Store", category: "E-Commerce", description: "Premium e-commerce website with seamless shopping experience.", gradient: "from-amber-600 to-orange-600", tags: ["Web Design", "Shopify", "SEO"] },
      { id: "4", title: "HealthFirst App", category: "Digital Marketing", description: "Full-funnel digital marketing campaign driving 10K+ app downloads.", gradient: "from-emerald-600 to-teal-600", tags: ["Google Ads", "Meta", "ASO"] },
      { id: "5", title: "EduLearn Platform", category: "Web Development", description: "Custom learning management system with modern UI/UX.", gradient: "from-cyan-600 to-blue-600", tags: ["React", "UI/UX", "Backend"] },
      { id: "6", title: "GreenEarth Campaign", category: "Content", description: "Viral content campaign for environmental awareness nonprofit.", gradient: "from-lime-600 to-green-600", tags: ["Video", "Social", "PR"] },
    ],
  },

  testimonials: {
    badge: "Testimonials",
    title: "What Our Clients",
    titleHighlight: "Say",
    subtitle: "Real results from real businesses we've helped grow.",
    items: [
      { id: "1", quote: "BrandForge Media transformed our online presence completely. Our engagement grew 300% in just 3 months. They truly understand digital marketing.", name: "Rahul Sharma", role: "Founder, TechStart Solutions", rating: 5 },
      { id: "2", quote: "The team at BrandForge delivered beyond our expectations. Our website redesign led to a 250% increase in conversions. Highly recommended!", name: "Priya Patel", role: "CEO, Luxe Boutique", rating: 5 },
      { id: "3", quote: "Working with BrandForge was a game-changer. Their social media strategy helped us reach 50K followers in just 6 months.", name: "Amit Kumar", role: "Director, FoodieHub", rating: 5 },
      { id: "4", quote: "Professional, creative, and results-driven. BrandForge Media helped us establish a strong brand identity from scratch.", name: "Sneha Reddy", role: "Co-founder, HealthFirst", rating: 5 },
    ],
  },

  faq: {
    badge: "FAQ",
    title: "Frequently Asked",
    titleHighlight: "Questions",
    subtitle: "Everything you need to know about working with us.",
    items: [
      { id: "1", question: "What services does BrandForge Media offer?", answer: "We offer a comprehensive range of digital marketing services including brand identity design, web development, social media management, SEO optimization, paid advertising, content creation, and digital strategy consulting." },
      { id: "2", question: "How long does a typical project take?", answer: "Project timelines vary based on scope. A logo design takes 3-5 days, brand identity 1-2 weeks, website development 2-4 weeks, and ongoing marketing campaigns are managed monthly. We always provide clear timelines upfront." },
      { id: "3", question: "What are your pricing plans?", answer: "We offer flexible pricing tailored to your business needs. Packages start from affordable basic plans to comprehensive premium packages. Contact us for a free consultation and custom quote." },
      { id: "4", question: "Do you work with businesses outside India?", answer: "Absolutely! While we're based in India, we work with clients globally. Our digital-first approach means we can collaborate seamlessly regardless of location." },
      { id: "5", question: "What makes BrandForge different from other agencies?", answer: "We combine premium design quality with strategic thinking. Every project gets personalized attention, we offer 24/7 support, fast turnaround times, and most importantly — we focus on measurable results, not just aesthetics." },
      { id: "6", question: "Can you handle ongoing social media management?", answer: "Yes! We offer monthly social media management packages that include content creation, posting, engagement management, analytics reporting, and strategy optimization to keep your brand growing consistently." },
    ],
  },

  process: {
    badge: "Our Process",
    title: "How We",
    titleHighlight: "Work",
    subtitle: "A proven process that delivers results every time — transparent, efficient, and effective.",
    steps: [
      { id: "1", num: "01", title: "Discovery", description: "We learn about your business, goals, target audience, and competition through in-depth research.", icon: "Search", color: "from-blue-500 to-cyan-500" },
      { id: "2", num: "02", title: "Strategy", description: "We create a custom growth plan tailored to your unique business needs and market.", icon: "Lightbulb", color: "from-violet-500 to-purple-500" },
      { id: "3", num: "03", title: "Design", description: "We craft premium visual assets and digital experiences that captivate your audience.", icon: "PenTool", color: "from-pink-500 to-rose-500" },
      { id: "4", num: "04", title: "Launch", description: "We execute, test, and go live — ensuring everything is pixel-perfect and performing.", icon: "Rocket", color: "from-orange-500 to-amber-500" },
      { id: "5", num: "05", title: "Growth", description: "We continuously optimize, analyze, and scale results for sustained business growth.", icon: "TrendingUp", color: "from-emerald-500 to-green-500" },
    ],
  },

  contact: {
    badge: "Get In Touch",
    title: "Let's Start Your",
    titleHighlight: "Project",
    subtitle: "Share your requirements and our team will help you with the best solution for your business.",
    info: [
      { icon: "Mail", label: "Email", value: "hello@brandforgemedia.com", color: "text-violet-400" },
      { icon: "Phone", label: "Phone", value: "+91 93112 67085", color: "text-emerald-400" },
      { icon: "MapPin", label: "Location", value: "India (Serving Worldwide)", color: "text-pink-400" },
      { icon: "Clock", label: "Response Time", value: "Within 2 hours", color: "text-amber-400" },
    ],
    whatsappNumber: "919311267085",
    whatsappText: "Chat on WhatsApp",
    whatsappSubtext: "Quick response guaranteed",
    formLabels: {
      name: "Your Name",
      email: "Email Address",
      phone: "Phone Number",
      service: "Service Needed",
      message: "Your Message",
      submit: "Send Message",
    },
    serviceOptions: ["Brand Identity", "Web Design & Dev", "Social Media", "SEO & Analytics", "Paid Advertising", "Content Creation"],
    responseTime: "We typically respond within 2 hours",
  },

  footer: {
    brandName: "BrandForge",
    brandTagline: ".media",
    description: "Premium digital marketing agency transforming businesses into powerful brands since 2019.",
    ctaTitle: "Ready to Dominate Online?",
    ctaSubtitle: "Let's transform your digital presence and build a brand that stands out. Get started today — it's free to consult.",
    ctaButton: "Start Your Project",
    copyright: "© 2025 BrandForge Media. All rights reserved.",
    madeWithText: "Crafted with ❤️ by BrandForge Media",
    links: {
      services: ["Brand Identity", "Web Design", "Social Media", "SEO", "Paid Ads", "Content Creation"],
      company: ["About Us", "Portfolio", "Process", "Testimonials", "Careers", "Blog"],
      support: ["Contact", "FAQ", "Privacy Policy", "Terms of Service"],
    },
  },

  marquee: {
    stats: [
      { value: "100+", label: "Happy Clients", icon: "😊" },
      { value: "500+", label: "Projects Completed", icon: "🚀" },
      { value: "5+", label: "Years Experience", icon: "⏰" },
      { value: "98%", label: "Client Satisfaction", icon: "⭐" },
    ],
    items: ["BRANDING", "✦", "WEB DESIGN", "✦", "SOCIAL MEDIA", "✦", "SEO", "✦", "CONTENT", "✦", "STRATEGY", "✦", "GROWTH", "✦", "ADS", "✦"],
  },
};
