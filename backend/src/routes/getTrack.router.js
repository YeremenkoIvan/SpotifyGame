import express from 'express';
import dotenv from 'dotenv';
import SpotifyAPI from '../core/SpotifyApi.js';
import fs from 'fs';


const getTrack = express.Router();
dotenv.config();


const getAllTrack = async (api, playlist_id) => {
    let allTracks = [];
    for (let i = 0; i < 1000; i += 100) {
        const track = await api.getTrack(playlist_id, i);
        allTracks = allTracks.concat(track);
    }
    console.log(allTracks[1]);
    return allTracks;
}

const saveTracksToFile = async (filePath, api, playlist_id, enc) => {
    if (fs.existsSync(filePath)) {
        console.log(`File ${filePath} already exists.`);
        await readTracksFromFile(filePath, enc);
    } else {
        console.log(`File ${filePath} does not exist. Creating file...`);
        const allTracks = await getAllTrack(api, playlist_id);

        const trackData = allTracks.map(track => ({
            id: track.track.id,
            name: track.track.name,
            preview_url: track.track.preview_url
        }));

        fs.writeFileSync(filePath, JSON.stringify(trackData, null, 2));
    }
};

const readTracksFromFile = async (filePath, enc) => {
    fs.readFile(filePath, enc, (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        const jsonData = JSON.parse(data);

        const preview_url = jsonData.map((item) => item.preview_url).filter((prewUrl) => prewUrl != null);
        console.log(preview_url);
    });
}

// Route to save tracks to a file from a Spotify playlist
getTrack.get('/saveTracks/:playlistId', async (req, res) => {
    const { playlistId } = req.params;
    const { filePath = 'tracks.json', enc = 'utf8' } = req.query;

    const client_id = process.env.CLIENT_ID || "your-client-id";
    const secret_id = process.env.CLIENT_SECRET || "your-secret-id";

    const api = new SpotifyAPI(client_id, secret_id);

    try {
        await saveTracksToFile(filePath, api, playlistId, enc);
        res.status(200).send(`Tracks have been saved to ${filePath}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// const spotify = new SpotifyAPI(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

// getTrack.get('/:playlistId', async (req, res) => {
//     const { playlistId } = req.params;
//     const { offset = 0, limit = 100 } = req.query;

//     try {
//         const tracks = await spotify.getTrack(playlistId, parseInt(offset), parseInt(limit));
//         res.json(tracks);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

export default getTrack;