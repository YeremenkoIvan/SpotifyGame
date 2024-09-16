import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { decodeToken } from "react-jwt";
import Timer from "./Timer";

import styles from "./Navbar.module.css"; // Import CSS Module

export default function Navbar({ question, onExit, onFinish }) {
    const token = question?.token ? decodeToken(question.token) : null;
    const score = token?.answerKey || 0;

    const time = token?.exp && token?.iat ? token.exp : 0;

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarItem}>
                <p>{score}</p>
            </div>
            <div className={styles.navbarItem}>
                {time == 0 ? (
                    <p>Lets start the Game</p>
                ) : (
                    <Timer time={time} onFinish={onFinish} />
                )}
            </div>
            <div className={styles.navbarIcons}>
                <div className={styles.navbarItem}>
                    <FontAwesomeIcon
                        onClick={onExit}
                        icon={faXmark}
                        width={22}
                    />
                </div>
            </div>
        </nav>
    );
}
