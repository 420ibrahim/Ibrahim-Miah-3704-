import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // JSON and URL-encoded body parsers with large limit for media uploads
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ extended: true, limit: '100mb' }));

  // Ensure persistent storage directories exist
  const dataDir = path.join(__dirname, 'data');
  const publicDir = path.join(__dirname, 'public');
  const uploadsDir = path.join(__dirname, 'public', 'uploads');

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Persistent store file path
  const storeFilePath = path.join(dataDir, 'portfolio-store.json');

  // Load or initialize store
  const getStore = () => {
    try {
      if (fs.existsSync(storeFilePath)) {
        const raw = fs.readFileSync(storeFilePath, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error('Error reading portfolio store:', e);
    }
    return {
      portraitSrc: '/portrait-default.jpg',
      style: null,
      videoTemplates: null,
      updatedAt: new Date().toISOString(),
    };
  };

  const saveStore = (data: Record<string, unknown>) => {
    try {
      fs.writeFileSync(storeFilePath, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (e) {
      console.error('Error writing portfolio store:', e);
      return false;
    }
  };

  // Serve static assets from public/uploads and public directly
  app.use('/uploads', express.static(uploadsDir));
  app.use(express.static(publicDir));

  // --- API Endpoints ---

  // 1. Fetch current portfolio data
  app.get('/api/portfolio', (_req, res) => {
    const store = getStore();
    // Ensure default CV config is always present if not set
    if (!store.cvConfig) {
      store.cvConfig = {
        type: 'file',
        url: '/Ibrahim_Miah_Video_Editor_CV.pdf',
        fileName: 'Ibrahim_Miah_Video_Editor_CV.pdf',
        updatedAt: new Date().toISOString(),
      };
    }
    res.json({
      success: true,
      data: store,
    });
  });

  // 2. Direct CV Download endpoint (Force attachment header for reliable download)
  app.get('/api/download-cv', (_req, res) => {
    const store = getStore();
    const cvConfig = store.cvConfig;

    if (cvConfig?.type === 'link' && cvConfig.url) {
      // If external Google Drive / cloud link, redirect user directly
      return res.redirect(cvConfig.url);
    }

    const defaultCvPath = path.join(publicDir, 'Ibrahim_Miah_Video_Editor_CV.pdf');
    let targetFilePath = defaultCvPath;
    let downloadFileName = 'Ibrahim_Miah_Video_Editor_CV.pdf';

    if (cvConfig?.type === 'file' && cvConfig.url) {
      downloadFileName = cvConfig.fileName || 'Ibrahim_Miah_Video_Editor_CV.pdf';
      // If it points to an upload
      if (cvConfig.url.startsWith('/uploads/')) {
        const uploadFileName = cvConfig.url.replace('/uploads/', '');
        const customFilePath = path.join(uploadsDir, uploadFileName);
        if (fs.existsSync(customFilePath)) {
          targetFilePath = customFilePath;
        }
      } else if (cvConfig.url.startsWith('/')) {
        const relativePath = path.join(publicDir, cvConfig.url.slice(1));
        if (fs.existsSync(relativePath)) {
          targetFilePath = relativePath;
        }
      }
    }

    if (fs.existsSync(targetFilePath)) {
      res.setHeader('Content-Disposition', `attachment; filename="${downloadFileName}"`);
      res.setHeader('Content-Type', 'application/pdf');
      return res.sendFile(targetFilePath);
    }

    // Fallback: if somehow file doesn't exist, redirect to default
    res.redirect('/Ibrahim_Miah_Video_Editor_CV.pdf');
  });

  // 3. Save CV Configuration (Link or File URL)
  app.post('/api/save-cv', (req, res) => {
    try {
      const { cvConfig } = req.body;
      if (!cvConfig || typeof cvConfig !== 'object') {
        return res.status(400).json({ success: false, error: 'cvConfig object is required' });
      }

      const store = getStore();
      store.cvConfig = {
        ...cvConfig,
        updatedAt: new Date().toISOString(),
      };
      saveStore(store);

      res.json({ success: true, cvConfig: store.cvConfig });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ success: false, error: message });
    }
  });

  // 4. Upload CV PDF File and save to disk
  app.post('/api/upload-cv-file', (req, res) => {
    try {
      const { fileData, fileName } = req.body;
      if (!fileData || typeof fileData !== 'string') {
        return res.status(400).json({ success: false, error: 'fileData is required' });
      }

      let base64Content = fileData;
      if (fileData.startsWith('data:')) {
        const commaIndex = fileData.indexOf(',');
        if (commaIndex !== -1) {
          base64Content = fileData.substring(commaIndex + 1);
        }
      }

      const safeName = (fileName || 'Ibrahim_Miah_CV.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
      const uniqueFileName = `cv-${Date.now()}-${safeName}`;
      const filePath = path.join(uploadsDir, uniqueFileName);

      fs.writeFileSync(filePath, Buffer.from(base64Content, 'base64'));

      // Also copy to dist/uploads if dist exists
      const distUploads = path.join(__dirname, 'dist', 'uploads');
      if (fs.existsSync(distUploads)) {
        fs.writeFileSync(path.join(distUploads, uniqueFileName), Buffer.from(base64Content, 'base64'));
      }

      const cvConfig = {
        type: 'file',
        url: `/uploads/${uniqueFileName}`,
        fileName: safeName,
        updatedAt: new Date().toISOString(),
      };

      const store = getStore();
      store.cvConfig = cvConfig;
      saveStore(store);

      res.json({
        success: true,
        cvConfig,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ success: false, error: message });
    }
  });

  // 2. Save Portrait photo and styling
  app.post('/api/save-portrait', (req, res) => {
    try {
      const { portraitSrc, style } = req.body;
      const store = getStore();

      let finalPortraitUrl = portraitSrc;

      // If user uploaded a base64 image, save it to disk as a static image file
      if (typeof portraitSrc === 'string' && portraitSrc.startsWith('data:image/')) {
        const matches = portraitSrc.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
        if (matches) {
          const extension = matches[1].replace('jpeg', 'jpg').replace('svg+xml', 'svg');
          const base64Data = matches[2];
          const fileName = `portrait-${Date.now()}.${extension}`;
          const filePath = path.join(uploadsDir, fileName);

          fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
          finalPortraitUrl = `/uploads/${fileName}`;
        }
      }

      store.portraitSrc = finalPortraitUrl;
      if (style) {
        store.style = style;
      }
      store.updatedAt = new Date().toISOString();

      saveStore(store);

      res.json({
        success: true,
        portraitSrc: finalPortraitUrl,
        style: store.style,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ success: false, error: message });
    }
  });

  // 3. Save Video Project Templates
  app.post('/api/save-projects', (req, res) => {
    try {
      const { videoTemplates } = req.body;
      if (!Array.isArray(videoTemplates)) {
        return res.status(400).json({ success: false, error: 'videoTemplates must be an array' });
      }

      const store = getStore();
      store.videoTemplates = videoTemplates;
      store.updatedAt = new Date().toISOString();
      saveStore(store);

      res.json({ success: true, count: videoTemplates.length });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ success: false, error: message });
    }
  });

  // 4. Upload Media File (Video or Image) and return permanent URL
  app.post('/api/upload-media', (req, res) => {
    try {
      const { fileData, fileName } = req.body;
      if (!fileData || typeof fileData !== 'string') {
        return res.status(400).json({ success: false, error: 'fileData base64 string is required' });
      }

      // Parse data URL format: data:<type>;base64,<data>
      const match = fileData.match(/^data:([^;]+);base64,(.+)$/);
      if (!match) {
        return res.status(400).json({ success: false, error: 'Invalid data URI format' });
      }

      const mimeType = match[1];
      const base64Content = match[2];

      // Determine extension
      let ext = path.extname(fileName || '').toLowerCase();
      if (!ext) {
        if (mimeType.includes('mp4')) ext = '.mp4';
        else if (mimeType.includes('webm')) ext = '.webm';
        else if (mimeType.includes('quicktime')) ext = '.mov';
        else if (mimeType.includes('png')) ext = '.png';
        else if (mimeType.includes('jpeg') || mimeType.includes('jpg')) ext = '.jpg';
        else if (mimeType.includes('webp')) ext = '.webp';
        else ext = '.bin';
      }

      const safeBaseName = (fileName ? path.basename(fileName, ext) : 'media')
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .slice(0, 30);

      const generatedFileName = `${Date.now()}-${safeBaseName}${ext}`;
      const filePath = path.join(uploadsDir, generatedFileName);

      fs.writeFileSync(filePath, Buffer.from(base64Content, 'base64'));

      const publicUrl = `/uploads/${generatedFileName}`;
      res.json({
        success: true,
        url: publicUrl,
        fileName: generatedFileName,
        mimeType,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ success: false, error: message });
    }
  });

  // 5. Reset to default
  app.post('/api/reset-portrait', (_req, res) => {
    const store = getStore();
    store.portraitSrc = '/portrait-default.jpg';
    store.style = null;
    saveStore(store);
    res.json({ success: true, portraitSrc: '/portrait-default.jpg' });
  });

  // Frontend mounting: Vite in development, static in production
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio Full-Stack Server running at http://0.0.0.0:${PORT} [${isProd ? 'PRODUCTION' : 'DEV'}]`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
