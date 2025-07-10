import * as http from 'http';
import { handlePodcastRequest, handleFilterEpisodesRequest } from "./controllers/podcasts-controller";
import { HttpMethod } from './utils/http-methods';


const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {

    const [baseUrl] = req.url?.split('?') || [];
   

  // Define the routes
  if (req.method === HttpMethod.GET && baseUrl.startsWith('/api/list') && req.url?.split('/').length === 3) {
    handlePodcastRequest(req, res); // Call the correct handler for /api/list/{podcastId}
  } else if (req.method === HttpMethod.GET && baseUrl === '/api/filter') {
    handleFilterEpisodesRequest(req, res); // Call the correct handler for /api/filter
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
