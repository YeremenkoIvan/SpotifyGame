import { React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import styles from "./StartScreen.module.css";

export default function StartPage({ onStart }) {
    const handleClick = () => {
        fetch("http://localhost:8000/game/start", { method: "GET" })
            .then(res => res.json())
            .then(data => {
                onStart(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    };
    return (
        <div className={styles.startScreen}>
            <FontAwesomeIcon icon={faGamepad} className={styles.startIcon} />

            <div className={styles.startScreenCenter}>
                <div className={styles.startScreenStyle}>
                    <p>
                        Сможете ли вы угадать песню по короткому отрывку?
                        Пополните крупнейшую коллекцию музыкальных фрагментов и
                        помогите развитию SpotifyGame, где каждый может
                        проверить свои музыкальные знания!
                    </p>
                </div>
                <div className={styles.startScreenStyle}>
                    <button
                        className={styles.startScreenButton}
                        onClick={handleClick}
                    >
                        Start game
                    </button>
                </div>
            </div>
        </div>
    );
}
