import { spotifyAPI } from "../core/loader.js";
import config from "../core/config.js";

export const getAllTracks = async () => {
    let allTracks = [];
    for (let i = 0; i < 900; i += 100) {
        const tracks = await spotifyAPI.getTrack(config.PLAYLIST_ID, i);
        allTracks = allTracks.concat(tracks);
    }
    return allTracks;
};