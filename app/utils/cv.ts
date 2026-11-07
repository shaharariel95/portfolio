import type { CVData } from './types'

export const cvData: CVData = {
    name: "Shahar Ariel",
    role: "Full Stack & Mobile Developer",
    summary:
        "Full Stack Developer with 3+ years of production experience building web and mobile applications, AI-powered products and large-scale assessment platforms. At Tomax I took an AI-powered oral-defense product from proof of concept to commercial launch in 3 months as its sole developer, and I'm the company's sole mobile developer. Experienced in Vue.js, PHP, React Native, AWS and production LLM integrations.",
    location: "Israel",
    contact: {
        email: "ShaharAriel95@gmail.com",
        github: "shaharariel95",
        linkedin: "shaharariel",
        website: "https://shaharariel.dev"
    },
    skills: [
        "JavaScript (ES6+)",
        "TypeScript",
        "PHP",
        "Python",
        "SQL",
        "Vue.js",
        "Nuxt",
        "React Native",
        "Angular",
        "Electron",
        "Node.js",
        "REST APIs",
        "MySQL",
        "MongoDB",
        "DynamoDB",
        "AWS",
        "AWS Bedrock",
        "Azure Speech",
        "LLM Integration",
        "Twilio",
        "Git",
        "Linux (Bash)",
        "Cloudflare"
    ],
    experience: [
        {
            company: "Tomax – Digital Assessment Platform",
            role: "Full Stack Developer",
            dates: "2024 – Present",
            bullets: [
                "VivaGo (sole developer): took Tomax's AI-powered oral-defense product — students defend their submitted work in short video answers — from internal proof of concept to commercial launch in about 3 months.",
                "Implemented AI-powered question and weighted-rubric generation, per-answer summaries, originality scoring and Bloom's taxonomy classification, on a provider-agnostic speech-to-text layer (Azure and AWS).",
                "Sole developer of Tomax's React Native companion app (iOS & Android), owning features, maintenance and App Store / Google Play releases — used for second-camera exam monitoring and scanning handwritten work.",
                "Designed VivaGo's database and the data contracts connecting it to Tomax's existing systems (question editor, TomaETest exam delivery, grading and reporting), and built the student defense flow and instructor report.",
                "Developed and maintained a large-scale exam platform (tens of thousands of exams and hundreds of thousands of candidate sessions a year) using Vue.js, Electron, PHP, MySQL and AWS.",
                "Integrated AI-driven question generation and rewriting with AWS Bedrock, and built analytics and BI pipelines over high-volume exam data."
            ]
        },
        {
            company: "Uniper-Care – Connected Living Platform",
            role: "Full Stack Developer (student position)",
            dates: "2023 – 2024",
            bullets: [
                "Developed and integrated new platform features using Node.js, Angular, Vue.js and MongoDB.",
                "Built and deployed a WhatsApp-based reminder and assistance system for users, and maintained the Twilio messaging integration behind it."
            ]
        },
        {
            company: "Percepto Robotics – Autonomous Inspection Systems",
            role: "Technical Support Engineer",
            dates: "2021 – 2022",
            bullets: [
                "Built an internal tool that automated pre-shift validation checks for drone fleets; it became part of the team's daily routine, cutting manual inspection and speeding up deployment readiness.",
                "Resolved software and hardware issues for robotics systems deployed worldwide (Linux, Bash)."
            ]
        },
        {
            company: "Kedma Ltd.",
            role: "Marketing & Export Management",
            dates: "2019 – 2020",
            bullets: [
                "Managed international marketing and export operations."
            ]
        },
        {
            company: "IDF – Armored Corps",
            role: "Faculty Instructor, Command-and-Control Systems",
            dates: "2016 – 2017",
            bullets: [
                "Responsible for bringing a new command-and-control system into use across the Armored Corps, and trained soldiers on it.",
                "Worked with Elbit Systems developers to test each update before release, documenting the changes and turning them into training material."
            ]
        },
        {
            company: "IDF – Armored Corps",
            role: "Tank Commander",
            dates: "2014 – 2016",
            bullets: [
                "Commanded a tank crew in operational combat units."
            ]
        }
    ],
    education: [
        {
            degree: "B.Sc. in Software Engineering",
            school: "Shenkar College – Faculty of Engineering",
            dates: "2020 – 2024",
            note: "Final project: SignMyName — grade 95, top project in the class"
        }
    ],
    projects: [
        {
            name: "SignMyName",
            description:
                "Desktop app that teaches children Israeli Sign Language through real-time webcam gesture recognition. Final B.Sc. project, built in a team of three — grade 95, top project in the class.",
            tech: [
                "Python",
                "TensorFlow",
                "OpenCV",
                "MediaPipe",
                "CNN",
                "Tkinter"
            ],
            highlights: [
                "Lead developer: real-time hand detection and cropping, CNN inference, and a sliding-window vote for spelling words letter by letter.",
                "Auto-update mechanism that pulls new model versions from GitHub.",
                "Trained on a self-collected dataset of 50,000+ images and evaluated through a 62-participant user study."
            ]
        }
    ]
};
