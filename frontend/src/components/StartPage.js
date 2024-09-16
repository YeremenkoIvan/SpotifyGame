import { React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import styles from "./StartScreen.module.css";
import SpotifyLogo from "./img/SpotifyLogo.jpg";

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
            {/* <FontAwesomeIcon icon={faGamepad} className={styles.startIcon} /> */}

            <div className={styles.startScreenCenter}>
                <img
                    className={styles.startScreenImg}
                    src={SpotifyLogo}
                    alt="Description of image"
                />
            </div>
            <div className={styles.startScreenCenter}>
                <div className={styles.startScreenStyle}>
                    <p className={styles.startScreenStyleLarge}>
                        Can you guess the song from a short snippet?
                    </p>
                    <p className={styles.startScreenStyleSmall}>
                        Help grow the largest collection of music clips and
                        support the development of SpotifyGame, where everyone
                        can test their musical knowledge!
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
