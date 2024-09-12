import dotenv from "dotenv";

dotenv.config();

const config = {
  APP_NAME: "SpotifyGame",
  APP_SECRET_KEY: process.env.APP_SECRET_KEY,
  PORT: process.env.PORT || 8000,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  PLAYLIST_ID: process.env.PLAYLIST_ID,
  DEFAULT_DATA_DIR_PATH : process.env.DEFAULT_DATA_DIR_PATH
};

export default config;
