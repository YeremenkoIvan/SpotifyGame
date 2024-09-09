import gameRouter from "./game.router.js";
import pingRouter from "./ping.route.js";

const registerRoutes = (app) => {
    app.use('/ping', pingRouter);
    app.use('/game', gameRouter);
};


export default registerRoutes;