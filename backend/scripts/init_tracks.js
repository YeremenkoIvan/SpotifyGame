import { promises as fs } from 'fs';
import { getAllTracks } from '../src/service/spotify.service.js';
import config from "../src/core/config.js";



const initTracks = () => {
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

initTracks();