import styles from "./StartGame.module.css";
import { React } from "react";
import { decodeToken } from "react-jwt";

export default function OngoingPage({ question, setGameData, onFinish }) {
    const token = decodeToken(question.token);
    const timer = token.exp - token.iat;
    const handleClick = id => {
        fetch("http://localhost:8000/game/answer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: question.token,
                answer: id,
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status == "failed") {
                    onFinish(data);
                }

                setGameData(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    };

    return (
        <div className={styles.start}>
            {question ? (
                <div className={styles.ongoingPage}>
                    <div className={styles.audioPlayerWrapper}>
                        <audio
                            className={styles.audioPlayer}
                            controls
                            src={question.preview_url}
                        ></audio>
                    </div>
                    <div>
                        <ul className={styles.answers}>
                            {question.answers.map(item => (
                                <button
                                    className={styles.startGameButton}
                                    key={item.id}
                                    onClick={() => {
                                        handleClick(item.id);
                                    }}
                                >
                                    <p>{`"${item.name}"`}</p>
                                    <p>{`Artist is: ${item.artists}`}</p>
                                </button>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
