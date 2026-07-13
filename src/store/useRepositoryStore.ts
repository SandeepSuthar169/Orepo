import { create } from 'zustand';
import type { Repository } from '../types/Types';
import fetchIonicRepositoriesApi from "../api/Api"
import axios from 'axios';

interface RepoState {
  repositories: Repository[];
  loading: boolean;
  error: string | null;
  fetchRepositories: () => Promise<void>;
}   

export const useRepoStore = create<RepoState>((set) => ({
  repositories: [],
  loading: false,
  error: null,
  
  fetchRepositories: async () => {
    set({ loading: true, error: null });
    try {
        const data = await fetchIonicRepositoriesApi();
        set({ repositories: data.items, loading: false });

    } catch (error: any) {
        let errorMessage = "Failed to fetch repositories. Please try again later.";

        if (axios.isAxiosError(error) && error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }  else if (error instanceof Error) {
            errorMessage = error.message;
        }

        set({  error: errorMessage, loading: false  });
        console.error(error);
    }
  },
}));