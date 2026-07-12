import type { GithubSearchResponse } from "../types/Types"
import axios from "axios"


interface FetchRepositoriesType {
  topic: string;
  page?: number;
  perPage?: number;
}

const GITHUB_API = "https://api.github.com/search/repositories"

export const fetchRepositories  = async ({topic, page = 1, perPage = 15}: FetchRepositoriesType): Promise<GithubSearchResponse> =>  {
  
  try {
    const response = await axios.get<GithubSearchResponse>(GITHUB_API,  {
      params: {
        q: `topic:${topic}`,
        sort: 'stars',
        order: 'desc',
        page,
        per_page: perPage,
      },
      timeout: 10000
    })
    return  response.data 

  }  catch (error) {

    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message || error.code);
      
    }

    throw new Error("Failed to fetch repositories.");
  }
}

//  "https://api.github.com/search/repositories?q=topic:typescript&sort=stars&order=desc&per_page=100&page=2"
