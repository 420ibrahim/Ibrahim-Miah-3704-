import type { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

export default function handler(_req: IncomingMessage, res: ServerResponse) {
  try {
    const cvPath = path.join(process.cwd(), 'public', 'Ibrahim_Miah_Video_Editor_CV.pdf');
    if (fs.existsSync(cvPath)) {
      const fileBuffer = fs.readFileSync(cvPath);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="Ibrahim_Miah_Video_Editor_CV.pdf"');
      res.statusCode = 200;
      res.end(fileBuffer);
      return;
    }
  } catch (e) {
    console.error('Error in Vercel download CV handler:', e);
  }

  res.statusCode = 302;
  res.setHeader('Location', '/Ibrahim_Miah_Video_Editor_CV.pdf');
  res.end();
}
