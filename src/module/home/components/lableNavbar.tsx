"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Atom,
  Bird,
  Bot,
  BrainCircuit,
  Boxes,
  ChevronDown,
  Cloud,
  Code,
  Cog,
  Component,
  Container,
  Database,
  Eye,
  Flame,
  Gauge,
  HardDrive,
  Layers,
  Leaf,
  MessageSquareText,
  Network,
  Rocket,
  Search,
  Server,
  Smartphone,
  Sparkles,
  Terminal,
  Wind,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/*  Data — edit labels / hrefs here                                            */
/* -------------------------------------------------------------------------- */

type CategoryTab = {
  label: string;
  href: string;
  icon: LucideIcon;
  iconClass: string;
};

const CATEGORY_TABS: CategoryTab[] = [
  { label: "ML", href: "/leaderboards/ml", icon: Bot, iconClass: "text-emerald-500 dark:text-emerald-400" },
  { label: "DL", href: "/leaderboards/dl", icon: Network, iconClass: "text-sky-500 dark:text-sky-400" },
  { label: "Data Science", href: "/leaderboards/datascience", icon: BrainCircuit, iconClass: "text-indigo-500 dark:text-indigo-400" },
  { label: "LLM", href: "/leaderboards/llm", icon: Sparkles, iconClass: "text-cyan-600 dark:text-cyan-500" },
  { label: "CV", href: "/leaderboards/cv", icon: Eye, iconClass: "text-teal-500 dark:text-teal-400" },
  { label: "NLP", href: "/leaderboards/nlp", icon: MessageSquareText, iconClass: "text-orange-500 dark:text-orange-400" },
  { label: "React.js", href: "/leaderboards/reactjs", icon: Atom, iconClass: "text-violet-500 dark:text-violet-400" },
  { label: "Vue.js", href: "/leaderboards/vuejs", icon: Component, iconClass: "text-pink-500" },
  { label: "Tailwind CSS", href: "/leaderboards/tailwind-css", icon: Wind, iconClass: "text-rose-500" },
];

type MenuItem = { label: string; href: string; icon: LucideIcon; tileClass: string };
type MenuGroup = { title: string; items: MenuItem[] };

// Tile colours cycle automatically, so new items only need a label + icon.
const TONES = [
  "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  "bg-amber-500/15 text-amber-600 dark:text-amber-500",
  "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400",
];

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const group = (title: string, items: [string, LucideIcon][]): MenuGroup => ({
  title,
  items: items.map(([label, icon], i) => ({
    label,
    icon,
    href: `/leaderboards/${slug(label)}`,
    tileClass: TONES[i % TONES.length],
  })),
});

const MORE_GROUPS: MenuGroup[] = [
  group("Databases", [
    ["PostgreSQL", Database],
    ["Redis", Zap],
    ["MongoDB", HardDrive],
    ["MySQL", Server],
    ["Elasticsearch", Search],
    ["Supabase", Cloud],
    ["SQLite", Layers],
  ]),
  group("DevOps", [
    ["Docker", Container],
    ["Kubernetes", Boxes],
    ["Terraform", Cloud],
    ["Jenkins", Workflow],
    ["Grafana", Gauge],
    ["Ansible", Cog],
  ]),
  group("Mobile Dev", [
    ["Flutter", Smartphone],
    ["React Native", Atom],
    ["Swift", Bird],
    ["Android Dev", Bot],
    ["Kotlin", Code],
    ["Ionic", Zap],
  ]),
  group("Backend", [
    ["Spring Boot", Leaf],
    ["Laravel", Flame],
    ["Django", Layers],
    ["Go", Rocket],
    ["Rust", Cog],
    ["Node.js", Terminal],
  ]),
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-400 dark:focus-visible:ring-white/40";

const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

type InlineLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

const InlineLink = ({ href, children, ...props }: InlineLinkProps) => (
  <a
    href={href}
    {...props}
    className="rounded-sm text-neutral-900 underline decoration-neutral-400/60 underline-offset-2 transition-colors duration-150 hover:text-teal-600 hover:decoration-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 dark:text-white dark:decoration-white/40 dark:hover:text-teal-300 dark:hover:decoration-teal-300"
  >
    {children}
  </a>
);

/* -------------------------------------------------------------------------- */
/*  "More" menu — bottom sheet on phones, dropdown from sm up                  */
/* -------------------------------------------------------------------------- */

function MoreMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const openMenu = () => {
    clearTimer();
    setOpen(true);
  };
  // Small delay so the dropdown doesn't flicker when the cursor crosses the gap.
  const closeMenuSoon = () => {
    clearTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => clearTimer, []);

  // Close on outside press and on Escape.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Lock page scroll while the bottom sheet is open (phones only).
  useEffect(() => {
    if (!open || !window.matchMedia("(max-width: 639px)").matches) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close after navigating.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div
      ref={wrapperRef}
      className="relative flex shrink-0 items-stretch border-l border-neutral-200 dark:border-white/10"
      // Hover only for real mice, so touch taps don't open-then-immediately-close.
      onPointerEnter={(e) => e.pointerType === "mouse" && openMenu()}
      onPointerLeave={(e) => e.pointerType === "mouse" && closeMenuSoon()}
      onBlur={(e) => {
        if (!wrapperRef.current?.contains(e.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="more-leaderboards"
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1 px-3 text-sm font-medium transition-colors sm:px-4 ${focusRing} ${
          open
            ? "text-neutral-900 dark:text-white"
            : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        }`}
      >
        More
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* Backdrop — phones only */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 motion-reduce:transition-none sm:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Panel: fixed bottom sheet on phones, absolute dropdown from sm up */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 transition-[transform,opacity,visibility] duration-200 motion-reduce:transition-none sm:absolute sm:inset-x-auto sm:bottom-auto sm:right-0 sm:top-full sm:w-xl sm:max-w-[calc(100vw-2rem)] sm:pt-1 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-full opacity-0 sm:translate-y-0"
        }`}
      >
        <div
          id="more-leaderboards"
          className="flex max-h-[85dvh] flex-col rounded-t-2xl border border-neutral-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#161616] dark:shadow-black/50 sm:max-h-[calc(100dvh-8rem)] sm:rounded-2xl"
        >
          <div className="shrink-0 px-5 pt-3 sm:px-6 sm:pt-6">
            <span
              aria-hidden="true"
              className="mx-auto mb-3 block h-1 w-10 rounded-full bg-neutral-300 dark:bg-white/20 sm:hidden"
            />
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  More leaderboards
                </h2>
                <p className="mt-1 text-sm text-neutral-500">Browse by technology</p>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className={`-mr-2 -mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/10 sm:hidden ${focusRing}`}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto overscroll-contain px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 sm:px-6 sm:pb-6">
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-8">
              {MORE_GROUPS.map((g) => (
                <section key={g.title} aria-label={g.title}>
                  <h3 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    {g.title}
                  </h3>
                  {/* 2-up grid on phones to cut scrolling; single column from sm */}
                  <ul className="grid grid-cols-2 gap-1 sm:flex sm:flex-col sm:gap-0">
                    {g.items.map(({ label, href, icon: Icon, tileClass }) => {
                      const active = isActive(pathname, href);
                      return (
                        <li key={href} className="min-w-0">
                          <Link
                            href={href}
                            onClick={() => setOpen(false)}
                            aria-current={active ? "page" : undefined}
                            className={`group flex min-h-11 items-center gap-3 rounded-xl px-1.5 py-1.5 transition-colors hover:bg-neutral-100 active:bg-neutral-100 dark:hover:bg-white/5 dark:active:bg-white/10 sm:gap-4 sm:px-1 sm:py-2 ${
                              active ? "bg-neutral-100 dark:bg-white/5" : ""
                            } ${focusRing}`}
                          >
                            <span
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:h-10 sm:w-10 ${tileClass}`}
                            >
                              <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" aria-hidden="true" />
                            </span>
                            <span
                              className={`truncate text-sm transition-colors sm:text-base ${
                                active
                                  ? "font-medium text-neutral-900 dark:text-white"
                                  : "text-neutral-600 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white"
                              }`}
                            >
                              {label}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                             */
/* -------------------------------------------------------------------------- */

export default function LeaderboardTabs() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [edges, setEdges] = useState({ start: false, end: false });

  // Track scroll position so we only show a fade where more tabs are hidden.
  const updateEdges = useCallback(() => {
    const el = navRef.current;
    if (!el) return;
    const start = el.scrollLeft > 4;
    const end = el.scrollLeft < el.scrollWidth - el.clientWidth - 4;
    setEdges((p) => (p.start === start && p.end === end ? p : { start, end }));
  }, []);

  // Centre the active tab on route change and keep the fades in sync on resize.
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const active = el.querySelector<HTMLElement>('[aria-current="page"]');
    if (active) {
      el.scrollTo({
        left: active.offsetLeft - (el.clientWidth - active.offsetWidth) / 2,
        behavior: "smooth",
      });
    }
    updateEdges();
    const ro = new ResizeObserver(updateEdges);
    ro.observe(el);
    return () => ro.disconnect();
  }, [pathname, updateEdges]);

  const fade =
    "pointer-events-none absolute inset-y-0 z-10 w-8 [--fade:#ffffff] dark:[--fade:#111111] transition-opacity duration-150";

  return (
    <div className="relative z-40 w-full bg-white dark:bg-[#111111]">
      {/* Tab bar */}
      <div className="mx-auto flex h-12 max-w-[1800px] items-stretch border-b border-neutral-200 px-2 dark:border-white/10 sm:px-6">
        <div className="relative flex min-w-0 flex-1">
          <span
            aria-hidden="true"
            className={`${fade} left-0 [background:linear-gradient(to_right,var(--fade),transparent)] ${
              edges.start ? "opacity-100" : "opacity-0"
            }`}
          />
          <nav
            ref={navRef}
            aria-label="Leaderboards"
            onScroll={updateEdges}
            className="relative flex min-w-0 flex-1 items-stretch overflow-x-auto overscroll-x-contain whitespace-nowrap scrollbar-none [&::-webkit-scrollbar]:hidden"
          >
            {CATEGORY_TABS.map(({ label, href, icon: Icon, iconClass }) => {
              const active = isActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex shrink-0 items-center gap-2 px-3 text-sm font-medium transition-colors ${focusRing} ${
                    active
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${iconClass}`} aria-hidden="true" />
                  {label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-blue-500"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <span
            aria-hidden="true"
            className={`${fade} right-0 [background:linear-gradient(to_left,var(--fade),transparent)] ${
              edges.end ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        <MoreMenu />
      </div>

      {/* Hero */}
      <section
        aria-label="AI Leaderboard"
        className="mx-auto w-full max-w-[1800px] px-4 py-6 sm:px-6 sm:py-8 lg:px-12 lg:py-10"
      >
        <h1 className="mb-2 text-[15px] leading-snug sm:mb-2.5 sm:text-base lg:text-[17px]">
          <span className="block font-semibold tracking-[-0.01em] text-neutral-900 dark:text-white sm:inline">
            AI Leaderboard
          </span>
          <span className="block font-normal text-neutral-500 dark:text-gray-400 sm:inline">
            <span aria-hidden="true" className="hidden sm:inline">
              {" "}&mdash;{" "}
            </span>
            Rankings for 300+ Top AI Models by Intelligence, Speed &amp; Price
          </span>
        </h1>
        <p className="max-w-3xl text-[13px] leading-relaxed text-neutral-500 dark:text-gray-400">
          Independent rankings of GPT, Claude, Gemini, Llama, DeepSeek and 300+ AI models
          &mdash; composite <InlineLink href="#">LLM Stats Score</InlineLink>, updated
          continuously from public benchmarks and live API metrics. See the full{" "}
          <InlineLink href="#">LLM Leaderboard</InlineLink> for complete LLM rankings with
          advanced filters.
        </p>
      </section>
    </div>
  );
}