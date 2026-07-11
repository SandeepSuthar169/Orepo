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
    })
    return  response.data

  } catch (error) {
    
    console.error("Failed to fetch repositories:", error);
    throw error;
  }

}
  // e "https://api.github.com/search/repositories?q=topic:typescript&sort=stars&order=desc&per_page=100&page=2"
