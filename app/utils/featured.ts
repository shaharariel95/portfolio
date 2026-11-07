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
    links?: { label: string; url: string }[]
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
        links: [{ label: 'Product page ↗', url: 'https://www.tomax.io/products/vivago' }],
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
            { title: 'Review', detail: 'Instructor gets the recording, a clickable transcript and editable scores.' }
        ],
        built: [
            'The AI pipeline: question and weighted-rubric generation, per-answer summaries, originality scoring and Bloom\'s taxonomy classification.',
            'A provider-agnostic speech-to-text layer, so Azure and AWS are interchangeable behind one interface.',
            'The database design and the data contracts that plug VivaGo into the company\'s existing assessment platform.',
            'The student defense flow and the instructor report built on top of them.'
        ],
        stack: ['Vue.js', 'PHP', 'MySQL', 'AWS', 'Azure Speech', 'LLMs'],
        note: 'Closed-source product. Details here come from Tomax\'s public product page; screens and internals are confidential.'
    },
    {
        slug: 'tomax-vix',
        name: 'Tomax Vix',
        company: 'Tomax',
        tagline:
            'The mobile extension of Tomax\'s exam platform (iOS & Android): candidates use their phone to scan handwritten work, act as a second camera, check the exam room and record oral answers.',
        role: 'Sole mobile developer — features, maintenance and every App Store / Google Play release.',
        links: [
            { label: 'App Store ↗', url: 'https://apps.apple.com/il/app/tomax-vix/id1622031042' },
            { label: 'Google Play ↗', url: 'https://play.google.com/store/apps/details?id=com.tomax.mobile' }
        ],
        flowTitle: 'What it\'s used for',
        flow: [
            { title: 'Scan', detail: 'Capture handwritten notebook pages and submit them digitally with the exam.' },
            { title: 'Second camera', detail: 'A phone or tablet becomes an extra view of the candidate during high-stakes exams.' },
            { title: 'Room check', detail: 'Use the phone camera to show the exam room meets the institution\'s requirements.' },
            { title: 'Oral answers', detail: 'Record and submit audio answers for oral exams.' }
        ],
        built: [
            'Owning the full mobile lifecycle on a single React Native codebase for iOS and Android.',
            'Shipping and maintaining releases through App Store Connect and Google Play Console, including store review.',
            'Keeping the app in step with the desktop exam platform it extends.'
        ],
        stack: ['React Native', 'iOS', 'Android', 'App Store Connect', 'Google Play Console'],
        note: 'Closed-source product. Details here come from its public store listings; internals are confidential.'
    }
]
