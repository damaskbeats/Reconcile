import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowRight, ArrowDownRight, Building2, MapPin, Phone, Mail, Wrench,
  Menu, X, ShieldCheck, CircleCheck, Clock3, Check, Zap, ChevronRight,
  Calculator, ChevronDown
} from 'lucide-react';

const navItems = [
  { href: '#about', label: 'Company', icon: Building2 },
  { href: '#services', label: 'Capabilities', icon: Wrench },
  { href: '#reach', label: 'Footprint', icon: MapPin },
  { href: '#locations', label: 'Locations', icon: MapPin },
  { href: '#contact', label: 'Contact', icon: Phone },
];

const services = [
  { number: '01', title: 'Mining Security', lead: 'Protection built for active sites.', items: ['Armed & unarmed guarding', 'Access & traffic control', 'Thermal drone surveillance', 'AI CCTV & control rooms', 'Biometric access management'] },
  { number: '02', title: 'Mining Support', lead: 'Keep production moving.', items: ['Conveyor & plant assistance', 'Materials handling', 'Pit and stockpile support', 'Equipment & fleet assistance', 'Site logistics coordination'] },
  { number: '03', title: 'Engineering Support', lead: 'Technical hands that understand the shift.', items: ['Mechanical maintenance support', 'Electrical support services', 'Instrumentation assistance', 'Shutdown & planned maintenance', 'Technical labour deployment'] },
  { number: '04', title: 'Civil & Infrastructure', lead: 'Strong foundations for what comes next.', items: ['Roads and access works', 'Earthworks & site preparation', 'Concrete and structural works', 'Stormwater & drainage', 'Facilities maintenance'] },
  { number: '05', title: 'Mining Technology', lead: 'Situational awareness, elevated.', items: ['Drone mapping & inspection', 'Real-time monitoring', 'AI-enabled surveillance', 'Digital reporting & dashboards', 'Risk and incident intelligence'] },
  { number: '06', title: 'Project Support', lead: 'One accountable partner on the ground.', items: ['Project mobilisation', 'HSE and compliance support', 'Workforce coordination', 'Procurement & site supply', 'Reporting and close-out'] },
  { number: '07', title: 'Supply & Services', lead: 'The details that keep a site ready.', items: ['PPE and safety equipment', 'Industrial consumables', 'Tools and site equipment', 'Cleaning and hygiene services', 'General trading and supply'] },
];

const regionDetails: Record<string, { base: string; focus: string; lat: number; lng: number }> = {
  'Limpopo': { base: 'Northam HQ & Waterberg Hub', focus: 'Platinum, Coal & Heavy Industry Operations', lat: -24.9167, lng: 27.2667 },
  'North West': { base: 'Rustenburg Operational Office', focus: 'PGM Mining Belt & Infrastructure Support', lat: -25.6672, lng: 27.2424 },
  'Gauteng': { base: 'Centurion Logistics Hub', focus: 'Corporate Security & Technology Monitoring', lat: -25.8601, lng: 28.1878 },
  'Mpumalanga': { base: 'eMalahleni / Witbank Field Support', focus: 'Energy, Coal Operations & Heavy Fleet Logistics', lat: -25.8752, lng: 29.2318 },
  'KwaZulu-Natal': { base: 'Richards Bay & Durban Supply Route', focus: 'Port Security, Logistics & Infrastructure', lat: -28.7830, lng: 32.0377 },
};

const regions = Object.keys(regionDetails);
const industries = ['Mining', 'Industrial', 'Construction', 'Energy', 'Agriculture', 'Oil & Gas', 'Commercial', 'Government'];

// WhatsApp brand mark (lucide-react has no official WhatsApp icon, so it's inlined as SVG)
function WhatsAppIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.34.65 4.53 1.777 6.4L4 29l7.79-1.744A11.93 11.93 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.818c-1.93 0-3.79-.52-5.41-1.5l-.388-.23-4.62 1.035 1.006-4.5-.253-.402A9.77 9.77 0 0 1 5.19 15c0-5.966 4.85-10.818 10.814-10.818S26.818 9.034 26.818 15 21.968 24.818 16.004 24.818Zm5.94-8.18c-.325-.163-1.92-.947-2.218-1.056-.297-.108-.514-.163-.73.163-.217.325-.838 1.056-1.028 1.273-.19.217-.38.244-.705.082-.325-.163-1.373-.506-2.615-1.612-.966-.86-1.618-1.923-1.808-2.248-.19-.325-.02-.5.143-.663.146-.146.325-.38.488-.57.163-.19.217-.325.325-.542.108-.217.054-.407-.027-.57-.082-.163-.73-1.76-1-2.41-.263-.633-.53-.548-.73-.558-.19-.008-.407-.01-.624-.01a1.2 1.2 0 0 0-.868.407c-.298.325-1.137 1.11-1.137 2.707s1.164 3.14 1.327 3.357c.163.217 2.29 3.497 5.55 4.905.776.335 1.38.535 1.852.685.778.248 1.486.213 2.046.13.624-.093 1.92-.785 2.19-1.543.271-.76.271-1.41.19-1.543-.082-.135-.298-.216-.623-.38Z" />
    </svg>
  );
}

function WhatsAppFloat() {
  const phoneNumber = '27615879808'; // 0615879808 in international format (SA country code 27, leading 0 dropped)
  const message = "Hi Reconcile Group, I'd like to enquire about your services.";
  const href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Reconcile Group on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3"
    >
      <span className="hidden whitespace-nowrap rounded-lg bg-[#0a1929] px-3 py-2 text-xs font-semibold text-[#fff7e8] opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:block">
        Chat on WhatsApp
      </span>
      <span className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/30 transition-transform duration-200 group-hover:scale-110">
          <WhatsAppIcon size={30} />
        </span>
      </span>
    </a>
  );
}

function HeroVideo() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState<'a' | 'b'>('a');
  const [isVisible, setIsVisible] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const activeVideo = active === 'a' ? videoARef.current : videoBRef.current;
    const inactiveVideo = active === 'a' ? videoBRef.current : videoARef.current;
    if (!activeVideo || hasError) return;
    if (isVisible) void activeVideo.play().catch(() => {});
    else activeVideo.pause();
    inactiveVideo?.pause();
  }, [active, isVisible, hasError]);

  const handleEnded = (which: 'a' | 'b') => {
    const next = which === 'a' ? 'b' : 'a';
    setActive(next);
    const nextRef = next === 'a' ? videoARef.current : videoBRef.current;
    if (nextRef) {
      nextRef.currentTime = 0;
      if (isVisible) void nextRef.play().catch(() => {});
    }
  };

  if (hasError) {
    return <div ref={wrapperRef} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/poster-dock-a.jpg)' }} />;
  }

  return (
    <div ref={wrapperRef} className="absolute inset-0" aria-hidden="true">
      <video ref={videoARef} className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500" style={{ opacity: active === 'a' ? 1 : 0 }} src="/hero-drone-dock-a.mp4" poster="/poster-dock-a.jpg" autoPlay muted playsInline preload="auto" onEnded={() => handleEnded('a')} onError={() => setHasError(true)} />
      <video ref={videoBRef} className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500" style={{ opacity: active === 'b' ? 1 : 0 }} src="/hero-drone-dock-b.mp4" poster="/poster-dock-b.jpg" muted playsInline preload="auto" onEnded={() => handleEnded('b')} onError={() => setHasError(true)} />
    </div>
  );
}

// Leaflet + OpenStreetMap loader (no API key required) + multi-pin map.
const LEAFLET_CSS_URL = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
const LEAFLET_JS_URL = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';

declare global {
  interface Window {
    L?: any;
  }
}

function loadLeaflet(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.L) {
      resolve();
      return;
    }
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = LEAFLET_CSS_URL;
      document.head.appendChild(link);
    }
    const existing = document.getElementById('leaflet-script') as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Failed to load Leaflet script')));
      return;
    }
    const script = document.createElement('script');
    script.id = 'leaflet-script';
    script.src = LEAFLET_JS_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Leaflet script'));
    document.head.appendChild(script);
  });
}

function LocationsMap({
  locations,
  selectedRegion,
  onSelectRegion,
}: {
  locations: Record<string, { base: string; focus: string; lat: number; lng: number }>;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;

    loadLeaflet()
      .then(() => {
        if (cancelled || !mapContainerRef.current) return;
        const L = window.L;

        // Guard against double-init (e.g. React StrictMode / hot reload)
        if ((mapContainerRef.current as any)._leaflet_id) {
          return;
        }

        const map = L.map(mapContainerRef.current, {
          center: [-26.5, 28.8],
          zoom: 6,
          scrollWheelZoom: false,
        });
        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(map);

        const pinIcon = L.divIcon({
          className: '',
          html: `<div style="width:22px;height:22px;border-radius:9999px;background:#d04a43;border:2px solid #fff7e8;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });

        Object.entries(locations).forEach(([name, loc]) => {
          const marker = L.marker([loc.lat, loc.lng], { icon: pinIcon }).addTo(map);
          marker.bindPopup(
            `<div style="font-family:sans-serif;color:#0a1929;">
               <strong style="display:block;font-size:13px;margin-bottom:2px;">${name}</strong>
               <span style="display:block;font-size:12px;">${loc.base}</span>
               <span style="display:block;font-size:11px;color:#52616e;margin-top:2px;">${loc.focus}</span>
             </div>`
          );
          marker.on('click', () => onSelectRegion(name));
          markersRef.current[name] = marker;
        });

        // Leaflet can compute a 0-size map if the container wasn't fully laid out
        // at init time (common inside flex/grid or below-the-fold sections).
        // Force a resize check shortly after mount, and again on window resize.
        const fixSize = () => map.invalidateSize();
        requestAnimationFrame(fixSize);
        setTimeout(fixSize, 250);
        setTimeout(fixSize, 800);
        window.addEventListener('resize', fixSize);

        // Also re-check when the section scrolls into view
        const observer = new IntersectionObserver((entries) => {
          if (entries[0]?.isIntersecting) fixSize();
        });
        observer.observe(mapContainerRef.current);

        (map as any).__cleanup = () => {
          window.removeEventListener('resize', fixSize);
          observer.disconnect();
        };

        if (!cancelled) setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        (mapRef.current as any).__cleanup?.();
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [locations]);

  // Pan/highlight when selectedRegion changes from outside the map (e.g. province buttons)
  useEffect(() => {
    if (status !== 'ready' || !mapRef.current) return;
    const loc = locations[selectedRegion];
    const marker = markersRef.current[selectedRegion];
    if (!loc || !marker) return;
    mapRef.current.flyTo([loc.lat, loc.lng], 8, { duration: 0.75 });
    marker.openPopup();
  }, [selectedRegion, status, locations]);

  if (status === 'error') {
    return (
      <div className="flex h-[420px] w-full flex-col items-center justify-center gap-3 border border-[#294256] bg-[#10283c] p-8 text-center">
        <MapPin size={28} className="text-[#d04a43]" />
        <p className="text-sm font-semibold text-[#fff7e8]">Map unavailable</p>
        <p className="max-w-sm text-xs text-[#becbd4]">
          Couldn't load the map tiles. Check your internet connection and refresh the page.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-[420px] w-full overflow-hidden border border-[#294256] md:h-[520px]">
      {status === 'loading' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#10283c]">
          <p className="text-xs uppercase tracking-wider text-[#7890a1]">Loading map…</p>
        </div>
      )}
      <div ref={mapContainerRef} className="h-full w-full" />
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('Limpopo');
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [showEstimator, setShowEstimator] = useState(false);

  // Quick Estimator State
  const [estService, setEstService] = useState('Mining Security');
  const [estDuration, setEstDuration] = useState('1-3 Months');

  const year = new Date().getFullYear();
  const closeMenu = () => setMenuOpen(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    if (!name || !email) {
      setFormError('Please add your name and email so our team can respond.');
      return;
    }
    setFormError('');
    setSubmitted(true);
    form.reset();
  };

  return (
    <div className="min-h-screen bg-[#07131e] text-[#fff7e8] font-sans antialiased selection:bg-[#a01c1c] selection:text-white">
      {/* Header Bar */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#07131e]/90 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5">
          <a href="#top" onClick={closeMenu} className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Reconcile Group logo" className="h-10 w-10 rounded-xl object-cover ring-1 ring-white/15 transition-transform group-hover:scale-105" />
            <div className="hidden sm:block">
              <span className="block text-xs font-bold uppercase tracking-[.18em] text-[#fff7e8]">Reconcile Group</span>
              <span className="block text-[9px] uppercase tracking-[.12em] text-[#d04a43]">Integrated Mining Services</span>
            </div>
          </a>

          <nav className={`${menuOpen ? 'absolute left-0 right-0 top-[76px] flex flex-col gap-6 border-b border-white/10 bg-[#07131e] p-6 shadow-2xl' : 'hidden'} md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0`}>
            {navItems.map(({ href, label, icon: Icon }) => (
              <a key={href} href={href} onClick={closeMenu} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.15em] text-[#fff7e8] transition-colors hover:text-[#d04a43]">
                <Icon size={15} className="text-[#d04a43]" />{label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowEstimator(true)}
              className="hidden items-center gap-1.5 border border-[#d04a43]/40 bg-[#d04a43]/10 px-3 py-2 text-xs font-semibold uppercase tracking-[.08em] text-[#e7b85e] hover:bg-[#d04a43]/20 xl:flex"
            >
              <Calculator size={14} /> Scope Estimator
            </button>
            <a href="tel:0145470989" className="hidden items-center gap-2 text-sm font-semibold lg:flex hover:text-[#d04a43] transition-colors">
              <Phone size={15} className="text-[#d04a43]" /> 014 547 0989
            </a>
            <a href="#contact" className="bg-[#a01c1c] px-5 py-3 text-xs font-semibold uppercase tracking-[.08em] transition-all hover:bg-[#c23b35] hover:shadow-lg hover:shadow-[#a01c1c]/20">
              Get a quote
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="border border-white/20 p-2 text-[#fff7e8] hover:bg-white/5 md:hidden" aria-label="Toggle menu">
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="relative flex min-h-[100dvh] items-end overflow-hidden border-b border-white/10 pt-[76px]">
          <HeroVideo />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07131e] via-[#07131e]/75 to-[#07131e]/40" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-20">
            <div className="mb-8 flex items-center gap-4">
              <img src="/logo.png" alt="Reconcile Group logo" className="h-24 w-24 rounded-2xl object-cover ring-1 ring-white/20 shadow-2xl md:h-28 md:w-28" />
              <div className="rounded-lg bg-black/40 px-3 py-1.5 backdrop-blur-md border border-white/10 hidden sm:block">
                <span className="text-[10px] font-mono tracking-widest text-[#e7b85e] uppercase">PSIRA Registered • SARS Compliant</span>
              </div>
            </div>

            <div className="mb-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.25em]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#d04a43] animate-pulse" />
              <span className="text-[#e7b85e]">South Africa</span>
              <span className="text-white/40">/</span>
              <span className="text-[#e7b85e]">On The Ground</span>
            </div>

            <h1 className="max-w-4xl text-[clamp(2.75rem,6.5vw,5.5rem)] font-extrabold leading-[0.92] tracking-tight">
              Mining Support,<br />
              <span className="text-[#e64a3a]">Security &amp;<br />Technical<br />Services</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-[#d9e0e5] font-normal">
              Reconcile Group is a South African black-owned company providing integrated security, mining support, engineering support, and infrastructure services to mining, industrial, construction, and public sectors. Combines trained personnel with thermal drone surveillance, AI-enabled CCTV, biometric access control, and real-time monitoring.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-3 bg-[#a01c1c] px-6 py-4 font-semibold uppercase tracking-[.08em] transition-all hover:-translate-y-0.5 hover:bg-[#c23b35] shadow-lg shadow-[#a01c1c]/25">
                Get a quote <ArrowDownRight size={18} />
              </a>
              <a href="#services" className="inline-flex items-center gap-3 border border-white/25 px-6 py-4 font-semibold uppercase tracking-[.08em] transition-all hover:border-white hover:bg-white/5">
                Explore capabilities <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative overflow-hidden bg-[#f2eee6] px-5 py-24 text-[#0a1929] md:py-32">
          <div
            className="absolute right-0 top-1/2 z-0 h-[80%] w-full max-w-xl -translate-y-1/2 bg-contain bg-right bg-no-repeat opacity-20 mix-blend-multiply pointer-events-none md:opacity-35"
            style={{ backgroundImage: 'url(/anpr.jpg)' }}
          />

          <div className="relative z-10 mx-auto max-w-7xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-[#d04a43]">The operating brief</p>
            <h2 className="max-w-3xl text-4xl font-bold uppercase leading-[.95] md:text-6xl">
              Company<br /><span className="text-[#d04a43]">About</span>
            </h2>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed md:text-2xl font-medium">
              Reconcile Group is a South African black-owned company providing integrated security, mining support, engineering support, and infrastructure services to mining, industrial, construction, and public sectors.
            </p>
            <p className="mt-6 max-w-2xl leading-relaxed text-[#52616e]">
              Our teams combine disciplined field execution with thermal drone surveillance, AI CCTV, biometric access control and real-time monitoring. The result is a single contractor who understands the pressure of a live mine site — from the gate to the plant, from mobilisation to close-out.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-[#c9c4b9] pt-8 md:grid-cols-4">
              <div>
                <span className="block text-3xl font-extrabold text-[#a01c1c] md:text-4xl">100%</span>
                <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-[#52616e]">Black Owned</span>
              </div>
              <div>
                <span className="block text-3xl font-extrabold text-[#a01c1c] md:text-4xl">24/7</span>
                <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-[#52616e]">Site Monitoring</span>
              </div>
              <div>
                <span className="block text-3xl font-extrabold text-[#a01c1c] md:text-4xl">5+</span>
                <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-[#52616e]">Provinces Active</span>
              </div>
              <div>
                <span className="block text-3xl font-extrabold text-[#a01c1c] md:text-4xl">Turnkey</span>
                <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-[#52616e]">Technical Execution</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services / Capabilities Section */}
        <section id="services" className="bg-[#0e2235] px-5 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-[#d04a43]">Integrated capabilities</p>
            <h2 className="max-w-3xl text-4xl font-bold uppercase leading-[.95] text-[#fff7e8] md:text-6xl">
              The right capability at every handover.
            </h2>
            <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => {
                const isExpanded = expandedService === service.number;
                return (
                  <article
                    key={service.number}
                    className={`border border-[#294256] bg-[#10283c] p-6 transition-all ${i === 0 ? 'lg:col-span-2' : ''} hover:border-[#d04a43]/50`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#7890a1] font-mono">{service.number} / 07</span>
                      <button
                        onClick={() => setExpandedService(isExpanded ? null : service.number)}
                        className="text-xs text-[#d04a43] hover:underline flex items-center gap-1 md:hidden"
                      >
                        {isExpanded ? 'Less info' : 'More info'} <ChevronDown size={14} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    <h3 className="mt-6 text-3xl font-bold uppercase leading-[.9] text-[#fff7e8]">{service.title}</h3>
                    <p className="mt-3 text-sm font-semibold text-[#d04a43]">{service.lead}</p>

                    <ul className={`mt-6 space-y-2 border-t border-[#294256] pt-4 ${isExpanded ? 'block' : 'block'}`}>
                      {service.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-[#becbd4]">
                          <Check size={15} className="mt-0.5 shrink-0 text-[#d04a43]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}

              <div className="flex min-h-[220px] flex-col justify-between border border-[#d04a43] bg-[#a01c1c] p-6 shadow-xl">
                <Zap size={28} className="text-[#fff7e8]" />
                <div>
                  <p className="text-3xl font-bold uppercase leading-[.9] text-[#fff7e8]">Need a tailored site solution?</p>
                  <p className="mt-2 text-xs text-[#ffd4c5]">Request an on-site risk and technical evaluation.</p>
                  <a href="#contact" className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[.12em] font-bold text-white underline underline-offset-4 hover:text-[#e7b85e]">
                    Talk to our team <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Geographic Reach & Sectors — full-bleed open-cast mine photo background, original light theme */}
        <section id="reach" className="relative overflow-hidden px-5 py-24 text-[#0a1929] md:py-32">
          {/* Background photo */}
          <img
            src="/open-cast.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="relative z-10 mx-auto max-w-7xl">
            <p className="mb-4 inline-block bg-[#f2eee6] px-3 py-1 text-xs font-bold uppercase tracking-[.22em] text-[#d04a43]">Where we work</p>
            <h2 className="inline-block bg-[#f2eee6] px-3 py-1 text-4xl font-bold uppercase leading-[.95] md:text-6xl">Close to the operation.</h2>

            <div className="mt-14 grid gap-14 md:grid-cols-2">
              <div className="bg-[#f2eee6]/95 p-6 shadow-lg backdrop-blur-sm">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[.08em] text-[#52616e]">
                  Active Operating Footprint <span className="text-xs font-normal text-[#a01c1c]">(Click province for focus)</span>
                </p>
                <div className="grid grid-cols-2 gap-4 border-l-2 border-[#a01c1c] pl-5 sm:grid-cols-3">
                  {regions.map((r, i) => {
                    const isSelected = selectedRegion === r;
                    return (
                      <button
                        key={r}
                        onClick={() => setSelectedRegion(r)}
                        className={`text-left border-b py-4 transition-all ${isSelected ? 'border-[#a01c1c] bg-[#e8e2d7]/60 px-2' : 'border-[#c9c4b9] hover:border-[#a01c1c]'}`}
                      >
                        <span className="text-xs text-[#a01c1c] font-mono">0{i + 1}</span>
                        <p className={`mt-1 font-semibold ${isSelected ? 'text-[#a01c1c]' : 'text-[#0a1929]'}`}>{r}</p>
                      </button>
                    );
                  })}
                </div>

                {selectedRegion && regionDetails[selectedRegion] && (
                  <div className="mt-6 rounded-lg bg-[#e8e2d7] p-5 border border-[#c9c4b9]">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#a01c1c]">
                      <MapPin size={15} />
                      <span>{selectedRegion} Strategic Operational Hub</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-[#0a1929]">{regionDetails[selectedRegion].base}</p>
                    <p className="mt-1 text-xs text-[#52616e]">{regionDetails[selectedRegion].focus}</p>
                  </div>
                )}
              </div>

              <div className="bg-[#f2eee6]/95 p-6 shadow-lg backdrop-blur-sm">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[.08em] text-[#52616e]">Sectors we serve</p>
                <div className="flex flex-wrap gap-2">
                  {industries.map((ind) => (
                    <span key={ind} className="border border-[#c9c4b9] bg-[#e8e2d7]/40 px-3.5 py-2.5 text-sm font-semibold text-[#0a1929] hover:border-[#a01c1c] transition-colors">
                      {ind}
                    </span>
                  ))}
                </div>

                <div className="mt-10 rounded-xl bg-[#e8e2d7] p-6 border border-[#c9c4b9]">
                  <h4 className="text-lg font-bold uppercase tracking-wider text-[#a01c1c]">Rapid Deployment Guarantee</h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#52616e]">
                    Equipped with mobile control units, drone teams, and rapid-response tactical teams ready for fast mobilization across Southern African mining corridors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Banner */}
        <section className="bg-[#a01c1c] px-5 py-24 text-[#fff7e8] md:py-32">
          <div className="mx-auto max-w-7xl grid gap-12 md:grid-cols-2">
            <h2 className="text-5xl font-bold uppercase leading-[.85] md:text-7xl">
              Built on<br />trust.
            </h2>
            <div className="grid gap-8 border-l border-[#d85a53] pl-8 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[.2em] text-[#ffd4c5]">Mission</p>
                <p className="text-lg font-semibold leading-snug">To deliver dependable, integrated services that protect people, enable production and strengthen the communities where we operate.</p>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[.2em] text-[#ffd4c5]">Vision</p>
                <p className="text-lg font-semibold leading-snug">To be the trusted South African operations partner for safer, smarter and more productive sites.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="bg-[#10283c] px-5 py-24 md:py-32 border-b border-white/10">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
            <div className="flex min-h-[300px] flex-col justify-end bg-[#0e2235] p-8 border border-[#294256] group hover:border-[#d04a43] transition-all">
              <ShieldCheck className="mb-5 text-[#d04a43] transition-transform group-hover:scale-110" size={38} />
              <p className="max-w-sm text-4xl font-bold uppercase leading-[.9]">Discipline you can see.</p>
              <p className="mt-4 text-xs text-[#becbd4] leading-relaxed">Vetted, highly-trained security officers and technical operators executing under strict compliance frameworks.</p>
            </div>
            <div className="flex min-h-[300px] flex-col justify-end bg-[#0e2235] p-8 border border-[#294256] group hover:border-[#d04a43] transition-all">
              <CircleCheck className="mb-5 text-[#d04a43] transition-transform group-hover:scale-110" size={38} />
              <p className="max-w-sm text-4xl font-bold uppercase leading-[.9]">Intelligence in the air.</p>
              <p className="mt-4 text-xs text-[#becbd4] leading-relaxed">Thermal aerial mapping, perimeter drone patrols, and AI CCTV analytics integrated with central risk command.</p>
            </div>
          </div>
        </section>

        {/* Locations Map Section */}
        <section id="locations" className="bg-[#0e2235] px-5 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-[#d04a43]">Find us on the map</p>
            <h2 className="max-w-3xl text-4xl font-bold uppercase leading-[.95] text-[#fff7e8] md:text-6xl">
              All operational hubs, one view.
            </h2>
            <p className="mt-6 max-w-2xl text-sm text-[#becbd4]">
              Every pin marks an active Reconcile Group hub. Click a pin — or a province below — to see the base and operational focus for that region.
            </p>

            <div className="mt-12">
              <LocationsMap
                locations={regionDetails}
                selectedRegion={selectedRegion}
                onSelectRegion={setSelectedRegion}
              />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {regions.map((r) => {
                const isSelected = selectedRegion === r;
                return (
                  <button
                    key={r}
                    onClick={() => setSelectedRegion(r)}
                    className={`flex items-center gap-2 border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                      isSelected
                        ? 'border-[#d04a43] bg-[#d04a43] text-white'
                        : 'border-[#294256] bg-[#10283c] text-[#becbd4] hover:border-[#d04a43]'
                    }`}
                  >
                    <MapPin size={13} />
                    {r}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-[#f2eee6] px-5 py-24 text-[#0a1929] md:py-32">
          <div className="mx-auto max-w-7xl grid gap-16 md:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-[#d04a43]">Start a conversation</p>
              <h2 className="text-4xl font-bold uppercase leading-[.95] md:text-5xl">Let's make the site stronger.</h2>
              <p className="mt-4 text-sm text-[#52616e] max-w-md">
                Get in touch with our operating directors directly to request a site visit, risk audit, or customized tender proposal.
              </p>
              <div className="mt-10 space-y-5 border-t border-[#c9c4b9] pt-6">
                <a href="tel:0145470989" className="flex items-center gap-4 font-semibold transition-colors hover:text-[#a01c1c]">
                  <Phone className="text-[#a01c1c]" size={19} />014 547 0989 <small className="text-[#52616e]">Tel</small>
                </a>
                <a href="tel:0646492868" className="flex items-center gap-4 font-semibold transition-colors hover:text-[#a01c1c]">
                  <Phone className="text-[#a01c1c]" size={19} />064 649 2868 <small className="text-[#52616e]">Cell</small>
                </a>
                <a href="https://wa.me/27615879808" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 font-semibold transition-colors hover:text-[#a01c1c]">
                  <WhatsAppIcon size={19} />061 587 9808 <small className="text-[#52616e]">WhatsApp</small>
                </a>
                <a href="mailto:tmaponyane@icloud.com" className="flex items-center gap-4 font-semibold transition-colors hover:text-[#a01c1c]">
                  <Mail className="text-[#a01c1c]" size={19} />tmaponyane@icloud.com
                </a>
                <div className="flex items-start gap-4 text-sm text-[#52616e]">
                  <MapPin className="mt-0.5 shrink-0 text-[#a01c1c]" size={19} />No. 2234 Kgokong Street, EXT 6, Northam, 0360
                </div>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="flex min-h-[420px] flex-col justify-center border border-[#b7b0a2] bg-[#e8e2d7] p-8 shadow-inner">
                  <CircleCheck size={48} className="mb-6 text-[#a01c1c]" />
                  <h3 className="text-4xl font-bold uppercase leading-[.9] md:text-5xl">Request received.</h3>
                  <p className="mt-6 max-w-md text-[#52616e] text-sm leading-relaxed">
                    Thank you for reaching out. T Maponyane and the Reconcile Group team will be in touch shortly to discuss your site requirements.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="mt-8 w-fit border-b-2 border-[#a01c1c] pb-1 text-xs font-bold uppercase tracking-wider text-[#a01c1c] hover:opacity-80">
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="border border-[#b7b0a2] bg-[#e8e2d7] p-8 shadow-lg">
                  <div className="mb-6 flex items-center justify-between border-b border-[#c9c4b9] pb-4">
                    <span className="text-[11px] uppercase tracking-[.16em] text-[#52616e] font-bold">Quote Request Form</span>
                    <Clock3 size={18} className="text-[#a01c1c]" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="text-sm font-semibold">Your name
                      <input name="name" required className="mt-2 w-full border border-[#c9c4b9] bg-white p-3 text-sm focus:border-[#a01c1c] focus:outline-none" placeholder="John Doe" />
                    </label>
                    <label className="text-sm font-semibold">Work email
                      <input type="email" name="email" required className="mt-2 w-full border border-[#c9c4b9] bg-white p-3 text-sm focus:border-[#a01c1c] focus:outline-none" placeholder="john@miningco.co.za" />
                    </label>
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <label className="text-sm font-semibold">Phone number
                      <input type="tel" name="phone" className="mt-2 w-full border border-[#c9c4b9] bg-white p-3 text-sm focus:border-[#a01c1c] focus:outline-none" placeholder="082 000 0000" />
                    </label>
                    <label className="text-sm font-semibold">Primary capability needed
                      <select name="capability" className="mt-2 w-full border border-[#c9c4b9] bg-white p-3 text-sm focus:border-[#a01c1c] focus:outline-none">
                        {services.map(s => <option key={s.number} value={s.title}>{s.title}</option>)}
                      </select>
                    </label>
                  </div>
                  <label className="mt-4 block text-sm font-semibold">How can we help?
                    <textarea name="message" rows={4} className="mt-2 w-full resize-none border border-[#c9c4b9] bg-white p-3 text-sm focus:border-[#a01c1c] focus:outline-none" placeholder="Detail your project timeline, location, and site requirements..." />
                  </label>
                  {formError && <p className="mt-3 text-sm font-semibold text-[#a01c1c]">{formError}</p>}
                  <button type="submit" className="mt-6 w-full bg-[#a01c1c] px-6 py-4 font-semibold uppercase tracking-[.08em] text-[#fff7e8] transition-all hover:bg-[#c23b35] shadow-md">
                    Send request
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Estimator Modal Drawer */}
      {showEstimator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm">
          <div className="relative w-full max-w-lg border border-white/20 bg-[#0e2235] p-8 text-[#fff7e8] shadow-2xl">
            <button
              onClick={() => setShowEstimator(false)}
              className="absolute right-4 top-4 p-2 text-white/60 hover:text-white"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-2 text-[#d04a43]">
              <Calculator size={20} />
              <span className="text-xs font-bold uppercase tracking-wider">Quick Scope Estimator</span>
            </div>
            <h3 className="mt-2 text-2xl font-bold uppercase">Configure Site Needs</h3>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-[#7890a1]">Select Service Type</label>
                <select
                  value={estService}
                  onChange={(e) => setEstService(e.target.value)}
                  className="mt-1 w-full border border-[#294256] bg-[#10283c] p-3 text-sm text-white focus:outline-none"
                >
                  {services.map(s => <option key={s.number} value={s.title}>{s.title}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#7890a1]">Estimated Duration</label>
                <select
                  value={estDuration}
                  onChange={(e) => setEstDuration(e.target.value)}
                  className="mt-1 w-full border border-[#294256] bg-[#10283c] p-3 text-sm text-white focus:outline-none"
                >
                  <option value="Ad-hoc / Emergency">Ad-hoc / Emergency Support</option>
                  <option value="1-3 Months">1 - 3 Months Project</option>
                  <option value="6-12 Months">6 - 12 Months Contract</option>
                  <option value="Long Term">Multi-Year Maintenance</option>
                </select>
              </div>

              <div className="mt-6 rounded-lg bg-[#10283c] p-4 border border-[#294256]">
                <span className="block text-[10px] uppercase text-[#7890a1]">Estimated Deployment Readiness</span>
                <span className="block text-lg font-bold text-[#e7b85e]">24 to 72 Hours Post-Audit</span>
                <p className="mt-1 text-xs text-[#becbd4]">Includes team mobilisation, HSE site onboarding, and equipment transport.</p>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <a
                href="#contact"
                onClick={() => setShowEstimator(false)}
                className="flex-1 bg-[#a01c1c] py-3 text-center text-xs font-bold uppercase tracking-wider text-white hover:bg-[#c23b35]"
              >
                Proceed to Request
              </a>
              <button
                onClick={() => setShowEstimator(false)}
                className="border border-white/20 px-4 py-3 text-xs font-bold uppercase hover:bg-white/5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Floating Button */}
      <WhatsAppFloat />

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#081521] px-5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Reconcile Group logo" className="h-10 w-10 rounded-xl object-cover" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[.15em] text-[#fff7e8]">Reconcile Group</p>
              <p className="mt-1 text-[10px] uppercase tracking-[.12em] text-[#d04a43]">Mining Support, Security &amp; Technical Services</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-xs uppercase tracking-[.12em] text-[#728493] md:items-end">
            <span>© {year} Reconcile Security Services (Pty) Ltd</span>
            <span>Reg: 2020/724821/07 · Tax: 9620013194</span>
            <span>Northam, Limpopo · South Africa</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
