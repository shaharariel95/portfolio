/**
 * Featured work — case studies.
 * Employer products (Tomax): only public information (product page / store listings) plus my own role.
 * No screenshots, customer data, numbers, internal system names or launch timelines.
 */

export interface CaseStudy {
    slug: string
    name: string
    company: string
    tagline: string
    role: string
    links?: { label: string; url: string }[]
    /** Short muted demo clip (mp4) + poster, shown under the header */
    video?: { src: string; poster: string; caption: string }
    /** Card picture; cards without one show a small terminal panel of the flow instead */
    thumb?: string
    /** Screenshots (own products only — never employer screens) */
    images?: { src: string; width: number; height: number; alt: string; caption: string }[]
    problemTitle?: string
    problem?: string[]
    /** Short label on cards, e.g. "Tomax" or "Own product" */
    badge: string
    flowTitle: string
    /** 'steps' = vertical chain with arrows (pipelines, timelines); 'grid' = side-by-side uses */
    flowStyle: 'steps' | 'grid'
    flow: { title: string; detail: string }[]
    built: string[]
    /** Where it stands / what it achieved — closes the story */
    outcome?: string[]
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
        badge: 'Tomax',
        flowTitle: 'How it works',
        flowStyle: 'steps',
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
        outcome: [
            'Launched as a commercial Tomax product, with a public product page and sales underway.'
        ],
        stack: ['Vue.js', 'PHP', 'MySQL', 'AWS', 'Azure Speech', 'LLMs'],
        note: 'Closed-source product. Details here come from Tomax\'s public product page; screens and internals are confidential.'
    },
    {
        slug: 'tsubermango',
        name: 'TsuberMango',
        company: 'Independent',
        badge: 'Own product · in production',
        tagline:
            'The system a mango sorting warehouse runs its season on: pallet intake and weighing, shipping certificates and a live cold-room map — built for the people on the floor, on tablets, in Hebrew.',
        role: 'Designed, built and run it end to end, working directly with the sorting center that uses it.',
        links: [{ label: 'GitHub ↗', url: 'https://github.com/shaharariel95/TsuberMango' }],
        thumb: '/media/tsubermango-dashboard.webp',
        images: [
            {
                src: '/media/tsubermango-dashboard.webp', width: 1600, height: 945,
                alt: 'TsuberMango dashboard in Hebrew: season totals, the latest pallets, and a card per grower with pallets, crates, weight and pallets waiting to ship',
                caption: 'The dashboard: season totals, latest pallets and a card per grower.'
            },
            {
                src: '/media/tsubermango-fridge.webp', width: 1600, height: 947,
                alt: 'TsuberMango cold-room map: a 5×8 grid of fridge slots with pallets placed in some of them, and a pick list of pallets grouped by grower',
                caption: 'The cold-room map: drag pallets from the list into fridge slots; every tablet sees it live.'
            }
        ],
        problemTitle: 'Why it started on Google Sheets',
        problem: [
            'The warehouse already ran on spreadsheets, and a new system had to earn its place mid-season without breaking that.',
            'So version one wrote straight into the farmers\' own Google Sheets: nothing about their existing flow changed, and if the app wasn\'t for them, all their data was still exactly where it had always been.',
            'Once it proved itself, it moved to a real database — without a rewrite, because the app never talked to Sheets directly.'
        ],
        flowTitle: 'How it evolved',
        flowStyle: 'steps',
        flow: [
            { title: 'Nov 2024', detail: 'First version on Google Sheets: pallet intake and weighing form, editable pallet table, shipping labels and printable stickers.' },
            { title: '2025 season', detail: 'Google sign-in with roles, live updates between devices, destination summaries, and an admin screen for farmers, varieties, sizes and destinations.' },
            { title: 'Mid 2026', detail: 'Records moved to Firestore behind a storage-agnostic repository layer; Firebase Auth; a multi-tenant data model so one codebase can serve several sorting centers.' },
            { title: 'Oct 2026', detail: 'Sheets retired to a cold archive. Shipping certificates (issue, reprint, auto-split, merged PDF, Excel export), scheduled backups with a restore tool, and a season-reset flow.' },
            { title: 'Now', detail: 'A live cold-room map: drag pallets into fridge slots and every connected tablet sees the move instantly.' }
        ],
        built: [
            'A Vue 3 + Tailwind app designed for warehouse tablets, fully in Hebrew (RTL), with Hebrew PDF generation for stickers and certificates.',
            'An Express API on Google Cloud Run with Firebase Auth; every write goes through the backend, while clients read live updates gated by Firestore security rules.',
            'The repository layer that made the Sheets → Firestore migration a swap rather than a rewrite.',
            'Real-time sync across tablets through Firestore listeners instead of WebSockets, so the Cloud Run backend can scale to zero between bursts of work.',
            'Operational safety for a business that can\'t lose a season: an audit trail, soft delete and restore, versioned shipping certificates, and scheduled Cloud Storage backups with a non-destructive restore tool.',
            'Tests at every level: unit tests (Vitest), API tests against the Firebase emulators, and Playwright end-to-end tests including a tablet viewport.'
        ],
        outcome: [
            'The sorting floor\'s day-to-day system: pallets go through it from intake and weighing to the shipping certificate.',
            'Replaced the spreadsheet workflow step by step, with the farmers keeping their data the whole way.'
        ],
        stack: ['Vue 3', 'Tailwind CSS', 'Node.js', 'Express', 'Firestore', 'Firebase Auth', 'Cloud Run', 'Cloud Storage', 'Docker', 'Google Sheets API', 'Playwright', 'Vitest'],
        note: 'Open source. Built for a real sorting center and used through the mango season; business details are kept general.'
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
        badge: 'Tomax',
        flowTitle: 'What it\'s used for',
        flowStyle: 'grid',
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
        outcome: [
            'Live on the App Store and Google Play, used by candidates during real exams.'
        ],
        stack: ['React Native', 'iOS', 'Android', 'App Store Connect', 'Google Play Console'],
        note: 'Closed-source product. Details here come from its public store listings; internals are confidential.'
    },
    {
        slug: 'signmyname',
        name: 'SignMyName',
        company: 'Shenkar College',
        badge: 'B.Sc. final project · open source',
        tagline:
            'A desktop app that teaches children Israeli Sign Language through real-time webcam gesture recognition. Final project of my B.Sc. — grade 95, top project in the class.',
        role: 'Lead developer of the application, in a team of three.',
        links: [{ label: 'GitHub ↗', url: 'https://github.com/Sign-My-Name' }],
        thumb: '/media/signmyname-poster.jpg',
        video: {
            src: '/media/signmyname-demo.mp4',
            poster: '/media/signmyname-poster.jpg',
            caption: 'Learning the letter ש: the app shows the sign, reads the webcam, and confirms when it recognises it.'
        },
        flowTitle: 'How recognition works',
        flowStyle: 'steps',
        flow: [
            { title: 'Capture', detail: 'Webcam frames come in through OpenCV.' },
            { title: 'Detect & crop', detail: 'MediaPipe finds the hand and the app crops it in real time.' },
            { title: 'Classify', detail: 'A CNN (TensorFlow) predicts which Israeli Sign Language letter is being signed.' },
            { title: 'Vote', detail: 'A sliding-window vote over recent predictions spells words letter by letter, without flicker.' },
            { title: 'Teach', detail: 'Four game-like learning screens: learn a letter, practise, build a word, learn words.' }
        ],
        built: [
            'The application itself: real-time hand detection and cropping, CNN inference, and the sliding-window vote for spelling words.',
            'An auto-update mechanism that pulls new model versions from GitHub, so improved models reach users without a reinstall.',
            'Trained on a self-collected dataset of 50,000+ images and evaluated through a 62-participant user study.',
            'Presented and defended before an academic committee that included an ML expert.'
        ],
        outcome: [
            'Grade 95 and the top project in the class.',
            'Validated with 62 participants in a user study.'
        ],
        stack: ['Python', 'TensorFlow', 'OpenCV', 'MediaPipe', 'CNN', 'Tkinter'],
        note: 'Open source (MIT).'
    }
]
