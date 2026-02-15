export interface ContactInfo {
    email: string
    github: string
    linkedin: string
    website: string
}

export interface Experience {
    company: string
    role: string
    dates: string
    bullets: string[]
}

export interface Project {
    name: string
    description: string
    tech: string[]
    highlights: string[]
}

export interface CVData {
    name: string
    role: string
    summary: string
    location: string
    contact: ContactInfo
    skills: string[]
    experience: Experience[]
    projects: Project[]
}

export interface GitHubRepo {
    id: number
    name: string
    full_name: string
    html_url: string
    description: string | null
    language: string | null
    stargazers_count: number
    forks_count: number
    topics: string[]
    updated_at: string
    created_at: string
}

export interface ProjectConfig {
    /** Repos to pin at the top of the projects page */
    pinned: string[]
    /** Repos to hide from the projects page */
    hidden: string[]
}
