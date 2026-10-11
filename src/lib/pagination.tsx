"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number; // current page, 1-based
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number; // optional: enables the "Showing 11–20 of 134" label
  pageSize?: number; // required together with totalItems
};

/** 1 … 4 5 6 … 20 — always keeps first/last page and a window around the current one. */
export function getPageItems(page: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  let start = Math.max(2, page - 1);
  let end = Math.min(total - 1, page + 1);
  if (page <= 3) end = Math.min(total - 1, 4); // keep width stable near the start
  if (page >= total - 2) start = Math.max(2, total - 3); // …and near the end

  const items: (number | "…")[] = [1];
  if (start > 2) items.push("…");
  for (let i = start; i <= end; i++) items.push(i);
  if (end < total - 1) items.push("…");
  items.push(total);
  return items;
}

const btnBase =
  "inline-flex h-10 min-w-10 items-center justify-center gap-1 rounded-md border px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 disabled:pointer-events-none disabled:opacity-40 dark:focus-visible:outline-[#FAFAFA]";

const btnIdle =
  "border-neutral-200 text-neutral-700 hover:bg-neutral-100 dark:border-white/10 dark:text-[#FAFAFA]/80 dark:hover:bg-[#1c1c1c]";

const btnActive =
  "border-gray-50 bg-neutral-100 text-gray-700 dark:border-gray-500 dark:bg-[#111111] dark:text-white";

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const go = (p: number) => onPageChange(Math.min(Math.max(p, 1), totalPages));

  const showRange = totalItems !== undefined && pageSize !== undefined;
  const from = showRange ? (page - 1) * pageSize + 1 : 0;
  const to = showRange ? Math.min(page * pageSize, totalItems) : 0;

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col items-center gap-3 border-t border-neutral-200 px-3 py-3 dark:border-white/10 sm:flex-row sm:justify-between sm:px-4"
    >
      {showRange && (
        <p className="hidden text-xs text-neutral-500 dark:text-[#FAFAFA]/50 sm:block">
          Showing {from}–{to} of {totalItems}
        </p>
      )}

      <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
        <button
          type="button"
          onClick={() => go(page - 1)}
          disabled={page === 1}
          className={`${btnBase} ${btnIdle}`}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Previous
        </button>

        {/* Phones: compact status text instead of numbered buttons */}
        <span className="text-sm text-neutral-600 dark:text-[#FAFAFA]/60 sm:hidden">
          Page {page} of {totalPages}
        </span>

        {/* sm and up: numbered pages */}
        <ul className="hidden items-center gap-1 sm:flex">
          {getPageItems(page, totalPages).map((item, i) =>
            item === "…" ? (
              <li
                key={`gap-${i}`}
                aria-hidden="true"
                className="px-1 text-sm text-neutral-500 dark:text-[#FAFAFA]/50"
              >
                …
              </li>
            ) : (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => go(item)}
                  aria-label={`Page ${item}`}
                  aria-current={item === page ? "page" : undefined}
                  className={`${btnBase} ${item === page ? btnActive : btnIdle}`}
                >
                  {item}
                </button>
              </li>
            ),
          )}
        </ul>

        <button
          type="button"
          onClick={() => go(page + 1)}
          disabled={page === totalPages}
          className={`${btnBase} ${btnIdle}`}
        >
          Next
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}