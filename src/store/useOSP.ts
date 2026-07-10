import { create } from 'zustand';
import type { Repository, SortConfig } from '../types/Repo';
import { fetchRepositories } from "../services/Api";

interface RepoState {
  items: Repository[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  page: number;
  sortConfig: SortConfig;
  
  // Actions
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  setSort: (key: keyof Repository) => void;
  fetchData: () => Promise<void>;
}

export const useRepoStore = create<RepoState>((set, get) => ({
  items: [],
  totalCount: 0,
  loading: false,
  error: null,
  searchQuery: 'topic:ionic',
  page: 1,
  sortConfig: { key: null, direction: null },

  setSearchQuery: (query) => set({ searchQuery: query, page: 1 }),
  
  setPage: (page) => set({ page }),
  
  setSort: (key) => {
    const { sortConfig, items } = get();
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedItems = [...items].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];
      
      if (valA === valB) return 0;
      if (valA == null) return 1;
      if (valB == null) return -1;

      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    set({ sortConfig: { key, direction }, items: sortedItems });
  },

  fetchData: async () => {
    const { searchQuery, page } = get();
    set({ loading: true, error: null });
    try {
      const data = await fetchRepositories(searchQuery, page);
      set({ items: data.items, totalCount: data.totalCount, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch repositories', loading: false });
    }
  },
}));