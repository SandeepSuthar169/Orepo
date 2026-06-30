// import type { AxiosResponse } from "axios";
import axios  from "axios";
// import type { OSPStore } from "../types/Repo.ts";

export const apiResponse  =  axios.create({
    baseURL: "https://api.github.com/search",
    headers: {
        Accept: "application/vnd.github+json"
    }
})

// 
// export const apiTypeScipt = axios.create({
//     baseURL: "https://api.github.com/search/repositories?q=topic:typescript&sort=stars&order=desc&per_page=100&page=2"
// })