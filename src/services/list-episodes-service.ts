import { podcastsRepository } from '../repositories/podcasts-repository';
export const servicelistepisodes = {
  listEpisodes: async (podcastId: string) => {
    try {
      // Fetch the podcast data from the repository
      const podcasts = await podcastsRepository.getPodcasts();
      // Find the podcast by ID
      const podcast = podcasts.find(p => p.id === podcastId);
      if (!podcast) {
        throw new Error('Podcast not found');
      }
      // Return the episodes of the found podcast
      return podcast.episodes;
    } catch (error) {
      console.error('Error listing episodes:', error);
      throw new Error('Could not retrieve episodes');
    }
  }
};