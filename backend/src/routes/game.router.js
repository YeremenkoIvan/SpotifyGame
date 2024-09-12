import express from "express";

import {
  getRandomTrack,
  checkAnswer,
  getRecommendationFromFile,
} from "../service/game.service.js";
import { generateToken, decodeToken } from "../service/jwt.service.js";
import { shuffle } from "../service/utils.service.js";

const gameRouter = express.Router();

gameRouter.get("/start", async (req, res, next) => {
  try {
    const { randomTrack, preview_url, randomID } = await getRandomTrack();
    const token = generateToken(randomTrack.id, 0);

    const recommendations = await getRecommendationFromFile(randomID);
    console.log(recommendations);
    const answers = shuffle([...recommendations, randomTrack]);
    console.log(answers);

    res
      .status(200)
      .json({ token: token, preview_url: preview_url, answers: answers });
  } catch (error) {
    next(error);
  }

  // const error = new Error('Something went wrong while fetching the track');
  // error.statusCode = 400;  // Set your desired status code here
  // next(error);
});

gameRouter.post("/answer", async (req, res, next) => {
  try {
    const { token, answer } = req.body;
    console.log(`token is: ${token}\nanswer is: ${answer}`);
    const tokenPayload = decodeToken(token);
    if (!checkAnswer(tokenPayload.trackId, answer)) {
      res.json({ score: tokenPayload.answerKey });
    }

    const { randomTrack, preview_url, randomID } = await getRandomTrack();
    const newToken = generateToken(randomTrack.id, tokenPayload.answerKey + 1);
    const recommendations = await getRecommendationFromFile(randomID);
    const answers = shuffle([...recommendations, randomTrack]);

    res
      .status(200)
      .json({ token: newToken, preview_url: preview_url, answers: answers });
  } catch (error) {
    next(error);
  }
});

export default gameRouter;
