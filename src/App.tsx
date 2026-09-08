import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock3, 
  Zap, 
  CircleCheck, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Calculator, 
  X, 
  MessageSquare 
} from 'lucide-react';

interface ServiceItem {
  number: string;
  title: string;
  desc: string;
}

const services: ServiceItem[] = [
  {
    number: '01',
    title: 'Mining Security & Asset Protection',
    desc: 'High-visibility tactical guarding, access control, anti-poaching, and asset retrieval across mine perimeters.'
  },
  {
    number: '02',
    title: 'Industrial & Site Engineering Support',
    desc: 'On-site technical support, civil works integration, structural maintenance, and mechanical safety oversight.'
  },
  {
    number: '03',
    title: 'Thermal Drone & Electronic Surveillance',
    desc: 'Long-range thermal aerial surveillance, biometrics, CCTV network installation, and automated perimeter alerts.'
  },
  {
    number: '04',
    title: 'Facilities & Logistics Management',
    desc: 'Turnkey facility maintenance, site hygiene, supply chain escorting, and fleet route protection.'
  }
];

export default function App() {
  const year = new Date().getFullYear();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const [showEstimator, setShowEstimator] = useState<boolean>(false);
  const [estService, setEstService] = useState<string>(services[0].title);
  const [estDuration, setEstDuration] = useState<string>('12+ Months');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    if (!name || !email) {
      setFormError('Please fill in all required fields.');
      return;
    }

    setFormError('');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#040b12] text-[#fff7e8] font-sans">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#040b12]/90 backdrop-blur-md px-5 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-[#10283c] border border-[#294256] flex items-center justify-center font-bold text-[#d04a43]">
              RG
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#fff7e8]">Reconcile Group</p>
              <p className="text-[10px] uppercase text-[#d04a43] tracking-wider">Integrated Mining Services</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-[#becbd4]">
            <a href="#about" className="hover:text-[#fff7e8] transition-colors">About</a>
            <a href="#services" className="hover:text-[#fff7e8] transition-colors">Capabilities</a>
            <a href="#reach" className="hover:text-[#fff7e8] transition-colors">Footprint</a>
            <a href="#contact" className="hover:text-[#fff7e8] transition-colors">Contact</a>
          </nav>

          <button 
            onClick={() => setShowEstimator(true)}
            className="flex items-center gap-2 bg-[#a01c1c] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#c23b35]"
          >
            <Calculator size={14} /> Scope Estimator
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/10 px-5 py-24 md:py-32 bg-gradient-to-b from-[#07131e] to-[#040b12]">
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[.25em] text-[#d04a43]">
              South Africa Operational Capability
            </p>
            <h1 className="text-4xl font-black uppercase leading-[.95] text-[#fff7e8] sm:text-6xl lg:text-7xl">
              Precision Security <br />
              <span className="text-[#d04a43]">&amp; Industrial Support</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base text-[#becbd4] sm:text-lg">
              Delivering high-integrity perimeter defense, engineering support, and facility management tailored for mining sites, critical infrastructure, and heavy industrial operations.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a 
                href="#contact" 
                className="bg-[#a01c1c] px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-[#c23b35] flex items-center gap-2"
              >
                Request Operations Assessment <ChevronRight size={16} />
              </a>
              <a 
                href="#services" 
                className="border border-[#294256] bg-[#10283c] px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-[#fff7e8] hover:bg-[#1a3852] transition-all"
              >
                Explore Capabilities
              </a>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="border-b border-white/10 bg-[#07131e] px-5 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#d04a43]">Core Deliverables</p>
              <h2 className="text-3xl font-bold uppercase text-[#fff7e8] md:text-5xl mt-2">
                Operational Capabilities
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <div key={s.number} className="border border-[#294256] bg-[#10283c] p-6 transition-all hover:border-[#d04a43]">
                  <span className="text-xs font-mono font-bold text-[#d04a43]">{s.number}</span>
                  <h3 className="mt-3 text-lg font-bold uppercase text-[#fff7e8]">{s.title}</h3>
                  <p className="mt-3 text-sm text-[#becbd4] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Banner */}
        <section id="about" className="bg-[#a01c1c] px-5 py-16 text-[#fff7e8]">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold uppercase tracking-wider mb-8 border-b border-white/20 pb-4">
              Operational Standards &amp; Principles
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="border-l-2 border-white/30 pl-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ffd4c5]">
                  <ShieldCheck size={16} /> 01. Integrity
                </div>
                <p className="mt-2 text-sm text-[#fff7e8]/90">
                  Uncompromised compliance, full transparency, and rigorous operational control on every shift.
                </p>
              </div>
              <div className="border-l-2 border-white/30 pl-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ffd4c5]">
                  <Clock3 size={16} /> 02. Reliability
                </div>
                <p className="mt-2 text-sm text-[#fff7e8]/90">
                  Dependable response times, continuous monitoring, and structured site handovers without disruption.
                </p>
              </div>
              <div className="border-l-2 border-white/30 pl-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ffd4c5]">
                  <Zap size={16} /> 03. Innovation
                </div>
                <p className="mt-2 text-sm text-[#fff7e8]/90">
                  Integrating thermal drone technology, AI analytics, and biometrics with boots on the ground.
                </p>
              </div>
              <div className="border-l-2 border-white/30 pl-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ffd4c5]">
                  <CircleCheck size={16} /> 04. Accountability
                </div>
                <p className="mt-2 text-sm text-[#fff7e8]/90">
                  A single accountable partner for security, engineering support, and facility maintenance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-[#07131e] px-5 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-[#d04a43]">Initiate contact</p>
                <h2 className="text-4xl font-bold uppercase leading-[.95] text-[#fff7e8] md:text-6xl">
                  Let&apos;s discuss<br /><span className="text-[#d04a43]">Your Site Scope</span>
                </h2>
                <p className="mt-6 text-base text-[#becbd4] max-w-md">
                  Reach out to our operations desk for quotes, site assessments, or tenders across South Africa.
                </p>

                <div className="mt-10 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-[#10283c] p-3 text-[#d04a43] border border-[#294256]">
                      <Phone size={20} />
                    </div>
                    <div>
                      <span className="block text-xs uppercase text-[#7890a1] font-mono">Telephone</span>
                      <a href="tel:0145470989" className="text-lg font-bold text-[#fff7e8] hover:text-[#d04a43] transition-colors">
                        014 547 0989
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-[#10283c] p-3 text-[#d04a43] border border-[#294256]">
                      <Mail size={20} />
                    </div>
                    <div>
                      <span className="block text-xs uppercase text-[#7890a1] font-mono">Email Enquiries</span>
                      <a href="mailto:info@reconcilegroup.co.za" className="text-lg font-bold text-[#fff7e8] hover:text-[#d04a43] transition-colors">
                        info@reconcilegroup.co.za
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-[#10283c] p-3 text-[#d04a43] border border-[#294256]">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span className="block text-xs uppercase text-[#7890a1] font-mono">Primary Head Office</span>
                      <p className="text-sm font-semibold text-[#fff7e8]">
                        Northam HQ, Limpopo &amp; Operational Belt, South Africa
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Component */}
              <div className="border border-[#294256] bg-[#10283c] p-8 shadow-2xl">
                {submitted ? (
                  <div className="flex h-full min-h-[350px] flex-col items-center justify-center text-center">
                    <CircleCheck size={56} className="text-[#25D366] mb-4" />
                    <h3 className="text-2xl font-bold uppercase text-[#fff7e8]">Request Received</h3>
                    <p className="mt-2 text-sm text-[#becbd4] max-w-sm">
                      Thank you. Our operations team will review your scope and get in touch shortly.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-6 bg-[#a01c1c] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#c23b35]"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-xl font-bold uppercase text-[#fff7e8] mb-2">Request a Quote</h3>
                    
                    {formError && (
                      <div className="rounded bg-[#a01c1c]/20 border border-[#a01c1c] p-3 text-xs text-[#ffd4c5]">
                        {formError}
                      </div>
                    )}

                    <div>
                      <label htmlFor="name" className="block text-xs uppercase tracking-wider text-[#7890a1] mb-1 font-mono">Your Name / Title *</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        className="w-full bg-[#07131e] border border-[#294256] px-4 py-3 text-sm text-[#fff7e8] focus:border-[#d04a43] focus:outline-none" 
                        placeholder="e.g. Sipho Ndlovu (Site Manager)"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="email" className="block text-xs uppercase tracking-wider text-[#7890a1] mb-1 font-mono">Email Address *</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          className="w-full bg-[#07131e] border border-[#294256] px-4 py-3 text-sm text-[#fff7e8] focus:border-[#d04a43] focus:outline-none" 
                          placeholder="name@company.co.za"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-[#7890a1] mb-1 font-mono">Phone Number</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone" 
                          className="w-full bg-[#07131e] border border-[#294256] px-4 py-3 text-sm text-[#fff7e8] focus:border-[#d04a43] focus:outline-none" 
                          placeholder="082 123 4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="capability" className="block text-xs uppercase tracking-wider text-[#7890a1] mb-1 font-mono">Required Capability</label>
                      <select 
                        id="capability" 
                        name="capability" 
                        className="w-full bg-[#07131e] border border-[#294256] px-4 py-3 text-sm text-[#fff7e8] focus:border-[#d04a43] focus:outline-none"
                      >
                        {services.map((s) => (
                          <option key={s.number} value={s.title}>{s.title}</option>
                        ))}
                        <option value="Turnkey Integrated Scope">Turnkey Integrated Scope</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs uppercase tracking-wider text-[#7890a1] mb-1 font-mono">Site Scope / Requirements</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={4} 
                        className="w-full bg-[#07131e] border border-[#294256] px-4 py-3 text-sm text-[#fff7e8] focus:border-[#d04a43] focus:outline-none resize-none" 
                        placeholder="Specify location, timeframe, personnel or hardware required..."
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-[#a01c1c] py-4 text-xs font-bold uppercase tracking-[.15em] text-white transition-all hover:bg-[#c23b35] flex items-center justify-center gap-2"
                    >
                      Submit Request <ChevronRight size={16} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Scope Estimator Modal */}
      {showEstimator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg border border-[#294256] bg-[#10283c] p-6 text-[#fff7e8] shadow-2xl relative">
            <button 
              onClick={() => setShowEstimator(false)}
              className="absolute top-4 right-4 text-[#7890a1] hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 text-[#e7b85e] text-xs font-mono uppercase mb-1">
              <Calculator size={16} /> Quick Scope Estimator
            </div>
            <h3 className="text-xl font-bold uppercase">Configure Initial Assessment</h3>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#7890a1] mb-1">Select Core Service</label>
                <select 
                  value={estService} 
                  onChange={(e) => setEstService(e.target.value)}
                  className="w-full bg-[#07131e] border border-[#294256] p-3 text-sm text-[#fff7e8] focus:outline-none"
                >
                  {services.map(s => <option key={s.number} value={s.title}>{s.title}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#7890a1] mb-1">Estimated Contract Duration</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Ad-hoc / Shutdown', '1-3 Months', '12+ Months'].map(dur => (
                    <button 
                      key={dur} 
                      type="button"
                      onClick={() => setEstDuration(dur)}
                      className={`py-2 px-3 text-xs border text-center transition-colors ${estDuration === dur ? 'border-[#d04a43] bg-[#d04a43]/20 text-[#fff7e8]' : 'border-[#294256] bg-[#07131e] text-[#7890a1]'}`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded border border-[#294256] bg-[#07131e] p-4 mt-4">
                <span className="text-[10px] font-mono text-[#7890a1] uppercase block">Estimated Mobilisation Plan</span>
                <p className="text-sm font-bold text-[#e7b85e] mt-1">Rapid 24-48 Hour On-Site Deployment</p>
                <p className="text-xs text-[#becbd4] mt-1">
                  Includes risk profile mapping, team deployment, and integration of monitoring setup for {estService.toLowerCase()}.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center pt-4 border-t border-[#294256]">
              <span className="text-xs text-[#7890a1]">Ready for a detailed proposal?</span>
              <a 
                href="#contact" 
                onClick={() => setShowEstimator(false)}
                className="bg-[#a01c1c] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#c23b35]"
              >
                Proceed to Quote
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Action Button */}
      <a 
        href="https://wa.me/27145470989" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] px-4 py-3 rounded-full font-bold text-xs uppercase tracking-wider text-black shadow-lg hover:bg-[#20ba5a] transition-all"
      >
        <MessageSquare size={18} /> Direct Ops Desk
      </a>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#040b12] px-5 py-12 text-[#7890a1]">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#10283c] border border-[#294256] flex items-center justify-center font-bold text-[#d04a43] text-xs">
              RG
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#fff7e8]">Reconcile Group</p>
              <p className="text-[10px] uppercase text-[#d04a43]">Integrated Mining Services</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold uppercase tracking-wider">
            <a href="#about" className="hover:text-[#fff7e8] transition-colors">Company</a>
            <a href="#services" className="hover:text-[#fff7e8] transition-colors">Capabilities</a>
            <a href="#contact" className="hover:text-[#fff7e8] transition-colors">Contact</a>
          </div>

          <p className="text-xs font-mono">
            &copy; {year} Reconcile Group. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
