import express from 'express';
import dotenv from 'dotenv';
import SpotifyAPI from '../core/SpotifyApi.js';
import fs from 'fs';



const getRecomendations = express.Router();
dotenv.config();



const readTracksFromFile = async () => {
    fs.readFile("tracks.json", "utf8", (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        const jsonData = JSON.parse(data);

        const id = jsonData.map((item) => item.id);
        return id;
    });
}


const spotify = new SpotifyAPI(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

getRecomendations.get('/', async (req, res) => {


   const id = await readTracksFromFile();
   console.log(id)

    try {
        const recommendations = await spotify.getRecomendation(id);
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default getRecomendations;