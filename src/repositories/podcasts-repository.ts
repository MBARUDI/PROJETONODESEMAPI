import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const podcastsFilePath = path.join(__dirname, '../data/podcasts.json');

export const podcastsRepository = {
  getPodcasts: async () => {
    try {
      const data = await fs.promises.readFile(podcastsFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading podcasts file:', error);
      throw new Error('Could not retrieve podcasts');
    }
  }
};
