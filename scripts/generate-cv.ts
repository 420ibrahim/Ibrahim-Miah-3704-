import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateCV() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 Size: 595 x 842 points
  const { width, height } = page.getSize();

  // Embed Fonts
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Palette (Cyan / Midnight Navy / Slate / White)
  const primaryNavy = rgb(7 / 255, 11 / 255, 20 / 255);
  const headerCyan = rgb(6 / 255, 182 / 255, 212 / 255);
  const darkCyan = rgb(2 / 255, 132 / 255, 199 / 255);
  const textDark = rgb(30 / 255, 41 / 255, 59 / 255);
  const textMuted = rgb(71 / 255, 85 / 255, 105 / 255);
  const bgLight = rgb(248 / 255, 250 / 255, 252 / 255);
  const cardBg = rgb(241 / 255, 245 / 255, 249 / 255);
  const white = rgb(1, 1, 1);

  // 1. Top Header Banner (Midnight Navy Background with Cyan Accent Strip)
  page.drawRectangle({
    x: 0,
    y: height - 120,
    width: width,
    height: 120,
    color: primaryNavy,
  });

  page.drawRectangle({
    x: 0,
    y: height - 123,
    width: width,
    height: 3,
    color: headerCyan,
  });

  // Name & Title
  page.drawText('IBRAHIM MIAH', {
    x: 36,
    y: height - 45,
    size: 24,
    font: helveticaBold,
    color: white,
  });

  page.drawText('VIDEO EDITOR & DIGITAL MARKETING EXECUTIVE', {
    x: 36,
    y: height - 64,
    size: 11,
    font: helveticaBold,
    color: headerCyan,
  });

  // Contact info row in banner
  const contactText = 'Email: ijoy76889@gmail.com   |   WhatsApp: +880 1782 506450   |   Dhaka, Bangladesh (Remote Worldwide)';
  page.drawText(contactText, {
    x: 36,
    y: height - 88,
    size: 8.5,
    font: helvetica,
    color: rgb(203 / 255, 213 / 255, 225 / 255),
  });

  const linksText = 'Portfolio: Live Portfolio Website   |   Specialization: YouTube, Shorts/Reels & High-ROAS Meta Ads';
  page.drawText(linksText, {
    x: 36,
    y: height - 104,
    size: 8,
    font: helveticaOblique,
    color: rgb(148 / 255, 163 / 255, 184 / 255),
  });

  let currentY = height - 145;

  // Helper for Section Headers
  const drawSectionHeader = (title: string) => {
    page.drawText(title.toUpperCase(), {
      x: 36,
      y: currentY,
      size: 11,
      font: helveticaBold,
      color: primaryNavy,
    });

    page.drawRectangle({
      x: 36,
      y: currentY - 4,
      width: 40,
      height: 2,
      color: headerCyan,
    });

    page.drawLine({
      start: { x: 76, y: currentY - 3 },
      end: { x: width - 36, y: currentY - 3 },
      thickness: 0.5,
      color: rgb(226 / 255, 232 / 255, 240 / 255),
    });

    currentY -= 18;
  };

  // 2. Executive Summary
  drawSectionHeader('Executive Summary');
  const summaryLines = [
    'Results-driven Video Editor and Digital Marketing Executive specializing in turning raw footage into high-retention',
    'video stories, viral vertical content (TikTok, Reels, Shorts), commercial brand showcases, and ROI-focused Meta advertising',
    'campaigns. Master of narrative pacing curves, dynamic sound effects layering, lumetri color grading, and audio cleanup.',
    'Proven ability to optimize hook retention (0-3s) and structure high-converting advertising funnels.',
  ];
  for (const line of summaryLines) {
    page.drawText(line, {
      x: 36,
      y: currentY,
      size: 8.5,
      font: helvetica,
      color: textDark,
      lineHeight: 12,
    });
    currentY -= 12;
  }
  currentY -= 10;

  // 3. Core Competencies & Toolkit
  drawSectionHeader('Core Toolkit & Technical Competencies');

  // Boxed competencies
  page.drawRectangle({
    x: 36,
    y: currentY - 56,
    width: width - 72,
    height: 62,
    color: cardBg,
    borderColor: rgb(226 / 255, 232 / 255, 240 / 255),
    borderWidth: 1,
  });

  const skillsCol1 = [
    '• Video Editing: Adobe Premiere Pro, After Effects, CapCut Pro',
    '• Sound Design: Audio Normalization, Dialogue Cleanup, SFX & Risers',
    '• Color Grading: Lumetri Color, Cinematic Film LUTs, Balance & Contrast',
  ];
  const skillsCol2 = [
    '• Meta Ads: Campaign Setup, Creative A/B Testing, ROAS Scaling',
    '• Motion Design: Kinetic Typography, Lower Thirds, Logo Stingers',
    '• Creative Tools: Photoshop, Illustrator, Canva, Make.com, Jitter',
  ];

  let skillY = currentY - 12;
  for (const item of skillsCol1) {
    page.drawText(item, { x: 46, y: skillY, size: 8, font: helvetica, color: textDark });
    skillY -= 16;
  }
  skillY = currentY - 12;
  for (const item of skillsCol2) {
    page.drawText(item, { x: 310, y: skillY, size: 8, font: helvetica, color: textDark });
    skillY -= 16;
  }

  currentY -= 72;

  // 4. Professional Experience
  drawSectionHeader('Professional Experience');

  // Job 1
  page.drawText('Senior Video Editor & Digital Media Specialist', {
    x: 36,
    y: currentY,
    size: 10,
    font: helveticaBold,
    color: primaryNavy,
  });
  page.drawText('2023 – Present', {
    x: width - 110,
    y: currentY,
    size: 8.5,
    font: helveticaBold,
    color: darkCyan,
  });
  currentY -= 12;

  page.drawText('Freelance & Client Creative Studio | Remote Worldwide', {
    x: 36,
    y: currentY,
    size: 8.5,
    font: helveticaOblique,
    color: textMuted,
  });
  currentY -= 13;

  const job1Points = [
    '• Edited 50+ long-form YouTube episodes and 150+ short-form vertical reels (9:16) with an average hook retention rate of 84%.',
    '• Engineered precision audio architecture combining Foley, riser drops, whooshes, and multi-track dialogue normalization.',
    '• Developed high-converting video ad creatives for Meta (Facebook & Instagram Ads), generating up to 3.8x ROAS for e-commerce brands.',
    '• Built reusable kinetic caption templates, dynamic split-screen layouts, and 3D camera tracking callouts in After Effects.',
  ];
  for (const pt of job1Points) {
    page.drawText(pt, { x: 42, y: currentY, size: 8, font: helvetica, color: textDark });
    currentY -= 12;
  }
  currentY -= 6;

  // Job 2
  page.drawText('Digital Marketing Executive & Video Strategist', {
    x: 36,
    y: currentY,
    size: 10,
    font: helveticaBold,
    color: primaryNavy,
  });
  page.drawText('2022 – 2023', {
    x: width - 110,
    y: currentY,
    size: 8.5,
    font: helveticaBold,
    color: darkCyan,
  });
  currentY -= 12;

  page.drawText('Content & Digital Media Agency | Dhaka, Bangladesh', {
    x: 36,
    y: currentY,
    size: 8.5,
    font: helveticaOblique,
    color: textMuted,
  });
  currentY -= 13;

  const job2Points = [
    '• Managed Meta Ad accounts, building full-funnel marketing campaigns (TOFU/MOFU/BOFU) from ad creative to landing page.',
    '• Monitored audience drop-off analytics in YouTube Studio & TikTok Ads Manager to refine 0-3s visual hooks and pacing.',
    '• Coordinated end-to-end post-production pipelines: ingestion, rough cuts, fine tuning, sound design, color mastering, and rendering.',
  ];
  for (const pt of job2Points) {
    page.drawText(pt, { x: 42, y: currentY, size: 8, font: helvetica, color: textDark });
    currentY -= 12;
  }
  currentY -= 10;

  // 5. Featured Portfolio Projects
  drawSectionHeader('Selected Video Portfolio Highlights');

  const projects = [
    {
      title: '1. YouTube Commercial & Tech Showcase (16:9)',
      desc: 'Deep multi-cam sync, B-roll pacing curves, dialogue repair, and custom Lumetri LUT color grading. 1.4M+ Views.',
    },
    {
      title: '2. High-Retention Reels & TikTok Pack (9:16)',
      desc: 'Algorithm-focused vertical video editing with 0-3s kinetic visual hooks, animated subtitles, and punchy sound design.',
    },
    {
      title: '3. Product Promo & Meta Ad Campaigns (1:1 / 4:5)',
      desc: 'Commercial rhythm beat-matching, speed ramps, product callouts, and motion graphics built for maximum CTR & conversions.',
    },
  ];

  for (const p of projects) {
    page.drawText(p.title, { x: 36, y: currentY, size: 9, font: helveticaBold, color: primaryNavy });
    currentY -= 11;
    page.drawText(p.desc, { x: 46, y: currentY, size: 8, font: helvetica, color: textDark });
    currentY -= 14;
  }
  currentY -= 6;

  // 6. Education & Certifications
  drawSectionHeader('Education & Professional Certifications');
  page.drawText('• Professional Post-Production & Video Editing Specialization (Adobe Certified Ecosystem)', {
    x: 36,
    y: currentY,
    size: 8.5,
    font: helvetica,
    color: textDark,
  });
  currentY -= 12;
  page.drawText('• Meta Certified Digital Marketing Associate & Performance Ads Specialist', {
    x: 36,
    y: currentY,
    size: 8.5,
    font: helvetica,
    color: textDark,
  });
  currentY -= 12;
  page.drawText('• Motion Graphics & Visual Storytelling Masterclass', {
    x: 36,
    y: currentY,
    size: 8.5,
    font: helvetica,
    color: textDark,
  });

  // Footer Banner
  page.drawRectangle({
    x: 0,
    y: 0,
    width: width,
    height: 24,
    color: primaryNavy,
  });
  page.drawText('IBRAHIM MIAH — OFFICIAL CURRICULUM VITAE — AVAILABLE FOR FULL-TIME, CONTRACT & FREELANCE COMMISSIONS', {
    x: 48,
    y: 8,
    size: 7,
    font: helveticaBold,
    color: headerCyan,
  });

  const pdfBytes = await pdfDoc.save();

  // Save to public and dist directories
  const publicPath = path.join(__dirname, '..', 'public', 'Ibrahim_Miah_Video_Editor_CV.pdf');
  const distPath = path.join(__dirname, '..', 'dist', 'Ibrahim_Miah_Video_Editor_CV.pdf');

  fs.writeFileSync(publicPath, pdfBytes);
  console.log('Generated CV at:', publicPath);

  const distDir = path.join(__dirname, '..', 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(distPath, pdfBytes);
    console.log('Generated CV at:', distPath);
  }
}

generateCV().catch((e) => {
  console.error('Error generating CV PDF:', e);
  process.exit(1);
});
