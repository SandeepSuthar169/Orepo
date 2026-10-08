"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Brain,
  ChevronDown,
  Code,
  DollarSign,
  Drama,
  FileAudio,
  FileText,
  BrainCircuit,
  Heart,
  Image as ImageIcon,
  Mic,
  Monitor,
  PenLine,
  Scale,
  ScanEye,
  Search,
  Video,
  Wrench,
  Bot,
  RobotArm,
  PanelBottomDashed,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/*  Data — edit labels / hrefs here                                            */
/* -------------------------------------------------------------------------- */

type Tab = { label: string; href: string; exact?: boolean; muted?: boolean };

type CategoryTab = {
  label: string;
  href: string;
  icon: LucideIcon;
  iconClass: string;
};

const CATEGORY_TABS: CategoryTab[] = [
  {
    label: "ML",
    href: "/leaderboards/ml",
    icon: Bot,
    iconClass: "text-emerald-500 dark:text-emerald-400",
  },
  {
    label: "DL",
    href: "/leaderboards/dl",
    icon: RobotArm,
    iconClass: "text-sky-500 dark:text-sky-400",
  },
  {
    label: "Data Science",
    href: "/leaderboards/datascience",
    icon: BrainCircuit,
    iconClass: "text-indigo-500 dark:text-indigo-400",
  },
  {
    label: "LLM",
    href: "/leaderboards/llm",
    icon: Search,
    iconClass: "text-cyan-600 dark:text-cyan-500",
  },
  {
    label: "CV",
    href: "/leaderboards/BrainCog ",
    icon: FileText,
    iconClass: "text-teal-500 dark:text-teal-400",
  },
  {
    label: "NLP",
    href: "/leaderboards/nlp",
    icon: PanelBottomDashed,
    iconClass: "text-orange-500 dark:text-orange-400",
  },
  {
    label: "React.js",
    href: "/leaderboards/reactjs",
    icon: Brain,
    iconClass: "text-violet-500 dark:text-violet-400",
  },
  {
    label: "Vue.js",
    href: "/leaderboards/vuejs",
    icon: ImageIcon,
    iconClass: "text-pink-500",
  },
  {
    label: "Tailwind CSS",
    href: "/leaderboards/tailwind-css",
    icon: Video,
    iconClass: "text-rose-500",
  },
];

type MenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  tileClass: string;
};

type MenuGroup = { title: string; items: MenuItem[] };

const MORE_GROUPS: MenuGroup[] = [
  {
    title: "Databases",
    items: [
      {
        label: "PostgreSQL",
        href: "/leaderboards/image-understanding",
        icon: ScanEye,
        tileClass: "bg-violet-500/15 text-violet-500 dark:text-violet-400",
      },
      {
        label: "Redis",
        href: "/leaderboards/text-to-speech",
        icon: Mic,
        tileClass: "bg-amber-500/15 text-amber-600 dark:text-amber-500",
      },
      {
        label: "MongoDB",
        href: "/leaderboards/transcription",
        icon: FileAudio,
        tileClass: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-500",
      },
      {
        label: "MySQL",
        href: "/leaderboards/computer-use",
        icon: Monitor,
        tileClass: "bg-slate-500/15 text-slate-500 dark:text-slate-400",
      },
      {
        label: "Elasticsearch",
        href: "/leaderboards/computer-use",
        icon: Monitor,
        tileClass: "bg-slate-500/15 text-slate-500 dark:text-slate-400",
      },
      {
        label: "Superbase",
        href: "/leaderboards/computer-use",
        icon: Monitor,
        tileClass: "bg-slate-500/15 text-slate-500 dark:text-slate-400",
      },
      {
        label: "SQLite",
        href: "/leaderboards/computer-use",
        icon: Monitor,
        tileClass: "bg-slate-500/15 text-slate-500 dark:text-slate-400",
      },
    ],
  },
  {
    title: "DevOps",
    items: [
      {
        label: "Docker",
        href: "/leaderboards/image-understanding",
        icon: ScanEye,
        tileClass: "bg-violet-500/15 text-violet-500 dark:text-violet-400",
      },
      {
        label: "Kubernetes",
        href: "/leaderboards/text-to-speech",
        icon: Mic,
        tileClass: "bg-amber-500/15 text-amber-600 dark:text-amber-500",
      },
      {
        label: "Terraform",
        href: "/leaderboards/transcription",
        icon: FileAudio,
        tileClass: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-500",
      },
      {
        label: "Jenkins",
        href: "/leaderboards/computer-use",
        icon: Monitor,
        tileClass: "bg-slate-500/15 text-slate-500 dark:text-slate-400",
      },
      {
        label: "Grafana",
        href: "/leaderboards/computer-use",
        icon: Monitor,
        tileClass: "bg-slate-500/15 text-slate-500 dark:text-slate-400",
      },
      {
        label: "Ansible",
        href: "/leaderboards/computer-use",
        icon: Monitor,
        tileClass: "bg-slate-500/15 text-slate-500 dark:text-slate-400",
      },
    ],
  },
  {
    title: "Mobile Dev",
    items: [
      {
        label: "Flutter",
        href: "/dashboard",
        icon: DollarSign,
        tileClass: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
      },
      {
        label: "React Native",
        href: "/dashboard",
        icon: Scale,
        tileClass: "bg-amber-500/15 text-amber-600 dark:text-amber-500",
      },
      {
        label: "Swift",
        href: "/dashboard",
        icon: Heart,
        tileClass: "bg-red-500/15 text-red-500 dark:text-red-400",
      },
      {
        label: "Andriod Dev",
        href: "/dashboard",
        icon: Drama,
        tileClass: "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400",
      },

      {
        label: "Kotin",
        href: "/dashboard",
        icon: Drama,
        tileClass: "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400",
      },
      {
        label: "Ionic",
        href: "/dashboard",
        icon: Drama,
        tileClass: "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400",
      },
    ],
  },
  {
    title: "Backend",
    items: [
      {
        label: "Spring Boot",
        href: "/leaderboards/springboot",
        icon: DollarSign,
        tileClass: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
      },
      {
        label: "Laravel",
        href: "/leaderboards/laravel",
        icon: Scale,
        tileClass: "bg-amber-500/15 text-amber-600 dark:text-amber-500",
      },
      {
        label: "Django",
        href: "/leaderboards/django",
        icon: Drama,
        tileClass: "text-rose-500",
      },
      {
        label: "Go",
        href: "/leaderboards/go",
        icon: Drama,
        tileClass: "text-rose-500",
      },
      {
        label: "RUST",
        href: "/leaderboards/rust",
        icon: Drama,
        tileClass: "text-rose-500",
      },
      {
        label: "Node.js",
        href: "/leaderboards/nodejs",
        icon: Drama,
        tileClass: "text-rose-500",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-400 dark:focus-visible:ring-white/40";

const isActive = (pathname: string, href: string, exact?: boolean) =>
  exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

/* -------------------------------------------------------------------------- */
/*  "More" dropdown — opens on hover (mouse), click/tap, or keyboard           */
/* -------------------------------------------------------------------------- */

type InlineLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

const InlineLink = ({ href, children, ...props }: InlineLinkProps) => (
  <a
    href={href}
    {...props}
    className="text-white underline underline-offset-2 decoration-white-500/60 hover:text-teal-300 hover:decoration-teal-300 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117] rounded-sm"
  >
    {children}
  </a>
);

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

  // Small delay so the menu doesn't flicker when the cursor crosses the gap.
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

  // Close after navigating.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div
      ref={wrapperRef}
      className="relative flex shrink-0 items-stretch"
      // Hover only for real mice, so touch taps don't open-then-immediately-close.
      onPointerEnter={(e) => e.pointerType === "mouse" && openMenu()}
      onPointerLeave={(e) => e.pointerType === "mouse" && closeMenuSoon()}
      // Close when keyboard focus leaves the whole menu.
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
        className={`inline-flex items-center gap-1 px-3 text-sm font-medium transition-colors ${focusRing} ${
          open
            ? "text-neutral-900 dark:text-white"
            : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        }`}
      >
        More
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {/* pt-1 keeps the hover area continuous between the button and the panel */}
      <div
        className={`absolute right-0 top-full z-60 w-[min(36rem,calc(100vw-2rem))] pt-1 transition-[opacity,visibility] duration-150 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          id="more-leaderboards"
          className="max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-[#161616] dark:shadow-black/50 sm:p-6"
        >
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
            More leaderboards
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Browse by modality and industry
          </p>

          <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {MORE_GROUPS.map((group) => (
              <section key={group.title} aria-label={group.title}>
                <h3 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  {group.title}
                </h3>
                <ul className="flex flex-col">
                  {group.items.map(({ label, href, icon: Icon, tileClass }) => {
                    const active = isActive(pathname, href);
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={`group flex items-center gap-4 rounded-xl px-1 py-2 transition-colors hover:bg-neutral-100 dark:hover:bg-white/5 ${focusRing}`}
                        >
                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tileClass}`}
                          >
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <span
                            className={`text-base transition-colors ${
                              active
                                ? "text-neutral-900 dark:text-white"
                                : "text-neutral-700 group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-white"
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
  );
}

export default function LeaderboardTabs() {
  const pathname = usePathname();

  return (
    // z-40: sits under the main Navbar (z-50) but above page content,
    // so the dropdown overlays whatever is below.
    <div className="relative z-40 w-full  border-neutral-200 bg-white dark:border-white/10 dark:bg-[#111111]">
      <div className="mx-auto flex h-12 max-w-[1800px] items-stretch px-4 sm:px-6">
        {/* Scrolls horizontally on small screens. "More" lives outside this
            scroller so its dropdown isn't clipped. */}
        <nav
          aria-label="Leaderboards"
          className="flex min-w-0 flex-1 items-stretch overflow-x-auto whitespace-nowrap scrollbar-none [&::-webkit-scrollbar]:hidden"
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
                <span
                  aria-hidden="true"
                  className="mx-1 my-auto h-5 w-px shrink-0 bg-amber-50"
                />
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

        <MoreMenu />
      </div>
      <div className="sticky top-0 z-30  py-24 px-12   bg-white/90 backdrop-blur dark:border-white/10 dark:bg-[#111111]/90 w-full max-w-[1800px] mx-auto h-full sm:px-6 lg:px-12 pt-12 pb-10">
        <section className="w-full bg-[#111111]" aria-label="AI Leaderboard">
          <div className="w-full">
            <h1 className="text-sm sm:text-base lg:text-[17px] font-normal leading-snug mb-2 sm:mb-2.5">
              <span className="font-semibold text-white tracking-[-0.01em]">
                AI Leaderboard
              </span>
              <span className="text-gray-400 font-normal">
                {" "}
                &mdash; Rankings for 300+ Top AI Models by Intelligence, Speed
                &amp; Price
              </span>
            </h1>
            <p className="text-[11.5px] sm:text-xs lg:text-[13px] text-gray-400 leading-relaxed max-w-3xl">
              Independent rankings of GPT, Claude, Gemini, Llama, DeepSeek and
              300+ AI models &mdash; composite{" "}
              <InlineLink href="#">LLM Stats Score</InlineLink>, updated
              continuously from public benchmarks and live API metrics. See the
              full <InlineLink href="#">LLM Leaderboard</InlineLink> for
              complete LLM rankings with advanced filters.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
