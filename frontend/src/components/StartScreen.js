import styles from "./StartScreen.module.css";

export default function StartScreen() {
    return (
        <div className={styles.startScreen}>
            <button className={styles.startScreenButton}>Start game</button>
        </div>
    );
}
