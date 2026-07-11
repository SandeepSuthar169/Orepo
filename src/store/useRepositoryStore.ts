import { create } from 'zustand';
import type { Repository, SortConfig, SortDirection } from '../types/Types';
import { fetchRepositories } from "../services/Api";

interface RepoState {
  items: Repository[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  page: number;
  sortConfig: SortConfig;
  sortDirection: SortDirection

  // Actions
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  setSort: (config: SortConfig, direction?: SortDirection) => Promise<void>;
  fetchData: () => Promise<void>;
}

export const useRepoStore = create<RepoState>((set, get) => ({
  items: [],
  totalCount: 0,
  loading: false,
  error: null,
  searchQuery: 'topic:ionic',
  page: 1,
  sortConfig: "stargazers_count",
  sortDirection: "desc",

  setSearchQuery: (query) => set({ searchQuery: query, page: 1}),
  setPage: (page) => set({ page }),

  setSort: async (config: SortConfig, direction?: SortDirection) => {
    const state = get();
  
    const newDirection =
      config === state.sortConfig
        ? state.sortDirection === "asc"
          ? "desc"
          : "asc"
        : direction ?? "desc";
  
    set({
      sortConfig: config,
      sortDirection: newDirection,
    });
  
    await get().fetchData();
  },

  fetchData: async () => {
    const {
      searchQuery,
      page,
      sortConfig,
      sortDirection,
    } = get();


    set({ loading: true, error: null });
    try {
      const data = await fetchRepositories(
        searchQuery,
        page,
        sortConfig,
        sortDirection
      );      
      set({ items: data.items, totalCount: data.totalCount, loading: false });
    
    } catch (error) {
      set({ error: 'Failed to fetch repositories', loading: false });
    }
  },
}));