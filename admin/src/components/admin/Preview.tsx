import { useSiteData } from '../../contexts/SiteDataContext';
import { 
  Sparkles, ArrowUpRight, Mail, Phone, MapPin, Clock, 
  Star, ChevronDown, ExternalLink, MessageCircle
} from 'lucide-react';

export default function Preview() {
  const { content } = useSiteData();

  return (
    <div className="bg-[#0a0a0f] text-white min-h-screen">
      {/* Navbar Preview */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">
              {content.footer.brandName}<span className="text-violet-400">{content.footer.brandTagline}</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {content.navLinks.map((link) => (
              <span key={link.name} className="text-sm text-gray-400 hover:text-white cursor-pointer">
                {link.name}
              </span>
            ))}
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full text-sm font-medium">
            Start Project
          </button>
        </div>
      </nav>

      {/* Hero Preview */}
      <section className="relative py-32 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-gray-400">{content.hero.tagline}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-2">{content.hero.titleLine1}</h1>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            {content.hero.titleLine2}
          </h1>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-violet-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent mb-8">
            {content.hero.titleLine3}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">{content.hero.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full font-medium">
              {content.hero.ctaPrimary}
            </button>
            <button className="px-6 py-3 border border-white/20 rounded-full font-medium">
              {content.hero.ctaSecondary}
            </button>
          </div>
          <div className="flex justify-center items-center gap-2 text-gray-500 text-sm">
            <ChevronDown className="w-4 h-4" />
            <span>{content.hero.scrollText}</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="flex justify-center gap-8 mt-12">
            {content.hero.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold">{stat.value}{stat.suffix}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm mb-4">
              {content.services.badge}
            </span>
            <h2 className="text-4xl font-bold mb-4">
              {content.services.title} <span className="text-gradient bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">{content.services.titleHighlight}</span>
            </h2>
            <p className="text-gray-400">{content.services.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.services.items.map((service) => (
              <div key={service.id} className="p-6 rounded-2xl bg-gray-900/50 border border-white/5 hover:border-violet-500/20 transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} mb-4 flex items-center justify-center`}>
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  {service.title}
                  <ArrowUpRight className="w-4 h-4 text-gray-600" />
                </h3>
                <p className="text-gray-500 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-900/50 rounded-2xl p-8 border border-white/5">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500 to-emerald-400 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">{content.about.companyShort}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{content.about.companyName}</h3>
              <p className="text-violet-400 text-sm mb-6">{content.about.foundedYear}</p>
              <div className="grid grid-cols-3 gap-4">
                {content.about.stats.map((stat, i) => (
                  <div key={i} className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="font-bold">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-4">
                {content.about.badge}
              </span>
              <h2 className="text-4xl font-bold mb-4">
                {content.about.title} <span className="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">{content.about.titleHighlight}</span>
              </h2>
              <p className="text-gray-400 mb-4">{content.about.description}</p>
              <p className="text-gray-500 text-sm mb-6">{content.about.descriptionSecondary}</p>
              <div className="flex flex-wrap gap-2">
                {content.about.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm mb-4">
              {content.portfolio.badge}
            </span>
            <h2 className="text-4xl font-bold mb-4">
              {content.portfolio.title} <span className="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">{content.portfolio.titleHighlight}</span>
            </h2>
            <p className="text-gray-400">{content.portfolio.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.portfolio.projects.slice(0, 6).map((project) => (
              <div key={project.id} className="rounded-2xl overflow-hidden bg-gray-900/50 border border-white/5">
                <div className={`h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                  <ExternalLink className="w-8 h-8 text-white/50" />
                </div>
                <div className="p-5">
                  <span className="text-xs text-violet-400">{project.category}</span>
                  <h3 className="font-bold mt-1 flex items-center gap-2">
                    {project.title}
                    <ArrowUpRight className="w-4 h-4 text-gray-600" />
                  </h3>
                  <p className="text-gray-500 text-sm mt-2">{project.description}</p>
                  <div className="flex gap-2 mt-3">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm mb-4">
            {content.testimonials.badge}
          </span>
          <h2 className="text-4xl font-bold mb-4">
            {content.testimonials.title} <span className="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">{content.testimonials.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 mb-12">{content.testimonials.subtitle}</p>
          
          {content.testimonials.items[0] && (
            <div className="bg-gray-900/50 rounded-2xl p-8 border border-white/5">
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: content.testimonials.items[0].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <blockquote className="text-xl font-medium mb-6">
                "{content.testimonials.items[0].quote}"
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-emerald-400 flex items-center justify-center">
                  {content.testimonials.items[0].name[0]}
                </div>
                <div className="text-left">
                  <div className="font-medium">{content.testimonials.items[0].name}</div>
                  <div className="text-sm text-gray-500">{content.testimonials.items[0].role}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Preview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-4">
              {content.contact.badge}
            </span>
            <h2 className="text-4xl font-bold mb-4">
              {content.contact.title} <span className="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">{content.contact.titleHighlight}</span>
            </h2>
            <p className="text-gray-400">{content.contact.subtitle}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {content.contact.info.map((info, i) => {
                const Icon = info.icon === 'Mail' ? Mail : info.icon === 'Phone' ? Phone : info.icon === 'MapPin' ? MapPin : Clock;
                return (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl border border-white/5">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${info.color}`} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{info.label}</div>
                      <div className="font-medium">{info.value}</div>
                    </div>
                  </div>
                );
              })}
              <div className="flex items-center gap-3 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <MessageCircle className="w-6 h-6 text-emerald-400" />
                <div>
                  <div className="font-medium">{content.contact.whatsappText}</div>
                  <div className="text-sm text-emerald-400">{content.contact.whatsappSubtext}</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/5">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder={content.contact.formLabels.name} className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg" />
                  <input type="email" placeholder={content.contact.formLabels.email} className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="tel" placeholder={content.contact.formLabels.phone} className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg" />
                  <select className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-400">
                    <option>{content.contact.formLabels.service}</option>
                  </select>
                </div>
                <textarea placeholder={content.contact.formLabels.message} rows={4} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg" />
                <button className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg font-medium">
                  {content.contact.formLabels.submit}
                </button>
                <p className="text-center text-sm text-gray-500">{content.contact.responseTime}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Preview */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-12 text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{content.footer.ctaTitle}</h2>
            <p className="text-white/80 mb-6">{content.footer.ctaSubtitle}</p>
            <button className="px-6 py-3 bg-white text-gray-900 rounded-full font-medium">
              {content.footer.ctaButton}
            </button>
          </div>
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-emerald-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-bold">{content.footer.brandName}<span className="text-violet-400">{content.footer.brandTagline}</span></span>
              </div>
              <p className="text-sm text-gray-500">{content.footer.description}</p>
            </div>
            {Object.entries(content.footer.links).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-bold mb-4 capitalize">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link} className="text-sm text-gray-500 hover:text-white cursor-pointer">{link}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-white/5 flex justify-between text-sm text-gray-500">
            <span>{content.footer.copyright}</span>
            <span>{content.footer.madeWithText}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
