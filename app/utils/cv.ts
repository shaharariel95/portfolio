import type { CVData } from './types'

/**
 * Single source for the site's CV content.
 * Mirrors public/cv.pdf — when the CV changes, update this file and replace the PDF.
 * Deliberately left off the site: the launch timeline and internal product names.
 */
export const cvData: CVData = {
    name: 'Shahar Ariel',
    role: 'Full Stack & Mobile Developer',
    degree: 'B.Sc. in Software Engineering',
    employer: 'Tomax',
    years: '3+ years',
    tagline: 'I take products from proof of concept to production — and keep them running.',
    pattern: 'Three products in production right now, each built and run by me alone: two at Tomax, one of my own.',
    experienceLead: '3+ years building production web, mobile and AI products.',
    summary:
        'Full Stack Developer with 3+ years of production experience building web and mobile applications, AI-powered products and large-scale assessment platforms. At Tomax, took an AI-powered oral-defense product from proof of concept to commercial launch as its sole developer, and serve as the company\'s sole mobile developer. Experienced in Vue.js, PHP, React Native, AWS and production LLM integrations.',
    location: 'Israel',
    languages: 'Hebrew (native), English (fluent)',
    contact: {
        email: 'ShaharAriel95@gmail.com',
        github: 'shaharariel95',
        linkedin: 'shaharariel',
        website: 'https://shaharariel.dev'
    },
    skillGroups: [
        { label: 'Languages', items: ['JavaScript (ES6+)', 'PHP', 'Python', 'SQL', 'HTML5', 'CSS3'] },
        { label: 'Frontend & Mobile', items: ['Vue.js', 'React Native', 'Angular', 'Electron', 'Tailwind CSS'] },
        { label: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'MVC', 'OOP'] },
        { label: 'Databases', items: ['MySQL', 'MongoDB', 'DynamoDB', 'Firestore'] },
        { label: 'Cloud & AI', items: ['AWS (Lambda, ECS, EC2, S3, SQS, CloudWatch, Bedrock)', 'Google Cloud (Cloud Run, Cloud Storage, Cloud Scheduler)', 'Firebase (Auth, Hosting)', 'Azure Speech Services', 'LLM integration'] },
        { label: 'Tools', items: ['Vitest', 'Playwright', 'Git', 'Docker', 'Linux', 'Bash', 'Twilio', 'App Store Connect', 'Google Play Console'] }
    ],
    experience: [
        {
            company: 'Tomax – Digital Assessment Platform',
            role: 'Full Stack Developer',
            dates: '2024 – Present',
            groups: [
                {
                    title: 'VivaGo – AI-powered oral-defense product (sole developer)',
                    bullets: [
                        'Took VivaGo, Tomax\'s AI-powered oral-defense product in which students defend their submitted work in short video answers, from internal proof of concept to commercial launch.',
                        'Implemented AI-powered question and weighted-rubric generation, per-answer summaries, originality scoring and Bloom\'s taxonomy classification. Maintain the provider-agnostic speech-to-text integration supporting both Azure and AWS.',
                        'Designed the database and the data contracts connecting VivaGo to Tomax\'s existing systems (question editor, exam delivery client, and grading and reporting), and built the student defense flow and instructor report on top of them.'
                    ]
                },
                {
                    title: 'Mobile & exam platform',
                    bullets: [
                        'Sole developer of Tomax\'s React Native companion app (iOS & Android), owning the full lifecycle from features and maintenance to App Store and Google Play releases. Used for second-camera exam monitoring and scanning handwritten work.',
                        'Developed and maintained a large-scale exam platform (tens of thousands of exams and hundreds of thousands of candidate exam sessions a year) using Vue.js, Electron, PHP, MySQL and AWS.',
                        'Integrated AI-driven question generation and rewriting using AWS Bedrock, and built analytics and BI pipelines over high-volume exam data.'
                    ]
                }
            ],
            bullets: []
        },
        {
            company: 'Uniper-Care – Connected Living Platform',
            role: 'Full Stack Developer (student position)',
            dates: '2023 – 2024',
            bullets: [
                'Developed and integrated new platform features using Node.js, Angular, Vue.js and MongoDB.',
                'Built and deployed a WhatsApp-based reminder and assistance system for users, and maintained the Twilio messaging integration behind it.'
            ]
        },
        {
            company: 'Percepto Robotics – Autonomous Inspection Systems',
            role: 'Technical Support Engineer',
            dates: '2021 – 2022',
            bullets: [
                'Beyond the support role, built an internal tool that automated pre-shift validation checks for drone fleets. It became part of the team\'s daily routine, cutting manual inspection and speeding up deployment readiness.',
                'Resolved software and hardware issues for robotics systems deployed worldwide (Linux, Bash).'
            ]
        },
        {
            company: 'Mitchashvim',
            role: 'Volunteer, alongside studies',
            dates: '2020 – 2021',
            bullets: ['Coordinated the acquisition and distribution of computers.'],
            earlier: true
        },
        {
            company: 'IDF – Armored Corps',
            role: 'Faculty Instructor, Command-and-Control Systems',
            dates: '2016 – 2017',
            bullets: [
                'Brought a new command-and-control system into use across the Armored Corps and trained soldiers on it, testing each update with Elbit Systems developers before release and turning the changes into training material.'
            ],
            earlier: true
        },
        {
            company: 'IDF – Armored Corps',
            role: 'Tank Commander',
            dates: '2014 – 2016',
            bullets: ['Commanded a tank crew in operational combat units.'],
            earlier: true
        }
    ],
    education: [
        {
            degree: 'B.Sc. in Software Engineering',
            school: 'Shenkar College – Faculty of Engineering',
            dates: '2020 – 2024',
            note: 'Final project: SignMyName — grade 95, top project in the class'
        }
    ]
}

/** Flat skill list (terminal `skills`) */
export const allSkills = cvData.skillGroups.flatMap(g => g.items)
