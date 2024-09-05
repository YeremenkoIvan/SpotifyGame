import getTrack from "./getTrack.router.js";
import pingRouter from "./ping.route.js";
import getRecomendations from "./getRecomendations.route.js"

const registerRoutes = (app) => {
    app.use('/ping', pingRouter);
    app.use('/startGame', getTrack);
    app.use('/recommendations', getRecomendations);
};


export default registerRoutes;