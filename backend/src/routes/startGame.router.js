import express from 'express';
import dotenv from 'dotenv';
import SpotifyAPI from '../core/SpotifyApi.js';
import {readTracksFromFile, saveTracksToFile} from '../service/getTrack.service.js'
import jwt from 'jsonwebtoken';

const startGame = express.Router();
dotenv.config();

const spotify = new SpotifyAPI(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

startGame.get('/', async (req, res) => {
    const {playlistId} = process.env.PLAYLIST_ID

    try {
        await saveTracksToFile('tracks.json', spotify, playlistId, 'utf8');
        let tracks = await readTracksFromFile('tracks.json');
        let id = tracks.map(track => track.id);
        const ids = Math.floor(Math.random() * id.length + 1);
        const token = jwt.sign({trackId : id[ids], answerKey : 0}, process.env.SECRET_KEY, { expiresIn: '1m' });
        const recommendations = await spotify.getRecomendation(tracks[ids].id);

        const response = {
            track_preview_url: tracks[ids].preview_url,
            track_name: tracks[ids].name,
            token: token, 
            recommendations: recommendations 
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default startGame;