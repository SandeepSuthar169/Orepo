import axios from 'axios';
import  {type GithubResponse}  from '../types/Repo';

const apiClient = axios.create({
  baseURL: 'https://api.github.com',
});

export const fetchRepositories = async (
  query: string,
  page: number,
  perPage: number = 10
): Promise<GithubResponse> => {
  
    const response = await apiClient.get<GithubResponse>(
    `/search/repositories?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`
  );
  
  return response.data;
};

//"https://api.github.com/search/repositories?q=topic:typescript&sort=stars&order=desc&per_page=100&page=2"
