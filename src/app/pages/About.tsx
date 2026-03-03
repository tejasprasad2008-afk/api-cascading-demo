import { motion } from 'motion/react';
import { FileText, Github, Linkedin, Mail, ExternalLink, Award, MapPin, Calendar, Download } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-[#0a0e27] pt-24 pb-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16">
          <h1 className="text-[#f8fafc] text-4xl md:text-6xl font-bold mb-6">About This Research</h1>
          <p className="text-[#94a3b8] text-xl">Independent research by Tejas Prasad</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#1e1b4b] border border-[#334155] rounded-2xl p-8 sticky top-24">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-48 h-48 rounded-full border-4 border-[#3b82f6] mb-6 overflow-hidden bg-[#0a0e27] flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">TP</span>
                </div>
                <h2 className="text-white text-3xl font-bold mb-2">Tejas Prasad</h2>
                <div className="text-[#3b82f6] font-medium mb-4">Independent Researcher</div>
                <div className="flex flex-wrap justify-center gap-4 text-[#94a3b8] text-sm">
                  <div className="flex items-center gap-1"><Award size={14} /> 17 years old</div>
                  <div className="flex items-center gap-1"><MapPin size={14} /> Al Ain, UAE</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#0a0e27] p-4 rounded-xl border border-[#334155]">
                  <div className="text-white text-3xl font-bold">415+</div>
                  <div className="text-[#64748b] text-[10px] uppercase font-bold tracking-widest mt-1">Abstract Views</div>
                </div>
                <div className="bg-[#0a0e27] p-4 rounded-xl border border-[#334155]">
                  <div className="text-white text-3xl font-bold">20+</div>
                  <div className="text-[#64748b] text-[10px] uppercase font-bold tracking-widest mt-1">Downloads</div>
                </div>
                <div className="bg-[#0a0e27] p-4 rounded-xl border border-[#334155]">
                  <div className="text-white text-3xl font-bold">1</div>
                  <div className="text-[#64748b] text-[10px] uppercase font-bold tracking-widest mt-1">Citation</div>
                </div>
                <div className="bg-[#0a0e27] p-4 rounded-xl border border-[#334155]">
                  <div className="text-white text-2xl font-bold">Feb 2026</div>
                  <div className="text-[#64748b] text-[10px] uppercase font-bold tracking-widest mt-1">Published</div>
                </div>
              </div>

              <div className="space-y-4">
                <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6055034" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-[#0a0e27] border border-[#334155] rounded-xl text-[#3b82f6] hover:bg-[#3b82f6]/5 transition-all group">
                  <div className="flex items-center gap-3">
                    <FileText size={20} />
                    <span className="font-bold">SSRN Publication</span>
                  </div>
                  <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="https://scholar.google.com/citations?user=NFpwdbUAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-[#0a0e27] border border-[#334155] rounded-xl text-[#3b82f6] hover:bg-[#3b82f6]/5 transition-all group">
                  <div className="flex items-center gap-3">
                    <ExternalLink size={20} />
                    <span className="font-bold">Google Scholar</span>
                  </div>
                  <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="https://github.com/tejasprasad2008-afk" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-[#0a0e27] border border-[#334155] rounded-xl text-[#3b82f6] hover:bg-[#3b82f6]/5 transition-all group">
                  <div className="flex items-center gap-3">
                    <Github size={20} />
                    <span className="font-bold">GitHub</span>
                  </div>
                  <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="https://orcid.org/0009-0008-7201-7799" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-[#0a0e27] border border-[#334155] rounded-xl text-[#3b82f6] hover:bg-[#3b82f6]/5 transition-all group">
                  <div className="flex items-center gap-3">
                    <Award size={20} />
                    <span className="font-bold">ORCID Profile</span>
                  </div>
                  <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 space-y-12">
            <section className="bg-[#1e1b4b] border border-[#334155] rounded-2xl p-10">
              <h3 className="text-white text-2xl font-bold mb-6">How This Research Began</h3>
              <div className="text-[#94a3b8] text-lg leading-relaxed space-y-6">
                <p>
                  The inspiration for this research came from a simple observation: the growing discrepancy between API provider revenues and the massive volume of traffic handled by third-party aggregators.
                </p>
                <p>
                  As a 17-year-old student exploring the mechanics of web infrastructure, I noticed how easily security monitoring breaks down when requests pass through multiple middleware layers. This led to a 6-month investigation into what I eventually termed "API Cascading."
                </p>
              </div>
            </section>

            <section className="bg-[#1e1b4b] border border-[#334155] rounded-2xl p-10">
              <h3 className="text-white text-2xl font-bold mb-8">Key Research Contributions</h3>
              <div className="space-y-6">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center shrink-0">
                    <FileText className="text-[#3b82f6]" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Mirror API Theory</h4>
                    <p className="text-[#94a3b8] text-sm">A foundational framework for understanding quality degradation across API hops.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-[#06b6d4]/10 flex items-center justify-center shrink-0">
                    <Award className="text-[#06b6d4]" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Cascading Latency Formula</h4>
                    <p className="text-[#94a3b8] text-sm">A mathematical model (Lt = Σ(Pk + Sk + Ik)) for predicting performance impact.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center shrink-0">
                    <Award className="text-[#10b981]" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Zero-Trust Recursive Signature</h4>
                    <p className="text-[#94a3b8] text-sm">A proposed technical solution for maintaining auditability through cascaded chains.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-[#0a0e27] border border-[#334155] rounded-2xl p-10">
              <h3 className="text-white text-2xl font-bold mb-12">Publication Timeline</h3>
              <div className="relative pl-8 border-l-2 border-[#3b82f6] space-y-12">
                {[
                  { date: 'December 2025', title: 'Research Initiated', desc: 'Began investigating API cascading patterns and aggregator behaviors.' },
                  { date: 'January 2026', title: 'Paper Completed', desc: 'Finished manuscript with 15-page analysis of technical and economic impacts.' },
                  { date: 'February 6, 2026', title: 'Published on SSRN', desc: 'Research made publicly available for academic and professional review.', badge: '415+ views' },
                  { date: 'February 2026', title: 'First Citation', desc: 'Research cited by the broader computer science academic community.', badge: 'Google Scholar Indexed' }
                ].map((event, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[#3b82f6] border-4 border-[#0a0e27]" />
                    <div className="text-[#64748b] text-sm mb-1">{event.date}</div>
                    <h4 className="text-white font-bold text-lg mb-2">{event.title}</h4>
                    <p className="text-[#94a3b8] text-sm mb-3">{event.desc}</p>
                    {event.badge && (
                      <span className="bg-[#3b82f6]/20 text-[#3b82f6] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        {event.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-[#1e1b4b] border-2 border-[#3b82f6] rounded-2xl p-10">
              <h3 className="text-white text-2xl font-bold mb-2">Get in Touch</h3>
              <p className="text-[#94a3b8] mb-8">Available for research collaboration and university opportunities.</p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[#94a3b8] text-sm">Full Name</label>
                    <input type="text" className="w-full bg-[#0a0e27] border border-[#334155] rounded-xl py-3 px-4 text-white focus:border-[#3b82f6] outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#94a3b8] text-sm">Email Address</label>
                    <input type="email" className="w-full bg-[#0a0e27] border border-[#334155] rounded-xl py-3 px-4 text-white focus:border-[#3b82f6] outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[#94a3b8] text-sm">Subject</label>
                  <input type="text" className="w-full bg-[#0a0e27] border border-[#334155] rounded-xl py-3 px-4 text-white focus:border-[#3b82f6] outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[#94a3b8] text-sm">Message</label>
                  <textarea rows={4} className="w-full bg-[#0a0e27] border border-[#334155] rounded-xl py-3 px-4 text-white focus:border-[#3b82f6] outline-none resize-none" />
                </div>
                <button type="button" className="w-full bg-[#3b82f6] text-white py-4 rounded-xl font-bold hover:bg-[#2563eb] transition-all">
                  Send Message
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
