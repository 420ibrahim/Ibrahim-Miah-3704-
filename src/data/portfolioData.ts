import { SkillItem, ProjectDomain, EducationItem, TrainingItem, ProcessStep } from '../types';

export const PERSONAL_INFO = {
  name: 'Ibrahim Miah',
  title: 'Video Editor & Digital Marketing Executive',
  email: 'ibrahimmiahofficialinfo@gmail.com',
  shortBio:
    'Dedicated Video Editor and Digital Marketing Executive focused on producing high-retention video content, kinetic motion graphics, and strategic Meta ad campaigns. Bridging cinematic storytelling with analytical performance marketing.',
  location: 'Bangladesh',
  availability: 'Available for Select Projects & Roles',
  summary:
    'With hands-on expertise spanning non-linear video editing, motion design, paid advertising optimization, and workflow automation, I help brands and creators transform raw ideas into polished visual narratives that engage audiences and convert viewers.',
  stats: [
    { label: 'Creative Domains', value: '4+' },
    { label: 'Core Tools Mastered', value: '10+' },
    { label: 'Disciplines', value: 'Video & Marketing' },
    { label: 'Academic Standing', value: 'MA Ongoing' },
  ],
  socials: [
    { name: 'WhatsApp', href: 'https://wa.me/8801766644925', handle: '+880 1766-644925' },
    { name: 'Facebook', href: 'https://www.facebook.com/ibrahim.hasan.joy.151127', handle: 'ibrahim.hasan.joy.151127' },
    { name: 'Gmail', href: 'mailto:ibrahimmiahofficialinfo@gmail.com', handle: 'ibrahimmiahofficialinfo@gmail.com' },
    { name: 'X', href: 'https://x.com/home', handle: 'x.com/home' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/ibrahimmiah', handle: 'in/ibrahimmiah' },
    { name: 'Instagram', href: 'https://instagram.com/ibrahimmiah', handle: '@ibrahimmiah' },
  ],
};

export const HIGHLIGHTED_TOOLS = [
  'Adobe Premiere Pro',
  'After Effects',
  'Meta Ads Manager',
  'Photoshop',
  'Illustrator',
  'Canva',
  'Jitter',
  'Make.com',
  'MS Office',
  'Google Workspace',
];

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'premiere-pro',
    name: 'Adobe Premiere Pro',
    category: 'video',
    level: 95,
    experience: 'Core Specialty',
    badge: 'Video Editing',
    description:
      'Advanced timeline editing, multi-camera sequencing, L/J-cuts, audio sync, Lumetri color grading, and speed ramping for high-retention pacing.',
    workflows: [
      'Narrative & commercial pacing',
      'Lumetri color correction & grading',
      'Audio leveling & sound design',
      'Auto-reframe for multi-platform delivery',
    ],
  },
  {
    id: 'after-effects',
    name: 'Adobe After Effects',
    category: 'video',
    level: 90,
    experience: 'Core Specialty',
    badge: 'Motion Graphics',
    description:
      'Dynamic keyframe animation, kinetic typography, lower thirds, logo stings, tracking, rotoscoping, and visual hook treatments.',
    workflows: [
      'Kinetic typography & text reveals',
      'Logo intro stings & brand bumpers',
      'Motion tracking & screen replacements',
      'Visual hook enhancements for social ads',
    ],
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads Manager',
    category: 'marketing',
    level: 88,
    experience: 'Strategic Core',
    badge: 'Digital Marketing',
    description:
      'Data-driven campaign setup, A/B creative testing, custom audience segmentation, pixel tracking, and ROAS optimization across Facebook and Instagram.',
    workflows: [
      'CBO & ABO campaign structure',
      'Dynamic creative testing (DCT)',
      'Hook rate & hold rate creative analysis',
      'Audience retargeting & lookalike creation',
    ],
  },
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    category: 'design',
    level: 85,
    experience: 'Visual Design',
    badge: 'Image Craft',
    description:
      'High-CTR YouTube thumbnail design, commercial photo retouching, composition blending, and campaign visual asset preparation.',
    workflows: [
      'High-contrast thumbnail generation',
      'Color tone matching & cutouts',
      'Display ad creative layouts',
      'Photo enhancement & skin retouching',
    ],
  },
  {
    id: 'illustrator',
    name: 'Adobe Illustrator',
    category: 'design',
    level: 80,
    experience: 'Vector Design',
    badge: 'Vector Graphics',
    description:
      'Vector icon creation, SVG illustration assets, brand identity assets, and scalable elements prepared specifically for After Effects rigging.',
    workflows: [
      'Vector elements for motion graphics',
      'Scalable brand badge design',
      'Layer organization for AE import',
      'Iconography & illustrative assets',
    ],
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'design',
    level: 90,
    experience: 'Rapid Creative',
    badge: 'Design System',
    description:
      'Rapid turnaround social media assets, marketing decks, story templates, and collaborative brand kit maintenance.',
    workflows: [
      'Fast-paced social asset batches',
      'Brand guideline consistency',
      'Presentation deck preparation',
      'Marketing template libraries',
    ],
  },
  {
    id: 'jitter',
    name: 'Jitter',
    category: 'video',
    level: 85,
    experience: 'UI & Motion',
    badge: 'Micro-Animations',
    description:
      'Fast, modern UI motion design, kinetic social text overlays, app interaction previews, and animated vector animations.',
    workflows: [
      'SaaS interface animation clips',
      'Modern web-style kinetic type',
      'Lottie & GIF lightweight export',
      'Social promo motion stickers',
    ],
  },
  {
    id: 'make',
    name: 'Make.com',
    category: 'automation',
    level: 82,
    experience: 'Workflow Tech',
    badge: 'Automation',
    description:
      'No-code automation scenarios connecting cloud drives, content schedules, lead collection, and project management pipelines.',
    workflows: [
      'Automated asset ingestion & drive sorting',
      'Lead webhook notifications to Telegram/Sheets',
      'Creative review approval handoffs',
      'Cross-platform distribution triggers',
    ],
  },
  {
    id: 'ms-office',
    name: 'MS Office',
    category: 'automation',
    level: 88,
    experience: 'Productivity',
    badge: 'Documentation',
    description:
      'Comprehensive report structuring in Word, analytical budgeting and data tracking in Excel, and professional client pitch decks in PowerPoint.',
    workflows: [
      'Spreadsheet campaign budgeting',
      'Client proposal documentation',
      'Executive presentation decks',
      'Operational tracking sheets',
    ],
  },
  {
    id: 'google-workspace',
    name: 'Google Workspace',
    category: 'automation',
    level: 92,
    experience: 'Collaboration',
    badge: 'Team Operations',
    description:
      'Seamless collaborative workflows across Google Docs, Sheets, Drive asset organization, Forms, and Google Meet for remote client management.',
    workflows: [
      'Shared video review sheets & timecodes',
      'Asset folder architecture on Drive',
      'Client feedback intake via Forms',
      'Real-time collaborative editing briefs',
    ],
  },
];

export const PROJECT_DOMAINS: ProjectDomain[] = [
  {
    id: 'commercial-video',
    title: 'Commercial & Brand Video Editing',
    category: 'long-form',
    tagline: 'Polished pacing, color narrative, and cinematic sound design',
    overview:
      'Crafted for brands and organizations requiring seamless narrative pacing, clean sound balancing, and broadcast-grade color grading. Built to keep viewers engaged through thoughtful cuts, invisible pacing, and rhythm.',
    format: '16:9',
    deliverables: [
      'Master commercial cut (16:9 4K / 1080p)',
      'Broadcast-compliant audio mastering & dialogue cleanup',
      'Cinematic color grading & LUT balancing in Premiere Pro',
      'Custom subtitle tracks & closed caption delivery',
    ],
    toolsUsed: ['Adobe Premiere Pro', 'Adobe After Effects', 'Photoshop'],
    pipelineHighlights: [
      'L/J-cut narrative flow preventing abrupt visual jumps',
      'Audio EQ, normalization, and sound effect layering',
      'Lumetri color curve balancing and skin-tone protection',
    ],
    previewTheme: {
      accentColor: '#06B6D4',
      badge: 'Long-Form & Commercial',
    },
  },
  {
    id: 'short-form-reels',
    title: 'High-Retention Short-Form & Reels',
    category: 'short-form',
    tagline: 'Hook-first vertical video editing engineered for algorithm retention',
    overview:
      'Optimized for Instagram Reels, TikTok, and YouTube Shorts. Focuses on strong 3-second visual hooks, kinetic animated subtitles, dynamic B-roll cutaways, and punchy pacing that maximizes average percentage viewed.',
    format: '9:16',
    deliverables: [
      'Vertical 9:16 high-bitrate video renders',
      'Animated kinetic word-by-word subtitles with emoji emphasis',
      'Sound design with swooshes, pops, and impact accents',
      'Fast-paced B-roll overlays and zoom-ins',
    ],
    toolsUsed: ['Adobe Premiere Pro', 'After Effects', 'Jitter', 'Canva'],
    pipelineHighlights: [
      'Immediate 0-3s visual hook placement with zero dead air',
      'Custom subtitle styling with high contrast readability',
      'Rhythmic cuts synchronized to background beat accents',
    ],
    previewTheme: {
      accentColor: '#38BDF8',
      badge: '9:16 Vertical Content',
    },
  },
  {
    id: 'motion-graphics',
    title: 'Motion Graphics & Title Design',
    category: 'motion',
    tagline: 'Kinetic typography, brand idents, and dynamic UI elements',
    overview:
      'Elevating raw footage into branded visual experiences. Features clean lower thirds, animated callouts, logo reveal stingers, kinetic quotes, and sleek interface animations that reinforce brand authority.',
    format: 'Multi-format',
    deliverables: [
      'Branded lower thirds and name strap templates',
      'Kinetic typography motion sequences',
      'Animated logo stingers and outro cards',
      'Explainer visual assets and graphic callouts',
    ],
    toolsUsed: ['Adobe After Effects', 'Adobe Illustrator', 'Jitter', 'Photoshop'],
    pipelineHighlights: [
      'Bespoke easing curves and velocity graphing in AE',
      'Scalable vector asset preparation from Illustrator',
      'Alpha-channel transparent MOV / WebM exports',
    ],
    previewTheme: {
      accentColor: '#22D3EE',
      badge: 'Motion Design',
    },
  },
  {
    id: 'meta-ads-campaigns',
    title: 'Meta Ads Creative & Strategy',
    category: 'meta-ads',
    tagline: 'Performance-tested ad creatives paired with full-funnel campaign structure',
    overview:
      'Direct-response ad creative development combined with Meta Ads Manager technical execution. Producing multi-variation hooks, ad copy alignment, and campaign structures aimed at maximizing ROAS and lead generation.',
    format: '1:1',
    deliverables: [
      'Multi-hook ad variations (angles, headlines, text overlays)',
      'Meta Ads Manager campaign architecture (CBO / ABO)',
      'Custom audience segmentation and retargeting setup',
      'Conversion tracking and creative hold rate analysis',
    ],
    toolsUsed: ['Meta Ads Manager', 'Adobe Premiere Pro', 'Canva', 'MS Office / Sheets'],
    pipelineHighlights: [
      'Creative testing framework isolating hooks vs body content',
      'Feed (1:1) and Story (9:16) dedicated aspect ratio sets',
      'Data-backed creative iterations based on CTR and conversion data',
    ],
    previewTheme: {
      accentColor: '#0EA5E9',
      badge: 'Paid Advertising',
    },
  },
  {
    id: 'workflow-automation',
    title: 'Content Pipeline Automation',
    category: 'automation',
    tagline: 'Automated asset routing, task handoffs, and notification systems',
    overview:
      'Harnessing Make.com and Google Workspace to streamline the creative production workflow. Eliminates repetitive manual data entry, automates file delivery notifications, and organizes creative review cycles.',
    format: 'Multi-format',
    deliverables: [
      'Make.com multi-step automated scenario blueprints',
      'Automated Google Drive folder creation and asset sorting',
      'Instant notification webhooks to Telegram/Slack on new edits',
      'Standardized client review and feedback tracking sheets',
    ],
    toolsUsed: ['Make.com', 'Google Workspace', 'MS Office'],
    pipelineHighlights: [
      'Zero-delay automated notifications upon final export upload',
      'Structured file naming convention enforcement',
      'Centralized client communication and milestone tracking',
    ],
    previewTheme: {
      accentColor: '#06B6D4',
      badge: 'Operations & Systems',
    },
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'MA in Islamic Studies',
    period: 'Ongoing',
    status: 'Ongoing',
    institution: 'Higher Academic Research',
    description:
      'Pursuing advanced postgraduate research emphasizing rigorous analytical methodology, ethics, contextual philosophy, and high-level critical thinking.',
    highlights: [
      'Advanced research & structured textual analysis',
      'Ethical governance and principles of communication',
      'Academic paper formulation and methodical synthesis',
    ],
  },
  {
    degree: 'BA in Islamic Studies',
    period: '2024',
    status: 'Completed',
    grade: 'CGPA 3.43',
    institution: 'Undergraduate Program',
    description:
      'Completed comprehensive four-year undergraduate degree with commendable academic standing (CGPA 3.43), developing disciplined study habits, rhetorical clarity, and analytical inquiry.',
    highlights: [
      'Graduated with CGPA 3.43',
      'In-depth foundational studies and linguistic analysis',
      'Structured logical frameworks and systematic inquiry',
    ],
  },
  {
    degree: 'HSC (Higher Secondary Certificate)',
    period: '2020',
    status: 'Completed',
    grade: 'GPA 4.67',
    institution: 'Secondary & Higher Secondary Education Board',
    description:
      'Successfully completed higher secondary education with strong academic distinction (GPA 4.67), establishing solid analytical and language capabilities.',
    highlights: [
      'Achieved GPA 4.67',
      'Core humanities and social science foundations',
      'Consistent academic dedication and rigor',
    ],
  },
  {
    degree: 'Dakhil Examination',
    period: '2018',
    status: 'Completed',
    grade: 'GPA 5.00',
    institution: 'Madrasah Education Board',
    description:
      'Attained the highest possible academic distinction with a perfect GPA 5.00, demonstrating exceptional discipline, memorization, and foundational academic mastery.',
    highlights: [
      'Achieved perfect GPA 5.00 (Golden standard)',
      'Excellence across all core academic disciplines',
      'Strong linguistic and ethical grounding',
    ],
  },
];

export const TRAINING_DATA: TrainingItem = {
  title: 'Small Business Management Course',
  institution: 'As-Sunnah Skill Development Institute',
  status: 'Certified / Completed',
  description:
    'Comprehensive professional training focused on the operational, managerial, and financial principles needed to successfully launch, administer, and scale small enterprises and freelance creative ventures.',
  skillsAcquired: [
    'Business operational planning and sustainable workflow design',
    'Financial budgeting, cost estimation, and creative project pricing',
    'Professional client communication, negotiation, and contract ethics',
    'Marketing strategies for service-based and creative businesses',
    'Resource allocation and digital project management techniques',
  ],
};

export const CREATIVE_PROCESS: ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery & Creative Brief',
    subtitle: 'Aligning on goals, target audience, and visual tone',
    description:
      'Every project begins with understanding your objective: who is watching, what action should they take, and what emotional resonance should the video achieve? We define hook strategies, format ratios, and key deliverables before opening any editing software.',
    deliverables: ['Creative Brief Summary', 'Hook & Angle List', 'Format & Asset Requirements'],
    tools: ['Google Workspace', 'MS Office', 'Make.com'],
  },
  {
    step: '02',
    title: 'Rough Cut & Pacing Architecture',
    subtitle: 'Structuring the story, rhythm, and sound baseline',
    description:
      'Assembling the raw footage into a compelling narrative arc. Selecting the most engaging takes, cutting out pauses or filler, aligning pacing with musical rhythm, and establishing the foundational visual hook within the opening three seconds.',
    deliverables: ['Assembly Cut', 'Music & Dialogue Track Alignment', 'Pacing & Flow Approval'],
    tools: ['Adobe Premiere Pro', 'Google Drive'],
  },
  {
    step: '03',
    title: 'Fine Cut, Motion & Sound Craft',
    subtitle: 'Layering motion graphics, sound design, and color grade',
    description:
      'Transforming a good cut into an exceptional piece of media. Integrating custom kinetic typography in After Effects, seamless lower thirds, impact sound effects, dialogue audio leveling, and cinematic Lumetri color balancing.',
    deliverables: ['VFX & Motion Graphics', 'Audio Mastering & SFX Layering', 'Lumetri Color Grading'],
    tools: ['Adobe After Effects', 'Adobe Premiere Pro', 'Photoshop', 'Jitter'],
  },
  {
    step: '04',
    title: 'Optimization & Campaign Delivery',
    subtitle: 'Multi-platform rendering, Meta Ads setup, and final handoff',
    description:
      'Exporting optimized master files tailored to exact platform specifications (16:9 4K, 9:16 Reels/TikTok, 1:1 Feed). For paid campaigns, configuring ads within Meta Ads Manager, testing creative variations, and monitoring initial performance.',
    deliverables: ['Final High-Bitrate Master Files', 'Platform Aspect Ratio Versions', 'Meta Ads Campaign Launch / File Pack'],
    tools: ['Meta Ads Manager', 'Adobe Media Encoder', 'Make.com'],
  },
];
