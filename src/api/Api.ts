import axios, { isAxiosError } from "axios";
import type { GithubSearchResponse } from "../types/Types";

const fetchIonicRepositoriesApi = async () : Promise<GithubSearchResponse> => {
    try {
        const response = await axios.get<GithubSearchResponse>(
           "https://api.github.com/search/repositories?q=topic:machine-learning&sort=stars&order=desc&per_page=100"
        );    
        return response.data
    
    } catch (error) {

        if (isAxiosError(error)) {
            console.error(`API Error: 
                ${error.response?.status} - 
                ${error.response?.data?.message || error.message}`);

        } else if (error instanceof Error) {
            console.error(error.message);
        }
        throw error;
    }    

}

export default fetchIonicRepositoriesApi