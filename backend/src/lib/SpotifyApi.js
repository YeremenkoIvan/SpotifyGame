import fetch from 'node-fetch';

export default class SpotifyAPI {
    constructor(client_id, secret_id) {
        this.client_id = client_id;
        this.secret_id = secret_id;
        this._accessToken = null;
        this._tokenExpiry = null;
    }

    async _obtainAccessToken() {
        const url = "https://accounts.spotify.com/api/token";
        const params = new URLSearchParams({
            grant_type: "client_credentials",
            client_id: this.client_id,
            client_secret: this.secret_id,
        });

        return await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } 
            return response.json().then(data => {throw new Error(JSON.stringify(data))});
        })
        .then(data => {
            this._accessToken = data.access_token;
            this._tokenExpiry = Date.now() + data.expires_in * 1000;
        })
        .catch(error => console.log("Error: ", error.message));
    }

    _isTokenExpired() {
        return !this._tokenExpiry || Date.now() >= this._tokenExpiry;
    }

    async _get(url, params) {
        if (this._isTokenExpired()) {
            await this._obtainAccessToken();
        }

        const paramss = new URLSearchParams(params).toString();
        const base_url = `https://api.spotify.com/v1/${url}?${paramss}`;

        return await fetch(base_url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this._accessToken}`,
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(data => {throw new Error(JSON.stringify(data))});
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
    }

    async getTrack(playlist_id, offset, limit = 100) {
        const url = `playlists/${playlist_id}/tracks`;
        const params = {
            fields: "items.track(preview_url,name,id,artists.name)",
            limit: limit,
            offset: offset,
        };

        const data = await this._get(url, params);
        return data.items;
    }

    async getRecomendation(track_id) {
        const url = "recommendations";
        const params = {
            limit: 3,
            seed_tracks: track_id
        };
        const data = await this._get(url, params);

        const recommendations = data.tracks.map(track => ({
            id: track.id,  
            name: track.name,
            artists: track.artists[0].name
          }));
        return recommendations;
    }
}