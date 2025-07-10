export interface Podcast {
  id: string;
    title: string;
    description: string;
    episodes: Array<{
        id: string;
        title: string;
        description: string;
        audioUrl: string;
        duration: number;
    }>;
}
