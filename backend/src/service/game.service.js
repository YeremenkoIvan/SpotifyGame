import fs from 'fs';
import tracks from "../data/tracks.json" assert { type: 'json' };
import { spotifyAPI } from '../core/loader.js';
import { encodeSHA256 } from './jwt.service.js';

export const getAllTrack = async (api, playlist_id) => {
    let allTracks = [];
    for (let i = 0; i < 1000; i += 100) {
        const track = await api.getTrack(playlist_id, i);
        allTracks = allTracks.concat(track);
    }
    return allTracks;
};

export const saveTracksToFile = async (filePath, api, playlist_id, enc) => {
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

export const readTracksFromFile = async (filePath, enc) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, enc, (err, data) => {
            if (err) {
                reject(err); 
            } else {
                const jsonData = JSON.parse(data);
                const result = jsonData
                .filter((item) => item.preview_url != null) 
                .map((item) => ({
                    id: item.id,
                    name: item.name, 
                    preview_url: item.preview_url 
                }));
                resolve(result); 
            }
        });
    });
};

export const getRandomTrack = async () => {
    const randomID = Math.floor(Math.random() * tracks.length);
    const {id,name,artists,preview_url} = tracks[randomID].track;
    return {randomTrack: {id: id, name: name, artists: artists[0].name, isAnswer: true}, preview_url: preview_url};
}

export const getRecomendation = async(randomTrack) => {
    const recommendations = await spotifyAPI.getRecomendation(randomTrack);
    return recommendations;
}

export const checkAnswer = (id, answer) => {
    return id == encodeSHA256(answer);
}


