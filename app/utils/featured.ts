/**
 * Featured work — case studies for closed-source products.
 * Only public information (the product's public page) plus my own role.
 * No screenshots, customer data, numbers or internal system names.
 */

export interface CaseStudy {
    slug: string
    name: string
    company: string
    tagline: string
    role: string
    publicUrl?: string
    problem?: string[]
    flowTitle: string
    flow: { title: string; detail: string }[]
    built: string[]
    stack: string[]
    note: string
}

export const featured: CaseStudy[] = [
    {
        slug: 'vivago',
        name: 'VivaGo',
        company: 'Tomax',
        tagline:
            'AI-powered oral defense: students defend the work they submitted in a few short video answers, and instructors get a scored, transcribed report for every answer.',
        role: 'Sole developer — took it from an internal proof of concept to a commercial product, and own it end to end.',
        publicUrl: 'https://www.tomax.io/products/vivago',
        problem: [
            'A polished submission no longer shows who did the thinking behind it.',
            'AI-detection scores are probabilities — they don\'t show what a student actually understands.',
            'Live oral exams do, but they take more time than most courses can spare.'
        ],
        flowTitle: 'How it works',
        flow: [
            { title: 'Set up', detail: 'Instructor uploads the assignment; AI drafts questions and weighted rubrics, the instructor reviews and edits.' },
            { title: 'Defend', detail: 'Student submits the work, then records 2–5 short video answers, each with prep time.' },
            { title: 'Transcribe', detail: 'Speech-to-text through a provider-agnostic layer (Azure or AWS).' },
            { title: 'Analyze', detail: 'AI summary, rubric scores with written reasons, originality score and Bloom\'s level per answer.' },
            { title: 'Review', detail: 'Instructor gets the recording, a clickable transcript and editable scores; grades flow back to the LMS.' }
        ],
        built: [
            'The AI pipeline: question and weighted-rubric generation, per-answer summaries, originality scoring and Bloom\'s taxonomy classification.',
            'A provider-agnostic speech-to-text layer, so Azure and AWS are interchangeable behind one interface.',
            'The database design and the data contracts that plug VivaGo into the company\'s existing assessment platform.',
            'The student defense flow and the instructor report built on top of them.'
        ],
        stack: ['Vue.js', 'PHP', 'MySQL', 'AWS', 'Azure Speech', 'LLMs', 'LTI 1.3'],
        note: 'Closed-source product. Details here come from Tomax\'s public product page; screens and internals are confidential.'
    },
    {
        slug: 'companion-app',
        name: 'Exam Companion App',
        company: 'Tomax',
        tagline:
            'A React Native app for iOS and Android that turns a candidate\'s phone into a second camera for exam monitoring and a scanner for handwritten work.',
        role: 'Sole mobile developer — features, maintenance and every App Store / Google Play release.',
        flowTitle: 'What it\'s used for',
        flow: [
            { title: 'Second camera', detail: 'The phone becomes an extra view of the candidate\'s workspace during a monitored exam.' },
            { title: 'Scan', detail: 'Candidates capture handwritten work with the phone and submit it with their exam.' },
            { title: 'Sync', detail: 'Everything lands in the same exam session on the platform for review.' }
        ],
        built: [
            'Owning the full mobile lifecycle on a single React Native codebase for iOS and Android.',
            'Shipping and maintaining releases through App Store Connect and Google Play Console, including store review.',
            'Keeping the app in step with the web exam platform it works alongside.'
        ],
        stack: ['React Native', 'iOS', 'Android', 'App Store Connect', 'Google Play Console'],
        note: 'Closed-source product. Screens and internals are confidential.'
    }
]
