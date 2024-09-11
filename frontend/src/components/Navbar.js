import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faRotateRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./Navbar.module.css"; // Import CSS Module

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarItem}>
                <h5>0/13</h5>
            </div>
            <div className={styles.navbarItem}>
                <h5>Privet</h5>
            </div>
            <div className={styles.navbarIcons}>
                <div className={styles.navbarItem}>
                    <FontAwesomeIcon icon={faXmark} width={22} />
                </div>
                <div className={styles.navbarItem}>
                    <FontAwesomeIcon icon={faRotateRight} width={22} />
                </div>
            </div>

            {/* 
            <h5>Poka</h5>
            <h5>Hui</h5> */}
        </nav>
    );
}
