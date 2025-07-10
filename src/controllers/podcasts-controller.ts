import { IncomingMessage, ServerResponse } from "http";
import { servicelistepisodes } from "../services/list-episodes-service";
import { servicefilterepisodes } from "../services/filter-episodes-service";
import { StatusCode } from "../utils/status-code";

// Controller para listar episódios de um podcast
export const handlePodcastRequest = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const urlParts = req.url?.split('/');
    const podcastId = urlParts && urlParts.length > 2 ? urlParts[2] : null;

    if (!podcastId) {
      res.writeHead(StatusCode.BadRequest, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Podcast ID is required' }));
      return;
    }

    const episodes = await servicelistepisodes.listEpisodes(podcastId);

    res.writeHead(StatusCode.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(episodes));
  } catch (error) {
    console.error('Error handling podcast request:', error);
    res.writeHead(StatusCode.InternalServerError, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
};

// Controller para filtrar episódios de um podcast
export const handleFilterEpisodesRequest = async (req: IncomingMessage, res: ServerResponse) => {     
  try {
    const urlParts = req.url?.split('/');
    const podcastId = urlParts && urlParts.length > 2 ? urlParts[2] : null;
    const searchTerm = urlParts && urlParts.length > 3 ? urlParts[3] : null;

    if (!podcastId || !searchTerm) {
      res.writeHead(StatusCode.BadRequest, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Podcast ID and search term are required' }));
      return;
    }

    const filteredEpisodes =  servicefilterepisodes.podcastName(searchTerm);

    res.writeHead(StatusCode.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(filteredEpisodes));
  } catch (error) {
    console.error('Error filtering episodes:', error);
    res.writeHead(StatusCode.InternalServerError, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
};
