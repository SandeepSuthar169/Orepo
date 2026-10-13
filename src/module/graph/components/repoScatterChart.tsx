"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRepoStore } from "@/hooks/use-github-api"; // adjust to where your store lives
import type { Repository } from "@/lib/types";

const MARGIN = { top: 28, right: 28, bottom: 56, left: 64 };
const HIT_RADIUS = 18; // px: how close the pointer must be to pick a point
const NEUTRAL = "#6b7280";
const PALETTE = [
  "#8b7cf6",
  "#f0a36b",
  "#6ea8fe",
  "#7bc47f",
  "#f2c14e",
  "#e57fa5",
  "#5cc8d7",
  "#a3a3a3",
];

const compact = new Intl.NumberFormat("en", { notation: "compact" });
const full = new Intl.NumberFormat("en");

const colorFor = (language: string | null) => {
  if (!language) return NEUTRAL;
  let h = 0;
  for (let i = 0; i < language.length; i++) {
    h = (h * 31 + language.charCodeAt(i)) >>> 0;
  }
  return PALETTE[h % PALETTE.length];
};

interface Axis {
  lo: number;
  hi: number;
  ticks: number[];
}

/** Log axis with 1-2-5 ticks ($0.02, $0.05, $0.1 ... in the design). */
function logAxis(min: number, max: number): Axis {
  const all: number[] = [];
  for (
    let e = Math.floor(Math.log10(min)) - 1;
    e <= Math.ceil(Math.log10(max)) + 1;
    e++
  ) {
    for (const m of [1, 2, 5]) all.push(m * 10 ** e);
  }
  const lo = Math.max(...all.filter((t) => t <= min));
  let hi = Math.min(...all.filter((t) => t >= max));
  if (hi <= lo) hi = lo * 2;
  return { lo, hi, ticks: all.filter((t) => t >= lo && t <= hi) };
}

const logPos = (v: number, a: Axis) =>
  (Math.log10(v) - Math.log10(a.lo)) / (Math.log10(a.hi) - Math.log10(a.lo));

interface Point {
  repo: Repository;
  stars: number;
  forks: number;
  language: string | null;
  color: string;
  x: number;
  y: number;
}

/** Repos that no other repo beats on both stars and forks. Ascending by stars. */
function paretoFrontier(points: Point[]): Point[] {
  const sorted = [...points].sort(
    (a, b) => b.stars - a.stars || b.forks - a.forks,
  );
  const out: Point[] = [];
  let bestForks = 0;
  for (const p of sorted) {
    if (p.forks > bestForks) {
      out.push(p);
      bestForks = p.forks;
    }
  }
  return out.reverse();
}

function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.clientWidth);
    const ro = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

const iconProps = {
  width: 13,
  height: 13,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const StarIcon = () => (
  <svg {...iconProps}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ForkIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <circle cx="18" cy="6" r="3" />
    <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" />
    <path d="M12 12v3" />
  </svg>
);

export default function RepoScatterChart() {
  const topic = useRepoStore((s) => s.topic);
  const repositories = useRepoStore((s) => s.repositories);
  const loading = useRepoStore((s) => s.loading);
  const error = useRepoStore((s) => s.error);
  const fetchRepositories = useRepoStore((s) => s.fetchRepositories);

  useEffect(() => {
    fetchRepositories();
  }, [topic, fetchRepositories]);

  const uid = useId().replace(/:/g, "");
  const [wrapRef, width] = useElementWidth<HTMLDivElement>();
  const height = width
    ? Math.round(Math.min(560, Math.max(360, width * 0.52)))
    : 420;

  const [activeId, setActiveId] = useState<number | null>(null);
  const pointerType = useRef("mouse");

  const innerW = width - MARGIN.left - MARGIN.right;
  const innerH = height - MARGIN.top - MARGIN.bottom;
  const left = MARGIN.left;
  const right = MARGIN.left + innerW;
  const top = MARGIN.top;
  const bottom = MARGIN.top + innerH;

  const model = useMemo(() => {
    if (!width || repositories.length === 0) return null;

    const raw = repositories.map((r) => ({
      repo: r,
      stars: Math.max(1, r.stargazers_count),
      forks: Math.max(1, r.forks_count),
      language: (r.language ?? null) as string | null,
    }));

    const xAxis = logAxis(
      Math.min(...raw.map((p) => p.stars)),
      Math.max(...raw.map((p) => p.stars)),
    );
    const yAxis = logAxis(
      Math.min(...raw.map((p) => p.forks)),
      Math.max(...raw.map((p) => p.forks)),
    );

    const points: Point[] = raw.map((p) => ({
      ...p,
      color: colorFor(p.language),
      x: left + logPos(p.stars, xAxis) * innerW,
      y: top + (1 - logPos(p.forks, yAxis)) * innerH,
    }));

    const frontier = paretoFrontier(points);

    const counts = new Map<string, number>();
    for (const p of points) {
      const key = p.language ?? "Other";
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    const legend = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({
        name,
        count,
        color: colorFor(name === "Other" ? null : name),
      }));

    return { points, frontier, xAxis, yAxis, legend };
  }, [repositories, width, innerW, innerH, left, top]);

  const active = model?.points.find((p) => p.repo.id === activeId) ?? null;

  const handlePointer = (e: React.PointerEvent<SVGRectElement>) => {
    if (!model) return;
    pointerType.current = e.pointerType;
    const box = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - box.left;
    const my = e.clientY - box.top;
    let best: Point | null = null;
    let bestD = HIT_RADIUS ** 2;
    for (const p of model.points) {
      const d = (p.x - mx) ** 2 + (p.y - my) ** 2;
      if (d < bestD) {
        bestD = d;
        best = p;
      }
    }
    setActiveId(best ? best.repo.id : null);
  };

  const openActive = () => {
    if (active && pointerType.current === "mouse") {
      window.open(active.repo.html_url, "_blank", "noopener,noreferrer");
    }
  };

  const frontierIds = new Set(model?.frontier.map((p) => p.repo.id));
  const first = model?.frontier[0];
  const last = model?.frontier[model.frontier.length - 1];
  const flip = active ? active.x > width * 0.6 : false;

  return (
    <section className="rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-sm sm:p-6 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
      <header className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-base font-semibold text-zinc-700 dark:text-zinc-100">
          Top {topic} Repositories
        </h2>
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          Each circle is one repository. Hover to see its stars and forks.
        </p>
      </header>

      <div
        ref={wrapRef}
        className="relative w-full"
        style={{ height }}
        onPointerLeave={() => setActiveId(null)}
      >
        {/* Loading */}
        {loading && !model && (
          <div className="absolute inset-0 flex animate-pulse items-center justify-center rounded-xl bg-zinc-100/70 text-sm text-zinc-400 dark:bg-zinc-800/60 dark:text-zinc-500">
            Loading repositories...
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-zinc-50 px-6 text-center dark:bg-zinc-800/50">
            <p className="max-w-md text-sm text-zinc-600 dark:text-zinc-300">
              {error}
            </p>
            <button
              type="button"
              onClick={() => fetchRepositories()}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:focus-visible:outline-zinc-100"
            >
              Try again
            </button>
          </div>
        )}

        {/*  Empty  */}
        {!loading && !error && repositories.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-zinc-400 dark:text-zinc-500">
            No repositories found for this topic. Try a different one.
          </div>
        )}

        {model && !error && (
          <>
            <svg
              width={width}
              height={height}
              role="img"
              aria-label={`Scatter plot of ${model.points.length} ${topic} repositories by stars and forks`}
              className={`block select-none transition-opacity ${
                loading ? "opacity-60" : ""
              } ${active ? "cursor-pointer" : ""}`}
            >
              <defs>
                {model.frontier.map((p) => (
                  <clipPath key={p.repo.id} id={`${uid}-clip-${p.repo.id}`}>
                    <circle cx={0} cy={0} r={10} />
                  </clipPath>
                ))}
              </defs>

              {/* Frontier zone */}
              {first && last && (
                <>
                  <polygon
                    className="fill-[#f1fbf7] dark:fill-emerald-400/10"
                    points={[
                      ...model.frontier.map((p) => `${p.x},${p.y}`),
                      `${right},${last.y}`,
                      `${right},${top}`,
                      `${first.x},${top}`,
                    ].join(" ")}
                  />
                  <text
                    x={first.x + 8}
                    y={top + 14}
                    className="fill-[#a9e2cf] text-[10px] font-bold tracking-widest dark:fill-emerald-400/40"
                  >
                    FRONTIER
                  </text>
                </>
              )}

              {/* Grid + x ticks */}
              {model.xAxis.ticks.map((t) => {
                const x = left + logPos(t, model.xAxis) * innerW;
                return (
                  <g key={`x-${t}`}>
                    <line
                      x1={x}
                      x2={x}
                      y1={top}
                      y2={bottom}
                      strokeDasharray="2 4"
                      className="stroke-zinc-200 dark:stroke-zinc-800"
                    />
                    <text
                      x={x}
                      y={bottom + 20}
                      textAnchor="middle"
                      className="fill-zinc-400 text-[11px] dark:fill-zinc-400"
                    >
                      {compact.format(t)}
                    </text>
                  </g>
                );
              })}

              {/* Grid + y ticks */}
              {model.yAxis.ticks.map((t) => {
                const y = top + (1 - logPos(t, model.yAxis)) * innerH;
                return (
                  <g key={`y-${t}`}>
                    <line
                      x1={left}
                      x2={right}
                      y1={y}
                      y2={y}
                      strokeDasharray="2 4"
                      className="stroke-zinc-200 dark:stroke-zinc-800"
                    />
                    <text
                      x={left - 12}
                      y={y}
                      dy="0.32em"
                      textAnchor="end"
                      className="fill-zinc-400 text-[11px] dark:fill-zinc-400"
                    >
                      {compact.format(t)}
                    </text>
                  </g>
                );
              })}

              {/* Axis titles */}
              <text
                x={left + innerW / 2}
                y={height - 12}
                textAnchor="middle"
                className="fill-zinc-300 text-[11px] dark:fill-zinc-500"
              >
                Stars (log scale)
              </text>
              <text
                transform={`translate(16 ${top + innerH / 2}) rotate(-90)`}
                textAnchor="middle"
                className="fill-zinc-300 text-[11px] dark:fill-zinc-500"
              >
                Forks (log scale)
              </text>

              {/* Regular points: hollow circles */}
              {model.points
                .filter((p) => !frontierIds.has(p.repo.id))
                .map((p) => (
                  <circle
                    key={p.repo.id}
                    cx={p.x}
                    cy={p.y}
                    r={5}
                    fill="transparent"
                    stroke={p.color}
                    strokeWidth={1.5}
                    strokeOpacity={0.75}
                    className="transition-opacity"
                    opacity={activeId && activeId !== p.repo.id ? 0.35 : 1}
                  />
                ))}

              {/* Frontier line */}
              {model.frontier.length > 1 && (
                <polyline
                  fill="none"
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                  className="stroke-[#bfe8da] dark:stroke-emerald-400/40"
                  points={model.frontier.map((p) => `${p.x},${p.y}`).join(" ")}
                />
              )}

              {/* Frontier points: owner avatars */}
              {model.frontier.map((p) => (
                <g
                  key={p.repo.id}
                  transform={`translate(${p.x} ${p.y})`}
                  className="transition-opacity"
                  opacity={activeId && activeId !== p.repo.id ? 0.5 : 1}
                >
                  <circle
                    r={12}
                    stroke={p.color}
                    strokeWidth={1.5}
                    className="fill-white dark:fill-zinc-900"
                  />
                  <image
                    href={p.repo.owner.avatar_url}
                    x={-10}
                    y={-10}
                    width={20}
                    height={20}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath={`url(#${uid}-clip-${p.repo.id})`}
                  />
                </g>
              ))}

              {/* Hover ring */}
              {active && (
                <circle
                  cx={active.x}
                  cy={active.y}
                  r={frontierIds.has(active.repo.id) ? 16 : 9}
                  fill={active.color}
                  fillOpacity={0.15}
                  stroke={active.color}
                  strokeWidth={2}
                />
              )}

              {/* Pointer capture layer */}
              <rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill="transparent"
                onPointerMove={handlePointer}
                onPointerDown={handlePointer}
                onClick={openActive}
              />
            </svg>

            {/* Tooltip */}
            {active && (
              <div
                role="tooltip"
                className="pointer-events-none absolute z-10 w-max max-w-xs rounded-xl border border-zinc-200 bg-white/95 px-3 py-2 text-xs shadow-lg backdrop-blur dark:border-zinc-700 dark:bg-zinc-800/95 dark:shadow-black/40"
                style={{
                  left: active.x,
                  top: active.y,
                  transform: `translate(${
                    flip ? "calc(-100% - 18px)" : "18px"
                  }, -50%)`,
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: active.color }}
                  />
                  <span className="truncate font-semibold text-zinc-900 dark:text-zinc-100">
                    {active.repo.full_name}
                  </span>
                </div>
                <dl className="mt-1.5 flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <dt className="sr-only">Stars</dt>
                    <StarIcon />
                    <dd className="tabular-nums">
                      {full.format(active.repo.stargazers_count)}
                    </dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <dt className="sr-only">Forks</dt>
                    <ForkIcon />
                    <dd className="tabular-nums">
                      {full.format(active.repo.forks_count)}
                    </dd>
                  </div>
                  {active.language && <span>{active.language}</span>}
                </dl>
              </div>
            )}
          </>
        )}
      </div>

      {/* Legend */}
      {model && (
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
          {model.legend.map((l) => (
            <li key={l.name} className="flex items-center gap-1.5">
              <span
                className="size-2 rounded-full border-[1.5px]"
                style={{ borderColor: l.color }}
              />
              {l.name}
              <span className="text-zinc-300 dark:text-zinc-600">
                {l.count}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
