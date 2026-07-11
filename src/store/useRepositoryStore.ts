import { create } from 'zustand';
import type { Repository, } from '../types/Types';
import { fetchRepositories } from "../api/Api";
export type SortKey = keyof Repository | 'owner.avatar_url' | 'license.name';

interface RepoState {
  repositories: Repository[];
  totalCount: number;
  loading: boolean;
  error: string | null;

  topic: string;
  searchTerm: string;

  currentPage: number;

  sortKey: SortKey | null;
  sortDirection: "asc" | "desc";

  fetchData: () => Promise<void>;
  setTopic: (topic: string) => void;
  setSearchTerm: (term: string) => void;
  setPage: (page: number) => void;
  setSort: (key: SortKey) => void;
}

export const useRepoStore = create<RepoState>((set, get) => ({
  repositories: [],
  totalCount: 0,
  loading: false,
  error: null,

  topic: 'ionic',
  searchTerm: '',
  currentPage: 1,
  sortKey: null,
  sortDirection: 'asc',

  fetchData: async () => {
    const { topic, currentPage } = get();

    set({ loading: true, error: null })

    try {
      const data = await fetchRepositories({ topic, page: currentPage, perPage: 15});      
      
      set({ repositories: data.items, totalCount: data.total_count, loading: false });

    } catch (error: unknown) {

      let message = "Failed to fetch";
      if (error instanceof Error) {
        message = error.message;
      }
  
      set({ error: message, loading: false });  
    }
  },

  setTopic: (topic) => {
    set({topic, currentPage: 1})
    get().fetchData()
  },

  setSearchTerm: (searchTerm) => set({ searchTerm }),
 
  setPage: (currentPage) => {
    set({ currentPage })
    get().fetchData()
  },

  setSort: (key) => {
    const { sortKey, sortDirection } = get();
    const isAsc = sortKey === key && sortDirection === 'asc';
    set({
      sortKey: key,
      sortDirection: isAsc ? 'desc' : 'asc',
    });
  }

  
}));