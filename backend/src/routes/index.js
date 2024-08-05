import pingRouter from "./ping.route.js";

const registerRoutes = (app) => {
    app.use('/ping', pingRouter);
};

export default registerRoutes;