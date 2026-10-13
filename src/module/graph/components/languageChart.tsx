"use client";

import { useEffect, useMemo, useState } from "react";
import { useRepoStore } from "@/hooks/use-github-api"; 

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  Java: "#b07219",
  Go: "#00add8",
  Rust: "#dea584",
  "C++": "#f34b7d",
  C: "#6e6e6e",
  "C#": "#178600",
  PHP: "#4f5d95",
  Ruby: "#701516",
  Swift: "#f05138",
  Kotlin: "#a97bff",
  Dart: "#00b4ab",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Shell: "#89e051",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  MDX: "#fcb32c",
  Zig: "#ec915c",
  "Jupyter Notebook": "#da5b0b",
};
const FALLBACK_COLOR = "#8b8b85";

interface LanguageChartProps {
  topN?: number;
  autoFetch?: boolean;
  className?: string;
}

function Bar({ pct, color }: { pct: number; color: string }) {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setFilled(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="h-2 w-full overflow-hidden rounded-full bg-neutral-200/80 dark:bg-neutral-800"
    >
      <div
        className="h-full rounded-full transition-[width] duration-700 ease-out motion-reduce:transition-none"
        style={{ width: filled ? `${pct}%` : "0%", backgroundColor: color }}
      />
    </div>
  );
}

function Skeleton() {
  return (
    <div role="status" aria-label="Loading chart" className="flex flex-col gap-4 sm:gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="grid animate-pulse grid-cols-[1.75rem_1fr_auto] items-center gap-x-3 gap-y-1.5 motion-reduce:animate-none md:grid-cols-[2rem_11rem_1fr_3.5rem] md:gap-y-0"
        >
          <div className="h-3 w-4 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-3 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-3 w-6 justify-self-end rounded bg-neutral-200 dark:bg-neutral-800 md:order-last" />
          <div className="col-span-2 col-start-2 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 md:col-span-1 md:col-start-auto" />
        </div>
      ))}
    </div>
  );
}

export default function LanguageChart({
  topN = 10,
  autoFetch = true,
  className = "",
}: LanguageChartProps) {
  const topic = useRepoStore((s) => s.topic);
  const repositories = useRepoStore((s) => s.repositories);
  const loading = useRepoStore((s) => s.loading);
  const error = useRepoStore((s) => s.error);
  const fetchRepositories = useRepoStore((s) => s.fetchRepositories);

  useEffect(() => {
    if (autoFetch) void fetchRepositories();
  }, [autoFetch, topic, fetchRepositories]);

  const { rows, unknown } = useMemo(() => {
    const counts = new Map<string, number>();
    let unknown = 0;

    for (const repo of repositories) {
      if (!repo.language) {
        unknown += 1;
        continue;
      }
      counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
    }

    const rows = [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, topN)
      .map(([language, count]) => ({ language, count }));

    return { rows, unknown };
  }, [repositories, topN]);

  const max = rows[0]?.count ?? 0;

  return (
    <section
      aria-labelledby="language-chart-title"
      className={`w-full rounded-2xl border border-neutral-200 bg-[#f7f7f5] p-4 text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 sm:p-6 ${className}`}
    >
      <header className="mb-4 flex flex-col gap-1 border-b border-neutral-200 pb-3 dark:border-neutral-800 sm:flex-row sm:items-baseline sm:justify-between">
        <h2
          id="language-chart-title"
          className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400"
        >
          Repositories by language
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {repositories.length} repositories for #{topic}
        </p>
      </header>

      {loading ? (
        <Skeleton />
      ) : error ? (
        <div role="alert" className="flex flex-col items-start gap-3 py-4 text-sm">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            type="button"
            onClick={() => void fetchRepositories()}
            className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-900 dark:focus-visible:outline-neutral-100"
          >
            Try again
          </button>
        </div>
      ) : rows.length === 0 ? (
        <p className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
          No repositories with a language found for #{topic}. Try another topic.
        </p>
      ) : (
        <>
          <ol className="flex flex-col gap-4 sm:gap-3">
            {rows.map((row, i) => {
              const color = LANGUAGE_COLORS[row.language] ?? FALLBACK_COLOR;
              return (
                <li
                  key={row.language}
                  aria-label={`${row.language}: ${row.count} repositories`}
                  className="grid grid-cols-[1.75rem_1fr_auto] items-center gap-x-3 gap-y-1.5 md:grid-cols-[2rem_11rem_1fr_3.5rem] md:gap-y-0"
                >
                  <span className="text-xs tabular-nums text-neutral-400 dark:text-neutral-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="flex min-w-0 items-center gap-2 text-sm font-medium">
                    <span
                      aria-hidden="true"
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="truncate">{row.language}</span>
                  </span>

                  <span className="text-right text-sm tabular-nums text-neutral-600 dark:text-neutral-300 md:order-last">
                    {row.count}
                  </span>

                  <div className="col-span-2 col-start-2 md:col-span-1 md:col-start-auto">
                    <Bar pct={(row.count / max) * 100} color={color} />
                  </div>
                </li>
              );
            })}
          </ol>

          {unknown > 0 && (
            <p className="mt-5 text-xs text-neutral-500 dark:text-neutral-400">
              {unknown} {unknown === 1 ? "repository has" : "repositories have"} no language set and{" "}
              {unknown === 1 ? "isn't" : "aren't"} shown.
            </p>
          )}
        </>
      )}
    </section>
  );
}