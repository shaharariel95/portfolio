import type { GitHubRepo } from '~/utils/types'
import { projectConfig } from '~/utils/projects.config'

export function useGitHub() {
    const repos = ref<GitHubRepo[]>([])
    const loading = ref(true)
    const error = ref<string | null>(null)

    const fetchRepos = async () => {
        loading.value = true
        error.value = null

        try {
            // 1. Fetch user repos
            const userRes = await fetch(
                'https://api.github.com/users/shaharariel95/repos?sort=updated&per_page=50'
            )
            if (!userRes.ok) throw new Error(`GitHub API returned ${userRes.status}`)
            const userData: GitHubRepo[] = await userRes.json()

            // 2. Fetch specific external repos (e.g. Sign-My-Name/tkinter)
            const externalReposToFetch = projectConfig.pinned.filter(
                p => p.includes('/') && !userData.find(u => u.full_name === p || u.name === p)
            )

            const externalData: GitHubRepo[] = []
            for (const fullRepoName of externalReposToFetch) {
                try {
                    const res = await fetch(`https://api.github.com/repos/${fullRepoName}`)
                    if (res.ok) {
                        const repo = await res.json()
                        // Manual overrides
                        if (repo.full_name === 'Sign-My-Name/tkinter') {
                            repo.name = 'SignMyName'
                            repo.description = 'Educational application for teaching Israeli Sign Language using deep learning and computer vision (TensorFlow, OpenCV).'
                        }
                        externalData.push(repo)
                    }
                } catch (err) {
                    console.error(`Failed to fetch external repo ${fullRepoName}`, err)
                }
            }

            // Merge
            const allRepos = [...userData, ...externalData]

            // Filter out hidden repos
            repos.value = allRepos.filter(r => !projectConfig.hidden.includes(r.name))

        } catch (e: any) {
            error.value = e.message || 'Failed to fetch repos'
        } finally {
            loading.value = false
        }
    }

    // Sort: pinned first, then by updated_at
    const sorted = computed(() => {
        const pinned = projectConfig.pinned
        return [...repos.value].sort((a, b) => {
            const getPinIndex = (r: GitHubRepo) => {
                const indexFull = pinned.indexOf(r.full_name)
                const indexName = pinned.indexOf(r.name)
                if (indexFull !== -1 && indexName !== -1) return Math.min(indexFull, indexName)
                if (indexFull !== -1) return indexFull
                return indexName
            }

            const aPinned = getPinIndex(a)
            const bPinned = getPinIndex(b)

            if (aPinned !== -1 && bPinned !== -1) return aPinned - bPinned
            if (aPinned !== -1) return -1
            if (bPinned !== -1) return 1
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        })
    })

    // Helper to check if pinned
    const isPinned = (name: string) => {
        return projectConfig.pinned.includes(name) || projectConfig.pinned.some(p => p.endsWith('/' + name) || name === "SignMyName")
    }

    return { repos: sorted, loading, error, fetchRepos, isPinned }
}
