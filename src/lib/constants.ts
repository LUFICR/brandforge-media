export const COLORS = {
  background: {
    deep: "#0A0A0F",
    surface: "#12121A",
    card: "#1A1A2E",
  },
  accent: {
    primary: "#6C63FF",
    secondary: "#00D4AA",
    warm: "#FF6B35",
  },
  text: {
    primary: "#F8F8FF",
    secondary: "#A0A0B8",
    tertiary: "#6B6B80",
  },
  glass: {
    border: "rgba(255,255,255,0.08)",
    background: "rgba(26,26,46,0.6)",
  },
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1440,
} as const;

export const TIMING = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  hero: 1.2,
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
} as const;

export const EASING = {
  smoothOut: [0.22, 1, 0.36, 1] as const,
  smoothInOut: [0.65, 0, 0.35, 1] as const,
  elastic: [0.34, 1.56, 0.64, 1] as const,
  power3Out: [0.33, 1, 0.68, 1] as const,
  cinematic: [0.76, 0, 0.24, 1] as const,
} as const;

export const SERVICES = [
  {
    title: "Social Media Management",
    description:
      "Strategic content and community management that builds engaged audiences",
    icon: "share2",
  },
  {
    title: "Website Designing",
    description:
      "Premium websites that convert visitors into customers",
    icon: "monitor",
  },
  {
    title: "Graphic & Video Editing",
    description:
      "Visual content that captures attention and tells your story",
    icon: "film",
  },
  {
    title: "Branding & Promotions",
    description:
      "Complete brand identity that makes you unforgettable",
    icon: "sparkles",
  },
  {
    title: "Digital Marketing",
    description:
      "Data-driven campaigns that deliver measurable ROI",
    icon: "trendingUp",
  },
  {
    title: "SEO Marketing",
    description:
      "Search optimization that puts you ahead of competitors",
    icon: "search",
  },
] as const;

export const STATS = [
  { value: 100, suffix: "+", label: "Happy Clients" },
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;
