import { promises as fs } from "fs";
import { getRecomendation } from "../src/service/game.service.js";
import config from "../src/core/config.js";
import tracks from "../data/tracks.json" assert { type: "json" };

const initRecomendations = () => {
  const fetchTracks = async () => {
    try {
      await fs.access(config.DEFAULT_DATA_DIR_PATH);
      await fs.access(config.DEFAULT_DATA_DIR_PATH + "tracks.json");
      console.log("Data initialized");
    } catch (err) {
      console.error(err.toString());
    }

    const recomendations = [];

    const fetchTrack = async (track) => {
      const recs = await new Promise((resolve) => {
        setTimeout(async () => {
          const result = await getRecomendation(track.id); // Await inside setTimeout
          resolve(result); // Resolve the promise with the result
        }, 2000); // 2-second delay
      });

      recomendations.push(recs);

      // Запись рекомендаций в файл на каждой итерации
      await fs.writeFile(
        config.DEFAULT_DATA_DIR_PATH + "recomendations.json",
        JSON.stringify(recomendations, null, 4)
      );
    };

    const fetchRecommendations = async () => {
      for (const { track } of tracks) {
        await fetchTrack(track); // Wait for the recommendation before proceeding
      }
    };
    fetchRecommendations()
      .then(() => console.log("Все рекомендации получены и записаны в файл"))
      .catch((err) => console.error("Ошибка при получении рекомендаций:", err));
  };
  fetchTracks();
};

initRecomendations();
