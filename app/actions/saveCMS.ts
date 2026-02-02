'use server'

import { writeFile, mkdir, readFile, unlink } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

async function cleanupOldImages(oldData: any, newData: any) {
  const oldImages = new Set<string>();
  const newImages = new Set<string>();

  if (oldData?.home?.projectStack?.projects) {
    oldData.home.projectStack.projects.forEach((p: any) => {
      if (p.image && p.image.startsWith('/uploads/')) {
        oldImages.add(p.image);
      }
    });
  }

  if (oldData?.about?.values) {
    oldData.about.values.forEach((v: any) => {
      if (v.image && v.image.startsWith('/uploads/')) {
        oldImages.add(v.image);
      }
    });
  }

  if (newData?.home?.projectStack?.projects) {
    newData.home.projectStack.projects.forEach((p: any) => {
      if (p.image && p.image.startsWith('/uploads/')) {
        newImages.add(p.image);
      }
    });
  }

  if (newData?.about?.values) {
    newData.about.values.forEach((v: any) => {
      if (v.image && v.image.startsWith('/uploads/')) {
        newImages.add(v.image);
      }
    });
  }

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

  if (data?.home?.projectStack?.projects) {
    await processImages(data.home.projectStack.projects, 'image');
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
