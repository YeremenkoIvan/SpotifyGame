import express from "express";

const pingRouter = express.Router();

pingRouter.get('/', (req, res) => {
    res.status(200).json({
        msg: "pong!"
    });
});

export default pingRouter;