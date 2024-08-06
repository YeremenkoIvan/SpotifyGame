import express from 'express';
import dotenv from 'dotenv';
import SpotifyAPI from '../core/SpotifyApi.js';

const getTrack = express.Router();
dotenv.config();



const spotify = new SpotifyAPI(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

getTrack.get('/:playlistId', async (req, res) => {
    const { playlistId } = req.params;
    const { offset = 0, limit = 100 } = req.query;

    try {
        const tracks = await spotify.getTrack(playlistId, parseInt(offset), parseInt(limit));
        res.json(tracks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default getTrack;