import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { decodeToken } from "react-jwt";

import styles from "./Navbar.module.css"; // Import CSS Module

export default function Navbar({ question, onExit }) {
    const token = question?.token ? decodeToken(question.token) : null;
    const score = token?.answerKey || 0;

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarItem}>
                <h5>{score}</h5>
            </div>
            <div className={styles.navbarItem}>
                <h5> timer </h5>
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
