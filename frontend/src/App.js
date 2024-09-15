import { React, useState } from "react";
import Navbar from "./components/Navbar";
import { StartPage, OngoingPage, FinishedPage, Timer } from "./components";

const GameStatus = {
    STARTING: "STARTING",
    ONGOING: "ONGOING",
    FINISHED: "FINISHED",
};

function App() {
    const [gameStatus, setGameStatus] = useState(GameStatus.STARTING);
    const [gameData, setGameData] = useState(null);

    const gamePages = {
        STARTING: (
            <StartPage
                onStart={question => {
                    setGameData(question);
                    setGameStatus(GameStatus.ONGOING);
                }}
            />
        ),
        ONGOING: (
            <OngoingPage
                question={gameData}
                setGameData={setGameData}
                onFinish={result => {
                    setGameData(result);
                    setGameStatus(GameStatus.FINISHED);
                }}
            />
        ),
        FINISHED: <FinishedPage question={gameData} />,
    };

    return (
        <div>
            {/* <Timer question={gameData} /> */}
            <Navbar
                question={gameData}
                onExit={() => {
                    setGameStatus(GameStatus.STARTING);
                    setGameData(null);
                }}
                onFinish={() => {
                    setGameData({ score: gameData.answerKey });
                    setGameStatus(GameStatus.FINISHED);
                }}
            />
            {gamePages[gameStatus]}
        </div>
    );
}

export default App;
