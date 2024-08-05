import dotenv from 'dotenv';

dotenv.config();

const config = {
    APP_NAME: "SpotifyGame",
    PORT: process.env.PORT || 8000
};

export default config;