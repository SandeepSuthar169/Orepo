export interface Owner {
    avatar_url: string
}

export interface License {
    name: string
}

export interface Repository {        // repository collect data
    id: number
    full_name: string
    html_url: string
    description: string
    language: string
    homepage: string | null

    stargazers_count: number
    forks_count: number
    open_issues_count: number
    forks: number
    
    owner: Owner
    license?: License
    topics: string[]
}

export interface GithubSearchResponse {
    total_count: number | undefined       // when github search after response 
    totalCount: number
    incomplete_results: boolean;
    items: Repository[]
} 

