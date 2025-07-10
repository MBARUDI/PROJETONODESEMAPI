import { podcastsRepository } from "../repositories/podcasts-repository";
import { FilterPodcastModel } from "../models/podcast-transfer-model";


export const servicefilterepisodes = { podcastName: async (podcastName: string): Promise<FilterPodcastModel[]> => {
    const podcasts = await podcastsRepository.getPodcasts();
    const filteredPodcasts = podcasts.filter((podcast: { title: string; }) => podcast.title.toLowerCase().includes(podcastName.toLowerCase()));
    
    return filteredPodcasts.map((podcast: { id: any; title: any; description: any; episodes: any[]; }) => ({
        id: podcast.id,
        title: podcast.title,
        description: podcast.description,
        episodes: podcast.episodes.map(episode => ({
            id: episode.id,
            title: episode.title,
            description: episode.description,
            audioUrl: episode.audioUrl,
            duration: episode.duration,
            podcast: {
                id: podcast.id,
                title: podcast.title,
                description: podcast.description
            },
            imageUrl: episode.imageUrl,
            publishedAt: episode.publishedAt
        }))
    }));
}
};
