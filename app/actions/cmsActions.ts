'use server';

import { readFile } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function getCMSData() {
    try {
        const dataDir = path.join(process.cwd(), 'public', 'data');
        const contentPath = path.join(dataDir, 'content.json');

        if (existsSync(contentPath)) {
            const fileContent = await readFile(contentPath, 'utf-8');
            return JSON.parse(fileContent);
        }
        return null;
    } catch (error) {
        console.error('Error reading CMS data:', error);
        return null;
    }
}
