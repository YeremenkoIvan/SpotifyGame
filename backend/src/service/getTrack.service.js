import fs from 'fs';

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


