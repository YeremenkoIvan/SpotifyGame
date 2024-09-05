import startGame from "./startGame.router.js";
import pingRouter from "./ping.route.js";

const registerRoutes = (app) => {
    app.use('/ping', pingRouter);
    app.use('/startGame', startGame);
};


export default registerRoutes;