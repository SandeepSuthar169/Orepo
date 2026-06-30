import { create } from "zustand";
import { api } from "../services/Api";
import { type OSP } from "../types/Repo"



interface OSPStore {
    opss: OSP[]
    loading: boolean
    error: string | [] | null 

    fetchOPS: () => Promise<void>
}

export const useOSPStore = create<OSPStore>((set) => ({
    opss: [],
    loading: false,
    error: null,


    fetchOPS: async () => {
        try {
            set({ loading: true, error: null })

            const reponse = await api.get<OSP[]>("/repositories?q=topic:open-source-project&sort=stars&order=desc&per_page=921");

            set({
                opss: reponse.data,
                loading: false
            })

        } catch (error: any) {
            set({
                loading: false,
                error: "Faild to fetch ops"
            })

        }
    }
}))



