'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { DimensionId } from './scholarships-store'

export type StudentStory = {
  id: string
  title: string
  summary: string
  dimensionTags: DimensionId[]
}

export type StudentStats = {
  scholarshipsMatched: number
  draftsGenerated: number
  avgAlignment: number
  lastActiveAt?: string
  topMatchIds?: string[]
}

export type StudentProfile = {
  id: string
  name: string
  program: string
  year: string
  tags: string[]

  gpa?: number
  gpaScale?: 4 | 12 | 100
  location?: string
  university?: string
  campus?: string
  degreeLevel?: 'Undergraduate' | 'Graduate' | 'College' | 'Other'
  enrollmentStatus?: 'Full-time' | 'Part-time' | 'Co-op/PEY' | 'Other'
  citizenshipStatus?: 'Domestic' | 'International' | 'Permanent Resident' | 'Other'
  firstGen?: boolean
  languages?: string[]
  workStatus?: 'Not working' | 'Part-time' | 'Full-time'
  financialNeedLevel?: 'Low' | 'Medium' | 'High' | 'Prefer not to say'
  awards?: string[]
  testScores?: Partial<{
    sat: number
    act: number
    gre: number
    gmat: number
    toefl: number
    ielts: number
  }>

  recommendedScholarshipIds: string[]

  features: Record<DimensionId, number>
  stories: StudentStory[]
  baseStory?: string
  stats: StudentStats
}

const SEED_STUDENT_PROFILES: StudentProfile[] = [
  {
    id: 's1',
    name: 'Sophie Bennett',
    program: 'Computer Engineering',
    year: '3rd year',
    tags: ['Robotics', 'Mentorship', 'Teaching'],
    gpa: 3.78,
    gpaScale: 4,
    location: 'Toronto, ON',
    university: 'University of Toronto',
    campus: 'St. George',
    degreeLevel: 'Undergraduate',
    enrollmentStatus: 'Full-time',
    citizenshipStatus: 'Domestic',
    firstGen: false,
    languages: ['English'],
    workStatus: 'Part-time',
    financialNeedLevel: 'Low',
    awards: ['Dean’s List', 'Undergraduate Research Poster Award'],
    recommendedScholarshipIds: [
      'stem-innovation-award',
      'innovation-challenge-grant',
      'emerging-researcher-scholarship',
    ],
    features: {
      academics: 0.82,
      leadership: 0.75,
      community: 0.6,
      need: 0.2,
      innovation: 0.9,
      research: 0.7,
      adversity: 0.25,
    },
    baseStory:
      'Sophie is a third-year Computer Engineering student focused on building practical robotics systems that improve access to STEM learning. She combines strong coursework with hands-on prototyping, and she has gradually taken on leadership roles where she designs learning experiences for younger students and coordinates small project teams. Her work shows a consistent pattern: identify a real constraint in a community or lab setting, iterate on a technical solution, and then translate the outcome into something others can use. She is motivated by the idea that engineering should be understandable and empowering to non-experts, especially students who do not have easy access to lab equipment or mentorship.',
    stories: [
      {
        id: 's1-1',
        title: 'Low-cost robotics kit for middle schools',
        summary:
          'In her second year, Sophie noticed that many Toronto middle schools had robotics clubs in name only. Teachers were enthusiastic, but most programs relied on a small number of expensive kits that were difficult to repair and hard to share across large classes. Sophie began by interviewing three club supervisors and a dozen students to understand what actually blocked participation. The consistent answer was not interest, but access: kits were too costly to scale, replacement parts were slow to order, and existing curricula assumed prior experience. Sophie decided to treat this as an engineering and design problem rather than a volunteer project.\n\nShe assembled a small team of two classmates and mapped a set of constraints: the kit had to cost under $60 per student, survive repeated classroom use, and be programmable by students with no prior coding background. Her first prototype used off-the-shelf microcontrollers and 3D-printed parts, but the drivetrain repeatedly failed under load. She documented the failure modes, replaced the mounts with laser-cut acrylic, and redesigned the gear ratios to reduce torque stress. The second prototype worked mechanically, but students struggled with wiring. After a pilot session with eight students, Sophie introduced color-coded connectors and a simple “snap-in” harness that reduced setup time from roughly 25 minutes to under 8.\n\nWith a working prototype in hand, she created a modular lesson framework that moved from basic sensor feedback to autonomous navigation. Each lesson included a short story-based scenario (for example, a robot delivering supplies in a simulated disaster zone) to make the task feel meaningful. Sophie personally ran four weekend workshops across two schools, training not only students but also teachers so the clubs could continue without her presence. Over the semester, interest grew from a baseline of 12 active participants to 47 students across the two sites.\n\nTo ensure sustainability, she published the full build files, bill of materials, and starter code in an open repository, and she arranged a small donation drive through her faculty to cover initial parts. Teachers reported that the simplified wiring and clearer instruction lowered the intimidation barrier for new students. Sophie’s work demonstrated not just technical ingenuity, but also an ability to deliver a solution that scaled. The project reinforced her belief that innovation counts most when it removes real obstacles for others, and it remains the anchor example she uses when describing her engineering direction.',
        dimensionTags: ['innovation', 'community', 'leadership'],
      },
      {
        id: 's1-2',
        title: 'Undergraduate research in swarm robotics',
        summary:
          'Sophie joined a swarm robotics lab after being fascinated by distributed systems in a controls course. The lab was developing coordination strategies for small ground robots that could map indoor environments collaboratively. When she arrived, the team had a promising algorithm on paper, but the physical robots were inconsistent in practice. Some units drifted, and collisions were frequent when multiple robots converged on the same waypoint. Sophie’s role started with debugging, but she quickly moved into a more analytical position once she realized the failure was systematic.\n\nShe designed a reproducible evaluation pipeline: a standardized maze layout, fixed starting positions, and logged telemetry for position, heading, and inter-robot distance at ten-millisecond intervals. This let the lab compare runs across different parameter settings. Her early analysis showed that the robots’ low-cost IMUs produced biased heading estimates after about 90 seconds, causing the coordination policy to over-correct and bunch robots together. Instead of hand-tuning, Sophie proposed a two-layer approach. First, she added a lightweight filter that fused wheel odometry with IMU signals to reduce drift. Second, she modified the coordination rule to include a “repulsion radius” that scaled with local uncertainty, so robots automatically gave more space when their estimates were noisier.\n\nImplementing the filter required careful calibration. Sophie ran a series of single-robot trials to estimate wheel slip under different floor materials, then fed those correction terms into the fused model. She validated the filter by comparing predicted paths against overhead camera ground truth, showing a 38% reduction in cumulative heading error. With the improved state estimates, she integrated the adaptive repulsion rule. In multi-robot trials, collision events dropped from an average of 6.2 per 10-minute run to 1.4, and overall map coverage improved by roughly 22%.\n\nSophie presented the updated results to the lab, including clear plots of error growth and collision rates. More importantly, she explained the story behind the improvement: the algorithm became stronger not through complexity, but by respecting the real limits of sensors and letting uncertainty drive behavior. She co-authored a poster for an undergraduate research conference that highlighted the experimental setup, the failure-to-fix cycle, and the measurable gains.\n\nThe experience changed how she thinks about research. She learned that strong academic work is not just about having the right idea, but about building the instrumentation and experiments that reveal why an idea fails. Her contribution remains valuable to the lab because it is both technical and method-driven, and it supports her longer-term goal of working on resilient autonomous systems in real-world environments.',
        dimensionTags: ['research', 'academics', 'innovation'],
      },
    ],
    stats: {
      scholarshipsMatched: 9,
      draftsGenerated: 12,
      avgAlignment: 84,
      lastActiveAt: new Date().toISOString(),
      topMatchIds: [
        'stem-innovation-award',
        'innovation-challenge-grant',
        'emerging-researcher-scholarship',
      ],
    },
  },
  {
    id: 's2',
    name: 'Jiawen Liu',
    program: 'Health Studies & Public Policy',
    year: '2nd year',
    tags: ['Community Health', 'Advocacy', 'Newcomer Support'],
    gpa: 3.64,
    gpaScale: 4,
    location: 'Vancouver, BC',
    university: 'University of British Columbia',
    campus: 'Vancouver',
    degreeLevel: 'Undergraduate',
    enrollmentStatus: 'Full-time',
    citizenshipStatus: 'Domestic',
    firstGen: false,
    languages: ['English', 'Mandarin'],
    workStatus: 'Not working',
    financialNeedLevel: 'Medium',
    awards: ['Community Impact Scholar Nominee'],
    recommendedScholarshipIds: [
      'community-builder',
      'community-impact-grant',
      'social-leadership-prize',
    ],
    features: {
      academics: 0.7,
      leadership: 0.8,
      community: 0.95,
      need: 0.35,
      innovation: 0.45,
      research: 0.4,
      adversity: 0.6,
    },
    baseStory:
      'Jiawen is a second-year Health Studies and Public Policy student who centers her work on practical, community-grounded health access. She is motivated by a belief that public services only matter if people can actually navigate them. Her strengths show up in organizing, coalition-building, and sustained advocacy, especially with newcomer and multilingual communities. She combines policy training with direct service experience, and she tends to translate complex systems into clear pathways for others.',
    stories: [
      {
        id: 's2-1',
        title: 'Neighbourhood health access project',
        summary:
          'Jiawen began her neighbourhood health access project after volunteering at a community center where she noticed a recurring issue: newcomers were not avoiding care because they lacked interest, but because they could not decode the system. Clinic hours, referral processes, and insurance coverage were spread across multiple websites and pamphlets, mostly in English. Jiawen decided that even before policy reform, there was a gap in day-to-day navigation that students could help close.\n\nShe started with informal listening sessions. Over several weeks, she spoke with families at the center, noting the points where they got stuck: booking appointments, understanding walk-in versus referral care, and knowing what services were free. She worked with a small circle of volunteers who spoke Mandarin, Punjabi, and Arabic, and together they mapped a “first-90-days health journey” that captured what a newcomer typically needs to do when settling in Vancouver. Jiawen then cross-checked each step with local clinics and the provincial health authority to avoid spreading outdated or incorrect guidance.\n\nThe project’s first tangible output was a weekly information booth at the center’s entrance. Jiawen designed it to feel welcoming rather than clinical. She created simple, bilingual flowcharts that answered common questions (“What do I do if I don’t have a family doctor yet?”) and built a rotating schedule so a volunteer with relevant language ability would be present each week. Initially, she expected modest uptake, but at the first booth session over 30 community members stopped to ask for help, more than double what the center typically saw in a week of casual inquiries.\n\nAs the booth grew, Jiawen added structured support. She introduced a “navigation notebook” that volunteers used to record recurring questions anonymously, which helped her refine materials. One early insight was that many seniors were confused about eligibility for chronic disease programs, so Jiawen contacted two local nurse practitioners to co-host short Q&A sessions. Attendance for these sessions averaged 18–25 people, and the center later integrated them into its monthly programming.\n\nJiawen also began tracking impact more formally. She designed a short follow-up form, offered in multiple languages, asking whether the person felt more confident accessing care and whether they had successfully booked a service. Within two months, 74 people completed the follow-up; 61 reported that the booth directly helped them book an appointment or register for a service they did not know existed. She presented these results to the center’s leadership and secured a small operating budget to keep printing materials and to train new volunteers.\n\nFor Jiawen, the project was a leadership lesson in slow, consistent change. She learned that credibility comes from accuracy and responsiveness, not just enthusiasm. The booth remains active, now run by a new cohort of student volunteers. Jiawen sees this as her strongest example of community-rooted leadership: a simple intervention that created measurable improvements in access, and a system that could continue beyond her personal involvement.',
        dimensionTags: ['community', 'leadership'],
      },
      {
        id: 's2-2',
        title: 'Newcomer youth mentorship circle',
        summary:
          'During her first year, Jiawen mentored several newcomer high school students through a local settlement program. She quickly noticed that informal one-to-one help was useful but isolated; students struggled with the same barriers repeatedly—finding study routines, understanding course selection, and coping with the emotional weight of resettlement. Many felt they had to “figure everything out alone,” and they rarely saw peers with similar backgrounds in leadership roles. Jiawen believed the missing ingredient was a supportive peer structure, not just more individual tutoring.\n\nShe proposed and built a mentorship circle aimed at refugee and newcomer youth. Instead of a drop-in tutoring model, the circle met weekly in a consistent format: a check-in, a shared skill topic, and a peer-led discussion. Jiawen recruited six university volunteers, each paired with a small group of students. She also established a partnership with a school counselor and a community health worker to ensure the group could refer students to professional support when needed.\n\nThe first month was about trust. Jiawen designed low-stakes activities that encouraged conversation: students mapped personal timelines, shared music or food stories, and talked about what they missed from home. She noticed some students were reluctant to speak in English, so she introduced bilingual breakout spaces where students could discuss in their strongest language first and then summarize back to the group. This simple adaptation increased participation and helped students feel ownership over the space.\n\nOnce the group stabilized, Jiawen shifted to practical resources. She ran workshops on note-taking, exam planning, and university pathways, but always anchored them in students’ lived experiences. For example, a session on time management began with students listing caregiving or part-time work responsibilities, then collectively building realistic schedules. She also introduced a rotating “student lead” role, where a participant chose a topic and facilitated part of the meeting. Over time, students who started out quiet became more assertive in shaping sessions.\n\nTo evaluate impact, Jiawen collected anonymous reflection cards every six weeks. Students repeatedly highlighted two outcomes: increased confidence navigating school systems and a stronger sense of belonging. One student wrote that the circle was the first place in Canada where she felt she could “ask questions without being judged.” Another reported moving from failing math to a B after developing a study plan with her group. Jiawen also tracked retention: after one semester, 19 of the original 22 students were still attending regularly.\n\nBy the end of the year, Jiawen trained two senior participants to co-facilitate, creating a pipeline for leadership within the cohort. The circle continues today under the settlement program, and Jiawen remains involved as an advisor. She frames this story as an adversity-to-leadership arc: she did not fix hardships for others, but built a structure where peers could support each other, develop agency, and see tangible academic progress. It’s the example she relies on when explaining what “community impact” means to her in practice.',
        dimensionTags: ['community', 'adversity', 'leadership'],
      },
    ],
    stats: {
      scholarshipsMatched: 11,
      draftsGenerated: 15,
      avgAlignment: 88,
      lastActiveAt: new Date().toISOString(),
      topMatchIds: [
        'community-builder',
        'community-impact-grant',
        'social-leadership-prize',
      ],
    },
  },
  {
    id: 's3',
    name: 'Ibn Al-Khawrizmi',
    program: 'Applied Mathematics & Economics',
    year: 'First-generation · 4th year',
    tags: ['First-gen', 'Work-study', 'Equity'],
    gpa: 3.94,
    gpaScale: 4,
    location: 'Ottawa, ON',
    university: 'Carleton University',
    campus: 'Ottawa',
    degreeLevel: 'Undergraduate',
    enrollmentStatus: 'Full-time',
    citizenshipStatus: 'Domestic',
    firstGen: true,
    languages: ['English', 'Arabic'],
    workStatus: 'Part-time',
    financialNeedLevel: 'High',
    awards: ['Access Bursary Recipient', 'Faculty of Science Scholarship'],
    recommendedScholarshipIds: [
      'first-gen-access',
      'access-equity-award',
      'resilience-award',
    ],
    features: {
      academics: 0.75,
      leadership: 0.45,
      community: 0.6,
      need: 0.95,
      innovation: 0.3,
      research: 0.35,
      adversity: 0.9,
    },
    baseStory:
      'Al-Khawrizmi is a fourth-year first-generation student studying Applied Mathematics and Economics. He has maintained a high GPA while carrying significant financial responsibility at home, working part-time throughout university. His profile shows strong resilience and a steady academic trajectory, paired with community involvement focused on equity and peer support. He tends to frame his work through problem-solving under constraint: identifying tradeoffs, choosing a path, and following through consistently.',
    stories: [
      {
        id: 's3-1',
        title: 'Working two jobs while studying full-time',
        summary:
          'Al-Khawrizmi entered university with a clear academic goal but an equally clear financial reality. As the first person in his family to pursue higher education in Canada, he carried both the pride of opportunity and the weight of cost. Tuition, housing, and family expenses made it impossible to rely solely on loans. By the start of second year he was working two part-time jobs: early morning shifts at a grocery store and evening hours as a residence desk assistant. At peak weeks, he averaged 25–30 paid hours on top of a full course load.\n\nThis schedule was not sustainable by default. Al-Khawrizmi treated it like an optimization problem. He began by tracking his time in a simple spreadsheet for three weeks, categorizing hours by classes, commuting, work, and personal care. The data showed that commuting between work sites and campus was the biggest wasted block, so he negotiated a shift adjustment at the grocery store to cluster his hours on fewer days. He also replaced a long bus route with a bike commute when weather allowed, cutting daily travel time by about 40 minutes. These changes created small but meaningful study windows.\n\nAcademically, Al-Khawrizmi learned to work in increments. He developed a “two-pass” lecture system: the first pass was for understanding and immediate questions, and the second was a structured weekly review where he rebuilt key proofs or problem sets from memory. He joined a study group that met reliably on Saturday mornings, the one time he could protect consistently. When course deadlines collided with work demands, Al-Khawrizmi communicated early with supervisors and swapped shifts rather than missing assignments. Over four years he missed only one scheduled workday, and he never missed a major academic deadline.\n\nThe pressure was not only logistical. Some weeks he had to choose between buying textbooks and covering household needs. Al-Khawrizmi found alternatives—library reserves, open-source notes, and sharing materials with classmates. He also applied for emergency aid once, documenting his situation candidly. Receiving a small bursary that semester was a turning point: it didn’t remove the burden, but it confirmed that being transparent about need could be met with support.\n\nDespite the constraints, Al-Khawrizmi’s grades trended upward. His GPA rose from 3.6 in first year to 3.94 by fourth year. More importantly, he became confident in his ability to perform under pressure. He describes this story not as hardship for its own sake, but as evidence of skill-building: learning to prioritize, to negotiate, to maintain health while working, and to persist when the default path was not designed for students like him.\n\nAl-Khawrizmi’s experience motivates his longer-term goal to work in policy analytics focused on educational access. He wants to help design systems where financial barriers are surfaced early and addressed directly, so future first-generation students do not have to reverse-engineer survival alongside learning.',
        dimensionTags: ['need', 'adversity', 'academics'],
      },
      {
        id: 's3-2',
        title: 'Campus equity research assistantship',
        summary:
          'Al-Khawrizmi’s interest in equity moved from personal experience into structured research during a campus assistantship in third year. A sociology professor was launching a study on first-generation student outcomes, focusing on where academic capability intersects with financial strain and social belonging. Al-Khawrizmi applied because he wanted to understand the broader patterns behind what he and his peers were living.\n\nHis role began with data collection. He helped design an interview guide that avoided assumptions and invited participants to narrate their own timelines. Over the term, Al-Khawrizmi conducted 12 semi-structured interviews with first-generation students across faculties. He was careful about confidentiality, and he built trust by sharing his own background only when invited, keeping the focus on participants’ stories. What he heard repeated in different forms: students struggled to interpret unwritten rules, such as how to approach professors, what co-op timelines looked like, or which opportunities mattered most.\n\nAfter transcription, Al-Khawrizmi led an initial thematic coding pass. He built a codebook that separated experiences into categories like “financial shock events,” “hidden curriculum gaps,” and “peer bridging.” He noticed that many participants described a single “break point” semester where costs or family responsibilities peaked and they considered dropping out. He pulled these segments into a memo and proposed that the team investigate what institutional touchpoints preceded those break points.\n\nThe research team expanded the project to include a small pilot intervention: a peer-support micro-program for first-generation students in STEM. Al-Khawrizmi helped design the program’s structure with an emphasis on practicality. Each month included a workshop on an invisible skill (office hours, funding applications, research opportunities), paired with a low-pressure social meeting. Al-Khawrizmi also worked on recruitment, using student societies and residence networks to reach students who might otherwise not self-identify.\n\nHe then co-analyzed survey data from the pilot. The program had 34 participants in its first cycle; 79% reported increased confidence seeking academic help, and 62% reported learning about at least one funding or research opportunity they would not have found alone. Al-Khawrizmi presented the evaluation in a lab meeting, highlighting which sessions had the strongest effect and recommending improvements for the next cohort.\n\nFor Al-Khawrizmi, the assistantship was formative because it linked data to action. He learned to treat equity as a measurable, designable problem rather than a vague aspiration. The project also gave him a leadership foothold; students from the first cohort asked him to continue as a mentor, and he now supports the second cycle informally.\n\nHe frames this story as proof of an equity-driven research mindset: listening carefully, structuring evidence, and turning findings into a sustainable support model. It complements his academic narrative by showing that his performance is tied to purpose, and it is central to how he plans to present himself in access-focused scholarship applications.',
        dimensionTags: ['research', 'community', 'adversity'],
      },
    ],
    stats: {
      scholarshipsMatched: 13,
      draftsGenerated: 17,
      avgAlignment: 90,
      lastActiveAt: new Date().toISOString(),
      topMatchIds: [
        'first-gen-access',
        'access-equity-award',
        'resilience-award',
      ],
    },
  },
]

type StudentProfileState = {
  profiles: StudentProfile[]
  addProfile: (data: Omit<StudentProfile, 'id'> & { id?: string }) => void
  updateProfile: (id: string, patch: Partial<StudentProfile>) => void
  removeProfile: (id: string) => void
  resetToSeed: () => void
}

export const useStudentProfileStore = create<StudentProfileState>()(
  persist(
    (set, get) => ({
      profiles: SEED_STUDENT_PROFILES,
      addProfile: (data) => {
        const id = data.id ?? crypto.randomUUID()
        const newProfile: StudentProfile = { ...data, id }
        set({ profiles: [...get().profiles, newProfile] })
      },
      updateProfile: (id, patch) => {
        set({
          profiles: get().profiles.map((p) =>
            p.id === id ? { ...p, ...patch } : p
          ),
        })
      },
      removeProfile: (id) => {
        set({
          profiles: get().profiles.filter((p) => p.id !== id),
        })
      },
      resetToSeed: () => set({ profiles: SEED_STUDENT_PROFILES }),
    }),
    {
      name: 'agentiiv-student-profiles-v1',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
