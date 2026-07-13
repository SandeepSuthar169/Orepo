export interface Owner {
    [x: string]: any;
    avatar_url: string;
  }
  
  export interface License {
    name: string;
}
  
export interface Repository {
    id: number;
    full_name: string;
    owner: Owner;
    html_url: string;
    description: string;
    updated_at: string;
    homepage: string | null;
    stargazers_count: number;
    language: string;
    forks_count: number;
    open_issues_count: number;
    license: License | null;
    topics: string[];
}
  
export interface GithubSearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: Repository[];  
}