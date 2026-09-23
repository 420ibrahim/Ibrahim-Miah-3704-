export interface SocialChannelConfig {
  id: string;
  name: string;
  platform: 'facebook' | 'whatsapp' | 'gmail' | 'instagram' | 'x' | 'linkedin';
  url: string;
  handle: string;
  category: string;
  description: string;
  badge: string;
  brandColor: string;
  accentBg: string;
  hoverBorder: string;
}

export const INITIAL_SOCIAL_CHANNELS: SocialChannelConfig[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    platform: 'whatsapp',
    url: 'https://wa.me/8801766644925',
    handle: '+880 1766-644925',
    category: 'Instant Messaging',
    description: 'Direct 1-on-1 instant messaging for urgent video projects, quotes, and revisions.',
    badge: 'Fastest Response',
    brandColor: '#25D366',
    accentBg: 'rgba(37, 211, 102, 0.1)',
    hoverBorder: 'rgba(37, 211, 102, 0.4)',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    platform: 'facebook',
    url: 'https://www.facebook.com/ibrahim.hasan.joy.151127',
    handle: 'ibrahim.hasan.joy.151127',
    category: 'Social Profile',
    description: 'Personal profile & creator updates, video reels, and client communication.',
    badge: 'Active Profile',
    brandColor: '#1877F2',
    accentBg: 'rgba(24, 119, 242, 0.1)',
    hoverBorder: 'rgba(24, 119, 242, 0.4)',
  },
  {
    id: 'gmail',
    name: 'Gmail',
    platform: 'gmail',
    url: 'mailto:ibrahimmiahofficialinfo@gmail.com',
    handle: 'ibrahimmiahofficialinfo@gmail.com',
    category: 'Direct Email',
    description: 'Official inquiries, project briefs, NDA contracts, and high-bitrate asset handoffs.',
    badge: 'Official Inquiries',
    brandColor: '#EA4335',
    accentBg: 'rgba(234, 67, 53, 0.1)',
    hoverBorder: 'rgba(234, 67, 53, 0.4)',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    platform: 'instagram',
    url: 'https://instagram.com/ibrahimmiah',
    handle: '@ibrahimmiah',
    category: 'Short-Form Reels',
    description: 'Vertical video edits, 9:16 reels portfolio, behind-the-scenes timelines, and DMs.',
    badge: 'Video Reels & DMs',
    brandColor: '#E1306C',
    accentBg: 'rgba(225, 48, 108, 0.1)',
    hoverBorder: 'rgba(225, 48, 108, 0.4)',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    platform: 'linkedin',
    url: 'https://linkedin.com/in/ibrahimmiah',
    handle: 'in/ibrahimmiah',
    category: 'Professional Network',
    description: 'Professional background, client endorsements, career history, and B2B contracts.',
    badge: 'Executive Network',
    brandColor: '#0A66C2',
    accentBg: 'rgba(10, 102, 194, 0.1)',
    hoverBorder: 'rgba(10, 102, 194, 0.4)',
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    platform: 'x',
    url: 'https://x.com/home',
    handle: 'x.com/home',
    category: 'Industry Insights',
    description: 'Video editing tips, digital marketing strategies, AI tools, and creative commentary.',
    badge: 'Updates & DMs',
    brandColor: '#FFFFFF',
    accentBg: 'rgba(255, 255, 255, 0.08)',
    hoverBorder: 'rgba(255, 255, 255, 0.3)',
  },
];
