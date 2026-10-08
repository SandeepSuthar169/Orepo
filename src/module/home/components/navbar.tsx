"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PiGithubLogoBold } from "react-icons/pi";
import { Menu, MessageCircle, Moon, Search, Sun, X } from "lucide-react";

type NavLink = { label: string; href: string };

const NAV_LINKS: NavLink[] = [
  { label: "Open Dashboard", href: "/opendashboard" },
  { label: "AI", href: "/ai" },
  { label: "Frontend", href: "/fontend" },
  { label: "Backend", href: "/backend" },
  { label: "Database", href: "/database" },
  { label: "DevOps", href: "/devops" },
  { label: "MlOps", href: "/mlops" },
  { label: "Mobiles", href: "/mobiles" },
];

const GITHUB_URL = "https://github.com/SandeepSuthar169/Orepo";
const SEARCH_ACTION = "/models"; // GET /models?q=...



const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-white/40";

const iconButton = `inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-white/10 dark:hover:text-white ${focusRing}`;

// Home page logo 

function Logo() {
  return (
    <Link
      href="/"
      aria-label="Orepo Home"
      className={`flex items-center gap-1.5 rounded-full text-neutral-900 dark:text-white ${focusRing}`}
    >
      <span className="rounded-full border-2 border-current px-3 py-2 text-[13px] font-extrabold leading-none tracking-tight">
        Orepo
      </span>
    </Link>
  );
}

// This is Serch input 

function SearchBox({
  className = "",
  inputRef,
}: {
  className?: string;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  return (
    <form
      action={SEARCH_ACTION}
      role="search"
      className={`flex h-9 items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 transition-colors focus-within:border-neutral-400 dark:border-white/10 dark:bg-white/5 dark:focus-within:border-white/30 ${className}`}
    >
      <Search
        className="h-4 w-5 shrink-0 text-neutral-500"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="search"
        name="q"
        placeholder="Search..."
        aria-label="Search models and organizations"
        autoComplete="off"
        className="min-w-4 flex-1 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-500 dark:text-white [&::-webkit-search-cancel-button]:hidden"
      />
      
    </form>
  );
}

// This is Theme toggle function 

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    setIsDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={iconButton}
    >
      {isDark ? (
        <Moon className="h-4.5 w-4.5" aria-hidden="true" />
      ) : (
        <Sun className="h-4.5 w-4.5" aria-hidden="true" />
      )}
    </button>
  );
}

// This is Navbar section 

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modKey, setModKey] = useState("⌘");
  const searchRef = useRef<HTMLInputElement>(null);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Show Ctrl instead of ⌘ on non-Apple devices.
  useEffect(() => {
    if (!/Mac|iPhone|iPad/i.test(navigator.userAgent)) setModKey("Ctrl");
  }, []);

  // ⌘K / Ctrl+K focuses the search input.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close the mobile menu after navigating.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const linkBase =
    "rounded-lg text-sm font-medium transition-colors " + focusRing;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-[#111111]/90">
      <div className="mx-auto flex h-14 max-w-[1800px] items-center gap-4 px-4 sm:px-6 xl:gap-6">
        <Logo />

        {/* Desktop links */}
        <nav aria-label="Main" className="hidden items-center xl:flex">
          {NAV_LINKS.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`${linkBase} px-2.5 py-2 2xl:px-4 ${
                  active
                    ? "text-neutral-900 dark:text-white"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join our Discord"
            className={`${linkBase} px-2.5 py-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white 2xl:px-4`}
          >
            <PiGithubLogoBold  className="h-7 w-5"/>
          </a>
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          <SearchBox
            inputRef={searchRef}
            className="hidden w-48 md:flex xl:w-48 2xl:w-60"
          />

          <Link
            href="/feedback"
            aria-label="Send feedback"
            className={`hidden h-9 items-center gap-2 rounded-lg border border-neutral-200 px-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:bg-white/10 sm:inline-flex ${focusRing}`}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span className="2xl:inline">Feedback</span>
          </Link>



          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`${iconButton} xl:hidden`}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-neutral-200 bg-white px-4 pb-4 pt-3 dark:border-white/10 dark:bg-[#111111] sm:px-6 xl:hidden"
        >
          <SearchBox className="mb-3 md:hidden" />

          <nav aria-label="Mobile" className="flex flex-col gap-0.5">
            {NAV_LINKS.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`${linkBase} px-3 py-2.5 ${
                    active
                      ? "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white"
                      : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-white/10 dark:hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkBase} flex items-center gap-2 px-3 py-2.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-white/10 dark:hover:text-white`}
            >
                {/* icon */}
            <PiGithubLogoBold  className="h-7 w-5"/>
            </a>
            <Link
              href="/feedback"
              className={`${linkBase} flex items-center gap-2 px-3 py-2.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 sm:hidden dark:hover:bg-white/10 dark:hover:text-white`}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Feedback
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}