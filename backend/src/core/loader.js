import { promises as fs } from 'fs';
import config from './config.js';
import SpotifyAPI from '../lib/SpotifyApi.js';
import { getAllTracks } from '../service/spotify.service.js';

export const spotifyAPI = new SpotifyAPI(config.CLIENT_ID , config.CLIENT_SECRET);

export const initTracks = () => {
    const fetchTracks = async () => {
        try {
            await fs.access(config.DEFAULT_DATA_DIR_PATH);
            console.log("Data initialized")
            return
        } catch (err) {
            console.log("Initializing data folder")
            await fs.mkdir(config.DEFAULT_DATA_DIR_PATH, { recursive: true });
        }
    
        const rawTracks = await getAllTracks().then(tracks => tracks.filter(track => track.track.preview_url != null));
    
        await fs.writeFile(config.DEFAULT_DATA_DIR_PATH + "tracks.json", JSON.stringify(rawTracks, null, 4));
    }

    fetchTracks()
}