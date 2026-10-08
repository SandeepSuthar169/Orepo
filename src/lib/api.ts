import axios, { isAxiosError } from "axios";
import type { GithubSearchResponse } from "./types";

const GITHUB_SEARCH_BASE_URL = process.env.GITHUB_SEARCH_BASE_URL;

const fetchReositoriesApi = async (topic: string) => {
  try {
    if (!GITHUB_SEARCH_BASE_URL) {
      throw new Error("GITHUB_SEARCH_BASE_URL is not configured");
    }

    const response = await axios.get<GithubSearchResponse>(
      GITHUB_SEARCH_BASE_URL,
      {
        params: {
          q: `topic:${topic}`,
          sort: "stars",
          order: "desc",
          per_page: 100,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(`API Error: 
                ${error.response?.status} 
                ${error.response?.data?.message || error.message}`);
    } else if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
};

export default fetchReositoriesApi;
