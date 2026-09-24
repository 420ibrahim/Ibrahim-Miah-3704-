import type { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

export default function handler(_req: IncomingMessage, res: ServerResponse) {
  try {
    const storePath = path.join(process.cwd(), 'data', 'portfolio-store.json');
    if (fs.existsSync(storePath)) {
      const raw = fs.readFileSync(storePath, 'utf8');
      const data = JSON.parse(raw);
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, data }));
      return;
    }
  } catch (e) {
    console.error('Error in Vercel portfolio API:', e);
  }

  // Fallback response with the 5 templates
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      success: true,
      data: {
        portraitSrc: '/ibrahim-portrait.jpg',
        style: {
          preset: 'cyan',
          glowColor: '#10b981',
          glowIntensity: 75,
          zoom: 105,
          brightness: 104,
          contrast: 108,
          vignette: 35,
          borderGlow: true,
          filterPresetName: 'Cyan Rim Studio',
        },
        cvConfig: {
          type: 'file',
          url: '/Ibrahim_Miah_Video_Editor_CV.pdf',
          fileName: 'Ibrahim_Miah_Video_Editor_CV.pdf',
        },
      },
    })
  );
}
