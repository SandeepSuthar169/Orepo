export interface OSP {
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

    owner: {
        avatar_url: string
    }

    license?: {
        name: string 
    }
    
    topics: string[]
}

