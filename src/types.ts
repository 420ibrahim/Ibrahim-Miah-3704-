export type SkillCategory = 'all' | 'video' | 'marketing' | 'design' | 'automation';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 0 to 100
  experience: string;
  badge: string;
  description: string;
  workflows: string[];
}

export type ProjectCategory = 'all' | 'short-form' | 'long-form' | 'motion' | 'meta-ads' | 'automation';

export interface VideoProjectTemplate {
  id: string;
  templateNumber: number;
  title: string;
  category: 'long-form' | 'short-form' | 'commercial' | 'documentary' | 'motion' | 'showreel' | 'meta-ads';
  categoryLabel: string;
  aspectRatio: '16:9' | '9:16' | '1:1';
  client: string;
  description: string;
  editingTechniques: string[];
  toolsUsed: string[];
  metrics: string;
  videoSourceType: 'upload' | 'youtube' | 'vimeo' | 'url' | 'placeholder';
  videoUrl?: string;
  embedUrl?: string;
  thumbnailUrl?: string;
  duration?: string;
  isCustomUploaded: boolean;
  accentColor: string;
}

export interface ProjectDomain {
  id: string;
  title: string;
  category: ProjectCategory;
  tagline: string;
  overview: string;
  format: '16:9' | '9:16' | '1:1' | 'Multi-format';
  deliverables: string[];
  toolsUsed: string[];
  pipelineHighlights: string[];
  previewTheme: {
    accentColor: string;
    badge: string;
  };
}

export interface EducationItem {
  degree: string;
  period: string;
  status: 'Completed' | 'Ongoing';
  grade?: string;
  institution?: string;
  description: string;
  highlights: string[];
}

export interface TrainingItem {
  title: string;
  institution: string;
  status: string;
  description: string;
  skillsAcquired: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  tools: string[];
}
