"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import { MotionConfig, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { Star, Search2 } from "reicon-react";

import { useRepoStore } from "@/hooks/use-github-api";
// import ErrorRateLimit from './ErrorRateLimit';
// import LoadingRepositories from './Loading';


const BASE = "inline-flex items-center whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset";

const TONES = {
  red: "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-400/10 dark:text-red-300 dark:ring-red-400/25",
  rose: "bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-400/25",
  orange: "bg-orange-50 text-orange-800 ring-orange-600/20 dark:bg-orange-400/10 dark:text-orange-300 dark:ring-orange-400/25",
  amber: "bg-amber-50 text-amber-800 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/25",
  yellow: "bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-300 dark:ring-yellow-400/25",
  lime: "bg-lime-50 text-lime-800 ring-lime-600/20 dark:bg-lime-400/10 dark:text-lime-300 dark:ring-lime-400/25",
  green: "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-400/10 dark:text-green-300 dark:ring-green-400/25",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/25",
  teal: "bg-teal-50 text-teal-700 ring-teal-600/20 dark:bg-teal-400/10 dark:text-teal-300 dark:ring-teal-400/25",
  cyan: "bg-cyan-50 text-cyan-700 ring-cyan-600/20 dark:bg-cyan-400/10 dark:text-cyan-300 dark:ring-cyan-400/25",
  sky: "bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-300 dark:ring-sky-400/25",
  blue: "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-300 dark:ring-blue-400/25",
  indigo: "bg-indigo-50 text-indigo-700 ring-indigo-600/20 dark:bg-indigo-400/10 dark:text-indigo-300 dark:ring-indigo-400/25",
  violet: "bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-400/10 dark:text-violet-300 dark:ring-violet-400/25",
  purple: "bg-purple-50 text-purple-700 ring-purple-600/20 dark:bg-purple-400/10 dark:text-purple-300 dark:ring-purple-400/25",
  fuchsia: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-600/20 dark:bg-fuchsia-400/10 dark:text-fuchsia-300 dark:ring-fuchsia-400/25",
  pink: "bg-pink-50 text-pink-700 ring-pink-600/20 dark:bg-pink-400/10 dark:text-pink-300 dark:ring-pink-400/25",
  slate: "bg-slate-100 text-slate-700 ring-slate-600/20 dark:bg-slate-400/15 dark:text-slate-300 dark:ring-slate-400/25",
  zinc: "bg-zinc-100 text-zinc-700 ring-zinc-600/20 dark:bg-zinc-400/15 dark:text-zinc-300 dark:ring-zinc-400/25",
  stone: "bg-stone-100 text-stone-700 ring-stone-600/20 dark:bg-stone-400/15 dark:text-stone-300 dark:ring-stone-400/25",
} as const;

type Tone = keyof typeof TONES;


const LANGUAGE_TONE: Record<string, Tone> = {
  TypeScript: "blue",
  JavaScript: "yellow",
  Ruby: "red",
  Go: "cyan",
  Java: "amber",
  Python: "pink",
  C: "slate",
  "C++": "slate",
  "C#": "green",
  Rust: "orange",
  PHP: "indigo",
  Haskell: "purple",
  Elixir: "violet",
  HTML: "rose",
  Shell: "zinc",
  Svelte: "sky",
  Pascal: "lime",
  Clojure: "green",
  Scala: "red",
  "Jupyter Notebook": "amber",
  Vue: "emerald",
  Dart: "teal",
  Astro: "violet",
  MDX: "indigo",
  Kotlin: "lime",
  Swift: "orange",
  "Objective-C": "sky",
  Assembly: "stone",
  CSS: "fuchsia",
};

export const languageStyles: Record<string, string> = Object.fromEntries(
  Object.entries(LANGUAGE_TONE).map(([lang, tone]) => [lang, `${BASE} ${TONES[tone]}`]),
);

export const getLanguageStyle = (language?: string | null): string =>
  `${BASE} ${TONES[(language && LANGUAGE_TONE[language]) || "slate"]}`;

const fallbackStyles = "bg-gray-100 px-2 py-1 text-gray-700 border border-gray-400 border-transparent";

const baseStyles = "inline-flex items-center rounded-md text-xs font-medium whitespace-nowrap";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAFAFA]";

const formatStatExact = (num: number): string => {
  if (num > 1000) {
    return (Math.trunc(num / 100) / 10).toFixed(1) + "K";
  }
  return num.toString();
};

const formatDate = (iso: string): string => new Date(iso).toLocaleDateString();

const rowTransition = (index: number) => ({
  delay: Math.min(index, 12) * 0.03,
  duration: 0.2,
  ease: "easeOut" as const,
});



function LanguageBadge({ language }: { language?: string | null }) {
  const style =
    language && languageStyles[language]
      ? languageStyles[language]
      : fallbackStyles;

  return <span className={`${baseStyles} ${style}`}>{language || "N/A"}</span>;
}

function Topics({ topics, limit = 3 }: { topics: string[]; limit?: number }) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      {topics.slice(0, limit).map((repoTopic) => (
        <span
          key={repoTopic}
          className="inline-flex items-center rounded-md border border-gray-600 bg-[#262626] px-2 py-1 text-xs font-medium text-[#A1A1A1]"
        >
          {repoTopic}
        </span>
      ))}
      {topics.length > limit && (
        <span className="text-xs font-medium text-[#FAFAFA]/50">
          +{topics.length - limit}
        </span>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm">
      <span className="text-[#FAFAFA]/50">{label}</span>
      <span className="font-medium">{formatStatExact(value)}</span>
    </span>
  );
}

function EmptyState({
  query,
  onClear,
}: {
  query: string;
  onClear: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-14 text-center sm:py-20">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1c1c1c] text-[#FAFAFA]/50 shadow-sm">
        <Search className="h-5 w-5 stroke-[1.5]" />
      </div>

      <h3 className="mb-1 text-[14px] font-medium text-[#FAFAFA]">
        No repositories found
      </h3>
      <p className="mx-auto max-w-sm text-[13px] text-[#FAFAFA]/60">
        We couldn&apos;t find anything matching{" "}
        <span className="font-medium text-[#FAFAFA] wrap-break-word">
          &quot;{query}&quot;
        </span>
        . Try adjusting your search term or browsing a different topic.
      </p>

      <button
        type="button"
        onClick={onClear}
        className={`mt-4 rounded-md border border-white/10 bg-[#121314] px-4 py-2 text-xs font-medium text-[#FAFAFA] shadow-sm transition-colors hover:bg-[#1c1c1c] ${focusRing}`}
      >
        Clear search
      </button>
    </div>
  );
}

export default function RepositoryTable() {
  const { repositories, loading, error, fetchRepositories, topic } =
    useRepoStore();

  const [inputValue, setInputValue] = useState<string>("");
  const [activeSearch, setActiveSearch] = useState<string>("");

  useEffect(() => {
    fetchRepositories();
  }, [topic, fetchRepositories]);

  const filteredRepo = useMemo(() => {
    if (!activeSearch) return repositories;

    const query = activeSearch.toLowerCase();

    return repositories.filter(
      (repo) =>
        repo.full_name.toLowerCase().includes(query) ||
        repo.topics.some((t) => t.toLowerCase().includes(query)),
    );
  }, [repositories, activeSearch]);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed !== "") {
      setActiveSearch(trimmed);
      setInputValue("");
    }
  };

  const clearActiveFilter = () => {
    setActiveSearch("");
  };

  //   if (loading) return <LoadingRepositories />;
  //   if (error) return <ErrorRateLimit />;

  return (
    <MotionConfig reducedMotion="user">
      <div className="mt-6 flex h-9.8/10 min-h-125 w-full flex-1 flex-col overflow-hidden rounded-xl border border-white/10 bg-[#121314] pb-2.5 text-[#FAFAFA] shadow-sm sm:mt-12">
        <div className="px-3 pt-4 sm:px-4">
          <form
            onSubmit={handleSearchSubmit}
            className="group relative block w-full sm:max-w-md"
          >
            <Search2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#FAFAFA]/50 transition-colors duration-300 group-focus-within:text-[#FAFAFA]" />

            <input
              type="text"
              placeholder="Search by Repository or Topic...."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              aria-label="Search repositories"
              className="w-full rounded-lg border border-white/10 bg-[#1c1c1c] py-2.5 pl-10 pr-24 text-base text-[#FAFAFA] outline-none transition-all duration-300 placeholder:text-[#FAFAFA]/40 focus:border-white/40 focus:ring-4 focus:ring-white/5 sm:py-2 sm:text-sm"
            />

            <button
              type="submit"
              className={`absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-[#FAFAFA] px-3 py-1.5 text-xs font-medium text-[#121314] transition-all hover:bg-[#FAFAFA]/80 disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}
            >
              Search
            </button>
          </form>

          {activeSearch && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-sm text-[#FAFAFA]/60">Filtered by:</span>
              <div className="inline-flex max-w-full items-center gap-1.5 rounded-md border border-white/10 bg-[#1c1c1c] py-1 pl-2.5 pr-1.5 text-xs font-medium text-[#FAFAFA]">
                <span className="truncate">&quot;{activeSearch}&quot;</span>
                <button
                  type="button"
                  onClick={clearActiveFilter}
                  className={`shrink-0 rounded-full p-1 transition-colors hover:bg-white/10 ${focusRing}`}
                  aria-label="Clear filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 min-h-0 flex-1 overflow-auto border-t border-white/10">
          {filteredRepo.length === 0 ? (
            <EmptyState query={activeSearch} onClear={clearActiveFilter} />
          ) : (
            <>
              <ul className="divide-y divide-white/10 lg:hidden">
                {filteredRepo.map((repo, index) => (
                  <motion.li
                    key={repo.full_name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={rowTransition(index)}
                    className="px-3 py-4 transition-colors hover:bg-[#1c1c1c] active:bg-[#1c1c1c] sm:px-4"
                  >
                    <div className="flex items-start gap-3">
                      <Image
                        src={repo.owner.avatar_url}
                        alt={`${repo.owner.login} avatar`}
                        width={36}
                        height={36}
                        className="h-9 w-9 shrink-0 rounded-full border border-white/10"
                      />
                      <div className="min-w-0 flex-1">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className={`block text-[15px] font-medium text-[#FAFAFA] wrap-break-word transition-colors hover:text-blue-400 hover:underline ${focusRing}`}
                        >
                          {repo.full_name}
                        </a>
                        {repo.homepage && (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noreferrer"
                            className={`mt-0.5 inline-block text-xs text-[#FAFAFA]/50 transition-colors hover:text-blue-400 ${focusRing}`}
                          >
                            Homepage ↗
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="mt-2.5 line-clamp-3 text-sm text-[#FAFAFA]/60">
                      {repo.description || "No description provided."}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="inline-flex items-center gap-1 text-sm font-medium">
                        <Star size={16} weight="Filled" color="#EFBF04" />
                        <span className="sr-only">Stars</span>
                        {formatStatExact(repo.stargazers_count)}
                      </span>
                      <Stat label="Forks" value={repo.forks_count} />
                      <Stat label="Issues" value={repo.open_issues_count} />
                      <LanguageBadge language={repo.language} />
                    </div>

                    {repo.topics.length > 0 && (
                      <div className="mt-3">
                        <Topics topics={repo.topics} />
                      </div>
                    )}

                    <p className="mt-3 text-xs text-[#FAFAFA]/50">
                      Updated {formatDate(repo.updated_at)}
                    </p>
                  </motion.li>
                ))}
              </ul>

              <div className="hidden lg:block">
                <table className="w-full min-w-200 text-left text-[14px] text-[#FAFAFA]">
                  <thead className="sticky top-0 z-20 border-b border-white/10 bg-[#121314] text-[#FAFAFA] shadow-sm">
                    <tr>
                      <th className="sticky left-0 top-0 z-30 w-20 min-w-20 whitespace-nowrap bg-[#121314] px-4 py-3 font-medium">
                        Owner
                      </th>
                      <th className="sticky left-20 top-0 z-30 whitespace-nowrap border-r border-white/10 bg-[#121314] px-4 py-3 font-medium">
                        Repository
                      </th>
                      <th className="px-4 py-3 font-medium">Description</th>
                      <th className="whitespace-nowrap px-4 py-3 font-medium">
                        <div className="flex items-center gap-1">
                          <Star size={24} weight="Filled" color="#EFBF04" />
                          Stars
                        </div>
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 font-medium">
                        Forks
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 font-medium">
                        Issues
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 font-medium">
                        Language
                      </th>
                      <th className="px-4 py-3 font-medium">Topics</th>
                      <th className="whitespace-nowrap px-4 py-3 font-medium">
                        Updated
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/10 text-[11px]">
                    {filteredRepo.map((repo, index) => (
                      <motion.tr
                        key={repo.full_name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={rowTransition(index)}
                        className="group transition-colors hover:bg-[#1c1c1c]"
                      >
                        <td className="sticky left-0 z-10 w-20 min-w-20 bg-[#121314] px-4 py-3 align-top transition-colors group-hover:bg-[#1c1c1c]">
                          <Image
                            src={repo.owner.avatar_url}
                            alt={`${repo.owner.login} avatar`}
                            width={32}
                            height={32}
                            className="h-8 w-8 rounded-full border border-white/10"
                          />
                        </td>
                        <td className="sticky left-20 z-10 max-w-62.5 border-r border-white/10 bg-[#121314] px-4 py-3 align-top transition-colors group-hover:bg-[#1c1c1c]">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className={`font-medium text-[#FAFAFA] wrap-break-word transition-colors hover:text-blue-400 hover:underline ${focusRing}`}
                          >
                            {repo.full_name}
                          </a>
                          {repo.homepage && (
                            <div className="mt-1 text-xs">
                              <a
                                href={repo.homepage}
                                target="_blank"
                                rel="noreferrer"
                                className={`text-[#FAFAFA]/50 transition-colors hover:text-blue-400 ${focusRing}`}
                              >
                                Homepage ↗
                              </a>
                            </div>
                          )}
                        </td>
                        <td className="max-w-62.5 px-4 py-3 align-top">
                          <p className="line-clamp-2 text-sm text-[#FAFAFA]/60">
                            {repo.description || "No description provided."}
                          </p>
                        </td>
                        <td className="px-4 py-3 align-top font-medium text-[#FAFAFA]">
                          {formatStatExact(repo.stargazers_count)}
                        </td>
                        <td className="px-4 py-3 align-top text-[#FAFAFA]/80">
                          {formatStatExact(repo.forks_count)}
                        </td>
                        <td className="px-4 py-3 align-top text-[#FAFAFA]/80">
                          {formatStatExact(repo.open_issues_count)}
                        </td>
                        <td className="px-4 py-3 align-top">
                          <LanguageBadge language={repo.language} />
                        </td>
                        <td className="max-w-62.5 px-4 py-3 align-top">
                          <Topics topics={repo.topics} />
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 align-top text-xs text-[#FAFAFA]/60">
                          {formatDate(repo.updated_at)}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </MotionConfig>
  );
}
