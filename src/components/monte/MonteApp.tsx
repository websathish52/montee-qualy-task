/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import hero from "@/assets/hero.jpg";
import skyline from "@/assets/skyline.jpg";
import interior from "@/assets/interior.jpg";
import arch from "@/assets/arch.jpg";
import villa from "@/assets/villa.jpg";
import townhouse from "@/assets/townhouse.jpg";
import golf from "@/assets/golf.jpg";
import agents from "@/assets/agents.jpg";
import "./monte.css";
import { OldHero } from "@/components/MonteLanding";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// shared Lenis instance (menu uses it to stop / scroll)
const smooth = { lenis: null };

/* ================= ICONS + LOGO ================= */
const mk = (paths, { fill = "none" } = {}) =>
  function Icon({ size = 18, className = "" }) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={fill === "none" ? "currentColor" : "none"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {paths}
      </svg>
    );
  };

const MapIcon = mk(
  <>
    <path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4Z" />
    <path d="M9 4v13M15 6.5v13" />
  </>,
);
const MenuIcon = mk(
  <>
    <path d="M4 7h16M8 12h12M12 17h8" />
  </>,
);
const CloseIcon = mk(
  <>
    <path d="M5 5l14 14M19 5 5 19" />
  </>,
);
const HeartIcon = mk(
  <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.600-7 10-7 10Z" />,
);
const HomeIcon = mk(
  <>
    <path d="M4 11 12 4l8 7" />
    <path d="M6 10v9h12v-9" />
    <path d="M10 19v-5h4v5" />
  </>,
);
const SearchIcon = mk(
  <>
    <circle cx="11" cy="11" r="6" />
    <path d="m20 20-4.200-4.200" />
  </>,
);
const ArrowUpRight = mk(
  <>
    <path d="M7 17 17 7M8 7h9v9" />
  </>,
);
const ArrowRight = mk(
  <>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </>,
);
const ArrowDown = mk(
  <>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </>,
);
const DownloadIcon = mk(
  <>
    <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
  </>,
);
const PhoneIcon = mk(
  <path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />,
);
const PlusIcon = mk(<path d="M12 5v14M5 12h14" />);
const PinIcon = mk(
  <>
    <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.500" />
  </>,
);
const UsersIcon = mk(
  <>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3.500 2.700-6 6-6s6 2.500 6 6" />
    <circle cx="17" cy="9" r="2.200" />
    <path d="M16 14c3 0 5 2 5 5" />
  </>,
);
const ShieldIcon = mk(<path d="M12 3 5 6v6c0 4.500 3 7.500 7 9 4-1.500 7-4.500 7-9V6l-7-3Z" />);
const CoinsIcon = mk(
  <>
    <ellipse cx="12" cy="6" rx="7" ry="3" />
    <path d="M5 6v6c0 1.700 3.100 3 7 3s7-1.300 7-3V6M5 12v6c0 1.700 3.100 3 7 3s7-1.300 7-3v-6" />
  </>,
);
const FileIcon = mk(
  <>
    <path d="M7 3h7l4 4v14H7V3Z" />
    <path d="M14 3v4h4M10 12h5M10 16h5" />
  </>,
);
const PercentIcon = mk(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m9 15 6-6" />
    <circle cx="9.500" cy="9.500" r=".6" />
    <circle cx="14.500" cy="14.500" r=".6" />
  </>,
);
const BarsIcon = mk(
  <>
    <path d="M5 20V10M10 20V5M15 20v-7M20 20V8" />
  </>,
);
const YoutubeIcon = mk(
  <>
    <rect x="3" y="6" width="18" height="12" rx="3" />
    <path d="m10 9.500 4.500 2.500L10 14.500v-5Z" />
  </>,
);
const InstagramIcon = mk(
  <>
    <rect x="4" y="4" width="16" height="16" rx="5" />
    <circle cx="12" cy="12" r="3.600" />
    <circle cx="17" cy="7" r=".6" />
  </>,
);
const TiktokIcon = mk(
  <path d="M14 4v10.500a3.500 3.500 0 1 1-3.500-3.500M14 4c.4 2.400 2 4 4.500 4.200" />,
);
const MailIcon = mk(
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </>,
);
const SendIcon = mk(<path d="m21 4-9 16-2-7-7-2 18-7ZM10 13l4-4" />);
const BedIcon = mk(
  <>
    <path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" />
  </>,
);
const CarIcon = mk(
  <>
    <path d="M5 16V12l2-5h10l2 5v4M3 16h18M7 19v-3M17 19v-3" />
  </>,
);

const ICON_MAP = {
  users: UsersIcon,
  shield: ShieldIcon,
  coins: CoinsIcon,
  file: FileIcon,
  percent: PercentIcon,
  bars: BarsIcon,
  home: HomeIcon,
};

function Logo({ light = false }) {
  return (
    <a href="#top" className={`logo ${light ? "logo--light" : ""}`} aria-label="Monte Real Estate">
      <svg width="22" height="24" viewBox="0 0 22 24" aria-hidden="true">
        <g fill="currentColor" opacity=".85">
          <rect x="1" y="12" width="2" height="12" />
          <rect x="5" y="6" width="2" height="18" />
          <rect x="9" y="1" width="2" height="23" />
          <rect x="13" y="8" width="2" height="16" />
          <rect x="17" y="14" width="2" height="10" />
        </g>
      </svg>
      <span className="logo__txt">
        <b>MONTE</b>
        <i>REAL ESTATE</i>
      </span>
    </a>
  );
}

/* ================= SPLIT TEXT (mask reveal helper) ================= */
// splits text into words wrapped for mask-reveal animations (.w > .wi)
function Split({ text, as: Tag = "span", className = "", ...rest }) {
  return (
    <Tag className={`split ${className}`} aria-label={text} {...rest}>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <span className="w" aria-hidden="true">
            <span className="wi">{w}</span>
          </span>{" "}
        </span>
      ))}
    </Tag>
  );
}

/* ================= DATA  (replace image URLs here) ================= */
const POOL = [hero, skyline, interior, villa, townhouse, golf, arch, agents];
const hash = (s) => {
  let h = 0;
  for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
};
const img = (seed) => POOL[hash(seed) % POOL.length];

const IMG = {
  hero: hero,
  skyline: skyline,
  arch: arch,
  team: agents,
  founder: interior,
  cta: agents,
  avatars: [interior, villa, golf, townhouse],
  svc: [skyline, villa, interior, golf],
  thumb: interior,
};

const make = (prefix, n) =>
  Array.from({ length: n }, (_, i) => ({
    id: `${prefix}-${i}`,
    title: "Azure Heights Luxury Residences",
    img: img(`${prefix}-${i}`, 900, 1100),
    loc: ["Dubai Marina", "Palm Jumeirah", "Downtown", "JVC", "Business Bay"][i % 5],
    price: ["$290k", "$410k", "$620k", "$185k", "$340k"][i % 5],
    plan: "for 10 years",
    down: ["$30,000", "$45,000", "$60,000", "$25,000", "$38,000"][i % 5],
    done: ["09/2025", "03/2026", "12/2025", "06/2026", "11/2025"][i % 5],
  }));

const PORTFOLIO = {
  Apartments: make("apt", 5),
  Villas: make("villa", 5),
  "For Rent": make("rent", 5),
};

const SERVICES = [
  {
    n: "01",
    t: "Market Analysis",
    d: "Deep research on districts, yields and developer track records so every decision is backed by real numbers.",
  },
  {
    n: "02",
    t: "Property Selection",
    d: "A curated shortlist matched to your budget, goals and timeline — viewings arranged on your schedule.",
  },
  {
    n: "03",
    t: "Legal Support",
    d: "Contracts, escrow and registration handled end-to-end with certified Dubai legal partners.",
  },
  {
    n: "04",
    t: "Investment Planning",
    d: "Payment plans, mortgage options and rental strategy designed to grow your portfolio.",
  },
];

const ADVANTAGES = [
  {
    i: "users",
    t: "Diversity",
    d: "Approximately 90% of Dubai’s population consists of foreigners, reflecting its rich multicultural environment and tolerant attitude towards all.",
  },
  {
    i: "shield",
    t: "Safety",
    d: "Dubai consistently leads global rankings as one of the safest cities worldwide, securing a top position among the safest places on the planet.",
  },
  {
    i: "coins",
    t: "Stable Currency",
    d: "The dirham’s exchange rate has been firmly pegged to the dollar for over 20 years, ensuring stability and confidence in real estate transactions.",
  },
  {
    i: "file",
    t: "Resident Visa Opportunities",
    d: "Investing in real estate starting from AED 750,000 or USD 204,000 offers the possibility of obtaining a resident visa.",
  },
  {
    i: "percent",
    t: "Profit Tax Exemption for Residents",
    d: "This includes income from rental property, offering attractive incentives for property owners and investors.",
  },
  {
    i: "bars",
    t: "Low Mortgage Rates",
    d: "For non-residents, mortgage rates stand at an appealing 5–7%, providing accessible financing options for property purchases.",
  },
  {
    i: "home",
    t: "Remote Property Acquisition",
    d: "Reach out to us and we’ll assist you in selecting a worthy property while handling all formalities. With 0% commission, our services are compensated directly by developers.",
  },
];

const TYPES = [
  [
    { n: "01", t: "Luxury Villas", r: 0.95 },
    { n: "02", t: "Commercial Spaces", r: 1.35 },
  ],
  [
    { n: "03", t: "Penthouse Suites", r: 1.1 },
    { n: "07", t: "Townhouses", r: 1.5 },
    { n: "08", t: "Investment", r: 1.0 },
  ],
  [
    { n: "04", t: "Apartments", r: 1.05 },
    { n: "06", t: "Waterfront Homes", r: 1.45 },
    { cta: true },
  ],
  [
    { n: "05", t: "Beachfront Properties", r: 1.0 },
    { n: "09", t: "Holiday Homes", r: 1.15 },
    { n: "11", t: "Eco-friendly Properties", r: 1.45 },
  ],
  [
    { n: "10", t: "Golf Course Residences", r: 1.25 },
    { n: "12", t: "Desert Retreats", r: 1.2 },
  ],
].map((col, ci) => col.map((x, i) => ({ ...x, img: img(`type-${ci}-${i}`, 700, 900) })));

const FAQ = [
  {
    q: "What types of properties do we offer in Dubai?",
    a: "Apartments, villas, townhouses, penthouses, waterfront and commercial properties — both ready and off-plan from top developers.",
  },
  {
    q: "What are the payment options available for purchasing a property?",
    a: "Cash, developer instalment plans (often 10% down with up to 5 years at 0% overpayment) or mortgage financing through partner banks.",
  },
  {
    q: "Can foreign nationals buy property in Dubai?",
    a: "Yes. Foreign nationals can buy freehold property in designated areas with full ownership rights.",
  },
  {
    q: "What is the process for obtaining a residency visa through property investment?",
    a: "Properties starting from AED 750,000 can qualify for a residency visa. We guide you through documents, medical and Emirates ID.",
  },
  {
    q: "Are there any additional costs associated with property ownership in Dubai?",
    a: "Typically a land department fee, registration and service charges. We outline every cost upfront — no surprises.",
  },
  {
    q: "Do we offer property management services for rental properties?",
    a: "Yes — tenant search, contracts, maintenance and reporting, so your investment stays hands-off.",
  },
  {
    q: "Can we assist with property financing for non-resident buyers?",
    a: "Absolutely. We work with banks offering competitive 5–7% rates for non-residents and handle the application with you.",
  },
];

const PARTNERS = ["DAMAC", "EMAAR", "NAKHEEL", "SOBHA", "MERAAS"];

/* ================= ANIMATED MENU ================= */
const LINKS = [
  { n: "01", t: "Home", href: "#top" },
  { n: "02", t: "Our Properties", href: "#properties" },
  { n: "03", t: "Our Advantages", href: "#advantages" },
  { n: "04", t: "Our Services", href: "#services" },
  { n: "05", t: "FAQ", href: "#faq" },
];

function Menu({ open, onClose }) {
  const root = useRef(null);
  const tl = useRef(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({
          paused: true,
          defaults: { ease: "power4.inOut" },
          onReverseComplete: () => gsap.set(root.current, { autoAlpha: 0 }),
        })
        .set(root.current, { autoAlpha: 1 })
        .fromTo(".menu__bg", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0)
        .fromTo(".menu__panel", { xPercent: 105 }, { xPercent: 0, duration: 1.1 }, 0)
        .fromTo(".menu__panel-inner", { xPercent: -40 }, { xPercent: 0, duration: 1.1 }, 0)
        .fromTo(
          ".menu__link .wi",
          { yPercent: 115 },
          { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.07 },
          0.45,
        )
        .fromTo(
          ".menu__line",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: "power3.out", stagger: 0.07 },
          0.45,
        )
        .fromTo(".menu__num", { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.07 }, 0.7)
        .fromTo(
          ".menu__fade",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.08 },
          0.7,
        );
    },
    { scope: root },
  );

  useEffect(() => {
    if (!tl.current) return;
    if (open) {
      smooth.lenis?.stop();
      tl.current.timeScale(1).play();
    } else {
      smooth.lenis?.start();
      tl.current.timeScale(1.5).reverse();
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && open && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const go = (e, href) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      if (href === "#top") smooth.lenis?.scrollTo(0, { duration: 1.6 });
      else smooth.lenis?.scrollTo(href, { duration: 1.6, offset: -10 });
    }, 500);
  };

  return (
    <div className="menu" ref={root} aria-hidden={!open}>
      <div className="menu__bg" onClick={onClose} />
      <aside className="menu__panel" role="dialog" aria-label="Site menu">
        <div className="menu__panel-inner">
          <div className="menu__head">
            <Logo light />
            <button className="icon-btn icon-btn--light" onClick={onClose} aria-label="Close menu">
              <CloseIcon />
            </button>
          </div>

          <nav className="menu__nav">
            {LINKS.map((l) => (
              <a key={l.t} href={l.href} className="menu__link" onClick={(e) => go(e, l.href)}>
                <span className="menu__num">{l.n}</span>
                <Split text={l.t} />
                <span className="menu__arrow">
                  <ArrowUpRight size={22} />
                </span>
                <span className="menu__line" />
              </a>
            ))}
          </nav>

          <div className="menu__foot">
            <div className="menu__fade">
              <p className="menu__muted">Say hello</p>
              <a href="mailto:hello@monte.ae" className="menu__mail">
                hello@monte.ae
              </a>
            </div>
            <div className="menu__fade menu__socials">
              <a href="#" aria-label="Email">
                <MailIcon />
              </a>
              <a href="#" aria-label="Telegram">
                <SendIcon />
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* ================= HERO ================= */
function Hero({ onMenu }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.15 });
      tl.fromTo(
        ".hero__media",
        { clipPath: "inset(100% 0% 0% 0% round 20px)" },
        { clipPath: "inset(0% 0% 0% 0% round 20px)", duration: 1.5, ease: "power4.inOut" },
      )
        .fromTo(
          ".hero__media img",
          { scale: 1.4, filter: "grayscale(1) brightness(1.15)" },
          { scale: 1, filter: "grayscale(0) brightness(1)", duration: 2.2, ease: "power3.out" },
          0,
        )
        .from(".hero .wi", { yPercent: 118, duration: 1.2, stagger: 0.06 }, 0.55)
        .from(".hero__fade", { y: 24, opacity: 0, duration: 1, stagger: 0.09 }, 0.9)
        .from(
          ".hero__pop",
          { scale: 0.5, opacity: 0, duration: 0.9, stagger: 0.08, ease: "back.out(1.7)" },
          1.3,
        );

      gsap.to(".hero__media img", {
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section className="hero sec sec--white" id="top" ref={root}>
      <div className="hero__left">
        <div className="hero__bar hero__fade">
          <Logo />
          <div className="hero__btns">
            <a className="icon-btn" href="#properties" aria-label="Map">
              <MapIcon />
            </a>
            <button className="icon-btn" onClick={onMenu} aria-label="Open menu">
              <MenuIcon />
            </button>
          </div>
        </div>

        <div className="hero__center">
          <p className="hero__eyebrow hero__fade">Building Your Dreams</p>
          <h1 className="hero__title">
            <Split text="Real Estate in Dubai: Ideal for Living and Investing" />
          </h1>
        </div>

        <div className="hero__bottom hero__fade">
          <a href="#contact" className="pill pill--dark">
            <span className="pill__ic">
              <PhoneIcon size={14} />
            </span>
            Contact Us Now
          </a>
          <a href="#properties" className="hero__explore">
            <span>
              Explore All
              <br />
              Our Properties
            </span>
            <img src={IMG.thumb} alt="" />
          </a>
        </div>
      </div>

      <div className="hero__media">
        <img src={IMG.hero} alt="Dubai beachfront skyline" />
        <p className="hero__stat hero__fade">
          More than 1500 real
          <br />
          estate properties
        </p>
        <p className="hero__stat hero__stat--2 hero__fade">
          From $145,000 with a<br />
          yield of 10% per annum
        </p>
        <div className="hero__ui">
          <button className="sq-btn sq-btn--ghost hero__pop" aria-label="Favourite">
            <HeartIcon size={16} />
          </button>
          <button className="sq-btn hero__pop" aria-label="Home">
            <HomeIcon size={16} />
          </button>
        </div>
        <a href="#" className="hero__catalog hero__pop">
          <span>
            catalog
            <br />
            download
          </span>
          <DownloadIcon size={16} />
        </a>
      </div>
    </section>
  );
}

/* ================= IMAGE + MARQUEE ================= */
const TXT = "Apartments with an initial payment from $25,000";
const TXT2 = "interest-free installments up to 5 years";

function ImageMarquee() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ desktop: "(min-width: 769px)", mobile: "(max-width: 768px)" }, (ctx) => {
        const { mobile } = ctx.conditions;
        gsap.fromTo(
          ".mq__frame",
          {
            clipPath: mobile
              ? "inset(14% 6% 14% 6% round 20px)"
              : "inset(16% 24% 8% 24% round 22px)",
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 22px)",
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 85%", end: "top top", scrub: 0.6 },
          },
        );
        gsap.fromTo(
          ".mq__frame img",
          { scale: 1.25 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 85%", end: "+=140%", scrub: 0.6 },
          },
        );
        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "+=60%",
          pin: true,
          pinSpacing: true,
        });
      });

      gsap.to(".mq__track", { xPercent: -50, ease: "none", duration: 28, repeat: -1 });
    },
    { scope: root },
  );

  const row = (
    <>
      <span>{TXT}</span>
      <i className="mq__dot" />
      <span>{TXT2}</span>
      <i className="mq__dot" />
    </>
  );

  return (
    <section className="mq sec" ref={root} id="mq">
      <div className="mq__frame">
        <img src={IMG.skyline} alt="Dubai skyline at dusk" />
        <div className="mq__shade" />
        <div className="mq__icons">
          <button className="icon-btn icon-btn--dark" aria-label="Home">
            <HomeIcon size={16} />
          </button>
          <button className="icon-btn icon-btn--dark" aria-label="Search">
            <SearchIcon size={16} />
          </button>
        </div>
        <div className="mq__marquee">
          <div className="mq__track">
            {row}
            {row}
            {row}
            {row}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= PROPERTY PORTFOLIO ================= */
const TABS = Object.keys(PORTFOLIO);

function Card({ p }) {
  const ref = useRef(null);
  const tl = useRef(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "power3.out", duration: 0.6 } })
        .to(".card__img", { scale: 1.07, duration: 1 }, 0)
        .to(
          ".card__title",
          { y: () => -(ref.current.offsetHeight - 120), duration: 0.7, ease: "power3.inOut" },
          0,
        )
        .fromTo(".card__loc", { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, 0.1)
        .fromTo(".card__chip", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06 }, 0.1)
        .to(".card__arrow", { rotate: 45, background: "#fff" }, 0);
    },
    { scope: ref },
  );

  return (
    <article
      className="card"
      ref={ref}
      onMouseEnter={() => tl.current?.play()}
      onMouseLeave={() => tl.current?.reverse()}
    >
      <img className="card__img" src={p.img} alt={p.title} loading="lazy" />
      <div className="card__shade" />
      <button className="card__arrow" aria-label="Open property">
        <ArrowUpRight size={16} />
      </button>
      <h3 className="card__title">{p.title}</h3>
      <span className="card__loc">
        <PinIcon size={14} />
        {p.loc}
      </span>
      <div className="card__chips">
        <div className="card__chip">
          <small>Price</small>
          <b>from {p.price}</b>
        </div>
        <div className="card__chip">
          <small>Installment Plan</small>
          <b>{p.plan}</b>
        </div>
        <div className="card__chip">
          <small>Initial Payment</small>
          <b>{p.down}</b>
        </div>
        <div className="card__chip">
          <small>Upgraded Features</small>
          <b className="card__ic">
            <BedIcon size={14} />
            <CarIcon size={14} />
          </b>
        </div>
        <div className="card__chip">
          <small>Completion Date</small>
          <b>{p.done}</b>
        </div>
      </div>
    </article>
  );
}

function MapCard() {
  return (
    <article className="card card--map">
      <svg
        className="map__svg"
        viewBox="0 0 300 380"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <rect width="300" height="380" fill="#f1f1ef" />
        <g stroke="#dcdcd8" strokeWidth="1.2" fill="none">
          <path d="M0 60 L300 30M0 130 L300 110M0 210 L300 190M0 290 L300 270" />
          <path d="M40 0 L70 380M110 0 L120 380M180 0 L170 380M240 0 L260 380" />
          <path d="M0 330 C80 300 160 340 300 300" />
        </g>
        <path d="M0 360 C90 330 170 350 300 320 L300 380 L0 380Z" fill="#e6ecef" />
      </svg>
      <span className="map__tag">Find On The Map</span>
      <button className="card__arrow" style={{ opacity: 1 }} aria-label="Open map">
        <ArrowUpRight size={16} />
      </button>
      {[
        [58, 40],
        [52, 52],
        [64, 47],
        [48, 62],
        [60, 60],
        [34, 70],
        [70, 30],
        [66, 44],
        [46, 48],
        [26, 78],
      ].map(([x, y], i) => (
        <svg
          key={i}
          className="map__pin"
          style={{ left: x + "%", top: y + "%" }}
          width="22"
          height="28"
          viewBox="0 0 22 28"
        >
          <path d="M11 27C11 27 2 17 2 10.500a9 9 0 0 1 18 0C20 17 11 27 11 27Z" fill="#161616" />
          <circle cx="11" cy="10.500" r="3.200" fill="#fff" />
        </svg>
      ))}
    </article>
  );
}

function Portfolio() {
  const root = useRef(null);
  const tabsRef = useRef(null);
  const [tab, setTab] = useState(TABS[0]);

  // sliding highlight under active tab
  useLayoutEffect(() => {
    const el = tabsRef.current;
    const btn = el.querySelector(`[data-tab="${tab}"]`);
    gsap.to(el.querySelector(".tabs__pill"), {
      x: btn.offsetLeft,
      width: btn.offsetWidth,
      duration: 0.55,
      ease: "power3.inOut",
    });
  }, [tab]);

  useGSAP(
    () => {
      gsap.from(".card", {
        y: 70,
        opacity: 0,
        scale: 0.96,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".portfolio__grid", start: "top 88%" },
      });
      gsap.from(".map__pin", {
        y: -30,
        opacity: 0,
        duration: 0.7,
        ease: "bounce.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".card--map", start: "top 75%" },
      });
    },
    { scope: root, dependencies: [tab], revertOnUpdate: true },
  );

  return (
    <section className="portfolio sec sec--dark" id="properties" ref={root}>
      <div className="portfolio__head">
        <h2 className="h2" data-split>
          <Split text="Explore Our Property Portfolio" />
        </h2>
        <div className="tabs" ref={tabsRef}>
          <span className="tabs__pill" />
          {TABS.map((t) => (
            <button
              key={t}
              data-tab={t}
              className={`tabs__btn ${t === tab ? "is-on" : ""}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="portfolio__grid" key={tab}>
        {PORTFOLIO[tab].map((p) => (
          <Card key={p.id} p={p} />
        ))}
        <MapCard />
      </div>

      <div className="portfolio__foot">
        <a href="#" className="pill pill--blue">
          All Properties
        </a>
        <div className="portfolio__social">
          <p>
            Don’t Miss Out on Hot Deals!
            <br />
            Follow Us on Social Media
          </p>
          <a href="#" className="sq-btn sq-btn--dark" aria-label="YouTube">
            <YoutubeIcon size={15} />
          </a>
          <a href="#" className="sq-btn sq-btn--dark" aria-label="Instagram">
            <InstagramIcon size={15} />
          </a>
          <a href="#" className="sq-btn sq-btn--dark" aria-label="TikTok">
            <TiktokIcon size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================= STATS ================= */
const STATS = [
  { to: 97, suffix: "+", label: "Successful\nTransactions Monthly" },
  { to: 95, suffix: "%", label: "Customer\nSatisfaction Rate" },
  { to: 488, suffix: "", label: "Exquisite Properties\nReady for Your Selection" },
];

function Stats() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.utils.toArray(".stat").forEach((row) => {
        const num = row.querySelector(".stat__num");
        const to = +num.dataset.to;
        const suffix = num.dataset.suffix;
        const o = { v: to * 0.7 };
        num.textContent = Math.round(o.v) + suffix;
        gsap.to(o, {
          v: to,
          duration: 2.4,
          ease: "power2.out",
          onUpdate: () => (num.textContent = Math.round(o.v) + suffix),
          scrollTrigger: { trigger: row, start: "top 90%" },
        });
        gsap.from(row.querySelector(".stat__line"), {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: { trigger: row, start: "top 90%" },
        });
      });

      gsap.fromTo(
        ".stats__media",
        { clipPath: "inset(12% 8% 12% 8% round 22px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 22px)",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 85%", end: "top 20%", scrub: 0.6 },
        },
      );
      gsap.fromTo(
        ".stats__media img",
        { yPercent: -6, scale: 1.1 },
        {
          yPercent: 6,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      gsap.from(".stats__av img", {
        x: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".stats__team", start: "top 90%" },
      });
      gsap.from(".stats__card", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".stats__media", start: "top 60%" },
      });
    },
    { scope: root },
  );

  return (
    <section className="stats sec sec--white" ref={root}>
      <div className="stats__left">
        <div>
          <p className="muted stats__p" data-fade>
            At Monte, we offer more than just real estate services; we provide an unparalleled
            experience tailored to meet your needs and exceed your expectations.
          </p>
          <div className="stats__team" data-fade>
            <div className="stats__av">
              {IMG.avatars.map((a, i) => (
                <img key={i} src={a} alt="" />
              ))}
            </div>
            <span className="muted small">
              Meet Our
              <br />
              Professional Team
            </span>
          </div>
        </div>

        <div className="stats__list">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <b className="stat__num" data-to={s.to} data-suffix={s.suffix}>
                {s.to}
                {s.suffix}
              </b>
              <span className="stat__label">{s.label}</span>
              <i className="stat__line" />
            </div>
          ))}
        </div>
      </div>

      <div className="stats__media">
        <img src={IMG.arch} alt="Dubai skyline framed by an arch" />
        <a href="#contact" className="pill pill--blue stats__cta">
          <PhoneIcon size={13} /> Contact Us Now
        </a>
        <span className="stats__tag">Building Your Dreams</span>
        <div className="stats__card">
          <img src={IMG.founder} alt="" />
          <p>
            <small>Sales / CPM</small>Get The Consultation
            <br />
            With Our Expert
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================= SERVICES ================= */
const TAGS = ["INVESTMENT FROM ALMATY", "0% COMMISSION", "RESIDENCY VISA", "10% INITIAL PAYMENT"];

function Services() {
  const root = useRef(null);
  const [open, setOpen] = useState(-1);

  useGSAP(
    () => {
      gsap.from(".svc", {
        xPercent: 60,
        opacity: 0,
        duration: 1.3,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".services__list", start: "top 85%" },
      });
      gsap.from(".svc__img", {
        rotate: -180,
        scale: 0,
        duration: 1.2,
        ease: "back.out(1.5)",
        stagger: 0.12,
        scrollTrigger: { trigger: ".services__list", start: "top 85%" },
      });
      gsap.to(".tags__track", { xPercent: -50, ease: "none", duration: 22, repeat: -1 });
    },
    { scope: root },
  );

  useEffect(() => {
    gsap.utils.toArray(".svc__body").forEach((el, i) => {
      gsap.to(el, {
        height: open === i ? "auto" : 0,
        duration: 0.7,
        ease: "power3.inOut",
        onComplete: () => ScrollTrigger.refresh(),
      });
    });
    gsap.utils.toArray(".svc__arrow").forEach((el, i) => {
      gsap.to(el, { rotate: open === i ? 180 : 0, duration: 0.6, ease: "power3.inOut" });
    });
  }, [open]);

  const tags = TAGS.map((t) => (
    <span key={t} className="tag">
      {t}
    </span>
  ));

  return (
    <section className="services sec sec--dark" id="services" ref={root}>
      <div className="services__main">
        <div className="services__left">
          <h2 className="h2" data-split>
            <Split text="Tailored Solutions for Your Real Estate Needs" />
          </h2>
          <a href="#" className="link-dot" data-fade>
            <i />
            Explore More <ArrowRight size={13} />
          </a>
        </div>

        <div className="services__list">
          {SERVICES.map((s, i) => (
            <div className="svc" key={s.n} style={{ "--i": i }}>
              <button
                className="svc__row"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <img className="svc__img" src={IMG.svc[i]} alt="" />
                <span className="svc__t">
                  {s.t}
                  <sup>{s.n}</sup>
                </span>
                <span className="svc__arrow">
                  <ArrowDown size={16} />
                </span>
              </button>
              <div className="svc__body">
                <p>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="tags">
        <div className="tags__track">
          {tags}
          {tags}
          {tags}
          {tags}
        </div>
      </div>
    </section>
  );
}

/* ================= PATH TO SMART OWNERSHIP (pinned) ================= */
const LABELS = [
  "10% Initial\nPayment",
  "5 years installment,\n0% overpayment",
  "Rental income - 15%",
];

function Ownership() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ wide: "(min-width: 701px)", narrow: "(max-width: 700px)" }, (ctx) => {
        const { narrow } = ctx.conditions;
        const start = narrow
          ? [
              { x: 0, y: -88 },
              { x: 0, y: 0 },
              { x: 0, y: 88 },
            ]
          : [
              { x: -90, y: 0 },
              { x: 0, y: 0 },
              { x: 90, y: 0 },
            ];
        const tri = [
          { x: -45, y: 28 },
          { x: 0, y: -48 },
          { x: 45, y: 28 },
        ];
        const near = [
          { x: -13, y: 8 },
          { x: 0, y: -14 },
          { x: 13, y: 8 },
        ];

        const circles = gsap.utils.toArray(".oc");
        circles.forEach((c, i) =>
          gsap.set(c, { xPercent: start[i].x, yPercent: start[i].y, opacity: 0, scale: 0.6 }),
        );
        gsap.set(".own__center", { opacity: 0, scale: 0.85 });
        gsap.set(".own__btn", { opacity: 0, y: 20 });

        // intro (plays when section reaches the screen)
        gsap.to(".oc", {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=260%",
            pin: true,
            scrub: 0.8,
          },
        });
        tl.to({}, { duration: 0.4 }) // small hold
          .to(".oc__txt", { opacity: 0, duration: 0.5 }, "tri");
        circles.forEach((c, i) =>
          tl.to(c, { xPercent: tri[i].x, yPercent: tri[i].y, duration: 1.2 }, "tri"),
        );
        tl.addLabel("near", ">0.3");
        circles.forEach((c, i) =>
          tl.to(c, { xPercent: near[i].x, yPercent: near[i].y, duration: 1.1 }, "near"),
        );
        tl.to(".own__center", { opacity: 1, scale: 1, duration: 0.8 }, "near+=0.5").addLabel(
          "merge",
          ">0.3",
        );
        circles.forEach((c, i) =>
          tl.to(c, { xPercent: 0, yPercent: 0, rotate: (i - 1) * 6, duration: 1 }, "merge"),
        );
        tl.to(".oc:not(:nth-child(2))", { opacity: 0, duration: 0.6 }, "merge+=0.7")
          .to(".own__btn", { opacity: 1, y: 0, duration: 0.6 }, ">-0.2")
          .to({}, { duration: 0.4 });
      });
    },
    { scope: root },
  );

  return (
    <section className="own sec sec--dark" ref={root}>
      <h2 className="h2 own__title" data-split>
        <Split text="Path to Smart Ownership" />
      </h2>
      <div className="own__stage">
        {LABELS.map((l, i) => (
          <div className="oc" key={i}>
            <span className="oc__txt">
              {l.split("\n").map((x, j) => (
                <span key={j}>
                  {x}
                  <br />
                </span>
              ))}
            </span>
          </div>
        ))}
        <span className="own__center">
          Smart
          <br />
          Ownership
        </span>
      </div>
      <a href="#" className="own__btn pill pill--grey">
        <span className="pill__ic pill__ic--white">
          <DownloadIcon size={13} />
        </span>
        Catalog Download
      </a>
    </section>
  );
}

/* ================= WHY DUBAI ================= */
function Advantages() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from(".adv", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: { trigger: ".adv__grid", start: "top 85%" },
      });
      gsap.from(".adv__line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.09,
        scrollTrigger: { trigger: ".adv__grid", start: "top 85%" },
      });
    },
    { scope: root },
  );

  return (
    <section className="adv-sec sec sec--white" id="advantages" ref={root}>
      <div className="adv-sec__head">
        <div>
          <a href="#" className="link-dot link-dot--dark" data-fade>
            <i />
            Explore Our Advantages
          </a>
          <h2 className="h2 h2--dark" data-split>
            <Split text="Why Dubai Stands Unrivalled?" />
          </h2>
        </div>
        <a href="#contact" className="pill pill--dark" data-fade>
          <span className="pill__ic">
            <PhoneIcon size={14} />
          </span>
          Contact Us Now
        </a>
      </div>

      <div className="adv__grid">
        {ADVANTAGES.map((a) => {
          const Icon = ICON_MAP[a.i];
          return (
            <article className="adv" key={a.t}>
              <i className="adv__line" />
              <Icon size={24} className="adv__ic" />
              <h3>{a.t}</h3>
              <p>{a.d}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ================= PROPERTY TYPES ================= */
function PropertyTypes() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from(".tile", {
        y: 90,
        opacity: 0,
        scale: 0.94,
        duration: 1.1,
        ease: "power3.out",
        stagger: { each: 0.06, from: "start" },
        scrollTrigger: { trigger: ".types__cols", start: "top 85%" },
      });

      // parallax columns (desktop only)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px)", () => {
        const speeds = [-60, 40, -90, 30, -50];
        gsap.utils.toArray(".types__col").forEach((col, i) => {
          gsap.fromTo(
            col,
            { y: -speeds[i] },
            {
              y: speeds[i],
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section className="types sec sec--white" ref={root}>
      <div className="types__head">
        <h2 className="h2 h2--dark" data-split>
          <Split text="Discover Your Ideal Property Type" />
        </h2>
        <div className="types__icons">
          <button className="icon-btn" aria-label="Home">
            <HomeIcon size={15} />
          </button>
          <button className="icon-btn" aria-label="Search">
            <SearchIcon size={15} />
          </button>
        </div>
      </div>

      <div className="types__cols">
        {TYPES.map((col, ci) => (
          <div className="types__col" key={ci}>
            {col.map((t, i) =>
              t.cta ? (
                <div className="tile tile--cta" key="cta">
                  <svg width="26" height="30" viewBox="0 0 22 24" aria-hidden="true">
                    <g fill="#c9a96a">
                      <rect x="1" y="12" width="2" height="12" />
                      <rect x="5" y="6" width="2" height="18" />
                      <rect x="9" y="1" width="2" height="23" />
                      <rect x="13" y="8" width="2" height="16" />
                      <rect x="17" y="14" width="2" height="10" />
                    </g>
                  </svg>
                  <p>
                    Explore Our Diverse
                    <br />
                    Range of Property Types
                    <br />
                    and Find Your Perfect
                    <br />
                    Match
                  </p>
                  <a href="#" className="pill pill--dark pill--sm">
                    <span className="pill__ic">
                      <DownloadIcon size={12} />
                    </span>
                    Catalog Download
                  </a>
                </div>
              ) : (
                <a href="#" className="tile" key={t.n} style={{ "--r": t.r }}>
                  <img src={t.img} alt={t.t} loading="lazy" />
                  <span className="tile__shade" />
                  <span className="tile__arrow">
                    <ArrowUpRight size={14} />
                  </span>
                  <span className="tile__txt">
                    <small>{t.n}</small>
                    {t.t}
                  </span>
                </a>
              ),
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= PARTNERS + FAQ ================= */
function Faq() {
  const root = useRef(null);
  const [open, setOpen] = useState(-1);

  useGSAP(
    () => {
      gsap.to(".partners__track", { xPercent: -50, ease: "none", duration: 24, repeat: -1 });
      gsap.from(".faq__item", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: ".faq__list", start: "top 85%" },
      });
    },
    { scope: root },
  );

  useEffect(() => {
    gsap.utils.toArray(".faq__a").forEach((el, i) =>
      gsap.to(el, {
        height: open === i ? "auto" : 0,
        duration: 0.65,
        ease: "power3.inOut",
        onComplete: () => ScrollTrigger.refresh(),
      }),
    );
    gsap.utils
      .toArray(".faq__plus")
      .forEach((el, i) =>
        gsap.to(el, { rotate: open === i ? 45 : 0, duration: 0.5, ease: "power3.inOut" }),
      );
  }, [open]);

  const logos = PARTNERS.map((p) => (
    <span key={p} className={`plogo plogo--${p.toLowerCase()}`}>
      {p}
    </span>
  ));

  return (
    <section className="faq sec sec--beige" id="faq" ref={root}>
      <div className="partners">
        <p className="partners__t" data-fade>
          Our valued partners
        </p>
        <div className="partners__marquee">
          <div className="partners__track">
            {logos}
            {logos}
            {logos}
            {logos}
          </div>
        </div>
      </div>

      <div className="faq__wrap">
        <div className="faq__left">
          <a href="#" className="link-dot link-dot--dark" data-fade>
            <i />
            Explore Our Advantages
          </a>
          <h2 className="h2 h2--dark" data-split>
            <Split text="Frequent Asked Questions" />
          </h2>
          <p className="muted small" data-fade>
            At Monte, we offer more than just real estate services; we provide an unparalleled
            experience tailored to meet your needs and exceed your expectations.
          </p>
        </div>

        <div className="faq__list">
          {FAQ.map((f, i) => (
            <div className="faq__item" key={f.q}>
              <button
                className="faq__q"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span>{f.q}</span>
                <span className="faq__plus">
                  <PlusIcon size={14} />
                </span>
              </button>
              <div className="faq__a">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= CTA ================= */
function Cta() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cta__frame",
        { clipPath: "inset(22% 20% 22% 20% round 22px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 22px)",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 90%", end: "top 25%", scrub: 0.6 },
        },
      );
      gsap.fromTo(
        ".cta__frame img",
        { scale: 1.3 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 90%", end: "top 25%", scrub: 0.6 },
        },
      );
      gsap.from(".cta .wi", {
        yPercent: 115,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 45%" },
      });
      gsap.from(".cta__btn", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 40%" },
      });
    },
    { scope: root },
  );

  return (
    <section className="cta sec sec--beige" id="contact" ref={root}>
      <div className="cta__frame">
        <img src={IMG.cta} alt="Advisors helping a client" />
        <div className="cta__txt">
          <h2 className="cta__h">
            <Split text="Built Your Future With Us" />
          </h2>
          <a href="#" className="pill pill--white cta__btn">
            Start Your Journey
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================= FOOTER ================= */
function Footer() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from(".footer__col", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 85%" },
      });
    },
    { scope: root },
  );

  return (
    <footer className="footer sec sec--beige" ref={root}>
      <div className="footer__grid">
        <div className="footer__col footer__brand">
          <Logo />
          <p className="small">Building Your Dreams In Real Estate</p>
        </div>

        <div className="footer__col footer__nav">
          <p className="muted small">Quick Navigation</p>
          <a href="#top">Home</a>
          <a href="#properties">Our Properties</a>
          <a href="#advantages">Our Advantages</a>
          <a href="#services">Our Services</a>
        </div>

        <div className="footer__col footer__contact">
          <div className="footer__founder">
            <img src={IMG.founder} alt="" />
            <p className="small">
              <span className="muted">Monte Founder</span>
              <br />
              Ethan Thompson
            </p>
          </div>
          <p className="footer__lead">
            We are here to change
            <br />
            your future.
          </p>
          <div className="footer__actions">
            <a href="#contact" className="pill pill--dark pill--sm">
              Contact Us
            </a>
            <a href="mailto:hello@monte.ae" aria-label="Email">
              <MailIcon size={18} />
            </a>
            <a href="#" aria-label="Telegram">
              <SendIcon size={18} />
            </a>
          </div>
        </div>

        <form className="footer__col footer__news" onSubmit={(e) => e.preventDefault()}>
          <p>Subscribe to our news</p>
          <p className="muted small">
            Stay Informed and Never Miss a Beat. Subscribe to Our Exclusive News Updates!
          </p>
          <input type="email" placeholder="Enter your email" aria-label="Email" />
          <button className="pill pill--dark pill--sm" type="submit">
            Subscribe
          </button>
        </form>

        <div className="footer__col footer__addr">
          <div className="footer__map" aria-hidden="true">
            <i />
            <i />
            <i />
            <b />
          </div>
          <p className="small">
            123 Zayed Road,
            <br />
            Dubai Marina,
            <br />
            Dubai, United Arab Emirates
          </p>
        </div>

        <div className="footer__col footer__legal small muted">
          <p>Copyright 2026 © Monte Properties</p>
          <p>
            <a href="#">Terms Of Service</a> &nbsp; <a href="#">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ================= FLOATING MENU BUTTON ================= */
// round menu button that pops in once the hero is scrolled past
function FloatingMenu({ onMenu }) {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.set(ref.current, { scale: 0, autoAlpha: 0 });
    gsap.to(ref.current, {
      scale: 1,
      autoAlpha: 1,
      duration: 0.6,
      ease: "back.out(1.8)",
      paused: false,
      scrollTrigger: {
        start: () => window.innerHeight * 0.7,
        toggleActions: "play none none reverse",
      },
    });
  });

  return (
    <button ref={ref} className="fab" onClick={onMenu} aria-label="Open menu">
      <MenuIcon size={18} />
    </button>
  );
}

/* ================= APP ================= */
export default function App() {
  const [menu, setMenu] = useState(false);
  const openMenu = useCallback(() => setMenu(true), []);
  const closeMenu = useCallback(() => setMenu(false), []);

  // smooth scrolling wired into ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    smooth.lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(tick);
      lenis.destroy();
      smooth.lenis = null;
    };
  }, []);

  // generic reveals: any [data-split] / [data-fade] element animates in on scroll
  useGSAP(() => {
    gsap.utils.toArray("[data-split]").forEach((el) => {
      gsap.from(el.querySelectorAll(".wi"), {
        yPercent: 115,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.06,
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
    gsap.utils.toArray("[data-fade]").forEach((el) => {
      gsap.from(el, {
        y: 28,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%" },
      });
    });
    ScrollTrigger.refresh();
  });

  return (
    <>
      <main className="page">
        <OldHero onMenu={openMenu} />
        <ImageMarquee />
        <Portfolio />
        <Stats />
        <Services />
        <Ownership />
        <Advantages />
        <PropertyTypes />
        <Faq />
        <Cta />
        <Footer />
      </main>
      <FloatingMenu onMenu={openMenu} />
      <Menu open={menu} onClose={closeMenu} />
    </>
  );
}
