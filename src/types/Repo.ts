export interface Owner {
    avatar_url: string
}

export interface License {
    name: string
}

export interface Repository {
    id: number
    full_name: string
    html_url: string
    description: string
    language: string
    homepage: string | null
    default_branch?: string

    stargazers_count: number
    forks_count: number
    open_issues_count: number
    forks: number
    watchers: number

    owner: Owner

    license?: License
    
    topics: string[]
}

export interface GithubResponse {
    totalCount: number
    incomplete_results: boolean;
    items: Repository[]
} 

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  key: keyof Repository | null;
  direction: SortDirection;
}
