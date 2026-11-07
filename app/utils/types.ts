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
    /** Optional sub-groups (e.g. one product) — rendered as titled bullet lists */
    groups?: { title: string; bullets: string[] }[]
    bullets: string[]
    /** Shown compactly under "Earlier" on the site; full detail stays on the CV */
    earlier?: boolean
}

export interface Education {
    degree: string
    school: string
    dates: string
    note?: string
}

export interface SkillGroup {
    label: string
    items: string[]
}

export interface CVData {
    name: string
    role: string
    degree: string
    employer: string
    years: string
    tagline: string
    /** One line under the tagline: the pattern across the featured work */
    pattern: string
    /** One-line intro for the experience page */
    experienceLead: string
    summary: string
    location: string
    languages: string
    contact: ContactInfo
    skillGroups: SkillGroup[]
    experience: Experience[]
    education: Education[]
}
