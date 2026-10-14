import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ArrowDown,
  Plus,
  Download,
  Menu,
  X,
  Mail,
  Send,
  Instagram,
  Youtube,
  Phone,
} from "lucide-react";

import hero from "@/assets/hero.jpg";
import skyline from "@/assets/skyline.jpg";
import interior from "@/assets/interior.jpg";
import arch from "@/assets/arch.jpg";
import villa from "@/assets/villa.jpg";
import townhouse from "@/assets/townhouse.jpg";
import golf from "@/assets/golf.jpg";
import agents from "@/assets/agents.jpg";

const NAV = ["Home", "Our Properties", "Our Advantages", "Our Services", "Contact"];

const PROPERTIES = [
  { img: skyline, name: "Azure Heights Luxury Residences" },
  { img: interior, name: "Marina Crest Apartments" },
  { img: villa, name: "Palm Shore Villas" },
  { img: townhouse, name: "Creek Townhouses" },
];

const SERVICES = [
  {
    img: skyline,
    title: "Market Analysis",
    text: "Deep data on prices, rental yields and demand across every Dubai district.",
  },
  {
    img: interior,
    title: "Property Selection",
    text: "A curated shortlist that matches your goals, budget and lifestyle.",
  },
  {
    img: townhouse,
    title: "Legal Support",
    text: "Contracts, registration and title deeds handled end to end.",
  },
  {
    img: villa,
    title: "Property Management",
    text: "Tenants, maintenance and payouts — fully managed for you.",
  },
];

const ADVANTAGES = [
  [
    "Diversity",
    "Approximately 90% of Dubai's population consists of expatriates, creating a truly global community.",
  ],
  [
    "Safety",
    "Dubai consistently ranks among the safest cities in the world for residents and visitors.",
  ],
  [
    "Stable Currency",
    "The dirham is pegged to the US dollar, ensuring stability and confidence in transactions.",
  ],
  [
    "Resident Visa Opportunities",
    "Investing in real estate from AED 750,000 grants eligibility for a residence visa.",
  ],
  [
    "Profit Tax Exemption for Residents",
    "No income tax on rental profits for individual property owners.",
  ],
  [
    "Low Mortgage Rates",
    "Competitive financing from local banks, starting from around 4% per year.",
  ],
  [
    "Remote Property Acquisition",
    "Buy, sign and register without visiting — everything can be done online.",
  ],
];

const TYPES = [
  { img: villa, name: "Luxury Villas" },
  { img: interior, name: "Penthouse Suites" },
  { img: skyline, name: "Apartments" },
  { img: hero, name: "Beachfront Properties" },
  { img: golf, name: "Golf Course Residences" },
  { img: townhouse, name: "Townhouses" },
  { img: arch, name: "Waterfront Homes" },
  { img: villa, name: "Holiday Homes" },
  { img: interior, name: "Commercial Spaces" },
  { img: townhouse, name: "Investment" },
  { img: golf, name: "Eco-friendly Properties" },
  { img: arch, name: "Desert Retreats" },
];

const FAQ = [
  [
    "What types of properties do we offer in Dubai?",
    "Apartments, villas, townhouses, penthouses and commercial spaces — both off-plan and ready.",
  ],
  [
    "What are the payment options available for purchasing a property?",
    "Cash, mortgage, and developer installment plans of up to 5 years with 0% interest.",
  ],
  [
    "Can foreign nationals buy property in Dubai?",
    "Yes. Foreigners can buy freehold property in designated areas with full ownership rights.",
  ],
  [
    "What is the process for obtaining a residency visa through property investment?",
    "Purchase property worth AED 750,000+, then apply through DLD — we guide you through each step.",
  ],
  [
    "Are there any additional costs associated with property ownership in Dubai?",
    "A 4% DLD registration fee, agency fee and annual service charges apply.",
  ],
  [
    "Do we offer property management services for rental properties?",
    "Yes, full management: tenant search, maintenance, rent collection and reporting.",
  ],
  [
    "Can we assist with property financing for non-resident buyers?",
    "We work with partner banks offering mortgages to non-residents.",
  ],
];

const PARTNERS = ["DAMAC", "EMAAR", "NAKHEEL", "SOBHA", "MERAAS", "ALDAR", "AZIZI"];

function Pill({
  children,
  dark = false,
  className = "",
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <a
      href="#contact"
      className={`group inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-xs font-medium transition-transform duration-300 hover:scale-[1.04] ${
        dark ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
      } ${className}`}
      style={{ color: "#fff" }}
    >
      <span
        className={`grid h-6 w-6 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-45 ${dark ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"}`}
      >
        <ArrowUpRight size={13} />
      </span>
      {children}
    </a>
  );
}

function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="hdr absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 md:px-8">
      <a href="#top" className="logo " aria-label="Monte Real Estate">
        <svg width="22" height="24" viewBox="0 0 22 24" aria-hidden="true">
          <g fill="currentColor" opacity=".85">
            <rect x="1" y="12" width="2" height="12"></rect>
            <rect x="5" y="6" width="2" height="18"></rect>
            <rect x="9" y="1" width="2" height="23"></rect>
            <rect x="13" y="8" width="2" height="16"></rect>
            <rect x="17" y="14" width="2" height="10"></rect>
          </g>
        </svg>
        <span className="logo__txt">
          <b>MONTE</b>
          <i>REAL ESTATE</i>
        </span>
      </a>
      <div className="flex items-center gap-2">
        <a
          href="tel:+971"
          className="hidden h-10 w-10 place-items-center rounded-full bg-muted transition hover:bg-border sm:grid"
        >
          <Phone size={15} />
        </a>
        <button
          onClick={onMenu}
          aria-label="Open menu"
          className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground transition hover:scale-110"
        >
          <Menu size={16} />
        </button>
      </div>
    </header>
  );
}

function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(ref.current, { display: "flex" })
        .fromTo(
          ".m-bg",
          { clipPath: "circle(0% at 100% 0%)" },
          { clipPath: "circle(150% at 100% 0%)", duration: 0.9, ease: "power3.inOut" },
        )
        .fromTo(
          ".m-link span",
          { yPercent: 110 },
          { yPercent: 0, stagger: 0.07, duration: 0.7, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(".m-foot", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4");
    }, ref);
    return () => ctx.revert();
  }, []);
  useEffect(() => {
    if (!tl.current) return;
    if (open) tl.current.timeScale(1).play();
    else tl.current.timeScale(1.6).reverse();
  }, [open]);
  return (
    <div ref={ref} className="fixed inset-0 z-50 hidden">
      <div className="m-bg absolute inset-0 bg-ink text-ink-foreground" />
      <div className="relative flex w-full flex-col justify-between p-5 text-ink-foreground md:p-10">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold tracking-[0.4em]">MONTE</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-10 w-10 place-items-center rounded-full bg-ink-foreground text-ink transition hover:rotate-90"
          >
            <X size={16} />
          </button>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map((n, i) => (
            <a
              key={n}
              href={`#${n.toLowerCase().replace(/\s/g, "-")}`}
              onClick={onClose}
              className="m-link group flex items-baseline gap-4 overflow-hidden"
            >
              <span className="inline-block text-5xl font-light tracking-tight transition-colors md:text-8xl group-hover:text-muted-foreground">
                <sup className="mr-3 text-xs opacity-50">0{i + 1}</sup>
                {n}
              </span>
            </a>
          ))}
        </nav>
        <div className="m-foot flex flex-wrap items-end justify-between gap-4 text-xs opacity-70">
          <p>123 Zayed Road, Dubai Marina, UAE</p>
          <p>hello@monte.ae</p>
        </div>
      </div>
    </div>
  );
}

const SLIDES = [
  {
    img: hero,
    alt: "Burj Al Arab on Dubai beach",
    a: "More than 1800 real estate properties",
    b: "From $165,000 with a yield of 9% per annum",
  },
  {
    img: villa,
    alt: "Luxury villa in Dubai",
    a: "Private villas with sea views",
    b: "Interest-free installments up to 5 years",
  },
  {
    img: golf,
    alt: "Golf course residences",
    a: "Golf course residences",
    b: "From $240,000 with 8% rental yield",
  },
  {
    img: townhouse,
    alt: "Modern townhouses",
    a: "Family townhouses in gated communities",
    b: "Initial payment from $25,000",
  },
];

function HeroSlider() {
  const wrap = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const busy = useRef(false);

  const go = (next: number) => {
    const el = wrap.current;
    if (!el || busy.current || next === cur) return;
    busy.current = true;
    const slides = el.querySelectorAll<HTMLElement>(".hs-slide");
    const inEl = slides[next]!,
      outEl = slides[cur]!;
    gsap.set(slides, { zIndex: 0 });
    gsap.set(outEl, { zIndex: 1 });
    gsap.set(inEl, { zIndex: 2, clipPath: "inset(0 0 0 100%)" });
    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: () => {
        busy.current = false;
      },
    });
    tl.to(inEl, { clipPath: "inset(0 0 0 0%)", duration: 1.2 })
      .fromTo(
        inEl.querySelector("img"),
        { scale: 1.3, xPercent: 8 },
        { scale: 1, xPercent: 0, duration: 1.6, ease: "power3.out" },
        0,
      )
      .to(outEl.querySelector("img"), { xPercent: -12, duration: 1.2 }, 0)
      .to(
        el.querySelectorAll(".hs-cap"),
        { yPercent: -110, opacity: 0, duration: 0.4, ease: "power2.in" },
        0,
      )
      .add(() => setCur(next), 0.45)
      .fromTo(
        el.querySelectorAll(".hs-cap"),
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: "power3.out" },
        0.5,
      )
      .set(outEl.querySelector("img"), { xPercent: 0 });
  };

  useEffect(() => {
    const t = setTimeout(() => go((cur + 1) % SLIDES.length), 4500);
    return () => clearTimeout(t);
  });

  const s = SLIDES[cur]!;
  return (
    <div ref={wrap} className="hero-img relative min-h-[60svh] overflow-hidden rounded-2xl">
      {SLIDES.map((sl, i) => (
        <div
          key={i}
          className="hs-slide absolute inset-0 overflow-hidden"
          style={{ zIndex: i === 0 ? 2 : 0 }}
        >
          <img
            src={sl.img}
            alt={sl.alt}
            width={1024}
            height={1280}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      ))}
      <div className="relative z-10 flex justify-between gap-4 p-5 text-xs text-primary-foreground md:p-6">
        <p className="max-w-[9rem] overflow-hidden">
          <span className="hs-cap block">{s.a}</span>
        </p>
        <p className="hidden max-w-[10rem] overflow-hidden sm:block">
          <span className="hs-cap block">{s.b}</span>
        </p>
        <button
          aria-label="Next slide"
          onClick={() => go((cur + 1) % SLIDES.length)}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-card text-foreground transition hover:rotate-90"
        >
          <Plus size={14} />
        </button>
      </div>
      <div className="absolute bottom-6 left-5 z-10 flex gap-2 md:left-6">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => go(i)}
            className="h-1 w-8 overflow-hidden rounded-full bg-card/40"
          >
            <span
              key={cur}
              className="block h-full bg-card"
              style={{
                width: i < cur ? "100%" : i === cur ? undefined : "0%",
                animation: i === cur ? "hsfill 4.5s linear forwards" : undefined,
              }}
            />
          </button>
        ))}
      </div>
      <a
        href="#"
        className="absolute bottom-5 right-5 z-10 flex items-center gap-3 rounded-xl bg-card px-4 py-2.5 text-[11px] leading-tight transition hover:-translate-y-1"
      >
        <span>
          catalog
          <br />
          download
        </span>
        <Download size={14} />
      </a>
    </div>
  );
}

export function OldHero({ onMenu }: { onMenu: () => void }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(".hero-img", { clipPath: "inset(100% 0 0 0 round 16px)", scale: 1.2, duration: 1.4 })
        .from(".hero-line span", { yPercent: 110, stagger: 0.1, duration: 1 }, "-=0.9")
        .from(".hdr, .hero-meta", { opacity: 0, y: -15, stagger: 0.08, duration: 0.7 }, "-=0.6");
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={ref}
      id="home"
      className="hero relative mb-[10px] grid min-h-[100svh] gap-3 md:grid-cols-2"
      style={{ fontFamily: "Manrope, system-ui, sans-serif" }}
    >
      <div className="relative flex min-h-[70svh] flex-col justify-center rounded-2xl bg-card px-6 pb-24 pt-28 md:px-12">
        <Header onMenu={onMenu} />
        <p className="hero-meta mb-4 text-xs text-muted-foreground">Building Your Dreams</p>
        <h1 className="max-w-xl text-4xl font-normal leading-[1.08] tracking-tight md:text-6xl">
          {["Real Estate in Dubai:", "Ideal for Living and", "Investing"].map((l) => (
            <span key={l} className="hero-line block overflow-hidden pb-[0.12em] -mb-[0.12em]">
              <span className="block">{l}</span>
            </span>
          ))}
        </h1>
        <div className="hero-meta absolute inset-x-6 bottom-6 flex items-center justify-between md:inset-x-12">
          <Pill dark>Contact Us Now</Pill>
          <div className="flex items-center gap-3 text-[11px] leading-tight text-muted-foreground">
            <span>
              Explore All
              <br />
              Our Properties
            </span>
            <img src={interior} alt="" className="h-10 w-10 rounded-full object-cover" />
          </div>
        </div>
      </div>
      <HeroSlider />
    </section>
  );
}

export default function MonteLanding() {
  const root = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState(false);
  const [tab, setTab] = useState(0);
  const [svc, setSvc] = useState<number | null>(0);
  const [faq, setFaq] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Intro
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(".hero-img", { clipPath: "inset(100% 0 0 0 round 16px)", scale: 1.2, duration: 1.4 })
        .from(".hero-line span", { yPercent: 110, stagger: 0.1, duration: 1 }, "-=0.9")
        .from(".hdr, .hero-meta", { opacity: 0, y: -15, stagger: 0.08, duration: 0.7 }, "-=0.6");

      gsap.to(".hero-img img", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });

      // Expanding skyline
      gsap.fromTo(
        ".expand",
        { clipPath: "inset(0 18% 0 18% round 18px)" },
        {
          clipPath: "inset(0 0% 0 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: ".expand-wrap", start: "top 85%", end: "top 10%", scrub: true },
        },
      );
      gsap.to(".mq-a", { xPercent: -50, ease: "none", duration: 22, repeat: -1 });
      gsap.to(".mq-b", { xPercent: -50, ease: "none", duration: 30, repeat: -1 });
      gsap.to(".mq-partners", { xPercent: -50, ease: "none", duration: 25, repeat: -1 });

      // Generic reveals
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".stagger").forEach((el) => {
        gsap.from(el.children, {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".img-zoom").forEach((el) => {
        gsap.fromTo(
          el.querySelector("img"),
          { scale: 1.25 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      // Circles: pinned merge
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".circles",
              start: "top top",
              end: "+=1400",
              scrub: 1,
              pin: true,
            },
          })
          .to(".c-1", { x: "100%", y: "-30%" }, 0)
          .to(".c-3", { x: "-100%", y: "-30%" }, 0)
          .to(".c-2", { y: "30%" }, 0)
          .to(".c-txt", { opacity: 0, duration: 0.3 }, 0)
          .to(".c-1, .c-3", { x: (i) => (i === 0 ? "100%" : "-100%"), y: "0%", opacity: 0 }, 0.6)
          .to(".c-2", { y: "0%", scale: 0.8 }, 0.6)
          .from(".c-final", { opacity: 0, scale: 0.8 }, 0.8);
      });
      mm.add("(max-width: 767px)", () => {
        gsap.from(".c-item", {
          scale: 0.6,
          opacity: 0,
          stagger: 0.15,
          scrollTrigger: { trigger: ".circles", start: "top 70%" },
        });
      });

      // Masonry columns parallax
      gsap.utils.toArray<HTMLElement>(".mcol").forEach((col, i) => {
        gsap.fromTo(
          col,
          { y: i % 2 ? 120 : -40 },
          {
            y: i % 2 ? -120 : 40,
            ease: "none",
            scrollTrigger: {
              trigger: ".masonry",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // Count-up
      gsap.utils.toArray<HTMLElement>(".count").forEach((el) => {
        const end = Number(el.dataset["to"]);
        const o = { v: 0 };
        gsap.to(o, {
          v: end,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = Math.round(o.v) + (el.dataset["suffix"] || "");
          },
        });
      });

      // Agents image grow
      gsap.fromTo(
        ".agents",
        { clipPath: "inset(0 15% 0 15% round 20px)" },
        {
          clipPath: "inset(0 0% 0 0% round 20px)",
          ease: "none",
          scrollTrigger: {
            trigger: ".agents",
            start: "top 90%",
            end: "center center",
            scrub: true,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".prop-card",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power3.out" },
    );
  }, [tab]);

  const marq = "with an initial payment from $25,000 • interest-free • ";
  const props =
    tab === 0
      ? PROPERTIES
      : tab === 1
        ? [...PROPERTIES].reverse()
        : [2, 0, 3, 1].map((k) => PROPERTIES[k]!);

  return (
    <div ref={root} className="bg-background text-foreground">
      <MenuOverlay open={menu} onClose={() => setMenu(false)} />

      {/* HERO */}
      <section id="home" className="hero relative grid min-h-[100svh] gap-3 p-3 md:grid-cols-2">
        <div className="relative flex min-h-[70svh] flex-col justify-center rounded-2xl bg-card px-6 pb-24 pt-28 md:px-12">
          <Header onMenu={() => setMenu(true)} />
          <p className="hero-meta mb-4 text-xs text-muted-foreground">Building Your Dreams</p>
          <h1 className="max-w-xl text-4xl font-normal leading-[1.08] tracking-tight md:text-6xl">
            {["Real Estate in Dubai:", "Ideal for Living and", "Investing"].map((l) => (
              <span key={l} className="hero-line block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                <span className="block">{l}</span>
              </span>
            ))}
          </h1>
          <div className="hero-meta absolute inset-x-6 bottom-6 flex items-center justify-between md:inset-x-12">
            <Pill dark>Contact Us Now</Pill>
            <div className="flex items-center gap-3 text-[11px] leading-tight text-muted-foreground">
              <span>
                Explore All
                <br />
                Our Properties
              </span>
              <img src={interior} alt="" className="h-10 w-10 rounded-full object-cover" />
            </div>
          </div>
        </div>
        <HeroSlider />
      </section>

      {/* EXPANDING SKYLINE + MARQUEE */}
      <section className="expand-wrap py-10">
        <div className="expand relative h-[70svh] overflow-hidden">
          <img
            src={skyline}
            alt="Dubai Marina skyline"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/30" />
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden">
            <div className="mq-a marquee-track whitespace-nowrap text-3xl font-medium text-primary-foreground md:text-6xl">
              <span className="pr-4">{marq.repeat(3)}</span>
              <span className="pr-4">{marq.repeat(3)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section
        id="our-properties"
        className="mx-3 rounded-2xl bg-ink p-5 text-ink-foreground md:p-8"
      >
        <div className="reveal mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl tracking-tight md:text-5xl">Explore Our Property Portfolio</h2>
          <div className="flex gap-1 rounded-full bg-ink-soft p-1 text-xs">
            {["Apartments", "Villas", "For Rent"].map((t, i) => (
              <button
                key={t}
                onClick={() => setTab(i)}
                className={`rounded-full px-4 py-1.5 transition ${tab === i ? "bg-ink-foreground text-ink" : "opacity-70 hover:opacity-100"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {props.map((p, i) => (
            <a
              href="#"
              key={p.name + i}
              className="prop-card img-zoom group relative aspect-[4/3] overflow-hidden rounded-xl"
            >
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-card/30 backdrop-blur transition group-hover:rotate-45 group-hover:bg-card group-hover:text-foreground">
                <ArrowUpRight size={15} />
              </span>
              <p className="absolute bottom-4 left-4 text-sm font-medium">{p.name}</p>
            </a>
          ))}
        </div>
        <div className="reveal mt-6 flex flex-wrap items-center justify-between gap-4">
          <Pill>All Properties</Pill>
          <div className="flex items-center gap-3 text-xs opacity-70">
            <span>
              Don't Miss Out on Hot Deals
              <br />
              Follow Us on Social Media
            </span>
            {[Youtube, Instagram, Send].map((I, k) => (
              <span key={k} className="grid h-8 w-8 place-items-center rounded-full bg-ink-soft">
                <I size={13} />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="our-services"
        className="m-3 overflow-hidden rounded-2xl bg-ink pt-10 text-ink-foreground"
      >
        <div className="grid gap-8 px-5 md:grid-cols-2 md:px-10">
          <div className="reveal">
            <h2 className="text-3xl leading-tight tracking-tight md:text-5xl">
              Tailored Solutions
              <br />
              for Your Real Estate Needs
            </h2>
            <a href="#" className="mt-4 inline-flex items-center gap-2 text-xs opacity-70">
              • Explore More →
            </a>
          </div>
          <div className="stagger flex flex-col gap-3">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className="overflow-hidden rounded-[2rem] bg-card text-card-foreground"
              >
                <button
                  onClick={() => setSvc(svc === i ? null : i)}
                  className="flex w-full items-center gap-4 p-2 pr-5 text-left"
                >
                  <img
                    src={s.img}
                    alt=""
                    loading="lazy"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <span className="flex-1 text-sm font-medium">
                    {s.title} <sup className="text-muted-foreground">0{i + 1}</sup>
                  </span>
                  <ArrowDown
                    size={16}
                    className={`transition-transform duration-500 ${svc === i ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-500 ${svc === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <p className="overflow-hidden px-6 text-sm text-muted-foreground">
                    <span className="block pb-5">{s.text}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 overflow-hidden pb-6">
          <div className="mq-b marquee-track gap-4 whitespace-nowrap">
            {[0, 1].map((k) => (
              <div key={k} className="flex gap-4">
                {[
                  "INVESTMENT FROM ALMATY",
                  "0% COMMISSION",
                  "GOLDEN VISA",
                  "5 YEAR INSTALLMENTS",
                ].map((t) => (
                  <span
                    key={t}
                    className="outline-text rounded-full bg-ink-soft px-8 py-3 text-4xl font-semibold md:text-7xl"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CIRCLES */}
      <section className="circles mx-3 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden rounded-2xl bg-ink px-5 py-16 text-ink-foreground">
        <h2 className="mb-12 text-center text-3xl tracking-tight md:text-5xl">
          Path to Smart Ownership
        </h2>
        <div className="relative flex flex-col items-center md:flex-row">
          {["10% Initial Payment", "5 years installment 0% overpayment", "Rental income – 15%"].map(
            (t, i) => (
              <div
                key={t}
                className={`c-item c-${i + 1} -my-4 grid h-56 w-56 place-items-center rounded-full border border-ink-foreground/40 p-8 text-center text-xs md:-mx-6 md:my-0 md:h-80 md:w-80 md:text-sm`}
              >
                <span className="c-txt">{t}</span>
              </div>
            ),
          )}
          <div className="c-final pointer-events-none absolute inset-0 hidden flex-col items-center justify-center gap-6 md:flex">
            <p className="text-center text-sm">
              Smart
              <br />
              Ownership
            </p>
          </div>
        </div>
        <div className="mt-12">
          <Pill>Catalog Download</Pill>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="our-advantages" className="px-5 py-24 md:px-10">
        <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs text-muted-foreground">• Explore Our Advantages</p>
            <h2 className="text-3xl leading-tight tracking-tight md:text-5xl">
              Why Dubai Stands
              <br />
              Unrivalled?
            </h2>
          </div>
          <Pill dark>Contact Us Now</Pill>
        </div>
        <div className="stagger grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map(([t, d], i) => (
            <div key={t} className="border-t border-border pt-5">
              <span className="text-xs text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-3 text-base font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MASONRY */}
      <section className="masonry overflow-hidden px-3 pb-24">
        <h2 className="reveal mb-16 text-center text-3xl leading-tight tracking-tight md:text-5xl">
          Discover Your Ideal
          <br />
          Property Type
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
          {[0, 1, 2, 3, 4, 5].map((c) => (
            <div
              key={c}
              className={`mcol flex flex-col gap-3 ${c > 3 ? "hidden lg:flex" : c > 1 ? "hidden md:flex" : ""}`}
            >
              {TYPES.filter((_, i) => i % 6 === c)
                .concat(TYPES.filter((_, i) => (i + 3) % 6 === c))
                .map((t, k) => (
                  <a
                    href="#"
                    key={t.name + k}
                    className="group relative overflow-hidden rounded-xl"
                    style={{ aspectRatio: k % 2 ? "3/4" : "4/5" }}
                  >
                    <img
                      src={t.img}
                      alt={t.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                    <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-card/30 text-primary-foreground backdrop-blur transition group-hover:rotate-45">
                      <ArrowUpRight size={13} />
                    </span>
                    <p className="absolute bottom-3 left-3 text-lg leading-tight text-primary-foreground">
                      {t.name}
                    </p>
                  </a>
                ))}
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-16">
        <p className="mb-10 text-center text-sm">Our valued partners</p>
        <div className="overflow-hidden">
          <div className="mq-partners marquee-track">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span
                key={i}
                className="px-12 text-2xl font-semibold tracking-[0.2em] text-muted-foreground transition hover:text-foreground md:px-20"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="grid gap-3 p-3 md:grid-cols-2">
        <div className="flex flex-col justify-between rounded-2xl bg-card p-6 md:p-12">
          <div className="reveal">
            <p className="max-w-sm text-sm text-muted-foreground">
              At Monte Properties, we offer more than just real estate services; we provide an
              unparalleled experience tailored to meet your needs and exceed your expectations.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-3">
                {[agents, interior, villa, townhouse].map((s, i) => (
                  <img
                    key={i}
                    src={s}
                    alt=""
                    className="h-10 w-10 rounded-full border-2 border-card object-cover"
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                Meet Our
                <br />
                Professional Team
              </span>
            </div>
          </div>
          <div className="mt-16 divide-y divide-border">
            {[
              [89, "+", "Successful Transactions Monthly"],
              [87, "%", "Customer Satisfaction Rate"],
              [445, "", "Exquisite Properties Ready for Your Selection"],
            ].map(([n, s, l]) => (
              <div key={l as string} className="reveal flex items-center gap-10 py-6">
                <span
                  className="count w-32 text-5xl font-light md:text-6xl"
                  data-to={n}
                  data-suffix={s}
                >
                  0
                </span>
                <span className="max-w-[12rem] text-sm">{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="img-zoom relative min-h-[80svh] overflow-hidden rounded-2xl">
          <img
            src={arch}
            alt="Arch framing Burj Khalifa"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute right-5 top-5">
            <Pill>Contact Us Now</Pill>
          </div>
          <p className="absolute bottom-6 left-6 text-xs text-primary-foreground">
            Building Your Dreams
          </p>
          <div className="absolute bottom-5 right-5 flex items-center gap-3 rounded-xl bg-card p-3 text-xs">
            <img src={agents} alt="" className="h-9 w-9 rounded-full object-cover" />
            <span>
              Get The Consultation
              <br />
              With Our Expert
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="grid gap-10 bg-muted px-5 py-24 md:grid-cols-[1fr_1.4fr] md:px-10">
        <div className="reveal">
          <p className="mb-3 text-xs text-muted-foreground">• Explore Our Advantages</p>
          <h2 className="text-3xl leading-tight tracking-tight md:text-5xl">
            Frequent Asked
            <br />
            Questions
          </h2>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            At Monte, we offer more than just real estate services; we provide an experience
            tailored to your needs.
          </p>
        </div>
        <div className="stagger rounded-2xl bg-card p-4 md:p-6">
          {FAQ.map(([q, a], i) => (
            <div key={q} className="border-b border-border last:border-0">
              <button
                onClick={() => setFaq(faq === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm"
              >
                {q}
                <Plus
                  size={16}
                  className={`shrink-0 transition-transform duration-500 ${faq === i ? "rotate-45" : ""}`}
                />
              </button>
              <div
                className={`grid transition-all duration-500 ${faq === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <p className="overflow-hidden text-sm text-muted-foreground">
                  <span className="block pb-4">{a}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AGENTS IMAGE */}
      <section className="bg-background px-3 py-20">
        <div className="agents mx-auto aspect-[16/8] max-w-6xl overflow-hidden">
          <img
            src={agents}
            alt="Agent with client"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="grid gap-12 px-5 pb-10 pt-6 md:grid-cols-3 md:px-10">
        <div className="reveal">
          <p className="text-sm font-semibold tracking-[0.4em]">MONTE</p>
          <p className="mt-2 text-xs text-muted-foreground">Building Your Dreams In Real Estate</p>
          <p className="mt-16 text-sm font-medium">Subscribe to our news</p>
          <p className="mt-1 text-xs text-muted-foreground">Stay informed and never miss a deal.</p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-5 flex flex-col items-start gap-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full max-w-xs border-b border-border bg-transparent py-2 text-sm outline-none focus:border-foreground"
            />
            <button className="rounded-full bg-primary px-5 py-2 text-xs text-primary-foreground transition hover:scale-105">
              Subscribe
            </button>
          </form>
        </div>
        <div className="reveal">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            {NAV.slice(0, 4).map((n) => (
              <a
                key={n}
                href={`#${n.toLowerCase().replace(/\s/g, "-")}`}
                className="w-fit transition hover:translate-x-1"
              >
                {n}
              </a>
            ))}
          </nav>
          <p className="mt-16 text-xs text-muted-foreground">
            123 Zayed Road,
            <br />
            Dubai Marina,
            <br />
            Dubai, United Arab Emirates
          </p>
        </div>
        <div className="reveal flex flex-col justify-between">
          <div>
            <p className="text-lg leading-tight">
              We are here to change
              <br />
              your future.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <a
                href="mailto:hello@monte.ae"
                className="rounded-full bg-primary px-4 py-2 text-xs text-primary-foreground"
              >
                Contact Us
              </a>
              <Mail size={16} />
              <Send size={16} />
            </div>
          </div>
          <div className="mt-16 text-xs text-muted-foreground">
            <p>Copyright 2026 © Monte Properties</p>
            <p className="mt-2 flex gap-4">
              <a href="#">Terms Of Service</a>
              <a href="#">Privacy Policy</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
