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
    tagline: string
    proofPoints: string[]
    summary: string
    location: string
    languages: string
    contact: ContactInfo
    skillGroups: SkillGroup[]
    experience: Experience[]
    education: Education[]
}
