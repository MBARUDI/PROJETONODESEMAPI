import {PodcastModel} from "./podcast-model";
export interface FilterPodcastModel {
    id: string;
    title: string;
    description: string     | null;     // Optional field, can be null
    episodes: Array<{
        id: string;
        title: string;
        description: string;
        audioUrl: string;
        duration: number;
        podcast: PodcastModel; // Reference to the PodcastModel
        imageUrl?: string; // Optional field for image URL
        publishedAt?: Date; // Optional field for publication date
    }>;
}
