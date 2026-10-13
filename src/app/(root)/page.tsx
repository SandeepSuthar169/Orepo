"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { GitFork, Star, TrendingUp, Users } from "lucide-react";
import RepositoryTable from "@/module/home/components/repositoryTable";
import { AnchorHTMLAttributes, ReactNode } from "react";

type RepoLink = {
  label: string;
  href: string;
  icon: LucideIcon;
  StileClass: string;
};
type Language = {
  label: string;
  href: string;
  colorClass: string;
  underlineClass: string;
};

const REPO_LINKS: RepoLink[] = [
  {
    label: "Top Stars Repos",
    href: "/topstarsrepos",
    icon: Star,
    StileClass: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  },
  {
    label: "Top Fork Repos",
    href: "/topforkrepos",
    icon: GitFork,
    StileClass: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  },
  {
    label: "Trending Developers",
    href: "/trendingdevelopers",
    icon: Users,
    StileClass: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
  },
  {
    label: "Trending Repositories",
    href: "/trendingrepositories",
    icon: TrendingUp,
    StileClass: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
];
// language link
const LANGUAGE_LINKS: Language[] = [
  {
    label: "JS",
    href: "/js",
    colorClass: "text-yellow-600 dark:text-yellow-400",
    underlineClass: "decoration-yellow-600 dark:decoration-yellow-400",
  },
  {
    label: "TS",
    href: "/ts",
    colorClass: "text-blue-600 dark:text-blue-400",
    underlineClass: "decoration-blue-600 dark:decoration-blue-400",
  },
  {
    label: "Go",
    href: "/go",
    colorClass: "text-cyan-600 dark:text-cyan-400",
    underlineClass: "decoration-cyan-600 dark:decoration-cyan-400",
  },
  {
    label: "Python",
    href: "/python",
    colorClass: "text-teal-600 dark:text-teal-400",
    underlineClass: "decoration-teal-600 dark:decoration-teal-400",
  },
  {
    label: "Rust",
    href: "/rust",
    colorClass: "text-orange-600 dark:text-orange-400",
    underlineClass: "decoration-orange-600 dark:decoration-orange-400",
  },
  {
    label: "C++",
    href: "/cpp",
    colorClass: "text-pink-600 dark:text-pink-400",
    underlineClass: "decoration-pink-600 dark:decoration-pink-400",
  },
  {
    label: "PHP",
    href: "/php",
    colorClass: "text-indigo-600 dark:text-indigo-400",
    underlineClass: "decoration-indigo-600 dark:decoration-indigo-400",
  },
  {
    label: "Vue",
    href: "/vue",
    colorClass: "text-green-600 dark:text-green-400",
    underlineClass: "decoration-green-600 dark:decoration-green-400",
  },
  {
    label: "Java",
    href: "/java",
    colorClass: "text-red-600 dark:text-red-400",
    underlineClass: "decoration-red-600 dark:decoration-red-400",
  },
  {
    label: "C#",
    href: "/csharp",
    colorClass: "text-purple-600 dark:text-purple-400",
    underlineClass: "decoration-purple-600 dark:decoration-purple-400",
  },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-white/40";

export default function RepoQuickLinks() {
  const pathname = usePathname();

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

  return (
    <section className="w-full bg-[#FBFCF8] dark:border-white/10 dark:bg-[#111111]">
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
              {" "}
              &mdash;{" "}
            </span>
            Rankings for 300+ Top AI Models by Intelligence, Speed &amp; Price
          </span>
        </h1>
        <p className="max-w-3xl text-[13px] leading-relaxed text-neutral-500 dark:text-gray-400">
          Independent rankings of GPT, Claude, Gemini, Llama, DeepSeek and 300+
          AI models &mdash; composite{" "}
          <InlineLink href="#">LLM Stats Score</InlineLink>, updated
          continuously from public benchmarks and live API metrics. See the full{" "}
          <InlineLink href="#">LLM Leaderboard</InlineLink> for complete LLM
          rankings with advanced filters.
        </p>
      </section>

      <div className=" mx-auto flex max-w-[1800px]  justify-around items-center  px-4 py-7 sm:px-6 lg:px-2">
        <nav
          aria-label="Languages"
          className="mx-auto flex w-full  flex-wrap items-center justify-between gap-x-8 gap-y-4 sm:px-6 lg:px-8"
        >
          {LANGUAGE_LINKS.map(({ label, href, colorClass, underlineClass }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-1 py-0.5 text-2xl font-semibold leading-snug transition-opacity ${colorClass} ${focusRing} ${
                  active
                    ? `underline decoration-2 underline-offset-8 ${underlineClass}`
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className=" mx-auto w-full max-w-[1800px] border-b border-neutral-200 dark:border-white/20 px-4 py-8 sm:px-6 lg:px-12">
        <nav
          aria-label="Popular repositories"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {REPO_LINKS.map(({ label, href, icon: Icon, StileClass }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`group flex items-center gap-4 rounded-2xl  px-6 py-5 transition-colors ${focusRing} ${
                  active
                    ? "border-neutral-300 bg-black/6 dark:border-white/20 dark:bg-[#FBFCF8]/8"
                    : "border-neutral-200 bg-black/3 hover:bg-black/6 dark:border-white/10 dark:bg-[#FBFCF8]/3 dark:hover:bg-[#FBFCF8]/6"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${StileClass}`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span
                  className={`min-w-0 text-sm font-medium leading-snug transition-colors ${
                    active
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-700 group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-white"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mx-auto w-full max-w-[1800px] border-b border-neutral-200 dark:border-white/20 px-4 pt-2 pb-8 sm:px-6 lg:px-12">
        <RepositoryTable />
      </div>
    </section>
  );
}
