import styles from "./Finished.module.css";

export default function FinishedPage({ question }) {
    return (
        <div>
            {question && question.score >= 0 ? (
                <div className={styles.finishedPage}>
                    <div className={styles.finishedPageLarge}>
                        <p>Congratulation!!!</p>
                    </div>
                    <div className={styles.finishedPageSmall}>
                        <p>Your score is: {question.score}</p>
                    </div>
                </div>
            ) : (
                <div className={styles.finishedPage}>
                    <div className={styles.finishedPageLarge}>
                        <p>Congratulation!!!</p>
                    </div>
                    <div className={styles.finishedPageSmall}>
                        <p>Time to answer has ended</p>
                    </div>
                </div>
            )}
        </div>
    );
}
