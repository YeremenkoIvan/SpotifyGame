import express from 'express';
import dotenv from 'dotenv';
import SpotifyAPI from '../core/SpotifyApi.js';

const getRecomendations = express.Router();
dotenv.config();

const spotify = new SpotifyAPI(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

getRecomendations.get('/:trackId', async (req, res) => {
    const { trackId } = req.params;

    try {
        const recommendations = await spotify.getRecomendation(trackId);
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default getRecomendations;