// import type { AxiosResponse } from "axios";
import axios  from "axios";
// import type { OSPStore } from "../types/Repo.ts";

export const api  =  axios.create({
    baseURL: "https://api.github.com/search",
    headers: {
        Accept: "application/vnd.github+json"
    }
})


