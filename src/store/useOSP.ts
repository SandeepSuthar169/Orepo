import { create } from "zustand";
import { apiResponse } from "../services/Api";
import { type RepositoriesResponse } from "../types/Repo"
import axios from "axios";

interface SearchResponse {
    items: RepositoriesResponse[]
}

interface OSPStore {
    opss: RepositoriesResponse[]
    loading: boolean
    error: string | null 

    fetchOPS: () => Promise<void>
}

export const useOSPStore = create<OSPStore>((set) => ({
    opss: [],
    loading: false,
    error: null,


    fetchOPS: async () => {
        try {
            set({ loading: true, error: null })

            const response = await apiResponse.get<SearchResponse>("/repositories?q=topic:open-source-project&sort=stars&order=desc&per_page=921");

            set({
                opss: response.data.items,
                loading: false
            })

        } catch (error: unknown) {
            
            set({
                loading: false,
            })
            if(axios.isAxiosError(error)){
                console.log("axios error", error.message);
                console.log("axios error", error?.status);
                
            }

        }
    }
}))



