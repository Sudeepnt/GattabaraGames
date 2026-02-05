'use server'

import { writeFile, mkdir, readFile, unlink } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

async function cleanupOldImages(oldData: any, newData: any) {
  const oldImages = new Set<string>();
  const newImages = new Set<string>();

  const collectImages = (data: any, images: Set<string>) => {
    if (data?.games) {
      data.games.forEach((p: any) => {
        if (p.image && p.image.startsWith('/uploads/')) images.add(p.image);
        if (p.screenshots && Array.isArray(p.screenshots)) {
          p.screenshots.forEach((s: string) => {
            if (s && s.startsWith('/uploads/')) images.add(s);
          });
        }
      });
    }
    if (data?.ggProductions?.projects) {
      data.ggProductions.projects.forEach((p: any) => {
        if (p.image && p.image.startsWith('/uploads/')) images.add(p.image);
      });
    }
    if (data?.about?.values) {
      data.about.values.forEach((v: any) => {
        if (v.image && v.image.startsWith('/uploads/')) images.add(v.image);
      });
    }
    // Checking for old structure just in case, but primary ref calls new structure
    if (data?.home?.projectStack?.projects) {
      data.home.projectStack.projects.forEach((p: any) => {
        if (p.image && p.image.startsWith('/uploads/')) images.add(p.image);
      });
    }
  };

  collectImages(oldData, oldImages);
  collectImages(newData, newImages);

  const imagesToDelete = [...oldImages].filter(img => !newImages.has(img));

  for (const imagePath of imagesToDelete) {
    try {
      const fullPath = path.join(process.cwd(), 'public', imagePath);
      if (existsSync(fullPath)) {
        await unlink(fullPath);
        console.log('Deleted old image:', imagePath);
      }
    } catch (error) {
      console.error('Error deleting image:', imagePath, error);
    }
  }
}

async function saveBase64Images(data: any) {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadsDir, { recursive: true });

  const processImages = async (items: any[], imageKey: string) => {
    if (!items || !Array.isArray(items)) return;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item[imageKey] && item[imageKey].startsWith('data:image')) {
        const base64Data = item[imageKey].split(',')[1];
        const buffer = Buffer.from(base64Data, 'base64');
        const ext = item[imageKey].split(';')[0].split('/')[1];
        const filename = `${Date.now()}-${i}.${ext}`;
        const filepath = path.join(uploadsDir, filename);

        await writeFile(filepath, buffer);
        items[i][imageKey] = `/uploads/${filename}`;
      }
    }
  };

  const processImageArray = async (items: any[], arrayKey: string) => {
    if (!items || !Array.isArray(items)) return;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item[arrayKey] && Array.isArray(item[arrayKey])) {
        for (let j = 0; j < item[arrayKey].length; j++) {
          const imgStr = item[arrayKey][j];
          if (imgStr && imgStr.startsWith('data:image')) {
            const base64Data = imgStr.split(',')[1];
            const buffer = Buffer.from(base64Data, 'base64');
            const ext = imgStr.split(';')[0].split('/')[1];
            const filename = `${Date.now()}-${i}-${j}-sc.${ext}`;
            const filepath = path.join(uploadsDir, filename);

            await writeFile(filepath, buffer);
            item[arrayKey][j] = `/uploads/${filename}`;
          }
        }
      }
    }
  };

  if (data?.games) {
    await processImages(data.games, 'image');
    await processImageArray(data.games, 'screenshots');
  }

  if (data?.ggProductions?.projects) {
    await processImages(data.ggProductions.projects, 'image');
  }

  if (data?.about?.values) {
    await processImages(data.about.values, 'image');
  }

  return data;
}

export async function saveCMSData(data: any) {
  try {
    const dataDir = path.join(process.cwd(), 'public', 'data');
    const contentPath = path.join(dataDir, 'content.json');

    await mkdir(dataDir, { recursive: true });

    let oldData = null;
    if (existsSync(contentPath)) {
      const oldContent = await readFile(contentPath, 'utf-8');
      oldData = JSON.parse(oldContent);
    }

    const processedData = await saveBase64Images(data);

    if (oldData) {
      await cleanupOldImages(oldData, processedData);
    }

    await writeFile(
      contentPath,
      JSON.stringify(processedData, null, 2),
      'utf-8'
    );

    return { success: true };
  } catch (error) {
    console.error('Save error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
